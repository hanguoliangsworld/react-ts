// @ts-nocheck
export function PCMPlayer(option) {
  this.init(option);
}

PCMPlayer.prototype.init = function (option) {
  const defaults = {
    encoding: "16bitInt", //编码格式
    channels: 1, //声道
    sampleRate: 8000, //采样率
    flushingTime: 10, //pcm数据刷新间隔
  };
  this.option = Object.assign({}, defaults, option);
  this.samples = new Float32Array();
  this.flush = this.flush.bind(this);
  this.interval = setInterval(this.flush, this.option.flushingTime);
  this.maxValue = this.getMaxValue();
  this.typedArray = this.getTypedArray();
  this.createContext();
};

PCMPlayer.prototype.getMaxValue = function () {
  const encodings = {
    "8bitInt": 128,
    "16bitInt": 32768,
    "32bitInt": 2147483648,
    "32bitFloat": 1,
  };

  return encodings[this.option.encoding]
    ? encodings[this.option.encoding]
    : encodings["16bitInt"];
};

PCMPlayer.prototype.getTypedArray = function () {
  const typedArrays = {
    "8bitInt": Int8Array,
    "16bitInt": Int16Array,
    "32bitInt": Int32Array,
    "32bitFloat": Float32Array,
  };

  return typedArrays[this.option.encoding]
    ? typedArrays[this.option.encoding]
    : typedArrays["16bitInt"];
};

PCMPlayer.prototype.createContext = function () {
  this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  unlockAudioContext(this.audioCtx, this);
  this.gainNode = this.audioCtx.createGain();
  this.gainNode.gain.value = 2;
  this.gainNode.connect(this.audioCtx.destination);
  this.startTime = this.audioCtx.currentTime;
};

function unlockAudioContext(audioCtx, node) {
  if (audioCtx.state === "suspended") {
    const events = ["touchstart", "click"];
    const unlock = function unlock() {
      events.forEach(function (event) {
        node.startTime = node.audioCtx.currentTime;
        document.body.removeEventListener(event, unlock);
      });
      audioCtx.resume();
    };
    events.forEach(function (event) {
      document.body.addEventListener(event, unlock);
    });
  }
}

PCMPlayer.prototype.isTypedArray = function (data) {
  return (
    data.byteLength && data.buffer && data.buffer.constructor == ArrayBuffer
  );
};
// 播放原始pcm裸数据
PCMPlayer.prototype.feed = function (data) {
  if (!this.isTypedArray(data)) return;
  data = this.getFormatedValue(data);
  const tmp = new Float32Array(this.samples.length + data.length);
  tmp.set(this.samples, 0);
  tmp.set(data, this.samples.length);
  this.samples = tmp;
};
// 格式化
PCMPlayer.prototype.getFormatedValue = function (data) {
  var data = new this.typedArray(data.buffer),
    float32 = new Float32Array(data.length),
    i;

  for (i = 0; i < data.length; i++) {
    float32[i] = data[i] / this.maxValue;
  }
  return float32;
};
// 控制播放器音量
PCMPlayer.prototype.volume = function (volume) {
  this.gainNode.gain.value = volume;
};
// 销毁播放器实例
PCMPlayer.prototype.destroy = function () {
  if (this.interval) {
    clearInterval(this.interval);
  }
  this.samples = null;
  this.audioCtx.close();
  this.audioCtx = null;
};

PCMPlayer.prototype.flush = function () {
  if (!this.samples.length) return;
  const bufferSource = this.audioCtx.createBufferSource();
  const length = this.samples.length / this.option.channels;
  const audioBuffer = this.audioCtx.createBuffer(
    this.option.channels,
    length,
    this.option.sampleRate,
  );
  let audioData, channel, offset, i, decrement;

  for (channel = 0; channel < this.option.channels; channel++) {
    audioData = audioBuffer.getChannelData(channel);
    offset = channel;
    decrement = 50;
    for (i = 0; i < length; i++) {
      audioData[i] = this.samples[offset];
      /* // fadein
      if (i < 50) {
        audioData[i] = (audioData[i] * i) / 50;
      }
      // fadeout
      if (i >= length - 51) {
        audioData[i] = (audioData[i] * decrement--) / 50;
      } */
      offset += this.option.channels;
    }
  }

  if (this.startTime < this.audioCtx.currentTime) {
    this.startTime = this.audioCtx.currentTime;
  }
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(this.gainNode);
  bufferSource.start(this.startTime);
  this.startTime += audioBuffer.duration;
  this.samples = new Float32Array();
};