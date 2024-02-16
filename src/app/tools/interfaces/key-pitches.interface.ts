export enum Temperament {
  EQUAL,
}

export enum NoteLanguage {
  GERMAN,
  ENGLISH,
}

export interface KeyPitchesConfig {
  A4_FREQUENCY: number;
  TEMPERAMENT: Temperament;
  LANGUAGE: NoteLanguage;
}

export interface Octave {
  index: number;
  label: string;
  keys: KeyPitch[];
}

export interface KeyPitch {
  keyName: string;
  enharmonicKeyName?: string;
  frequency: number;
  a_octaveIndex: number;
  c_octaveIndex: number;
  c_noteIndex: number;
}
