import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { TunerContext } from '../../classes/tuner-context.class';
import { MusicTool } from '../../abstract-music-tool.class';
import { interval } from 'rxjs';

@Component({
  selector: 'mkj-chromatic-tuner',
  templateUrl: './chromatic-tuner.component.html',
  styleUrl: './chromatic-tuner.component.scss',
  providers: [TunerContext],
})
export class ChromaticTunerComponent extends MusicTool implements AfterViewInit {
  public readonly title: string = 'Chromatisches Stimmgerät';
  public readonly localStorageKey: string = 'chromatic-tuner';

  constructor(
    inj: Injector,
    public tunerCtx: TunerContext
  ) {
    super(inj);
  }

  public ngAfterViewInit(): void {
    interval(1000).subscribe(() => {
      document.getElementsByClassName('active')?.[0]?.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
      });
    });
  }
}
