"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import styles from "./Empathize.module.css";
import { Face, Ico } from "./icons";

const THEMES = [
  { name: "Relied on seniors or peers", n: 16, c: "#2f8f4e", code: "PEER", ex: "“Seniors personally guide us.”" },
  { name: "ERP portal or network friction", n: 15, c: "#c4453a", code: "ERP", ex: "“The website crashed without warning and constantly needed a new login.”" },
  { name: "Document clarity or verification", n: 14, c: "#c4453a", code: "DOC", ex: "“One document was not mentioned in the advisory and it was asked here.”" },
  { name: "Hostel room readiness", n: 12, c: "#c98a00", code: "HOST", ex: "“The room was quite dirty and there was a problem with the fan light and door lock.”" },
  { name: "Queue crowding or tokens", n: 9, c: "#2a6fb0", code: "QUE", ex: "“There was no line and a lot of chaos.”" },
  { name: "Wayfinding or staff guidance", n: 8, c: "#2a6fb0", code: "NAV", ex: "Unclear next desk, not enough guides, conflicting explanations." },
];

export function ThemeBars() {
  const [sel, setSel] = useState(0);
  return (
    <div className={styles.bars}>
      <div>
        {THEMES.map((t, i) => (
          <button key={t.code} className={styles.barRow} onClick={() => setSel(i)} aria-pressed={sel === i}>
            <span className={styles.barName}>{t.name}</span>
            <span className={styles.barTrack}>
              <motion.span
                className={styles.barFill}
                style={{ background: t.c }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(t.n / 30) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {i === 0 ? "≥" : "≈"}
                {t.n}
              </motion.span>
            </span>
            <span className={styles.code}>{t.code}</span>
          </button>
        ))}
        <p className={styles.note}>Out of 30 cleaned records. Counts are directional signals for prioritising, not survey percentages. Tap a bar for a quote.</p>
      </div>
      <motion.blockquote key={sel} className={styles.quote} style={{ borderColor: THEMES[sel].c }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <span className={styles.quoteCode} style={{ background: THEMES[sel].c }}>{THEMES[sel].code}</span>
        <p>{THEMES[sel].ex}</p>
        <footer>Anonymised student response</footer>
      </motion.blockquote>
    </div>
  );
}

/** The student in the middle; official channels faint, informal channels pulsing with answers. */
export function BorrowedConfidence() {
  const informal = [
    { l: "Seniors’ WhatsApp", e: "💬", a: -60 },
    { l: "Batchmates", e: "🧑‍🤝‍🧑", a: -10 },
    { l: "Guards", e: "💂", a: 35 },
    { l: "YouTube / Reddit", e: "📺", a: 80 },
  ];
  const official = [
    { l: "Advisory PDF", e: "📄", a: 140 },
    { l: "ERP portal", e: "💻", a: 190 },
    { l: "Help desk", e: "🏢", a: 235 },
  ];
  const R = 185;
  const cx = 300;
  const cy = 250;
  const pos = (a: number) => [cx + R * Math.cos((a * Math.PI) / 180), cy + R * Math.sin((a * Math.PI) / 180)];
  return (
    <div className={styles.net}>
      <svg viewBox="0 0 600 530" className={styles.netSvg} role="img" aria-label="Diagram: students get answers from informal channels more than official ones">
        {official.map((o) => {
          const [x, y] = pos(o.a);
          return <line key={o.l} x1={cx} y1={cy} x2={x} y2={y} stroke="#b8c2d0" strokeWidth={2} strokeDasharray="5 6" />;
        })}
        {informal.map((o, i) => {
          const [x, y] = pos(o.a);
          return (
            <g key={o.l}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="#2f8f4e" strokeWidth={4} />
              <motion.circle r={7} fill="#2f8f4e" initial={{ cx: x, cy: y }} animate={{ cx: [x, cx], cy: [y, cy], opacity: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: "easeIn" }} />
            </g>
          );
        })}
        {official.map((o, i) => {
          const [x, y] = pos(o.a);
          return (
            <motion.circle key={o.l + "p"} r={6} fill="#c4453a" initial={{ cx: x, cy: y }} animate={{ cx: [x, (x + cx) / 2], cy: [y, (y + cy) / 2], opacity: [0, 0.8, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: 0.5 + i * 0.9 }} />
          );
        })}
        {[...informal.map((o) => ({ ...o, on: true })), ...official.map((o) => ({ ...o, on: false }))].map((o) => {
          const [x, y] = pos(o.a);
          return (
            <g key={o.l + "n"} opacity={o.on ? 1 : 0.55}>
              <circle cx={x} cy={y} r={34} fill="#fff" stroke={o.on ? "#2f8f4e" : "#b8c2d0"} strokeWidth={3} />
              <Ico e={o.e} x={x - 14} y={y - 14} size={28} color={o.on ? "#2f8f4e" : "#8a96a8"} />
              <text x={x} y={y + 56} textAnchor="middle" fontSize={15} fontWeight={600} fill="#17202e">{o.l}</text>
            </g>
          );
        })}
        <motion.circle cx={cx} cy={cy} r={54} fill="#17375e" animate={{ r: [52, 58, 52] }} transition={{ duration: 2, repeat: Infinity }} />
        <Ico e="🧑‍🎓" x={cx - 22} y={cy - 22} size={44} color="#fff" strokeWidth={1.6} />
      </svg>
      <div className={styles.netText}>
        <h4>Confidence is borrowed</h4>
        <p>
          <b style={{ color: "#2f8f4e" }}>Green lines</b> are where answers actually came from: seniors, batchmates, guards and videos. They are fast and use plain language.
        </p>
        <p>
          <b style={{ color: "#8a96a8" }}>Dashed grey lines</b> are official channels. They existed, but answers were slow, incomplete or out of date, so they faded out.
        </p>
        <p className={styles.insight}>Our design rule: give official information the speed and voice of a senior.</p>
      </div>
    </div>
  );
}

const STAGES = [
  { s: "Prepare at home", e: 1, f: "😊", pain: "Advisory has no date or samples", need: "Confidence the checklist is complete" },
  { s: "Upload & confirm", e: -1, f: "😟", pain: "Crashes, re-login, fee “pending”", need: "Clear accepted status" },
  { s: "Arrive & orient", e: 0, f: "😐", pain: "Crowd, heat, tokens run out", need: "Visible route and wait" },
  { s: "Verify & enroll", e: -2, f: "😫", pain: "A document not in the advisory", need: "One verified record" },
  { s: "Roll number!", e: 1.5, f: "😄", pain: "Relief comes late in a long day", need: "A real welcome moment" },
  { s: "Hostel & mess", e: -2, f: "😫", pain: "Dirty room, broken lock, water", need: "A clean, working room" },
  { s: "Settle in", e: 0, f: "😐", pain: "Unfixed defects linger", need: "Fast, tracked repairs" },
];

function StageDot({ x, y, face, p, i }: { x: number; y: number; face: number; p: MotionValue<number>; i: number }) {
  const opacity = useTransform(p, [i / 8, i / 8 + 0.12], [0, 1]);
  return (
    <motion.g style={{ opacity }}>
      <circle cx={x} cy={y} r={22} fill="#fff" stroke="#1f8f84" strokeWidth={3} />
      <Face v={face} x={x - 14} y={y - 14} size={28} />
    </motion.g>
  );
}

/** Emotional curve that draws as you scroll past it. */
export function EmotionJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  const len = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const W = 1100;
  const H = 260;
  const xs = STAGES.map((_, i) => 70 + i * ((W - 140) / (STAGES.length - 1)));
  const ys = STAGES.map((s) => H / 2 - s.e * 48);
  let d = `M${xs[0]},${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const mx = (xs[i - 1] + xs[i]) / 2;
    d += ` C${mx},${ys[i - 1]} ${mx},${ys[i]} ${xs[i]},${ys[i]}`;
  }
  return (
    <div ref={ref} className={styles.journey}>
      <div className="scroll-x">
        <div style={{ minWidth: 900 }}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.journeySvg}>
            <rect x={0} y={0} width={W} height={H / 2} fill="#eef8ee" />
            <rect x={0} y={H / 2} width={W} height={H / 2} fill="#fdf0ef" />
            <line x1={0} x2={W} y1={H / 2} y2={H / 2} stroke="#c3cad5" strokeDasharray="6 6" />
            <text x={10} y={22} fontSize={14} fill="#2f8f4e" fontWeight={700}>feels good</text>
            <text x={10} y={H - 10} fontSize={14} fill="#c4453a" fontWeight={700}>feels bad</text>
            <motion.path d={d} fill="none" stroke="#1f8f84" strokeWidth={6} strokeLinecap="round" style={{ pathLength: len }} />
            {xs.map((x, i) => (
              <StageDot key={i} x={x} y={ys[i]} face={STAGES[i].e} p={scrollYProgress} i={i} />
            ))}
          </svg>
          <div className={styles.stageRow} style={{ gridTemplateColumns: `repeat(${STAGES.length}, 1fr)` }}>
            {STAGES.map((s) => (
              <div key={s.s} className={styles.stage} data-low={s.e <= -2}>
                <b>{s.s}</b>
                <span className={styles.pain}>{s.pain}</span>
                <span className={styles.need}>Need: {s.need}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const QUAD = [
  { h: "Says", c: "#2a6fb0", items: ["I expected the process to be smooth and fast", "Everything should be mentioned beforehand", "Seniors were more accessible and answered every question", "The room was dirty or something was broken"] },
  { h: "Thinks", c: "#7a4fb0", items: ["Have I brought every document in the correct format?", "Will the portal keep my upload and payment status?", "Where do I go next? Will my token be accepted?", "Can my family leave knowing I am settled safely?"] },
  { h: "Does", c: "#1f8f84", items: ["Checks advisories, email, ERP, WhatsApp, YouTube, Reddit", "Re-uploads files, restarts sessions, uses personal internet", "Waits in queues and moves between desks", "Cleans the room, buys a cooler, reports fixtures"] },
  { h: "Feels", c: "#c98a00", items: ["Excited and proud about joining IIITA", "Nervous about leaving home and making a mistake", "Frustrated or tired when systems fail", "Relieved when a trusted person confirms the next step"] },
];

export function EmpathyMap() {
  return (
    <div className={styles.emap}>
      {QUAD.map((q, i) => (
        <motion.div key={q.h} className={styles.quad} style={{ borderTopColor: q.c }} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
          <h4 style={{ color: q.c }}>{q.h}</h4>
          <ul>
            {q.items.map((it, j) => (
              <motion.li key={it} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12 + j * 0.08 }}>
                {it}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
      <div className={styles.emapCenter}><Ico e="🧑‍🎓" size={34} color="#fff" strokeWidth={1.6} /></div>
    </div>
  );
}

const PAIN = [
  ["Late or ambiguous requirements", "Very high", "Version-controlled checklist with examples and change alerts"],
  ["Unreliable digital completion", "High", "Resilient uploads, clear errors, saved progress, receipt"],
  ["Fragmented assistance", "High", "One official help channel with trained human escalation"],
  ["Crowding and uncertain queues", "Medium", "Arrival slots, live token status, seating, signage"],
  ["Repeated verification", "Medium", "One verified record; originals only where policy needs them"],
  ["Room not ready", "High", "Pre-handover inspection and rapid maintenance ticket"],
];

export function PainToNeed() {
  return (
    <div className={styles.p2n}>
      {PAIN.map(([p, pr, n], i) => (
        <motion.div key={p} className={styles.p2nRow} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
          <div className={styles.p2nPain}>{p}</div>
          <motion.div className={styles.p2nArrow} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }} />
          <div className={styles.p2nNeed}>{n}</div>
          <span className={styles.p2nPr} data-p={pr}>{pr}</span>
        </motion.div>
      ))}
    </div>
  );
}
