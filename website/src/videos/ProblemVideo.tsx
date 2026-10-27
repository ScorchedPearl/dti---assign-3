"use client";

import { Face, Ico } from "@/components/icons";
import MotionVideo, { type Scene } from "@/components/MotionVideo";
import { clamp, lerp, prog } from "@/lib/anim";
import { Big, C, Card, Count, DrawPath, F, Kicker, Person, Pill, smooth } from "./kit";

const STAGES = ["Prepare at home", "Upload & confirm", "Arrive on campus", "Verify & enroll", "Hostel & mess", "Settle in"];
const SX = (i: number) => 120 + i * 208;

const PAINS = [
  { i: 0, label: "Document not in advisory", code: "DOC ≈14", y: -1 },
  { i: 1, label: "ERP crashes, status unclear", code: "ERP ≈15", y: -1 },
  { i: 2, label: "No line, tokens ran out", code: "QUE ≈9", y: -1 },
  { i: 3, label: "Which desk is next?", code: "NAV ≈8", y: -1 },
  { i: 4, label: "Dirty room, broken lock", code: "HOST ≈12", y: -2 },
];
const EMO = [1, -1, 0, -2, -2, 0];

export const scenes: Scene[] = [
  {
    title: "Registration day",
    dur: 9,
    caption:
      "Every year, first year BTech students travel to IIITA with a folder of documents and a family member beside them. Registration is their first real experience of the institute.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 120 }}>
          <Kicker>Group 10 · Design Thinking</Kicker>
        </F>
        <F t={t} at={0.6} style={{ left: 90, top: 170, width: 760 }}>
          <Big size={78}>
            Registration day
            <br />
            at <span style={{ color: C.teal }}>IIITA</span>
          </Big>
        </F>
        <F t={t} at={1.6} style={{ left: 90, top: 380, width: 640 }}>
          <div style={{ fontSize: 28, color: C.soft, lineHeight: 1.4 }}>
            A first year student, a folder of documents, a parent with a return ticket, and one long day.
          </div>
        </F>
        {[
          { e: "🚆", x: 860, y: 150, a: 2.4 },
          { e: "📁", x: 1040, y: 230, a: 3.0 },
          { e: "👨‍👩‍👧", x: 880, y: 380, a: 3.6 },
          { e: "🏫", x: 1060, y: 460, a: 4.2 },
        ].map((o) => (
          <F key={o.e} t={t} at={o.a} s={0.4} y={0} style={{ left: o.x, top: o.y + Math.sin(t * 1.4 + o.x) * 8 }}>
            <div style={{ width: 150, height: 150, borderRadius: 40, background: "linear-gradient(160deg, rgba(255,255,255,.14), rgba(255,255,255,.04))", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 24px 50px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ico e={o.e} size={70} strokeWidth={1.3} color="#fff" /></div>
          </F>
        ))}
      </>
    ),
  },
  {
    title: "The journey",
    dur: 11,
    caption:
      "From our Empathize research, registration is one continuous journey with six stages: preparing at home, uploading online, arriving, verification, the hostel, and settling in.",
    render: (t) => {
      const move = prog(t, 3.5, 6, (x) => x);
      const sx = lerp(SX(0), SX(5), move);
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 70 }}>
            <Kicker>What students go through</Kicker>
            <Big size={52} style={{ marginTop: 8 }}>One journey, six stages</Big>
          </F>
          <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
            <DrawPath t={t} at={0.8} d={2} dPath={`M${SX(0)},400 L${SX(5)},400`} color="rgba(255,255,255,.25)" width={8} />
          </svg>
          {STAGES.map((s, i) => (
            <F key={s} t={t} at={1 + i * 0.35} s={0.5} y={0} style={{ left: SX(i) - 70, top: 340, width: 140, textAlign: "center" }}>
              <div style={{ width: 120, height: 120, margin: "0 auto", borderRadius: "50%", background: move * 5 >= i - 0.01 ? C.teal : "#1f3a5e", border: "4px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, transition: "background .3s" }}>
                <Ico e={["🏠", "💻", "🚪", "🧾", "🛏️", "🤝"][i]} size={50} strokeWidth={1.5} color="#fff" />
              </div>
              <div style={{ marginTop: 14, fontSize: 21, fontWeight: 600 }}>{s}</div>
            </F>
          ))}
          <div style={{ position: "absolute", left: sx - 16, top: 250, opacity: prog(t, 3.2, 0.4) }}>
            <Person color={C.amber} size={32} />
          </div>
        </>
      );
    },
  },
  {
    title: "Where it breaks",
    dur: 13,
    caption:
      "Almost every stage had a breakdown: late document requirements, ERP crashes, crowded queues, not knowing the next desk, and hostel rooms that were not ready. The emotion line dips twice.",
    render: (t) => {
      const pts = EMO.map((e, i) => [SX(i), 520 - e * 38] as [number, number]);
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
            <Kicker color={C.red}>Pain points (coded from 30 students)</Kicker>
            <Big size={50} style={{ marginTop: 8 }}>Where the journey breaks</Big>
          </F>
          {STAGES.map((s, i) => (
            <div key={s} style={{ position: "absolute", left: SX(i) - 80, top: 640, width: 160, textAlign: "center", fontSize: 18, color: C.soft }}>{s}</div>
          ))}
          <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
            <line x1={80} x2={1200} y1={520} y2={520} stroke="rgba(255,255,255,.2)" strokeDasharray="6 6" />
            <DrawPath t={t} at={1} d={3} dPath={smooth(pts)} color={C.amber} width={6} />
          </svg>
          {pts.map(([x, y], i) => (
            <F key={i} t={t} at={1.3 + i * 0.45} s={0.3} y={0} style={{ left: x - 24, top: y - 26 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><Face v={EMO[i]} size={32} /></div>
            </F>
          ))}
          {PAINS.map((p, k) => (
            <F key={p.label} t={t} at={4.2 + k * 1.3} y={-30} style={{ left: SX(p.i) - 105, top: k % 2 ? 300 : 190, width: 210 }}>
              <div style={{ background: "rgba(239,107,91,.16)", border: `2px solid ${C.red}`, borderRadius: 14, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{p.label}</div>
                <div style={{ marginTop: 6 }}><Pill color={C.red} style={{ fontSize: 15, padding: "3px 10px" }}>{p.code}</Pill></div>
              </div>
              <div style={{ width: 2, height: k % 2 ? 150 : 260, background: `linear-gradient(${C.red}, transparent)`, margin: "0 auto" }} />
            </F>
          ))}
        </>
      );
    },
  },
  {
    title: "The surprising pattern",
    dur: 10,
    caption:
      "The strongest signal: at least 16 of the 30 students relied on seniors' WhatsApp groups or friends instead of official help, because they answered faster and in plain language.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 80, width: 520 }}>
          <Kicker>We heard from 30 students</Kicker>
          <Big size={56} style={{ marginTop: 10 }}>
            <span style={{ color: C.green }}>
              <Count t={t} at={3} to={16} />+
            </span>{" "}
            of 30 asked seniors, not the system
          </Big>
          <div style={{ marginTop: 22, fontSize: 24, color: C.soft, lineHeight: 1.45, opacity: prog(t, 5, 0.8) }}>
            “Seniors personally guide us.” Official help existed, but it felt slower and less certain.
          </div>
        </F>
        <div style={{ position: "absolute", left: 700, top: 120, display: "grid", gridTemplateColumns: "repeat(6, 80px)", gap: 14 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const on = i < 16 && t > 3 + i * 0.1;
            return (
              <div key={i} style={{ opacity: prog(t, 0.6 + i * 0.04, 0.4), transform: `scale(${on ? 1.12 : 1})`, transition: "transform .3s", display: "flex", justifyContent: "center" }}>
                <Person color={on ? C.green : "rgba(255,255,255,.35)"} size={44} />
              </div>
            );
          })}
        </div>
        <F t={t} at={6.5} style={{ left: 700, top: 580 }}>
          <div style={{ display: "flex", gap: 22, fontSize: 20 }}>
            <span><span style={{ color: C.green }}>●</span> relied on seniors / peers</span>
            <span><span style={{ color: "rgba(255,255,255,.4)" }}>●</span> others</span>
          </div>
        </F>
      </>
    ),
  },
  {
    title: "The insight",
    dur: 10,
    caption:
      "Our defining insight: students rarely fail registration through lack of effort. What runs out is confidence. When official channels give no proof that they are on track, they borrow it from others.",
    render: (t) => {
      const k = prog(t, 4.5, 1);
      return (
        <>
          <F t={t} at={0.3} style={{ left: 0, width: 1280, top: 150, textAlign: "center" }}>
            <Kicker>Defining insight</Kicker>
          </F>
          <F t={t} at={0.8} style={{ left: 140, width: 1000, top: 210, textAlign: "center" }}>
            <Big size={60}>
              Students don’t run out of <span style={{ textDecoration: t > 2.6 ? "line-through" : "none", color: t > 2.6 ? "rgba(255,255,255,.4)" : "#fff" }}>effort</span>.
            </Big>
          </F>
          <F t={t} at={2.8} style={{ left: 140, width: 1000, top: 300, textAlign: "center" }}>
            <Big size={60}>
              They run out of <span style={{ color: C.amber }}>confidence</span>.
            </Big>
          </F>
          <div style={{ position: "absolute", left: 0, width: 1280, top: 450, display: "flex", justifyContent: "center", gap: 26, opacity: k }}>
            {[["🧑‍🎓", "seniors"], ["💂", "guards"], ["💬", "WhatsApp"], ["🧍", "strangers"]].map(([ic, x], i) => (
              <div key={x} style={{ transform: `translateY(${(1 - prog(t, 4.6 + i * 0.25, 0.5)) * 30}px)` }}>
                <Pill color="rgba(255,255,255,.12)" dark style={{ fontSize: 24, padding: "10px 20px", border: "1px solid rgba(255,255,255,.2)", display: "inline-flex", alignItems: "center", gap: 10 }}><Ico e={ic} size={24} />{x}</Pill>
              </div>
            ))}
          </div>
          <F t={t} at={6.2} style={{ left: 0, width: 1280, top: 540, textAlign: "center" }}>
            <div style={{ fontSize: 26, color: C.soft }}>…so they borrow confidence from whoever answers fastest.</div>
          </F>
        </>
      );
    },
  },
  {
    title: "Two problems to solve",
    dur: 11,
    caption:
      "That gives us two problem statements: PS-1, certainty before travel, and PS-2, guidance from the campus gate to a ready hostel room. The rest of this site shows how we defined and ideated on them.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 70 }}>
          <Kicker>So we defined two problems</Kicker>
        </F>
        <F t={t} at={0.8} x={-60} y={0} style={{ left: 90, top: 140, width: 520 }}>
          <Card color={C.blue} style={{ minHeight: 330 }}>
            <Pill color={C.blue}>PS-1 · Before travel</Pill>
            <div style={{ fontSize: 27, lineHeight: 1.4, marginTop: 18, fontWeight: 600 }}>
              Students can’t confirm before leaving home that their documents, uploads and fees are{" "}
              <span style={{ color: C.blue }}>complete and accepted</span>.
            </div>
          </Card>
        </F>
        <F t={t} at={2} x={60} y={0} style={{ left: 670, top: 140, width: 520 }}>
          <Card color={C.teal} style={{ minHeight: 330 }}>
            <Pill color={C.teal}>PS-2 · On campus</Pill>
            <div style={{ fontSize: 27, lineHeight: 1.4, marginTop: 18, fontWeight: 600 }}>
              Students don’t know the next desk, the wait, or whether their room is <span style={{ color: C.teal }}>ready to live in</span>.
            </div>
          </Card>
        </F>
        <F t={t} at={5} style={{ left: 90, top: 520, width: 1100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26 }}>
            <span style={{ color: C.soft }}>Our answer →</span>
            <Pill color={C.blue} style={{ fontSize: 24 }}>ReadyPass</Pill>
            <span style={{ color: C.soft }}>+</span>
            <Pill color={C.teal} style={{ fontSize: 24 }}>Gate-to-Room Pass</Pill>
          </div>
        </F>
        <F t={t} at={6.5} style={{ left: 90, top: 600 }}>
          <div style={{ fontSize: 20, color: C.soft, opacity: clamp(1) }}>Scroll down: Empathize → Define → Ideate → Solution</div>
        </F>
      </>
    ),
  },
];

export default function ProblemVideo() {
  return <MotionVideo id="video-problem" label="Start here" title="The problem in 60 seconds" scenes={scenes} accent={C.amber} />;
}
