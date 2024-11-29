import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
    predefinedBets,
    computePrize,
    getRandomNumber,
    wheelPositions,
} from "@/lib/utils";
import clsx from "clsx";
import RecentPlays from "@/app/components/RecentPlays";
import {LogoTitle} from "@/app/components/LogoTitle";
import {Socials} from "@/app/components/Socials";
import PrizeAnnouncement from "@/app/components/PrizeAnnouncement";
import {GoMute, GoUnmute} from "react-icons/go";
import {Balance} from "@/app/components/Balance";
import Image, {StaticImageData} from "next/legacy/image";

const WheelContainer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [balance, setBalance] = useState(1000);
    const [ticket, setTicket] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeBet, setActiveBet] = useState(0);
    const [recentPlays, setRecentPlays] = useState<Play[]>([]);
    const [browser, setBrowser] = useState('');
    const [hasWonSpecialPrize, setHasWonSpecialPrize] = useState(false);
    const [specialPrize, setSpecialPrize] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState(null); // State to handle errors
    const [videoX, setVideoX] = useState('');
    const [imageX, setImageX] = useState('');
    const [flag, setFlag] = useState(0);

    const updateBalance = useCallback((extraValue: number): void => {
        return setBalance(balance => balance + extraValue)
    }, [])

    function selectBet(bet: number): void {
        if (!isPlaying) {
            setActiveBet(bet);
        }
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
            "https://solanaspin.io/full-videos/gift_diamond.mp4",
            "https://solanaspin.io/full-videos/diamond_X0.1_B.mp4",
            "https://solanaspin.io/full-videos/X0.1_B-X0.1_B.mp4",
            "https://solanaspin.io/full-videos/X0.1_B-X50.mp4",
            "https://solanaspin.io/full-videos/X050-No_Win_A.mp4",
        ]
        const imageList = [
            "https://solanaspin.io/full-images/gift_diamond.png",
            "https://solanaspin.io/full-images/diamond_X0.1_B.png",
            "https://solanaspin.io/full-images/X0.1_B-X0.1_B.png",
            "https://solanaspin.io/full-images/X0.1_B-X50.png",
            "https://solanaspin.io/full-images/X050-No_Win_A.png",
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
            console.log(err)
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] xxxxx">
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

            <div className="grid grid-cols-3 gap-4 min-h-screen z-20">
                <div className="relative flex flex-col items-center justify-center z-20">
                    <LogoTitle/>
                    <Jackpot jackpotReached={handleJackpot}/>
                </div>
                <div
                    className={clsx(
                        {
                            'pb-10': browser === 'default' || browser === 'chrome-mobile',
                            'pb-[70px]': browser === 'safari-mobile',
                            'pb-3': browser === 'firefox-mobile',
                        },
                        "middle-container h-screen min-h-screen relative flex flex-col items-center justify-between z-50 text-white"
                    )}

                >
                    <Balance balance={balance}/>

                    <div
                        className="relative flex flex-row  items-center justify-center w-full pb-4">
                        {predefinedBets.map((bet: { value: number, src: StaticImageData }) => (
                            <div className="relative lg:mr-4 lg:mb-4 cursor-pointer" key={bet.value}>
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

                <div className="relative flex flex-col items-center justify-center z-20 pr-2">
                    <div className="absolute top-[40px] xl:top-[80px] right-[40px] xl:right-[80px]">
                        <div className="flex items center justify-center space-x-4">
                            {isMuted &&
                                <GoMute className="text-white text-xl lg:text-3xl" onClick={toggleMute}/>
                            }
                            {!isMuted &&
                                <GoUnmute className="text-white text-xl lg:text-3xl" onClick={toggleMute}/>
                            }
                            <Socials/>
                        </div>
                    </div>
                    <RecentPlays plays={recentPlays} ticket={ticket}/>
                </div>
            </div>
        </div>
    );
};

export default WheelContainer;
