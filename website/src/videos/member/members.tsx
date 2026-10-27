"use client";

import type { ReactNode } from "react";
import MotionVideo, { type Scene } from "@/components/MotionVideo";
import data from "@/data/content.json";
import { C } from "../kit";
import { bars, branch, cards, image, images, intro, journey, list, matrix, persona, pov, recap, rows3, scamper, steps, stickies, type Member } from "./scenes";

const team = (code: string): Member => {
  const m = data.team.find((x) => x.code === code)!;
  return { code, name: m.name, roll: m.roll, color: m.color };
};
const g = (f: string) => `/gallery/${f}`;
const Th = ({ parts, color }: { parts: string[]; color: string }) => (
  <>{parts.map((p, i) => <span key={p}>{i ? " → " : ""}<b style={{ color: i === parts.length - 1 ? color : "#fff" }}>{p}</b></span>)}</>
);
const node = (ps: string, br: string) => data.mindmaps.find((m) => m.ps === ps)!.branches.find((b) => b.name === br)!.nodes.map((n) => n[1]);

/* ================================================================ Sudhanshu */
const SD = team("SD");
const sudhanshu: Scene[] = [
  intro(SD, {
    headline: "From 30 records to what we fix first",
    a2: "Synthesis and priorities", a2Items: ["Six-step synthesis wall", "Insights into directives", "Fix-first matrix and user needs"],
    a3: "PS-T · Safety", a3Items: ["Safety mind map", "Brainstorm stickies", "SCAMPER: stop-request button"],
    thread: <Th parts={["30 records", "Fix first", "Smart Stop Strip"]} color={SD.color} />,
    caption: "I am Sudhanshu. In Assignment 2 I led the synthesis: I turned thirty student records into insights, directives, a priority matrix and a clear list of user needs. In Assignment 3 I worked on the course problem PS-T, with a safety mind map and a SCAMPER on the bus stop-request button.",
  }),
  steps({
    title: "A2 · Six-step synthesis", kicker: "Assignment 2 · From Empathize to Define", head: "Six steps from notes to a point of view",
    items: [["Saturate", "All 30 records and A1 quotes on one wall"], ["Group", "12 codes merged into 7 clusters"], ["Insight", "10 observations, one insight each"], ["Directive", "Each insight turned into an action"], ["POV + HMW", "User + need + insight, then reframed"], ["Statements", "Problem statements and hypotheses"]],
    foot: "Each step mixed flaring tools (saturation, role play) with focusing tools (grouping, insights, directives).",
    caption: "We worked in six steps. First we covered one wall with all thirty records and quotes, then grouped twelve codes into seven clusters. We pulled one insight out of each cluster and turned every insight into a directive, before writing points of view and problem statements.",
  }),
  rows3({
    title: "A2 · Insights → directives", kicker: "Observation → insight → directive", heads: ["What we observed", "Insight (the why)", "Directive"],
    rows: [
      ["Documents asked on campus that were not in the advisory (DOC ≈14)", "A late document collides with a fixed return ticket and a parent’s leave", "Freeze the checklist and prove it before travel"],
      ["Seniors’ WhatsApp groups used as the real help desk (PEER ≥16)", "Newcomers trust whoever answers their exact question now", "Give official information a senior’s speed and voice"],
      ["Dirty rooms; broken fan, light or lock (HOST ≈12)", "Registration ends when the room is fit to leave a child in", "Treat room readiness as part of registration"],
    ],
    caption: "An insight is the non-obvious why behind several observations. A late document hurts more than a long queue, because it collides with a fixed return ticket. I then rewrote each insight as a directive, an action that is one step away from a point of view.",
  }),
  matrix({
    title: "A2 · What to fix first", kicker: "Prioritisation", head: "Frequency × severity", x: "How often it appeared", y: "How badly it hurt",
    quads: ["Severe, rarer: safeguard", "FIX FIRST", "Monitor", "Frequent irritants"], hot: 1,
    points: [
      { l: "Late documents", x: 0.78, y: 0.95, c: C.red }, { l: "ERP failure", x: 0.86, y: 0.72, c: C.red }, { l: "Room not ready", x: 0.66, y: 0.8, c: C.amber },
      { l: "Queues", x: 0.52, y: 0.56, c: C.blue }, { l: "Next desk", x: 0.45, y: 0.5, c: C.blue }, { l: "Re-verification", x: 0.38, y: 0.44, c: C.teal }, { l: "Conflicting answers", x: 0.6, y: 0.4, c: C.teal },
    ],
    notes: [["Before travel", "Late documents, ERP failure → PS-1", C.blue], ["On campus", "Room, queues, next desk → PS-2", C.teal]],
    caption: "Then I placed every pain point by how often it appeared and how badly it hurt. Three land in fix first: late documents, ERP failure and rooms that are not ready. They split cleanly into before travel and on campus, and that split gave us our two problem statements.",
  }),
  list({
    title: "A2 · What users need", kicker: "Functional, emotional and social needs", head: "Needs written as verbs, not features", cols: 2, size: 18,
    items: [
      { tag: "Functional", text: "Know the exact, current document list before travelling", color: C.blue }, { tag: "Functional", text: "Finish uploads and payment once, without losing progress", color: C.blue },
      { tag: "Functional", text: "Find the next desk and expected wait without asking around", color: C.blue }, { tag: "Functional", text: "Rest in a clean, working room on the first night", color: C.blue },
      { tag: "Emotional", text: "Feel sure they are on the right path at every handoff", color: C.amber }, { tag: "Emotional", text: "Feel that a technical failure is not their fault", color: C.amber },
      { tag: "Social", text: "Look prepared and capable in front of family", color: C.purple }, { tag: "Social", text: "Belong to the student community from day one", color: C.purple },
    ],
    caption: "I also wrote down what users need, as verbs rather than features. Students asked for a better ERP or more staff, but what they implicitly need is certainty and reassurance. That implicit need became the backbone of every statement after this.",
  }),
  image({
    title: "A3 · Safety mind map", kicker: "Assignment 3 · My mind map · PS-T safety", src: g("a3-p08.jpg"), label: "My individual mind map: PS-T safety", color: SD.color,
    bullets: node("PS-T", "Safety & Security"),
    caption: "In Assignment 3 my individual mind map for PS-T looked at safety. On the merged team map, these became the Safety and Security branch: one-tap SOS to the driver, CCTV with crowd alerts, lit waiting zones and the driver’s ID on screen.",
  }),
  stickies({
    ps: "PS-T", code: "SD", color: SD.color, foot: "Also mine: PS-1 staggered upload windows and a public change-log; PS-2 reporting slots and roaming verifiers.",
    caption: "On the PS-T brainstorm board my stickies are highlighted. I suggested a panic button on every seat row, which Vishwas built on with live GPS, and short local-history audio stories. I also built on Sarthak’s ramp idea: the driver’s dashboard shows which stop needs the ramp.",
  }),
  scamper({ ps: "PS-T", color: SD.color, caption: "Then I ran SCAMPER on an everyday feature, the bus stop-request button. Each letter pushed it somewhere new, from a touch strip along every handrail to the bus telling you that your stop is next. The strongest moves were combined into one concept." }),
  image({
    title: "A3 · Smart Stop Strip", kicker: "Assignment 3 · Before → after", src: g("a3-p10.jpg"), label: "Before and after: the Smart Stop Strip", color: SD.color,
    bullets: ["Tap to stop, hold for assistance, triple-tap for a silent SOS", "A large LED panel confirms every request", "Your ticket vibrates one stop before your destination"],
    caption: "This is the before and after. The Smart Stop Strip joins substitute, combine, adapt, magnify and reverse into one control. It works for people who cannot reach a button in a crowd, and for wheelchair users who need more time.",
  }),
  recap(SD, {
    steps: [["A2", "30 records", "One synthesis wall", C.blue], ["A2", "Insights", "Turned into directives", C.teal], ["A2", "Fix first", "Before travel and on campus", C.red], ["A3", "Safety map", "And PS-T stickies", C.purple], ["A3", "Smart Stop Strip", "SCAMPER result", SD.color]],
    line: <>My part made sure every later idea started from <b style={{ color: "#fff" }}>what students actually lived through.</b></>,
    caption: "So my thread runs from thirty raw records, through insights and a priority matrix, to safety ideas and a redesigned stop button. Every idea after that started from what students actually lived through. Thank you.",
  }),
];

