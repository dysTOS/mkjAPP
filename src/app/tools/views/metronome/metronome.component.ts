import { Component, Injector, OnDestroy } from '@angular/core';
import { MusicTool } from '../../abstract-music-tool.class';
import { MetronomeContext } from '../../classes/metronome-context.class';
import { SubSink } from 'subsink';
import { Subject, pairwise, timeInterval } from 'rxjs';

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

  public accents: boolean[] = [];

  private _subs = new SubSink();
  private _tapSub = new Subject<void>();

  constructor(
    public ctx: MetronomeContext,
    injector: Injector
  ) {
    super(injector);
    this.accents[0] = true;
    this._subs.add(
      this.ctx.count$.subscribe((count: number) => {
        this.count = count;
      }),
      this._tapSub.pipe(timeInterval(), pairwise()).subscribe((event) => {
        this.calculateBpm(event.map((e) => e.interval));
      })
    );
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public start(): void {
    this.ctx.start(this.accents);
    this.isPlaying = true;
  }

  public stop(): void {
    this.ctx.stop();
    this.isPlaying = false;
    this.count = 0;
  }

  public setAccent(index: number): void {
    this.accents[index] = !this.accents[index];
  }

  public tap(): void {
    this._tapSub.next(null);
  }

  private calculateBpm(intervalsMs: number[]): void {
    const avg = intervalsMs.reduce((acc, curr) => acc + curr, 0) / intervalsMs.length;
    const bpm = Math.round(60000 / avg);
    this.ctx.metronomeConfig.bpm = Math.min(240, Math.max(30, bpm));
    this.ctx.stop();
    if (this.isPlaying) {
      this.ctx.start(this.accents);
    }
  }
}
