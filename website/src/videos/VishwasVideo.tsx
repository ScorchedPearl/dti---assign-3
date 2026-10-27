"use client";

import MotionVideo, { type Scene } from "@/components/MotionVideo";
import { lerp, prog } from "@/lib/anim";
import { Big, C, Card, DrawPath, F, Kicker, Person, Phone, Pill, Type, smooth } from "./kit";

const GREEN = "#B7EB8F";

/* ---------------------------------------------------------------- A2 data */
const PH = [
  { n: "Read advisory", e: 1, f: "🙂", pain: "No version date, no samples", opp: "Dated checklist + samples (H1)" },
  { n: "Arrange documents", e: -1, f: "😟", pain: "Notary rules unclear, advice conflicts", opp: "Tag each item: self-attested, notarised, original" },
  { n: "Upload and pay", e: 0, f: "😐", pain: "No “accepted” status; fee shows pending", opp: "Per-document status + receipt (H2)" },
  { n: "Travel and arrive", e: 1, f: "😊", pain: "No reporting slot; crowd already there", opp: "Pre-assigned reporting slots" },
  { n: "Verification desk", e: -2, f: "😣", pain: "Unlisted undertaking asked for", opp: "Nothing outside the checklist on the day (H03)" },
  { n: "Enrolled; father leaves", e: 0, f: "😐", pain: "Extra hotel night, ticket changed", opp: "Publish expected reporting-day length" },
];
const EMO_C: Record<number, string> = { 1: C.green, 0: C.amber, [-1]: "#f08a5b", [-2]: C.red };

/* ---------------------------------------------------------------- A3 data */
// Mind map layout: branch nodes sit either side of the centre, leaves in outer columns so no connector crosses a box.
const MM: { name: string; icon: string; color: string; bx: number; by: number; side: 1 | -1; ys: number[]; nodes: string[] }[] = [
  { name: "Verified Checklist", icon: "📋", color: C.blue, bx: 500, by: 200, side: -1, ys: [125, 200, 275], nodes: ["Annotated sample per document", "Dated, versioned checklist", "Change alerts by SMS and email"] },
  { name: "Upload Confidence", icon: "☁️", color: "#e0735f", bx: 780, by: 200, side: 1, ys: [125, 200, 275], nodes: ["Size and format check before upload", "Autosave and resume", "Staggered upload windows"] },
  { name: "Unexpected Resources", icon: "🔗", color: C.amber, bx: 500, by: 545, side: -1, ys: [470, 545, 620], nodes: ["One-page summary for parents", "Senior volunteers on the official FAQ", "DigiLocker and JoSAA verified documents"] },
  { name: "Status & Proof", icon: "✅", color: C.teal, bx: 780, by: 545, side: 1, ys: [470, 545, 620], nodes: ["Ready to Report pass with QR", "Fee confirmed in under 15 min", "Per-document status lights"] },
];
const CX = 640, CY = 372, LW = 250, BW = 170, BH = 66;
const leafX = (side: 1 | -1) => (side === -1 ? 50 : 980);
const MMLINKS: { d: string; label: string; lx: number; ly: number; anchor: "middle" | "start" }[] = [
  { d: "M175,97 V80 H1105 V97", label: "prevent rejections", lx: 640, ly: 70, anchor: "middle" },
  { d: "M175,303 V442", label: "family plans travel", lx: 192, ly: 378, anchor: "start" },
  { d: "M175,648 V676 H1105 V648", label: "auto-accepted items", lx: 640, ly: 668, anchor: "middle" },
];

const BOARD: { h: string; icon: string; c: string; s: [string, string, string?][] }[] = [
  { h: "Know exactly what to bring", icon: "📋", c: C.blue, s: [
    ["VS", "Personalised checklist from category, state and quota", "Saumya: each item expands to a photo of a correct sample"],
    ["AP", "Advisory frozen 10 days before, with a version number"],
    ["SR", "Alert whenever any rule changes (SMS, email, WhatsApp)"],
    ["KM", "“Notary needed?” tag on every document"],
    ["SD", "One-page parent summary in Hindi and English"],
    ["ST", "Seniors film a mock verification-desk walkthrough"]] },
  { h: "Upload once, confidently", icon: "☁️", c: "#e0735f", s: [
    ["VR", "Autosave; resume from the exact failed step"],
    ["SS", "Pre-upload checker for size, format and blur"],
    ["SD", "Staggered upload windows by roll number"],
    ["AP", "Pull documents from DigiLocker or JoSAA"],
    ["ST", "Fee status auto-updates within 15 minutes"],
    ["SR", "“Ready to Report” pass with QR, like web check-in"]] },
  { h: "Help that answers fast", icon: "💬", c: C.purple, s: [
    ["KM", "Official WhatsApp FAQ bot, latest advisory only", "Me: anything it cannot answer goes to a senior within 10 min"],
    ["VR", "Bookable video-call document check"],
    ["SS", "Help ticket with screenshot; one owner"],
    ["ST", "Certified senior helpers with an official badge"],
    ["SD", "Public change-log: what changed and why"]] },
];