/* ================================================================ Kyan */
const KM = team("KM");
const st = (id: string) => data.stories.find((s) => s.id === id)!;
const kyan: Scene[] = [
  intro(KM, {
    headline: "Turning needs into testable user stories",
    a2: "User stories", a2Items: ["7 epics, one per big need", "26 stories with acceptance criteria", "Quality checks on every story"],
    a3: "PS-2 · Queue and wayfinding", a3Items: ["Queue and wayfinding mind map", "Brainstorm stickies", "SCAMPER: paper token queue"],
    thread: <Th parts={["Needs", "26 stories", "Gate-to-Room Pass"]} color={KM.color} />,
    caption: "I am Kyan. In Assignment 2 I wrote our user stories: seven epics and twenty-six stories, each with acceptance criteria. In Assignment 3 I worked on PS-2: the queue and wayfinding mind map and a SCAMPER on the paper token queue.",
  }),
  list({
    title: "A2 · Seven epics", kicker: "Assignment 2 · User stories · Round 1", head: "One broad story per big need",
    items: data.epics.map((e) => ({ tag: e.id, text: e.name, sub: `Lead persona: ${e.lead} · ${data.stories.filter((s) => s.epic === e.id).length} stories`, color: KM.color })),
    caption: "I started with a broad sweep: one epic for each big need, from preparing with confidence to moving into a ready room. Each epic has a lead persona, and together the seven epics hold twenty-six granular stories.",
  }),
  cards({
    title: "A2 · Quality checks", kicker: "Quality checks we applied to every story",
    items: [
      { h: "The AND test: split it", c: C.red, body: <>Before: “I want to upload <u>and</u> pay <u>and</u> see my status.”<br /><br />After: three stories with one goal each: US-06 saved progress, US-09 payment confirmation, US-08 accepted status.</> },
      { h: "Goal, not solution", c: C.amber, body: <>Before: “I want a mobile app with a checklist.”<br /><br />After: US-01 “see one dated list of every required document”. The app was removed: the list could be a PDF, an SMS or a DigiLocker pull.</> },
      { h: "Students’ own words", c: C.teal, body: <>Phrases like “mentioned beforehand”, “crashed without warning” and “no line and a lot of chaos” went straight onto story cards, so the stories sound like our users.</> },
    ],
    caption: "Every story went through three checks. If it had an AND, I split it. If it named a solution like an app, I rewrote it as a goal. And wherever possible I used the students’ own words from Assignment 1.",
  }),
  list({
    title: "A2 · Stories + acceptance", kicker: "Round 2 · granular stories with a testable “done”", size: 18,
    items: ["US-01", "US-06", "US-11", "US-13", "US-17", "US-22"].map((id) => { const s = st(id); return { tag: id, text: `As ${s.who}, I want to ${s.want} so that ${s.so}.`, sub: `Done when: ${s.ac}`, color: KM.color }; }),
    caption: "Here is one story from most epics. Each follows the format: as a persona, I want a goal, so that I get a benefit. The acceptance criteria give every story a testable meaning of done, such as a status updating in under fifteen minutes.",
  }),
  image({
    title: "A3 · Queue map", kicker: "Assignment 3 · My mind map · PS-2 queue and wayfinding", src: g("a3-p20.jpg"), label: "My individual mind map: PS-2 queue and wayfinding", color: KM.color,
    bullets: node("PS-2", "Wayfinding & Flow"),
    caption: "In Assignment 3 my mind map for PS-2 looked at the queue and wayfinding. On the team map these ideas became the Wayfinding and Flow branch: a personal desk route on the token, reporting time slots and a colour-coded floor trail.",
  }),
  stickies({
    ps: "PS-2", code: "KM", color: KM.color, foot: "Also mine: PS-1 “Notary needed?” tag, offline upload queue and WhatsApp FAQ bot; PS-T crowd meter, language switching and seat lights.",
    caption: "On the PS-2 board my stickies are highlighted: a campus map card for families at the gate, a welcome film in the waiting hall and an essentials map for day one. I added ideas on the other two boards as well.",
  }),
  scamper({ ps: "PS-2", color: KM.color, caption: "Then I ran SCAMPER on the paper token queue. A paper slip shows neither the next desk nor the wait. Swapping it for a QR e-token, combining it with the desk route and room number, and pinging families when their desk is near all scored highest." }),
  image({
    title: "A3 · Gate-to-Room Pass", kicker: "Assignment 3 · Before → after", src: g("a3-p22.jpg"), label: "Before and after: Gate-to-Room Pass", color: KM.color,
    bullets: ["One e-token: slot, desk route and hostel room", "Families are pinged when their desk is near", "Pre-verified students take a green lane"],
    caption: "This is the before and after. The paper token became the Gate-to-Room Pass: one e-token for the whole day, with a reporting slot, a personal route, a live wait and the hostel room at the end.",
  }),
  recap(KM, {
    steps: [["A2", "7 epics", "One per big need", C.blue], ["A2", "26 stories", "Each with acceptance", C.teal], ["A2", "Checks", "AND test, goal not solution", C.amber], ["A3", "Queue map", "And PS-2 stickies", C.purple], ["A3", "Gate-to-Room Pass", "SCAMPER result", KM.color]],
    line: <>Every idea we chose can be traced back to <b style={{ color: "#fff" }}>a story and its definition of done.</b></>,
    caption: "So my thread runs from needs, to epics, to twenty-six testable stories, and on to a token that replaces the paper queue. Every idea we chose can be traced back to a story and its definition of done. Thank you.",
  }),
];

