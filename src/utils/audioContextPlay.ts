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
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext())();
    this.bufferSource = this.audioContext.createBufferSource(); // 创建音频源头姐点
    const res = await fetch(audioUrl);
    const arrayBuffer = await res.arrayBuffer(); // byte array字节数组
    const audioBuffer = await this.audioContext.decodeAudioData(
      arrayBuffer,
      function (decodeData) {
        return decodeData;
      },
    );

    this.bufferSource.buffer = audioBuffer; // 设置数据
    this.bufferSource.loop = true; //设置，循环播放
    this.bufferSource.connect(this.audioContext.destination); // 头尾相连
    // 可以对音频做任何控制
    this.bufferSource.start(0); //立即播放
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
