import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { BorrowedConfidence, EmotionJourney, EmpathyMap, PainToNeed, ThemeBars } from "@/components/Empathize";
import { DotVote, HMWLenses, Hypotheses, PersonaJourney, PriorityMatrix, StoriesExplorer } from "@/components/Define";
import { Boards, Gallery, MindMaps, Scamper, type GalleryItem } from "@/components/Ideate";
import ProblemVideo from "@/videos/ProblemVideo";
import EmpathizeVideo from "@/videos/EmpathizeVideo";
import DefineVideo from "@/videos/DefineVideo";
import IdeateVideo from "@/videos/IdeateVideo";
import SolutionVideo from "@/videos/SolutionVideo";
import data from "@/data/content.json";
import styles from "./page.module.css";
import { ArrowRight, ArrowUpRight, FileText, Play } from "lucide-react";

const A2_GALLERY: GalleryItem[] = [
  { src: "/gallery/a2-synthesis-wall.jpg", title: "Synthesis wall and empathy map", by: "Sudhanshu" },
  { src: "/gallery/a2-user-story-map.jpg", title: "User story map", by: "Kyan Mahajan" },
  { src: "/gallery/a2-hmw-vote.jpg", title: "How Might We vote at a glance", by: "Akshat Parmar" },
  { src: "/gallery/a2-hypothesis-risk.jpg", title: "Hypothesis risk map and test plan", by: "Sarthak Sharma" },
  { src: "/gallery/a2-ananya-pov.jpg", title: "Ananya: persona and POV", by: "Vishwas" },
  { src: "/gallery/a2-ananya-curve.jpg", title: "Ananya: how the day feels", by: "Vishwas" },
  { src: "/gallery/a2-kabir-pov.jpg", title: "Kabir: persona and POV", by: "Vichanshu Raj" },
  { src: "/gallery/a2-rohan-pov.jpg", title: "Rohan: persona and POV", by: "Saumya Sood" },
  { src: "/gallery/a2-meera-pov.jpg", title: "Meera: persona and POV", by: "Satwik Santosh" },
];

const A3_GALLERY: GalleryItem[] = [
  { src: "/gallery/a3-p05.jpg", title: "Mind map PS-T · accessibility", by: "Saumya Sood" },
  { src: "/gallery/a3-p08.jpg", title: "Mind map PS-T · safety", by: "Sudhanshu" },
  { src: "/gallery/a3-p23.jpg", title: "Mind map PS-T · engagement", by: "Akshat Parmar" },
  { src: "/gallery/a3-p11.jpg", title: "Mind map PS-1 · ERP and upload", by: "Vishwas" },
  { src: "/gallery/a3-p14.jpg", title: "Mind map PS-1 · documents", by: "Vichanshu Raj" },
  { src: "/gallery/a3-p17.jpg", title: "Mind map PS-2 · hostel room", by: "Satwik Santosh" },
  { src: "/gallery/a3-p20.jpg", title: "Mind map PS-2 · queue and wayfinding", by: "Kyan Mahajan" },
  { src: "/gallery/a3-p28.jpg", title: "Mind map PS-2 · family and trust", by: "Sarthak Sharma" },
  { src: "/gallery/a3-p06.jpg", title: "Miro brainstorm board · PS-T", by: "Saumya Sood" },
  { src: "/gallery/a3-p12.jpg", title: "Miro brainstorm board · PS-1", by: "Vishwas" },
  { src: "/gallery/a3-p18.jpg", title: "Miro brainstorm board · PS-2", by: "Satwik Santosh" },
  { src: "/gallery/a3-p07.jpg", title: "Team mind map (merged) · PS-T", by: "Saumya Sood" },
  { src: "/gallery/a3-p13.jpg", title: "Team mind map (merged) · PS-1", by: "Vishwas" },
  { src: "/gallery/a3-p19.jpg", title: "Team mind map (merged) · PS-2", by: "Satwik Santosh" },
  { src: "/gallery/a3-p09.jpg", title: "SCAMPER · stop-request button", by: "Sudhanshu" },
  { src: "/gallery/a3-p15.jpg", title: "SCAMPER · registration advisory PDF", by: "Vichanshu Raj" },
  { src: "/gallery/a3-p21.jpg", title: "SCAMPER · paper token queue", by: "Kyan Mahajan" },
  { src: "/gallery/a3-p10.jpg", title: "Before → after · Smart Stop Strip", by: "Sudhanshu" },
  { src: "/gallery/a3-p16.jpg", title: "Before → after · ReadyPass", by: "Vichanshu Raj" },
  { src: "/gallery/a3-p22.jpg", title: "Before → after · Gate-to-Room Pass", by: "Kyan Mahajan" },
  { src: "/gallery/a3-p24.jpg", title: "Converging · course problem", by: "Akshat Parmar" },
  { src: "/gallery/a3-p25.jpg", title: "Converging · PS-1", by: "Akshat Parmar" },
  { src: "/gallery/a3-p26.jpg", title: "Converging · PS-2", by: "Akshat Parmar" },
  { src: "/gallery/a3-p30.jpg", title: "Storyboard · ReadyPass", by: "Sarthak Sharma" },
  { src: "/gallery/a3-p31.jpg", title: "Storyboard · Gate-to-Room Pass", by: "Sarthak Sharma" },
  { src: "/gallery/a3-p32.jpg", title: "Storyboard · Smart Stop Strip", by: "Sarthak Sharma" },
];

