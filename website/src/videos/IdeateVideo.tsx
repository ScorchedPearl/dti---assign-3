"use client";

import { Ico } from "@/components/icons";
import MotionVideo, { type Scene } from "@/components/MotionVideo";
import { lerp, prog } from "@/lib/anim";
import { Big, C, F, Kicker, Pill } from "./kit";

const MEMBER = ["#FFE58F", "#B7EB8F", "#91D5FF", "#FFADD2", "#FFC69A", "#D3ADF7", "#87E8DE", "#E6F59A"];

const BRANCHES = [
  { n: "Verified Checklist", e: "📋", c: C.blue, x: 330, y: 200, nodes: ["Dated, versioned list", "Sample per document", "Change alerts"] },
  { n: "Upload Confidence", e: "☁️", c: C.red, x: 950, y: 200, nodes: ["Autosave + resume", "Size check first", "Staggered windows"] },
  { n: "Status & Proof", e: "✅", c: C.teal, x: 950, y: 520, nodes: ["Status lights", "Ready to Report QR", "Fee confirmed fast"] },
  { n: "Unexpected Resources", e: "🔗", c: C.amber, x: 330, y: 520, nodes: ["DigiLocker / JoSAA", "Senior volunteers", "Parent summary"] },
];

const STICKIES = [
  "Token shows personal desk route", "Colour-coded floor trail", "Reporting slots by branch", "Map card for families", "Green lane if pre-verified", "One exception desk",
  "Live now-serving screens", "Shade, fans, water", "Welcome film + clubs", "Roaming verifiers", "Parents’ lounge",
  "Room inspection card", "QR on door to report", "Day-one essentials kit", "Room-mate details early", "Warden first-night round", "Essentials map",
];
const CLUSTER = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
const CL = [
  { n: "Move without getting lost", c: C.blue },
  { n: "Wait less, wait better", c: C.amber },
  { n: "A room ready to live in", c: C.teal },
];

const SCAMPER = [
  ["S", "Substitute", "Paper token → QR e-token on SMS, tied to a time slot"],
  ["C", "Combine", "Token + personal desk route + hostel room number"],
  ["A", "Adapt", "Theme-park virtual queue: wait anywhere, get pinged"],
  ["M", "Magnify", "Big now-serving screens with live wait times"],
  ["P", "Put to other use", "Off-peak kiosks become hostel repair desks"],
  ["E", "Eliminate", "No queue at all for pre-verified students"],
  ["R", "Reverse", "Hostel key first, paperwork after"],
];

