import { Component } from '@angular/core';
import { TunerContext } from '../classes/tuner-context.class';

@Component({
  selector: 'mkj-tuner',
  templateUrl: './tuner.component.html',
  styleUrl: './tuner.component.scss',
  providers: [TunerContext],
})
export class TunerComponent {
  constructor(public tunerCtx: TunerContext) {}
}
