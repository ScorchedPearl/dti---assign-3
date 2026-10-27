"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const LINKS = [
  ["problem", "Problem"],
  ["empathize", "Empathize"],
  ["define", "Define · A2"],
  ["ideate", "Ideate · A3"],
  ["solution", "Solution"],
  ["team", "Team"],
];

export default function Nav() {
  const [active, setActive] = useState("problem");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      let cur = "problem";
      for (const [id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <span>G10</span> IIITA Registration
        </a>
        <div className={styles.links}>
          {LINKS.map(([id, l]) => (
            <a key={id} href={`#${id}`} className={active === id ? styles.on : undefined}>{l}</a>
          ))}
        </div>
      </div>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}
