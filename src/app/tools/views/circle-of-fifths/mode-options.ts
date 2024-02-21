import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import {
  IonianScale,
  AeolianScale,
  DorianScale,
  PhrygianScale,
  LydianScale,
  MixolydianScale,
  LocrianScale,
} from '../../constants/scales';

export const ModeOptions: UiDropdownOption[] = [
  {
    label: 'Ionisch',
    value: IonianScale,
  },
  {
    label: 'Dorisch',
    value: DorianScale,
  },
  {
    label: 'Phrygisch',
    value: PhrygianScale,
  },
  {
    label: 'Lydisch',
    value: LydianScale,
  },
  {
    label: 'Mixolydisch',
    value: MixolydianScale,
  },
  {
    label: 'Äolisch',
    value: AeolianScale,
  },
  {
    label: 'Lokrisch',
    value: LocrianScale,
  },
];
