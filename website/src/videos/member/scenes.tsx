"use client";

// Reusable, data-driven scenes for the per-member walkthrough videos.
// Every scene is a pure function of local time `t`, like the other videos.

import type { ReactNode } from "react";
import type { Scene } from "@/components/MotionVideo";
import { lerp, prog } from "@/lib/anim";
import data from "@/data/content.json";
import { Big, C, Card, DrawPath, F, Kicker, Person, Pill, Type, smooth } from "../kit";

export type Member = { code: string; name: string; roll: string; color: string };

const MEMBER_COLOR: Record<string, string> = Object.fromEntries(data.team.map((m) => [m.code, m.color]));

/* ------------------------------------------------------------------ intro */
export function intro(m: Member, o: { headline: string; a2: string; a2Items: string[]; a3: string; a3Items: string[]; thread: ReactNode; caption: string; dur?: number }): Scene {
  return {
    title: "My part",
    dur: o.dur ?? 9,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 70, width: 1100 }}>
          <Kicker color={m.color}>{m.name} · {m.roll} · Group 10</Kicker>
          <Big size={56} style={{ marginTop: 10 }}>{o.headline}</Big>
        </F>
        {[[o.a2, o.a2Items, C.blue, "Assignment 2 · Define", 1.6], [o.a3, o.a3Items, C.purple, "Assignment 3 · Ideate", 4]].map(([title, items, col, kick, at], k) => (
          <F key={k} t={t} at={at as number} x={k ? 40 : -40} y={0} style={{ left: k ? 710 : 90, top: 280, width: 480 }}>
            <Card color={col as string} style={{ height: 270 }}>
              <Kicker color={col as string}>{kick as string}</Kicker>
              <div style={{ fontSize: 26, fontWeight: 600, marginTop: 10 }}>{title as string}</div>
              {(items as string[]).map((x, i) => (
                <F key={x} t={t} at={(at as number) + 1 + i * 0.5} y={10} style={{ position: "relative", marginTop: 11, fontSize: 22, color: C.soft }}>• {x}</F>
              ))}
            </Card>
          </F>
        ))}
        <F t={t} at={3.4} style={{ left: 590, top: 385, width: 100 }}>
          <svg width={100} height={40}><path d="M5,20 H80 M64,6 L82,20 L64,34" fill="none" stroke={m.color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </F>
        <F t={t} at={7} style={{ left: 90, top: 610, width: 1100 }}>
          <div style={{ fontSize: 25, color: C.soft }}>Thread: {o.thread}</div>
        </F>
      </>
    ),
  };
}

