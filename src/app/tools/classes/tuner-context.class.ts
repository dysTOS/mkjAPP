import { Injectable, OnDestroy } from '@angular/core';
import { getAudioContext } from '../constants/getAudioContext.function';
import { Subject } from 'rxjs';
import { KeyPitchesFactory } from './key-pitches-factory.class';
import { KeyPitch } from '../interfaces/key-pitches.interface';
import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import { autoCorrelate2 } from '../pitch-detection-algorithms/auto-correlate-2.function';
import { autoCorrelate1 } from '../pitch-detection-algorithms/auto-correlate-1.function';
import { acf2plusAlgorithm } from '../pitch-detection-algorithms/acf2plus.function';
import { amdfAlgorithm } from '../pitch-detection-algorithms/amdf.function';
import { dynamicWaveletAlgorithm } from '../pitch-detection-algorithms/dynamic-wavelet.function';
import { macleodAlgorithm } from '../pitch-detection-algorithms/macleod.function';
import { yinAlgorithm } from '../pitch-detection-algorithms/yin.function';

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

  public pitchDetectionAlgorithms: UiDropdownOption[] = [
    {
      label: 'Auto Correlate 1',
      value: autoCorrelate1,
    },
    {
      label: 'Auto Correlate 2',
      value: autoCorrelate2,
    },
    {
      label: 'ACF2Plus',
      value: acf2plusAlgorithm,
    },
    {
      label: 'AMDF',
      value: amdfAlgorithm,
    },
    {
      label: 'Dynamic Wavelet',
      value: dynamicWaveletAlgorithm,
    },
    {
      label: 'Yin',
      value: yinAlgorithm,
    },
    {
      label: 'Macleod - BUG!!',
      value: macleodAlgorithm,
    },
  ];
  public selectedPDA = this.pitchDetectionAlgorithms[1].value;

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
          //   osc.frequency.linearRampToValueAtTime(800, this._audioCtx.currentTime + 10);

          //   osc.start(this._audioCtx.currentTime + 2);
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
    let buffer = new Float32Array(this._analyser.fftSize);
    // See initializations in the AudioContent and AnalyserNode sections of the demo.
    this._analyser.getFloatTimeDomainData(buffer);
    this.sub.next(Array.from(buffer));
    var fundalmentalFreq = this.selectedPDA(buffer, this._audioCtx.sampleRate);

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

  public ngOnDestroy(): void {
    cancelAnimationFrame(this._requestId);
    this._micStream.mediaStream.getTracks().forEach((track) => track.stop());
    this._micStream.disconnect();
    this._analyser.disconnect();
    this._audioCtx.close();
  }
}
