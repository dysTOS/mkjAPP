import { KeyPitch } from './key-pitches.interface';

export interface ModeScale {
  steps: (1 | 2 | 3 | 4)[];
}

export interface CircleStep {
  key: KeyPitch;
  scaleStepInfo?: ScaleStepInfo;
}

export interface ScaleStepInfo {
  step: number;
  quality: TriadQuality;
}

export enum TriadQuality {
  MAJ = 'maj',
  MIN = 'min',
  DIM = 'dim',
  AUG = 'aug',
}
