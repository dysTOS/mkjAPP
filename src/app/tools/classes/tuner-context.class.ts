import { Injectable, OnDestroy } from '@angular/core';
import { getAudioContext } from '../constants/getAudioContext.function';
import { Subject } from 'rxjs';
import { KeyPitchesFactory } from './key-pitches-factory.class';
import { KeyPitch } from '../interfaces/key-pitches.interface';

@Injectable()
export class TunerContext implements OnDestroy {
  private _audioCtx: AudioContext = getAudioContext();
  private _analyser: AnalyserNode = this._audioCtx.createAnalyser();
  private _audioData: Uint8Array = new Uint8Array(this._analyser.frequencyBinCount);
  private _micStream: MediaStreamAudioSourceNode;
  private _requestId: number;

  public sub = new Subject<number[]>();
  public fundatementalFreq: number;
  public centsOffPitch: number;
  public note: KeyPitch;

  private _keys = new KeyPitchesFactory().getAllKeys();

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
          //   osc.connect(this._audioCtx.destination);

          //   osc.frequency.value = 438;
          //   //   osc.frequency.linearRampToValueAtTime(800, this._audioCtx.currentTime + 10);

          //   osc.start();
          //   osc.stop(this._audioCtx.currentTime + 10);
          this.detectPitch();
        },
        (err) => {
          alert('Zugriff auf Mikrofon nicht möglich!');
        }
      );
    } else {
      alert('getUserMedia() wird von deinem Browser nicht unterstützt!');
    }
  }

  private detectPitch() {
    let buffer = new Uint8Array(this._analyser.fftSize);
    // See initializations in the AudioContent and AnalyserNode sections of the demo.
    this._analyser.getByteTimeDomainData(buffer);
    var fundalmentalFreq = this.findFundamentalFreq(buffer, this._audioCtx.sampleRate);

    if (fundalmentalFreq !== -1) {
      this.fundatementalFreq = fundalmentalFreq;
      this.findClosestNote(fundalmentalFreq); // See the 'Finding the right note' section.
      this.findCentsOffPitch(fundalmentalFreq); // See the 'Calculating the cents off pitch' section.
    } else {
      this.note = null;
      this.centsOffPitch = null;
      this.fundatementalFreq = null;
    }

    this._requestId = requestAnimationFrame(this.detectPitch.bind(this));
  }

  private findClosestNote(fundamentalFreq: number) {
    var low = 0,
      high = this._keys.length - 1,
      mid,
      nth = 0;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);

      if (this._keys[mid].frequency < fundamentalFreq) {
        low = mid + 1;
      } else if (this._keys[mid].frequency > fundamentalFreq) {
        high = mid - 1;
      } else {
        nth = mid;
        break;
      }

      if (this._keys[mid].frequency < fundamentalFreq) {
        nth = mid;
      }
    }

    this.note = this._keys[nth] ?? null;
  }

  private findCentsOffPitch(freq: number) {
    // We need to find how far freq is from baseFreq in cents
    var log2 = 0.6931471805599453; // Math.log(2)
    var multiplicativeFactor = freq / this.note.frequency;

    // We use Math.floor to get the integer part and ignore decimals
    this.centsOffPitch = Math.floor(1200 * (Math.log(multiplicativeFactor) / log2));
  }

  private findFundamentalFreq(buffer: Uint8Array, sampleRate: number) {
    // We use Autocorrelation to find the fundamental frequency.

    // In order to correlate the signal with itself (hence the name of the algorithm), we will check two points 'k' frames away.
    // The autocorrelation index will be the average of these products. At the same time, we normalize the values.
    // Source: http://www.phy.mty.edu/~suits/autocorrelation.html
    // Assuming the sample rate is 48000Hz, a 'k' equal to 1000 would correspond to a 48Hz signal (48000/1000 = 48),
    // while a 'k' equal to 8 would correspond to a 6000Hz one, which is enough to cover most (if not all)
    // the notes we have in the notes.json file.
    var n = 1024,
      bestR = 0,
      bestK = -1;
    for (var k = 8; k <= 1000; k++) {
      var sum = 0;

      for (var i = 0; i < n; i++) {
        sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
      }

      var r = sum / (n + k);

      if (r > bestR) {
        bestR = r;
        bestK = k;
      }

      if (r > 0.9) {
        // Let's assume that this is good enough and stop right here
        break;
      }
    }

    if (bestR > 0.0025) {
      // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
      var fundamentalFreq = sampleRate / bestK;
      return fundamentalFreq;
    } else {
      // We haven't found a good correlation
      return -1;
    }
  }

  public ngOnDestroy(): void {
    cancelAnimationFrame(this._requestId);
    this._micStream.mediaStream.getTracks().forEach((track) => track.stop());
    this._micStream.disconnect();
    this._analyser.disconnect();
    this._audioCtx.close();
  }
}