const A2_ORDER = [
  ["Sudhanshu", "Synthesis, empathy map, priorities, users"],
  ["Kyan Mahajan", "User stories"],
  ["Akshat Parmar", "How Might We, dot vote, problem statements"],
  ["Sarthak Sharma", "Hypotheses, risk order, master POV"],
  ["Vishwas", "Persona Ananya Verma: POV and journey"],
  ["Vichanshu Raj", "Persona Kabir Singh: POV and journey"],
  ["Saumya Sood", "Persona Rohan Iyer: POV and journey"],
  ["Satwik Santosh", "Persona Meera Nair: POV and journey"],
];
const A3_ORDER = [
  ["Saumya Sood", "PS-T accessibility map, PS-T brainstorm and team map"],
  ["Sudhanshu", "PS-T safety map + SCAMPER stop button"],
  ["Vishwas", "PS-1 ERP / upload map, PS-1 brainstorm and team map"],
  ["Vichanshu Raj", "PS-1 documents map + SCAMPER advisory PDF"],
  ["Satwik Santosh", "PS-2 hostel-room map, PS-2 brainstorm and team map"],
  ["Kyan Mahajan", "PS-2 queue map + SCAMPER paper token"],
  ["Akshat Parmar", "PS-T engagement map, convergence, selected concepts"],
  ["Sarthak Sharma", "PS-2 family-trust map, Yes-and builds, storyboards, test plan"],
];