/* a coloured status light that changes over time */
const light = (t: number, steps: [number, string][]) => {
  let c = "#5d6b82";
  for (const [at, col] of steps) if (t >= at) c = col;
  return c;
};

const bez = (p: [number, number][], k: number): [number, number] => {
  const u = 1 - k;
  const f = (i: 0 | 1) => u ** 3 * p[0][i] + 3 * u * u * k * p[1][i] + 3 * u * k * k * p[2][i] + k ** 3 * p[3][i];
  return [f(0), f(1)];
};

export const scenes: Scene[] = [
  /* 1 ------------------------------------------------------------ intro */
  {
    title: "My part",
    dur: 9,
    caption:
      "I am Vishwas. My work runs as one thread across two assignments. In Assignment 2 I owned persona Ananya Verma: her point of view and her journey map. In Assignment 3 I took that pain into PS-1: a mind map, brainstorm stickies and the merged team map.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 70, width: 1100 }}>
          <Kicker color={GREEN}>Vishwas · IIT2024087 · Group 10</Kicker>
          <Big size={60} style={{ marginTop: 10 }}>One student’s story → one PS-1 idea</Big>
        </F>
        <F t={t} at={1.6} x={-40} y={0} style={{ left: 90, top: 290, width: 480 }}>
          <Card color={C.blue} style={{ height: 250 }}>
            <Kicker color={C.blue}>Assignment 2 · Define</Kicker>
            <div style={{ fontSize: 27, fontWeight: 600, marginTop: 10 }}>Persona: Ananya Verma</div>
            {["Persona and need", "Point of view + HMW", "6-phase journey map"].map((x, i) => (
              <F key={x} t={t} at={2.6 + i * 0.5} y={10} style={{ position: "relative", marginTop: 12, fontSize: 23, color: C.soft }}>• {x}</F>
            ))}
          </Card>
        </F>
        <F t={t} at={3.4} style={{ left: 590, top: 380, width: 100 }}>
          <svg width={100} height={40}><path d="M5,20 H80 M64,6 L82,20 L64,34" fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </F>
        <F t={t} at={4} x={40} y={0} style={{ left: 710, top: 290, width: 480 }}>
          <Card color={C.purple} style={{ height: 250 }}>
            <Kicker color={C.purple}>Assignment 3 · Ideate</Kicker>
            <div style={{ fontSize: 27, fontWeight: 600, marginTop: 10 }}>PS-1 · Certainty before travel</div>
            {["ERP / upload mind map", "Brainstorm stickies", "Merged team map"].map((x, i) => (
              <F key={x} t={t} at={5 + i * 0.5} y={10} style={{ position: "relative", marginTop: 12, fontSize: 23, color: C.soft }}>• {x}</F>
            ))}
          </Card>
        </F>
        <F t={t} at={7} style={{ left: 90, top: 600, width: 1100 }}>
          <div style={{ fontSize: 26, color: C.soft }}>Thread: <b style={{ color: "#fff" }}>Ananya’s pain</b> → <b style={{ color: "#fff" }}>PS-1</b> → <b style={{ color: GREEN }}>ReadyPass</b></div>
        </F>
      </>
    ),
  },

  /* 2 ------------------------------------------------------ meet Ananya */
  {
    title: "A2 · Meet Ananya",
    dur: 12,
    caption:
      "Ananya Verma is 18, from Patna. She reads every advisory, keeps a printed folder and uploads early. She travels about 600 km by train with her father, and the return ticket is already booked two days later. What she wants is certainty before she departs.",
    render: (t) => {
      const route: [number, number][] = [[775, 330], [880, 380], [1000, 140], [1170, 230]];
      const k = prog(t, 3.2, 4.2);
      const [tx, ty] = bez(route, k);
      const pulse = 0.5 + 0.5 * Math.sin(t * 5);
      return (
        <>
          <F t={t} at={0.2} style={{ left: 70, top: 40, width: 600 }}><Kicker color={C.blue}>Assignment 2 · Persona</Kicker></F>
          <F t={t} at={0.4} s={0.9} style={{ left: 70, top: 100, width: 520 }}>
            <Card color={C.blue} style={{ height: 380 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ width: 92, height: 92, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}><Person size={46} /></div>
                <div>
                  <Big size={40}>Ananya Verma</Big>
                  <Pill color={C.blue} dark style={{ fontSize: 17, marginTop: 8 }}>The Prepared Planner</Pill>
                </div>
              </div>
              {[["🎓", "18 · from Patna, Bihar"], ["📁", "Reads every advisory, keeps a printed folder, uploads early"], ["📱", "Android phone; checks email and the ERP every evening"]].map(([i, x], n) => (
                <F key={x} t={t} at={1.4 + n * 0.7} x={-20} y={0} style={{ position: "relative", marginTop: 18, fontSize: 22, color: C.soft, display: "flex", gap: 12 }}>
                  <span>{i}</span><span>{x}</span>
                </F>
              ))}
            </Card>
          </F>

          <svg style={{ position: "absolute", left: 0, top: 0 }} width={1280} height={720}>
            <DrawPath t={t} at={3.2} d={4.2} color={C.teal} width={5} dPath={`M${route[0]} C${route[1]} ${route[2]} ${route[3]}`} dash="4 14" />
          </svg>
          <F t={t} at={2.6} style={{ left: 660, top: 340, width: 140 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}><Person size={26} color={C.blue} /><Person size={32} color="#9db7d8" /></div>
            <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>Patna</div>
            <div style={{ color: C.soft, fontSize: 16 }}>with her father</div>
          </F>
          <F t={t} at={3} style={{ left: 1110, top: 282, width: 150 }}>
            <div style={{ fontSize: 34 }}>🏫</div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>IIITA campus</div>
          </F>
          <div style={{ position: "absolute", left: tx - 18, top: ty - 20, fontSize: 36, opacity: prog(t, 3, 0.4) }}>🚆</div>
          <F t={t} at={5} style={{ left: 840, top: 395, width: 300 }}>
            <div style={{ color: C.soft, fontSize: 20 }}>about <b style={{ color: "#fff" }}>600 km</b> by train</div>
          </F>
          <F t={t} at={6.2} s={0.9} style={{ left: 700, top: 450, width: 500 }}>
            <div style={{ border: `2px solid rgba(239,107,91,${0.45 + 0.5 * pulse})`, background: "rgba(239,107,91,.12)", borderRadius: 16, padding: "12px 20px", fontSize: 23, fontWeight: 600, whiteSpace: "nowrap" }}>
              🎟️ Return train booked: <span style={{ color: C.red }}>2 days later</span>
            </div>
          </F>
          <F t={t} at={7.4} style={{ left: 70, top: 565, width: 1140 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontStyle: "italic", color: "#fff" }}>
              <Type t={t} at={7.6} cps={34} text="“Tell me the complete requirement before I start travelling.”" />
            </div>
          </F>
          <F t={t} at={10} style={{ left: 70, top: 640, width: 800 }}>
            <Pill color={GREEN}>Her need: certainty before departure</Pill>
          </F>
        </>
      );
    },
  },

  /* 3 ------------------------------------------------------------ POV */
  {
    title: "A2 · Point of view",
    dur: 13,
    caption:
      "Ananya’s point of view: she needs to be certain, before boarding the train, that her document file is complete. The insight is that one late document does not just add a task. It collides with a fixed return ticket and a parent’s leave. That gives my How Might We.",
    render: (t) => {
      const blocks: [string, string, string][] = [
        ["USER", "Ananya Verma, a prepared planner from Patna with a fixed return ticket", C.blue],
        ["NEEDS", "to be certain before boarding the train that the document file is complete", C.teal],
        ["BECAUSE (INSIGHT)", "a single late document collides with a fixed return ticket and a parent’s leave from work", C.amber],
      ];
      return (
        <>
          <F t={t} at={0.2} style={{ left: 70, top: 40, width: 900 }}><Kicker color={C.blue}>Assignment 2 · Point of view (mad-lib)</Kicker></F>
          {blocks.map(([h, txt, c], i) => (
            <F key={h} t={t} at={0.9 + i * 1.8} x={-40} y={0} style={{ left: 70, top: 100 + i * 165, width: 720 }}>
              <div style={{ background: `${c}22`, border: `2px solid ${c}`, borderRadius: 16, padding: "16px 22px", height: 140 }}>
                <div style={{ color: c, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>{h}</div>
                <div style={{ fontSize: 26, fontWeight: 600, marginTop: 8, lineHeight: 1.3 }}>{txt}</div>
              </div>
              {i < 2 && prog(t, 1.9 + i * 1.8, 0.4) > 0 && <div style={{ position: "absolute", left: 340, bottom: -26, fontSize: 24, color: C.soft }}>↓</div>}
            </F>
          ))}
          <F t={t} at={6.4} x={40} y={0} style={{ left: 850, top: 100, width: 360 }}>
            <Card color={C.green} style={{ height: 175 }}>
              <div style={{ color: C.green, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>SUCCESS LOOKS LIKE</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>A final, trustworthy document list</div>
              <F t={t} at={7.6} y={6} style={{ position: "relative", marginTop: 8, fontSize: 18, color: C.soft }}>one surprise affidavit does not break a family trip</F>
            </Card>
          </F>
          <F t={t} at={9} s={0.92} style={{ left: 850, top: 305, width: 360 }}>
            <div style={{ background: "rgba(242,180,65,.16)", border: `2.5px solid ${C.amber}`, borderRadius: 18, padding: "20px 24px", height: 250 }}>
              <div style={{ color: C.amber, fontWeight: 700, fontSize: 17, letterSpacing: ".1em" }}>HOW MIGHT WE</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30, lineHeight: 1.25, marginTop: 10 }}>make the checklist so <b>trustworthy</b> that families plan travel around it?</div>
            </div>
          </F>
        </>
      );
    },
  },

  /* 4 ------------------------------------------------------- journey map */
  {
    title: "A2 · Journey map",
    dur: 19,
    caption:
      "Then I mapped her whole journey in six phases. Her mood stays hopeful through reading, dips while arranging documents, and crashes at the verification desk, where staff ask for an undertaking that was never in the advisory. Every pain point has an opportunity attached, and that desk is the valley that drives PS-1.",
    render: (t) => {
      const T = (i: number) => 1.2 + i * 2.3;
      const cx = (i: number) => 60 + i * 195 + 92;
      const cy = (e: number) => 285 - e * 55;
      const pts = PH.map((p, i): [number, number] => [cx(i), cy(p.e)]);
      return (
        <>
          <F t={t} at={0.1} style={{ left: 60, top: 22, width: 900 }}><Kicker color={C.blue}>Assignment 2 · Ananya’s journey map</Kicker></F>
          <div style={{ position: "absolute", left: 60, right: 60, top: 285, borderTop: "1px dashed rgba(255,255,255,.25)", opacity: prog(t, 0.5, 0.5) }} />
          <div style={{ position: "absolute", left: 60, top: 262, fontSize: 14, color: C.soft, opacity: prog(t, 0.5, 0.5) }}>neutral</div>
          {/* valley glow */}
          <div style={{ position: "absolute", left: 60 + 4 * 195, top: 88, width: 185, height: 590, borderRadius: 16, background: "rgba(239,107,91,.13)", border: "1.5px solid rgba(239,107,91,.5)", opacity: prog(t, T(4), 0.6) }} />
          <svg style={{ position: "absolute", left: 0, top: 0 }} width={1280} height={720}>
            {pts.slice(1).map((p, i) => (
              <DrawPath key={i} t={t} at={T(i + 1) - 1} d={1} color="#cfe3ff" width={5} dPath={smooth([pts[i], p])} />
            ))}
          </svg>
          {PH.map((p, i) => {
            const k = prog(t, T(i), 0.6);
            return (
              <div key={p.n}>
                <div style={{ position: "absolute", left: 60 + i * 195, top: 92, width: 185, opacity: k, textAlign: "center" }}>
                  <div style={{ display: "inline-flex", width: 30, height: 30, borderRadius: "50%", background: i === 4 ? C.red : C.blue, alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>{i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: 19, marginTop: 6, lineHeight: 1.2 }}>{p.n}</div>
                </div>
                <div style={{ position: "absolute", left: cx(i) - 24, top: cy(p.e) - 24 + (1 - k) * 20, width: 48, height: 48, borderRadius: "50%", background: EMO_C[p.e], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, opacity: k, boxShadow: "0 6px 18px rgba(0,0,0,.4)", transform: `scale(${0.6 + 0.4 * k})` }}>{p.f}</div>
                <div style={{ position: "absolute", left: 60 + i * 195, top: 440, width: 185, opacity: prog(t, T(i) + 0.5, 0.6), transform: `translateY(${(1 - prog(t, T(i) + 0.5, 0.6)) * 14}px)` }}>
                  <div style={{ background: "rgba(239,107,91,.14)", border: "1.5px solid rgba(239,107,91,.55)", borderRadius: 12, padding: "9px 12px", height: 108 }}>
                    <div style={{ color: C.red, fontWeight: 700, fontSize: 13, letterSpacing: ".1em" }}>PAIN</div>
                    <div style={{ fontSize: 16, lineHeight: 1.25, marginTop: 3 }}>{p.pain}</div>
                  </div>
                </div>
                <div style={{ position: "absolute", left: 60 + i * 195, top: 556, width: 185, opacity: prog(t, T(i) + 1.1, 0.6), transform: `translateY(${(1 - prog(t, T(i) + 1.1, 0.6)) * 14}px)` }}>
                  <div style={{ background: "rgba(47,184,166,.15)", border: "1.5px solid rgba(47,184,166,.6)", borderRadius: 12, padding: "9px 12px", height: 108 }}>
                    <div style={{ color: C.teal, fontWeight: 700, fontSize: 13, letterSpacing: ".1em" }}>OPPORTUNITY</div>
                    <div style={{ fontSize: 16, lineHeight: 1.25, marginTop: 3 }}>{p.opp}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <F t={t} at={T(4) + 0.7} y={8} style={{ left: 60 + 4 * 195, top: 410, width: 185 }}>
            <div style={{ textAlign: "center", color: C.red, fontWeight: 700, fontSize: 15 }}>▲ moment of truth</div>
          </F>
          <F t={t} at={T(5) + 2.2} style={{ left: 60, top: 678, width: 1160 }}>
            <div style={{ textAlign: "center", fontSize: 21, color: C.soft }}>Valley at phase 5 → the priority we carried into <b style={{ color: "#fff" }}>PS-1</b></div>
          </F>
        </>
      );
    },
  },

  /* 5 ------------------------------------------------------------ bridge */
  {
    title: "Bridge to PS-1",
    dur: 10,
    caption:
      "Ananya’s valley, together with Kabir’s upload failures, became problem statement PS-1: certainty before travel. It traces back to our document and ERP evidence, to user stories 1 to 12 and 20, and to hypotheses H1 and H2. This is the question my Assignment 3 work answers.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 60, width: 1100 }}>
          <Kicker color={C.purple}>From Define to Ideate</Kicker>
        </F>
        <F t={t} at={0.6} x={-40} y={0} style={{ left: 90, top: 140, width: 330 }}>
          <Card color={C.blue} style={{ height: 150 }}>
            <b style={{ color: C.blue }}>Ananya, phase 5</b>
            <div style={{ fontSize: 21, marginTop: 8 }}>Unlisted document at the desk</div>
          </Card>
        </F>
        <F t={t} at={1.4} x={-40} y={0} style={{ left: 90, top: 320, width: 330 }}>
          <Card color={C.red} style={{ height: 150 }}>
            <b style={{ color: C.red }}>Kabir, upload</b>
            <div style={{ fontSize: 21, marginTop: 8 }}>File rejected, no reason given</div>
          </Card>
        </F>
        <F t={t} at={2.4} style={{ left: 440, top: 270, width: 120 }}>
          <svg width={120} height={60}><path d="M5,30 H95 M78,14 L98,30 L78,46" fill="none" stroke={C.amber} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </F>
        <F t={t} at={3} s={0.94} style={{ left: 590, top: 140, width: 600 }}>
          <div style={{ background: "rgba(76,155,232,.16)", border: `2.5px solid ${C.blue}`, borderRadius: 20, padding: "22px 28px" }}>
            <Pill color={C.blue} dark style={{ fontSize: 17 }}>PS-1 · Certainty before travel</Pill>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.25, marginTop: 14 }}>
              How might we help first year students <b>prove, before they leave home,</b> that their registration is complete and accepted?
            </div>
          </div>
        </F>
        <F t={t} at={5.4} style={{ left: 590, top: 420, width: 620 }}>
          <div style={{ color: C.soft, fontSize: 18, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600 }}>Traces back to</div>
        </F>
        {["DOC · ERP · NET · TIME", "US-01 to US-12, US-20", "H1 · H2", "Ananya · Kabir"].map((x, i) => (
          <F key={x} t={t} at={5.9 + i * 0.5} y={12} style={{ left: 590 + (i % 2) * 310, top: 465 + Math.floor(i / 2) * 64, width: 300 }}>
            <Pill color="rgba(255,255,255,.14)" dark style={{ color: "#fff", border: `1px solid ${C.line}` }}>{x}</Pill>
          </F>
        ))}
      </>
    ),
  },

  /* 6 ------------------------------------------------------- mind map */
  {
    title: "A3 · PS-1 mind map",
    dur: 17,
    caption:
      "My individual mind map for PS-1 is called Travel-Ready Registration, and I focused it on the ERP and the upload. Four branches: a verified checklist, upload confidence, status and proof, and unexpected resources like DigiLocker and JoSAA. The cross-links show how ideas help each other, and the big insight is that the checklist and the upload should be the same object.",
    render: (t) => {
      const insight = prog(t, 13, 0.7);
      return (
        <>
          <F t={t} at={0.1} style={{ left: 40, top: 22, width: 600 }}><Kicker color={C.purple}>Assignment 3 · Mind map · PS-1</Kicker></F>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - insight, visibility: insight >= 1 ? "hidden" : "visible" }}>
            <svg style={{ position: "absolute", left: 0, top: 0 }} width={1280} height={720}>
              {MM.map((b, bi) => {
                const s0 = 1.2 + bi * 1.9;
                const ex = b.bx + b.side * (BW / 2);
                return (
                  <g key={b.name}>
                    <DrawPath t={t} at={s0} d={0.7} color={b.color} width={4} dPath={`M${CX},${CY} L${b.bx},${b.by}`} />
                    {b.nodes.map((_, ni) => (
                      <DrawPath key={ni} t={t} at={s0 + 0.6 + ni * 0.25} d={0.6} color={b.color} width={2.5} dPath={`M${ex},${b.by} L${leafX(b.side) + (b.side === -1 ? LW : 0)},${b.ys[ni]}`} />
                    ))}
                  </g>
                );
              })}
              {MMLINKS.map((l, i) => {
                const k = prog(t, 9.4 + i * 1.1, 0.8);
                return (
                  <g key={l.label} opacity={k}>
                    <path d={l.d} fill="none" stroke="#fff" strokeWidth={2.5} strokeDasharray="7 7" strokeLinejoin="round" />
                    <text x={l.lx} y={l.ly} fill={C.amber} fontSize={18} fontWeight={700} textAnchor={l.anchor} stroke="#0e2340" strokeWidth={5} paintOrder="stroke">{l.label}</text>
                  </g>
                );
              })}
            </svg>
            <F t={t} at={0.4} s={0.7} y={0} style={{ left: CX - 88, top: CY - 88, width: 176 }}>
              <div style={{ width: 176, height: 176, borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, #2d5c92, #17375e)", border: `3px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 16, fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.15, boxShadow: `0 0 40px ${GREEN}33` }}>Travel-Ready Registration</div>
            </F>
            {MM.map((b, bi) => {
              const s0 = 1.2 + bi * 1.9;
              return (
                <div key={b.name}>
                  <F t={t} at={s0 + 0.4} s={0.7} y={0} style={{ left: b.bx - BW / 2, top: b.by - BH / 2, width: BW }}>
                    <div style={{ background: b.color, color: "#0b1a2e", borderRadius: 14, height: BH, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, textAlign: "center", lineHeight: 1.15, boxShadow: "0 8px 20px rgba(0,0,0,.35)" }}>
                      <span style={{ fontSize: 20 }}>{b.icon}</span>{b.name}
                    </div>
                  </F>
                  {b.nodes.map((n, ni) => (
                    <F key={n} t={t} at={s0 + 0.9 + ni * 0.25} s={0.85} y={0} style={{ left: leafX(b.side), top: b.ys[ni] - 28, width: LW }}>
                      <div style={{ background: "#12294a", border: `1.5px solid ${b.color}`, borderRadius: 12, padding: "6px 12px", fontSize: 17, lineHeight: 1.2, textAlign: "center", height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
                    </F>
                  ))}
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", left: 230, top: 150, width: 820, opacity: insight }}>
            <Card color={GREEN} style={{ padding: "26px 32px", background: "#12294a" }}>
              <Kicker color={GREEN}>Three insights from my map</Kicker>
              {[
                "The checklist and the upload should be the same object: every list item becomes an upload slot with a status.",
                "The institute already holds verified data (JoSAA, DigiLocker). Reusing it shrinks the checklist instead of explaining it better.",
                "Parents decide travel, so the proof has to reach them in plain language too.",
              ].map((x, i) => (
                <F key={x} t={t} at={13.6 + i * 0.9} y={10} style={{ position: "relative", marginTop: 16, fontSize: 25, lineHeight: 1.3, display: "flex", gap: 14 }}>
                  <b style={{ color: GREEN }}>{i + 1}</b><span>{x}</span>
                </F>
              ))}
            </Card>
          </div>
        </>
      );
    },
  },

  /* 7 ------------------------------------------------------ brainstorm */
  {
    title: "A3 · Brainstorm board",
    dur: 15,
    caption:
      "On the PS-1 Miro board the team put 17 stickies in three clusters. Mine is highlighted in green. I proposed a personalised checklist generated from the student’s category, state and quota, and Saumya built on it with sample photos. I also built on Kyan’s WhatsApp bot: anything it cannot answer goes to a senior volunteer within ten minutes.",
    render: (t) => (
      <>
        <F t={t} at={0.1} style={{ left: 40, top: 20, width: 900 }}><Kicker color={C.purple}>Assignment 3 · Brainstorm board · PS-1 · 17 stickies, 3 clusters</Kicker></F>
        {BOARD.map((col, ci) => (
          <div key={col.h}>
            <F t={t} at={0.4 + ci * 0.3} style={{ left: 40 + ci * 410, top: 62, width: 390 }}>
              <div style={{ background: `${col.c}30`, border: `2px solid ${col.c}`, borderRadius: 14, padding: "8px 14px", fontWeight: 700, fontSize: 20 }}>{col.icon} {col.h}</div>
            </F>
            {col.s.map(([who, txt, build], si) => {
              const mine = who === "VS" || !!build?.startsWith("Me:");
              const at = 1.2 + ci * 0.5 + si * 0.28;
              const glow = mine ? prog(t, 7 + (ci === 2 ? 3 : 0), 0.6) : 0;
              const dim = 1 - 0.55 * prog(t, 6.6, 0.8) * (mine ? 0 : 1);
              return (
                <F key={txt} t={t} at={at} s={0.9} y={10} style={{ left: 40 + ci * 410, top: 118 + si * 64 + (si > 0 ? 38 : 0), width: 390 }}>
                  <div style={{ opacity: dim, background: mine ? `rgba(183,235,143,${0.1 + 0.2 * glow})` : C.card, border: `1.5px solid ${mine ? `rgba(183,235,143,${0.4 + 0.6 * glow})` : C.line}`, borderRadius: 11, padding: "6px 10px", fontSize: 15.5, lineHeight: 1.2, height: 56, display: "flex", alignItems: "center", gap: 9, boxShadow: mine && glow ? `0 0 ${24 * glow}px rgba(183,235,143,.45)` : undefined }}>
                    <span style={{ flex: "none", width: 28, height: 28, borderRadius: "50%", background: who === "VS" ? GREEN : "rgba(255,255,255,.2)", color: who === "VS" ? "#0b1a2e" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{who}</span>
                    <span>{txt}</span>
                  </div>
                  {build && prog(t, 9, 0.5) > 0 && (
                    <div style={{ position: "absolute", left: 38, top: 52, width: 340, opacity: prog(t, ci === 2 ? 11.5 : 9, 0.6), background: build.startsWith("Me:") ? GREEN : "rgba(255,255,255,.88)", color: "#0b1a2e", borderRadius: 9, padding: "4px 10px", fontSize: 13.5, fontWeight: 600, lineHeight: 1.2, zIndex: 3 }}>↳ {build}</div>
                  )}
                </F>
              );
            })}
          </div>
        ))}
        <F t={t} at={13} style={{ left: 40, top: 596, width: 1200 }}>
          <div style={{ fontSize: 20, color: C.soft }}>
            <b style={{ color: GREEN }}>Also mine:</b> PS-T vibrating handrail · quiet study coach · PS-2 colour-coded floor trail · room inspection card
          </div>
        </F>
      </>
    ),
  },

  /* 8 ------------------------------------------------ merge → ReadyPass */
  {
    title: "A3 · Team map → ReadyPass",
    dur: 19,
    caption:
      "I also built the merged team map for PS-1. Two clusters, the checklist and the upload, kept merging. That told us they are one object, which became the SCAMPER Combine idea: every checklist line is its own upload slot with a status light. That is ReadyPass, the PS-1 concept we selected. Items already verified through JoSAA or DigiLocker turn green automatically.",
    render: (t) => {
      const j = prog(t, 5.5, 1.3);
      const rows: [string, [number, string][], string][] = [
        ["Class 12 marksheet", [[7.5, C.green]], "JoSAA verified"],
        ["Category certificate", [[8.5, C.amber], [12, C.green]], "uploading…"],
        ["Income affidavit (notarised)", [[9.5, C.amber], [12.8, C.green]], "in review"],
        ["Passport photo", [[10.2, C.red], [13.6, C.green]], "blurry: retake"],
      ];
      const ready = prog(t, 15, 0.7);
      return (
        <>
          <F t={t} at={0.1} style={{ left: 50, top: 28, width: 700 }}><Kicker color={C.purple}>Assignment 3 · Team map + SCAMPER “Combine”</Kicker></F>
          {/* the eight member chips merge into one map */}
          <div style={{ position: "absolute", left: 50, top: 76, display: "flex", gap: 8 }}>
            {[["SD", "#FFE58F"], ["VS", GREEN], ["VR", "#91D5FF"], ["SS", "#FFADD2"], ["ST", "#FFC69A"], ["KM", "#D3ADF7"], ["AP", "#87E8DE"], ["SR", "#E6F59A"]].map(([c, col], i) => (
              <div key={c} style={{ width: 40, height: 40, borderRadius: "50%", background: col, color: "#0b1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, opacity: prog(t, 0.4 + i * 0.12, 0.4), transform: `scale(${c === "VS" ? 1 + 0.15 * Math.sin(t * 4) : 1})`, boxShadow: c === "VS" ? `0 0 18px ${GREEN}` : undefined }}>{c}</div>
            ))}
          </div>
          <F t={t} at={1.8} style={{ left: 50, top: 132, width: 680 }}>
            <div style={{ fontSize: 22, color: C.soft }}>8 individual maps → <b style={{ color: "#fff" }}>one team map</b>. Two clusters kept merging:</div>
          </F>
          {/* two clusters that slide together */}
          <div style={{ position: "absolute", left: lerp(50, 150, j), top: lerp(210, 270, j), width: lerp(290, 400, j), opacity: prog(t, 2.8, 0.6) }}>
            <div style={{ background: `${C.blue}30`, border: `2px solid ${C.blue}`, borderRadius: 14, padding: "14px 16px", fontWeight: 700, fontSize: 22, textAlign: "center", borderBottomLeftRadius: lerp(14, 0, j), borderBottomRightRadius: lerp(14, 0, j) }}>📋 Know what to bring</div>
          </div>
          <div style={{ position: "absolute", left: lerp(380, 150, j), top: lerp(210, 270 + 56, j), width: lerp(290, 400, j), opacity: prog(t, 3.4, 0.6) }}>
            <div style={{ background: "rgba(224,115,95,.2)", border: "2px solid #e0735f", borderRadius: 14, padding: "14px 16px", fontWeight: 700, fontSize: 22, textAlign: "center", borderTopLeftRadius: lerp(14, 0, j), borderTopRightRadius: lerp(14, 0, j) }}>☁️ Upload once</div>
          </div>
          {prog(t, 4, 0.5) * (1 - j) > 0 && (
            <div style={{ position: "absolute", left: 330, top: 222, fontSize: 30, opacity: prog(t, 4, 0.5) * (1 - j), transform: `scale(${1 + 0.2 * Math.sin(t * 8)})` }}>⇄</div>
          )}
          <F t={t} at={6.6} style={{ left: 150, top: 392, width: 400 }}>
            <div style={{ textAlign: "center", fontSize: 24, fontWeight: 700 }}><span style={{ color: GREEN }}>Checklist line = upload slot</span></div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
              {[["grey", "#5d6b82"], ["amber", C.amber], ["green", C.green], ["red", C.red]].map(([n, c]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: C.soft }}><i style={{ width: 14, height: 14, borderRadius: "50%", background: c, display: "inline-block" }} />{n}</div>
              ))}
            </div>
          </F>
          {[["SCAMPER · Combine", C.purple], ["JoSAA / DigiLocker items turn green on their own", C.green], ["Selected concept: ReadyPass (PS-1)", C.amber]].map(([x, c], i) => (
            <F key={x} t={t} at={9 + i * 1.4} y={12} style={{ left: 50, top: 495 + i * 62, width: 560 }}>
              <Pill color={`${c}33`} style={{ color: "#fff", border: `1.5px solid ${c}`, fontSize: 19 }}>{x}</Pill>
            </F>
          ))}
          {/* phone */}
          <F t={t} at={6} s={0.94} style={{ left: 800, top: 50 }}>
            <Phone style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600 }}>ReadyPass</div>
              <div style={{ color: C.soft, fontSize: 13, marginBottom: 12 }}>Personalised for: General · UP · Open</div>
              {rows.map(([n, steps, note], i) => {
                const col = light(t, steps);
                return (
                  <div key={n} style={{ opacity: prog(t, 6.6 + i * 0.4, 0.5), display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.07)", border: `1.5px solid ${col}`, borderRadius: 12, padding: "9px 11px", marginBottom: 9 }}>
                    <i style={{ flex: "none", width: 18, height: 18, borderRadius: "50%", background: col, boxShadow: `0 0 12px ${col}`, display: "block" }} />
                    <div style={{ fontSize: 14, lineHeight: 1.2 }}>
                      <b>{n}</b>
                      <div style={{ color: C.soft, fontSize: 12 }}>{col === C.green ? "accepted" : col === C.red ? note : col === C.amber ? note : "waiting"}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: 14, opacity: ready, transform: `translateY(${(1 - ready) * 16}px)`, background: "rgba(95,207,128,.18)", border: `2px solid ${C.green}`, borderRadius: 14, padding: 12, textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: C.green, fontSize: 15, letterSpacing: ".06em" }}>READY TO REPORT</div>
                <svg width={86} height={86} viewBox="0 0 9 9" style={{ marginTop: 8 }}>
                  {Array.from({ length: 81 }, (_, n) => ((n * 7 + (n >> 2) * 3) % 5 < 2 ? <rect key={n} x={n % 9} y={Math.floor(n / 9)} width={1} height={1} fill="#fff" /> : null))}
                </svg>
              </div>
            </Phone>
          </F>
        </>
      );
    },
  },

  /* 9 ------------------------------------------------------------ recap */
  {
    title: "Recap",
    dur: 9,
    caption:
      "So the thread is: one persona’s story, her point of view and journey, the valley at the verification desk, the PS-1 problem, my mind map and stickies, and finally ReadyPass: a checklist where every line is an upload slot with proof. Evidence in, idea out. Thank you.",
    render: (t) => {
      const steps: [string, string, string, string][] = [
        ["A2", "Persona Ananya", "Prepared planner, fixed return ticket", C.blue],
        ["A2", "POV + HMW", "Trustworthy checklist", C.blue],
        ["A2", "Journey valley", "Verification desk, phase 5", C.red],
        ["A3", "PS-1 map + stickies", "ERP / upload, 4 branches", C.purple],
        ["A3", "ReadyPass", "Checklist line = upload slot", GREEN],
      ];
      return (
        <>
          <F t={t} at={0.2} style={{ left: 90, top: 70, width: 1100 }}>
            <Kicker color={GREEN}>Recap · Vishwas</Kicker>
            <Big size={54} style={{ marginTop: 8 }}>Evidence in, idea out</Big>
          </F>
          {steps.map(([a, h, s, c], i) => (
            <div key={h}>
              <F t={t} at={1.2 + i * 0.9} y={20} style={{ left: 50 + i * 236, top: 270, width: 212 }}>
                <div style={{ background: `${c}22`, border: `2px solid ${c}`, borderRadius: 16, padding: "16px 14px", height: 220 }}>
                  <Pill color={c} dark style={{ fontSize: 14, padding: "3px 12px" }}>{a}</Pill>
                  <div style={{ fontWeight: 700, fontSize: 23, marginTop: 12, lineHeight: 1.15 }}>{h}</div>
                  <div style={{ color: C.soft, fontSize: 17, marginTop: 10, lineHeight: 1.3 }}>{s}</div>
                </div>
              </F>
              {i < 4 && (
                <F t={t} at={1.7 + i * 0.9} y={0} style={{ left: 50 + i * 236 + 210, top: 360, width: 30 }}>
                  <div style={{ fontSize: 28, color: C.soft }}>→</div>
                </F>
              )}
            </div>
          ))}
          <F t={t} at={6.2} style={{ left: 90, top: 560, width: 1100 }}>
            <div style={{ fontSize: 26, color: C.soft }}>Every PS-1 idea answers Ananya’s need: <b style={{ color: "#fff" }}>prove it’s complete before leaving home.</b></div>
          </F>
        </>
      );
    },
  },
];

export default function VishwasVideo() {
  return <MotionVideo id="video-vishwas" label="Vishwas · A2 + A3" title="My part: Ananya’s story to PS-1 and ReadyPass" scenes={scenes} accent={GREEN} />;
}
