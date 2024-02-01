export enum Temperament {
  EQUAL,
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
