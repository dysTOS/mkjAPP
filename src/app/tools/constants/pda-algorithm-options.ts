import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import { acf2plusAlgorithm } from '../pitch-detection-algorithms/acf2plus.function';
import { amdfAlgorithm } from '../pitch-detection-algorithms/amdf.function';
import { autoCorrelate1 } from '../pitch-detection-algorithms/auto-correlate-1.function';
import { autoCorrelate2 } from '../pitch-detection-algorithms/auto-correlate-2.function';
import { dynamicWaveletAlgorithm } from '../pitch-detection-algorithms/dynamic-wavelet.function';
import { macleodAlgorithm } from '../pitch-detection-algorithms/macleod.function';
import { yinAlgorithm } from '../pitch-detection-algorithms/yin.function';

export const PitchDetectionAlgorithms: UiDropdownOption<Function>[] = [
  {
    label: 'Auto Correlate 1',
    value: autoCorrelate1,
  },
  {
    label: 'Auto Correlate 2',
    value: autoCorrelate2,
  },
  {
    label: 'ACF2Plus',
    value: acf2plusAlgorithm,
  },
  {
    label: 'AMDF',
    value: amdfAlgorithm,
  },
  {
    label: 'Dynamic Wavelet',
    value: dynamicWaveletAlgorithm,
  },
  {
    label: 'Yin',
    value: yinAlgorithm,
  },
  {
    label: 'Macleod',
    value: macleodAlgorithm,
  },
];
