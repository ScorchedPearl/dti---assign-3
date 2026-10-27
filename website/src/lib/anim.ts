// Deterministic animation helpers. Every video frame is a pure function of time `t`,
// so scrubbing, pausing and replaying always render the same picture.

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 4);
export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** Eased progress 0..1 of an animation that starts at `start` and lasts `dur` seconds. */
export const prog = (t: number, start: number, dur = 0.6, ease = easeOut) => ease(clamp((t - start) / dur));

/** Progress that rises then falls: in at `a`, out at `b`. */
export const window_ = (t: number, a: number, b: number, fade = 0.4) =>
  Math.min(prog(t, a, fade), 1 - prog(t, b - fade, fade));

export const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};
