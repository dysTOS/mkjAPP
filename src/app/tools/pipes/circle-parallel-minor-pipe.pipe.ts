import { Pipe, PipeTransform } from '@angular/core';
import { CircleStep } from '../interfaces/mode-scale-interface';

@Pipe({
  name: 'circleParallelMinorPipe',
})
export class CircleParallelMinorPipePipe implements PipeTransform {
  public transform(steps: CircleStep[], circleIndex: number): string {
    const doubleSteps = steps.concat(steps);
    const minorKey = doubleSteps[circleIndex + 3].key;
    let literal: string = '';

    if (circleIndex < 6) {
      literal = minorKey.keyName;
    } else if (circleIndex > 6) {
      literal = minorKey.enharmonicKeyName ? minorKey.enharmonicKeyName : minorKey.keyName;
    } else {
      literal = minorKey.enharmonicKeyName ? minorKey.enharmonicKeyName + '/' + minorKey.keyName : minorKey.keyName;
    }

    return literal.toLowerCase();
  }
}
