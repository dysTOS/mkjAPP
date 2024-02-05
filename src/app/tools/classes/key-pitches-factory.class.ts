import { KeyPitch, KeyPitchesConfig, Octave, Temperament } from '../interfaces/key-pitches.interface';

export class KeyPitchesFactory {
  public config: KeyPitchesConfig = {
    A4_FREQUENCY: 440,
    TEMPERAMENT: Temperament.EQUAL,
    LANGUAGE: 'german',
  };

  private _allKeys: KeyPitch[] = [];

  constructor(config?: KeyPitchesConfig) {
    this.init(config);
  }

  public init(config?: KeyPitchesConfig): void {
    if (config) {
      this.config = config;
    }

    this._allKeys = [];

    for (let i = 0; i < 8; i++) {
      this._allKeys.push(...this.getRawOctaveKeys(i));
    }
  }

  public getOctave(octave: number): Octave {
    return {
      index: octave,
      label: this.config.LANGUAGE === 'german' ? this.getGermanOctaveLabel(octave) : octave.toString(),
      keys: this._allKeys.filter((k) => k.octaveIndex === octave),
    };
  }

  private getRawOctaveKeys(octave: number): KeyPitch[] {
    const keys = [];
    const octaveBaseFrequency = this.config.A4_FREQUENCY * Math.pow(2, octave - 4);
    for (let i = 0; i < 12; i++) {
      const keyName = this.getKeyLabel(i);
      const key: KeyPitch = {
        key: keyName,
        black: keyName.includes('#'),
        frequency: octaveBaseFrequency * Math.pow(2, i / 12),
        octaveIndex: i < 3 ? octave : octave + 1,
      };
      keys.push(key);
    }
    return keys;
  }

  private getKeyLabel(keyIndex: number): string {
    switch (keyIndex) {
      case 0:
        return 'A';
      case 1:
        return 'A#';
      case 2:
        return this.config.LANGUAGE === 'german' ? 'H' : 'B';
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

  private getGermanOctaveLabel(octave: number): string {
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
        return '/';
      case 5:
        return '//';
      case 6:
        return '///';
      case 7:
        return '////';
      case 8:
        return '/////';
      case 9:
        return '//////';
      default:
        return '--';
    }
  }
}
