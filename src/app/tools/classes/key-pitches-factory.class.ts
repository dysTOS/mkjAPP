import { Injectable } from '@angular/core';
import { KeyPitch, KeyPitchesConfig, NoteLanguage, Octave, Temperament } from '../interfaces/key-pitches.interface';
import { CircleStep, ModeScale } from '../interfaces/mode-scale-interface';
import { ChordHelper } from './_chord-helper.class';

export class KeyPitchesFactory {
  public config: KeyPitchesConfig = {
    A4_FREQUENCY: 440,
    TEMPERAMENT: Temperament.EQUAL,
    LANGUAGE: NoteLanguage.GERMAN,
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

  public getAllKeys(): KeyPitch[] {
    return this._allKeys;
  }

  public getDefaultGuitarTuning(): KeyPitch[] {
    const guitarTuning = [
      { c_octave: 2, c_noteIndex: 4 },
      { c_octave: 2, c_noteIndex: 9 },
      { c_octave: 3, c_noteIndex: 2 },
      { c_octave: 3, c_noteIndex: 7 },
      { c_octave: 3, c_noteIndex: 11 },
      { c_octave: 4, c_noteIndex: 4 },
    ];

    return guitarTuning.map((t) =>
      this._allKeys.find((k) => k.c_octaveIndex === t.c_octave && k.c_noteIndex === t.c_noteIndex)
    );
  }

  public getOctave(octaveIndex: number): Octave {
    return {
      index: octaveIndex,
      label:
        this.config.LANGUAGE === NoteLanguage.GERMAN
          ? ChordHelper.getGermanOctaveLabel(octaveIndex)
          : octaveIndex.toString(),
      keys: this._allKeys.filter((k) => k.a_octaveIndex === octaveIndex),
    };
  }

  public getCircleOfFifths(tonic: string, scale?: ModeScale): CircleStep[] {
    const circleSteps: CircleStep[] = [];
    let stepIndex = this._allKeys.findIndex((k) => k.keyName === tonic);

    for (let i = 0; i < 12; i++) {
      const step: CircleStep = {
        key: this._allKeys[stepIndex],
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
          circleStep.scaleStepInfo = {
            step: i,
            quality: ChordHelper.getTriadQuality(scale, i),
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

  private getRawOctaveKeys(a_octaveIndex: number): KeyPitch[] {
    const keys = [];
    const octaveBaseFrequency = this.config.A4_FREQUENCY * Math.pow(2, a_octaveIndex - 4);
    for (let i = 0; i < 12; i++) {
      const keyName = ChordHelper.getKeyLabel(i, this.config.LANGUAGE);
      const key: KeyPitch = {
        keyName: keyName,
        enharmonicKeyName: ChordHelper.isEnharmonic(keyName)
          ? ChordHelper.getKeyLabel(i, this.config.LANGUAGE, true)
          : undefined,
        frequency: octaveBaseFrequency * Math.pow(2, i / 12),
        c_noteIndex: i < 3 ? i + 9 : i - 3,
        c_octaveIndex: i < 3 ? a_octaveIndex : a_octaveIndex + 1,
        a_octaveIndex: a_octaveIndex,
      };
      keys.push(key);
    }
    return keys;
  }
}
