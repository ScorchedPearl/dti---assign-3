"use client";

import MotionVideo, { type Scene } from "@/components/MotionVideo";
import { lerp, prog } from "@/lib/anim";
import { Big, C, Card, F, Kicker, Pill, Type } from "./kit";

const STEPS = ["Saturate", "Group", "Insight", "Directive", "POV + HMW", "Statements"];
const STEP_C = [C.blue, "#5b86c9", C.teal, "#37a88e", C.amber, C.red];

const ROWS = [
  { o: "Documents asked on campus that were not in the advisory", i: "A late document collides with a fixed return ticket", d: "Freeze the checklist and prove it before travel" },
  { o: "≥16 of 30 used seniors’ WhatsApp groups", i: "Newcomers trust whoever answers their exact question now", d: "Give official info a senior’s speed and voice" },
  { o: "Dirty rooms, broken fan, light or lock", i: "Registration ends when the room is fit to leave a child in", d: "Make room readiness part of registration" },
];

const DOTS = [
  { l: "Late documents", x: 0.78, y: 0.95, c: C.red },
  { l: "ERP failure", x: 0.86, y: 0.72, c: C.red },
  { l: "Room not ready", x: 0.66, y: 0.8, c: C.amber },
  { l: "Queues", x: 0.52, y: 0.56, c: C.blue },
  { l: "Next desk", x: 0.45, y: 0.5, c: C.blue },
  { l: "Re-verification", x: 0.38, y: 0.44, c: C.teal },
  { l: "Conflicting answers", x: 0.6, y: 0.4, c: C.teal },
];

const LENSES = [
  ["Amplify the good", "Make official help as fast as a senior’s reply"],
  ["Eliminate the bad", "Make an unlisted document impossible on the day"],
  ["Explore the opposite", "Let the institute prove readiness to the student"],
  ["Question assumptions", "Registration complete = settled in a ready room"],
  ["Unexpected resources", "Reuse DigiLocker / JoSAA-verified documents"],
  ["Create an analogy", "A boarding-pass style “ready to report” pass"],
];

