import { Component, Injector } from '@angular/core';
import { MusicTool } from '../abstract-music-tool.class';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrl: './metronome.component.scss',
})
export class MetronomeComponent extends MusicTool {
  public readonly title: string = 'Metronom';
  public readonly localStorageKey: string = 'metronome';

  constructor(injector: Injector) {
    super(injector);
  }
}
