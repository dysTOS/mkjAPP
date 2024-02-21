import { AfterViewInit, Component, Injector, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { SubSink } from 'subsink';
import { MusicTool } from '../../abstract-music-tool.class';
import { TunerContext } from '../../classes/tuner-context.class';
import { DefaultChromaticTunerConfig } from '../../interfaces/chromatic-tuner-config.interface';
import { SynthContext } from '../../classes/synth-context.class';
import { KeyPitch, NoteLanguage, Temperament } from '../../interfaces/key-pitches.interface';

@Component({
  selector: 'mkj-chromatic-tuner',
  templateUrl: './chromatic-tuner.component.html',
  styleUrl: './chromatic-tuner.component.scss',
  providers: [TunerContext, SynthContext],
})
export class ChromaticTunerComponent extends MusicTool implements AfterViewInit, OnDestroy {
  public readonly title: string = 'Stimmgerät';
  public readonly localStorageKey: string = 'chromatic-tuner';
  public readonly tunerConfig = DefaultChromaticTunerConfig;
  public playingKey: KeyPitch;
  public baseFreq: number = 440;

  private _subs = new SubSink();

  constructor(
    inj: Injector,
    public readonly tunerCtx: TunerContext,
    public readonly synthCtx: SynthContext
  ) {
    super(inj);
  }

  public ngAfterViewInit(): void {
    const notesListEl = document.getElementsByClassName('notes-list')?.[0];
    notesListEl.scrollTo({ left: notesListEl.scrollWidth / 2.9 });

    this._subs.sink = interval(500).subscribe(() => {
      if (this.tunerConfig.autoMode) {
        document.getElementsByClassName('active')?.[0]?.scrollIntoView({
          inline: 'center',
          behavior: 'smooth',
        });
      }
    });
  }

  public setBaseTuning(freq: number): void {
    this.tunerCtx.setKeyPitchConfig({
      A4_FREQUENCY: freq,
      TEMPERAMENT: Temperament.EQUAL,
      LANGUAGE: NoteLanguage.GERMAN,
    });
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public onAutoModeChange(): void {
    this.synthCtx.stopAll();
    this.playingKey = null;
  }

  public onKeyClick(key: KeyPitch): void {
    if (this.playingKey?.frequency === key.frequency) {
      this.synthCtx.stopAll();
      this.playingKey = null;
      return;
    }

    if (this.tunerConfig.autoMode === false) {
      this.synthCtx.stopAll();
      this.synthCtx.playKey(key);
      this.playingKey = key;
    }
  }
}