const STAGES = [
  { n: "1", s: "Empathize", a: "Assignment 1", d: "30 student accounts, coded and mapped", href: "#empathize", c: "#2f8f4e" },
  { n: "2", s: "Define", a: "Assignment 2", d: "Stories, problem statements, hypotheses, POV, journeys", href: "#define", c: "#2a6fb0" },
  { n: "3", s: "Ideate", a: "Assignment 3", d: "Mind maps, brainstorms, SCAMPER, convergence", href: "#ideate", c: "#7a4fb0" },
  { n: "→", s: "Solution", a: "Concepts", d: "ReadyPass, Gate-to-Room Pass, Smart Stop Strip", href: "#solution", c: "#1f8f84" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <header id="top" className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <Reveal>
                <span className={styles.badge}>Design Thinking · BTech V Sem · Section A · Group 10</span>
                <h1 className={styles.h1}>
                  Making IIITA registration feel <span>certain</span>, not stressful.
                </h1>
                <p className={styles.heroLead}>
                  We listened to 30 first year students about their registration day, found where the journey breaks, and designed two services that give students proof they are on the right path.
                </p>
                <div className={styles.heroCtas}>
                  <a href="#problem" className={styles.cta}><Play size={16} fill="currentColor" /> Watch the 60-second brief</a>
                  <a href="#solution" className={styles.ctaGhost}>Jump to our solution <ArrowRight size={16} /></a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className={styles.stats}>
                {[
                  ["30", "student records analysed"],
                  ["≥16", "relied on seniors, not official help"],
                  ["26", "user stories in 7 epics"],
                  ["52", "brainstorm ideas on 3 boards"],
                ].map(([v, l]) => (
                  <div key={l} className={styles.stat}>
                    <b>{v}</b>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className={styles.roadmap}>
            {STAGES.map((s, i) => (
              <Reveal key={s.s} delay={0.1 * i}>
                <a href={s.href} className={styles.stage} style={{ ["--c" as string]: s.c }}>
                  <span className={styles.stageNum}>{s.n}</span>
                  <b>{s.s}</b>
                  <em>{s.a}</em>
                  <span>{s.d}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section id="problem" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Start here</span>
            <h2 className="h2">The problem, in 60 seconds</h2>
            <p className="lead">A short motion brief for anyone seeing our project for the first time: who our users are, where registration breaks, and the insight that shaped everything after.</p>
          </Reveal>
          <ProblemVideo />
        </div>
      </section>

      {/* EMPATHIZE */}
      <section id="empathize" className="section alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow"><span className="num">1</span> Empathize · Assignment 1</span>
            <h2 className="h2">What 30 students told us</h2>
            <p className="lead">Open-ended responses from first year BTech students, collected 3 to 8 September 2026. 33 rows submitted, 1 duplicate and 2 blank rows removed, 30 records kept and coded.</p>
          </Reveal>
          <EmpathizeVideo />

          <Reveal><h3 className="h3">What kept coming up</h3><p className="sub">Each bar is the number of records where the theme appeared. Tap a theme to read what a student actually said.</p></Reveal>
          <ThemeBars />

          <Reveal><h3 className="h3">The emotional journey</h3><p className="sub">Scroll to draw the curve. There are two low points: at the verification desk, and again at the hostel room door after registration seemed finished.</p></Reveal>
          <EmotionJourney />

          <Reveal><h3 className="h3">Where students really got help</h3><p className="sub">This was the most surprising finding, and it became our defining insight.</p></Reveal>
          <BorrowedConfidence />

          <Reveal><h3 className="h3">Empathy map</h3><p className="sub">What students say, think, do and feel. The gap between “smooth and fast” and “am I on the right path?” is where our design lives.</p></Reveal>
          <EmpathyMap />

          <Reveal><h3 className="h3">From pain point to need</h3><p className="sub">Each pain point rewritten as a need. Needs are written as goals, not features.</p></Reveal>
          <PainToNeed />

          <Reveal>
            <div className="callout" style={{ marginTop: 28 }}>
              <b>Central insight.</b> Students did not only need tasks to be completed. They needed repeated proof that they were on the right path. When official systems did not give that proof, they borrowed confidence from seniors, peers, guards and family.
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEFINE */}
      <section id="define" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow" style={{ color: "var(--blue)" }}><span className="num" style={{ background: "var(--blue)" }}>2</span> Define · Assignment 2</span>
            <h2 className="h2">Framing the right problem</h2>
            <p className="lead">We used the d.school Point of View method to turn evidence into user stories, How Might We questions, two problem statements, five testable hypotheses, POVs and four journey maps.</p>
          </Reveal>
          <DefineVideo />

          <Reveal><h3 className="h3">What to fix first</h3><p className="sub">Each pain point placed by how often it appeared and how badly it hurt. The top-right quadrant splits into before travel (PS-1) and on campus (PS-2).</p></Reveal>
          <PriorityMatrix />

          <Reveal><h3 className="h3">Our two problem statements</h3></Reveal>
          <div className="grid2">
            <Reveal>
              <div className="card top" style={{ ["--c" as string]: "var(--blue)", height: "100%" }}>
                <span className="tag" style={{ background: "#dbe9f8" }}>PS-1 · Certainty before travel</span>
                <p className={styles.ps}>First year students travelling to IIITA from other states <b>cannot confirm before they leave home</b> that their documents, uploads and fee payment are complete and accepted, because requirements change late and the ERP portal does not show a clear accepted status. This turns a planned trip into last-minute notarisation, repeated uploads and extra hotel nights.</p>
                <p className="muted" style={{ fontSize: 14 }}>Draft 1 (rejected): “Students find registration confusing. We need a better ERP.” Too vague, and it names a solution.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card top" style={{ ["--c" as string]: "var(--teal)", height: "100%" }}>
                <span className="tag" style={{ background: "#d8eeee" }}>PS-2 · From gate to a ready room</span>
                <p className={styles.ps}>First year students arriving on reporting day <b>do not know which desk comes next, how long they will wait, or whether their hostel room will be usable</b>, so they depend on WhatsApp groups and crowded queues. This leads to conflicting guidance, repeated verification and a first night spent cleaning instead of settling in.</p>
                <p className="muted" style={{ fontSize: 14 }}>Draft 1 (rejected): “Registration day is chaotic. Hire more staff.” Lists symptoms and prescribes a fix.</p>
              </div>
            </Reveal>
          </div>

          <Reveal><h3 className="h3">Personas, POVs and customer journey maps</h3><p className="sub">Pick a persona. Each one has a point of view (user + need + insight), a mad-lib version, and a full journey map with an emotional curve.</p></Reveal>
          <PersonaJourney />

          <Reveal><h3 className="h3">User stories</h3><p className="sub">26 single-goal stories in 7 epics, each with an evidence code from Empathize and an acceptance test. Filter by epic.</p></Reveal>
          <StoriesExplorer />

          <Reveal><h3 className="h3">How Might We, across six lenses</h3><p className="sub">Two HMW questions for each lens from the brief, grounded in a trigger from our evidence.</p></Reveal>
          <HMWLenses />
          <Reveal><h4 className={styles.h4}>Dot vote: 8 members, 6 dots each</h4></Reveal>
          <DotVote />

          <Reveal><h3 className="h3">Hypothesis statements</h3><p className="sub">Each one uses the formula from the brief and states exactly what would prove it wrong. Ranked so the riskiest assumption is tested first.</p></Reveal>
          <Hypotheses />

          <Reveal>
            <div className={styles.masterPov}>
              <span className="eyebrow">Master point of view</span>
              <p>
                <span className="u">A first year student arriving at IIITA with family</span> needs <span className="n">reassurance at every step that they are on the right path</span> because, surprisingly, <span className="i">students rarely fail registration for lack of effort. What runs out is confidence, and when official channels give no proof, they borrow it from seniors, guards and strangers</span>.
              </p>
            </div>
          </Reveal>

          <Reveal><h3 className="h3">From our Assignment 2 submission</h3><p className="sub">Pages each member presented. Click to enlarge.</p></Reveal>
          <Gallery items={A2_GALLERY} />
        </div>
      </section>

      {/* IDEATE */}
      <section id="ideate" className="section alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow" style={{ color: "var(--purple)" }}><span className="num" style={{ background: "var(--purple)" }}>3</span> Ideate · Assignment 3</span>
            <h2 className="h2">Going wide, then choosing</h2>
            <p className="lead">Three problem statements: the course problem on public transport (PS-T) plus our PS-1 and PS-2. For each one: individual mind maps, a timed group brainstorm, and SCAMPER, followed by convergence.</p>
          </Reveal>
          <div className="grid3" style={{ marginBottom: 28 }}>
            {data.ps.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.08}>
                <div className="card top" style={{ ["--c" as string]: p.color, height: "100%" }}>
                  <span className="tag" style={{ background: p.color, color: "#fff" }}>{p.code}</span>
                  <h4 style={{ margin: "8px 0 6px" }}>{p.theme}</h4>
                  <p style={{ margin: 0, fontSize: 15 }}>{p.hmw}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <IdeateVideo />

          <Reveal><h3 className="h3">Mind maps</h3><p className="sub">A central node, four colour-coded branches, three or more idea nodes each, and dashed links between related ideas. Switch between problem statements.</p></Reveal>
          <MindMaps />

          <Reveal><h3 className="h3">Brainstorming boards</h3><p className="sub">15-minute timed sessions. Sticky colour shows the author, attached dashed notes are “Yes, and…” builds, and the notes are grouped into three clusters named after user needs.</p></Reveal>
          <Boards />

          <Reveal><h3 className="h3">SCAMPER</h3><p className="sub">All seven letters applied to one existing feature per problem statement. Click a letter to see the variation and how it rates.</p></Reveal>
          <Scamper />

          <Reveal><h3 className="h3">From our Assignment 3 submission</h3><p className="sub">Individual mind maps, Miro boards, merged team maps, SCAMPER before → after, convergence and storyboards. Click to enlarge.</p></Reveal>
          <Gallery items={A3_GALLERY} />
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our solution</span>
            <h2 className="h2">What we’re proposing</h2>
            <p className="lead">Three concepts, chosen by weighted scoring: fit with our POV, evidence, feasibility, whether it tests a hypothesis, and novelty. Each one is a proposal to prototype and test, not a finished product.</p>
          </Reveal>
          <SolutionVideo />
          <div className="grid3" style={{ marginTop: 28 }}>
            {[
              { n: "ReadyPass", ps: "PS-1", c: "var(--blue)", s: "4.5", d: "A personalised checklist where every line is an upload slot with a status light. DigiLocker and JoSAA documents are accepted automatically, and a boarding-pass style “Ready to Report” QR pass is issued.", t: "Tests H1, H2" },
              { n: "Gate-to-Room Pass", ps: "PS-2", c: "var(--teal)", s: "4.7", d: "A slot-based e-token with a personal desk route and live wait. It includes badged senior buddies working from one FAQ, a room inspection card and a scan-to-report QR on the door.", t: "Tests H3, H4, H5" },
              { n: "Smart Stop Strip", ps: "PS-T", c: "#d64545", s: "3.9", d: "A handrail touch strip: tap to stop, hold for assistance, triple-tap for a silent SOS. An LED panel confirms each request, and your ticket vibrates one stop before yours.", t: "Course problem" },
            ].map((x, i) => (
              <Reveal key={x.n} delay={i * 0.08}>
                <div className="card top" style={{ ["--c" as string]: x.c, height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="tag">{x.ps}</span>
                    <b style={{ fontFamily: "var(--font-display)", fontSize: 22, color: x.c }}>{x.s}/5</b>
                  </div>
                  <h4 style={{ fontSize: 22, margin: "8px 0" }}>{x.n}</h4>
                  <p style={{ fontSize: 15, margin: "0 0 10px" }}>{x.d}</p>
                  <span className="tag" style={{ background: "#f2faf2", color: "#1d5e2a" }}>{x.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h3 className="h3">Next: prototype and test</h3>
            <div className="scroll-x">
              <table className={styles.table}>
                <thead>
                  <tr><th>Concept</th><th>Low-fidelity prototype</th><th>Test with</th><th>Success signal</th></tr>
                </thead>
                <tbody>
                  <tr><td><b>ReadyPass</b></td><td>Clickable Figma flow: checklist, status lights, Ready pass</td><td>10 to 15 current first years, plus 3 parents</td><td>≥85% identify all documents; ≥80% feel ready to travel</td></tr>
                  <tr><td><b>Gate-to-Room Pass</b></td><td>Paper tokens with printed routes; role-play of 3 desks; inspection card on 5 rooms</td><td>One section of juniors as arrivals, plus 2 wardens</td><td>Clarity ≥4/5; 50% fewer “where next?” questions; 90% of rooms pass</td></tr>
                  <tr><td><b>Smart Stop Strip</b></td><td>Cardboard handrail with LED strip; storyboard of three modes</td><td>8 commuters, including 2 elderly and 1 wheelchair user</td><td>All trigger the correct mode on the first try</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Group 10</span>
            <h2 className="h2">Team and presenting order</h2>
          </Reveal>
          <div className="grid4" style={{ marginBottom: 32 }}>
            {data.team.map((m, i) => (
              <Reveal key={m.code} delay={i * 0.04}>
                <div className={styles.member}>
                  <span style={{ background: m.color }}>{m.code}</span>
                  <div>
                    <b>{m.name}</b>
                    <em>{m.roll}</em>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid2">
            {[["Assignment 2 · Define", A2_ORDER], ["Assignment 3 · Ideate", A3_ORDER]].map(([h, rows]) => (
              <Reveal key={h as string}>
                <div className="card">
                  <h4 style={{ fontSize: 19, marginBottom: 10 }}>{h as string}</h4>
                  <ol className={styles.order}>
                    {(rows as string[][]).map(([n, w]) => (
                      <li key={n}><b>{n}</b><span>{w}</span></li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h3 className="h3">Submissions</h3>
            <div className={styles.docs}>
              <a href="/docs/A1_Empathize_Group10.pdf" target="_blank"><FileText size={18} /> Assignment 1 · Empathize report <ArrowUpRight size={16} /></a>
              <a href="/docs/A2_Define_Group10.pdf" target="_blank"><FileText size={18} /> Assignment 2 · Define report <ArrowUpRight size={16} /></a>
              <a href="/docs/A3_Ideation_Group10.pdf" target="_blank"><FileText size={18} /> Assignment 3 · Ideation report <ArrowUpRight size={16} /></a>
            </div>
            <p className="muted" style={{ fontSize: 14, marginTop: 20 }}>
              Generative AI (Claude, Anthropic) assisted with drafting, layout and building this site, as declared in each report. The research evidence is our own Empathize study of 30 student records. Personas are fictional composites; quotes are anonymised.
            </p>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">IIITA Registration Experience · Group 10 · Design Thinking, July to December 2026</div>
      </footer>
    </>
  );
}
