import { KeyPitch, KeyPitchesConfig, Octave, Temperament } from '../interfaces/key-pitches.interface';

export class KeyPitchesFactory {
  public config: KeyPitchesConfig = {
    A4_FREQUENCY: 440,
    TEMPERAMENT: Temperament.EQUAL,
  };

  constructor(config?: KeyPitchesConfig) {
    this.init(config);
  }

  public init(config?: KeyPitchesConfig): void {
    if (config) {
      this.config = config;
    }

    const keyPitches: KeyPitch[] = [];

    for (let i = 0; i < 8; i++) {
      keyPitches.push(...this.getOctaveKeys(i));
    }
  }

  public getOctave(octave: number): Octave {
    return {
      index: octave,
      germanLabel: KeyPitchesFactory.getOctaveLabel(octave),
      keys: this.getOctaveKeys(octave),
    };
  }

  private getOctaveKeys(octave: number): KeyPitch[] {
    const keys = [];
    const octaveBaseFrequency = this.config.A4_FREQUENCY * Math.pow(2, octave - 4);
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
