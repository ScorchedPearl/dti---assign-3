"""Shared styling and SVG helpers for the DTI Define + Ideation reports."""
import html, math

# ---- EDIT TEAM DETAILS HERE -------------------------------------------------
TEAM = [
    ("SD", "Sudhanshu", "IIT2024081"),
    ("VS", "Vishwas", "IIT2024087"),
    ("VR", "Vichanshu Raj", "IIT2024083"),
    ("SS", "Saumya Sood", "IIT2024018"),
    ("ST", "Satwik Santosh", "IIT2024084"),
    ("KM", "Kyan Mahajan", "IIT2024092"),
    ("AP", "Akshat Parmar", "IIT2024077"),
    ("SR", "Sarthak Sharma", "IIT2024043"),
]
GROUP = "Group 10"
# -----------------------------------------------------------------------------

NAVY = "#17375E"
TEAL = "#1F6F78"
MEMBER_COLORS = {"SD": "#FFE58F", "VS": "#B7EB8F", "VR": "#91D5FF", "SS": "#FFADD2",
                 "ST": "#FFC69A", "KM": "#D3ADF7", "AP": "#87E8DE", "SR": "#E6F59A"}

e = html.escape


def css(stage_label):
    return f"""
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
@page {{
  size: A4; margin: 20mm 17mm 18mm 17mm;
  @top-right {{ content: "IIITA Registration Experience Research"; font: 8.5pt Inter, Arial, sans-serif; color: #777; }}
  @bottom-right {{ content: "{stage_label}   " counter(page); font: 8.5pt Inter, Arial, sans-serif; color: #555; }}
}}
@page wide {{
  size: A4 landscape; margin: 14mm 13mm 13mm 13mm;
  @top-right {{ content: "IIITA Registration Experience Research"; font: 8pt Inter, Arial, sans-serif; color: #777; }}
  @bottom-right {{ content: "{stage_label}   " counter(page); font: 8pt Inter, Arial, sans-serif; color: #555; }}
}}
@page cover {{ @top-right {{ content: none; }} @bottom-right {{ content: none; }} }}
* {{ box-sizing: border-box; }}
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ font-family: Inter, Arial, Helvetica, sans-serif; font-size: 9.1pt; line-height: 1.42; color: #1b1b1b; margin: 0; }}
h1, h2, h3, h4 {{ font-family: 'Exo 2', Arial, sans-serif; color: #000; margin: 0; }}
h1.title {{ font-size: 33pt; line-height: 1.08; font-weight: 800; margin: 6mm 0 3mm; }}
h2 {{ font-size: 19pt; font-weight: 800; margin: 0 0 3mm; }}
h3 {{ font-size: 12.5pt; font-weight: 700; margin: 4.5mm 0 2mm; break-after: avoid; }}
h4 {{ font-size: 10.5pt; font-weight: 700; margin: 3mm 0 1.5mm; color: {TEAL}; }}
p {{ margin: 0 0 2.4mm; }}
ul, ol {{ margin: 0 0 2.5mm; padding-left: 5mm; }}
li {{ margin-bottom: 1mm; }}
.kicker {{ font-family: Inter, Arial; color: {TEAL}; font-weight: 600; letter-spacing: .02em; font-size: 11pt; text-transform: uppercase; }}
.subtitle {{ font-family: 'Exo 2'; font-size: 16pt; color: #666; font-weight: 500; margin-bottom: 9mm; }}
.section {{ break-before: page; }}
.wide {{ page: wide; break-before: page; }}
.cover {{ page: cover; padding-top: 8mm; }}
.avoid {{ break-inside: avoid; }}
table {{ width: 100%; border-collapse: collapse; margin: 1.5mm 0 4mm; font-size: 8.8pt; }}
th {{ background: {NAVY}; color: #fff; font-weight: 600; text-align: left; padding: 2.2mm 2.4mm; border: 1px solid #d5dbe3; }}
td {{ padding: 2mm 2.4mm; border: 1px solid #d5dbe3; vertical-align: top; }}
tr:nth-child(even) td {{ background: #f3f6fa; }}
tr {{ break-inside: avoid; }}
table.kv td:first-child {{ background: #dce6f0; font-weight: 600; width: 45%; }}
table.kv tr:nth-child(even) td:last-child {{ background: #fff; }}
.callout {{ border-left: 4px solid {TEAL}; background: #eef6f7; padding: 3mm 4mm; margin: 2mm 0 4mm; break-inside: avoid; }}
.callout.navy {{ border-color: {NAVY}; background: #eef2f8; }}
.callout.amber {{ border-color: #c98a00; background: #fff7e0; }}
.callout b.lbl {{ display: block; font-family: 'Exo 2'; font-size: 10.5pt; color: {TEAL}; margin-bottom: 1mm; }}
.statement {{ font-family: 'Exo 2'; font-size: 11.5pt; line-height: 1.4; font-weight: 600; color: #10243f; }}
.u {{ color: #2f7d32; font-weight: 700; }} .n {{ color: #1f4e9c; font-weight: 700; }} .i {{ color: #c25b00; font-weight: 700; }}
.tag {{ display: inline-block; font-size: 7.4pt; font-weight: 700; padding: .3mm 1.6mm; border-radius: 2mm; background: #dce6f0; color: {NAVY}; margin-right: 1mm; white-space: nowrap; }}
.tag.t {{ background: #d8eeee; color: {TEAL}; }} .tag.r {{ background: #fde2e1; color: #a12622; }} .tag.g {{ background: #def3dc; color: #276b22; }} .tag.y {{ background: #fff0c2; color: #7a5a00; }}
.grid2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }}
.grid3 {{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3.5mm; }}
.card {{ border: 1px solid #d5dbe3; border-radius: 2mm; padding: 3mm 3.5mm; break-inside: avoid; background: #fff; }}
.card h4 {{ margin-top: 0; }}
.madlib {{ border: 1.5px solid #333; padding: 3mm 4mm; font-size: 10.5pt; line-height: 1.5; background: #fffdf6; break-inside: avoid; }}
.toc td {{ border: none; padding: 1mm 0; background: #fff !important; font-size: 10pt; }}
.toc td:nth-child(2), .toc td:nth-child(4) {{ text-align: right; padding-right: 6mm; width: 8%; }}
table.tight {{ font-size: 8.1pt; }} table.tight td {{ padding: 1.5mm 2mm; }}
.small {{ font-size: 8.2pt; color: #555; }}
.muted {{ color: #666; }}
.figcap {{ font-size: 8.2pt; color: #555; margin-top: 1mm; text-align: center; }}
.pill {{ display:inline-block; border-radius: 3mm; padding: .5mm 2.2mm; font-size: 8pt; font-weight: 600; color:#fff; }}
svg text {{ font-family: Inter, Arial, sans-serif; }}
"""


