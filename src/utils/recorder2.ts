// @ts-nocheck
export const Recorder2 = function (
  stream,
  callBack,
  config = { sampleBits: 16, sampleRate: 8000 },
) {
  // 输出采样数位 8，16、输出采样率
  const { sampleBits, sampleRate } = config;
  // 创建音频上下文
  const context = new (window.AudioContext || window.webkitAudioContext)();

  const gainNode = context.createGain();
  gainNode.gain.value = 2;

  // 创建音频输入源，需要传入一个媒体流对象
  const audioInput = context.createMediaStreamSource(stream);
  // 录音节点
  const recorder = context.createScriptProcessor(4096, 1, 1);

  const audioData = {
    // 音频数据大小
    size: 0,
    // 音频数据缓存
    buffer: [],
    // 输入采样率
    inputSampleRate: context.sampleRate,
    // 输入采样数位
    inputSampleBits: sampleBits,
    // 输出采样率
    outputSampleRate: sampleRate,
    // 输出采样数位
    outputSampleBits: sampleBits,

    clear: function () {
      this.size = 0;
      this.buffer = [];
    },
    // 输入音频数据
    input: function (data) {
      this.buffer.push(new Float32Array(data));
      this.size += data.length;
    },
    // 合并压缩
    compress: function () {
      // 合并
      const data = new Float32Array(this.size);
      // 偏移量计算
      let offset = 0;
      // 将二维数据转为一维数据
      for (let i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset);
        offset += this.buffer[i].length;
      }
      // 压缩
      const getRawDataion = parseInt(
        this.inputSampleRate / this.outputSampleRate,
      );
      const length = data.length / getRawDataion;
      const result = new Float32Array(length);
      let index = 0,
        j = 0;
      while (index < length) {
        result[index] = data[j];
        j += getRawDataion;
        index++;
      }
      return result;
    },
    // 编码为PCM文件
    encodePCM: function () {
      const sampleBits = Math.min(this.inputSampleBits, this.outputSampleBits);
      const bytes = this.compress();
      const dataLength = bytes.length * (sampleBits / 8);
      const buffer = new ArrayBuffer(dataLength);
      const data = new DataView(buffer);
      let offset = 0;
      for (let i = 0; i < bytes.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, bytes[i]));
        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
      return buffer;
    },
  };

  // 开始录音
  this.start = function () {
    audioInput.connect(recorder);
    recorder.connect(context.destination);
  };

  // 停止录音
  this.stop = function () {
    recorder.disconnect();
  };

  // 获取录音 blob
  this.getBlob = function () {
    return audioData.encodePCM();
  };

  this.clear = function () {
    audioData.clear();
  };

  // 采集音频
  recorder.onaudioprocess = function (e) {
    // getChannelData返回Float32Array类型的pcm数据
    audioData.input(e.inputBuffer.getChannelData(0));
    const pcmData = audioData.encodePCM();
    callBack(pcmData);
    audioData.clear();
  };
};
