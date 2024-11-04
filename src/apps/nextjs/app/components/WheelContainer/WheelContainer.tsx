import React, {useCallback} from 'react';
import {useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
    getRandomNumber,
    predefinedBets,
    computePrize,
    videoSourcesHighRes,
    videoSourcesLowRes,
    wheelPositions
} from "@/lib/utils";
import clsx from "clsx";
import RecentPlays from "@/app/components/RecentPlays";
import {LogoTitle} from "@/app/components/LogoTitle";
import {Socials} from "@/app/components/Socials";
import PrizeAnnouncement from "@/app/components/PrizeAnnouncement";
import {GoMute, GoUnmute} from "react-icons/go";
import {NauSea} from "@/app/fonts/fonts";
import {Balance} from "@/app/components/Balance";

const WheelContainer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
    const [videoId, setVideoId] = useState(1);
    const [balance, setBalance] = useState(1000);
    const [ticket, setTicket] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [videoBlobs, setVideoBlobs] = useState<string[]>(Array(videoSourcesLowRes.length).fill(null)); // Store preloaded video blob URLs
    const [firstSpin, setFirstSpin] = useState(true);
    const [activeBet, setActiveBet] = useState(0);
    const [recentPlays, setRecentPlays] = useState<Play[]>([]);
    const [browser, setBrowser] = useState('');
    const [hasWonSpecialPrize, setHasWonSpecialPrize] = useState(false);
    const [specialPrize, setSpecialPrize] = useState(0);
    const [isMuted, setIsMuted] = useState(true);

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

    useEffect(() => {
        const loadLowResolutionVideos = async () => {
            // Load and display low-res videos initially
            setIsLoading(true);
            const lowResBlobs = await Promise.all(
                videoSourcesLowRes.map(async (src) => {
                    const response = await fetch(src);
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                })
            );
            setIsLoading(false);
            setVideoBlobs(lowResBlobs);
        };

        const replaceWithHighResolutionVideos = async () => {
            const BATCH_SIZE = 2;

            for (let i = 0; i < videoSourcesHighRes.length; i += BATCH_SIZE) {
                const batch = videoSourcesHighRes.slice(i, i + BATCH_SIZE);

                // Fetch each video in the batch
                const batchBlobs = await Promise.all(
                    batch.map(async (src) => {
                        const response = await fetch(src);
                        const blob = await response.blob();
                        return URL.createObjectURL(blob);
                    })
                );

                // Update each video as it finishes loading
                setVideoBlobs((prevBlobs) => {
                    const updatedBlobs = [...prevBlobs];
                    for (let j = 0; j < batchBlobs.length; j++) {
                        const globalIndex = i + j;
                        if (globalIndex < updatedBlobs.length) {
                            updatedBlobs[globalIndex] = batchBlobs[j];
                        }
                    }
                    return updatedBlobs;
                });

                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        };

        const startLoading = async () => {
            await loadLowResolutionVideos();

            if ("requestIdleCallback" in window) {
                requestIdleCallback(() => replaceWithHighResolutionVideos());
            } else {
                await replaceWithHighResolutionVideos();
            }
        };

        startLoading().then(r => r);
    }, []);

    useEffect((): void => {
        if (isPlaying && videoRefs.current[videoId - 1]) {
            // Play the new video
            videoRefs.current[videoId - 1]?.play().then(r => r);
        }
    }, [videoId, isPlaying]);

    useEffect(() => {
        videoRefs.current.forEach((video, idx) => {
            if (video) {
                if (idx === videoId - 1) {
                    video.play().then(r => r);
                } else {
                    video.pause();
                }
            }
        });
    }, [videoId]);

    const handlePlayVideo = (): void => {
        if (firstSpin) {
            setVideoId(1);
            setIsPlaying(true);

            return;
        }
        // we reach here only when a video from result category has been played - videoId > 2 * wheelPositions

        setVideoId(videoId - 2 * wheelPositions);
        setIsPlaying(true);
    };
    const updateBalance = useCallback((extraValue: number): void => {
        return setBalance(balance => balance + extraValue)
    }, [])

    const handleVideoEnd = (): void => {
        // The video naturally stays on the last frame when ended, no action needed.
        setIsPlaying(false);

        if (videoRefs.current[videoId - 1]) {
            videoRefs.current[videoId - 1]?.pause();
            if (videoRefs.current[videoId - 1]) {
                videoRefs.current[videoId - 1]!.currentTime = 0;
            }
        }

        if (videoId > wheelPositions && videoId < wheelPositions * 2 + 1) {
            const newVideoId = videoId + wheelPositions;

            //play a result video
            setVideoId(newVideoId);
            setIsPlaying(true);

            const {prize, outcome} = computePrize(newVideoId, wheelPositions, activeBet);
            const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};

            setRecentPlays([...recentPlays, lastPlay]);

            if (prize === 1) {
                setTicket(ticket + prize);
            } else {
                updateBalance(prize);
            }
        } else if (videoId < wheelPositions + 1) {
            if (firstSpin) {
                setFirstSpin(false);
            }

            //play a stop video
            setVideoId(getRandomNumber(wheelPositions + 1, wheelPositions * 2));
            setIsPlaying(true);
        }
    };

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
        const video = videoRefs.current[videoId - 1];
        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black w-full h-full overflow-hidden -z-1 video-container">
            {isLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <Loading/>
                </div>
            ) : (
                videoBlobs.length > 0 &&
                videoBlobs.map((videoBlob, index) => (
                    <video
                        key={index}
                        ref={(el) => {
                            videoRefs.current[index] = el
                        }}
                        onEnded={handleVideoEnd}
                        loop={false}
                        controls={false}
                        muted={isMuted}
                        playsInline
                        poster="/images/frame-0.png"
                        className={`absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0 ${
                            videoId === index + 1 ? "block" : "hidden"
                        }`}
                        src={videoBlob}
                    />
                ))
            )}
            {!isPlaying && !isLoading && activeBet > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
                    <div role="button" className="w-[140px] h-[140px] rounded-full" onClick={handlePlayVideo}></div>
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
                        {predefinedBets.map((bet: number, i: number) => (
                            <div className="relative lg:mr-4 lg:mb-4" key={i}>
                                <div
                                    className={clsx(
                                        `${NauSea.className}`,
                                        "tracking-[1px] relative m-2 text-xs lg:text-4xl w-10 lg:w-[166px] h-6 lg:h-[64px] font-thin flex items-center bg-[#ffdf56] text-black justify-center bg-cover bg-no-repeat bg-center z-20",
                                        isPlaying ? "" : "animate-glow cursor-pointer",
                                        activeBet === bet ? "border-white border-1 border-solid" : ""
                                    )}
                                    onClick={() => selectBet(bet)}>${bet}</div>
                                <div
                                    className="absolute z-10 bottom-[5px] lg:bottom-[2px] right-[5px] lg:right-[2px] bg-amber-500 w-10 lg:w-[166px] h-6 lg:h-[64px]"></div>
                                <div
                                    className={clsx(
                                        "absolute z-1 bottom-[2px] lg:-bottom-[4px] right-[2px] lg:-right-[2px] w-12 lg:w-[180px] h-8 lg:h-[82px]",
                                        activeBet === bet ? "bg-white" : "bg-transparent"
                                    )}></div>
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
