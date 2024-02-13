export enum Temperament {
  EQUAL,
}

export interface KeyPitchesConfig {
  A4_FREQUENCY: number;
  TEMPERAMENT: Temperament;
  LANGUAGE: 'german' | 'english';
}

export interface Octave {
  index: number;
  label: string;
  keys: KeyPitch[];
}

export interface KeyPitch {
  key: string;
  black: boolean;
  frequency: number;
  a_octaveIndex: number;
  c_noteIndex: number;
}
