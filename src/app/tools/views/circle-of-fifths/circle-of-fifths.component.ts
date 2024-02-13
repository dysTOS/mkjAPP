import { Component } from '@angular/core';
import { MusicTool } from '../../abstract-music-tool.class';

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.component.html',
  styleUrl: './circle-of-fifths.component.scss',
})
export class CircleOfFifthsComponent extends MusicTool {
  public title: string = 'Quintenzirkel';
  public localStorageKey: string = 'circle-of-fifths';
}