/* ================================================================ Akshat */
const AP = team("AP");
const akshat: Scene[] = [
  intro(AP, {
    headline: "From open questions to the concepts we chose",
    a2: "HMW, dot vote, problem statements", a2Items: ["Six lenses, twelve HMW questions", "Team dot vote", "Two final problem statements"],
    a3: "PS-T engagement and converging", a3Items: ["Engagement mind map", "Impact vs effort, decision matrix", "Three selected concepts"],
    thread: <Th parts={["12 HMW", "2 problem statements", "3 concepts"]} color={AP.color} />,
    caption: "I am Akshat. In Assignment 2 I turned our insights into How Might We questions, ran the dot vote and wrote the two final problem statements. In Assignment 3 I made the PS-T engagement mind map and led converging: impact versus effort, the decision matrix and the selected concepts.",
  }),
  list({
    title: "A2 · Six HMW lenses", kicker: "Assignment 2 · How Might We", head: "Six lenses, one question each shown", size: 18,
    items: data.hmw.map((h, i) => ({ tag: String(i + 1), text: h.qs[0], sub: h.lens, color: AP.color })),
    caption: "I used six lenses to reframe our insights as questions: amplify the good, eliminate the bad, explore the opposite, question assumptions, find unexpected resources and create an analogy. Each lens gave two How Might We questions, twelve in total.",
  }),
  bars({
    title: "A2 · Dot vote", kicker: "Converging · dot vote", head: "Which questions to carry forward", max: 8, legend: [["PS-1", C.blue], ["PS-2", C.teal]],
    items: [...data.votes].sort((a, b) => b.dots - a.dots).map((v) => ({ l: v.text, v: v.dots, c: v.ps === "PS-1" ? C.blue : C.teal, tag: v.id })),
    caption: "Then the team voted with dots. Making an unlisted document impossible on the day got the most votes, with eight. The winning questions clustered into two groups, one before travel and one on campus, which became our two problem statements.",
  }),
  cards({
    title: "A2 · Problem statements", kicker: "Assignment 2 · Our two problem statements", size: 18,
    items: [
      { h: "PS-1 · Certainty before travel", c: C.blue, body: "First year students travelling to IIITA from other states cannot confirm before they leave home that their documents, uploads and fee payment are complete and accepted, because requirements change late and the ERP portal shows no clear accepted status.", foot: "Weak draft: “Students find registration confusing. We need a better ERP.” Too vague, and it jumps to a solution." },
      { h: "PS-2 · From gate to a ready room", c: C.teal, body: "First year students arriving on reporting day do not know which desk comes next, how long they will wait, or whether their hostel room will be usable, so they depend on seniors’ WhatsApp groups and crowded queues for answers.", foot: "Weak draft: “Registration day is chaotic. Hire more staff.” Symptoms and a solution, not a need." },
    ],
    caption: "Each problem statement names a specific user, the situation, the obstacle and the consequence, without prescribing a solution. I tested each one against a weak first draft. The final versions stay open to ideas that have nothing to do with the ERP.",
  }),
  image({
    title: "A3 · Engagement map", kicker: "Assignment 3 · My mind map · PS-T engagement", src: g("a3-p23.jpg"), label: "My individual mind map: PS-T engagement", color: AP.color,
    bullets: node("PS-T", "Engagement & Payment"),
    caption: "In Assignment 3 my mind map for PS-T looked at engagement. On the team map these ideas became the Engagement and Payment branch: one QR or NCMC card for bus, metro and rail, green-commute reward points and a rate-my-ride feedback loop.",
  }),
  matrix({
    title: "A3 · Impact vs effort", kicker: "Converging · PS-1 candidates", head: "Impact versus effort", x: "Effort to build", y: "Impact on student",
    quads: ["Quick wins", "Big bets", "Fill-ins", "Avoid for now"], hot: 0,
    points: [
      { l: "Annotated samples", x: 0.15, y: 0.62, c: C.blue }, { l: "Ready to Report pass", x: 0.45, y: 0.9, c: C.blue, s: "l" }, { l: "Checklist = upload slots", x: 0.62, y: 0.92, c: C.blue, s: "b" },
      { l: "DigiLocker pull", x: 0.8, y: 0.82, c: C.blue, s: "b" }, { l: "FAQ bot + seniors", x: 0.35, y: 0.74, c: C.blue }, { l: "Change-log page", x: 0.1, y: 0.4, c: C.blue }, { l: "Video-call check", x: 0.7, y: 0.45, c: C.blue },
    ],
    notes: [["Combine", "Compatible high-impact ideas become one concept per problem", AP.color]],
    caption: "To converge, I placed the strongest ideas on an impact versus effort grid. High impact, low effort ideas are quick wins. Compatible ideas were then combined into one concept per problem statement, ranking higher if they test an Assignment 2 hypothesis.",
  }),
  bars({
    title: "A3 · Decision matrix", kicker: "Converging · weighted decision matrix", head: "Weighted score out of 5", max: 5,
    items: [{ l: "Gate-to-Room Pass (PS-2)", v: 4.7, c: C.teal }, { l: "ReadyPass (PS-1)", v: 4.5, c: C.blue }, { l: "Smart Stop Strip (PS-T)", v: 3.9, c: C.amber }],
    caption: "Then each concept was scored on five weighted criteria: the POV’s core insight, evidence, feasibility in one admission cycle, whether it tests a hypothesis, and novelty. Gate-to-Room Pass scored 4.7, ReadyPass 4.5 and the Smart Stop Strip 3.9.",
  }),
  cards({
    title: "A3 · Selected concepts", kicker: "The three concepts we will prototype", size: 18,
    items: [
      { h: "ReadyPass · PS-1", c: C.blue, body: "A personalised checklist where every line is an upload slot with a status light. When everything is green, the student and parents get a Ready to Report pass with a QR code.", foot: "Tests H1, H2" },
      { h: "Gate-to-Room Pass · PS-2", c: C.teal, body: "One slot-based e-token with the personal desk route, live wait and hostel room. Senior buddies answer from one FAQ, and every room passes an inspection card.", foot: "Tests H3, H4, H5" },
      { h: "Smart Stop Strip · PS-T", c: C.amber, body: "A touch strip along handrails: tap to stop, hold for assistance, triple-tap for a silent SOS. The ticket vibrates one stop before your destination.", foot: "Course problem" },
    ],
    caption: "These are the three selected concepts. ReadyPass gives proof before travel, the Gate-to-Room Pass reassures at every handoff on campus, and the Smart Stop Strip answers the course problem on public transport.",
  }),
  recap(AP, {
    steps: [["A2", "12 HMW", "Six lenses", C.blue], ["A2", "Dot vote", "H03 led with 8", C.amber], ["A2", "2 statements", "PS-1 and PS-2", C.teal], ["A3", "Engagement map", "PS-T", C.purple], ["A3", "3 concepts", "From the decision matrix", AP.color]],
    line: <>My part took us from <b style={{ color: "#fff" }}>open questions to concrete choices.</b></>,
    caption: "So my thread runs from twelve open questions, through a dot vote and two problem statements, to three concepts chosen with a decision matrix. My part took us from open questions to concrete choices. Thank you.",
  }),
];

