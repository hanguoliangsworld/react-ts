// @ts-nocheck
import React, { useRef, useState } from "react";
import { shortTimeEnergy } from "@/utils";
import Recorder from "@/utils/recorder2";

const MaxRecordTime = 15000;
const NoiseVoiceWatershedWave = 2;
const StateLockTime = 300;

const Collect = () => {
  const waveRef = useRef();
  const audioRef = useRef();
  const lastWaveState = useRef();
  const lastWaveUpdateTime = useRef();
  const recordStartTime = useRef();
  const [tryPlaying, setTryPlaying] = useState(false);
  const [recordBlobUrl, setRecordBlobUrl] = useState();

  const getNow = () => {
    return window.performance && window.performance.now
      ? window.performance.now() + window.performance.timing.navigationStart
      : +new Date();
  };

  const start = async () => {
    console.log("开始录制");
    const recorder = Recorder.instance;

    lastWaveState.current = "idle";
    lastWaveUpdateTime.current = getNow();
    recordStartTime.current = getNow();

    recorder.onAudioProcess = (e) => {
      console.log(11111);
      const energy = shortTimeEnergy(e.inputBuffer.getChannelData(0).slice(0));
      const avg = energy.reduce((a, b) => a + b) / energy.length;

      const nextState =
        Math.max(...energy) / avg > NoiseVoiceWatershedWave ? "voice" : "noise";

      if (
        getNow() - lastWaveUpdateTime.current > StateLockTime &&
        lastWaveState.current !== nextState
      ) {
        lastWaveState.current = "idle";
        lastWaveUpdateTime.current = getNow();
        waveRef.current && waveRef.current.setState(nextState);
      }
    };
    recorder.record();
  };
  const end = async () => {
    console.log("停止录制");
    waveRef.current && waveRef.current.setState("idle");

    Recorder.instance.stop();

    const buffer = await Recorder.instance.toWAV();
    const blob = new Blob([new Uint8Array(buffer)], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    setRecordBlobUrl(url);
  };

  const onAudioPlay = () => setTryPlaying(true);
  const onAudioEnded = () => setTryPlaying(false);
  const onTogglePlay = () => {
    if (!audioRef.current) return;

    const $audio = audioRef.current;
    $audio.src = recordBlobUrl;

    if (!tryPlaying) {
      $audio.play().catch((e) => console.log("play error", e));
    } else {
      $audio.pause();
      onAudioEnded();
    }
  };
  return (
    <div>
      <button onClick={start}>开始录制</button>
      <button onClick={end}>停止录制</button>
      <button onClick={onTogglePlay}>播放</button>

      <audio ref={audioRef} onPlay={onAudioPlay} onEnded={onAudioEnded} />
    </div>
  );
};
export default Collect;
