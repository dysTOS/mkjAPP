import { KeyPitch, Octave, Temperament } from '../interfaces/key-pitches.interface';

export class KeyPitchesFactory {
  public readonly A4_FREQUENCY: number;
  public readonly TEMPERAMENT: Temperament;

  constructor(A4_FREQUENCY: number = 440, TEMPERAMENT: Temperament = Temperament.EQUAL) {
    this.A4_FREQUENCY = A4_FREQUENCY;
    this.TEMPERAMENT = TEMPERAMENT;
  }

  public getOctave(octave: number): Octave {
    return {
      index: octave,
      germanLabel: KeyPitchesFactory.getOctaveLabel(octave),
      keys: this.getOctaveKeys(octave),
    };
  }

  public getOctaveKeys(octave: number): KeyPitch[] {
    const keys = [];
    const octaveBaseFrequency = this.A4_FREQUENCY * Math.pow(2, octave - 4);
    for (let i = 0; i < 12; i++) {
      const key: KeyPitch = {
        key: KeyPitchesFactory.getKeyLabel(i),
        black: KeyPitchesFactory.getKeyLabel(i).includes('#'),
        frequency: octaveBaseFrequency * Math.pow(2, i / 12),
        octaveIndex: octave,
      };
      keys.push(key);
    }
    return keys;
  }

  public static getKeyLabel(keyIndex: number): string {
    switch (keyIndex) {
      case 0:
        return 'A';
      case 1:
        return 'A#';
      case 2:
        return 'B';
      case 3:
        return 'C';
      case 4:
        return 'C#';
      case 5:
        return 'D';
      case 6:
        return 'D#';
      case 7:
        return 'E';
      case 8:
        return 'F';
      case 9:
        return 'F#';
      case 10:
        return 'G';
      case 11:
        return 'G#';
      default:
        return '--';
    }
  }

  public static getOctaveLabel(octave: number): string {
    switch (octave) {
      case 0:
        return 'Subkontra';
      case 1:
        return 'Kontra';
      case 2:
        return 'Große';
      case 3:
        return 'Kleine';
      case 4:
        return '´';
      case 5:
        return '´´';
      case 6:
        return '´´´';
      case 7:
        return '4´';
      case 8:
        return '5´';
      case 9:
        return '6´';
      default:
        return '--';
    }
  }
}
