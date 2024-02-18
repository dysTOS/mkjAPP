import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import { acf2plusAlgorithm } from '../pitch-detection-algorithms/acf2plus.function';
import { amdfAlgorithm } from '../pitch-detection-algorithms/amdf.function';
import { autoCorrelate2 } from '../pitch-detection-algorithms/auto-correlate-2.function';
import { dynamicWaveletAlgorithm } from '../pitch-detection-algorithms/dynamic-wavelet.function';
import { macleodAlgorithm } from '../pitch-detection-algorithms/macleod.function';

export const PitchDetectionAlgorithms: UiDropdownOption<Function>[] = [
  {
    label: 'Auto Correlate',
    value: autoCorrelate2,
  },
  {
    label: 'Macleod',
    value: macleodAlgorithm,
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
  //   {
  //     label: 'Yin',
  //     value: yinAlgorithm,
  //   },
];
