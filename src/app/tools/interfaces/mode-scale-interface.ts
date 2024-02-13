import { KeyPitch } from './key-pitches.interface';

export interface ModeScale {
  steps: (1 | 2 | 3 | 4)[];
}

export interface CircleStep {
  key: KeyPitch;
  step?: ScaleStepInfo;
}

export interface ScaleStepInfo {
  step: number;
  type: 'maj' | 'min' | 'dim';
}