def doc(title, stage_label, body):
    return f"""<!doctype html><html><head><meta charset="utf-8"><title>{e(title)}</title>
<style>{css(stage_label)}</style></head><body>{body}</body></html>"""


def table(headers, rows, widths=None, cls=""):
    cols = "".join(f'<col style="width:{w}">' for w in widths) if widths else ""
    th = "".join(f"<th>{h}</th>" for h in headers)
    tr = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return f'<table class="{cls}"><colgroup>{cols}</colgroup><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table>'


def kv(rows):
    return '<table class="kv"><tbody>' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in rows) + "</tbody></table>"


def team_table():
    rows = [(e(n), e(r), f'<span class="tag" style="background:{MEMBER_COLORS[c]};color:#222">{c}</span>') for c, n, r in TEAM]
    return table(["Team member", "Roll number", "Sticky-note code"], rows, ["50%", "30%", "20%"])


# ---------------------------------------------------------------------------
# SVG text wrapping
def wrap(text, width_chars):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + (1 if cur else 0) > width_chars:
            lines.append(cur); cur = w
        else:
            cur = (cur + " " + w) if cur else w
    if cur:
        lines.append(cur)
    return lines


def svg_lines(x, y, lines, size=11, lh=1.25, anchor="middle", weight=400, fill="#222"):
    out = []
    y0 = y - (len(lines) - 1) * size * lh / 2
    for k, ln in enumerate(lines):
        out.append(f'<text x="{x:.1f}" y="{y0 + k*size*lh:.1f}" font-size="{size}" text-anchor="{anchor}" '
                   f'dominant-baseline="middle" font-weight="{weight}" fill="{fill}">{e(ln)}</text>')
    return "".join(out)


