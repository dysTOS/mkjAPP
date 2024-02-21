import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'circleAccidentalCountPipe',
})
export class CircleAccidentalCountPipePipe implements PipeTransform {
  public transform(circleIndex: number): string {
    if (circleIndex === 0) {
      return '';
    } else if (circleIndex > 6) {
      return '\u266d'.repeat(12 - circleIndex);
    } else if (circleIndex < 6) {
      return '\u266f'.repeat(circleIndex);
    } else if (circleIndex === 6) {
      return '6\u266d/6\u266f';
    }

    return '';
  }
}
