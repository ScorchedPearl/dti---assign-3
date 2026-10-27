import type { CSSProperties, ReactNode } from "react";
import { clamp, lerp, prog } from "@/lib/anim";

export const C = {
  teal: "#2fb8a6",
  blue: "#4c9be8",
  red: "#ef6b5b",
  amber: "#f2b441",
  green: "#5fcf80",
  purple: "#a98bf0",
  ink: "#0e2340",
  soft: "rgba(255,255,255,.72)",
  card: "rgba(255,255,255,.07)",
  line: "rgba(255,255,255,.14)",
};

type FadeProps = {
  t: number;
  at: number;
  d?: number;
  x?: number;
  y?: number;
  s?: number;
  out?: number;
  style?: CSSProperties;
  children: ReactNode;
};

/** Absolutely positioned element that fades/slides in at `at` (and optionally out at `out`). */
export function F({ t, at, d = 0.85, x = 0, y = 24, s = 1, out, style, children }: FadeProps) {
  let k = prog(t, at, d);
  if (out != null) k = Math.min(k, 1 - prog(t, out, 0.4));
  return (
    <div
      style={{
        position: "absolute",
        opacity: k,
        transform: `translate(${x * (1 - k)}px, ${y * (1 - k)}px) scale(${lerp(s, 1, k)})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export const Kicker = ({ children, color = C.teal }: { children: ReactNode; color?: string }) => (
  <div style={{ color, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", fontSize: 17 }}>{children}</div>
);

export const Big = ({ children, size = 64, style }: { children: ReactNode; size?: number; style?: CSSProperties }) => (
  <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: size, lineHeight: 1.1, letterSpacing: "-0.02em", ...style }}>
    {children}
  </div>
);

export const Card = ({ children, color = C.teal, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => (
  <div
    style={{
      background: C.card,
      border: `1px solid ${C.line}`,
      borderTop: `3px solid ${color}`,
      borderRadius: 18,
      boxShadow: "0 20px 40px -24px rgba(0,0,0,.5)",
      padding: "18px 22px",
      backdropFilter: "blur(4px)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill = ({ children, color = C.teal, dark = false, style }: { children: ReactNode; color?: string; dark?: boolean; style?: CSSProperties }) => (
  <span
    style={{
      display: "inline-block",
      background: color,
      color: dark ? "#fff" : "#0b1a2e",
      fontWeight: 700,
      borderRadius: 99,
      padding: "6px 16px",
      fontSize: 20,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

/** Number that counts up from 0 to `to` between `at` and `at+d`. */
export const Count = ({ t, at, d = 1.2, to, suffix = "" }: { t: number; at: number; d?: number; to: number; suffix?: string }) => (
  <>{Math.round(to * prog(t, at, d))}{suffix}</>
);

/** Text that types itself out. */
export const Type = ({ t, at, cps = 38, text }: { t: number; at: number; cps?: number; text: string }) => {
  const n = Math.floor(clamp((t - at) * cps, 0, text.length));
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && t > at ? <span style={{ opacity: 0.7 }}>▍</span> : null}
    </>
  );
};

/** A simple person glyph. */
export const Person = ({ color = "#fff", size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 20 25">
    <circle cx="10" cy="6" r="5" fill={color} />
    <path d="M1 25 C1 15 19 15 19 25 Z" fill={color} />
  </svg>
);

/** SVG path that draws itself between `at` and `at+d`. */
export const DrawPath = ({
  t, at, d = 1.6, dPath, color = C.teal, width = 5, dash,
}: { t: number; at: number; d?: number; dPath: string; color?: string; width?: number; dash?: string }) => {
  const k = prog(t, at, d);
  return (
    <path
      d={dPath}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash ?? "1 1"}
      strokeDashoffset={dash ? 0 : 1 - k}
      opacity={dash ? k : 1}
    />
  );
};

/** Smooth curve through points (for emotional curves). */
export const smooth = (pts: [number, number][]) => {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return d;
};


/** Phone frame for product mockups. */
export const Phone = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      position: "absolute",
      width: 300,
      height: 590,
      borderRadius: 44,
      background: "#0a1220",
      border: "10px solid #1c2b44",
      boxShadow: "0 30px 80px rgba(0,0,0,.45)",
      overflow: "hidden",
      ...style,
    }}
  >
    <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 22, borderRadius: 12, background: "#1c2b44" }} />
    <div style={{ position: "absolute", inset: "40px 14px 14px", color: "#fff" }}>{children}</div>
  </div>
);