# ---------------------------------------------------------------------------
# Mind map
def mind_map(center, branches, links=(), W=1060, H=600):
    """branches: 4 dicts(name, icon, color, nodes=[(icon, label), ...]) in order TL, TR, BL, BR"""
    cx, cy = W / 2, H / 2
    parts = [f'<svg viewBox="0 0 {W} {H}" style="width:100%;height:136mm" xmlns="http://www.w3.org/2000/svg">',
             f'<rect width="{W}" height="{H}" fill="#fbfbf8" rx="10"/>']
    slots = [(0.335, 0.25, -1, 0), (0.665, 0.25, 1, 0), (0.335, 0.75, -1, 1), (0.665, 0.75, 1, 1)]
    node_pos, prim, sec = {}, [], []
    NW = 182
    for b, (fx, fy, side, half) in zip(branches, slots):
        px, py = W * fx, H * fy
        prim.append((px, py, b))
        k = len(b["nodes"])
        y0, y1 = (34, cy - 22) if half == 0 else (cy + 22, H - 34)
        colx = 14 + NW / 2 if side < 0 else W - 14 - NW / 2
        for j, (icon, label) in enumerate(b["nodes"]):
            sy = y0 + (y1 - y0) * (j + .5) / k
            sec.append((colx, sy, px, py, side, icon, label, b))
            node_pos[label] = (colx, sy, side)
    for a, bnode, txt in links:
        if a in node_pos and bnode in node_pos:
            x1, y1, s1 = node_pos[a]; x2, y2, s2 = node_pos[bnode]
            x1 -= s1 * NW / 2; x2 -= s2 * NW / 2
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2
            qx, qy = (mx + (cx - mx) * 0.55, my + (cy - my) * 0.35) if s1 == s2 else (cx, my + (-120 if my < cy else 120))
            lx, ly = .25 * x1 + .5 * qx + .25 * x2, .25 * y1 + .5 * qy + .25 * y2
            parts.append(f'<path d="M{x1:.0f},{y1:.0f} Q{qx:.0f},{qy:.0f} {x2:.0f},{y2:.0f}" fill="none" stroke="#777" stroke-width="1.6" stroke-dasharray="5 4"/>')
            parts.append(f'<rect x="{lx-len(txt)*3.2-7:.0f}" y="{ly-9:.0f}" width="{len(txt)*6.4+14:.0f}" height="18" rx="9" fill="#fff" stroke="#999" stroke-dasharray="3 2"/>')
            parts.append(svg_lines(lx, ly, [txt], 9.5, fill="#444", weight=600))
    for px, py, b in prim:
        parts.append(f'<path d="M{cx:.0f},{cy:.0f} Q{px:.0f},{cy:.0f} {px:.0f},{py:.0f}" stroke="{b["color"]}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".9"/>')
    for sx, sy, px, py, side, icon, label, b in sec:
        ex = sx - side * NW / 2
        parts.append(f'<path d="M{px:.0f},{py:.0f} C{(px+ex)/2:.0f},{py:.0f} {(px+ex)/2:.0f},{sy:.0f} {ex:.0f},{sy:.0f}" stroke="{b["color"]}" stroke-width="3" fill="none" opacity=".75"/>')
    for sx, sy, px, py, side, icon, label, b in sec:
        lines = wrap(label, 21)
        h = 16 + 13 * len(lines)
        parts.append(f'<rect x="{sx-NW/2:.0f}" y="{sy-h/2:.0f}" width="{NW}" height="{h}" rx="9" fill="#fff" stroke="{b["color"]}" stroke-width="2"/>')
        parts.append(f'<text x="{sx-NW/2+16:.0f}" y="{sy+1:.0f}" font-size="15" dominant-baseline="middle" text-anchor="middle">{icon}</text>')
        parts.append(svg_lines(sx + 12, sy, lines, 10.4, fill="#222"))
    for px, py, b in prim:
        lines = wrap(b["name"], 16)
        w, h = 170, 30 + 15 * len(lines)
        parts.append(f'<rect x="{px-w/2:.0f}" y="{py-h/2:.0f}" width="{w}" height="{h}" rx="14" fill="{b["color"]}"/>')
        parts.append(f'<text x="{px:.0f}" y="{py-h/2+15:.0f}" font-size="16" text-anchor="middle" dominant-baseline="middle">{b["icon"]}</text>')
        parts.append(svg_lines(px, py + 8, lines, 12.5, weight=700, fill="#fff"))
    lines = wrap(center, 15)
    parts.append(f'<ellipse cx="{cx}" cy="{cy}" rx="110" ry="{36 + 9*len(lines)}" fill="{NAVY}" stroke="#fff" stroke-width="4"/>')
    parts.append(svg_lines(cx, cy, lines, 15.5, weight=800, fill="#fff"))
    parts.append("</svg>")
    return "".join(parts)


