export function getAudioContext(): AudioContext {
  const ctx = window.AudioContext ? new AudioContext() : (new (window as any).webkitAudioContext() as AudioContext);
  if (!ctx) {
    alert('Dein Browser unterstützt den Web Audio API-Standard nicht!');
    return void 0;
  }
  return ctx;
}
