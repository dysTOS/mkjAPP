export class TunerContext {
  private _audioCtx = window.AudioContext
    ? new AudioContext()
    : (new (window as any).webkitAudioContext() as AudioContext);

  constructor() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = this._audioCtx.createMediaStreamSource(stream);
      const analyser = this._audioCtx.createAnalyser();
      source.connect(analyser);
      analyser.connect(this._audioCtx.destination);
      alert('connected');
    });
  }
}
