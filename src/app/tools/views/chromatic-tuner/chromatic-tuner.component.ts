import { Component, Injector } from '@angular/core';
import { TunerContext } from '../../classes/tuner-context.class';
import { MusicTool } from '../../abstract-music-tool.class';

@Component({
  selector: 'mkj-chromatic-tuner',
  templateUrl: './chromatic-tuner.component.html',
  styleUrl: './chromatic-tuner.component.scss',
  providers: [TunerContext],
})
export class ChromaticTunerComponent extends MusicTool {
  public readonly title: string = 'Chromatisches Stimmgerät';
  public readonly localStorageKey: string = 'chromatic-tuner';

  constructor(
    inj: Injector,
    public tunerCtx: TunerContext
  ) {
    super(inj);
  }
}
