import { useRef } from "react";
import { Player } from "@/utils/audioContextPlay";

export default function ContentAudio() {
  const audioRef = useRef<any>(null);
  const audioUrl = useRef("");
  const PlayerContext = useRef<any>(null);
  const audioRecorder = useRef<any>(null);
  const audioChunks = useRef<any>([]);

  const start = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioRecorder.current = new MediaRecorder(stream);
        audioRecorder.current.addEventListener("dataavailable", (e: any) => {
          audioChunks.current.push(e.data);
        });
        audioChunks.current = [];
        audioRecorder.current.start();
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };
  const end = () => {
    audioRecorder.current.stop();
  };
  const onPlay = () => {
    const blobObj = new Blob(audioChunks.current, { type: "audio/webm" });
    audioUrl.current = URL.createObjectURL(blobObj);
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
