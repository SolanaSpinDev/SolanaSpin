// const videoSourcesHighRes = [
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Gift Box.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X0.1 C.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Diamond.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_No Win C.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X5.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X0.1 B.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X0.5 B.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Ticket.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X0.1 A.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Free Spin.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_No Win B.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X50.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_No Win A.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_X0.5 A.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_Gift Box.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X0.1 C.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_Diamond.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_No Win C.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X5.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X0.1 B.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X0.5 B.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_Ticket.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X0.1 A.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_Free Spin.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_No Win B.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X50.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_No Win A.mp4",
//     "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_X0.5 A.mp4",
// ];

let videoCtx = null;
let videoNodes = [];
// const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initContext = () => {
    
    let canvas = document.getElementById("canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "canvas"; 
        canvas.width = 320; 
        canvas.height = 180; 
        canvas.className = "main-canvas"; 
        document.body.prepend(canvas);
    }

    videoCtx = new VideoContext(canvas);
    videoNodes = [
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Start_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4"),
        videoCtx.video("/videos/720p/S_W_Separate_Wood_Result_Diamond.mp4")
    ];
}

if (typeof window !== 'undefined') {
    window.a = (startId, stopId) => {
        console.log('startId in vide-init is _02 ', startId);
        console.log('stopId in vide-init is _02 ', stopId);
        // const newId = getRandomNumber(14, 27);
        
        // console.log('newId in video-init.js _03 ', newId);

        /**
         * init the video context
         * */
        if (!videoCtx) {
            console.log('we need to init the context')
            initContext();
        } else {
            console.log('already have a context')
        }


        // const updateCallback = (currentNewId) => {
        //     const callBack = () => {
        //         // console.log("Playback ended in video-init.js");
        //
        //         // Call the React callback if it exists
        //         if (window.videoHasEnded) {
        //             // console.log("video has ended callback, and newId is _04 ", currentNewId);
        //             window.videoHasEnded(currentNewId);
        //         }
        //     };
        //
        //     if (videoCtx) {
        //         videoCtx.unregisterCallback(VideoContext.EVENTS.ENDED, callBack);
        //         videoCtx.registerCallback(VideoContext.EVENTS.ENDED, callBack);
        //     }
        // };


        // updateCallback(newId);


        // Add a callback to pause at the last frame of the second video
        // videoCtx.registerCallback(VideoContext.EVENTS.ENDED, () => {
        //     videoCtx.pause();
        //     // videoCtx.currentTime = 9;
        //     console.log("Playback paused at the last frame of the second video.");
        // });


        const crossFade = videoCtx.transition(VideoContext.DEFINITIONS.CROSSFADE);

        videoNodes[startId].start(0);
        videoNodes[startId].stop(5);
        videoNodes[startId].connect(crossFade);

        videoNodes[stopId].start(4);
        videoNodes[stopId].stop(11);
        videoNodes[stopId].connect(crossFade);

        crossFade.transition(4, 5, 0.0, 1.0);
        crossFade.connect(videoCtx.destination);
        crossFade.currentTime = 0;
        videoCtx.currentTime = 0;
        videoCtx.play();

        // videoCtx.unregisterCallback(VideoContext.EVENTS.ENDED, callBack);
    }
}

