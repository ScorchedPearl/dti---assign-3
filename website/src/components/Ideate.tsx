"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import data from "@/data/content.json";
import styles from "./Ideate.module.css";
import { Ico } from "./icons";
import { ChevronLeft, ChevronRight, Timer, X } from "lucide-react";

const PS_COLOR: Record<string, string> = { "PS-T": "#d64545", "PS-1": "#2a6fb0", "PS-2": "#2a8a7f" };
const MEMBER: Record<string, string> = Object.fromEntries(data.team.map((m) => [m.code, m.color]));
const NAME: Record<string, string> = Object.fromEntries(data.team.map((m) => [m.code, m.name]));

function PSTabs({ value, onChange }: { value: number; onChange: (i: number) => void }) {
  return (
    <div className="tabs" role="tablist">
      {data.ps.map((p, i) => (
        <button key={p.code} role="tab" className="tab" aria-selected={i === value} style={{ ["--c" as string]: p.color }} onClick={() => onChange(i)}>
          {p.code} · {p.theme}
        </button>
      ))}
    </div>
  );
}

const wrapText = (s: string, n: number) => {
  const out: string[] = [];
  let cur = "";
  for (const w of s.split(" ")) {
    if ((cur + " " + w).trim().length > n) {
      out.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) out.push(cur);
  return out;
};

export function MindMaps() {
  const [i, setI] = useState(0);
  const m = data.mindmaps[i];
  const W = 1060;
  const H = 600;
  const cx = W / 2;
  const cy = H / 2;
  const NW = 182;
  const slots = [[0.335, 0.25, -1, 0], [0.665, 0.25, 1, 0], [0.335, 0.75, -1, 1], [0.665, 0.75, 1, 1]];
  const pos: Record<string, [number, number, number]> = {};
  const branches = m.branches.map((b, bi) => {
    const [fx, fy, side, half] = slots[bi];
    const px = W * fx;
    const py = H * fy;
    const [y0, y1] = half === 0 ? [34, cy - 22] : [cy + 22, H - 34];
    const colx = side < 0 ? 14 + NW / 2 : W - 14 - NW / 2;
    const nodes = b.nodes.map(([icon, label], j) => {
      const sy = y0 + ((y1 - y0) * (j + 0.5)) / b.nodes.length;
      pos[label] = [colx, sy, side];
      return { icon, label, x: colx, y: sy };
    });
    return { ...b, px, py, side, nodes };
  });
  return (
    <div>
      <PSTabs value={i} onChange={setI} />
      <div className={styles.mapWrap}>
        <div className="scroll-x">
          <svg key={i} viewBox={`0 0 ${W} ${H}`} className={styles.mapSvg} role="img" aria-label={`Mind map: ${m.center}`}>
            {m.links.map(([a, b, txt], k) => {
              const A = pos[a];
              const Bp = pos[b];
              if (!A || !Bp) return null;
              const x1 = A[0] - (A[2] * NW) / 2;
              const x2 = Bp[0] - (Bp[2] * NW) / 2;
              const y1 = A[1];
              const y2 = Bp[1];
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const [qx, qy] = A[2] === Bp[2] ? [mx + (cx - mx) * 0.55, my + (cy - my) * 0.35] : [cx, my + (my < cy ? -120 : 120)];
              const lx = 0.25 * x1 + 0.5 * qx + 0.25 * x2;
              const ly = 0.25 * y1 + 0.5 * qy + 0.25 * y2;
              return (
                <motion.g key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 + k * 0.2 }}>
                  <path d={`M${x1},${y1} Q${qx},${qy} ${x2},${y2}`} fill="none" stroke="#777" strokeWidth={1.6} strokeDasharray="5 4" />
                  <rect x={lx - txt.length * 3.3 - 7} y={ly - 10} width={txt.length * 6.6 + 14} height={20} rx={10} fill="#fff" stroke="#999" strokeDasharray="3 2" />
                  <text x={lx} y={ly + 4} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="#444">{txt}</text>
                </motion.g>
              );
            })}
            {branches.map((b, bi) => (
              <motion.path key={b.name} d={`M${cx},${cy} Q${b.px},${cy} ${b.px},${b.py}`} stroke={b.color} strokeWidth={9} fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 + bi * 0.15 }} />
            ))}
            {branches.map((b, bi) =>
              b.nodes.map((n, j) => {
                const ex = n.x - (b.side * NW) / 2;
                return (
                  <motion.path key={n.label + "l"} d={`M${b.px},${b.py} C${(b.px + ex) / 2},${b.py} ${(b.px + ex) / 2},${n.y} ${ex},${n.y}`} stroke={b.color} strokeWidth={3} fill="none" opacity={0.75} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.9 + bi * 0.2 + j * 0.08 }} />
                );
              }),
            )}
            {branches.map((b, bi) =>
              b.nodes.map((n, j) => {
                const lines = wrapText(n.label, 21);
                const h = 16 + 13 * lines.length;
                return (
                  <motion.g key={n.label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + bi * 0.2 + j * 0.08 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                    <rect x={n.x - NW / 2} y={n.y - h / 2} width={NW} height={h} rx={9} fill="#fff" stroke={b.color} strokeWidth={2} />
                    <Ico e={n.icon} x={n.x - NW / 2 + 8} y={n.y - 8} size={16} color={b.color} />
                    {lines.map((ln, k) => (
                      <text key={k} x={n.x + 12} y={n.y + 4 - ((lines.length - 1) * 13) / 2 + k * 13} fontSize={10.6} textAnchor="middle" fill="#222">{ln}</text>
                    ))}
                  </motion.g>
                );
              }),
            )}
            {branches.map((b, bi) => {
              const lines = wrapText(b.name, 16);
              const h = 30 + 15 * lines.length;
              return (
                <motion.g key={b.name + "p"} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + bi * 0.15, type: "spring" }} style={{ transformOrigin: `${b.px}px ${b.py}px` }}>
                  <rect x={b.px - 85} y={b.py - h / 2} width={170} height={h} rx={14} fill={b.color} />
                  <Ico e={b.icon} x={b.px - 9} y={b.py - h / 2 + 7} size={18} color="#fff" />
                  {lines.map((ln, k) => (
                    <text key={k} x={b.px} y={b.py + 12 - ((lines.length - 1) * 15) / 2 + k * 15} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="#fff">{ln}</text>
                  ))}
                </motion.g>
              );
            })}
            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <ellipse cx={cx} cy={cy} rx={110} ry={54} fill="#17375E" stroke="#fff" strokeWidth={4} />
              {wrapText(m.center, 15).map((ln, k, arr) => (
                <text key={k} x={cx} y={cy + 6 - ((arr.length - 1) * 18) / 2 + k * 18} textAnchor="middle" fontSize={15.5} fontWeight={800} fill="#fff">{ln}</text>
              ))}
            </motion.g>
          </svg>
        </div>
        <div className="grid3" style={{ marginTop: 12 }}>
          {m.insights.map((s, k) => (
            <div key={k} className={styles.insight} style={{ borderColor: PS_COLOR[m.ps] }}>
              <b style={{ color: PS_COLOR[m.ps] }}>Insight {k + 1}.</b> {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Boards() {
  const [i, setI] = useState(1);
  const b = data.boards[i];
  let count = 0;
  return (
    <div>
      <PSTabs value={i} onChange={setI} />
      <div className={styles.board}>
        <div className={styles.boardHead}>
          <div>
            <b>{b.title}</b>
            <div className={styles.boardHmw}>HMW: {b.hmw}</div>
          </div>
          <span className={styles.timer}><Timer size={14} /> 15:00</span>
        </div>
        <div className={styles.clusters}>
          {b.clusters.map((c) => (
            <div key={c.label} className={styles.cluster} style={{ borderColor: c.color }}>
              <div className={styles.clHead} style={{ background: c.color }}>
                <span className={styles.clTitle}><Ico e={c.icon} size={17} color="#fff" /> {c.label}</span> <span>{c.notes.length} ideas</span>
              </div>
              <div className={styles.notes}>
                {c.notes.map((n) => {
                  const k = count++;
                  return (
                    <motion.div key={`${i}-${n.n}`} className={styles.note} style={{ background: MEMBER[n.by], rotate: [-2, 1.5, -1, 2, -0.5, 1][k % 6] }} initial={{ opacity: 0, y: -40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: k * 0.05, type: "spring", stiffness: 260, damping: 20 }} title={`by ${NAME[n.by]}`}>
                      <span className={styles.by}>{n.by}</span>
                      <b>#{n.n}</b> {n.text}
                      {n.yes && (
                        <div className={styles.yes} style={{ background: MEMBER[n.yes.by] }}>
                          <b>YES, AND… ({n.yes.by})</b> {n.yes.text}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.legend}>
          {data.team.map((m) => (
            <span key={m.code} style={{ background: m.color }}>{m.code} {m.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Scamper() {
  const [i, setI] = useState(2);
  const [open, setOpen] = useState(0);
  const s = data.scamper[i];
  const col = PS_COLOR[s.ps];
  return (
    <div>
      <PSTabs value={i} onChange={(k) => { setI(k); setOpen(0); }} />
      <div className="callout" style={{ ["--c" as string]: col, marginBottom: 14 }}>
        <b style={{ color: col }}>Existing feature: {s.feature}</b>
        <div className="muted" style={{ fontSize: 15 }}>{s.before}</div>
      </div>
      <div className={styles.scamper}>
        <div className={styles.letters}>
          {s.rows.map((r, k) => (
            <button key={r.l} onClick={() => setOpen(k)} className={styles.letter} style={{ background: open === k ? col : "#fff", color: open === k ? "#fff" : col, borderColor: col }} aria-pressed={open === k}>
              <b>{r.l}</b>
              <span>{r.name}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={`${i}-${open}`} className={styles.scDetail} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} style={{ borderColor: col }}>
            <div className={styles.bigLetter} style={{ color: col }}>{s.rows[open].l}</div>
            <h4>{s.rows[open].name}</h4>
            <p className={styles.scIdea}>{s.rows[open].idea}</p>
            <p className="muted"><b>User benefit:</b> {s.rows[open].why}</p>
            <div className={styles.meters}>
              <Meter label="Impact" v={s.rows[open].impact} c={col} />
              <Meter label="Feasibility" v={s.rows[open].feas} c={col} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Meter({ label, v, c }: { label: string; v: number; c: string }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label} {v}/5</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((k) => (
          <motion.i key={k} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: k * 0.06 }} style={{ display: "block", width: 30, height: 12, borderRadius: 3, background: k <= v ? c : "#e2e7ee", transformOrigin: "bottom" }} />
        ))}
      </div>
    </div>
  );
}

export type GalleryItem = { src: string; title: string; by?: string };

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o == null ? o : (o + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o == null ? o : (o - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);
  return (
    <>
      <div className={styles.gallery}>
        {items.map((it, k) => (
          <motion.button key={it.src} className={styles.thumb} onClick={() => setOpen(k)} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (k % 4) * 0.06 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.title} loading="lazy" />
            <span><b>{it.title}</b>{it.by && <em>{it.by}</em>}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open != null && (
          <motion.div className={styles.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.figure initial={{ scale: 0.94 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={items[open].src} alt={items[open].title} />
              <figcaption>
                <span>{items[open].title}{items[open].by ? ` · ${items[open].by}` : ""}</span>
                <span>
                  <button onClick={() => setOpen((open - 1 + items.length) % items.length)} aria-label="Previous"><ChevronLeft size={18} /></button>
                  <button onClick={() => setOpen((open + 1) % items.length)} aria-label="Next"><ChevronRight size={18} /></button>
                  <button onClick={() => setOpen(null)} aria-label="Close"><X size={18} /></button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
