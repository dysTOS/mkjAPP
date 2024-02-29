import { Component, Input } from '@angular/core';
import { AbstractControlAccessor } from '../abstract-control-accessor';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';

@Component({
  selector: 'mkj-number-input',
  templateUrl: './mkj-number-input.component.html',
  styleUrls: ['./mkj-number-input.component.scss'],
  providers: [controlValueAccessor(MkjNumberInputComponent)],
})
export class MkjNumberInputComponent extends AbstractControlAccessor<number> {
  @Input()
  public mode: 'currency' | 'decimal' = 'decimal';

  @Input()
  public range: { min: number; max: number };
}
