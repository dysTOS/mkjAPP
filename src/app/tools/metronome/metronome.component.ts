import { Component, Injector, OnDestroy } from '@angular/core';
import { MusicTool } from '../abstract-music-tool.class';
import { MetronomeContext } from '../classes/metronome-context.class';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrl: './metronome.component.scss',
  providers: [MetronomeContext],
})
export class MetronomeComponent extends MusicTool implements OnDestroy {
  public readonly title: string = 'Metronom';
  public readonly localStorageKey: string = 'metronome';

  public count: number = 0;
  public isPlaying: boolean = false;

  private _subs = new SubSink();

  constructor(
    public ctx: MetronomeContext,
    injector: Injector
  ) {
    super(injector);
    this._subs.sink = this.ctx.count$.subscribe((count: number) => {
      this.count = count;
    });
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public start(): void {
    this.ctx.start();
    this.isPlaying = true;
  }

  public stop(): void {
    this.ctx.stop();
    this.isPlaying = false;
    this.count = 0;
  }
}
