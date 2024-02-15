export function acf2plusAlgorithm(buffer: Float32Array, sampleRate: number) {
  const maxShift = buffer.length;

  let rms = 0;
  let i, j, u, tmp;

  for (i = 0; i < maxShift; i++) {
    tmp = buffer[i];
    rms += tmp * tmp;
  }

  rms = Math.sqrt(rms / maxShift);

  if (rms < 0.01)
    // not enough signal
    return -1;

  /* Trimming cuts the edges of the signal so that it starts and ends near zero.
     This is used to neutralize an inherent instability of the ACF version I use.*/
  let aux1 = 0;
  let aux2 = maxShift - 1;
  const thres = 0.2;
  for (i = 0; i < maxShift / 2; i++)
    if (Math.abs(buffer[i]) < thres) {
      aux1 = i;
      break;
    }
  for (i = 1; i < maxShift / 2; i++)
    if (Math.abs(buffer[maxShift - i]) < thres) {
      aux2 = maxShift - i;
      break;
    }

  const frames = buffer.slice(aux1, aux2);
  const framesLength = frames.length;

  const calcSub = new Array<number>(framesLength).fill(0);
  for (i = 0; i < framesLength; i++)
    for (j = 0; j < framesLength - i; j++) calcSub[i] = calcSub[i] + frames[j] * frames[j + i];

  u = 0;
  while (calcSub[u] > calcSub[u + 1]) u++;
  let maxval = -1,
    maxpos = -1;
  for (i = u; i < framesLength; i++) {
    if (calcSub[i] > maxval) {
      maxval = calcSub[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  /* Interpolation is parabolic interpolation. It helps with precision.
     We suppose that a parabola pass through the three points that comprise the peak.
     'a' and 'b' are the unknowns from the linear equation system
     and b/(2a) is the "error" in the abscissa.
     y1,y2,y3 are the ordinates.*/

  const y1 = calcSub[T0 - 1],
    y2 = calcSub[T0],
    y3 = calcSub[T0 + 1];
  const a = (y1 + y3 - 2 * y2) / 2;
  const b = (y3 - y1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}