/* ------------------------------------------------------------------ persona */
export function persona(i: number, caption: string, dur = 12): Scene {
  const p = data.personas[i];
  return {
    title: `A2 · Meet ${p.name.split(" ")[0]}`,
    dur,
    caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 70, top: 40, width: 600 }}><Kicker color={C.blue}>Assignment 2 · Persona</Kicker></F>
        <F t={t} at={0.4} s={0.9} style={{ left: 70, top: 100, width: 640 }}>
          <Card color={p.color} style={{ height: 420 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 92, height: 92, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center" }}><Person size={46} /></div>
              <div>
                <Big size={40}>{p.name}</Big>
                <Pill color={p.color} dark style={{ fontSize: 17, marginTop: 8 }}>{p.role}</Pill>
              </div>
            </div>
            {[["🎓", p.profile], ["🧭", p.behaviour], ["📱", p.devices]].map(([ic, x], n) => (
              <F key={n} t={t} at={1.4 + n * 0.8} x={-20} y={0} style={{ position: "relative", marginTop: 18, fontSize: 21, color: C.soft, display: "flex", gap: 12, lineHeight: 1.35 }}>
                <span>{ic}</span><span>{x}</span>
              </F>
            ))}
          </Card>
        </F>
        <F t={t} at={4.2} x={40} y={0} style={{ left: 770, top: 100, width: 440 }}>
          <div style={{ border: `2px solid ${C.amber}`, background: "rgba(242,180,65,.12)", borderRadius: 18, padding: "22px 26px" }}>
            <div style={{ color: C.amber, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>CORE NEED</div>
            <Big size={40} style={{ marginTop: 8 }}>{p.need}</Big>
          </div>
        </F>
        <F t={t} at={5.6} style={{ left: 70, top: 570, width: 1140 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontStyle: "italic" }}>
            <Type t={t} at={5.8} cps={34} text={p.quote} />
          </div>
        </F>
      </>
    ),
  };
}

/* ------------------------------------------------------------------ point of view */
export function pov(i: number, caption: string, dur = 13): Scene {
  const p = data.povs[i];
  const blocks: [string, string, string][] = [
    ["USER", p.user, C.blue],
    ["NEEDS", p.need, C.teal],
    ["BECAUSE (INSIGHT)", p.insight, C.amber],
  ];
  return {
    title: "A2 · Point of view",
    dur,
    caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 70, top: 40, width: 900 }}><Kicker color={C.blue}>Assignment 2 · Point of view (mad-lib)</Kicker></F>
        {blocks.map(([h, txt, c], i) => (
          <F key={h} t={t} at={0.9 + i * 1.8} x={-40} y={0} style={{ left: 70, top: 100 + i * 175, width: 720 }}>
            <div style={{ background: `${c}22`, border: `2px solid ${c}`, borderRadius: 16, padding: "16px 22px", height: 150 }}>
              <div style={{ color: c, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>{h}</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8, lineHeight: 1.3 }}>{txt}</div>
            </div>
          </F>
        ))}
        <F t={t} at={6.4} x={40} y={0} style={{ left: 850, top: 100, width: 360 }}>
          <Card color={C.green} style={{ height: 200 }}>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>SUCCESS LOOKS LIKE</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>{p.mn}</div>
            <div style={{ marginTop: 8, fontSize: 18, color: C.soft }}>{p.mi}</div>
          </Card>
        </F>
        <F t={t} at={9} s={0.92} style={{ left: 850, top: 330, width: 360 }}>
          <div style={{ background: "rgba(242,180,65,.16)", border: `2.5px solid ${C.amber}`, borderRadius: 18, padding: "20px 24px", minHeight: 230 }}>
            <div style={{ color: C.amber, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>HOW MIGHT WE</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.25, marginTop: 10 }}>{p.hmw.replace(/^HMW /, "")}</div>
          </div>
        </F>
      </>
    ),
  };
}

/* ------------------------------------------------------------------ journey map */
const EMO_C: Record<number, string> = { 2: C.green, 1: C.green, 0: C.amber, [-1]: "#f08a5b", [-2]: C.red };
const EMO_F: Record<number, string> = { 2: "😄", 1: "🙂", 0: "😐", [-1]: "😟", [-2]: "😣" };

