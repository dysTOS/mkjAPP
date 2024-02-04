import { KeyPitch } from '../interfaces/key-pitches.interface';
import { getAudioContext } from '../getAudioContext.function';
import { Injectable, OnDestroy } from '@angular/core';
import { OscillatorBlueprint } from '../interfaces/oscillator-blueprint.interface';

@Injectable()
export class SynthContext implements OnDestroy {
  public masterVolume = 0.5;
  public oscillatorBlueprints: OscillatorBlueprint[] = [
    { type: 'sine', gain: 0.5 },
    { type: 'sine', gain: 0.5 },
  ];

  private _audioCtx = getAudioContext();
  private _masterGainNode = this._audioCtx.createGain();
  private _osc1GainNode = this._audioCtx.createGain();
  private _osc2GainNode = this._audioCtx.createGain();

  private _oscillators: OscillatorNode[] = [];

  constructor() {
    this._masterGainNode.gain.value = this.masterVolume;
    this._osc1GainNode.gain.value = this.oscillatorBlueprints[0].gain;
    this._osc2GainNode.gain.value = this.oscillatorBlueprints[1].gain;
    this._masterGainNode.connect(this._audioCtx.destination);
    this._osc1GainNode.connect(this._masterGainNode);
    this._osc2GainNode.connect(this._masterGainNode);
  }

  public ngOnDestroy(): void {
    this.stopAll();
    this._audioCtx.close();
  }

  public playKey(key: KeyPitch): void {
    this.oscillatorBlueprints.forEach((blueprint, index) => {
      const oscillator = this._audioCtx.createOscillator();
      oscillator.connect(this['_osc' + (index + 1) + 'GainNode']);
      oscillator.type = blueprint.type;
      oscillator.frequency.value = key.frequency;
      oscillator.detune.value = blueprint.detune ?? 0;
      oscillator.start();
      this._oscillators.push(oscillator);
    });
  }

  public stopAll(): void {
    this._oscillators.forEach((oscillator) => oscillator.stop());
    this._oscillators = [];
  }

  public setMasterVolume(volume: number): void {
    this.masterVolume = volume;
    this._masterGainNode.gain.value = this.masterVolume;
  }

  public setWaveType(type: OscillatorType, index: number): void {
    this.oscillatorBlueprints[index].type = type;
  }

  public setGain(gain: number, index: number): void {
    this.oscillatorBlueprints[index].gain = gain / 100;
    this['_osc' + (index + 1) + 'GainNode'].gain.value = gain / 100;
  }

  public setDetune(detune: number, index: number): void {
    this.oscillatorBlueprints[index].detune = detune - 50;
  }
}
