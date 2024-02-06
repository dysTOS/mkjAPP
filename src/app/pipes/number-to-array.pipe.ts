import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray',
})
export class NumberToArrayPipe implements PipeTransform {
  public transform(value: number): number[] {
    const arr: number[] = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    return arr;
  }
}