export function journey(i: number, caption: string, closing: string, dur = 19): Scene {
  const j = data.journeys[i];
  const ph = j.phases;
  const low = ph.reduce((a, p, k) => (p.emo < ph[a].emo ? k : a), 0);
  return {
    title: "A2 · Journey map",
    dur,
    caption,
    render: (t) => {
      const T = (k: number) => 1.2 + k * 2.3;
      const cx = (k: number) => 60 + k * 195 + 92;
      const cy = (e: number) => 290 - e * 48;
      const pts = ph.map((p, k): [number, number] => [cx(k), cy(p.emo)]);
      return (
        <>
          <F t={t} at={0.1} style={{ left: 60, top: 22, width: 900 }}><Kicker color={C.blue}>Assignment 2 · {j.title.split(":")[0]}’s journey map</Kicker></F>
          <div style={{ position: "absolute", left: 60, right: 60, top: 290, borderTop: "1px dashed rgba(255,255,255,.25)", opacity: prog(t, 0.5, 0.5) }} />
          <div style={{ position: "absolute", left: 60 + low * 195, top: 88, width: 185, height: 590, borderRadius: 16, background: "rgba(239,107,91,.13)", border: "1.5px solid rgba(239,107,91,.5)", opacity: prog(t, T(low), 0.6) }} />
          <svg style={{ position: "absolute", left: 0, top: 0 }} width={1280} height={720}>
            {pts.slice(1).map((p, k) => <DrawPath key={k} t={t} at={T(k + 1) - 1} d={1} color="#cfe3ff" width={5} dPath={smooth([pts[k], p])} />)}
          </svg>
          {ph.map((p, k) => {
            const kk = prog(t, T(k), 0.6);
            const kp = prog(t, T(k) + 0.5, 0.6);
            const ko = prog(t, T(k) + 1.1, 0.6);
            return (
              <div key={p.name}>
                <div style={{ position: "absolute", left: 60 + k * 195, top: 92, width: 185, opacity: kk, textAlign: "center" }}>
                  <div style={{ display: "inline-flex", width: 30, height: 30, borderRadius: "50%", background: k === low ? C.red : C.blue, alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>{k + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginTop: 6, lineHeight: 1.2 }}>{p.name}</div>
                </div>
                <div style={{ position: "absolute", left: cx(k) - 24, top: cy(p.emo) - 24 + (1 - kk) * 20, width: 48, height: 48, borderRadius: "50%", background: EMO_C[p.emo], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, opacity: kk, boxShadow: "0 6px 18px rgba(0,0,0,.4)" }}>{EMO_F[p.emo]}</div>
                <div style={{ position: "absolute", left: 60 + k * 195, top: 440, width: 185, opacity: kp, transform: `translateY(${(1 - kp) * 14}px)` }}>
                  <div style={{ background: "rgba(239,107,91,.14)", border: "1.5px solid rgba(239,107,91,.55)", borderRadius: 12, padding: "9px 12px", height: 108 }}>
                    <div style={{ color: C.red, fontWeight: 700, fontSize: 13, letterSpacing: ".1em" }}>PAIN</div>
                    <div style={{ fontSize: 15.5, lineHeight: 1.25, marginTop: 3 }}>{p.pain}</div>
                  </div>
                </div>
                <div style={{ position: "absolute", left: 60 + k * 195, top: 556, width: 185, opacity: ko, transform: `translateY(${(1 - ko) * 14}px)` }}>
                  <div style={{ background: "rgba(47,184,166,.15)", border: "1.5px solid rgba(47,184,166,.6)", borderRadius: 12, padding: "9px 12px", height: 108 }}>
                    <div style={{ color: C.teal, fontWeight: 700, fontSize: 13, letterSpacing: ".1em" }}>OPPORTUNITY</div>
                    <div style={{ fontSize: 15.5, lineHeight: 1.25, marginTop: 3 }}>{p.opp}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <F t={t} at={T(5) + 2.2} style={{ left: 60, top: 678, width: 1160 }}>
            <div style={{ textAlign: "center", fontSize: 21, color: C.soft }}>{closing}</div>
          </F>
        </>
      );
    },
  };
}

/* ------------------------------------------------------------------ step flow */
export function steps(o: { title: string; kicker: string; head: string; items: [string, string][]; foot?: string; caption: string; dur?: number }): Scene {
  const cols = [C.blue, "#5b86c9", C.teal, "#37a88e", C.amber, C.red];
  return {
    title: o.title,
    dur: o.dur ?? 11,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 80, top: 70, width: 1100 }}>
          <Kicker color={C.blue}>{o.kicker}</Kicker>
          <Big size={50} style={{ marginTop: 8 }}>{o.head}</Big>
        </F>
        {o.items.map(([s, d], i) => {
          const k = prog(t, 1.4 + i * 0.7, 0.5);
          return (
            <div key={s} style={{ position: "absolute", left: 70 + i * 190, top: 260, opacity: k, transform: `translateX(${(1 - k) * -30}px)` }}>
              <svg width={200} height={110}><path d="M0,5 h165 l25,50 l-25,50 h-165 l25,-50 z" fill={cols[i % 6]} /></svg>
              <div style={{ position: "absolute", left: 22, top: 0, width: 150, height: 110, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, textAlign: "center" }}>{s}</div>
              <div style={{ width: 175, marginTop: 14, fontSize: 17, color: C.soft, lineHeight: 1.3, opacity: prog(t, 2 + i * 0.7, 0.5) }}>{d}</div>
            </div>
          );
        })}
        {o.foot && (
          <F t={t} at={6.5} style={{ left: 80, top: 560, width: 1120 }}>
            <div style={{ fontSize: 24, color: C.soft }}>{o.foot}</div>
          </F>
        )}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ three-column rows */
export function rows3(o: { title: string; kicker: string; heads: [string, string, string]; rows: [string, string, string][]; caption: string; dur?: number }): Scene {
  const hc = [C.soft, C.amber, C.teal];
  return {
    title: o.title,
    dur: o.dur ?? 13,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 46, width: 1000 }}><Kicker>{o.kicker}</Kicker></F>
        {o.heads.map((h, j) => (
          <F key={h} t={t} at={0.4 + j * 0.2} style={{ left: 90 + j * 380, top: 100, width: 350 }}>
            <div style={{ fontWeight: 600, color: hc[j], fontSize: 19, letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          </F>
        ))}
        {o.rows.map((r, i) =>
          r.map((txt, j) => (
            <F key={i + "-" + j} t={t} at={1.2 + i * 2.6 + j * 0.8} x={-30} y={0} style={{ left: 90 + j * 380, top: 145 + i * 180, width: 350 }}>
              <div style={{ background: j === 1 ? "rgba(242,180,65,.14)" : j === 2 ? "rgba(47,184,166,.16)" : C.card, border: `1.5px solid ${j === 1 ? C.amber : j === 2 ? C.teal : C.line}`, borderRadius: 14, padding: "12px 16px", fontSize: 19, lineHeight: 1.32, height: 150, display: "flex", alignItems: "center", fontWeight: j ? 600 : 400 }}>{txt}</div>
              {j < 2 && <div style={{ position: "absolute", right: -30, top: 58, fontSize: 28, color: C.soft }}>→</div>}
            </F>
          )),
        )}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ 2x2 matrix */
export function matrix(o: {
  title: string; kicker: string; head: string; x: string; y: string; quads: [string, string, string, string]; hot: number;
  points: { l: string; x: number; y: number; c: string; s?: "l" | "r" | "b" }[]; notes?: [string, string, string][]; caption: string; dur?: number;
}): Scene {
  return {
    title: o.title,
    dur: o.dur ?? 12,
    caption: o.caption,
    render: (t) => {
      const X0 = 330, Y0 = 110, PW = 620, PH = 500;
      const qpos = [[0, 0], [1, 0], [0, 1], [1, 1]];
      return (
        <>
          <F t={t} at={0.2} style={{ left: 60, top: 60, width: 250 }}>
            <Kicker>{o.kicker}</Kicker>
            <Big size={36} style={{ marginTop: 8 }}>{o.head}</Big>
          </F>
          <div style={{ position: "absolute", left: X0, top: Y0, width: PW, height: PH, border: "2px solid rgba(255,255,255,.4)", opacity: prog(t, 0.5, 0.5) }}>
            {qpos.map(([qx, qy], i) => (
              <div key={i} style={{ position: "absolute", left: (qx * PW) / 2, top: (qy * PH) / 2, width: PW / 2, height: PH / 2, background: i === o.hot ? `rgba(239,107,91,${0.08 + 0.16 * prog(t, 6.5, 0.6)})` : "transparent", borderLeft: qx ? "1px dashed rgba(255,255,255,.3)" : undefined, borderTop: qy ? "1px dashed rgba(255,255,255,.3)" : undefined, padding: 10, display: "flex", alignItems: qy ? "flex-end" : "flex-start", justifyContent: qx ? "flex-end" : "flex-start", fontSize: 16, fontWeight: 600, color: i === o.hot ? C.red : C.soft }}><span>{o.quads[i]}</span></div>
            ))}
          </div>
          <div style={{ position: "absolute", left: X0, top: Y0 + PH + 14, width: PW, textAlign: "center", fontSize: 18, color: C.soft }}>{o.x} →</div>
          <div style={{ position: "absolute", left: X0 - 34, top: Y0 + PH / 2, transform: "translate(-50%, -50%) rotate(-90deg)", fontSize: 18, color: C.soft, whiteSpace: "nowrap" }}>{o.y} →</div>
          {o.points.map((d, i) => {
            const k = prog(t, 1.4 + i * 0.45, 0.9);
            const x = lerp(X0 + PW / 2, X0 + d.x * PW, k);
            const y = lerp(Y0 + PH + 60, Y0 + (1 - d.y) * PH, k);
            return (
              <div key={d.l} style={{ position: "absolute", left: x - 10, top: y - 10, opacity: k }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: d.c, border: "3px solid #fff" }} />
                <div style={{ position: "absolute", whiteSpace: "nowrap", fontSize: 16.5, fontWeight: 600, ...((d.s ?? (d.x > 0.68 ? "l" : "r")) === "b" ? { top: 26, left: 10, transform: "translateX(-50%)" } : { top: -3, [(d.s ?? (d.x > 0.68 ? "l" : "r")) === "l" ? "right" : "left"]: 28 }) }}>{d.l}</div>
              </div>
            );
          })}
          {(o.notes ?? []).map(([h, s, c], i) => (
            <F key={h} t={t} at={7 + i * 0.8} style={{ left: 990, top: 150 + i * 175, width: 250 }}>
              <Card color={c}><b style={{ color: c }}>{h}</b><div style={{ fontSize: 18, marginTop: 6 }}>{s}</div></Card>
            </F>
          ))}
        </>
      );
    },
  };
}

/* ------------------------------------------------------------------ tagged list */
export function list(o: { title: string; kicker: string; head?: string; items: { tag: string; text: string; color?: string; sub?: string }[]; cols?: 1 | 2; size?: number; caption: string; dur?: number; hi?: number[] }): Scene {
  const cols = o.cols ?? 1;
  const n = o.items.length;
  const per = Math.ceil(n / cols);
  const top = o.head ? 170 : 110;
  const pitch = Math.min(110, (690 - top) / per);
  const size = o.size ?? 20;
  return {
    title: o.title,
    dur: o.dur ?? 12,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 70, top: 40, width: 1140 }}>
          <Kicker>{o.kicker}</Kicker>
          {o.head && <Big size={40} style={{ marginTop: 8 }}>{o.head}</Big>}
        </F>
        {o.items.map((it, i) => {
          const c = i % per, col = Math.floor(i / per);
          const hot = o.hi?.includes(i);
          const at = 1 + i * Math.min(0.7, 7 / n);
          return (
            <F key={i} t={t} at={at} x={-24} y={0} style={{ left: 70 + col * 580, top: top + c * pitch, width: cols === 1 ? 1140 : 560 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", background: hot ? `${it.color ?? C.teal}26` : C.card, border: `1.5px solid ${hot ? it.color ?? C.teal : C.line}`, borderRadius: 12, padding: "8px 14px", minHeight: pitch - 12 }}>
                <span style={{ flex: "none", minWidth: 64, textAlign: "center", background: it.color ?? C.teal, color: "#0b1a2e", fontWeight: 700, borderRadius: 99, padding: "4px 10px", fontSize: size - 4 }}>{it.tag}</span>
                <div style={{ fontSize: size, lineHeight: 1.28 }}>
                  {it.text}
                  {it.sub && <div style={{ fontSize: Math.max(size - 3, 15), color: C.soft, marginTop: 2 }}>{it.sub}</div>}
                </div>
              </div>
            </F>
          );
        })}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ bars */
export function bars(o: { title: string; kicker: string; head: string; items: { l: string; v: number; c: string; tag?: string }[]; max: number; unit?: string; legend?: [string, string][]; caption: string; dur?: number }): Scene {
  return {
    title: o.title,
    dur: o.dur ?? 11,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 70, top: 40, width: 1140 }}>
          <Kicker>{o.kicker}</Kicker>
          <Big size={40} style={{ marginTop: 8 }}>{o.head}</Big>
        </F>
        {(o.legend ?? []).map(([l, c], i) => (
          <F key={l} t={t} at={0.6} style={{ left: 70 + i * 150, top: 128 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 18 }}><i style={{ width: 16, height: 16, borderRadius: "50%", background: c, display: "inline-block" }} />{l}</div>
          </F>
        ))}
        {o.items.map((it, i) => {
          const k = prog(t, 1.2 + i * 0.6, 1);
          const pitch = Math.min(64, 520 / o.items.length);
          return (
            <div key={it.l} style={{ position: "absolute", left: 70, top: 170 + i * pitch, width: 1140, display: "flex", alignItems: "center", gap: 18, opacity: prog(t, 1 + i * 0.6, 0.4) }}>
              <div style={{ width: 470, fontSize: 19, lineHeight: 1.2 }}>{it.tag && <b style={{ color: it.c, marginRight: 8 }}>{it.tag}</b>}{it.l}</div>
              <div style={{ height: pitch - 18, width: 560 * (it.v / o.max) * k, background: it.c, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 12, color: "#0b1a2e", fontWeight: 700, fontSize: 20, minWidth: 8 }}>
                {k > 0.6 ? `${it.v}${o.unit ?? ""}` : ""}
              </div>
            </div>
          );
        })}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ cards */
export function cards(o: { title: string; kicker: string; head?: string; items: { h: string; body: ReactNode; c: string; foot?: string }[]; caption: string; dur?: number; size?: number }): Scene {
  const n = o.items.length;
  const w = (1140 - (n - 1) * 30) / n;
  return {
    title: o.title,
    dur: o.dur ?? 12,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 70, top: 40, width: 1140 }}>
          <Kicker>{o.kicker}</Kicker>
          {o.head && <Big size={40} style={{ marginTop: 8 }}>{o.head}</Big>}
        </F>
        {o.items.map((it, i) => (
          <F key={it.h} t={t} at={1 + i * 1.6} y={24} style={{ left: 70 + i * (w + 30), top: o.head ? 170 : 110, width: w }}>
            <div style={{ background: `${it.c}1f`, border: `2px solid ${it.c}`, borderRadius: 18, padding: "18px 22px", minHeight: o.head ? 470 : 530 }}>
              <div style={{ color: it.c, fontWeight: 700, fontSize: 19, letterSpacing: ".04em" }}>{it.h}</div>
              <div style={{ fontSize: o.size ?? 21, lineHeight: 1.36, marginTop: 10 }}>{it.body}</div>
              {it.foot && <div style={{ fontSize: 16, color: C.soft, marginTop: 14 }}>{it.foot}</div>}
            </div>
          </F>
        ))}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ real artifact image */
export function image(o: { title: string; kicker: string; src: string; label: string; bullets: string[]; color: string; caption: string; dur?: number }): Scene {
  return {
    title: o.title,
    dur: o.dur ?? 12,
    caption: o.caption,
    render: (t) => {
      const z = 1 + 0.05 * prog(t, 0.5, (o.dur ?? 12) - 1, (x) => x);
      return (
        <>
          <F t={t} at={0.1} style={{ left: 50, top: 28, width: 800 }}><Kicker color={C.purple}>{o.kicker}</Kicker></F>
          <F t={t} at={0.3} s={0.94} y={0} style={{ left: 50, top: 80, width: 760 }}>
            <div style={{ width: 760, height: 537, borderRadius: 14, overflow: "hidden", border: `3px solid ${o.color}`, background: "#fff", boxShadow: "0 24px 60px rgba(0,0,0,.45)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.src} alt={o.label} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${z})`, transformOrigin: "50% 40%" }} />
            </div>
            <div style={{ marginTop: 12, fontSize: 18, color: C.soft }}>{o.label}</div>
          </F>
          {o.bullets.map((b, i) => (
            <F key={b} t={t} at={1.6 + i * 1.6} x={30} y={0} style={{ left: 850, top: 90 + i * 150, width: 390 }}>
              <div style={{ borderLeft: `4px solid ${o.color}`, paddingLeft: 16, fontSize: 21, lineHeight: 1.34 }}>{b}</div>
            </F>
          ))}
        </>
      );
    },
  };
}

export function images(o: { title: string; kicker: string; items: { src: string; label: string }[]; color: string; foot?: string; caption: string; dur?: number }): Scene {
  return {
    title: o.title,
    dur: o.dur ?? 12,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.1} style={{ left: 50, top: 40, width: 1000 }}><Kicker color={C.purple}>{o.kicker}</Kicker></F>
        {o.items.map((it, i) => (
          <F key={it.src} t={t} at={0.6 + i * 1.8} y={30} style={{ left: 50 + i * 400, top: 120, width: 380 }}>
            <div style={{ width: 380, height: 269, borderRadius: 12, overflow: "hidden", border: `3px solid ${o.color}`, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 12, fontSize: 20, fontWeight: 600 }}>{it.label}</div>
          </F>
        ))}
        {o.foot && (
          <F t={t} at={6.5} style={{ left: 50, top: 520, width: 1180 }}>
            <div style={{ fontSize: 23, color: C.soft, lineHeight: 1.4 }}>{o.foot}</div>
          </F>
        )}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ team mind map, one branch highlighted */
const BR_C = [C.blue, "#e0735f", C.teal, C.amber];
export function branch(o: { ps: string; mine: string[]; color: string; caption: string; dur?: number; note?: string }): Scene {
  const m = data.mindmaps.find((x) => x.ps === o.ps)!;
  return {
    title: `A3 · ${o.ps} mind map`,
    dur: o.dur ?? 13,
    caption: o.caption,
    render: (t) => {
      const focus = prog(t, 6, 0.8);
      return (
        <>
          <F t={t} at={0.1} style={{ left: 40, top: 26, width: 900 }}><Kicker color={C.purple}>Assignment 3 · {o.ps} team mind map</Kicker></F>
          <F t={t} at={0.3} s={0.8} y={0} style={{ left: 390, top: 66, width: 500 }}>
            <div style={{ textAlign: "center", padding: "16px 20px", borderRadius: 18, background: "#17375e", border: `3px solid ${o.color}`, fontFamily: "var(--font-display)", fontSize: 28 }}>{m.center}</div>
          </F>
          {m.branches.map((b, i) => {
            const mine = o.mine.includes(b.name);
            const dim = mine ? 1 : 1 - 0.6 * focus;
            const x = 40 + i * 305;
            return (
              <div key={b.name} style={{ opacity: dim }}>
                <F t={t} at={1 + i * 0.9} y={20} style={{ left: x, top: 185, width: 285 }}>
                  <div style={{ background: BR_C[i], color: "#0b1a2e", borderRadius: 14, padding: "12px 10px", fontWeight: 700, fontSize: 20, textAlign: "center", boxShadow: mine && focus ? `0 0 ${30 * focus}px ${o.color}` : undefined, outline: mine && focus ? `3px solid ${o.color}` : undefined }}>{b.name}</div>
                </F>
                {b.nodes.map(([, n], k) => (
                  <F key={n} t={t} at={1.5 + i * 0.9 + k * 0.2} y={14} style={{ left: x, top: 265 + k * 82, width: 285 }}>
                    <div style={{ background: "rgba(14,35,64,.9)", border: `1.5px solid ${BR_C[i]}`, borderRadius: 12, padding: "9px 12px", fontSize: 17, lineHeight: 1.25, minHeight: 66, display: "flex", alignItems: "center" }}>{n}</div>
                  </F>
                ))}
              </div>
            );
          })}
          <F t={t} at={7.5} style={{ left: 40, top: 620, width: 1200 }}>
            <div style={{ fontSize: 21, color: C.soft, lineHeight: 1.35 }}>{o.note ?? `Insight: ${m.insights[0]}`}</div>
          </F>
        </>
      );
    },
  };
}

/* ------------------------------------------------------------------ brainstorm board, member highlighted */
export function stickies(o: { ps: string; code: string; color: string; caption: string; foot?: string; dur?: number }): Scene {
  const b = data.boards.find((x) => x.ps === o.ps)!;
  return {
    title: `A3 · ${o.ps} brainstorm`,
    dur: o.dur ?? 15,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.1} style={{ left: 40, top: 20, width: 1100 }}><Kicker color={C.purple}>Assignment 3 · Brainstorm board · {o.ps}</Kicker></F>
        {b.clusters.map((cl, ci) => {
          return (
            <div key={cl.label}>
              <F t={t} at={0.4 + ci * 0.3} style={{ left: 40 + ci * 410, top: 62, width: 390 }}>
                <div style={{ background: `${cl.color}40`, border: `2px solid ${cl.color}`, borderRadius: 14, padding: "8px 14px", fontWeight: 700, fontSize: 19 }}>{cl.label}</div>
              </F>
              {cl.notes.map((n, si) => {
                const mine = n.by === o.code;
                const myBuild = n.yes?.by === o.code;
                const glow = mine || myBuild ? prog(t, 7, 0.6) : 0;
                const dim = 1 - 0.55 * prog(t, 6.6, 0.8) * (mine || myBuild ? 0 : 1);
                const top = 118 + si * 64 + 38 * cl.notes.slice(0, si).filter((x) => x.yes).length;
                return (
                  <F key={n.n} t={t} at={1.2 + ci * 0.5 + si * 0.28} s={0.9} y={10} style={{ left: 40 + ci * 410, top, width: 390 }}>
                    <div style={{ opacity: dim, background: mine ? `${o.color}${glow ? "40" : "1a"}` : C.card, border: `1.5px solid ${mine ? o.color : C.line}`, borderRadius: 11, padding: "6px 10px", fontSize: 15, lineHeight: 1.2, height: 56, display: "flex", alignItems: "center", gap: 9, boxShadow: mine && glow ? `0 0 ${24 * glow}px ${o.color}88` : undefined }}>
                      <span style={{ flex: "none", width: 28, height: 28, borderRadius: "50%", background: MEMBER_COLOR[n.by], color: "#0b1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{n.by}</span>
                      <span>{n.text}</span>
                    </div>
                    {n.yes && (
                      <div style={{ position: "absolute", left: 38, top: 52, width: 340, opacity: prog(t, 9, 0.6), background: myBuild ? o.color : "rgba(255,255,255,.88)", color: "#0b1a2e", borderRadius: 9, padding: "4px 10px", fontSize: 13.5, fontWeight: 600, lineHeight: 1.2, zIndex: 3 }}>↳ {n.yes.by}: {n.yes.text}</div>
                    )}
                  </F>
                );
              })}
            </div>
          );
        })}
        {o.foot && (
          <F t={t} at={11} style={{ left: 40, top: 610, width: 1200 }}>
            <div style={{ fontSize: 20, color: C.soft }}>{o.foot}</div>
          </F>
        )}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ SCAMPER */
export function scamper(o: { ps: string; color: string; caption: string; dur?: number }): Scene {
  const s = data.scamper.find((x) => x.ps === o.ps)!;
  const best = Math.max(...s.rows.map((r) => r.impact + r.feas));
  return {
    title: "A3 · SCAMPER",
    dur: o.dur ?? 16,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.1} style={{ left: 50, top: 22, width: 1000 }}><Kicker color={C.purple}>Assignment 3 · SCAMPER · {s.feature}</Kicker></F>
        <F t={t} at={0.4} style={{ left: 50, top: 62, width: 1180 }}>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 16px", fontSize: 16.5, lineHeight: 1.35, color: C.soft }}><b style={{ color: "#fff" }}>Today: </b>{s.before}</div>
        </F>
        {s.rows.map((r, i) => {
          const top = r.impact + r.feas === best;
          return (
            <F key={r.l} t={t} at={1.6 + i * 1.3} x={-30} y={0} style={{ left: 50, top: 175 + i * 72, width: 1180 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, background: top && t > 11.5 ? `${o.color}26` : "transparent", borderRadius: 12, padding: "2px 8px" }}>
                <div style={{ flex: "none", width: 50, height: 50, borderRadius: 12, background: o.color, color: "#0b1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26 }}>{r.l}</div>
                <div style={{ flex: "none", width: 150, fontWeight: 700, fontSize: 17 }}>{r.name}</div>
                <div style={{ flex: 1, fontSize: 16, lineHeight: 1.28 }}>{r.idea}</div>
                <div style={{ flex: "none", width: 130, fontSize: 14, color: C.soft, textAlign: "right" }}>
                  impact <b style={{ color: C.amber }}>{"●".repeat(r.impact)}</b><br />feasible <b style={{ color: C.green }}>{"●".repeat(r.feas)}</b>
                </div>
              </div>
            </F>
          );
        })}
      </>
    ),
  };
}

/* ------------------------------------------------------------------ recap */
export function recap(m: Member, o: { steps: [string, string, string, string][]; line: ReactNode; head?: string; caption: string; dur?: number }): Scene {
  return {
    title: "Recap",
    dur: o.dur ?? 9,
    caption: o.caption,
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 70, width: 1100 }}>
          <Kicker color={m.color}>Recap · {m.name}</Kicker>
          <Big size={52} style={{ marginTop: 8 }}>{o.head ?? "Evidence in, idea out"}</Big>
        </F>
        {o.steps.map(([a, h, s, c], i) => (
          <div key={h}>
            <F t={t} at={1.2 + i * 0.9} y={20} style={{ left: 50 + i * 236, top: 270, width: 212 }}>
              <div style={{ background: `${c}22`, border: `2px solid ${c}`, borderRadius: 16, padding: "16px 14px", height: 220 }}>
                <Pill color={c} dark style={{ fontSize: 14, padding: "3px 12px" }}>{a}</Pill>
                <div style={{ fontWeight: 700, fontSize: 22, marginTop: 12, lineHeight: 1.15 }}>{h}</div>
                <div style={{ color: C.soft, fontSize: 17, marginTop: 10, lineHeight: 1.3 }}>{s}</div>
              </div>
            </F>
            {i < o.steps.length - 1 && (
              <F t={t} at={1.7 + i * 0.9} y={0} style={{ left: 50 + i * 236 + 212, top: 360, width: 26 }}>
                <div style={{ fontSize: 24, color: C.soft }}>→</div>
              </F>
            )}
          </div>
        ))}
        <F t={t} at={6.2} style={{ left: 90, top: 560, width: 1100 }}>
          <div style={{ fontSize: 25, color: C.soft }}>{o.line}</div>
        </F>
      </>
    ),
  };
}
