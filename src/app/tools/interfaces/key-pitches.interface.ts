export enum Temperament {
  EQUAL,
}

export interface KeyPitchesConfig {
  A4_FREQUENCY: number;
  TEMPERAMENT: Temperament;
}

export interface Octave {
  index: number;
  germanLabel: string;
  keys: KeyPitch[];
}

export interface KeyPitch {
  key: string;
  black: boolean;
  frequency: number;
  octaveIndex: number;
}