def mind_legend(branches, extra=""):
    chips = "".join(f'<span class="pill" style="background:{b["color"]};margin-right:2mm">{b["icon"]} {e(b["name"])}</span>' for b in branches)
    return f'<div class="small" style="margin-top:1.5mm">{chips} <span style="margin-left:2mm">- - - dashed line = linked concept</span> {extra}</div>'


# ---------------------------------------------------------------------------
# Brainstorm board
def sticky(note, idx):
    code, text = note[0], note[1]
    yes_and = note[2] if len(note) > 2 else None
    rot = [-2.2, 1.6, -1.1, 2.0, -0.6, 1.2][idx % 6]
    color = MEMBER_COLORS[code]
    ya = ""
    if yes_and:
        bc, bt = yes_and
        ya = (f'<div style="margin:1.4mm -1mm -1mm 3mm;background:{MEMBER_COLORS[bc]};border:1px dashed #555;padding:1.4mm 1.8mm;'
              f'font-size:8pt;transform:rotate(1.5deg)"><b style="color:#a12622">YES, AND… ({bc})</b> {e(bt)}</div>')
    return (f'<div style="background:{color};padding:2.2mm 6mm 2.4mm 2.4mm;border-bottom:2px solid rgba(0,0,0,.18);transform:rotate({rot}deg);'
            f'font-size:8.8pt;line-height:1.32;break-inside:avoid;position:relative">'
            f'<span style="position:absolute;top:1mm;right:1.6mm;font-size:6.6pt;font-weight:700;color:#555">{code}</span>'
            f'<b style="font-size:7pt;color:#555">#{note[3] if len(note) > 3 else ""}</b> {e(text)}{ya}</div>')


