import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
    predefinedBets,
    computePrize,
    getRandomNumber,
    wheelPositions,
    videoSourcesHighRes
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

const WheelContainer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoId, setVideoId] = useState(1);
    const [balance, setBalance] = useState(1000);
    const [ticket, setTicket] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [videoBlobs, setVideoBlobs] = useState<string[]>(Array(videoSourcesHighRes.length).fill(null)); // Store preloaded video blob URLs
    const [firstSpin, setFirstSpin] = useState(true);
    const [activeBet, setActiveBet] = useState(0);
    const [recentPlays, setRecentPlays] = useState<Play[]>([]);
    const [browser, setBrowser] = useState('');
    const [hasWonSpecialPrize, setHasWonSpecialPrize] = useState(false);
    const [specialPrize, setSpecialPrize] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [newVideoId, setNewVideoId] = useState(-1);
    const [error, setError] = useState(null); // State to handle errors
    const [videoX, setVideoX] = useState('');
    const [imageX, setImageX] = useState('/images/gift_start.png');
    const [flag, setFlag] = useState(0);
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);

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
    //
    //logic for load videos
    // useEffect(() => {
    //     const loadVideos = async () => {
    //         setIsLoading(true);
    //         const lowResBlobs = await Promise.all(
    //             videoSourcesHighRes.map(async (src) => {
    //                 const response = await fetch(src);
    //                 const blob = await response.blob();
    //                 return URL.createObjectURL(blob);
    //             })
    //         );
    //         setIsLoading(false);
    //         setVideoBlobs(lowResBlobs);
    //     };
    //
    //     const startLoading = async () => {
    //         await loadVideos();
    //     };
    //
    //     startLoading()
    //         .then(r => r)
    // }, []);

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

    const updateBalance = useCallback((extraValue: number): void => {
        return setBalance(balance => balance + extraValue)
    }, [])

    function selectBet(bet: number): void {
        console.log('set bet ', bet)
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
        //send the mute event

        const video = videoRefs.current[videoId - 1];
        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // function setCanvasVideoIds(startId: number, stopId: number) {
    //     console.log('se face set de CanvarVideoId _1 ', startId)
    //     console.log('se face set de CanvarVideoId _1stopId ', stopId)
    //     // @typescript-eslint/no-explicit-any
    //     // @ts-expect-error: it is x
    //     return (window as unknown).a(startId, stopId);
    // }

    //logic for play video
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    // const handleVideoEnd = (): void => {
    //     // The video naturally stays on the last frame when ended, no action needed.
    //     setIsPlaying(false);
    //     const newVideoId = getRandomNumber(wheelPositions, wheelPositions * 2 - 1);
    //
    //     if (videoRefs.current[videoId - 1]) {
    //         videoRefs.current[videoId - 1]?.pause();
    //         if (videoId > wheelPositions) {
    //             const {prize, outcome} = computePrize(videoId, wheelPositions, activeBet);
    //             const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};
    //             setRecentPlays([...recentPlays, lastPlay]);
    //
    //             if (prize === 1) {
    //                 setTicket(ticket + prize);
    //             } else {
    //                 updateBalance(prize);
    //             }
    //         }
    //     }
    //     if (videoId < wheelPositions + 1) {
    //         if (firstSpin) {
    //             setFirstSpin(false);
    //         }
    //
    //         //play a stop video
    //         setVideoId(newVideoId);
    //         setCanvasVideoId(newVideoId);
    //         setIsPlaying(true);
    //     }
    // };

    //logic for play video
    // const handlePlayVideo = (): void => {
    //     console.log('se face play de video _0');
    //     /**
    //      * this will save us from adding a flag for initialSpin
    //      * */
    //     const startId = newVideoId < 0 ? 0 : newVideoId;
    //     const stopId = getRandomNumber(14, 27);
    //     setCanvasVideoIds(startId, stopId);
    //     setIsPlaying(true);
    //     setTimeout(() => {
    //         videoHasEndedNoCallback(stopId)
    //     }, 5000);//assumption that the video will take 9 seconds maybe fix it with the real video duration
    // };

    const handlePlayVideo = (): void => {
        if (firstSpin) {
            setVideoId(1);
            setIsPlaying(true);

            return;
        }
        // we reach here only when a video from result category has been played - videoId > 2 * wheelPositions

        setVideoId(videoId - wheelPositions);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (videoX && videoRef.current) {
            // Play the video once the URL is set
            videoRef.current.play();
        }
    }, [videoX]);


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
            "./videos/720p/full_videos/images/gift_diamond.png",
            "./videos/720p/full_videos/images/diamond_X0.1_B.png",
            "./videos/720p/full_videos/images/X0.1_B-X0.1_B.png",
            "./videos/720p/full_videos/images/X0.1_B-X50.png",
            "./videos/720p/full_videos/images/X050-No_Win_A.png",
        ]
        const index = flag === 0 ? flag : imageList.length % flag;


        console.log('se face call-ul playVideoDb', flag, imageX,);
        console.log('index is', index,);
        setIsLoading(true); // Start loading
        setIsPlaying(true); // Start loading
        setError(null); // Reset any previous errors
        try {
            const response = await fetch(videosList[flag]); // Adjust endpoint as needed
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log('blob')
            console.log(url)
            setVideoX(url); // Update state with fetched data
            setTimeout(() => {
                setImageX(imageList[flag]);
            }, 1000)
        } catch (err: unknown) {
            console.log('error')

            // setError(err.message); // Handle errors
        } finally {
            setIsLoading(false);
            setIsPlaying(false);
            setFlag(flag + 1);

        }
    }

    const handleVideoEnd = (): void => {
        // The video naturally stays on the last frame when ended, no action needed.
        setIsPlaying(false);
        const newVideoId = getRandomNumber(wheelPositions + 1, wheelPositions * 2);
        if (videoRefs.current[videoId - 1]) {
            videoRefs.current[videoId - 1]?.pause();
            if (videoId > wheelPositions) {
                const {prize, outcome} = computePrize(videoId, wheelPositions, activeBet);
                const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};
                setRecentPlays([...recentPlays, lastPlay]);

                if (prize === 1) {
                    setTicket(ticket + prize);
                } else {
                    updateBalance(prize);
                }
            }
        }
        if (videoId < wheelPositions + 1) {
            if (firstSpin) {
                setFirstSpin(false);
            }

            //play a stop video
            setVideoId(newVideoId);
            setIsPlaying(true);
        }
    };

    // const videoHasEndedNoCallback = (stopId: number) => {
    //     setIsPlaying(false);
    //     //here we match the stop video with the new start video
    //     setNewVideoId(stopId - 14);
    //     //set prize and/or ticket
    //     const {prize, outcome} = computePrize(stopId, wheelPositions, activeBet);
    //     const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};
    //     // console.log('set recent plays _6.1 ', lastPlay, activeBet, prize, outcome);
    //     // console.log('set recent plays _6.1 ', recentPlays);
    //     setRecentPlays([...recentPlays, lastPlay]);
    //
    //     if (prize === 1) {
    //         setTicket(ticket + prize);
    //     } else {
    //         updateBalance(prize);
    //     }
    // }

    //this is the callback from canvas at video end
    // const videoHasEnded = (newId: number) => {
    //     // console.log('Video has ended! and newID is  _05 ', newId);
    //
    //     // console.log('Canvas video has ended! and newID is at final step  _06 ', newId);
    //     setIsPlaying(false);
    //     //here we match the stop video with the new start video
    //     setNewVideoId(newId - 14);
    //     //set prize and/or ticket
    //     const {prize, outcome} = computePrize(newId, wheelPositions, activeBet);
    //     const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};
    //     // console.log('set recent plays _6.1 ', lastPlay, activeBet, prize, outcome);
    //     // console.log('set recent plays _6.1 ', recentPlays);
    //     setRecentPlays([...recentPlays, lastPlay]);
    //
    //     if (prize === 1) {
    //         setTicket(ticket + prize);
    //     } else {
    //         updateBalance(prize);
    //     }
    // };

    // useEffect(() => {
    //     //@ts-expect-error (if you're using TypeScript, ignore type errors here)
    //     // window.videoHasEnded = (newId: number) => videoHasEnded(newId);
    //
    //     // Cleanup function to remove the global reference when the component unmounts
    //     return () => {
    //         //@ts-expect-error (if you're using TypeScript, ignore type errors here)
    //         delete window.videoHasEnded;
    //     };
    // }, []);
    // const prepareVideo = (index) => {
    //     console.log('se face prepare de video ID care este ', index)
    //     const video = videoRefs.current[index];
    //     if (video) {
    //         video.play().then(() => {
    //             video.pause();
    //             video.currentTime = 0.01;
    //         });
    //     }
    // };
    //
    // useEffect(() => {
    //     const nextIndex = (videoId + 1) % videoBlobs.length;
    //     prepareVideo(nextIndex);
    // }, [videoId]);imageList
    // '/images/output-start.jpg'
    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black w-full h-full overflow-hidden  video-container">
            <div
                style={{backgroundImage: `url('${imageX}')`}}
                className={`bg-cover bg-center absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0`}>
                {/*<Loading/>*/}
            </div>
            {/*{isLoading ? (*/}
            {/*    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">*/}
            {/*        <Loading/>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    videoBlobs.length > 0 &&*/}
            {/*    videoBlobs.map((videoBlob, index) => (*/}
            {/*        <video*/}
            {/*            key={videoBlob}*/}
            {/*            ref={(el) => {*/}
            {/*                videoRefs.current[index] = el*/}
            {/*            }}*/}
            {/*            onEnded={handleVideoEnd}*/}
            {/*            loop={false}*/}
            {/*            controls={false}*/}
            {/*            muted={isMuted}*/}
            {/*            playsInline*/}
            {/*            preload="auto"*/}
            {/*            // poster="/images/frame-0.png"*/}
            {/*            className={`absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0 ${*/}
            {/*                videoId === index + 1 ? "block" : "hidden"*/}
            {/*            }`}*/}
            {/*            src={videoBlob}*/}
            {/*        />*/}

            {/*    ))*/}
            {/*)*/}
            {/*}*/}

            {isLoading ? (
                <div></div>
                // <div
                //     className="bg-[url('/images/S_W_Picture_Wood Wheel_16 9.png')] bg-cover bg-center bg-red-500 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  w-[400px] h-[400px]">
                //     {/*<Loading/>*/}
                // </div>
            ) : (
                <>
                    <div
                        className="bg-[url('/images/S_W_Picture_Wood Wheel_16 9.png')] bg-cover bg-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px]">
                    </div>
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
                                event.preventDefault(); // Prevents default spacebar scrolling behavior
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
                            <div className="relative lg:mr-4 lg:mb-4" key={bet.value}>
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
                        {/*<button onClick={handlePlayVideo}*/}
                        {/*        className="font-red z-2000 border-1 border-solid border-red p-1">Play*/}
                        {/*</button>*/}
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
                            <button onClick={handlePlayVideoDb}
                                    className="font-red z-2000 border-1 border-solid border-red p-1 text-red-800">Play
                            </button>
                            <div className="text-white">{isPlaying ? "plays" : 'end'}</div>

                        </div>
                    </div>
                    <RecentPlays plays={recentPlays} ticket={ticket}/>
                </div>
            </div>
        </div>
    );
};

export default WheelContainer;