/* ================================================================ Sarthak */
const SR = team("SR");
const HYP_NAME: Record<string, string> = { H1: "Frozen, dated checklist with samples", H2: "Per-document status and readiness receipt", H3: "Route token with live wait", H4: "Official senior help channel", H5: "Room inspection gate and door QR" };
const yesAnd = data.boards.flatMap((b) => b.clusters.flatMap((c) => c.notes.filter((n) => n.yes).map((n) => ({ ps: b.ps, n }))));
const sarthak: Scene[] = [
  intro(SR, {
    headline: "Making our ideas testable",
    a2: "Hypotheses, risk order, master POV", a2Items: ["Five testable hypotheses", "Riskiest assumptions first", "The master point of view"],
    a3: "PS-2 family and trust, storyboards", a3Items: ["Family-and-trust mind map", "Yes, and builds across boards", "Storyboards and test plan"],
    thread: <Th parts={["Master POV", "5 hypotheses", "Test plan"]} color={SR.color} />,
    caption: "I am Sarthak. In Assignment 2 I wrote our hypotheses, put them in risk order and wrote the master point of view. In Assignment 3 I made the PS-2 family and trust mind map, collected the yes-and builds, drew the storyboards and wrote the test plan.",
  }),
  cards({
    title: "A2 · Master POV", kicker: "Assignment 2 · The compass heading for ideation", size: 21,
    items: [
      { h: "Master point of view", c: SR.color, body: <>A first year student arriving at IIITA with family <b>needs reassurance at every step that they are on the right path</b> because, surprisingly, students rarely fail registration for lack of effort. <b>What runs out is confidence</b>, and when official channels give no proof, they borrow it from seniors, guards and strangers.</> },
      { h: "How we tested it", c: C.amber, body: <>Solution-oriented: “Students need a better ERP.”<br />Generic: “Students need a smooth process because it is stressful.”<br /><br /><b>Actionable</b>: the master POV, with a specific user, a need written as a verb and a non-obvious insight, borrowed confidence.</> },
    ],
    caption: "The master point of view is our compass. Students rarely fail registration for lack of effort; what runs out is confidence, so they borrow it from seniors and strangers. I tested it against a solution-oriented and a generic version.",
  }),
  list({
    title: "A2 · Five hypotheses", kicker: "Assignment 2 · We believe that… we will know we are right when…", head: "Five testable hypotheses", size: 18,
    items: data.hyps.map((h) => ({ tag: h.id, text: `${HYP_NAME[h.id]} (${h.ps})`, sub: `Falsified if: ${h.fail}`, color: h.ps === "PS-1" ? C.blue : C.teal })),
    caption: "Each hypothesis names the user, the mechanism, the reason and a metric with a threshold. Just as important, each one says what result would prove it wrong, so a test can really fail.",
  }),
  list({
    title: "A2 · Risk order", kicker: "Test the riskiest assumptions first", head: "Ranked by uncertainty and impact", size: 18, hi: [0],
    items: [
      { tag: "1 · H1", text: "Frozen checklist: can admissions fix requirements 10 days early?", sub: "Uncertainty high · impact if wrong high", color: C.red },
      { tag: "2 · H4", text: "Official senior channel: will seniors volunteer and the office keep the FAQ current?", sub: "Uncertainty high · impact medium", color: C.red },
      { tag: "3 · H5", text: "Room inspection gate: can maintenance finish repairs in 48 h?", sub: "Uncertainty medium · impact high", color: C.amber },
      { tag: "4 · H2", text: "Status and receipt: can staff review uploads within 48 h?", sub: "Uncertainty medium · impact medium", color: C.amber },
      { tag: "5 · H3", text: "Route token: is desk throughput stable enough to estimate waits?", sub: "Uncertainty low · impact medium; easy to simulate", color: C.green },
    ],
    caption: "Then I ranked the hypotheses by how uncertain the key assumption is and how much depends on it. The frozen checklist goes first, because everything in PS-1 assumes requirements can be fixed early, and that needs a conversation with admissions.",
  }),
  image({
    title: "A3 · Family and trust map", kicker: "Assignment 3 · My mind map · PS-2 family and trust", src: g("a3-p28.jpg"), label: "My individual mind map: PS-2 family and trust", color: SR.color,
    bullets: [...node("PS-2", "Trusted Help").slice(0, 2), "Shaded seating and water for families"],
    caption: "In Assignment 3 my PS-2 mind map looked at families and trust, because parents decide when they can leave. On the team map these ideas sit mainly in Trusted Help and Waiting Better: badged senior buddies, one official FAQ and shaded seating for families.",
  }),
  list({
    title: "A3 · Yes, and builds", kicker: "Assignment 3 · “Yes, and…” builds across the three boards", cols: 2, size: 17,
    items: yesAnd.map(({ ps, n }) => ({ tag: ps, text: `${n.by}: ${n.text}`, sub: `↳ ${n.yes!.by}: …and ${n.yes!.text}`, color: n.yes!.by === "SR" ? SR.color : C.purple })),
    hi: yesAnd.map((x, i) => (x.n.yes!.by === "SR" ? i : -1)).filter((i) => i >= 0),
    caption: "Each yes-and build kept the original idea and pushed it further, and the builds were often where the most novel ideas came from. I collected all ten. Mine are highlighted: double points for off-peak travel, and a photo of the inspected room sent before arrival.",
  }),
  images({
    title: "A3 · Storyboards", kicker: "Assignment 3 · Storyboards for the three concepts", color: SR.color,
    items: [{ src: g("a3-p30.jpg"), label: "ReadyPass" }, { src: g("a3-p31.jpg"), label: "Gate-to-Room Pass" }, { src: g("a3-p32.jpg"), label: "Smart Stop Strip" }],
    foot: "Each storyboard follows one persona through the concept, step by step, so we can act it out and test it before building anything.",
    caption: "I drew a storyboard for each selected concept. Each one follows a persona through the experience, frame by frame, so the team can act it out and spot gaps before building anything.",
  }),
  cards({
    title: "A3 · Test plan", kicker: "Next step: prototype and test", size: 17,
    items: [
      { h: "ReadyPass", c: C.blue, body: "Clickable Figma flow: checklist, status lights, Ready pass. Tested with 10 to 15 current first years plus 3 parents.", foot: "Success: 85% identify all documents; 80% feel ready to travel" },
      { h: "Gate-to-Room Pass", c: C.teal, body: "Paper tokens with printed routes, a role-play of 3 desks and an inspection card on 5 rooms. One section of juniors plus 2 wardens.", foot: "Success: clarity 4/5 or more; 50% fewer “where next?”; 90% of rooms pass" },
      { h: "Smart Stop Strip", c: C.amber, body: "Cardboard handrail with an LED strip and a storyboard of the three modes. 8 commuters, including 2 elderly and 1 wheelchair user.", foot: "Success: everyone triggers the right mode first try" },
    ],
    caption: "Finally, the test plan. Each concept gets a cheap prototype, a group of real users and a success signal taken from our Assignment 2 hypotheses, so the next stage can prove us right or wrong.",
  }),
  recap(SR, {
    steps: [["A2", "Master POV", "Borrowed confidence", C.blue], ["A2", "5 hypotheses", "Each can fail", C.teal], ["A2", "Risk order", "Riskiest first", C.red], ["A3", "Yes, and", "10 builds", C.purple], ["A3", "Test plan", "Storyboards to prototypes", SR.color]],
    line: <>My part makes sure our ideas can be <b style={{ color: "#fff" }}>proved right or wrong.</b></>,
    caption: "So my thread runs from the master point of view, through five hypotheses in risk order, to storyboards and a test plan. My part makes sure our ideas can be proved right or wrong. Thank you.",
  }),
];

