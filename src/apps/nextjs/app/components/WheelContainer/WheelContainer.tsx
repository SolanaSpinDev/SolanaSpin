import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import RecentPlays from "@/app/components/RecentPlays";
import PrizeAnnouncement from "@/app/components/PrizeAnnouncement";
import {usePathname, useRouter} from "next/navigation";
import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import {GameMode} from "@/app/components/GameModes";
import {useSession} from "next-auth/react";
import {fetchWithAuth} from "@/app/api/utils/api";
import "./WheelContainer.css"
import {wheelsConfig} from "@/lib/utils";

const WheelContainer = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [balance, setBalance] = useState(1000);
    const [ticket, setTicket] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeBet, setActiveBet] = useState(0);
    const [recentPlays, setRecentPlays] = useState<Play[]>([
        {
            name: "Vasilakis cosntinoidsi",
            time: new Date(),
            outcome: "2X",
            prize: 500,
        },
        {
            name: "Vasilakis cosntinoidsi",
            time: new Date(),
            outcome: "2X",
            prize: 500,
        },
        {
            name: "Vasilakis cosntinoidsi2",
            time: new Date(),
            outcome: "Gift",
            prize: 1500,
        },
        {
            name: "Vasilakis cosntinoidsi3",
            time: new Date(),
            outcome: "Ticket",
            prize: 500,
        },
        {
            name: "Vasilakis cosntinoidsi4",
            time: new Date(),
            outcome: "10X",
            prize: 500,
        },
        {
            name: "Vasilakis cosntinoidsi5",
            time: new Date(),
            outcome: "5X",
            prize: 500,
        },
        {
            name: "Vasilakis cosntinoidsi6",
            time: new Date(),
            outcome: "2X",
            prize: 500,
        },
    ]);
    //todo review the necesity of browser
    const [browser, setBrowser] = useState('');
    const [hasWonSpecialPrize, setHasWonSpecialPrize] = useState(false);
    const [specialPrize, setSpecialPrize] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState(null); // State to handle errors
    const [video, setVideo] = useState('');
    const [videoBackgroundImage, setVideoBackgroundImage] = useState(''); //todo rename this to imgBackground
    const [flag, setFlag] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const activeGameMode = pathname.split("/")[2] || "wood";
    const {data: session} = useSession();
    const [lastPrize, setLastPrize] = useState(''); //use convention in wheelsConfig

    useEffect(() => {
        // Update the background image based on the active game mode
        setVideoBackgroundImage(`/images/${activeGameMode}/default-bg-start.webp`);
    }, [activeGameMode]);

    useEffect(() => {
        const userAgent = navigator.userAgent;

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
    const updateBalance = useCallback((extraValue: number): void => {
        return setBalance(balance => balance + extraValue)
    }, [])

    function handleSelectBet(bet: number): void {
        if (!isPlaying) {
            setActiveBet(bet);
        }
    }

    const handleSelectGameMode = (gameMode: string) => {
        if (gameMode !== activeGameMode) {
            router.push(`/game/${gameMode}`);
            const slug = gameMode === '50' ? 'blue' : gameMode;
            const initialWheelPosition = wheelsConfig[slug].faces[0].videoNamingConvention;
            setLastPrize(initialWheelPosition)
        }
    };

    const handleJackpot = (data: { jackpotValue: number, progress: number }): void => {
        updateBalance(data.jackpotValue);
        setSpecialPrize(data.jackpotValue);
        setHasWonSpecialPrize(true);
    }

    const handlePrizeAnimationEnd = useCallback(() => {
        setHasWonSpecialPrize(false);
        setSpecialPrize(0);
    }, []);

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
            console.log("Protected dataQQQQQ:", data);

            return data;
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    }

    const handlePlayVideoDb = async () => {
        const videos50 = [
            "https://solanaspin.io/videos-50/X2-No_Win.mp4",
            "https://solanaspin.io/videos-50/No_Win-No_Win.mp4",
            "https://solanaspin.io/videos-50/No_Win-X2.mp4",
            "https://solanaspin.io/videos-50/X2-X2.mp4",
        ];
        const images50 = [
            "https://solanaspin.io/images-50/X2.webp",
            "https://solanaspin.io/images-50/No_Win.webp",
            "https://solanaspin.io/images-50/X2.webp",
            "https://solanaspin.io/images-50/X2.webp",
        ];
        const videosWood = [
            "https://solanaspin.io/videos-wood/Gift_Box-No_Win_A.mp4",
            "https://solanaspin.io/videos-wood/No_Win_A-No_Win_B.mp4",
            "https://solanaspin.io/videos-wood/No_Win_B-No_Win_C.mp4",
            "https://solanaspin.io/videos-wood/X01_C-X01_A.mp4",
            "https://solanaspin.io/videos-wood/X50-No_Win_A.mp4",
            "https://solanaspin.io/videos-wood/No_Win_A-No_Win_B.mp4",
            "https://solanaspin.io/videos-wood/No_Win_B-X01_C.mp4",
            "https://solanaspin.io/videos-wood/X01_C-Ticket.mp4",
            "https://solanaspin.io/videos-wood/Ticket-X05_B.mp4",
            "https://solanaspin.io/videos-wood/X05_B-Gift_Box.mp4",
            "https://solanaspin.io/videos-wood/Gift_Box-Free_Spin.mp4",
        ]
        const imagesWood = [
            "https://solanaspin.io/images-wood/No_Win_A.png",
            "https://solanaspin.io/images-wood/No_Win_B.png",
            "https://solanaspin.io/images-wood/No_Win_C.png",
            "https://solanaspin.io/images-wood/X01_A.png",
            "https://solanaspin.io/images-wood/No_Win_A.png",
            "https://solanaspin.io/images-wood/No_Win_B.png",
            "https://solanaspin.io/images-wood/X01_C.png",
            "https://solanaspin.io/images-wood/Ticket.png",
            "https://solanaspin.io/images-wood/X05_B.png",
            "https://solanaspin.io/images-wood/Gift_Box.png",
            "https://solanaspin.io/images-wood/Free_Spin.png",
        ]
        setIsLoading(true);
        setIsPlaying(true);
        setError(null); // Reset any previous errors

        //todo change 50 to blue for gameMode

        const videosList = activeGameMode === 'wood' ? videosWood : videos50; //temporarily
        const imageList = activeGameMode === 'wood' ? imagesWood : images50; //temporarily
        try {
            //todo fix the issue with blue/50 for game mode and for url path
            //activeGame is the diceSlug
            const diceSlug = activeGameMode === '50' ? 'blue' : activeGameMode;
            console.log('diceSlug', diceSlug)
            const diceRes = await getDice(diceSlug, activeBet); //get dice results
            //todo handle errors for this one
            const diceFace = wheelsConfig[diceSlug].faces[diceRes.result.faceIndex];
            const {videoNamingConvention} = diceFace;
            //update balance

            console.log('update balance with !! it has been substracted the bet value initially', diceRes.result.returnAmount);
            const resourcesUrl = 'https://solanaspin.io'
            console.log('activeGameMode')
            const oldPrize = lastPrize ? lastPrize : wheelsConfig[activeGameMode === '50' ? 'blue' : activeGameMode].faces[0].videoNamingConvention;
            const videoUrl = `${resourcesUrl}/videos-${activeGameMode}/${oldPrize}-${videoNamingConvention}.mp4`;
            const imageUrl = `${resourcesUrl}/images-${activeGameMode}/${videoNamingConvention}.${activeGameMode === '50' ? 'webp' : 'png'}`;
            console.log('videoUrl = ', videoUrl);
            console.log('imageUrl = ', imageUrl);
            const [responseVideo, responseImage] = await Promise.all([
                fetch(videoUrl),
                fetch(imageUrl),
            ]);
            setLastPrize(videoNamingConvention);

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
            console.log('error ', err)
            setIsLoading(false);
            //todo here let the user know about the error and make the wheel avaialble

        } finally {
            setIsLoading(false);
            setFlag(flag + 1);

        }
    }

    const handleVideoEnd = (): void => {
        // The video naturally stays on the last frame when ended, no action needed.
        setIsPlaying(false);

        // update Recent plays accordingly

        // const newVideoId = getRandomNumber(wheelPositions + 1, wheelPositions * 2);
        // if (videoRefs.current[videoId - 1]) {
        //     videoRefs.current[videoId - 1]?.pause();
        //     if (videoId > wheelPositions) {
        //         const {prize, outcome} = computePrize(videoId, wheelPositions, activeBet);
        //         const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};
        //         setRecentPlays([...recentPlays, lastPlay]);
        //
        //         if (prize === 1) {
        //             setTicket(ticket + prize);
        //         } else {
        //             updateBalance(prize);
        //         }
        //     }
        // }
    };

    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black w-full h-full overflow-hidden  video-container">
            <div
                style={videoBackgroundImage ? {backgroundImage: `url('${videoBackgroundImage}')`} : undefined}
                className="bg-video-container-bg bg-cover bg-center absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0">
            </div>

            <Header balance={balance}/>

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
                        src={video}
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

            <PrizeAnnouncement hasWon={hasWonSpecialPrize}
                               message={`Jackpot! You won $${specialPrize}!`}
                               onAnimationComplete={handlePrizeAnimationEnd}
            />

            <div
                className="flex items-start lg:items-center justify-between z-20 middle-container px-2 pt-[2px] mx-auto">
                <div className="relative flex flex-col items-center justify-center z-20 w-[35%]">
                    <GameMode activeGameMode={activeGameMode} onSelectGameMode={handleSelectGameMode}/>
                    <Jackpot jackpotReached={handleJackpot} gameMode={activeGameMode} key={activeGameMode}/>
                </div>

                <div className="relative flex flex-col items-center justify-center z-20 pr-1 2xl:mr-5">
                    <RecentPlays plays={recentPlays} ticket={ticket}/>
                </div>
            </div>
            <div
                className="absolute flex items-center justify-center bottom-0 z-1 w-full px-2 lg:px-5 h-[50px] xl:h-[80px] pb-2">
                <Footer isMuted={isMuted}
                        onToggleMute={handleToggleMute}
                        activeBet={activeBet}
                        onSelectBet={handleSelectBet}/>
            </div>
        </div>
    );
};

export default WheelContainer;
//todo - fix the issue with blue/50 for resources/slug/etc  - keep only the label with 50/50 , everywhere else use "blue"
//todo - rename folders in the resources for video and img with blue
//todo - use the same img extension for images
//todo  - fix default video position start