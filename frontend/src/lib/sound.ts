let ctx: AudioContext | null = null;
let ambientNodes: { stop: () => void } | null = null;
let masterGain: GainNode | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.35;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}

function createWind(audioCtx: AudioContext, gain: GainNode) {
  const bufferSize = audioCtx.sampleRate * 4;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI * 2);
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(400, audioCtx.currentTime);
  bandpass.Q.setValueAtTime(0.3, audioCtx.currentTime);

  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.06, audioCtx.currentTime);
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(350, audioCtx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(bandpass.frequency);

  const windGain = audioCtx.createGain();
  windGain.gain.setValueAtTime(0, audioCtx.currentTime);
  windGain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 3);

  source.connect(bandpass);
  bandpass.connect(windGain);
  windGain.connect(gain);

  source.start(audioCtx.currentTime);
  lfo.start(audioCtx.currentTime);

  return {
    stop: () => {
      const t = audioCtx.currentTime;
      windGain.gain.linearRampToValueAtTime(0, t + 1);
      source.stop(t + 1.1);
      lfo.stop(t + 1.1);
    },
  };
}

function createDistortedDrone(audioCtx: AudioContext, gain: GainNode) {
  const now = audioCtx.currentTime;

  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(38, now);

  const osc2 = audioCtx.createOscillator();
  osc2.type = 'square';
  osc2.frequency.setValueAtTime(38.7, now);

  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.08, now);
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(15, now);
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfoGain.connect(osc2.frequency);

  const shaper = audioCtx.createWaveShaper();
  function makeDistortionCurve(amount: number) {
    const samples = 256;
    const curve = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }
  shaper.curve = makeDistortionCurve(50);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(120, now);
  filter.Q.setValueAtTime(3, now);

  const filterLfo = audioCtx.createOscillator();
  filterLfo.type = 'sine';
  filterLfo.frequency.setValueAtTime(0.03, now);
  const filterLfoGain = audioCtx.createGain();
  filterLfoGain.gain.setValueAtTime(60, now);
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(filter.frequency);

  const subGain = audioCtx.createGain();
  subGain.gain.setValueAtTime(0, now);
  subGain.gain.linearRampToValueAtTime(0.06, now + 3);

  osc1.connect(shaper);
  osc2.connect(shaper);
  shaper.connect(filter);
  filter.connect(subGain);
  subGain.connect(gain);

  osc1.start(now);
  osc2.start(now);
  lfo.start(now);
  filterLfo.start(now);

  return {
    stop: () => {
      const t = audioCtx.currentTime;
      subGain.gain.linearRampToValueAtTime(0, t + 1.5);
      osc1.stop(t + 1.6);
      osc2.stop(t + 1.6);
      lfo.stop(t + 1.6);
      filterLfo.stop(t + 1.6);
    },
  };
}

function createPulse(audioCtx: AudioContext, gain: GainNode) {
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(72, now);

  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.4, now);
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(0, now);
  lfoGain.gain.linearRampToValueAtTime(0.5, now + 4);

  const pulseLfo = audioCtx.createGain();
  pulseLfo.gain.setValueAtTime(0.5, now);

  lfo.connect(lfoGain);
  lfoGain.connect(pulseLfo.gain);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(72, now);
  filter.Q.setValueAtTime(8, now);

  const pulseGain = audioCtx.createGain();
  pulseGain.gain.setValueAtTime(0, now);
  pulseGain.gain.linearRampToValueAtTime(0, now + 3);
  pulseGain.gain.linearRampToValueAtTime(0.08, now + 5);

  osc.connect(pulseLfo);
  pulseLfo.connect(filter);
  filter.connect(pulseGain);
  pulseGain.connect(gain);

  osc.start(now);
  lfo.start(now);

  return {
    stop: () => {
      const t = audioCtx.currentTime;
      pulseGain.gain.linearRampToValueAtTime(0, t + 1);
      osc.stop(t + 1.1);
      lfo.stop(t + 1.1);
    },
  };
}

function createCrackle(audioCtx: AudioContext, gain: GainNode) {
  const bufferSize = audioCtx.sampleRate * 0.5;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const noise = Math.random() * 2 - 1;
    const envelope = Math.random() > 0.97 ? 1 : 0;
    data[i] = noise * envelope * 0.3;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'highpass';
  bandpass.frequency.setValueAtTime(2000, audioCtx.currentTime);

  const crackleGain = audioCtx.createGain();
  crackleGain.gain.setValueAtTime(0, audioCtx.currentTime);
  crackleGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 4);

  source.connect(bandpass);
  bandpass.connect(crackleGain);
  crackleGain.connect(gain);

  source.start(audioCtx.currentTime);

  return {
    stop: () => {
      crackleGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      source.stop(audioCtx.currentTime + 0.6);
    },
  };
}

export function initSound() {
  if (ambientNodes) return;
  const audioCtx = getContext();
  if (!masterGain) return;

  const wind = createWind(audioCtx, masterGain);
  const drone = createDistortedDrone(audioCtx, masterGain);
  const pulse = createPulse(audioCtx, masterGain);
  const crackle = createCrackle(audioCtx, masterGain);

  ambientNodes = {
    stop: () => {
      wind.stop();
      drone.stop();
      pulse.stop();
      crackle.stop();
      ambientNodes = null;
    },
  };
}

export function stopSound() {
  ambientNodes?.stop();
  ambientNodes = null;
}

export function setVolume(v: number) {
  if (masterGain) {
    masterGain.gain.linearRampToValueAtTime(v, getContext().currentTime + 0.2);
  }
}

function createNoiseBuffer(audioCtx: AudioContext, duration: number, decay: number) {
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * decay));
  }
  return buffer;
}

export function playHover() {
  const audioCtx = getContext();
  if (!masterGain) return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(350, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(350, now);
  filter.Q.setValueAtTime(15, now);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.15);
}

export function playClick() {
  const audioCtx = getContext();
  if (!masterGain) return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  const noise = audioCtx.createBufferSource();
  noise.buffer = createNoiseBuffer(audioCtx, 0.08, 0.12);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.1, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(masterGain);
  noise.connect(noiseGain);
  noiseGain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.08);
  noise.start(now);
}

export function playReveal() {
  const audioCtx = getContext();
  if (!masterGain) return;
  const now = audioCtx.currentTime;

  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(60, now);
  osc1.frequency.exponentialRampToValueAtTime(800, now + 0.8);

  const filter1 = audioCtx.createBiquadFilter();
  filter1.type = 'lowpass';
  filter1.frequency.setValueAtTime(80, now);
  filter1.frequency.exponentialRampToValueAtTime(4000, now + 0.8);
  filter1.Q.setValueAtTime(2, now);

  const gain1 = audioCtx.createGain();
  gain1.gain.setValueAtTime(0.35, now);
  gain1.gain.linearRampToValueAtTime(0.2, now + 0.4);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 1);

  const osc2 = audioCtx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(120, now);
  osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.6);

  const gain2 = audioCtx.createGain();
  gain2.gain.setValueAtTime(0.12, now + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

  const noise = audioCtx.createBufferSource();
  noise.buffer = createNoiseBuffer(audioCtx, 0.5, 0.08);

  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.setValueAtTime(1000, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(4000, now + 0.4);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.2, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc1.connect(filter1);
  filter1.connect(gain1);
  gain1.connect(masterGain);

  osc2.connect(gain2);
  gain2.connect(masterGain);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);

  osc1.start(now);
  osc1.stop(now + 1);
  osc2.start(now + 0.15);
  osc2.stop(now + 0.7);
  noise.start(now);
}

export function isSoundInitialized() {
  return ambientNodes !== null;
}