/* ================================================================ persona owners */
function personaOwner(code: string, i: number, o: {
  headline: string; a3: string; a3Items: string[]; thread: string[]; intro: string; persona: string; pov: string; journey: string; closing: string;
  rest: Scene[]; recap: [string, string, string, string][]; line: ReactNode; recapCap: string;
}): Scene[] {
  const m = team(code);
  const p = data.personas[i];
  return [
    intro(m, {
      headline: o.headline, a2: `Persona: ${p.name}`, a2Items: ["Persona and need", "Point of view + HMW", "6-phase journey map"], a3: o.a3, a3Items: o.a3Items,
      thread: <Th parts={o.thread} color={m.color} />, caption: o.intro,
    }),
    persona(i, o.persona),
    pov(i, o.pov),
    journey(i, o.journey, o.closing),
    ...o.rest,
    recap(m, { steps: o.recap, line: o.line, caption: o.recapCap }),
  ];
}

const VR = team("VR");
const vichanshu = personaOwner("VR", 1, {
  headline: "Kabir’s lost uploads → a checklist that proves itself", a3: "PS-1 · Documents", a3Items: ["Documents and checklist mind map", "Brainstorm stickies", "SCAMPER: advisory PDF"],
  thread: ["Kabir’s pain", "PS-1", "ReadyPass"],
  intro: "I am Vichanshu. In Assignment 2 I owned persona Kabir Singh: his point of view and his journey map. In Assignment 3 I worked on PS-1: the documents and checklist mind map and a SCAMPER on the registration advisory PDF.",
  persona: "Kabir Singh is 18, from a small town near Kota. He has every document ready, but his home internet is a mobile hotspot. He retries, logs in again and compresses files, and he screenshots everything. What he needs is visible, recoverable progress.",
  pov: "Kabir needs to see exactly where a digital step stopped and continue from there. The insight is that the frustration is not the error itself, but not knowing whether progress, payment or blame has been lost. That gives my How Might We.",
  journey: "Then I mapped his journey. He starts hopeful, but the portal crashes, a file is rejected with no reason, and the fee stays pending for hours. He even has to upload again on campus. He only gets through because a senior shows him a workaround.",
  closing: "Two valleys, file rejected and fee pending, drive the upload half of PS-1",
  rest: [
    image({
      title: "A3 · Documents map", kicker: "Assignment 3 · My mind map · PS-1 documents", src: g("a3-p14.jpg"), label: "My individual mind map: PS-1 documents and checklist", color: VR.color,
      bullets: node("PS-1", "Verified Checklist"),
      caption: "In Assignment 3 my mind map for PS-1 looked at documents and the checklist. On the team map these became the Verified Checklist branch: a dated, versioned checklist, an annotated sample for every document and change alerts by SMS and email.",
    }),
    stickies({
      ps: "PS-1", code: "VR", color: VR.color, foot: "Also mine: PS-T driver ID QR and kneeling buses; PS-2 desk-ready ping and shaded seating for parents.",
      caption: "On the PS-1 board my stickies are highlighted: autosave every field and resume from the exact failed step, which Kyan built on with an offline upload queue, and a bookable video-call document check before travel.",
    }),
    scamper({ ps: "PS-1", color: VR.color, caption: "Then I ran SCAMPER on the registration advisory PDF, a static list with no date, no samples and no progress. The strongest moves were combining the checklist with the upload, adapting airline web check-in and dropping documents already verified through JoSAA or DigiLocker." }),
    image({
      title: "A3 · ReadyPass", kicker: "Assignment 3 · Before → after", src: g("a3-p16.jpg"), label: "Before and after: ReadyPass", color: VR.color,
      bullets: ["Every checklist line is an upload slot with a status light", "JoSAA and DigiLocker items turn green on their own", "All green → a Ready to Report pass with QR"],
      caption: "This is the before and after. The static PDF became ReadyPass, a personalised checklist where every line shows its own status. For Kabir, a crash now costs one minute, not one evening and a second payment.",
    }),
  ],
  recap: [["A2", "Persona Kabir", "Hotspot, every document ready", C.blue], ["A2", "POV + HMW", "Recover from where it failed", C.blue], ["A2", "Journey valleys", "Rejected file, pending fee", C.red], ["A3", "Documents map", "And PS-1 stickies", C.purple], ["A3", "ReadyPass", "SCAMPER result", VR.color]],
  line: <>Every PS-1 idea answers Kabir’s need: <b style={{ color: "#fff" }}>never lose progress, always know why.</b></>,
  recapCap: "So my thread runs from Kabir’s lost uploads, through his point of view and journey, to a checklist that proves itself. Every PS-1 idea answers his need: never lose progress, and always know why. Thank you.",
});

