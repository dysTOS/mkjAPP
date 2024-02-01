import { Component } from '@angular/core';
import { SynthContext } from '../classes/synth-context.class';
import { KeyPitchesFactory } from '../classes/key-pitches-factory.class';
import { Octave } from '../interfaces/key-pitches.interface';
import { MkjDropdownOption } from 'src/app/utilities/form-input-components/mkj-dropdown/mkj-dropdown.component';

@Component({
  selector: 'mkj-synthesizer',
  templateUrl: './synthesizer.component.html',
  styleUrl: './synthesizer.component.scss',
})
export class SynthesizerComponent {
  public SynthCtx = new SynthContext();
  public keyFactory = new KeyPitchesFactory();

  public octaves: Octave[] = [];

  public readonly WaveOptions: MkjDropdownOption<OscillatorType>[] = [
    {
      value: 'sine',
      label: 'Sine',
    },
    {
      value: 'square',
      label: 'Square',
    },
    {
      value: 'sawtooth',
      label: 'Sawtooth',
    },
    {
      value: 'triangle',
      label: 'Triangle',
    },
  ];

  constructor() {
    for (let i = 4; i < 8; i++) {
      this.octaves.push(this.keyFactory.getOctave(i));
    }
  }
}
