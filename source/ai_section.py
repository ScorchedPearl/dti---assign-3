from common import *

USES = {
    "Define": [
        ["Synthesis (Section 1)", "Turned the A1 coded themes into insight and directive pairs; drafted the frequency × severity matrix", "A1 coded counts and excerpts"],
        ["Composite characters (Section 2)", "Expanded the four A1 personas into named, specific characters", "A1 personas; no new respondent data"],
        ["User stories (Section 3)", "Drafted epics and stories; ran the AND and solution checks; suggested acceptance criteria", "A1 Jobs to Be Done and pain points"],
        ["HMW, problem statements, hypotheses, POV (Sections 4 to 7)", "Generated candidate wording against each brief template; proposed metrics and failure conditions", "A2 brief templates; d.school POV handout"],
        ["Journey maps (Section 8)", "Drafted phase content and the emotional curve; produced the visual layout", "A1 journey table and emotional pattern"],
    ],
    "Ideation": [
        ["Mind maps", "Proposed branch and node structure, icons, colour coding and concept links for all three problem statements", "A2 problem statements and HMWs; course problem statement"],
        ["Brainstorming boards", "Generated candidate idea cards, “Yes, and…” builds and cluster labels; produced the digital board layout", "A2 POVs and user stories"],
        ["SCAMPER matrices", "Applied all seven SCAMPER prompts to the chosen features; drafted benefit and feasibility notes", "A3 SCAMPER definitions"],
        ["Convergence", "Drafted the impact versus effort ratings and concept summaries", "Hypotheses H1 to H5 from A2"],
    ],
}

FOLLOW_UP = [
    ("Evidence audit",
     "Act as a design-research reviewer. For every insight, POV and problem statement in the attached report, cite the exact Empathize code (DOC, ERP, NET, QUE, NAV, PEER, STAFF, HOST, MESS, EMO, TIME, POS) that supports it. Flag any claim with no supporting evidence, and suggest a weaker, defensible rewording."),
    ("Hypothesis stress test",
     "Here are five hypothesis statements written as “If we… for… then… because… which we will know is true when…”. For each one, tell me whether it can be proven false, list the assumption most likely to break it, and propose the cheapest experiment our student team could run in one week to test that assumption."),
    ("Persona challenge",
     "Role-play Ananya, a first year student from Patna travelling with her father on a fixed return ticket. React honestly to each idea on our brainstorming board: what would you actually use, what would you ignore, and what worries you? Stay in character and use only the context I give you."),
    ("Bias and blind-spot check",
     "Review our user stories and journey maps for groups we may have left out: students with disabilities, students who travel alone, students without a smartphone, and students who do not speak Hindi or English. Suggest additional user stories for each, in the same format."),
    ("SCAMPER deepening",
     "For the feature “paper token queue at the registration hall”, generate three more variations for each SCAMPER letter. Rate each one 1 to 5 for student impact and for feasibility within one admission cycle, and explain the top-rated idea in two sentences."),
    ("Prototype planning",
     "Turn our top three ideation concepts into low-fidelity prototype plans: what to build (paper, Figma or role-play), who to test with, the task script, and which hypothesis metric each test measures."),
]


def render(stage):
    owners = [m[1] for m in TEAM]
    review = [
        ["Check every insight against the original response sheet", f"{owners[0]}, {owners[1]}"],
        ["Remove or reword anything the evidence does not support", f"{owners[2]}, {owners[3]}"],
        ["Confirm composite characters stay fictional and anonymised", owners[4]],
        ["Edit wording into the team’s own voice", f"{owners[5]}, {owners[6]}"],
        ["Final consistency and formatting pass", owners[7]],
    ]
    return f"""
<div class="section">
<h2>{'10' if stage == 'Define' else '6'}. Generative AI Acknowledgement</h2>
<p>As the brief requires, we declare our use of generative AI. AI was used as a <b>drafting and visualisation assistant</b>. The evidence base is our own
Empathize research (30 student records), and the judgements and final decisions belong to the team.</p>
{kv([("Tool", "Claude (Anthropic), Claude desktop app"), ("When used", "October 2026"),
     ("Inputs provided", "Our Assignment 1 Empathize report; the Assignment 2 and 3 briefs; the d.school “Developing a Point of View” handout; team member list"),
     ("Prompt given (summary)", "Complete the Assignment 2 (Define) and Assignment 3 (Ideation) deliverables for our IIITA registration project, using our Assignment 1 Empathize report as the only evidence base, to the highest quality.")])}
<h3>How AI was used</h3>
{table(["Area", "What the AI contributed", "Grounded in"], USES[stage], ["24%", "50%", "26%"])}
<h3>Human review</h3>
{table(["Review step", "Responsible"], review, ["65%", "35%"])}
<div class="avoid"><h3>Follow-up prompts for team iteration</h3>
<p class="small">These are prompts we designed for the next round of refinement. Each one checks the AI’s output against evidence or users, instead of accepting it as it is.</p>
{table(["Purpose", "Prompt"], [[f"<b>{a}</b>", f"<i>{e(b)}</i>"] for a, b in FOLLOW_UP], ["18%", "82%"])}</div>
<div class="callout amber"><b class="lbl">Integrity notes</b>No new respondent data was invented. Theme counts are directional, as in A1. Named personas are fictional composites.
All quotations come from the anonymised A1 excerpts or are clearly marked as persona thoughts.</div>
</div>"""
