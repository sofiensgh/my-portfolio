/**
 * Procedural YoRHa soundscape — everything is synthesized with the Web Audio
 * API, so there are no audio files to load and nothing to license.
 *
 * - ambient: a slow, detuned minor-9 pad through a breathing low-pass filter,
 *   with sparse high "star" notes, all sent into a long generated reverb.
 * - click: a short digital blip (brighter on interactive elements).
 */

const STORAGE_KEY = "sound";

// A minor 9 voicing, low and open.
const PAD_NOTES = [110, 164.81, 196, 246.94, 261.63];
// A minor pentatonic, two octaves up, for the drifting star notes.
const STAR_NOTES = [880, 987.77, 1046.5, 1318.51, 1567.98, 1760];

type Listener = (enabled: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private reverb: ConvolverNode | null = null;
  private ambientBus: GainNode | null = null;
  private ambientNodes: AudioScheduledSourceNode[] = [];
  private starTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners = new Set<Listener>();
  enabled = false;

  /** Stored preference — audio still needs a user gesture before it can start. */
  get preferred() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      return false;
    }
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn(this.enabled));
  }

  private ensureContext() {
    if (this.ctx) return this.ctx;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    const reverb = ctx.createConvolver();
    reverb.buffer = this.impulse(ctx, 4.5, 2.6);
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    reverb.connect(wet).connect(master);

    this.ctx = ctx;
    this.master = master;
    this.reverb = reverb;
    return ctx;
  }

  /** Decaying stereo noise — a cheap but convincing hall reverb. */
  private impulse(ctx: AudioContext, seconds: number, decay: number) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }
    return buffer;
  }

  async setEnabled(on: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      // storage unavailable — the toggle still works for this visit
    }
    if (on === this.enabled) return;
    this.enabled = on;
    this.emit();

    if (on) {
      const ctx = this.ensureContext();
      await ctx.resume();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
  }

  toggle() {
    return this.setEnabled(!this.enabled);
  }

  private startAmbient() {
    const ctx = this.ctx!;
    const now = ctx.currentTime;

    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0, now);
    bus.gain.linearRampToValueAtTime(0.11, now + 4);
    bus.connect(this.master!);
    bus.connect(this.reverb!);
    this.ambientBus = bus;

    // Breathing low-pass filter over the whole pad.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 650;
    filter.Q.value = 0.7;
    filter.connect(bus);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 380;
    lfo.connect(lfoDepth).connect(filter.frequency);
    lfo.start();
    this.ambientNodes.push(lfo);

    // Two slightly detuned voices per note for a slow chorus shimmer.
    PAD_NOTES.forEach((freq, i) => {
      for (const detune of [-7, 6]) {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;
        osc.detune.value = detune;
        const g = ctx.createGain();
        g.gain.value = i === 0 ? 0.32 : 0.12;
        osc.connect(g).connect(filter);
        osc.start(now);
        this.ambientNodes.push(osc);
      }
    });

    // Faint filtered noise — the hum of a ship in the dark.
    const noise = ctx.createBufferSource();
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    noise.buffer = noiseBuf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 420;
    noiseFilter.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.035;
    noise.connect(noiseFilter).connect(noiseGain).connect(bus);
    noise.start(now);
    this.ambientNodes.push(noise);

    this.scheduleStar();
  }

  /** Sparse bell-like notes that drift in and ring out into the reverb. */
  private scheduleStar() {
    this.starTimer = setTimeout(
      () => {
        if (!this.enabled || !this.ctx || !this.ambientBus) return;
        const ctx = this.ctx;
        const t = ctx.currentTime;
        const freq = STAR_NOTES[Math.floor(Math.random() * STAR_NOTES.length)];
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.05, t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);
        const pan = ctx.createStereoPanner();
        pan.pan.value = Math.random() * 1.4 - 0.7;
        osc.connect(g).connect(pan);
        pan.connect(this.ambientBus);
        pan.connect(this.reverb!);
        osc.start(t);
        osc.stop(t + 3.6);
        this.scheduleStar();
      },
      2500 + Math.random() * 5000,
    );
  }

  private stopAmbient() {
    if (this.starTimer) clearTimeout(this.starTimer);
    const ctx = this.ctx;
    const bus = this.ambientBus;
    const nodes = this.ambientNodes;
    this.ambientNodes = [];
    this.ambientBus = null;
    if (!ctx || !bus) return;
    const now = ctx.currentTime;
    bus.gain.cancelScheduledValues(now);
    bus.gain.setValueAtTime(bus.gain.value, now);
    bus.gain.linearRampToValueAtTime(0, now + 1.2);
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          // already stopped
        }
      });
      bus.disconnect();
    }, 1300);
  }

  /** Short digital blip; `strong` for buttons and links. */
  click(strong = false) {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(strong ? 1600 : 1100, t);
    osc.frequency.exponentialRampToValueAtTime(strong ? 520 : 420, t + 0.08);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 3200;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(strong ? 0.07 : 0.04, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

    osc.connect(filter).connect(g);
    g.connect(this.master!);
    g.connect(this.reverb!);
    osc.start(t);
    osc.stop(t + 0.14);

    if (strong) {
      // A second, higher tick a beat later — the YoRHa "confirm" feel.
      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.value = 2400;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0, t + 0.05);
      g2.gain.linearRampToValueAtTime(0.03, t + 0.055);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o2.connect(g2);
      g2.connect(this.master!);
      g2.connect(this.reverb!);
      o2.start(t + 0.05);
      o2.stop(t + 0.18);
    }
  }
}

export const sound = new SoundEngine();
