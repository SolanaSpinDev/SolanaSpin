import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import RecentPlays from "@/app/components/RecentPlays";
import {usePathname, useRouter} from "next/navigation";
import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import {GameMode} from "@/app/components/GameModes";
import {useSession} from "next-auth/react";
import {fetchWithAuth} from "@/app/api/utils/api";
import {wheelsConfig} from "@/lib/utils";
import {useBalance} from "@/app/context/BalanceContext";
import "./WheelContainer.css"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const WheelContainer = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [localBalance, setLocalBalance] = useState(999);
    const [ticket, setTicket] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeBet, setActiveBet] = useState(0);
    const [recentPlays, setRecentPlays] = useState<Play[]>([]);

    //todo review the necessity of browser
    const [browser, setBrowser] = useState('');
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState(null); // State to handle errors
    const [video, setVideo] = useState('');
    const [videoBackgroundImage, setVideoBackgroundImage] = useState(''); //todo rename this to imgBackground
    const [flag, setFlag] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const activeGameMode = pathname.split("/")[2] || "wood";
    const {data: session, status} = useSession();
    const [outcome, setOutcome] = useState<{ outcome: string, amount: number, resultValueToShow: string }>({
        outcome: '',
        amount: null,
        resultValueToShow: ''
    })
    const {balance, getBalance} = useBalance();
    useEffect(() => {
        // Update the background image based on the active game mode
        setVideoBackgroundImage(`/images/${activeGameMode}/default-bg-start.webp`);
    }, [activeGameMode]);

    useEffect(() => {
        const userAgent = navigator.userAgent;

        //todo review the use of this isMobile const
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(userAgent);
        if (isMobile) {
            if (userAgent.includes('Safari') && !userAgent.includes('CriOS') && !userAgent.includes('FxiOS') && !userAgent.includes('Chrome')) {
                setBrowser('safari-mobile');
            } else if (userAgent.includes('CriOS') || userAgent.includes('Chrome')) {
                setBrowser('chrome-mobile');
            } else if (userAgent.includes('FxiOS') || userAgent.includes('Firefox')) {
                setBrowser('firefox-mobile');
            } else {
                setBrowser('default-mobile');
            }
        } else {
            setBrowser('default');
        }
    }, []);

    //todo remove this updateBalance
    const updateBalance = useCallback((extraValue: number): void => {
        //todo here setBalance by using BalanceContext and setting state in here and passing the value to Header-Balance
        // setBalance(balance); // it will be in the play response
        return setLocalBalance(localBalance => localBalance + extraValue)
    }, [])

    function handleSelectBet(bet: number): void {
        //if user is not authenticated can't play
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }
        //if user has no money in the bank or less than what he wants to bet
        if (balance < bet) {
            toast.info('You don\'t have enough money, please add more money \n use the ');
            return;
        }

        if (!isPlaying) {
            setActiveBet(bet);
        }
    }

    const handleSelectGameMode = (gameMode: string) => {
        if (isPlaying) {
            return;
        }
        if (gameMode !== activeGameMode) {
            router.push(`/game/${gameMode}`);
            const initialWheelPosition = wheelsConfig[gameMode].faces[0].videoNamingConvention;
            setOutcome({outcome: initialWheelPosition, amount: null, resultValueToShow: ''})
        }
    };

    const handleToggleMute = (): void => {
        const video = videoRef.current;
        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        if (video && videoRef.current) {
            // Play the video once the URL is set
            videoRef.current.play();
        }
    }, [video]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onplay = () => setIsPlaying(true);
            videoRef.current.onpause = () => setIsPlaying(false);
        }
    }, []);

    //todo consider moving this logic into a different component
    const getDice = async (diceSlug: string, playAmount: number) => {

        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const url = "/api/v1.0/play"
            const body = {
                diceSlug: diceSlug,
                playAmount: playAmount
            }
            const data = await fetchWithAuth(url, 'POST', session.tokens?.token, body)

            return data;
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    }

    const handlePlayVideoDb = async () => {
        //block vip and white for playing
        if (activeGameMode === 'vip' || activeGameMode === 'white') {
            return;
        }
        //if user is not authenticated can't play
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        setIsLoading(true);
        setIsPlaying(true);
        setError(null); // Reset any previous errors

        try {
            const diceRes = await getDice(activeGameMode, activeBet); //get dice results

            //todo handle errors for this one
            const diceFace = wheelsConfig[activeGameMode].faces[diceRes.result.faceIndex];
            const {videoNamingConvention, resultValueToShow} = diceFace;

            const resourcesUrl = 'https://solanaspin.io' //todo maybe move this to an env var
            const lastOutcm = outcome.outcome;
            const oldPrize = lastOutcm ? lastOutcm : wheelsConfig[activeGameMode].faces[0].videoNamingConvention;
            const videoUrl = `${resourcesUrl}/videos-${activeGameMode}/${oldPrize}-${videoNamingConvention}.mp4`;
            const imageUrl = `${resourcesUrl}/images-${activeGameMode}/${videoNamingConvention}.webp`;
            const [responseVideo, responseImage] = await Promise.all([
                fetch(videoUrl),
                fetch(imageUrl),
            ]);
            setOutcome({outcome: videoNamingConvention, amount: diceRes.netAmount, resultValueToShow})

            if (!responseVideo.ok || !responseImage.ok) {
                throw new Error('Failed to fetch data');
            }

            //get video
            const blobVideo = await responseVideo.blob();
            const urlVideo = URL.createObjectURL(blobVideo);

            //get image
            const blobImage = await responseImage.blob();
            const urlImage = URL.createObjectURL(blobImage);

            setVideo(urlVideo); // Update state with fetched data
            setTimeout(() => {
                setVideoBackgroundImage(urlImage);
            }, 1000)
        } catch (err: unknown) {
            toast.error('An error has occurred, please try again later');
            setIsLoading(false);
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
            //todo remove the flag variable since is not yet useful
            setFlag(flag + 1);

        }
    }

    const handleVideoEnd = (): void => {
        //this should update the balance at  video end
        getBalance().then((r) => r);
        setIsPlaying(false);
        const lastPlay = {
            name: session?.user?.email || "Anonymous",
            time: new Date(),
            prize: outcome.amount,
            outcome: outcome.resultValueToShow
        };
        setRecentPlays([...recentPlays, lastPlay]);
    };

    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black w-full h-full overflow-hidden  video-container">
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div
                style={videoBackgroundImage ? {backgroundImage: `url('${videoBackgroundImage}')`} : undefined}
                className="bg-video-container-bg bg-cover bg-center absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0">
            </div>

            <Header/>

            {isLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <Loading/>
                </div>
            ) : (
                <>
                    {/*<div*/}
                    {/*    className="bg-[url('/images/S_W_Picture_Wood Wheel_16 9.png')] bg-cover bg-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px]">*/}
                    {/*</div>*/}
                    <video
                        ref={videoRef}
                        key={video}
                        onEnded={handleVideoEnd}
                        loop={false}
                        controls={false}
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        className={`absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0`}
                        src={video === '' ? undefined : video}
                    />
                </>
            )
            }

            {!isPlaying && !isLoading && activeBet > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
                    <button
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handlePlayVideoDb().then(r => r);
                            }
                        }}
                        className="w-[140px] h-[140px] rounded-full"
                        onClick={handlePlayVideoDb}
                    ></button>
                </div>
            )}

            <div
                className="flex items-start lg:items-center justify-between z-20 middle-container px-2 pt-[2px] mx-auto">
                <div className="relative flex flex-col items-center justify-center z-20 w-[35%]">
                    <GameMode activeGameMode={activeGameMode} onSelectGameMode={handleSelectGameMode}
                              tooltip={isPlaying ? "Can't change game while a game is playing" : ""}/>
                    <Jackpot jackpotReached={() => {
                    }} gameMode={activeGameMode} key={activeGameMode}/>
                </div>

                <div className="relative flex flex-col items-center justify-center z-20 pr-1 2xl:mr-5">
                    <RecentPlays plays={recentPlays} ticket={ticket}/>
                </div>
            </div>
            <div
                className="absolute flex items-center justify-center bottom-0 z-1 w-full px-2 lg:px-5 h-[50px] xl:h-[80px] pb-2">
                <Footer isMuted={isMuted}
                        activeGameMode={activeGameMode}
                        onToggleMute={handleToggleMute}
                        activeBet={activeBet}
                        onSelectBet={handleSelectBet}/>
            </div>
        </div>
    );
};

export default WheelContainer;
//todo  - fix default video position start