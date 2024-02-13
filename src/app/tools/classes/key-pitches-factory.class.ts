import { KeyPitch, KeyPitchesConfig, Octave, Temperament } from '../interfaces/key-pitches.interface';
import { CircleStep, ModeScale, ScaleStepInfo } from '../interfaces/mode-scale-interface';

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

  public getOctave(octaveIndex: number): Octave {
    return {
      index: octaveIndex,
      label: this.config.LANGUAGE === 'german' ? this.getGermanOctaveLabel(octaveIndex) : octaveIndex.toString(),
      keys: this._allKeys.filter((k) => k.a_octaveIndex === octaveIndex),
    };
  }

  public getCircleOfFifths(tonic: string, scale?: ModeScale): CircleStep[] {
    const circleSteps: CircleStep[] = [];
    let stepIndex = this._allKeys.findIndex((k) => k.key === tonic);

    for (let i = 0; i < 12; i++) {
      const step: CircleStep = {
        key: i > 5 ? this.getKeyEnharmonic(this._allKeys[stepIndex]) : this._allKeys[stepIndex],
      };
      circleSteps.push(step);

      stepIndex += 7;
      if (stepIndex >= 12) {
        stepIndex -= 12;
      }
    }

    if (scale) {
      let scaleStepIndex = circleSteps[0].key.c_noteIndex;
      scale.steps.forEach((s, i) => {
        const circleStep = circleSteps.find((cs) => cs.key.c_noteIndex === scaleStepIndex);
        if (circleStep) {
          circleStep.step = {
            step: i,
            type: 'maj',
          };
        }
        scaleStepIndex += s;
        if (scaleStepIndex >= 12) {
          scaleStepIndex -= 12;
        }
      });
    }

    return circleSteps;
  }

  private getTriadQuality(scale: ModeScale, step: number): string {
    let numberHaltones = scale.steps[step];
    switch (numberHaltones) {
      case 1:
        return 'maj';
      case 2:
        return 'min';
      case 3:
        return 'min';
      case 4:
        return 'maj';
      default:
        return '';
    }
  }

  private getKeyEnharmonic(key: KeyPitch): KeyPitch {
    const enharmonicKey = { ...key };
    if (enharmonicKey.key.includes('#')) {
      enharmonicKey.key = enharmonicKey.key.replace('#', 'b');
    } else if (enharmonicKey.key.includes('b')) {
      enharmonicKey.key = enharmonicKey.key.replace('b', '#');
    }
    return enharmonicKey;
  }

  private getRawOctaveKeys(c_octaveIndex: number): KeyPitch[] {
    const keys = [];
    const octaveBaseFrequency = this.config.A4_FREQUENCY * Math.pow(2, c_octaveIndex - 4);
    for (let i = 0; i < 12; i++) {
      const keyName = this.getKeyLabel(i);
      const key: KeyPitch = {
        key: keyName,
        black: keyName.includes('#'),
        frequency: octaveBaseFrequency * Math.pow(2, i / 12),
        c_noteIndex: i < 3 ? i + 9 : i - 3,
        a_octaveIndex: i < 3 ? c_octaveIndex : c_octaveIndex + 1,
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