const SS = team("SS");
const saumya = personaOwner("SS", 2, {
  headline: "Rohan’s search for a trusted answer", a3: "PS-T · Accessibility and team board", a3Items: ["Accessibility mind map", "PS-T brainstorm board", "Merged team mind map"],
  thread: ["Rohan’s questions", "Trusted help", "PS-T for everyone"],
  intro: "I am Saumya. In Assignment 2 I owned persona Rohan Iyer: his point of view and his journey map. In Assignment 3 I worked on the course problem PS-T: the accessibility mind map, and I set up the PS-T brainstorm board and the merged team map.",
  persona: "Rohan Iyer is 17, the first in his family to join an IIIT, on his first visit to Prayagraj with his mother. He follows the seniors’ WhatsApp group closely and rarely opens official PDFs. What he needs is a trusted answer, fast.",
  pov: "Rohan needs a trusted voice that answers his exact question right now. The insight is that newcomers judge an answer by how responsive it is, not by how official it is, which is why the seniors’ group wins. That gives my How Might We.",
  journey: "Then I mapped his reporting day. The seniors’ group feels helpful, but official mail and the group disagree, there is no signage at the venue, and the token queue is the low point: tokens run out and there is no seating for his mother. A volunteer finally walks him through.",
  closing: "Valley at the token queue: unknown wait and nowhere to sit, carried into PS-2",
  rest: [
    image({
      title: "A3 · Accessibility map", kicker: "Assignment 3 · My mind map · PS-T accessibility", src: g("a3-p05.jpg"), label: "My individual mind map: PS-T accessibility", color: SS.color,
      bullets: node("PS-T", "Accessibility"),
      caption: "In Assignment 3 my mind map for PS-T looked at accessibility. On the team map these became the Accessibility branch: level boarding and ramps on demand, audio and visual stop announcements, tactile route info and SMS arrival info for feature phones.",
    }),
    stickies({
      ps: "PS-T", code: "SS", color: SS.color, foot: "I set up this board: 18 ideas in 3 clusters named by user need, with 4 yes-and builds.",
      caption: "I set up the PS-T brainstorm board, with three clusters named by user need. My own stickies are highlighted: a women’s safe-seat zone near the driver, and a tactile and braille route strip on the poles.",
    }),
    branch({
      ps: "PS-T", mine: ["Accessibility"], color: SS.color,
      caption: "I also merged everyone’s maps into the PS-T team mind map, with four branches: safety, accessibility, comfort and engagement. My accessibility branch is highlighted. The key insight was that safety and comfort share one data source, crowd density.",
    }),
  ],
  recap: [["A2", "Persona Rohan", "First-generation newcomer", C.blue], ["A2", "POV + HMW", "Speed and warmth of a senior", C.blue], ["A2", "Journey valley", "Token queue", C.red], ["A3", "Accessibility map", "PS-T", C.purple], ["A3", "Board + team map", "18 ideas, 4 branches", SS.color]],
  line: <>My part kept asking: <b style={{ color: "#fff" }}>does this work for the person who knows the least?</b></>,
  recapCap: "So my thread runs from Rohan’s search for a trusted answer, through his journey, to accessibility ideas and the PS-T team board. My part kept asking whether an idea works for the person who knows the least. Thank you.",
});

