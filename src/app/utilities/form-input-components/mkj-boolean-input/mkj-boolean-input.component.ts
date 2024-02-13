import { Component, Injector } from '@angular/core';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AbstractControlAccessor } from '../abstract-control-accessor';

@Component({
  selector: 'mkj-boolean-input',
  templateUrl: './mkj-boolean-input.component.html',
  styleUrls: ['./mkj-boolean-input.component.scss'],
  providers: [controlValueAccessor(MkjBooleanInputComponent)],
})
export class MkjBooleanInputComponent extends AbstractControlAccessor<boolean> {
  constructor(inj: Injector) {
    super(inj);
  }

  protected convertModelToFormModel(obj: any): boolean {
    if (obj) {
      return true;
    } else {
      return false;
    }
  }
}