export const scenes: Scene[] = [
  {
    title: "From notes to a point of view",
    dur: 10,
    caption:
      "Define is where we turn 30 messy accounts into one clear statement. We followed the d.school method: saturate the wall, group, extract insights, turn them into directives, then write POVs and problem statements.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 80 }}>
          <Kicker color={C.blue}>Assignment 2 · Define</Kicker>
          <Big size={56} style={{ marginTop: 8 }}>From 30 accounts to one clear problem</Big>
        </F>
        {STEPS.map((s, i) => {
          const k = prog(t, 1.5 + i * 0.6, 0.5);
          const active = t > 1.5 + i * 0.6;
          return (
            <div key={s} style={{ position: "absolute", left: 80 + i * 190, top: 320, opacity: k, transform: `translateX(${(1 - k) * -30}px)` }}>
              <svg width={200} height={120}>
                <path d="M0,10 h165 l25,50 l-25,50 h-165 l25,-50 z" fill={active ? STEP_C[i] : "#1f3a5e"} />
              </svg>
              <div style={{ position: "absolute", left: 20, top: 0, width: 150, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 21, textAlign: "center" }}>{s}</div>
            </div>
          );
        })}
        <F t={t} at={5.5} style={{ left: 90, top: 500, width: 1100 }}>
          <div style={{ fontSize: 24, color: C.soft }}>Rule we followed: keep the user and the need, and leave the solution out.</div>
        </F>
      </>
    ),
  },
  {
    title: "Insights → directives",
    dur: 12,
    caption:
      "Each insight compresses several observations into one non-obvious ‘why’. Then we rewrote each insight as an action, a directive, which is one step away from a point of view.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 50 }}>
          <Kicker>Observation → insight → directive</Kicker>
        </F>
        {["What we observed", "Insight (the why)", "Directive"].map((h, j) => (
          <F key={h} t={t} at={0.4 + j * 0.2} style={{ left: 90 + j * 380, top: 110, width: 350 }}>
            <div style={{ fontWeight: 600, color: [C.soft, C.amber, C.teal][j], fontSize: 20, letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          </F>
        ))}
        {ROWS.map((r, i) =>
          [r.o, r.i, r.d].map((txt, j) => (
            <F key={i + "-" + j} t={t} at={1.2 + i * 2.6 + j * 0.8} x={-30} y={0} style={{ left: 90 + j * 380, top: 160 + i * 175, width: 350 }}>
              <div style={{ background: j === 1 ? "rgba(242,180,65,.14)" : j === 2 ? "rgba(47,184,166,.16)" : C.card, border: `1.5px solid ${j === 1 ? C.amber : j === 2 ? C.teal : C.line}`, borderRadius: 14, padding: "14px 18px", fontSize: 21, lineHeight: 1.35, height: 140, display: "flex", alignItems: "center", fontWeight: j ? 600 : 400 }}>
                {txt}
              </div>
              {j < 2 && <div style={{ position: "absolute", right: -30, top: 55, fontSize: 28, color: C.soft }}>→</div>}
            </F>
          )),
        )}
      </>
    ),
  },
  {
    title: "What to fix first",
    dur: 11,
    caption:
      "We plotted every pain point by how often it appeared and how badly it hurt. Three land in ‘fix first’: late documents, ERP failure and rooms not ready. They split neatly into before travel and on campus.",
    render: (t) => {
      const X0 = 330, Y0 = 110, PW = 620, PH = 500;
      return (
        <>
          <F t={t} at={0.2} style={{ left: 60, top: 60, width: 260 }}>
            <Kicker>Prioritisation</Kicker>
            <Big size={40} style={{ marginTop: 8 }}>Frequency × severity</Big>
          </F>
          <div style={{ position: "absolute", left: X0, top: Y0, width: PW, height: PH, border: "2px solid rgba(255,255,255,.4)", opacity: prog(t, 0.5, 0.5) }}>
            <div style={{ position: "absolute", left: PW / 2, top: 0, width: PW / 2, height: PH / 2, background: `rgba(239,107,91,${0.08 + 0.16 * prog(t, 6.5, 0.6)})` }} />
            <div style={{ position: "absolute", left: PW / 2, top: 0, height: "100%", borderLeft: "1px dashed rgba(255,255,255,.3)" }} />
            <div style={{ position: "absolute", top: PH / 2, left: 0, width: "100%", borderTop: "1px dashed rgba(255,255,255,.3)" }} />
            <div style={{ position: "absolute", right: 12, top: 10, fontWeight: 600, color: C.red, fontSize: 20 }}>FIX FIRST</div>
            <div style={{ position: "absolute", left: 12, bottom: 10, color: C.soft, fontSize: 16 }}>Monitor</div>
          </div>
          <div style={{ position: "absolute", left: X0, top: Y0 + PH + 14, width: PW, textAlign: "center", fontSize: 18, color: C.soft }}>How often it appeared →</div>
          <div style={{ position: "absolute", left: X0 - 34, top: Y0 + PH / 2, transform: "translate(-50%, -50%) rotate(-90deg)", fontSize: 18, color: C.soft, whiteSpace: "nowrap" }}>How badly it hurt →</div>
          {DOTS.map((d, i) => {
            const k = prog(t, 1.4 + i * 0.5, 0.9);
            const x = lerp(X0 + PW / 2, X0 + d.x * PW, k);
            const y = lerp(Y0 + PH + 60, Y0 + (1 - d.y) * PH, k);
            return (
              <div key={d.l} style={{ position: "absolute", left: x - 11, top: y - 11, opacity: k }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: d.c, border: "3px solid #fff" }} />
                <div style={{ position: "absolute", top: -2, [d.x > 0.72 ? "right" : "left"]: 30, whiteSpace: "nowrap", fontSize: 18, fontWeight: 600 }}>{d.l}</div>
              </div>
            );
          })}
          <F t={t} at={7} style={{ left: 990, top: 180, width: 250 }}>
            <Card color={C.blue}><b style={{ color: C.blue }}>Before travel</b><div style={{ fontSize: 19, marginTop: 6 }}>Late documents, ERP failure → PS-1</div></Card>
          </F>
          <F t={t} at={7.8} style={{ left: 990, top: 360, width: 250 }}>
            <Card color={C.teal}><b style={{ color: C.teal }}>On campus</b><div style={{ fontSize: 19, marginTop: 6 }}>Room, queues, next desk → PS-2</div></Card>
          </F>
        </>
      );
    },
  },
  {
    title: "User stories",
    dur: 12,
    caption:
      "We wrote 26 user stories in two rounds, one goal per story. A story with ‘and’ in it is trying to do too much, so we split it into separate stories, each with a clear test of ‘done’.",
    render: (t) => {
      const split = prog(t, 6, 1);
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
            <Kicker>26 user stories · 7 epics</Kicker>
            <Big size={48} style={{ marginTop: 8 }}>The “AND” test</Big>
          </F>
          <div style={{ position: "absolute", left: 190, top: 210, width: 900, opacity: prog(t, 0.8, 0.5) * (1 - split) }}>
            <Card color={C.red}>
              <Pill color={C.red} style={{ fontSize: 16 }}>Too much in one story</Pill>
              <div style={{ fontSize: 28, marginTop: 14, lineHeight: 1.4 }}>
                <Type t={t} at={1.2} cps={45} text="As Kabir, I want to upload documents AND pay fees AND see my status so that registration is done." />
              </div>
            </Card>
          </div>
          {[
            ["US-06", "have my upload progress saved automatically", "a crash does not make me start over"],
            ["US-09", "see my fee payment confirmed within minutes", "I do not pay twice or panic"],
            ["US-08", "see whether each document has been accepted", "I know when I am truly done"],
          ].map(([id, want, so], i) => (
            <div key={id} style={{ position: "absolute", left: lerp(190, 70 + i * 390, split), top: lerp(210, 230, split), width: 370, opacity: split }}>
              <Card color={C.green} style={{ height: 300 }}>
                <Pill color={C.green} style={{ fontSize: 16 }}>{id}</Pill>
                <div style={{ fontSize: 22, marginTop: 14, lineHeight: 1.45 }}>
                  As <b>Kabir</b>, I want to <span style={{ color: C.blue, fontWeight: 700 }}>{want}</span> so that <span style={{ color: C.amber, fontWeight: 700 }}>{so}</span>.
                </div>
              </Card>
            </div>
          ))}
          <F t={t} at={8} style={{ left: 90, top: 580 }}>
            <div style={{ fontSize: 22, color: C.soft }}>Each story has an evidence code from Empathize and an acceptance test.</div>
          </F>
        </>
      );
    },
  },
  {
    title: "How Might We",
    dur: 12,
    caption:
      "We wrote 12 How Might We questions using the six lenses from the brief: amplify the good, eliminate the bad, explore the opposite, question assumptions, unexpected resources and analogy. Then 8 members dot-voted.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 50 }}>
          <Kicker color={C.amber}>Six HMW lenses → dot vote</Kicker>
        </F>
        {LENSES.map(([lens, q], i) => {
          const votes = [7, 8, 7, 7, 6, 6][i];
          return (
            <F key={lens} t={t} at={0.7 + i * 0.5} s={0.85} y={0} style={{ left: 90 + (i % 3) * 375, top: 110 + Math.floor(i / 3) * 270, width: 350 }}>
              <Card color={C.amber} style={{ height: 245 }}>
                <div style={{ fontWeight: 600, color: C.amber, fontSize: 19 }}>{lens}</div>
                <div style={{ fontSize: 22, marginTop: 10, lineHeight: 1.35 }}>HMW {q.charAt(0).toLowerCase() + q.slice(1)}?</div>
                <div style={{ position: "absolute", bottom: 16, left: 22, display: "flex", gap: 6 }}>
                  {Array.from({ length: votes }).map((_, j) => (
                    <div key={j} style={{ width: 16, height: 16, borderRadius: "50%", background: C.red, opacity: prog(t, 5 + i * 0.3 + j * 0.12, 0.2), transform: `translateY(${(1 - prog(t, 5 + i * 0.3 + j * 0.12, 0.3)) * -30}px)` }} />
                  ))}
                </div>
              </Card>
            </F>
          );
        })}
      </>
    ),
  },
  {
    title: "Problem statements",
    dur: 12,
    caption:
      "Our two final problem statements name a specific user, the situation, the obstacle and the consequence, and they deliberately avoid naming any solution such as a ‘new app’ or ‘better ERP’.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 50 }}>
          <Kicker>Final problem statements</Kicker>
        </F>
        <F t={t} at={0.6} style={{ left: 90, top: 110, width: 1100 }}>
          <Card color={C.blue}>
            <Pill color={C.blue} style={{ fontSize: 17 }}>PS-1 · Certainty before travel</Pill>
            <div style={{ fontSize: 24, marginTop: 12, lineHeight: 1.45, minHeight: 110 }}>
              <Type t={t} at={1} cps={70} text="First year students travelling from other states cannot confirm before leaving home that their documents, uploads and fee payment are complete and accepted, because requirements change late and the ERP shows no clear accepted status." />
            </div>
          </Card>
        </F>
        <F t={t} at={5} style={{ left: 90, top: 380, width: 1100 }}>
          <Card color={C.teal}>
            <Pill color={C.teal} style={{ fontSize: 17 }}>PS-2 · From gate to a ready room</Pill>
            <div style={{ fontSize: 24, marginTop: 12, lineHeight: 1.45, minHeight: 110 }}>
              <Type t={t} at={5.4} cps={70} text="First year students on reporting day do not know which desk is next, how long they will wait, or whether their room is usable, so they depend on WhatsApp groups and crowded queues." />
            </div>
          </Card>
        </F>
      </>
    ),
  },
  {
    title: "Hypotheses",
    dur: 12,
    caption:
      "A hypothesis turns an idea into a test that can fail. Each of our five uses the brief’s formula and has a pass metric and a failure condition. We test the riskiest one first: can the checklist be frozen early?",
    render: (t) => {
      const parts: [string, string, string][] = [
        ["If we", "publish one dated, version-controlled checklist with samples", C.blue],
        ["for", "incoming first years", C.green],
        ["then", "fewer will arrive missing a document", C.amber],
        ["because", "they can check every item before travel", "#fff"],
        ["we’ll know when", "exceptions fall ≥50% and ≥85% pass a comprehension test", C.teal],
      ];
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 50 }}>
            <Kicker>Hypothesis H1 · tested first</Kicker>
          </F>
          {parts.map(([k, v, c], i) => (
            <F key={k} t={t} at={0.8 + i * 1.1} x={-40} y={0} style={{ left: 90, top: 110 + i * 92, width: 1100 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 200, textAlign: "right", fontWeight: 600, fontSize: 24, color: C.soft }}>{k}</div>
                <div style={{ flex: 1, border: `2px dashed ${c}`, borderRadius: 12, padding: "14px 18px", fontSize: 24, fontWeight: 600, color: c }}>{v}</div>
              </div>
            </F>
          ))}
          <F t={t} at={7} style={{ left: 310, top: 590 }}>
            <Pill color={C.red} style={{ fontSize: 20 }}>Falsified if comprehension &lt; 70% or exceptions fall &lt; 25%</Pill>
          </F>
        </>
      );
    },
  },
  {
    title: "Point of view",
    dur: 11,
    caption:
      "Our master point of view combines user, need and insight. It became the compass for ideation: every idea must give students proof that they are on the right path.",
    render: (t) => {
      const join = prog(t, 4, 1.2);
      const blocks: [string, string, string][] = [
        ["USER", "A first year student arriving with family", C.green],
        ["NEED", "reassurance at every step that they are on the right path", C.blue],
        ["INSIGHT", "they rarely lack effort; they run out of confidence, and borrow it from others", C.amber],
      ];
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
            <Kicker>Master POV = User + Need + Insight</Kicker>
          </F>
          {blocks.map(([h, txt, c], i) => (
            <div key={h} style={{ position: "absolute", left: lerp(90 + i * 375, 140, join), top: lerp(200, 170 + i * 120, join), width: lerp(350, 1000, join), opacity: prog(t, 0.6 + i * 0.6, 0.5) }}>
              <div style={{ background: `${c}22`, border: `2px solid ${c}`, borderRadius: 14, padding: "16px 20px" }}>
                <div style={{ fontWeight: 600, color: c, fontSize: 17, letterSpacing: ".1em" }}>{h}</div>
                <div style={{ fontSize: 25, fontWeight: 600, marginTop: 6 }}>{txt}</div>
              </div>
            </div>
          ))}
          <F t={t} at={6.5} style={{ left: 140, top: 560, width: 1000 }}>
            <div style={{ fontSize: 24, color: C.soft }}>Plus one POV, mad-lib and journey map for each of the four personas.</div>
          </F>
        </>
      );
    },
  },
];

export default function DefineVideo() {
  return <MotionVideo id="video-define" label="Assignment 2" title="Define: how we framed the problem" scenes={scenes} accent={C.blue} />;
}
