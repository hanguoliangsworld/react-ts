// @ts-nocheck
import { useRef, useEffect } from "react";
import { Recorder } from "@/utils/recorder";
import { Recorder2 } from "@/utils/recorder2";
import { PCMPlayer } from "@/utils/PCMPlayer";
import { Player } from "@/utils/audioContextPlay";

export default function ContentAudio() {
  const audioRef = useRef<any>(null);
  const recorderContext = useRef<any>(null);
  const audioUrl = useRef("");
  const PlayerContext = useRef<any>(null);

  const start = async () => {
    /* let recorder = Recorder.init();
    recorderContext.current = recorder;
    //获取麦克风权限
    let MediaStream = await recorder.getUserMedia();
    // 开始录音
    recorder.beginRecord(MediaStream.msg); */

    // 边录音边播放
    const players: any = new PCMPlayer({ flushingTime: 10 });
    window.navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((mediaStream) => {
        const recorderRef: any = new Recorder2(mediaStream, (buffer: any) => {
          const newBuffer = new Uint8ClampedArray(buffer);
          players.feed(newBuffer);
        });
        recorderRef.start();
      })
      .catch((err) => {});
  };
  const end = () => {
    let url = recorderContext.current.stopRecord();
    audioUrl.current = url;
  };
  const onPlay = () => {
    audioRef.current.src = audioUrl.current;
  };
  const playAudio = () => {
    PlayerContext.current = Player.init();
    PlayerContext.current.playAudio(audioUrl.current);
  };
  const resumeAudio = () => {
    PlayerContext.current.resumeAudio();
  };
  const stopAudio = () => {
    PlayerContext.current.stopAudio();
  };
  return (
    <div>
      <button onClick={start}>开始录制</button>
      <button onClick={end}>停止录制</button>
      <button onClick={onPlay}>播放</button>
      <div>
        <audio ref={audioRef} src="" id="audio" controls autoPlay />
      </div>
      <div>
        <h1>audioContext</h1>
        <button onClick={playAudio}>开始播放</button>
        <button onClick={resumeAudio}>暂停播放</button>
        <button onClick={stopAudio}>停止播放</button>
      </div>
    </div>
  );
}
