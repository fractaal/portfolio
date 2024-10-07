// playback position hack:
// https://github.com/WebAudio/web-audio-api/issues/2397#issuecomment-459514360

// composite audio node:
// https://github.com/GoogleChromeLabs/web-audio-samples/wiki/CompositeAudioNode

// extends the interface of AudioBufferSourceNode with a `playbackPosition` property
export class PlaybackPositionNode {
  private _bufferSource: AudioBufferSourceNode;
  private _splitter: ChannelSplitterNode;
  private _out: ChannelMergerNode;
  private _sampleHolder: Float32Array;

  private _analyser: AnalyserNode | null;

  private context: AudioContext;

  constructor(context: AudioContext) {
    this.context = context;

    // initialize component audio nodes
    this._bufferSource = new AudioBufferSourceNode(context);
    this._splitter = new ChannelSplitterNode(context);
    this._out = new ChannelMergerNode(context);
    this._sampleHolder = new Float32Array(1);

    this._analyser = null;
  }

  // get current progress between 0 and 1
  get playbackPosition() {
    this._analyser?.getFloatTimeDomainData(this._sampleHolder);
    return this._sampleHolder[0];
  }

  get duration() {
    return this._bufferSource.buffer?.duration;
  }

  // creates an AudioBuffer with an extra `position` track
  set buffer(audioBuffer: AudioBuffer) {
    // create a new AudioBuffer of the same length as param with one extra channel
    // load it into the AudioBufferSourceNode
    this._bufferSource.buffer = new AudioBuffer({
      length: audioBuffer.length,
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels + 1,
    });

    // copy data from the audioBuffer arg to our new AudioBuffer
    for (let index = 0; index < audioBuffer.numberOfChannels; index++) {
      this._bufferSource.buffer.copyToChannel(
        audioBuffer.getChannelData(index),
        index,
      );
    }

    // fill up the position channel with numbers from 0 to 1
    // most performant implementation to create the big array is via "for"
    // https://stackoverflow.com/a/53029824
    const length = audioBuffer.length;
    const timeDataArray = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      timeDataArray[i] = i / length;
    }
    this._bufferSource.buffer.copyToChannel(
      timeDataArray,
      audioBuffer.numberOfChannels,
    );

    // split the channels
    this._bufferSource.connect(this._splitter);

    // connect all the audio channels to the line out
    for (let index = 0; index < audioBuffer.numberOfChannels; index++) {
      this._splitter.connect(this._out, index, index);
    }

    // connect the position channel to an analyzer so we can extract position data
    this._analyser = new AnalyserNode(this.context);
    this._splitter.connect(this._analyser, audioBuffer.numberOfChannels);
  }

  get buffer(): AudioBuffer | null {
    return this._bufferSource.buffer;
  }

  // forward component node properties

  get loop() {
    return this._bufferSource.loop;
  }

  set loop(val) {
    this._bufferSource.loop = val;
  }

  get playbackRate() {
    return this._bufferSource.playbackRate;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  start(...args: any[]) {
    this._bufferSource.start(...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stop(...args: any[]) {
    this._bufferSource.stop(...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._out.connect(...args);
  }
}
