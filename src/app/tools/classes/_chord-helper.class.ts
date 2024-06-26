import { NoteLanguage } from '../interfaces/key-pitches.interface';
import { ModeScale, TriadQuality } from '../interfaces/mode-scale-interface';

export abstract class ChordHelper {
  public static getTriadQuality(scale: ModeScale, step: number): TriadQuality | null {
    const doubleScale = [...scale.steps, ...scale.steps];
    const stepsThird = doubleScale[step] + doubleScale[step + 1];
    const stepsFifth = doubleScale[step + 2] + doubleScale[step + 3];

    if (stepsThird === 4 && stepsFifth === 3) {
      return TriadQuality.MAJ;
    } else if (stepsThird === 3 && stepsFifth === 4) {
      return TriadQuality.MIN;
    } else if (stepsThird === 3 && stepsFifth === 3) {
      return TriadQuality.DIM;
    } else if (stepsThird === 4 && stepsFifth === 4) {
      return TriadQuality.AUG;
    }

    return null;
  }

  public static isEnharmonic(keyName: string): boolean {
    return keyName.includes('b') || keyName.includes('#');
  }

  public static getKeyLabel(
    a_noteIndex: number,
    lang: NoteLanguage = NoteLanguage.GERMAN,
    flat: boolean = false
  ): string {
    switch (a_noteIndex) {
      case 0:
        return 'A';
      case 1:
        return flat ? 'Bb' : 'A#';
      case 2:
        return lang === NoteLanguage.GERMAN ? 'H' : 'B';
      case 3:
        return 'C';
      case 4:
        return flat ? 'Db' : 'C#';
      case 5:
        return 'D';
      case 6:
        return flat ? 'Eb' : 'D#';
      case 7:
        return 'E';
      case 8:
        return 'F';
      case 9:
        return flat ? 'Gb' : 'F#';
      case 10:
        return 'G';
      case 11:
        return flat ? 'Ab' : 'G#';
      default:
        return '--';
    }
  }

  public static getGermanOctaveLabel(octave: number): string {
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
