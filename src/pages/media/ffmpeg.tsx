// @ts-nocheck
import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
/* import { createFFmpeg, fetchFile } from "./ffmpeg/src/index"; */

const VideoEditor = () => {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);

  const loadFfmpeg = async () => {
    if (!ffmpeg) {
      const ffmpegInstance = createFFmpeg({
        log: true,
        // corePath: "/ffmpeg/ffmpeg-core.js",
      });

      await ffmpegInstance.load();
      console.log("FFmpeg loaded");
      setFfmpeg(ffmpegInstance);
    }
  };

  const handleVideoUpload = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const cropVideo = async () => {
    if (!ffmpeg || !videoFile) return;

    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));

    const startTime = "00:00:10"; // 裁剪开始的时间
    const duration = "10"; // 裁剪时长

    await ffmpeg.run(
      "-i",
      "input.mp4",
      "-ss",
      startTime,
      "-t",
      duration,
      "-c",
      "copy",
      "output.mp4",
    );

    const data = ffmpeg.FS("readFile", "output.mp4");
    const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
    const videoURL = URL.createObjectURL(videoBlob);

    setOutputVideo(videoURL);
  };

  return (
    <div>
      <h1>Video Editor</h1>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <button onClick={loadFfmpeg}>Load FFmpeg</button>
      <button onClick={cropVideo}>Crop Video</button>
      <div>
        <a href={outputVideo} download="output.mp4">
          下载视频
        </a>
      </div>
      {outputVideo && (
        <video style={{ width: 500, height: 300 }} src={outputVideo} controls />
      )}
    </div>
  );
};

export default VideoEditor;
