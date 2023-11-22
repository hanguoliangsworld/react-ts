// @ts-nocheck
export class Player {
  static instance: any;
  public audioContext: AudioContext;
  public bufferSource: AudioBufferSourceNode;

  //初始化，单例模式
  static init(): Player {
    if (!this.instance) {
      this.instance = new Player();
    }
    return this.instance;
  }
  // 开始播放
  async playAudio(audioUrl: string) {
    if (this.audioContext) {
      console.log("正在播放中");
    }
    // 1、创建音频模块
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext())();
    // 2、创建音频源头节点
    this.bufferSource = this.audioContext.createBufferSource();
    // 3、读取文件的rawData并且转化为AudioBuffer
    const res = await fetch(audioUrl);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(
      arrayBuffer,
      function (decodeData) {
        return decodeData;
      },
    );
    // 4、播放
    this.bufferSource.buffer = audioBuffer; // 设置数据
    this.bufferSource.loop = true; //设置，循环播放
    // this.bufferSource.playbackRate = 2; // 速度
    this.bufferSource.connect(this.audioContext.destination); // 头尾相连
    // 可以对音频做任何控制
    this.bufferSource.start(0); //立即播放

    // 设置音量
    /* const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 3;
    gainNode.connect(this.audioContext.destination); */
  }

  // 暂停
  async resumeAudio() {
    if (this.audioContext.state === "running") {
      this.audioContext.suspend();
    } else if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }
  // 停止
  async stopAudio() {
    this.bufferSource.stop();
  }
}
