"use client";

import { Face, Ico } from "@/components/icons";
import MotionVideo, { type Scene } from "@/components/MotionVideo";
import { prog } from "@/lib/anim";
import { Big, C, Card, Count, DrawPath, F, Kicker, Person, Pill, smooth } from "./kit";

const THEMES = [
  { name: "Relied on seniors / peers", n: 16, c: C.green, code: "PEER" },
  { name: "ERP portal or network friction", n: 15, c: C.red, code: "ERP" },
  { name: "Document clarity / verification", n: 14, c: C.red, code: "DOC" },
  { name: "Hostel room readiness", n: 12, c: C.amber, code: "HOST" },
  { name: "Queue crowding / tokens", n: 9, c: C.blue, code: "QUE" },
  { name: "Wayfinding / staff guidance", n: 8, c: C.blue, code: "NAV" },
];

const QUAD = [
  { h: "SAYS", c: C.blue, items: ["“Everything should be mentioned beforehand”", "“Seniors answered every question”", "“The room was dirty”"] },
  { h: "THINKS", c: C.purple, items: ["Have I brought every document?", "Will the portal keep my upload?", "Can my family leave safely?"] },
  { h: "DOES", c: C.teal, items: ["Checks ERP, email, WhatsApp, Reddit", "Re-uploads, uses own hotspot", "Cleans room, buys a cooler"] },
  { h: "FEELS", c: C.amber, items: ["Excited and proud", "Nervous about mistakes", "Relieved when someone confirms"] },
];

const STG = ["Prepare", "Upload", "Arrive", "Verify", "Hostel", "Settle"];
const EM = [1, -1, 0, -2, 1, -2, 0];
const XS = [120, 300, 470, 640, 800, 960, 1140];

