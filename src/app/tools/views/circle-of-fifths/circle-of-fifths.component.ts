import { Component, Injector } from '@angular/core';
import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import { MusicTool } from '../../abstract-music-tool.class';
import { KeyPitchesFactory } from '../../classes/key-pitches-factory.class';
import { CircleStep, ModeScale } from '../../interfaces/mode-scale-interface';
import { ModeOptions } from './mode-options';

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.component.html',
  styleUrl: './circle-of-fifths.component.scss',
})
export class CircleOfFifthsComponent extends MusicTool {
  public title: string = 'Quintenzirkel';
  public localStorageKey: string = 'circle-of-fifths';

  private _keyFactory = new KeyPitchesFactory();

  public selectedTonic: string = 'C';
  public selectedMode: ModeScale = null;
  public circleSteps: CircleStep[];

  public readonly tonicOptions: UiDropdownOption[] = this._keyFactory.getOctave(1).keys.map((k) => {
    return {
      label: k.keyName,
      value: k.keyName,
    };
  });

  public readonly modeOptions: UiDropdownOption[] = [{ label: 'Standard', value: null }, ...ModeOptions];

  constructor(inj: Injector) {
    super(inj);
    this.update();
  }

  public update(): void {
    if (this.selectedMode === null) {
      this.selectedTonic = 'C';
    }
    this.circleSteps = this._keyFactory.getCircleOfFifths(this.selectedTonic, this.selectedMode);
  }
}