export const scenes: Scene[] = [
  {
    title: "Diverge, then converge",
    dur: 10,
    caption:
      "Ideation for three problem statements: the course problem on public transport, plus our PS-1 and PS-2. We used three methods in order: individual mind maps, a timed group brainstorm, then SCAMPER, before converging.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 70 }}>
          <Kicker color={C.purple}>Assignment 3 · Ideate</Kicker>
          <Big size={54} style={{ marginTop: 8 }}>Go wide first, then choose</Big>
        </F>
        <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
          <path d={`M120,430 L${lerp(120, 460, prog(t, 1, 1))},${lerp(430, 270, prog(t, 1, 1))} L${lerp(120, 460, prog(t, 1, 1))},${lerp(430, 590, prog(t, 1, 1))} Z`} fill="rgba(76,155,232,.25)" stroke={C.blue} strokeWidth={2} />
          <rect x={460} y={270} width={lerp(0, 360, prog(t, 2.2, 1))} height={320} fill="rgba(169,139,240,.2)" stroke={C.purple} strokeWidth={2} />
          <path d={`M820,270 L${lerp(820, 1160, prog(t, 3.4, 1))},430 L820,590 Z`} fill="rgba(242,180,65,.22)" stroke={C.amber} strokeWidth={2} opacity={prog(t, 3.4, 0.3)} />
        </svg>
        {[
          { x: 200, h: "DIVERGE", s: "Individual mind maps", c: C.blue, a: 1.4 },
          { x: 530, h: "BUILD", s: "Group brainstorm, “Yes, and…”", c: C.purple, a: 2.6 },
          { x: 850, h: "CONVERGE", s: "SCAMPER → impact × effort", c: C.amber, a: 3.8 },
        ].map((o) => (
          <F key={o.h} t={t} at={o.a} style={{ left: o.x, top: 390, width: 260, textAlign: "center" }}>
            <div style={{ fontWeight: 600, fontSize: 26, color: o.c }}>{o.h}</div>
            <div style={{ fontSize: 19, marginTop: 6 }}>{o.s}</div>
          </F>
        ))}
        <F t={t} at={5.5} style={{ left: 90, top: 630 }}>
          <div style={{ display: "flex", gap: 14 }}>
            <Pill color={C.red} style={{ fontSize: 18 }}>PS-T Commuters</Pill>
            <Pill color={C.blue} style={{ fontSize: 18 }}>PS-1 Before travel</Pill>
            <Pill color={C.teal} style={{ fontSize: 18 }}>PS-2 Gate to room</Pill>
          </div>
        </F>
      </>
    ),
  },
  {
    title: "Mind map",
    dur: 12,
    caption:
      "Each member first mapped ideas alone, so nobody anchored on one idea. This is the PS-1 map: four colour-coded branches with three idea nodes each. Dashed lines link related ideas across branches.",
    render: (t) => (
      <>
        <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
          {BRANCHES.map((b, i) => {
            const k = prog(t, 1 + i * 0.5, 0.8);
            return <line key={b.n} x1={640} y1={360} x2={lerp(640, b.x, k)} y2={lerp(360, b.y, k)} stroke={b.c} strokeWidth={10} strokeLinecap="round" />;
          })}
          {BRANCHES.map((b, i) =>
            b.nodes.map((_, j) => {
              const left = b.x < 640;
              const nx = left ? 120 : 1160;
              const ny = b.y - 90 + j * 90;
              const k = prog(t, 3.5 + i * 0.6 + j * 0.2, 0.6);
              return <line key={b.n + j} x1={b.x} y1={b.y} x2={lerp(b.x, nx, k)} y2={lerp(b.y, ny, k)} stroke={b.c} strokeWidth={3} opacity={0.7} />;
            }),
          )}
          <path d="M210,170 Q640,60 1070,450" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={2} strokeDasharray="7 6" opacity={prog(t, 8, 0.6)} />
        </svg>
        {BRANCHES.map((b, i) =>
          b.nodes.map((n, j) => {
            const left = b.x < 640;
            return (
              <F key={n} t={t} at={3.8 + i * 0.6 + j * 0.2} s={0.6} y={0} style={{ left: left ? 30 : 1070, top: b.y - 90 + j * 90 - 22, width: 180 }}>
                <div style={{ background: "#fff", color: "#111", border: `3px solid ${b.c}`, borderRadius: 12, padding: "8px 10px", fontSize: 16, fontWeight: 600, textAlign: "center" }}>{n}</div>
              </F>
            );
          }),
        )}
        {BRANCHES.map((b, i) => (
          <F key={b.n} t={t} at={1.6 + i * 0.5} s={0.5} y={0} style={{ left: b.x - 115, top: b.y - 40, width: 230 }}>
            <div style={{ background: b.c, borderRadius: 16, padding: "12px 10px", textAlign: "center", fontWeight: 600, fontSize: 21, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><Ico e={b.e} size={24} color="#fff" />{b.n}</div>
          </F>
        ))}
        <F t={t} at={0.3} s={0.4} y={0} style={{ left: 500, top: 300 }}>
          <div style={{ width: 280, height: 120, borderRadius: "50%", background: "#17375E", border: "5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26 }}>Travel-Ready<br />Registration</div>
        </F>
        <F t={t} at={8.3} style={{ left: 560, top: 70 }}>
          <Pill color="#fff" style={{ fontSize: 16 }}>- - - linked: “prevent rejections”</Pill>
        </F>
      </>
    ),
  },
  {
    title: "15-minute brainstorm",
    dur: 13,
    caption:
      "In a timed 15-minute session the team wrote at least 15 ideas per board, one per sticky note, each member in their own colour. Then we grouped the notes into three clusters named after user needs.",
    render: (t) => {
      const sort = prog(t, 6.5, 1.6);
      const clock = Math.max(0, 15 - Math.floor(t * 1.5));
      const counters = [0, 0, 0];
      return (
        <>
          <F t={t} at={0.2} style={{ left: 60, top: 40 }}>
            <Kicker color={C.purple}>Board PS-2 · 17 ideas · 3 clusters</Kicker>
          </F>
          <div style={{ position: "absolute", right: 60, top: 32, background: "#000", borderRadius: 10, padding: "6px 14px", fontWeight: 600, fontSize: 22, fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "center", gap: 8 }}><Ico e="⏱" size={22} />{clock}:00</div>
          {CL.map((c, i) => (
            <div key={c.n} style={{ position: "absolute", left: 60 + i * 395, top: 100, width: 375, height: 590, border: `3px dashed ${c.c}`, borderRadius: 16, opacity: sort }}>
              <div style={{ background: c.c, margin: 10, borderRadius: 10, padding: "8px 12px", fontWeight: 600, fontSize: 20 }}>{c.n}</div>
            </div>
          ))}
          {STICKIES.map((s, i) => {
            const cl = CLUSTER[i];
            const slot = counters[cl]++;
            const rx = 80 + ((i * 197) % 1050);
            const ry = 120 + ((i * 131) % 470);
            const tx = 75 + cl * 395 + (slot % 2) * 178;
            const ty = 170 + Math.floor(slot / 2) * 168;
            const k = prog(t, 0.6 + i * 0.3, 0.4);
            const rot = ((i * 37) % 9) - 4;
            return (
              <div key={s} style={{ position: "absolute", left: lerp(rx, tx, sort), top: lerp(ry - 60 * (1 - k), ty, sort), width: 165, height: 150, background: MEMBER[i % 8], color: "#222", padding: 12, fontSize: 18, fontWeight: 600, lineHeight: 1.25, borderRadius: 4, opacity: k, transform: `rotate(${rot}deg)`, boxShadow: "0 6px 14px rgba(0,0,0,.3)" }}>
                {s}
              </div>
            );
          })}
        </>
      );
    },
  },
  {
    title: "“Yes, and…”",
    dur: 9,
    caption:
      "Instead of criticising, teammates built on each other’s ideas with ‘Yes, and…’. These builds often produced the most original ideas, like the room photo sent before arrival.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 70 }}>
          <Kicker color={C.purple}>Building, not blocking</Kicker>
          <Big size={52} style={{ marginTop: 8 }}>“Yes, and…”</Big>
        </F>
        {[
          ["Pre-handover inspection card signed by caretaker", "…and a photo of the inspected room is sent before arrival", 0, 3],
          ["Token shows a personal desk route", "…and it pings your phone when your desk is ready", 2, 7],
          ["Autosave every field; resume from the failed step", "…and offline mode queues uploads until the hotspot reconnects", 5, 1],
        ].map(([a, b, c1, c2], i) => (
          <div key={i} style={{ position: "absolute", left: 90 + i * 380, top: 240 }}>
            <F t={t} at={0.8 + i * 0.8} s={0.7} y={0} style={{ left: 0, top: 0, width: 330 }}>
              <div style={{ background: MEMBER[c1 as number], color: "#222", padding: 18, fontSize: 22, fontWeight: 600, height: 170, transform: "rotate(-2deg)", boxShadow: "0 6px 14px rgba(0,0,0,.3)" }}>{a}</div>
            </F>
            <F t={t} at={2.6 + i * 0.9} x={30} y={30} style={{ left: 40, top: 150, width: 310 }}>
              <div style={{ background: MEMBER[c2 as number], color: "#222", padding: 16, fontSize: 20, border: "2px dashed #444", transform: "rotate(2deg)", boxShadow: "0 6px 14px rgba(0,0,0,.3)" }}>
                <b style={{ color: "#b02a1f" }}>YES, AND…</b> {b}
              </div>
            </F>
          </div>
        ))}
      </>
    ),
  },
  {
    title: "SCAMPER",
    dur: 13,
    caption:
      "SCAMPER forces seven kinds of change on one existing feature. Here it is applied to the paper token queue in the registration hall. Each letter produced a different, concrete variation.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 50 }}>
          <Kicker color={C.amber}>SCAMPER on the paper token queue</Kicker>
        </F>
        <F t={t} at={0.5} style={{ left: 980, top: 40 }}>
          <div style={{ background: "#fff", color: "#111", padding: "10px 16px", borderRadius: 6, fontWeight: 600, fontSize: 26, transform: "rotate(3deg)", display: "flex", alignItems: "center", gap: 10 }}><Ico e="🎫" size={28} color="#17375E" />Token #247</div>
        </F>
        {SCAMPER.map(([l, n, idea], i) => (
          <F key={l} t={t} at={1 + i * 1.3} x={-40} y={0} style={{ left: 90, top: 120 + i * 80, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 66, height: 66, borderRadius: 14, background: C.amber, color: "#0b1a2e", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{l}</div>
              <div style={{ width: 200, fontWeight: 700, fontSize: 22, color: C.amber }}>{n}</div>
              <div style={{ fontSize: 24 }}>{idea}</div>
            </div>
          </F>
        ))}
      </>
    ),
  },
  {
    title: "Choosing",
    dur: 12,
    caption:
      "We scored concepts on five weighted criteria: fit with our POV, evidence, feasibility in one admission cycle, whether it tests a hypothesis, and novelty. One concept per problem statement goes on to prototyping.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
          <Kicker color={C.amber}>Weighted scoring (out of 5)</Kicker>
          <Big size={50} style={{ marginTop: 8 }}>Three concepts go forward</Big>
        </F>
        {[
          { n: "Gate-to-Room Pass", ps: "PS-2", s: 4.7, c: C.teal },
          { n: "ReadyPass", ps: "PS-1", s: 4.5, c: C.blue },
          { n: "Smart Stop Strip", ps: "PS-T", s: 3.9, c: C.red },
        ].map((o, i) => {
          const k = prog(t, 1.5 + i * 0.7, 1.4);
          return (
            <div key={o.n} style={{ position: "absolute", left: 90, top: 250 + i * 130, width: 1100, opacity: prog(t, 1.2 + i * 0.6, 0.4) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 330 }}>
                  <div style={{ fontWeight: 600, fontSize: 28 }}>{o.n}</div>
                  <Pill color={o.c} style={{ fontSize: 15, marginTop: 4 }}>{o.ps}</Pill>
                </div>
                <div style={{ flex: 1, height: 56, background: "rgba(255,255,255,.07)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: `${(o.s / 5) * 100 * k}%`, height: "100%", background: o.c, borderRadius: 10 }} />
                </div>
                <div style={{ width: 90, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 40 }}>{(o.s * k).toFixed(1)}</div>
              </div>
            </div>
          );
        })}
        <F t={t} at={6} style={{ left: 90, top: 640 }}>
          <div style={{ fontSize: 20, color: C.soft }}>Criteria: POV fit 30% · Evidence 25% · Feasibility 20% · Tests a hypothesis 15% · Novelty 10%</div>
        </F>
      </>
    ),
  },
];

export default function IdeateVideo() {
  return <MotionVideo id="video-ideate" label="Assignment 3" title="Ideate: mind maps, brainstorm, SCAMPER" scenes={scenes} accent={C.purple} />;
}
