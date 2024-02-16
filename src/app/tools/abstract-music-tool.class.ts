import { Directive, Injector, OnInit } from '@angular/core';
import { MkjToolbarService } from '../utilities/mkj-toolbar/mkj-toolbar.service';

@Directive()
export abstract class MusicTool implements OnInit {
  public abstract readonly title: string;
  public abstract readonly localStorageKey: string;

  protected toolbarService: MkjToolbarService;

  constructor(injector: Injector) {
    this.toolbarService = injector.get(MkjToolbarService);
  }

  public ngOnInit(): void {
    this.toolbarService.header = this.title;
  }
}
