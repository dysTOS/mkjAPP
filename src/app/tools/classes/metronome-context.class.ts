import { Injectable, OnDestroy } from '@angular/core';
import { getAudioContext } from '../constants/getAudioContext.function';
import { Observable, Subject, interval } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable()
export class MetronomeContext implements OnDestroy {
  public metronomeConfig = {
    numerator: 4,
    denominator: 4,
    bpm: 120,
    gain: 0.5,
  };

  public readonly count$ = new Subject<number>();

  private _audioCtx = getAudioContext();
  private _masterGainNode = this._audioCtx.createGain();

  private _beatInterval: Observable<number>;

  private FREQUENCY = 1000;

  private _subs = new SubSink();

  constructor() {
    this._masterGainNode.connect(this._audioCtx.destination);
  }

  public ngOnDestroy(): void {
    this.stop();
    this._subs.unsubscribe();
    this._audioCtx.close();
  }

  public start(): void {
    this.stop();
    if (this.metronomeConfig.bpm > 400 || this.metronomeConfig.bpm < 20) {
      this.metronomeConfig.bpm = 120;
    }
    const beatLength = (60 / this.metronomeConfig.bpm) * 1000;
    this._beatInterval = interval(beatLength);
    this._subs.sink = this._beatInterval.subscribe((count: number) => {
      const beat = count % this.metronomeConfig.numerator;
      this.count$.next(beat + 1);
      this.playClick(beat === 0);
    });
  }

  public stop(): void {
    this._subs.unsubscribe();
    this._beatInterval = null;
  }

  private playClick(accent: boolean = false): void {
    const frequency = accent ? this.FREQUENCY * 2 : this.FREQUENCY;
    const click = this._audioCtx.createOscillator();
    click.connect(this._masterGainNode);
    click.frequency.value = frequency;
    click.start();
    click.stop(this._audioCtx.currentTime + 0.05);
  }
}
