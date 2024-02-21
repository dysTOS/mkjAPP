import { Component, Input } from '@angular/core';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AbstractControlAccessor } from '../abstract-control-accessor';

export interface MkjDropdownOption<T = any> {
  label: string;
  value: T;
}

@Component({
  selector: 'mkj-dropdown',
  templateUrl: './mkj-dropdown.component.html',
  styleUrls: ['./mkj-dropdown.component.scss'],
  providers: [controlValueAccessor(MkjDropdownComponent)],
})
export class MkjDropdownComponent<T> extends AbstractControlAccessor<T> {
  @Input()
  public options: MkjDropdownOption<T>[] = [];

  @Input()
  public dataKey: string;
}
