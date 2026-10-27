"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import data from "@/data/content.json";
import styles from "./Define.module.css";
import { Face, Ico } from "./icons";
import { Check } from "lucide-react";


export function PersonaJourney() {
  const [i, setI] = useState(0);
  const p = data.personas[i];
  const j = data.journeys[i];
  const pov = data.povs[i];
  const n = j.phases.length;
  const W = 1000;
  const H = 150;
  const xs = j.phases.map((_, k) => (W / n) * (k + 0.5));
  const ys = j.phases.map((ph) => H / 2 - ph.emo * 28);
  let d = `M${xs[0]},${ys[0]}`;
  for (let k = 1; k < n; k++) {
    const mx = (xs[k - 1] + xs[k]) / 2;
    d += ` C${mx},${ys[k - 1]} ${mx},${ys[k]} ${xs[k]},${ys[k]}`;
  }
  return (
    <div>
      <div className="tabs" role="tablist">
        {data.personas.map((x, k) => (
          <button key={x.name} role="tab" className="tab" aria-selected={k === i} style={{ ["--c" as string]: x.color }} onClick={() => setI(k)}>
            {x.name.split(" ")[0]} · {x.role.replace("The ", "")}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <div className={styles.personaTop}>
            <div className="card top" style={{ ["--c" as string]: p.color }}>
              <div className={styles.avatar} style={{ background: p.color }}>{p.name.split(" ").map((s) => s[0]).join("")}</div>
              <h4 className={styles.pname}>{p.name}</h4>
              <div style={{ color: p.color, fontWeight: 700 }}>{p.role}</div>
              <p className="muted" style={{ fontSize: 14 }}>{p.profile}</p>
              <p style={{ fontSize: 15, margin: "6px 0" }}><b>Behaviour:</b> {p.behaviour}</p>
              <p style={{ fontSize: 15, margin: "6px 0" }}><b>Core need:</b> {p.need}</p>
              <p style={{ fontStyle: "italic", margin: "10px 0 0" }}>{p.quote}</p>
            </div>
            <div className={styles.povBox}>
              <div className="eyebrow">Point of view</div>
              <p className={styles.pov}>
                <span className="u">{pov.user}</span> needs <span className="n">{pov.need}</span> because <span className="i">{pov.insight}</span>.
              </p>
              <div className={styles.madlib}>
                <span className="u">{pov.mu}</span> seeks <span className="n">{pov.mn}</span>, so that <span className="i">{pov.mi}</span>.
              </div>
              <p className={styles.hmw}>→ {pov.hmw}</p>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}><b>Goal:</b> {j.goal}</p>
            </div>
          </div>

          <div className={styles.jm}>
            <div className="scroll-x">
              <div style={{ minWidth: 860 }}>
                <div className={styles.jmGrid} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
                  {j.phases.map((ph, k) => (
                    <div key={k} className={styles.phHead} style={{ background: j.color }}>{k + 1}. {ph.name}</div>
                  ))}
                  {j.phases.map((ph, k) => (
                    <div key={"d" + k} className={styles.cell}>
                      <span className={styles.rowLabel}>Doing</span>
                      <ul>{ph.doing.map((x) => <li key={x}>{x}</li>)}</ul>
                    </div>
                  ))}
                  {j.phases.map((ph, k) => (
                    <div key={"t" + k} className={styles.cell}>
                      <span className={styles.rowLabel}>Thinking</span>
                      <div className={styles.bubble}>“{ph.think}”</div>
                    </div>
                  ))}
                </div>
                <div className={styles.curveWrap}>
                  <svg viewBox={`0 0 ${W} ${H}`} className={styles.curve} preserveAspectRatio="none">
                    <rect width={W} height={H / 2} fill="#eef8ee" />
                    <rect y={H / 2} width={W} height={H / 2} fill="#fdf0ef" />
                    <line x1={0} x2={W} y1={H / 2} y2={H / 2} stroke="#c3cad5" strokeDasharray="5 5" />
                    <motion.path d={d} fill="none" stroke={j.color} strokeWidth={4} vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
                  </svg>
                  {j.phases.map((ph, k) => (
                    <motion.span key={k} className={styles.face} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + k * 0.18 }} style={{ left: `${(xs[k] / W) * 100}%`, top: ys[k] }}>
                      <Face v={ph.emo} size={24} />
                    </motion.span>
                  ))}
                </div>
                <div className={styles.jmGrid} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
                  {j.phases.map((ph, k) => (
                    <div key={"p" + k} className={styles.cell} style={{ background: "#fff6f5" }}>
                      <span className={styles.rowLabel} style={{ color: "#a12622" }}>Pain</span>
                      <span style={{ color: "#a12622" }}>{ph.pain}</span>
                    </div>
                  ))}
                  {j.phases.map((ph, k) => (
                    <div key={"o" + k} className={styles.cell} style={{ background: "#f2faf2" }}>
                      <span className={styles.rowLabel} style={{ color: "#1d5e2a" }}>Opportunity</span>
                      <span style={{ color: "#1d5e2a" }}>{ph.opp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function StoriesExplorer() {
  const [ep, setEp] = useState<string>("E1");
  const list = data.stories.filter((s) => s.epic === ep);
  return (
    <div>
      <div className="tabs">
        {data.epics.map((e) => (
          <button key={e.id} role="tab" className="tab" aria-selected={e.id === ep} onClick={() => setEp(e.id)}>
            {e.id} · {e.name}
          </button>
        ))}
      </div>
      <div className="grid3">
        <AnimatePresence mode="popLayout">
          {list.map((s, k) => (
            <motion.div key={s.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: k * 0.05 }} className={styles.story}>
              <div className={styles.storyTop}>
                <b>{s.id}</b>
                <span className="tag">{s.ev}</span>
                {!["Ananya", "Kabir", "Rohan", "Meera"].includes(s.who) && <span className="tag" style={{ background: "#fff0c2", color: "#7a5a00" }}>stakeholder</span>}
              </div>
              <p>
                As <b>{s.who}</b>, I want to <span className="n">{s.want}</span> so that <span className="i">{s.so}</span>.
              </p>
              <div className={styles.ac}><Check size={14} strokeWidth={2.5} /> Done when: {s.ac}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HMWLenses() {
  const icons = ["🔆", "🧹", "🔄", "❓", "🧩", "✈️"];
  return (
    <div className="grid3">
      {data.hmw.map((h, k) => (
        <motion.div key={h.lens} className="card top" style={{ ["--c" as string]: "#c98a00" }} initial={{ opacity: 0, y: 20, rotate: -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.08 }}>
          <div className={styles.lensIcon}><Ico e={icons[k]} size={22} color="#c98a00" /></div>
          <h4 style={{ fontSize: 18, margin: "6px 0" }}>{h.lens}</h4>
          <p className="muted" style={{ fontSize: 13.5, margin: "0 0 10px" }}>Trigger: {h.trigger}</p>
          {h.qs.map((q) => (
            <p key={q} style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>{q}</p>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function DotVote() {
  return (
    <div className={styles.vote}>
      {data.votes.map((v, k) => (
        <div key={v.id} className={styles.voteRow}>
          <b>{v.id}</b>
          <span>{v.text}</span>
          <span className={styles.dots}>
            {Array.from({ length: v.dots }).map((_, d) => (
              <motion.i key={d} initial={{ y: -24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: k * 0.1 + d * 0.06, type: "spring", stiffness: 400, damping: 18 }} />
            ))}
          </span>
          <span className="tag" style={{ background: v.ps === "PS-1" ? "#dbe9f8" : "#d8eeee" }}>{v.ps}</span>
        </div>
      ))}
    </div>
  );
}

export function Hypotheses() {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.hyps}>
      {data.hyps.map((h, k) => (
        <div key={h.id} className={styles.hyp} data-open={open === k}>
          <button className={styles.hypHead} onClick={() => setOpen(open === k ? -1 : k)} aria-expanded={open === k}>
            <b>{h.id}</b>
            <span className="tag" style={{ background: h.ps === "PS-1" ? "#dbe9f8" : "#d8eeee" }}>{h.ps}</span>
            <span className={styles.hypShort}>{h.sol.charAt(0).toUpperCase() + h.sol.slice(1)}</span>
            <span>{open === k ? "−" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {open === k && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                <div className={styles.hypBody}>
                  <p className={styles.formula}>
                    <span>If we</span> <em className="n">{h.sol}</em> <span>for</span> <em className="u">{h.user}</em>, <span>then</span> <em className="i">{h.ben}</em> <span>because</span> <em>{h.why}</em>, <span>which we will know is true when</span> <mark>{h.metric}</mark>.
                  </p>
                  <div className="grid3" style={{ gap: 10 }}>
                    <div className={styles.mini}><b>Risky assumption</b>{h.assume}</div>
                    <div className={styles.mini}><b>Test method</b>{h.test}</div>
                    <div className={styles.mini} style={{ background: "#fdeceb" }}><b style={{ color: "#a12622" }}>Falsified if</b>{h.fail}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const PRIOR = [
  { l: "Late / unlisted documents", x: 0.78, y: 0.95, c: "#c4453a" },
  { l: "ERP and network failure", x: 0.86, y: 0.72, c: "#c4453a" },
  { l: "Room not ready", x: 0.66, y: 0.8, c: "#c98a00" },
  { l: "Queue and token uncertainty", x: 0.52, y: 0.56, c: "#2a6fb0" },
  { l: "Unclear next desk", x: 0.45, y: 0.5, c: "#2a6fb0" },
  { l: "Repeated verification", x: 0.38, y: 0.44, c: "#1f8f84" },
  { l: "Conflicting answers", x: 0.6, y: 0.4, c: "#1f8f84" },
];

export function PriorityMatrix() {
  return (
    <div className={styles.matrix}>
      <div className={styles.mPlot}>
        <div className={styles.q} style={{ left: "50%", top: 0, background: "#fde7e5" }}><b style={{ color: "#a12622" }}>FIX FIRST</b></div>
        <div className={styles.q} style={{ left: 0, top: 0, background: "#fff7e0" }}>Severe, rarer: safeguard</div>
        <div className={styles.q} style={{ left: 0, top: "50%", background: "#f4f6f8" }}>Monitor</div>
        <div className={styles.q} style={{ left: "50%", top: "50%", background: "#fff1e0" }}>Frequent irritants: quick wins</div>
        {PRIOR.map((p, k) => (
          <motion.div key={p.l} className={styles.dot} initial={{ left: "50%", top: "110%", opacity: 0 }} whileInView={{ left: `${p.x * 100}%`, top: `${(1 - p.y) * 100}%`, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + k * 0.15, type: "spring", stiffness: 120, damping: 16 }}>
            <i style={{ background: p.c }} />
            <span style={{ [p.x > 0.7 ? "right" : "left"]: 22 }}>{p.l}</span>
          </motion.div>
        ))}
      </div>
      <div className={styles.axisX}>How often it appeared in 30 records →</div>
      <div className={styles.axisY}>How badly it hurt →</div>
    </div>
  );
}
