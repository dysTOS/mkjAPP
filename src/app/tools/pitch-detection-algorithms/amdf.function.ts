export function amdfAlgorithm(buffer: Float32Array, sampleRate: number) {
  // https://github.com/peterkhayes/pitchfinder/blob/master/src/detectors/amdf.ts

  const minFrequency = 82;
  const maxFrequency = 1000;
  const ratio = 5;
  const sensitivity = 0.1;
  const amd: Array<number> = [];

  /* Round in such a way that both exact minPeriod as
   exact maxPeriod lie inside the rounded span minPeriod-maxPeriod,
   thus ensuring that minFrequency and maxFrequency can be found
   even in edge cases */
  const maxPeriod = Math.ceil(sampleRate / minFrequency);
  const minPeriod = Math.floor(sampleRate / maxFrequency);

  const maxShift = buffer.length;

  let t = 0;
  let minval = Infinity;
  let maxval = -Infinity;
  let frames1, frames2, calcSub, i, j, u, aux1, aux2;

  // Find the average magnitude difference for each possible period offset.
  for (i = 0; i < maxShift; i++) {
    if (minPeriod <= i && i <= maxPeriod) {
      for (aux1 = 0, aux2 = i, t = 0, frames1 = [], frames2 = []; aux1 < maxShift - i; t++, aux2++, aux1++) {
        frames1[t] = buffer[aux1];
        frames2[t] = buffer[aux2];
      }

      // Take the difference between these frames.
      const frameLength = frames1.length;
      calcSub = [];
      for (u = 0; u < frameLength; u++) {
        calcSub[u] = frames1[u] - frames2[u];
      }

      // Sum the differences.
      let summation = 0;
      for (u = 0; u < frameLength; u++) {
        summation += Math.abs(calcSub[u]);
      }
      amd[i] = summation;
    }
  }

  for (j = minPeriod; j < maxPeriod; j++) {
    if (amd[j] < minval) minval = amd[j];
    if (amd[j] > maxval) maxval = amd[j];
  }

  const cutoff = Math.round(sensitivity * (maxval - minval) + minval);
  for (j = minPeriod; j <= maxPeriod && amd[j] > cutoff; j++);

  const searchLength = minPeriod / 2;
  minval = amd[j];
  let minpos = j;
  for (i = j - 1; i < j + searchLength && i <= maxPeriod; i++) {
    if (amd[i] < minval) {
      minval = amd[i];
      minpos = i;
    }
  }

  if (Math.round(amd[minpos] * ratio) < maxval) {
    return sampleRate / minpos;
  } else {
    return -1;
  }
}
