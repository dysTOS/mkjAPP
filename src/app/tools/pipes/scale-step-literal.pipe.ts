import { Pipe, PipeTransform } from '@angular/core';
import { TriadQuality } from '../interfaces/mode-scale-interface';

@Pipe({
  name: 'scaleStepLiteral',
})
export class ScaleStepLiteralPipe implements PipeTransform {
  public transform(value: number, quality: TriadQuality): string {
    switch (value) {
      case 0:
        return this.applyQuality('I', quality);
      case 1:
        return this.applyQuality('II', quality);
      case 2:
        return this.applyQuality('III', quality);
      case 3:
        return this.applyQuality('IV', quality);
      case 4:
        return this.applyQuality('V', quality);
      case 5:
        return this.applyQuality('VI', quality);
      case 6:
        return this.applyQuality('VII', quality);
      default:
        return '';
    }
  }

  private applyQuality(literal: string, quality: TriadQuality): string {
    switch (quality) {
      case TriadQuality.MAJ:
        return literal;
      case TriadQuality.MIN:
        return literal.toLowerCase();
      case TriadQuality.DIM:
        return literal.toLowerCase() + '°';
      case TriadQuality.AUG:
        return literal + '+';
      default:
        return '';
    }
  }
}
