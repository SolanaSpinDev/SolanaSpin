
console.log('a')
window.a = function () {
    console.log('b')
    // import VideoContext from "videocontext";
    //
    const canvas = document.getElementById("canvas");

    const videoCtx = new VideoContext(canvas);
    const videoNode1 = videoCtx.video(
        "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Start_Gift Box.mp4"
    );
    videoNode1.start(0);
    videoNode1.stop(5);

    const videoNode2 = videoCtx.video(
        "https://solanaspin.io/videos/v2/720p/S_W_Separate_Wood_Result_Gift Box.mp4"
    );
    videoNode2.start(4);


    const crossFade = videoCtx.transition(VideoContext.DEFINITIONS.CROSSFADE);
    crossFade.transition(4, 5, 0.0, 1.0, "mix");

    videoNode1.connect(crossFade);
    videoNode2.connect(crossFade);
    crossFade.connect(videoCtx.destination);

    videoCtx.play();
}
