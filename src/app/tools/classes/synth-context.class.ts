import { KeyPitch } from '../interfaces/key-pitches.interface';
import { getAudioContext } from '../getAudioContext.function';

export class SynthContext {
  public masterVolume = 0.5;
  public type: OscillatorType = 'sine';

  private _audioCtx = getAudioContext();

  private _gainNode = this._audioCtx.createGain();

  private _oscillators: OscillatorNode[] = [];

  constructor() {
    this._gainNode.connect(this._audioCtx.destination);
    this._gainNode.gain.value = this.masterVolume;
  }

  public playKey(key: KeyPitch): void {
    this.stopAll();
    const oscillator = this._audioCtx.createOscillator();
    oscillator.connect(this._gainNode);
    oscillator.type = this.type;
    oscillator.frequency.value = key.frequency;
    oscillator.start();
    this._oscillators.push(oscillator);
  }

  public stopAll(): void {
    this._oscillators.forEach((oscillator) => oscillator.stop());
    this._oscillators = [];
  }

  public setMasterVolume(volume: number): void {
    this.masterVolume = volume;
    this._gainNode.gain.value = this.masterVolume;
  }

  public setWaveType(type: OscillatorType): void {
    this.type = type;
  }
}
