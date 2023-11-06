// @ts-nocheck
/* eslint-disable no-restricted-globals */
// import { Mp3Encoder } from 'lamejs'
import { resample } from "wave-resampler";
// import { encode as base64Encode } from 'base64-arraybuffer'
import { shortTimeEnergy } from "@/utils";

function mergeArray(list) {
  const length = list.length * list[0].length;
  const data = new Float32Array(length);
  let offset = 0;
  for (let i = 0; i < list.length; i++) {
    data.set(list[i], offset);
    offset += list[i].length;
  }
  return data;
}

// function float32ToInt16(audioBuffers, inputSampleRate, outputSampleRate) {
//   const float32 = resample(
//     mergeArray(audioBuffers),
//     inputSampleRate,
//     outputSampleRate,
//   )
//   const int16 = Int16Array.from(
//     float32.map(x => (x > 0 ? x * 0x7fff : x * 0x8000)),
//   )
//   return int16
// }

function writeUTFBytes(view, offset, string) {
  var lng = string.length;
  for (let i = 0; i < lng; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function createWavBuffer(audioData, sampleRate = 44100, channels = 1) {
  // audioData = mergeArray(audioData)
  const WAV_HEAD_SIZE = 44;
  const buffer = new ArrayBuffer(audioData.length * 2 + WAV_HEAD_SIZE);
  // 需要用一个view来操控buffer
  const view = new DataView(buffer);
  // 写入wav头部信息
  // RIFF chunk descriptor/identifier
  writeUTFBytes(view, 0, "RIFF");
  // RIFF chunk length
  view.setUint32(4, 44 + audioData.length * 2, true);
  // RIFF type
  writeUTFBytes(view, 8, "WAVE");
  // format chunk identifier
  // FMT sub-chunk
  writeUTFBytes(view, 12, "fmt ");
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // stereo (2 channels)
  view.setUint16(22, channels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, channels * 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data sub-chunk
  // data chunk identifier
  writeUTFBytes(view, 36, "data");
  // data chunk length
  view.setUint32(40, audioData.length * 2, true);

  // 写入PCM数据
  let index = 44;
  const volume = 1;
  const { length } = audioData;
  for (let i = 0; i < length; i++) {
    view.setInt16(index, audioData[i] * (0x7fff * volume), true);
    index += 2;
  }
  return buffer;
}

self.addEventListener("message", (event) => {
  const {
    data: {
      type,
      // format,
      audioBuffers,
      inputSampleRate,
      outputSampleRate,
      // kbps = 64,
    },
  } = event;

  if (type === "short-energy") {
    self.postMessage(shortTimeEnergy(mergeArray(audioBuffers)));
  }

  if (type === "wav") {
    const samples = resample(
      mergeArray(audioBuffers),
      inputSampleRate,
      outputSampleRate,
    );
    self.postMessage(createWavBuffer(samples, outputSampleRate));
  }
});