export const scenes: Scene[] = [
  {
    title: "How we listened",
    dur: 11,
    caption:
      "We collected open-ended accounts from first year students between 3 and 8 September 2026. Of 33 submitted rows, we removed 1 duplicate and 2 blank rows, leaving 30 unique student records.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 80 }}>
          <Kicker>Assignment 1 · Empathize</Kicker>
          <Big size={56} style={{ marginTop: 8 }}>We listened to first years</Big>
        </F>
        <div style={{ position: "absolute", left: 90, top: 260, display: "grid", gridTemplateColumns: "repeat(11, 54px)", gap: 12 }}>
          {Array.from({ length: 33 }).map((_, i) => {
            const removed = i === 7 || i === 19 || i === 28;
            const gone = removed && t > 5;
            return (
              <div key={i} style={{ opacity: prog(t, 0.8 + i * 0.05, 0.3) * (gone ? 0.15 : 1), transform: `scale(${gone ? 0.7 : 1})`, transition: "all .4s", display: "flex", justifyContent: "center" }}>
                <Person color={removed ? C.red : "#fff"} size={38} />
              </div>
            );
          })}
        </div>
        <F t={t} at={3} style={{ left: 840, top: 250 }}>
          <div style={{ fontSize: 22, color: C.soft }}>Submitted rows</div>
          <Big size={80}><Count t={t} at={3} to={33} /></Big>
        </F>
        <F t={t} at={5} style={{ left: 840, top: 390 }}>
          <div style={{ fontSize: 22, color: C.red }}>− 1 duplicate, − 2 blank</div>
        </F>
        <F t={t} at={6.2} style={{ left: 840, top: 440 }}>
          <div style={{ fontSize: 22, color: C.soft }}>Unique student records</div>
          <Big size={96} style={{ color: C.teal }}>30</Big>
        </F>
        <F t={t} at={7.5} style={{ left: 90, top: 560, width: 700 }}>
          <div style={{ fontSize: 22, color: C.soft }}>Names and roll numbers removed. Every quote on this site is anonymised.</div>
        </F>
      </>
    ),
  },
  {
    title: "What kept coming up",
    dur: 12,
    caption:
      "We coded every answer with a shared codebook (DOC, ERP, NET, QUE, NAV, PEER, HOST and more). These six themes came up most often. Counts are directional, not survey statistics.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
          <Kicker>Coding 30 records</Kicker>
          <Big size={50} style={{ marginTop: 8 }}>What kept coming up</Big>
        </F>
        {THEMES.map((th, i) => {
          const k = prog(t, 1.5 + i * 0.6, 1.2);
          return (
            <div key={th.code} style={{ position: "absolute", left: 90, top: 210 + i * 76, width: 1100, opacity: prog(t, 1 + i * 0.5, 0.5) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 360, fontSize: 22, fontWeight: 600 }}>{th.name}</div>
                <div style={{ flex: 1, height: 40, background: "rgba(255,255,255,.07)", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ width: `${(th.n / 30) * 100 * k}%`, height: "100%", background: th.c, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 12, fontWeight: 600, color: "#0b1a2e", fontSize: 20 }}>
                    {k > 0.3 ? `${i === 0 ? "≥" : "≈"}${Math.round(th.n * k)}` : ""}
                  </div>
                </div>
                <Pill color="rgba(255,255,255,.1)" dark style={{ fontSize: 15, width: 80, textAlign: "center" }}>{th.code}</Pill>
              </div>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "Empathy map",
    dur: 13,
    caption:
      "The empathy map shows what students said, thought, did and felt. The gap between Says and Thinks is the key: they said ‘smooth and fast’, but kept thinking ‘am I on the right path?’",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 50 }}>
          <Kicker>Empathy map</Kicker>
        </F>
        {QUAD.map((q, i) => (
          <F key={q.h} t={t} at={0.6 + i * 0.4} s={0.9} y={0} style={{ left: 90 + (i % 2) * 560, top: 100 + Math.floor(i / 2) * 280, width: 540 }}>
            <Card color={q.c} style={{ height: 260 }}>
              <div style={{ fontWeight: 600, color: q.c, fontSize: 22, letterSpacing: ".1em" }}>{q.h}</div>
              {q.items.map((it, j) => (
                <div key={it} style={{ fontSize: 22, marginTop: 14, opacity: prog(t, 2.5 + i * 1.6 + j * 0.45, 0.5), transform: `translateX(${(1 - prog(t, 2.5 + i * 1.6 + j * 0.45, 0.5)) * 20}px)` }}>
                  • {it}
                </div>
              ))}
            </Card>
          </F>
        ))}
        <F t={t} at={1.5} s={0.3} y={0} style={{ left: 590, top: 330 }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: C.ink, border: `4px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico e="🧑‍🎓" size={50} color="#fff" strokeWidth={1.5} /></div>
        </F>
      </>
    ),
  },
  {
    title: "How the day feels",
    dur: 12,
    caption:
      "Mapping emotions across the journey shows two valleys: one at the verification desk, when a requirement changes, and a second one at the hostel room door, after registration seemed finished.",
    render: (t) => {
      const pts = EM.map((e, i) => [XS[i], 400 - e * 75] as [number, number]);
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
            <Kicker>Emotional curve</Kicker>
            <Big size={50} style={{ marginTop: 8 }}>Two valleys, not one</Big>
          </F>
          <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
            <rect x={80} y={250} width={1120} height={150} fill="rgba(95,207,128,.08)" />
            <rect x={80} y={400} width={1120} height={170} fill="rgba(239,107,91,.08)" />
            <line x1={80} x2={1200} y1={400} y2={400} stroke="rgba(255,255,255,.25)" strokeDasharray="6 6" />
            <DrawPath t={t} at={1} d={4} dPath={smooth(pts)} color={C.teal} width={7} />
          </svg>
          {pts.map(([x, y], i) => (
            <F key={i} t={t} at={1.2 + i * 0.55} s={0.3} y={0} style={{ left: x - 26, top: y - 30 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><Face v={EM[i]} size={32} /></div>
            </F>
          ))}
          {["Excited", "Upload doubts", "Arrived!", "Unlisted document", "Roll number", "Room not ready", "Getting there"].map((l, i) => (
            <div key={l} style={{ position: "absolute", left: XS[i] - 80, width: 160, top: 610, textAlign: "center", fontSize: 18, color: EM[i] < -1 ? C.red : C.soft, fontWeight: EM[i] < -1 ? 700 : 400, opacity: prog(t, 1.2 + i * 0.55, 0.4) }}>{l}</div>
          ))}
          {[[640, "Valley 1: verification desk", 6.5], [960, "Valley 2: the room door", 7.5]].map(([x, l, at]) => (
            <F key={l as string} t={t} at={at as number} y={-16} style={{ left: (x as number) - 150, top: 255, width: 300, textAlign: "center" }}>
              <Pill color={C.red} style={{ fontSize: 17 }}>{l}</Pill>
              <div style={{ width: 0, height: 230, margin: "6px auto 0", borderLeft: `2px dashed ${C.red}`, opacity: 0.6 }} />
            </F>
          ))}
          <div style={{ position: "absolute", left: 0, width: 1280, top: 660, textAlign: "center", fontSize: 15, color: C.soft }}>{STG.join("  →  ")}</div>
        </>
      );
    },
  },
  {
    title: "Four kinds of students",
    dur: 11,
    caption:
      "We turned recurring patterns into four composite personas. They are fictional combinations of many answers, not real respondents. One student can be all four in a single day.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
          <Kicker>Composite personas</Kicker>
          <Big size={50} style={{ marginTop: 8 }}>Four kinds of students we design for</Big>
        </F>
        {[
          { n: "Ananya", r: "Prepared Planner", c: C.blue, e: "🗂️", q: "Tell me everything before I travel." },
          { n: "Kabir", r: "Digitally Blocked", c: C.red, e: "📶", q: "Show me what failed, let me continue." },
          { n: "Rohan", r: "Guided Newcomer", c: C.amber, e: "🧭", q: "I trust whoever answers me now." },
          { n: "Meera", r: "Transitioning Resident", c: C.teal, e: "🛏️", q: "Not done until I can settle in." },
        ].map((p, i) => {
          const k = prog(t, 1 + i * 0.6, 0.8);
          return (
            <div key={p.n} style={{ position: "absolute", left: 90 + i * 280, top: 220, width: 260, opacity: k, transform: `perspective(800px) rotateY(${(1 - k) * 80}deg)` }}>
              <Card color={p.c} style={{ height: 360, textAlign: "center" }}>
                <div style={{ width: 96, height: 96, margin: "6px auto 0", borderRadius: 28, background: `${p.c}26`, border: `1px solid ${p.c}66`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico e={p.e} size={48} color={p.c} strokeWidth={1.5} /></div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32, marginTop: 6 }}>{p.n}</div>
                <div style={{ color: p.c, fontWeight: 700, fontSize: 19 }}>{p.r}</div>
                <div style={{ fontSize: 20, fontStyle: "italic", marginTop: 20, color: C.soft, lineHeight: 1.4 }}>“{p.q}”</div>
              </Card>
            </div>
          );
        })}
      </>
    ),
  },
];

export default function EmpathizeVideo() {
  return <MotionVideo id="video-empathize" label="Assignment 1" title="Empathize: what 30 students told us" scenes={scenes} accent={C.green} />;
}
