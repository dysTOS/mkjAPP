import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MkjDropdownOption } from 'src/app/utilities/form-input-components/mkj-dropdown/mkj-dropdown.component';
import { SubSink } from 'subsink';
import { KeyPitchesFactory } from '../classes/key-pitches-factory.class';
import { SynthContext } from '../classes/synth-context.class';
import { KeyPitch, Octave } from '../interfaces/key-pitches.interface';

@Component({
  selector: 'mkj-synthesizer',
  templateUrl: './synthesizer.component.html',
  styleUrl: './synthesizer.component.scss',
  providers: [SynthContext],
})
export class SynthesizerComponent {
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

  public readonly mouseEventSubject = new Subject<{ type: string; key: KeyPitch }>();
  private _isMouseDown = false;
  private _subs = new SubSink();

  constructor(public SynthCtx: SynthContext) {
    for (let i = 4; i < 8; i++) {
      this.octaves.push(this.keyFactory.getOctave(i));
    }

    this._subs.sink = this.mouseEventSubject.subscribe((data) => {
      if (data.type === 'mouseup') {
        this._isMouseDown = false;
        this.SynthCtx.stopAll();
      } else if (data.type === 'mouseenter' && this._isMouseDown) {
        this.SynthCtx.playKey(data.key);
      } else if (data.type === 'mousedown') {
        this._isMouseDown = true;
        this.SynthCtx.playKey(data.key);
      } else if (data.type === 'mouseleave') {
        this.SynthCtx.stopAll();
      }
    });
  }
}
