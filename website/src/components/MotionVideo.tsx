"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { clamp, fmt } from "@/lib/anim";
import styles from "./MotionVideo.module.css";
import { Maximize, Pause, Play, RotateCcw } from "lucide-react";

export type Scene = {
  title: string;
  dur: number;
  caption: string;
  render: (t: number) => ReactNode;
};

const W = 1280;
const H = 720;

export default function MotionVideo({
  id,
  label,
  title,
  scenes,
  accent = "#2fb8a6",
}: {
  id?: string;
  label: string;
  title: string;
  scenes: Scene[];
  accent?: string;
}) {
  const total = scenes.reduce((s, x) => s + x.dur, 0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const last = useRef<number | null>(null);

  // timeline clock
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = (now: number) => {
      if (last.current != null) {
        const dt = (now - last.current) / 1000;
        setTime((t) => {
          const n = t + dt;
          if (n >= total) {
            setPlaying(false);
            return total;
          }
          return n;
        });
      }
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      last.current = null;
    };
  }, [playing, total]);

  // fit the fixed 1280x720 canvas to the container
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // pause when scrolled out of view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) setPlaying(false);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = useCallback(() => {
    setStarted(true);
    if (time >= total) setTime(0);
    setPlaying((p) => !p);
  }, [time, total]);

  const seek = (s: number) => {
    setStarted(true);
    setTime(clamp(s, 0, total - 0.01));
  };

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  // find current scene
  let acc = 0;
  let idx = 0;
  for (let i = 0; i < scenes.length; i++) {
    if (time < acc + scenes[i].dur || i === scenes.length - 1) {
      idx = i;
      break;
    }
    acc += scenes[i].dur;
  }
  const scene = scenes[idx];
  const local = time - acc;
  const fade = Math.min(clamp(local / 0.35), clamp((scene.dur - local) / 0.35), 1);
  const ended = time >= total;

  return (
    <figure
      id={id}
      ref={wrapRef}
      className={styles.wrap}
      style={{ ["--accent" as string]: accent }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "k") {
          e.preventDefault();
          toggle();
        }
        if (e.key === "ArrowRight") seek(time + 5);
        if (e.key === "ArrowLeft") seek(time - 5);
      }}
    >
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.dur}>{fmt(total)}</span>
      </div>

      <div ref={stageRef} className={styles.stage} onClick={toggle} style={{ height: H * scale }}>
        <div className={styles.canvas} style={{ transform: `scale(${scale})`, width: W, height: H }}>
          <div className={styles.bgGrid} />
          <div style={{ position: "absolute", inset: 0, opacity: started ? fade : 1 }}>
            {started ? scene.render(local) : scenes[0].render(Math.min(scenes[0].dur * 0.75, 6))}
          </div>
          <div className={styles.sceneTag}>
            {idx + 1}/{scenes.length} · {scene.title}
          </div>
        </div>

        {(!started || ended) && <div className={styles.dim} />}
        {(!started || ended) && (
          <button className={styles.bigPlay} aria-label={ended ? "Replay" : "Play"} onClick={(e) => { e.stopPropagation(); toggle(); }}>
            {ended ? <RotateCcw size={22} /> : <Play size={22} fill="currentColor" />}
            <span>{ended ? "Replay" : "Play video"}</span>
          </button>
        )}
        {started && !playing && !ended && (
          <button className={styles.resume} onClick={(e) => { e.stopPropagation(); toggle(); }}><Play size={14} fill="currentColor" /> Resume</button>
        )}
      </div>

      <div className={styles.caption} aria-live="polite">{started ? scene.caption : "Press play. Use the chapter bar to jump to any part."}</div>

      <div className={styles.controls}>
        <button onClick={toggle} className={styles.btn} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={16} fill="currentColor" /> : ended ? <RotateCcw size={16} /> : <Play size={16} fill="currentColor" />}
        </button>
        <div
          className={styles.bar}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(((e.clientX - r.left) / r.width) * total);
          }}
        >
          {scenes.map((s, i) => {
            const start = scenes.slice(0, i).reduce((a, x) => a + x.dur, 0);
            const fill = clamp((time - start) / s.dur);
            return (
              <div key={i} className={styles.seg} style={{ flex: s.dur }} title={s.title}>
                <div className={styles.segFill} style={{ width: `${fill * 100}%` }} />
              </div>
            );
          })}
        </div>
        <span className={styles.time}>{fmt(time)} / {fmt(total)}</span>
        <button onClick={fullscreen} className={styles.btn} aria-label="Fullscreen"><Maximize size={16} /></button>
      </div>

      <div className={styles.chapters}>
        {scenes.map((s, i) => {
          const start = scenes.slice(0, i).reduce((a, x) => a + x.dur, 0);
          return (
            <button key={i} className={i === idx && started ? styles.chapOn : styles.chap} onClick={() => { seek(start); setPlaying(true); }}>
              <b>{i + 1}</b> {s.title}
            </button>
          );
        })}
      </div>
    </figure>
  );
}
