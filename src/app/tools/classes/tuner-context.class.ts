import { Injectable, OnDestroy } from '@angular/core';
import { getAudioContext } from '../getAudioContext.function';
import { Subject } from 'rxjs';

@Injectable()
export class TunerContext implements OnDestroy {
  private _audioCtx: AudioContext = getAudioContext();
  private _analyser: AnalyserNode = this._audioCtx.createAnalyser();
  private _audioData: Uint8Array = new Uint8Array(this._analyser.frequencyBinCount);
  private _micStream: MediaStreamAudioSourceNode;
  private _requestId: number;

  public sub = new Subject<number[]>();

  constructor() {
    this.init();
  }

  private init() {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(
        (stream) => {
          this._micStream = this._audioCtx.createMediaStreamSource(stream);
          this._micStream.connect(this._analyser);
          //   const osc = this._audioCtx.createOscillator();
          //   osc.connect(this._analyser);
          //   osc.frequency.value = 440;
          //   osc.start();
          this.play();
        },
        (err) => {
          alert('Zugriff auf Mikrofon nicht möglich!');
        }
      );
    } else {
      alert('getUserMedia() wird von deinem Browser nicht unterstützt!');
    }
  }

  private play() {
    this._analyser.getByteFrequencyData(this._audioData);
    this.sub.next(Array.from(this._audioData));
    //   console.log(data);

    // get fullest bin
    var idx = 0;
    for (var j = 0; j < this._analyser.frequencyBinCount; j++) {
      if (this._audioData[j] > this._audioData[idx]) {
        idx = j;
      }
    }

    var frequency = (idx * this._audioCtx.sampleRate) / this._analyser.fftSize;
    // console.log(frequency);

    this._requestId = requestAnimationFrame(this.play.bind(this));
  }

  public ngOnDestroy(): void {
    cancelAnimationFrame(this._requestId);
    this._micStream.mediaStream.getTracks().forEach((track) => track.stop());
    this._micStream.disconnect();
    this._analyser.disconnect();
    this._audioCtx.close();
  }
}
