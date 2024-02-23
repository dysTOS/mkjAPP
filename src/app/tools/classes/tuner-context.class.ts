import { Injectable, OnDestroy } from '@angular/core';
import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import { getAudioContext } from '../constants/getAudioContext.function';
import { PitchDetectionAlgorithms } from '../constants/pda-algorithm-options';
import { KeyPitchesConfig } from '../interfaces/key-pitches.interface';
import { KeyPitchesFactory } from './key-pitches-factory.class';
import { Subject, bufferTime, debounceTime, map } from 'rxjs';

@Injectable()
export class TunerContext implements OnDestroy {
  private _audioCtx: AudioContext = getAudioContext();
  private _analyser: AnalyserNode = this._audioCtx.createAnalyser();
  private _micStream: MediaStreamAudioSourceNode;
  private _requestId: number;

  public fundatementalFreq: number;
  public centsOffPitch: number;
  public noteIndex: number;

  private readonly _displayFrequ = new Subject<number>();
  private readonly _displayCents = new Subject<number>();
  public readonly displayFrequ = this._displayFrequ.pipe(
    bufferTime(500),
    map((freqs) => freqs.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / freqs.length)
  );
  public readonly displayCents = this._displayCents.pipe(
    bufferTime(500),
    map((cents) => cents.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / cents.length)
  );

  public keys = new KeyPitchesFactory().getAllKeys();

  public readonly pitchDetectionAlgorithms: UiDropdownOption[] = PitchDetectionAlgorithms;
  public selectedPDA = this.pitchDetectionAlgorithms[2].value;

  constructor() {
    this.init();
  }

  public setKeyPitchConfig(config: KeyPitchesConfig): void {
    this.keys = new KeyPitchesFactory(config).getAllKeys();
  }

  public setTestOscillator(on: boolean): void {
    if (on === false) {
      this._micStream.connect(this._analyser);
      return;
    }

    this._micStream.disconnect();
    const osc = this._audioCtx.createOscillator();
    osc.connect(this._analyser);
    osc.connect(this._audioCtx.destination);

    osc.frequency.value = 438;
    osc.frequency.linearRampToValueAtTime(500, this._audioCtx.currentTime + 50);

    osc.start(this._audioCtx.currentTime);
    osc.stop(this._audioCtx.currentTime + 50);
  }

  private init() {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(
        (stream) => {
          this._micStream = this._audioCtx.createMediaStreamSource(stream);
          this.setTestOscillator(false);
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
    const fundalmentalFreq = this.selectedPDA(buffer, this._audioCtx.sampleRate);
    this._displayFrequ.next(fundalmentalFreq);

    if (fundalmentalFreq !== -1) {
      this.fundatementalFreq = fundalmentalFreq;
      this.findClosestNote(fundalmentalFreq); // See the 'Finding the right note' section.
      this.findCentsOffPitch(fundalmentalFreq); // See the 'Calculating the cents off pitch' section.
    } else {
      this.noteIndex = null;
      this.centsOffPitch = null;
      this.fundatementalFreq = null;
    }

    this._requestId = requestAnimationFrame(this.detectPitch.bind(this));
  }

  private findClosestNote(fundamentalFreq: number) {
    let low = 0,
      high = this.keys.length - 1,
      mid = 0,
      nth = 0;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);

      if (this.keys[mid].frequency < fundamentalFreq) {
        low = mid + 1;
      } else if (this.keys[mid].frequency > fundamentalFreq) {
        high = mid - 1;
      } else {
        nth = mid;
        break;
      }

      if (this.keys[mid].frequency < fundamentalFreq) {
        nth = mid;
      }
    }

    if (
      Math.abs(fundamentalFreq - this.keys[nth]?.frequency) < Math.abs(fundamentalFreq - this.keys[nth + 1]?.frequency)
    ) {
      this.noteIndex = nth ?? null;
    } else {
      this.noteIndex = nth ? nth + 1 : null;
    }
  }

  private findCentsOffPitch(freq: number) {
    // We need to find how far freq is from baseFreq in cents
    const log2 = 0.6931471805599453; // Math.log(2)
    const multiplicativeFactor = freq / this.keys[this.noteIndex]?.frequency;

    // We use Math.floor to get the integer part and ignore decimals
    this.centsOffPitch = Math.floor(1200 * (Math.log(multiplicativeFactor) / log2));
    this._displayCents.next(this.centsOffPitch);
  }

  public ngOnDestroy(): void {
    cancelAnimationFrame(this._requestId);
    this._micStream?.mediaStream.getTracks().forEach((track) => track.stop());
    this._micStream?.disconnect();
    this._analyser.disconnect();
    this._audioCtx.close();
  }
}
