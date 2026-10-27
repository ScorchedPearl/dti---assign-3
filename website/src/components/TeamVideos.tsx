"use client";

import { useState } from "react";
import data from "@/data/content.json";
import VishwasVideo from "@/videos/VishwasVideo";
import { MemberVideo } from "@/videos/member/members";

/** One walkthrough video per team member, switched with name chips. */
export default function TeamVideos() {
  const [code, setCode] = useState("SD");
  return (
    <div>
      <div role="tablist" aria-label="Choose a team member" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {data.team.map((m) => {
          const on = m.code === code;
          return (
            <button
              key={m.code}
              role="tab"
              aria-selected={on}
              onClick={() => setCode(m.code)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px 7px 7px", borderRadius: 99, cursor: "pointer",
                border: `1.5px solid ${on ? "var(--ink, #17375e)" : "rgba(0,0,0,.12)"}`, background: on ? "var(--ink, #17375e)" : "#fff",
                color: on ? "#fff" : "inherit", fontWeight: 600, fontSize: 15, fontFamily: "inherit",
              }}
            >
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: m.color, color: "#0b1a2e", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{m.code}</span>
              {m.name}
            </button>
          );
        })}
      </div>
      {code === "VS" ? <VishwasVideo key="VS" /> : <MemberVideo key={code} code={code} />}
    </div>
  );
}
