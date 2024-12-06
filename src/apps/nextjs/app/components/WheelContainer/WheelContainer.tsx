import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
    predefinedBets,
    computePrize,
    getRandomNumber,
    wheelPositions, wheels,
} from "@/lib/utils";
import clsx from "clsx";
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

const WheelContainer: React.FC = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [balance, setBalance] = useState(1000);
    const [ticket, setTicket] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeBet, setActiveBet] = useState(0);
    const [activeWheel, setWheel] = useState('');
    const [recentPlays, setRecentPlays] = useState<Play[]>([]);
    const [browser, setBrowser] = useState('');
    const [hasWonSpecialPrize, setHasWonSpecialPrize] = useState(false);
    const [specialPrize, setSpecialPrize] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState(null); // State to handle errors
    const [videoX, setVideoX] = useState('');
    const [imageX, setImageX] = useState('');
    const [flag, setFlag] = useState(0);
    const {data: session} = useSession();

    //test for endpoints
    const fetchData = async () => {
        try {
            const data1 = await fetchWithAuth("/api/endpoint1", session?.accessToken as string);
            console.log(data1);

            const data2 = await fetchWithAuth("/api/endpoint2", session?.accessToken as string);
            console.log(data2);

            // Add more calls as needed
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
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

    function selectWheel(wheel: string): void {
        setWheel(wheel);
    }

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
        const videosList = [
            // "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Gift Box.mp4",
            // "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X0.1 C.mp4",
            // "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Diamond.mp4",
            // "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_No Win C.mp4",
            // "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X5.mp4",
            "https://solanaspin.io/full-videos/Gift_Box-Diamond.mp4",
            "https://solanaspin.io/full-videos/Diamond-X01_B.mp4",
            "https://solanaspin.io/full-videos/X01_B-X01_B.mp4",
            "https://solanaspin.io/full-videos/X01_B-X50.mp4",
            "https://solanaspin.io/full-videos/X50-No_Win_A.mp4",
            "https://solanaspin.io/full-videos/No_Win_A-No_Win_B.mp4",
            "https://solanaspin.io/full-videos/No_Win_B-X01_C.mp4",
            "https://solanaspin.io/full-videos/X01_C-Ticket.mp4",
            "https://solanaspin.io/full-videos/Ticket-X05_B.mp4",
            "https://solanaspin.io/full-videos/X05_B-Gift_Box.mp4",
            "https://solanaspin.io/full-videos/Gift_Box-Free_Spin.mp4",
        ]
        const imageList = [
            "https://solanaspin.io/full-images/Diamond.webp",
            "https://solanaspin.io/full-images/X01_B.webp",
            "https://solanaspin.io/full-images/X01_B.png",
            "https://solanaspin.io/full-images/X50.png",
            "https://solanaspin.io/full-images/No_Win_A.png",
            "https://solanaspin.io/full-images/No_Win_B.png",
            "https://solanaspin.io/full-images/X01_C.png",
            "https://solanaspin.io/full-images/Ticket.png",
            "https://solanaspin.io/full-images/X05_B.png",
            "https://solanaspin.io/full-images/Gift_Box.png",
            "https://solanaspin.io/full-images/Free_Spin.png",
        ]
        setIsLoading(true);
        setIsPlaying(true);
        setError(null); // Reset any previous errors
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
                className="w-full h-[30px] border-b-1 relative z-10 border-slate-800 border-solid flex justify-between items-center">
                <LogoTitle/>
                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                    <Balance balance={balance}/>
                </div>
                <AuthButton />
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
            <div className="flex items-cemnter justify-between z-20 middle-container px-2">
                <div className="relative flex flex-col items-center justify-center z-20 pl-[7%]">
                    <Jackpot jackpotReached={handleJackpot}/>
                </div>

                <div className="relative flex flex-col items-center justify-center z-20 pr-2">
                    <RecentPlays plays={recentPlays} ticket={ticket}/>
                </div>
            </div>

            {/*footer*/}
            <div className="absolute bottom-0 z-1 flex items-center justify-between w-full px-2 h-[40px] pb-2">
                <div className="flex items center justify-center space-x-4">
                    {isMuted &&
                        <GoMute className="text-white text-xl lg:text-3xl" onClick={toggleMute}/>
                    }
                    {!isMuted &&
                        <GoUnmute className="text-white text-xl lg:text-3xl" onClick={toggleMute}/>
                    }
                    <Socials/>
                </div>
                <div className="bets-container">
                    <div
                        className="relative flex flex-row  items-center justify-center w-full pb-4">
                        {predefinedBets.map((bet: { value: number, src: StaticImageData }) => (
                            <div
                                className={`flex relative cursor-pointer rounded-lg max-w-[50px] mx-[3px] image-button-container ${activeBet === bet.value ? 'active' : ''}`}
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
                <div className="flex justify-between items-center pb-2">
                    {wheels.map((wheel) => (
                        <div key={wheel}>
                            <button
                                className={`min-w-[50px] min-h-[30px] wheel border-solid border-1 border-slate-700 px-2 py-[2px] rounded text-white ${activeWheel === wheel ? 'active' : ''} z-10`}
                                onClick={() => selectWheel(wheel)}>{wheel}</button>
                        </div>
                    ))}
                </div>
            </div>
            {/*end footer*/}
        </div>
    );
};

export default WheelContainer;
