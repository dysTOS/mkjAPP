import { Component, Injector } from '@angular/core';
import { MusicTool } from '../abstract-music-tool.class';

@Component({
  selector: 'mkj-transposer',
  templateUrl: './transposer.component.html',
  styleUrl: './transposer.component.scss',
})
export class TransposerComponent extends MusicTool {
  public readonly title: string = 'Transponierer';
  public readonly localStorageKey: string = 'transposer';

  constructor(injector: Injector) {
    super(injector);
  }
}
