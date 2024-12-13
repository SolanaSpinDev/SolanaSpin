import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
    bets,
    computePrize,
    getRandomNumber,
    wheelPositions, gameModes,
} from "@/lib/utils";

import RecentPlays from "@/app/components/RecentPlays";
import {LogoTitle} from "@/app/components/LogoTitle";
import {Socials} from "@/app/components/Socials";
import PrizeAnnouncement from "@/app/components/PrizeAnnouncement";
import {GoMute, GoUnmute} from "react-icons/go";
import {Balance} from "@/app/components/Balance";
import Image, {StaticImageData} from "next/legacy/image";
import "./WheelContainer.css"
import AuthButton from "@/app/components/AuthButton/Index";
import {fetchWithAuth} from "@/lib/api";
import {signIn, signOut, useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

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
    const [browser, setBrowser] = useState('');
    const [hasWonSpecialPrize, setHasWonSpecialPrize] = useState(false);
    const [specialPrize, setSpecialPrize] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState(null); // State to handle errors
    const [videoX, setVideoX] = useState('');
    const [imageX, setImageX] = useState(''); //todo rename this to imgBackground
    const [flag, setFlag] = useState(0);
    const {data: session} = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const activeGameMode = pathname.split("/")[2] || "wood";
    //test for endpoints
    // const fetchData = async () => {
    //     if (!session || !session.user) {
    //         console.error("User is not authenticated");
    //         return;
    //     }
    //
    //     try {
    //         const data = await fetchWithAuth(
    //             "url", // Replace with your API URL
    //             session.validity.valid_until ? session.validity.valid_until.toString() : ""
    //         );
    //
    //         console.log("Protected data:", data);
    //     } catch (error) {
    //         console.error("Error fetching protected data:", error);
    //     }
    // };
    // Extract `gameMode` from the URL

    useEffect(() => {
        // Update the background image based on the active game mode
        setImageX(`/images/${activeGameMode}/default-bg-start.webp`);
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

    function selectBet(bet: number): void {
        if (!isPlaying) {
            setActiveBet(bet);
        }
    }

    const selectGameMode = (gameMode: string) => {
        if (gameMode !== activeGameMode) {
            router.push(`/game/${gameMode}`);
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

    const toggleMute = (): void => {
        const video = videoRef.current;
        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        if (videoX && videoRef.current) {
            // Play the video once the URL is set
            videoRef.current.play();
        }
    }, [videoX]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onplay = () => setIsPlaying(true);
            videoRef.current.onpause = () => setIsPlaying(false);
        }
    }, []);

    const handlePlayVideoDb = async () => {
        const videos50=[
            "https://solanaspin.io/videos-50/X2-No_Win.mp4",
            "https://solanaspin.io/videos-50/No_Win-No_Win.mp4",
            "https://solanaspin.io/videos-50/No_Win-X2.mp4",
            "https://solanaspin.io/videos-50/X2-X2.mp4",
        ];
        const images50=[
            "https://solanaspin.io/images-50/X2.webp",
            "https://solanaspin.io/images-50/No_Win.webp",
            "https://solanaspin.io/images-50/X2.webp",
            "https://solanaspin.io/images-50/X2.webp",
        ];
        const videosWood = [
            "https://solanaspin.io/videos-wood/Gift_Box-Diamond.mp4",
            "https://solanaspin.io/videos-wood/Diamond-X01_B.mp4",
            "https://solanaspin.io/videos-wood/X01_B-X01_B.mp4",
            "https://solanaspin.io/videos-wood/X01_B-X50.mp4",
            "https://solanaspin.io/videos-wood/X50-No_Win_A.mp4",
            "https://solanaspin.io/videos-wood/No_Win_A-No_Win_B.mp4",
            "https://solanaspin.io/videos-wood/No_Win_B-X01_C.mp4",
            "https://solanaspin.io/videos-wood/X01_C-Ticket.mp4",
            "https://solanaspin.io/videos-wood/Ticket-X05_B.mp4",
            "https://solanaspin.io/videos-wood/X05_B-Gift_Box.mp4",
            "https://solanaspin.io/videos-wood/Gift_Box-Free_Spin.mp4",
        ]
        const imagesWood = [
            "https://solanaspin.io/images-wood/Diamond.webp",
            "https://solanaspin.io/images-wood/X01_B.webp",
            "https://solanaspin.io/images-wood/X01_B.png",
            "https://solanaspin.io/images-wood/X50.png",
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
        const videosList = activeGameMode === 'wood' ? videosWood : videos50; //temporarily
        const imageList = activeGameMode === 'wood' ? imagesWood : images50; //temporarily
        try {
            const [responseVideo, responseImage] = await Promise.all([
                fetch(videosList[flag]),
                fetch(imageList[flag]),
            ]);
            const response = await fetch(videosList[flag]); // Adjust endpoint as needed
            if (!responseVideo.ok || !responseImage.ok) {
                throw new Error('Failed to fetch data');
            }

            //get video
            const blobVideo = await responseVideo.blob();
            const urlVideo = URL.createObjectURL(blobVideo);

            //get image
            const blobImage = await responseImage.blob();
            const urlImage = URL.createObjectURL(blobImage);

            setVideoX(urlVideo); // Update state with fetched data
            setTimeout(() => {
                setImageX(urlImage);
            }, 1000)
        } catch (err: unknown) {
            console.log('error')
            setIsLoading(false);

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
                style={imageX ? {backgroundImage: `url('${imageX}')`} : undefined}
                className="bg-video-container-bg bg-cover bg-center absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0">
            </div>

            {/*header*/}
            <div
                className="w-full h-[30px] lg:h-[80px] border-b-1 relative z-10 border-slate-800 border-solid flex justify-between items-center">
                <LogoTitle/>
                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                    <Balance balance={balance}/>
                </div>
                <AuthButton/>
            </div>
            {/*end header*/}

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
                        key={videoX}
                        onEnded={handleVideoEnd}
                        loop={false}
                        controls={false}
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        // poster="/images/frame-0.png"
                        className={`absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0`}
                        src={videoX}
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
                                handlePlayVideoDb();
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

            {/*middle container end*/}
            <div className="flex items-start lg:items-center justify-between z-20 middle-container px-2 pt-[2px] mx-auto">
                <div className="relative flex flex-col items-center justify-center z-20 w-[35%]">
                    <div className="text-white pb-1">Game Modes</div>
                    <div className="flex justify-between items-center pb-2">
                        {gameModes.map((gameMode) => (
                            <div key={gameMode}>
                                <button
                                    className={`min-w-[50px] min-h-[30px] wheel border-solid border-1 border-slate-700 px-2 py-[2px] uppercase rounded text-white ${activeGameMode === gameMode ? 'active' : ''} z-10`}
                                    onClick={() => selectGameMode(gameMode)}>{gameMode==="50" ? "50/50" : gameMode}</button>
                            </div>
                        ))}
                    </div>
                    <Jackpot jackpotReached={handleJackpot} gameMode={activeGameMode} key={activeGameMode}/>
                </div>

                <div className="relative flex flex-col items-center justify-center z-20 pr-1 2xl:mr-5">
                    <RecentPlays plays={recentPlays} ticket={ticket}/>
                </div>
            </div>

            {/*footer*/}
            <div
                className="absolute flex items-center justify-center bottom-0 z-1 w-full px-2 lg:px-5 h-[50px] xl:h-[80px] pb-2">
                <div className="relative flex items-center justify-between w-full">
                    <div className="flex items center justify-center space-x-4">
                        {isMuted &&
                            <GoMute className="text-white text-xl lg:text-3xl" onClick={toggleMute}/>
                        }
                        {!isMuted &&
                            <GoUnmute className="text-white text-xl lg:text-3xl" onClick={toggleMute}/>
                        }
                        <Socials/>
                    </div>
                    <div className="bets-container absolute left-1/2 -translate-x-1/2 text-center">
                        <div
                            className="relative flex flex-row  items-center justify-center w-full pb-1">
                            {bets.map((bet: { value: number, src: StaticImageData }) => (
                                <div
                                    className={`flex relative cursor-pointer rounded-lg max-w-[50px] lg:max-w-[100px] mx-[3px] image-button-container ${activeBet === bet.value ? 'active' : ''}`}
                                    key={bet.value}>
                                    <Image
                                        src={bet.src}
                                        className=""
                                        alt="lorem"
                                        width={443}
                                        height={256}
                                        onClick={() => selectBet(bet.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/*end footer*/}
        </div>
    );
};

export default WheelContainer;