const ST = team("ST");
const satwik = personaOwner("ST", 3, {
  headline: "Meera’s first night → a room that is ready", a3: "PS-2 · Hostel room and team board", a3Items: ["Hostel-room mind map", "PS-2 brainstorm board", "Merged team mind map"],
  thread: ["Meera’s room", "PS-2", "Gate-to-Room Pass"],
  intro: "I am Satwik. In Assignment 2 I owned persona Meera Nair: her point of view and her journey map. In Assignment 3 I worked on PS-2: the hostel-room mind map, and I set up the PS-2 brainstorm board and the merged team map.",
  persona: "Meera Nair is 18, from Kochi, living away from home for the first time. Her parents fly back the next morning. She inspects the room, cleans, buys a cooler and looks for the warden. What she needs is a room ready to live in.",
  pov: "Meera needs to feel at home on the very first night. The insight is that for families, registration is not finished at the roll number; it ends when the room is good enough for them to leave. That gives my How Might We.",
  journey: "Then I mapped her day. Enrolment feels like the hard part is over, but she opens the door to dust and a loose lock. The family spends its last evening cleaning, and a repair request has no time attached. The room entry is the deepest valley.",
  closing: "Valleys at room entry and defect reporting: room readiness becomes part of PS-2",
  rest: [
    image({
      title: "A3 · Hostel-room map", kicker: "Assignment 3 · My mind map · PS-2 hostel room", src: g("a3-p17.jpg"), label: "My individual mind map: PS-2 hostel room", color: ST.color,
      bullets: node("PS-2", "Room Ready"),
      caption: "In Assignment 3 my mind map for PS-2 looked at the hostel room. On the team map these became the Room Ready branch: a pre-handover inspection card, a scan-to-report QR on the door and a day-one essentials kit.",
    }),
    stickies({
      ps: "PS-2", code: "ST", color: ST.color, foot: "I set up this board: 17 ideas in 3 clusters named by user need, with 3 yes-and builds.",
      caption: "I set up the PS-2 brainstorm board, from moving without getting lost to a room ready to live in. My stickies are highlighted: one exception desk for every problem case, a parents’ lounge with an FAQ volunteer, and the warden’s first-night round with senior buddies.",
    }),
    branch({
      ps: "PS-2", mine: ["Room Ready"], color: ST.color,
      caption: "I also merged everyone’s maps into the PS-2 team mind map, with four branches: wayfinding, waiting better, trusted help and room ready. My room-ready branch is highlighted. The big insight was that one token can drive the whole day, from the gate to the room.",
    }),
  ],
  recap: [["A2", "Persona Meera", "First time away from home", C.blue], ["A2", "POV + HMW", "Room ready = registered", C.blue], ["A2", "Journey valleys", "Room entry, repairs", C.red], ["A3", "Hostel-room map", "PS-2", C.purple], ["A3", "Board + team map", "17 ideas, 4 branches", ST.color]],
  line: <>Registration is finished when <b style={{ color: "#fff" }}>the family can leave without worrying.</b></>,
  recapCap: "So my thread runs from Meera’s first night, through her journey, to room-ready ideas and the PS-2 team board. In our project, registration is finished when the family can leave without worrying. Thank you.",
});

/* ================================================================ export */
export const MEMBER_VIDEOS: { code: string; title: string; scenes: Scene[] }[] = [
  { code: "SD", title: "Synthesis and priorities to the Smart Stop Strip", scenes: sudhanshu },
  { code: "VR", title: "Kabir’s journey to ReadyPass", scenes: vichanshu },
  { code: "SS", title: "Rohan’s journey to the PS-T team board", scenes: saumya },
  { code: "ST", title: "Meera’s journey to the PS-2 team board", scenes: satwik },
  { code: "KM", title: "User stories to the Gate-to-Room Pass", scenes: kyan },
  { code: "AP", title: "HMW and problem statements to the chosen concepts", scenes: akshat },
  { code: "SR", title: "Hypotheses and master POV to the test plan", scenes: sarthak },
];

export function MemberVideo({ code }: { code: string }) {
  const v = MEMBER_VIDEOS.find((x) => x.code === code)!;
  const m = team(code);
  return <MotionVideo id={`video-${code.toLowerCase()}`} label={`${m.name} · A2 + A3`} title={`My part: ${v.title}`} scenes={v.scenes} accent={m.color} />;
}