def board(title, hmw, clusters):
    """clusters: list of (label, icon, color, notes) ; note = (code, text, yes_and|None, number)"""
    cols = []
    for label, icon, color, notes in clusters:
        stickies = "".join(sticky(nt, k) for k, nt in enumerate(notes))
        cols.append(f'<div style="border:2px dashed {color};border-radius:3mm;padding:2.5mm;background:#fff">'
                    f'<div style="background:{color};color:#fff;font-family:\'Exo 2\';font-weight:700;font-size:10.5pt;padding:1.6mm 2.5mm;border-radius:2mm;margin-bottom:2.6mm">{icon} {e(label)} <span style="float:right;font-size:8.5pt;opacity:.9">{len(notes)} ideas</span></div>'
                    f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:3.4mm 2.6mm">{stickies}</div></div>')
    legend = " ".join(f'<span class="tag" style="background:{MEMBER_COLORS[c]};color:#222">{c} {e(n)}</span>' for c, n, _ in TEAM)
    return (f'<div style="background:#e9e4d8;border-radius:3mm;padding:3mm;border:1px solid #cfc6b2">'
            f'<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2.5mm">'
            f'<div><div style="font-family:\'Exo 2\';font-weight:800;font-size:12.5pt">{e(title)}</div>'
            f'<div style="font-size:8.6pt;color:#333"><b>HMW:</b> {e(hmw)}</div></div>'
            f'<div style="background:#222;color:#fff;font-weight:700;font-size:8pt;padding:1mm 2.5mm;border-radius:2mm;white-space:nowrap">⏱ 15:00 timed session</div></div>'
            f'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm">{"".join(cols)}</div>'
            f'<div class="small" style="margin-top:2mm">Sticky colour = author: {legend} &nbsp;|&nbsp; dashed attached note = “Yes, and…” build by a teammate</div></div>')


# ---------------------------------------------------------------------------
# Journey map
FACES = {2: "😄", 1: "🙂", 0: "😐", -1: "😟", -2: "😫"}


def journey_map(persona, scenario, goal, expectations, phases, color):
    """phases: list of dict(name, doing:list, touch, think, emo(int -2..2), pain, opp)"""
    n = len(phases)
    W, H = 1000, 112
    lab = 0
    colw = (W - lab) / n
    pts = []
    for k, ph in enumerate(phases):
        x = lab + colw * (k + .5)
        y = H / 2 - ph["emo"] * 22
        pts.append((x, y, ph["emo"]))
    d = f"M{pts[0][0]:.0f},{pts[0][1]:.0f} "
    for k in range(1, n):
        x0, y0, _ = pts[k - 1]; x1, y1, _ = pts[k]
        d += f"C{(x0+x1)/2:.0f},{y0:.0f} {(x0+x1)/2:.0f},{y1:.0f} {x1:.0f},{y1:.0f} "
    svg = [f'<svg viewBox="0 0 {W} {H}" width="100%" preserveAspectRatio="none" style="display:block">']
    svg.append(f'<rect x="0" y="0" width="{W}" height="{H/2}" fill="#eef8ee"/><rect x="0" y="{H/2}" width="{W}" height="{H/2}" fill="#fdf0ef"/>')
    svg.append(f'<line x1="0" x2="{W}" y1="{H/2}" y2="{H/2}" stroke="#bbb" stroke-dasharray="4 4"/>')
    for k in range(1, n):
        svg.append(f'<line x1="{colw*k:.0f}" x2="{colw*k:.0f}" y1="0" y2="{H}" stroke="#d5dbe3"/>')
    svg.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="4"/>')
    for x, y, emo in pts:
        svg.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="13" fill="#fff" stroke="{color}" stroke-width="3"/>')
        svg.append(f'<text x="{x:.0f}" y="{y+1:.0f}" font-size="15" text-anchor="middle" dominant-baseline="middle">{FACES[emo]}</text>')
    svg.append("</svg>")
    curve = "".join(svg)

    def row(label, cells, bg="#fff"):
        tds = "".join(f'<td style="background:{bg}">{c}</td>' for c in cells)
        return f'<tr><th style="writing-mode:vertical-rl;transform:rotate(180deg);text-align:center;width:9mm;padding:1mm;font-size:8pt">{label}</th>{tds}</tr>'

    head = "".join(f'<th style="background:{color};text-align:center;font-family:\'Exo 2\';font-size:9.5pt">{k+1}. {e(p["name"])}</th>' for k, p in enumerate(phases))
    rows = [
        row("Doing", ["<ul style='margin:0;padding-left:3.5mm'>" + "".join(f"<li>{e(a)}</li>" for a in p["doing"]) + "</ul>" for p in phases]),
        row("Touchpoints", [f'<span class="small">{e(p["touch"])}</span>' for p in phases], "#f7f9fb"),
        row("Thinking", [f'<div style="background:#fff;border:1px solid #bbb;border-radius:3mm;padding:1.3mm 2mm;font-style:italic">“{e(p["think"])}”</div>' for p in phases]),
        f'<tr><th style="writing-mode:vertical-rl;transform:rotate(180deg);text-align:center;padding:1mm;font-size:8pt">Feeling</th><td colspan="{n}" style="padding:0;background:#fff">{curve}</td></tr>',
        row("Pain points", [f'<span style="color:#a12622">{e(p["pain"])}</span>' for p in phases], "#fff6f5"),
        row("Opportunities", [f'<span style="color:#1d5e2a">{e(p["opp"])}</span>' for p in phases], "#f2faf2"),
    ]
    header = (f'<div style="display:grid;grid-template-columns:1.1fr 1.6fr 1.1fr 1.2fr;gap:2.5mm;margin-bottom:1.5mm;font-size:7.8pt">'
              f'<div class="card" style="border-color:{color};padding:2mm 3mm"><b style="color:{color}">ACTOR</b><br>{persona}</div>'
              f'<div class="card" style="padding:2mm 3mm"><b style="color:{color}">SCENARIO</b><br>{e(scenario)}</div>'
              f'<div class="card" style="padding:2mm 3mm"><b style="color:{color}">GOAL</b><br>{e(goal)}</div>'
              f'<div class="card" style="padding:2mm 3mm"><b style="color:{color}">EXPECTATIONS</b><br>{e(expectations)}</div></div>')
    return header + (f'<table style="table-layout:fixed;font-size:7.3pt;line-height:1.3;margin:0"><thead><tr><th style="width:9mm;background:#fff;border:none"></th>{head}</tr></thead>'
                     f'<tbody>{"".join(rows)}</tbody></table>')


# ---------------------------------------------------------------------------
def matrix_2x2(points, xlab, ylab, quads, W=640, H=430, title=""):
    """points: (label, x0..1, y0..1, color). quads: TL, TR, BL, BR labels"""
    m = 52
    pw, ph = W - m - 20, H - m - 24
    s = [f'<svg viewBox="0 0 {W} {H}" width="100%" xmlns="http://www.w3.org/2000/svg">']
    s.append(f'<rect x="{m}" y="14" width="{pw/2}" height="{ph/2}" fill="#fff7e0"/><rect x="{m+pw/2}" y="14" width="{pw/2}" height="{ph/2}" fill="#fde7e5"/>')
    s.append(f'<rect x="{m}" y="{14+ph/2}" width="{pw/2}" height="{ph/2}" fill="#f4f6f8"/><rect x="{m+pw/2}" y="{14+ph/2}" width="{pw/2}" height="{ph/2}" fill="#fff1e0"/>')
    s.append(f'<rect x="{m}" y="14" width="{pw}" height="{ph}" fill="none" stroke="#555"/>')
    qpos = [(m + 8, 30, "start"), (m + pw - 8, 30, "end"), (m + 8, 14 + ph - 10, "start"), (m + pw - 8, 14 + ph - 10, "end")]
    for (x, y, a), q in zip(qpos, quads):
        s.append(f'<text x="{x}" y="{y}" font-size="11" font-weight="700" fill="#555" text-anchor="{a}">{e(q)}</text>')
    for lbl, x, y, c in points:
        X, Y = m + x * pw, 14 + (1 - y) * ph
        s.append(f'<circle cx="{X:.0f}" cy="{Y:.0f}" r="8" fill="{c}" stroke="#fff" stroke-width="2"/>')
        anchor = "end" if x > .72 else "start"
        dx = -12 if anchor == "end" else 12
        s.append(f'<text x="{X+dx:.0f}" y="{Y+4:.0f}" font-size="11" font-weight="600" fill="#1b1b1b" text-anchor="{anchor}">{e(lbl)}</text>')
    s.append(f'<text x="{m+pw/2}" y="{H-4}" font-size="11.5" text-anchor="middle" font-weight="600">{e(xlab)} →</text>')
    s.append(f'<text transform="translate(16,{14+ph/2}) rotate(-90)" font-size="11.5" text-anchor="middle" font-weight="600">{e(ylab)} →</text>')
    s.append("</svg>")
    return "".join(s)
