import { Component, Input } from '@angular/core';
import { AbstractControlAccessor } from '../abstract-control-accessor';

@Component({
  selector: 'mkj-counter',
  templateUrl: './mkj-counter.component.html',
  styleUrl: './mkj-counter.component.scss',
})
export class MkjCounterComponent extends AbstractControlAccessor<number> {
  @Input()
  public vertical: boolean = false;

  @Input()
  public sizeRem: string = '1rem';

  @Input()
  public range: { min: number; max: number } = { min: 0, max: 100 };

  public decrement(): void {
    const value = (this.value ?? 0) - 1;
    if (this.checkRange(value)) {
      this.change(value);
    }
  }

  public increment(): void {
    const value = (this.value ?? 0) + 1;
    if (this.checkRange(value)) {
      this.change(value);
    }
  }

  private checkRange(value: number): boolean {
    return value >= this.range.min && value <= this.range.max;
  }
}
