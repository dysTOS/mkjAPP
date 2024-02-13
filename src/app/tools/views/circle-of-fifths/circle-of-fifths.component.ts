import { Component } from '@angular/core';
import { MusicTool } from '../../abstract-music-tool.class';
import { KeyPitchesFactory } from '../../classes/key-pitches-factory.class';
import { AeolianScale, IonianScale } from '../../constants/scales';

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.component.html',
  styleUrl: './circle-of-fifths.component.scss',
})
export class CircleOfFifthsComponent extends MusicTool {
  public title: string = 'Quintenzirkel';
  public localStorageKey: string = 'circle-of-fifths';

  public keyFactory = new KeyPitchesFactory();

  public circleSteps = this.keyFactory.getCircleOfFifths('C', AeolianScale);
}
