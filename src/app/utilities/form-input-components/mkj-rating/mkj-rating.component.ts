import { Component, Input } from '@angular/core';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AbstractControlAccessor } from '../abstract-control-accessor';

@Component({
  selector: 'mkj-rating',
  templateUrl: './mkj-rating.component.html',
  styleUrl: './mkj-rating.component.scss',
  providers: [controlValueAccessor(MkjRatingComponent)],
})
export class MkjRatingComponent extends AbstractControlAccessor<number> {
  @Input()
  public readonly: boolean = false;

  @Input()
  public stars: number = 5;
}
