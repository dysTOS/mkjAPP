import { Component, Injector } from '@angular/core';
import { TunerContext } from '../classes/tuner-context.class';
import { MusicTool } from '../abstract-music-tool.class';

@Component({
  selector: 'mkj-tuner',
  templateUrl: './tuner.component.html',
  styleUrl: './tuner.component.scss',
  providers: [TunerContext],
})
export class TunerComponent extends MusicTool {
  public readonly title: string = 'Stimmgerät';
  public readonly localStorageKey: string = 'tuner';

  constructor(
    inj: Injector,
    public tunerCtx: TunerContext
  ) {
    super(inj);
  }
}
