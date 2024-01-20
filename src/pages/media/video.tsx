import { useRef } from "react";

export default function ContentAudio() {
  const videoRef = useRef<any>(null);
  const mediaRecorder = useRef<any>(null);
  const mediaStreamTrack = useRef<any>(null);

  // 开始录屏
  const startRecorder = async () => {
    mediaStreamTrack.current = await navigator.mediaDevices.getUserMedia({
      //video: true,
      video: { width: 600, height: 300 },
      audio: true,
    });
    videoRef.current.srcObject = mediaStreamTrack.current;
    videoRef.current.onloadedmetadata = () => videoRef.current.play();

    // 其他格式
    // "video/webm",
    // "audio/webm",
    // "video/webm;codecs=vp8",
    // "video/webm;codecs=daala",
    // "video/webm;codecs=h264",
    // "audio/webm;codecs=opus",
    // "video/mpeg",
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
      ? "video/webm; codecs=vp9"
      : "video/webm";
    mediaRecorder.current = new MediaRecorder(mediaStreamTrack.current, {
      mimeType: mime,
    });

    let chunks: any = [];
    mediaRecorder.current.addEventListener("dataavailable", function (e: any) {
      chunks.push(e.data);
    });
    mediaRecorder.current.addEventListener("stop", function () {
      let blob = new Blob(chunks, {
        type: chunks[0].type,
      });
      let url = URL.createObjectURL(blob);

      // 将video切换成录制的视频
      videoRef.current.srcObject = null;
      videoRef.current.src = url;
      videoRef.current.onloadedmetadata = () => videoRef.current.play();

      // 下载至本地
      /* let a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4";
      a.click(); */
    }); // 必须手动启动
    mediaRecorder.current.start();
  };

  // 停止录屏
  function stopRecorder() {
    mediaStreamTrack.current.getVideoTracks().forEach((track: any) => {
      track.stop();
    });
    mediaRecorder.current.stop();
  }

  // 截取图片
  function clipPhoto() {
    let canvas = document.createElement("canvas");
    let { width, height } = videoRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    // 下载图片、
    let a = document.createElement("a");
    a.download = "image";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }
  return (
    <div>
      <div id="contentHolder">
        <video id="video" width="600" height="300" ref={videoRef} controls />
      </div>
      <button onClick={startRecorder}>开始录屏</button>
      <button onClick={stopRecorder}>停止录屏</button>
      <button onClick={clipPhoto}>截取图片</button>
    </div>
  );
}
