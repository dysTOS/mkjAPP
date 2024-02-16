import { Pipe, PipeTransform } from '@angular/core';
import { KeyPitch } from '../interfaces/key-pitches.interface';

@Pipe({
  name: 'enharmonicKeyNote',
})
export class EnharmonicKeyNotePipe implements PipeTransform {
  public transform(key: KeyPitch, useFlat: boolean = false, showBoth: boolean = false): string {
    if (!key) return '';

    if (key.enharmonicKeyName == null) return key.keyName;

    if (showBoth) return `${key.enharmonicKeyName}/${key.keyName}`;

    if (useFlat) return key.enharmonicKeyName;

    return key.keyName;
  }
}
