"use client";

import { Ico } from "@/components/icons";
import MotionVideo, { type Scene } from "@/components/MotionVideo";
import { clamp, lerp, prog } from "@/lib/anim";
import { Big, C, Card, Count, F, Kicker, Phone, Pill } from "./kit";

const DOCS = [
  { n: "Class 12 marksheet", src: "DigiLocker" },
  { n: "JoSAA allotment letter", src: "JoSAA" },
  { n: "Category certificate", src: "DigiLocker" },
  { n: "Medical certificate", src: "upload" },
  { n: "Anti-ragging undertaking", src: "upload" },
  { n: "Passport photo", src: "upload" },
];

const ROUTE = ["Document check", "Fee desk", "ID photo", "Hostel H-3, 214"];

const Light = ({ s }: { s: "grey" | "amber" | "green" | "red" }) => (
  <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: "50%", background: { grey: "#56657a", amber: C.amber, green: C.green, red: C.red }[s], flex: "none" }} />
);

export const scenes: Scene[] = [
  {
    title: "ReadyPass",
    dur: 14,
    caption:
      "ReadyPass (PS-1). The checklist is personalised and every line is an upload slot with a status light. Documents the institute already has from DigiLocker or JoSAA turn green on their own.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 80, top: 90, width: 520 }}>
          <Pill color={C.blue}>Solution 1 · PS-1</Pill>
          <Big size={64} style={{ marginTop: 16 }}>ReadyPass</Big>
          <div style={{ fontSize: 26, color: C.soft, marginTop: 14, lineHeight: 1.4 }}>Know you are ready <b style={{ color: "#fff" }}>before</b> you board the train.</div>
        </F>
        <F t={t} at={3} style={{ left: 80, top: 360, width: 520 }}>
          {["Checklist built from your category and state", "Already-verified documents auto-accepted", "Clear reason and fix if something fails"].map((x, i) => (
            <div key={x} style={{ fontSize: 22, marginBottom: 14, opacity: prog(t, 3 + i * 0.8, 0.5) }}>
              <span style={{ color: C.blue, fontWeight: 600 }}>✓</span> {x}
            </div>
          ))}
        </F>
        <Phone style={{ left: 820, top: 70 }}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>Your checklist</div>
          <div style={{ fontSize: 12, color: C.soft }}>v3 · updated 12 Jul · BTech IT, OBC, Bihar</div>
          {DOCS.map((d, i) => {
            const appear = prog(t, 1 + i * 0.35, 0.4);
            let st: "grey" | "amber" | "green" | "red" = "grey";
            if (d.src !== "upload" && t > 3 + i * 0.2) st = "green";
            if (d.src === "upload" && t > 5 + i * 0.6) st = "amber";
            if (d.src === "upload" && t > 7 + i * 0.6) st = "green";
            const failing = d.n === "Medical certificate" && t > 6.2 && t < 9.5;
            if (failing) st = "red";
            return (
              <div key={d.n} style={{ marginTop: 10, opacity: appear, background: "rgba(255,255,255,.06)", borderRadius: 10, padding: "8px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
                  <Light s={st} /> {d.n}
                </div>
                <div style={{ fontSize: 11, color: failing ? C.red : C.soft, marginLeft: 22 }}>
                  {failing ? "Too large (4.1 MB). Max 2 MB → tap to compress" : st === "green" ? (d.src === "upload" ? "Accepted" : `Auto-accepted from ${d.src}`) : st === "amber" ? "Under review" : "Not started"}
                </div>
              </div>
            );
          })}
        </Phone>
      </>
    ),
  },
  {
    title: "Ready to Report",
    dur: 11,
    caption:
      "When every light is green, the student and parents get a boarding-pass style ‘Ready to Report’ pass with a QR code and reporting slot. If a rule changes, everyone is alerted at once.",
    render: (t) => {
      const flip = prog(t, 1, 1);
      return (
        <>
          <F t={t} at={0.2} style={{ left: 80, top: 90, width: 560 }}>
            <Kicker color={C.blue}>Like airline web check-in</Kicker>
            <Big size={54} style={{ marginTop: 10 }}>Proof you can hold</Big>
            <div style={{ fontSize: 24, color: C.soft, marginTop: 16, lineHeight: 1.45 }}>The pass is the proof students were missing. Families can plan travel around it.</div>
          </F>
          <div style={{ position: "absolute", left: 720, top: 100, width: 440, height: 480, borderRadius: 24, background: "#fff", color: "#0e2340", transform: `perspective(1000px) rotateY(${(1 - flip) * 90}deg)`, boxShadow: "0 30px 80px rgba(0,0,0,.5)", overflow: "hidden" }}>
            <div style={{ background: C.blue, color: "#fff", padding: "18px 24px" }}>
              <div style={{ fontSize: 15, letterSpacing: ".12em", fontWeight: 700 }}>IIITA · READY TO REPORT</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32 }}>Ananya Verma</div>
            </div>
            <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 17 }}>
              <div><div style={{ color: "#667" }}>Slot</div><b style={{ fontSize: 24 }}>18 Jul · 10:30</b></div>
              <div><div style={{ color: "#667" }}>Documents</div><b style={{ fontSize: 24, color: "#1f8a4c" }}>9 / 9 ✓</b></div>
              <div><div style={{ color: "#667" }}>Fee</div><b style={{ fontSize: 24, color: "#1f8a4c" }}>Confirmed</b></div>
              <div><div style={{ color: "#667" }}>Lane</div><b style={{ fontSize: 24, display: "inline-flex", alignItems: "center", gap: 4 }}>Green <Ico e="⚡" size={20} color="#c98a00" /></b></div>
            </div>
            <div style={{ margin: "6px auto", width: 150, height: 150, background: "repeating-conic-gradient(#0e2340 0 25%, #fff 0 50%) 0 0/30px 30px", border: "8px solid #fff", outline: "2px solid #0e2340" }} />
          </div>
          <F t={t} at={5} x={60} y={0} style={{ left: 460, top: 470, width: 380 }}>
            <div style={{ background: "#fff", color: "#111", borderRadius: 16, padding: "12px 16px", boxShadow: "0 10px 30px rgba(0,0,0,.4)", fontSize: 17 }}>
              <b style={{ display: "flex", alignItems: "center", gap: 6 }}><Ico e="🔔" size={18} color="#c98a00" /> Rule change · v4</b>
              <div>Gap certificate now needed only if you took a drop year. Sent to you and your parent.</div>
            </div>
          </F>
        </>
      );
    },
  },
  {
    title: "Gate-to-Room Pass",
    dur: 14,
    caption:
      "Gate-to-Room Pass (PS-2). One e-token shows the student’s personal route of desks, the live wait at the next one, and pings them when it is their turn, so the family can sit in the shade instead of standing in line.",
    render: (t) => {
      const step = clamp(Math.floor((t - 2) / 2.6), 0, ROUTE.length - 1);
      const wait = Math.max(0, Math.round(14 - (t - 2) * 1.6));
      return (
        <>
          <F t={t} at={0.2} style={{ left: 80, top: 90, width: 540 }}>
            <Pill color={C.teal}>Solution 2 · PS-2</Pill>
            <Big size={60} style={{ marginTop: 16 }}>Gate-to-Room Pass</Big>
            <div style={{ fontSize: 25, color: C.soft, marginTop: 14, lineHeight: 1.4 }}>Always know the next step and the wait.</div>
          </F>
          <F t={t} at={3} style={{ left: 80, top: 380, width: 540 }}>
            {["Reporting slot, so tokens never run out", "Personal route from gate to hostel room", "Ping when your desk is ready"].map((x, i) => (
              <div key={x} style={{ fontSize: 22, marginBottom: 14, opacity: prog(t, 3 + i * 0.8, 0.5) }}>
                <span style={{ color: C.teal, fontWeight: 600 }}>✓</span> {x}
              </div>
            ))}
          </F>
          <Phone style={{ left: 820, top: 70 }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>Token #247 · Slot 10:30</div>
            <div style={{ fontSize: 12, color: C.soft }}>Rohan Iyer · BTech CSE</div>
            <div style={{ marginTop: 14, position: "relative" }}>
              <div style={{ position: "absolute", left: 9, top: 10, bottom: 10, width: 3, background: "#2a3d5a" }} />
              {ROUTE.map((r, i) => {
                const done = i < step;
                const now = i === step;
                return (
                  <div key={r} style={{ display: "flex", gap: 12, alignItems: "center", margin: "16px 0", position: "relative" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: done ? C.green : now ? C.teal : "#2a3d5a", border: now ? "3px solid #fff" : "none", zIndex: 1, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? "✓" : ""}</div>
                    <div style={{ fontSize: 15, fontWeight: now ? 800 : 500, opacity: done ? 0.6 : 1 }}>{r}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "rgba(47,184,166,.18)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 12, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: C.soft }}>Next: {ROUTE[step]}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34 }}>{wait} min</div>
              <div style={{ fontSize: 12, color: C.soft }}>4 people ahead · avg 3 min each</div>
            </div>
            {t > 8 && t < 11 && (
              <div style={{ position: "absolute", left: 0, right: 0, top: 380, background: "#fff", color: "#111", borderRadius: 14, padding: 12, fontSize: 14, boxShadow: "0 10px 20px rgba(0,0,0,.4)" }}>
                <b style={{ display: "flex", alignItems: "center", gap: 6 }}><Ico e="📳" size={16} color="#1f8f84" /> Your desk is ready</b>
                <div>Go to Desk C (ID photo), Hall 2</div>
              </div>
            )}
          </Phone>
        </>
      );
    },
  },
  {
    title: "Trusted help",
    dur: 10,
    caption:
      "Badged senior buddies answer questions from the same official FAQ the office uses. Students get the speed and tone of a senior, plus official accuracy, so answers never conflict.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 80, top: 80, width: 560 }}>
          <Kicker color={C.teal}>Keep what already works</Kicker>
          <Big size={52} style={{ marginTop: 10 }}>Seniors, made official</Big>
          <div style={{ fontSize: 24, color: C.soft, marginTop: 16, lineHeight: 1.45 }}>We kept what students already trusted (fast, friendly seniors) and connected it to verified information.</div>
        </F>
        <div style={{ position: "absolute", left: 720, top: 90, width: 470 }}>
          {[
            { me: true, txt: "Do I need the gap certificate? I didn’t take a drop.", a: 1 },
            { me: false, txt: "No, only for drop years (FAQ v4, item 12). Anything else?", a: 2.8 },
            { me: true, txt: "Where is the fee desk?", a: 4.6 },
            { me: false, txt: "Hall 2, Desk B. Your pass will ping you.", a: 6 },
          ].map((m, i) => (
            <F key={i} t={t} at={m.a} x={m.me ? 40 : -40} y={0} style={{ position: "relative", display: "flex", justifyContent: m.me ? "flex-end" : "flex-start", marginBottom: 16 }}>
              <div style={{ maxWidth: 360, background: m.me ? C.blue : "#fff", color: m.me ? "#fff" : "#111", borderRadius: 18, padding: "12px 16px", fontSize: 20 }}>
                {!m.me && <div style={{ fontSize: 13, fontWeight: 600, color: C.teal, display: "flex", alignItems: "center", gap: 4 }}><Ico e="🎖️" size={14} /> Senior buddy · verified</div>}
                {m.txt}
              </div>
            </F>
          ))}
        </div>
      </>
    ),
  },
  {
    title: "A room ready to live in",
    dur: 12,
    caption:
      "Every room passes an inspection card before the key is handed over. A QR code on the door lets students report a broken fixture in seconds and track the repair, so families can leave reassured.",
    render: (t) => {
      const checks = ["Cleaned", "Fan and light working", "Door lock secure", "Water supply checked"];
      const ticket = t > 6.5;
      return (
        <>
          <F t={t} at={0.2} style={{ left: 80, top: 80, width: 520 }}>
            <Kicker color={C.teal}>Registration ends at a ready room</Kicker>
            <Big size={52} style={{ marginTop: 10 }}>Inspect first, report in seconds</Big>
          </F>
          <F t={t} at={1} style={{ left: 80, top: 330, width: 460 }}>
            <Card color={C.teal}>
              <b>Room H-3/214 · inspection card</b>
              {checks.map((c, i) => (
                <div key={c} style={{ fontSize: 22, marginTop: 12 }}>
                  <span style={{ display: "inline-block", width: 28, color: C.green, fontWeight: 600, opacity: prog(t, 1.8 + i * 0.6, 0.3) }}>✓</span> {c}
                </div>
              ))}
            </Card>
          </F>
          <F t={t} at={3.5} s={0.8} y={0} style={{ left: 700, top: 110 }}>
            <div style={{ width: 300, height: 480, background: "#7a5132", borderRadius: 10, border: "10px solid #5b3b24", position: "relative" }}>
              <div style={{ position: "absolute", right: 24, top: 230, width: 22, height: 22, borderRadius: "50%", background: "#d9b25b" }} />
              <div style={{ position: "absolute", left: 90, top: 60, background: "#fff", padding: 10, borderRadius: 6, color: "#111", textAlign: "center", fontSize: 13, fontWeight: 700 }}>
                <div style={{ width: 90, height: 90, background: "repeating-conic-gradient(#111 0 25%, #fff 0 50%) 0 0/18px 18px" }} />
                Scan to report
              </div>
            </div>
          </F>
          {ticket && (
            <div style={{ position: "absolute", left: 960, top: 300, width: 280, opacity: prog(t, 6.5, 0.5) }}>
              <Card color={C.amber} style={{ background: "#13294a" }}>
                <b>Ticket #1182</b>
                <div style={{ fontSize: 18, marginTop: 6 }}>Fan light flickering</div>
                <div style={{ fontSize: 16, marginTop: 8, color: t > 9 ? C.green : C.amber, fontWeight: 700 }}>{t > 9 ? "✓ Fixed in 5 h 40 min" : "Assigned · ETA 6 h"}</div>
              </Card>
            </div>
          )}
        </>
      );
    },
  },
  {
    title: "Course problem: Smart Stop Strip",
    dur: 10,
    caption:
      "For the course problem on public transport, our concept is the Smart Stop Strip: a touch strip along handrails. Tap to request a stop, hold for assistance, triple-tap for a silent SOS. Your ticket vibrates before your stop.",
    render: (t) => {
      const mode = t < 3.5 ? 0 : t < 6 ? 1 : 2;
      const labels = [
        ["TAP", "Stop requested", C.teal],
        ["HOLD", "Ramp / more time needed", C.blue],
        ["TRIPLE-TAP", "Silent SOS to driver + control", C.red],
      ] as const;
      return (
        <>
          <F t={t} at={0.2} style={{ left: 80, top: 70 }}>
            <Pill color={C.red}>Course problem · PS-T</Pill>
            <Big size={54} style={{ marginTop: 14 }}>Smart Stop Strip</Big>
          </F>
          <div style={{ position: "absolute", left: 80, top: 320, width: 1120, height: 40, borderRadius: 20, background: "#3a4a62" }}>
            <div style={{ position: "absolute", inset: 6, borderRadius: 14, background: labels[mode][2], boxShadow: `0 0 30px ${labels[mode][2]}`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(t * 4)) }} />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 120 + i * 380, top: 420, width: 340, opacity: mode === i ? 1 : 0.35, transform: `scale(${mode === i ? 1.04 : 1})`, transition: "all .3s" }}>
              <Card color={labels[i][2]}>
                <div style={{ fontWeight: 600, fontSize: 24, color: labels[i][2] }}>{labels[i][0]}</div>
                <div style={{ fontSize: 22, marginTop: 6 }}>{labels[i][1]}</div>
              </Card>
            </div>
          ))}
          <F t={t} at={7.5} style={{ left: 80, top: 620 }}>
            <div style={{ fontSize: 22, color: C.soft }}>LED panel confirms every request · ticket vibrates one stop before yours</div>
          </F>
        </>
      );
    },
  },
  {
    title: "How we’ll know it works",
    dur: 11,
    caption:
      "Every concept is tied to a hypothesis from Assignment 2 with a measurable target, so the prototype tests can prove us right or wrong. Next step: paper and Figma prototypes tested with juniors and parents.",
    render: (t) => (
      <>
        <F t={t} at={0.2} style={{ left: 90, top: 60 }}>
          <Kicker>Success metrics from our hypotheses</Kicker>
          <Big size={50} style={{ marginTop: 8 }}>How we’ll know it works</Big>
        </F>
        {[
          { v: 85, s: "%", l: "list every required document correctly", h: "H1", c: C.blue },
          { v: 80, s: "%", l: "reach “Ready” 48 h before reporting", h: "H2", c: C.blue },
          { v: 50, s: "%", l: "fewer “where next?” questions", h: "H3", c: C.teal },
          { v: 90, s: "%", l: "of rooms pass inspection at handover", h: "H5", c: C.teal },
        ].map((m, i) => (
          <F key={m.h} t={t} at={1 + i * 0.6} s={0.85} y={0} style={{ left: 90 + i * 280, top: 230, width: 260 }}>
            <Card color={m.c} style={{ height: 290 }}>
              <Pill color={m.c} style={{ fontSize: 15 }}>{m.h}</Pill>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 84, marginTop: 10, color: m.c }}>
                {i === 2 ? "−" : "≥"}<Count t={t} at={1.3 + i * 0.6} to={m.v} />{m.s}
              </div>
              <div style={{ fontSize: 21, lineHeight: 1.35 }}>{m.l}</div>
            </Card>
          </F>
        ))}
        <F t={t} at={5} style={{ left: 90, top: 570, width: 1100 }}>
          <div style={{ fontSize: 23, color: C.soft }}>Riskiest assumption first: can admissions freeze the checklist 10 days before reporting?</div>
        </F>
        <div style={{ position: "absolute", left: lerp(90, 90, 1), top: 640, fontSize: 20, opacity: prog(t, 6.5, 0.5) }}>
          <b style={{ color: C.teal }}>Thank you</b> · Group 10
        </div>
      </>
    ),
  },
];

export default function SolutionVideo() {
  return <MotionVideo id="video-solution" label="Our solution" title="ReadyPass + Gate-to-Room Pass explained" scenes={scenes} accent={C.teal} />;
}
