import { Component, Input } from '@angular/core';
import { AbstractControlAccessor } from '../abstract-control-accessor';

@Component({
  selector: 'mkj-knob',
  templateUrl: './mkj-knob.component.html',
  styleUrl: './mkj-knob.component.scss',
})
export class MkjKnobComponent extends AbstractControlAccessor<number> {
  @Input()
  public size: number = 100;

  @Input()
  public color: string;

  @Input()
  public range: { min: number; max: number } = { min: 0, max: 100 };

  @Input()
  public valuePostFix: string = '';
}
