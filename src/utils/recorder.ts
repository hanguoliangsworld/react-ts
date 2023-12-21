// @ts-nocheck

import { PCMPlayer } from "@/utils/PCMPlayer";
enum status {
  success = 200,
  error = 500,
}

let leftDataList: any[] = [];
let rightDataList: any[] = [];
let players: any = null;

//录音
export class Recorder {
  static instance: any;
  public mediaStreams: MediaStream | undefined;
  public jsNodes: ScriptProcessorNode | undefined;
  public mediaNodes: MediaStreamAudioSourceNode | undefined;
  public pcmData: [];

  //初始化，单例模式
  static init(): Recorder {
    if (!this.instance) {
      this.instance = new Recorder();
    }
    return this.instance;
  }

  //获取麦克风权限
  getUserMedia() {
    return new Promise<{ code: status; msg: MediaStream }>(
      (resolve, reject) => {
        window.navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((mediaStream) => {
            this.mediaStreams = mediaStream;
            resolve({
              code: status.success,
              msg: mediaStream,
            });
          })
          .catch((err) => {
            reject({
              code: status.error,
              msg: err,
            });
          });
      },
    );
  }

  beginRecord(mediaStream: MediaStream) {
    // 1、创建音频模块
    let audioContext = new window.AudioContext();
    // 2、创建音频接口
    let mediaNode = audioContext.createMediaStreamSource(mediaStream);
    this.mediaNodes = mediaNode;
    // 3、创建音频节点 用于通过js直接处理音频。
    let jsNode = audioContext.createScriptProcessor(4096, 2, 2); // 缓冲区大小 声道数 声道数
    this.jsNodes = jsNode;
    // 4、链接扬声器
    jsNode.connect(audioContext.destination);
    // 5、把mediaNode链接到jsNode
    mediaNode.connect(jsNode);
    // 6、收集数据
    jsNode.onaudioprocess = (event) => {
      let audioBuffer = event.inputBuffer;
      //左声道
      let leftChannelData = audioBuffer.getChannelData(0);
      //右声道
      let rightChannelData = audioBuffer.getChannelData(1);
      leftDataList.push([...leftChannelData]);
      rightDataList.push([...rightChannelData]);
      this.playPcm();
    };
    this.pcmData = [];

    players = new PCMPlayer({ flushingTime: 10, channels: 2 });
  }

  playPcm() {
    //合并左右声道
    let leftData = this.mergeArray(leftDataList),
      rightData = this.mergeArray(rightDataList);
    //交叉合并左右声道
    let allData = this.interleaveLeftAndRight(leftData, rightData);
    const float32Array = new Float32Array(allData);
    players.feed(float32Array.buffer);
  }

  // 收集录音信息，大概0.09s调用一次
  onAudioProcess(event: any) {
    let audioBuffer = event.inputBuffer;
    //左声道
    let leftChannelData = audioBuffer.getChannelData(0);
    //右声道
    let rightChannelData = audioBuffer.getChannelData(1);
    leftDataList.push([...leftChannelData]);
    rightDataList.push([...rightChannelData]);
    this.playPcm();
  }

  //停止录音
  stopRecord() {
    if (this.jsNodes && this.mediaNodes) {
      this.jsNodes.disconnect();
      this.mediaNodes.disconnect();
    }
    //合并左右声道
    let leftData = this.mergeArray(leftDataList),
      rightData = this.mergeArray(rightDataList);
    //交叉合并左右声道
    let allData = this.interleaveLeftAndRight(leftData, rightData);
    let wavBuffer = this.createWavFile(allData);
    this.pcmData = allData;
    return this.playRecord(wavBuffer);
  }

  //返回src
  playRecord(arrayBuffer: ArrayBuffer) {
    let blob = new Blob([new Uint8Array(arrayBuffer)]);
    let blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }

  //合并左声道和右声道
  mergeArray(list: any[]) {
    let length = list.length * list[0].length;
    let data = new Float32Array(length),
      offset = 0;
    for (let i = 0; i < list.length; i++) {
      data.set(list[i], offset);
      offset += list[i].length;
    }
    return data;
  }

  //交叉合并左右声道
  interleaveLeftAndRight(left: Float32Array, right: Float32Array) {
    let totalLength = left.length + right.length;
    let data = new Float32Array(totalLength);
    for (let i = 0; i < left.length; i++) {
      let k = i * 2;
      data[k] = left[i];
      data[k + 1] = right[i];
    }
    return data;
  }

  //将PCM数据转换成wav
  createWavFile(audioData: Float32Array) {
    const WAV_HEAD_SIZE = 44;
    let buffer = new ArrayBuffer(audioData.length * 2 + WAV_HEAD_SIZE),
      view = new DataView(buffer);
    this.writeUTFBytes(view, 0, "RIFF");
    view.setUint32(4, 44 + audioData.length * 2, true);
    this.writeUTFBytes(view, 8, "WAVE");
    this.writeUTFBytes(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 2, true);
    view.setUint32(24, 44100, true);
    view.setUint32(28, 44100 * 2, true);
    view.setUint16(32, 2 * 2, true);
    view.setUint16(34, 16, true);
    this.writeUTFBytes(view, 36, "data");
    view.setUint32(40, audioData.length * 2, true);

    // 写入PCM数据
    let length = audioData.length;
    let index = 44;
    let volume = 1;
    for (let i = 0; i < length; i++) {
      view.setInt16(index, audioData[i] * (0x7fff * volume), true);
      index += 2;
    }
    return buffer;
  }

  writeUTFBytes(view: DataView, offset: number, string: string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
}
