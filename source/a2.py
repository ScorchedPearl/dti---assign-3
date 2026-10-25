import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

STAGE = "Design Thinking Define Stage"
B = []
add = B.append

# ------------------------------------------------------------------ COVER
add(f"""
<div class="cover">
<div class="kicker">Design Thinking · Assignment 2</div>
<h1 class="title">IIITA Registration Experience<br>Define Stage Report</h1>
<div class="subtitle">From student evidence to problem statements, hypotheses and points of view</div>
{kv([("Group", GROUP), ("Stage", "Define"),("Builds on", "Empathize Stage Report (Assignment 1): 30 cleaned student records, 3 to 8 September 2026"),
     ("Course", "Design Thinking, BTech V Semester, Section A (July to December 2026)"), ("Submission window", "Fourth week of September 2026")])}
<h3 style="margin-top:7mm">Team</h3>
{team_table()}
<div class="callout navy" style="margin-top:6mm"><b class="lbl">Defining insight</b>
First year students rarely fail registration through lack of effort. What runs out is <b>confidence</b>. When official channels
do not give students proof that they are on the right path, they borrow that proof from seniors, guards and strangers.
This report turns that insight into user stories, problem statements, testable hypotheses, points of view and journey maps.</div>
</div>""")

# ------------------------------------------------------------------ EXEC SUMMARY
add(f"""
<div class="section">
<h2>Executive Summary</h2>
<p>The Empathize stage showed that registration at IIITA usually <i>works</i>, but students often got through it on peer guidance and
improvised workarounds. In this Define stage we pulled those 30 student accounts together into one clear statement of who
we are designing for, what they need and why it matters. We used the d.school Point of View method (saturation, grouping,
insights, directives) and the six “How Might We” lenses from the brief.</p>
<h3>What we produced</h3>
{table(["Deliverable", "Output in this report", "Where"], [
    ["User stories", "2 rounds (broad sweep, then granular): 7 epics, 26 single-goal stories with evidence codes and acceptance criteria, including 5 stakeholder stories", "Section 3"],
    ["How Might We questions", "12 HMW questions, two for each of the six lenses, then prioritised by dot vote", "Section 4"],
    ["Problem statements", "2 final problem statements, each refined from a weak draft and broken down into its parts", "Section 5"],
    ["Hypothesis statements", "5 falsifiable hypotheses using the standard formula, ranked by risk, with test method and pass or fail metric", "Section 6"],
    ["Point of View", "1 master POV, 4 persona POVs, mad-lib versions and POV-to-HMW translation", "Section 7"],
    ["Customer journey maps", "4 persona journey maps with phases, actions, touchpoints, thoughts, emotional curve and opportunities", "Section 8"],
], ["22%", "60%", "18%"], cls="tight")}
<h3>Our two problem statements</h3>
<div class="callout"><b class="lbl">PS-1 · Before travel</b>First year students travelling to IIITA from other states cannot confirm before they leave home that their
documents, uploads and fee payment are complete and accepted, because requirements change late and the ERP portal does not show a clear
accepted status.</div>
<div class="callout"><b class="lbl">PS-2 · On campus</b>First year students arriving on reporting day do not know which desk comes next, how long they will wait, or
whether their hostel room will be usable, so they depend on WhatsApp groups and crowded queues, and their first night goes to cleaning and chasing repairs.</div>
<h3>Report Contents</h3>
<table class="toc"><tbody>
<tr><td>1. From Empathize to Define: our synthesis process</td><td>@@1@@</td><td>6. Hypothesis statements</td><td>@@6@@</td></tr>
<tr><td>2. Who is the user? Composite characters and needs</td><td>@@2@@</td><td>7. Point of View</td><td>@@7@@</td></tr>
<tr><td>3. User stories</td><td>@@3@@</td><td>8. Customer journey maps</td><td>@@8@@</td></tr>
<tr><td>4. How Might We questions across six lenses</td><td>@@4@@</td><td>9. Traceability and handoff to Ideation</td><td>@@9@@</td></tr>
<tr><td>5. Problem statements</td><td>@@5@@</td><td>10. Generative AI acknowledgement</td><td>@@10@@</td></tr>
</tbody></table>
</div>""")

# ------------------------------------------------------------------ 1 SYNTHESIS
steps = [("Saturate", "All 30 records and A1 quotes put on one wall"), ("Group", "12 codes merged into 7 clusters"),
         ("Insight", "10 observations distilled into one each"), ("Directive", "Each insight turned into an action"),
         ("POV + HMW", "User + need + insight, then reframed"), ("Statements", "Problem statements and hypotheses")]
flow = '<svg viewBox="0 0 1000 120" width="100%">'
for k, (t, d) in enumerate(steps):
    x = 8 + k * 165
    col = [NAVY, "#24527f", TEAL, "#2a8a7f", "#c98a00", "#b5452f"][k]
    flow += f'<path d="M{x},20 h140 l18,30 l-18,30 h-140 l18,-30 z" fill="{col}"/>'
    flow += svg_lines(x + 80, 50, [t], 14, weight=700, fill="#fff")
    flow += svg_lines(x + 80, 100, wrap(d, 24), 10.5, fill="#333")
flow += "</svg>"

pts = [("Late / unlisted documents", .78, .95, "#b5452f"), ("ERP and network failure", .86, .72, "#b5452f"),
       ("Room not ready on arrival", .66, .80, "#c98a00"), ("Queue and token uncertainty", .52, .56, NAVY),
       ("Unclear next desk", .45, .50, NAVY), ("Repeated verification", .38, .44, TEAL),
       ("Conflicting answers", .60, .40, TEAL)]
add(f"""
<div class="section">
<h2>1. From Empathize to Define</h2>
<p>The handout reminds us that the hardest leap is from “the concrete world of observations to a concisely stated point of view”.
We worked in six steps. Each step mixed <b>flaring</b> tools (saturation, Powers of Ten, role play) with <b>focusing</b> tools
(grouping, composite characters, insights, directives).</p>
{flow}
<h3>1.1 Insights from observations, then directives</h3>
<p>Each row compresses several observations from the Empathize report (with coded frequency) into a single insight that is not obvious.
We then wrote that insight as an action, which the handout calls “getting very close to a Point of View”.</p>
{table(["What we observed (A1 evidence)", "Insight (the non-obvious why)", "Directive"], [
    ["Documents asked on campus that were not in the advisory; affidavit and notarisation confusion <span class='tag'>DOC ≈14</span>",
     "A late document hurts more than a long queue, because it collides with a <b>fixed return ticket and a parent’s leave</b>.", "Freeze the checklist and prove it to the student before travel."],
    ["Crashes, repeated logins, unclear size limits, fee status pending <span class='tag'>ERP ≈15</span> <span class='tag'>NET</span>",
     "“Uploaded” does not feel like “done”. Students need a <b>saved proof state</b>, not just a submit button.", "End every digital step in a visible, lasting confirmation."],
    ["Seniors’ WhatsApp groups used as the real help desk <span class='tag'>PEER ≥16</span>",
     "Newcomers trust <b>whoever answers their exact question now</b>, not whoever is official.", "Give official information the speed and voice of a senior."],
    ["Tokens ran out, no seating, heat, no line, unclear next desk <span class='tag'>QUE ≈9</span> <span class='tag'>NAV ≈8</span>",
     "The chaos comes less from the wait itself and more from <b>not knowing how long, or where next</b>.", "Make the route and the wait visible at every handoff."],
    ["Dirty rooms, broken fan, light or lock, painting still in progress, water concerns <span class='tag'>HOST ≈12</span> <span class='tag'>MESS</span>",
     "For families, registration ends when the <b>room is fit to leave their child in</b>, not when the roll number is issued.", "Treat room readiness as part of finishing registration."],
    ["Documents uploaded online and then checked again at several desks <span class='tag'>DOC</span> <span class='tag'>STAFF</span>",
     "Being checked again and again <b>feels like distrust</b> and wastes the effort put in at home.", "Verify once and reuse the record."],
    ["Excitement turns to anxiety, then relief when a trusted person confirms <span class='tag'>EMO</span>",
     "Students need <b>repeated proof that they are on track</b>, not just a list of tasks.", "Build a moment of reassurance into each stage."],
], ["34%", "40%", "26%"])}
</div>
<div class="section">
<h3>1.2 Prioritising pain points: frequency × severity</h3>
<p>We plotted each cluster by how often it appeared in the 30 records (directional) and how badly it affected students when it happened
(blocking completion, extra travel cost, or loss of rest). The top-right quadrant became our design focus. Points high on severity but
lower on frequency need safeguards, even though they are rarer.</p>
<div class="avoid" style="width:88%;margin:0 auto">{matrix_2x2(pts, "Frequency in Empathize records", "Severity of consequence",
    ["Severe, less frequent: safeguard", "FIX FIRST", "Monitor", "Frequent irritants: quick wins"])}</div>
<div class="figcap">Figure 1. Pain point prioritisation matrix. Position is a team judgement based on the A1 coded counts and consequences.</div>
<div class="callout amber"><b class="lbl">Focus decision</b>Three clusters fall in “Fix first”: <b>late documents</b>, <b>ERP and status failure</b> and <b>room not ready</b>.
They split naturally into the two halves of the journey, <b>before travel</b> and <b>on campus</b>. That split gives us our two problem statements.
Queue and wayfinding issues are added to the on-campus statement because they make up the same reporting-day experience.</div>
</div>""")

# ------------------------------------------------------------------ 2 USER
personas = [
    ("Ananya Verma", "The Prepared Planner", "#2a6fb0", "18 · from Patna, Bihar · travels about 600 km by train with her father · fixed return ticket two days later",
     "Reads every advisory, keeps a printed folder, uploads early", "Android phone; checks email and the ERP every evening",
     "“Tell me the complete requirement before I start travelling.”", "Certainty before departure"),
    ("Kabir Singh", "The Digitally Blocked Registrant", "#b5452f", "18 · from a small town near Kota · has every document ready · home connection is a mobile hotspot",
     "Retries, logs in again, compresses files, asks batchmates for fixes", "Budget laptop and phone hotspot; screenshots everything",
     "“Show me what failed and let me continue from that point.”", "Visible, recoverable progress"),
    ("Rohan Iyer", "The Guided Newcomer", "#c98a00", "17 · first in the family to join an IIIT · arrives with his mother · first visit to Prayagraj",
     "Follows the seniors’ WhatsApp group closely and asks guards and volunteers", "Phone always on WhatsApp; rarely opens official PDFs",
     "“I trust the person who answers my exact question now.”", "A trusted answer, fast"),
    ("Meera Nair", "The Transitioning Resident", "#2a8a7f", "18 · from Kochi · first time living away from home · parents fly back the next morning",
     "Inspects the room, cleans, buys a cooler, looks for the warden", "Video-calls family; shares room photos with them",
     "“Registration is not finished until I can actually settle into the room.”", "A room ready to live in"),
]
cards = "".join(f"""<div class="card" style="border-top:5px solid {c}">
<div style="display:flex;gap:3mm;align-items:center;margin-bottom:1.5mm">
<div style="width:13mm;height:13mm;border-radius:50%;background:{c};color:#fff;font-family:'Exo 2';font-weight:800;font-size:14pt;display:flex;align-items:center;justify-content:center">{n.split()[0][0]}{n.split()[1][0]}</div>
<div><div style="font-family:'Exo 2';font-weight:800;font-size:12pt">{n}</div><div style="color:{c};font-weight:700;font-size:9pt">{r}</div></div></div>
<div class="small" style="margin-bottom:1.5mm">{p}</div>
<b>Behaviour:</b> {b}<br><b>Devices:</b> {d}<br><b>Core need:</b> {need}
<div style="margin-top:1.5mm;font-style:italic;color:#333">{q}</div></div>""" for n, r, c, p, b, d, q, need in personas)

add(f"""
<div class="section">
<h2>2. Who Is the User?</h2>
<p>The Define brief says the first step is to find out <b>who the user is</b> and <b>what their needs are</b>. Our primary user is a
<b>first year BTech student reporting to IIITA for physical registration, usually with a family member</b>. In practice the journey also involves
several secondary stakeholders, and we wrote user stories for them as well (Section 3).</p>
{table(["Role", "Who", "Why they matter to the definition"], [
    ["<b>Primary user</b>", "First year BTech student (17 to 19 years old), often travelling from another state", "Carries the documents, does the digital steps, lives in the room"],
    ["Co-user", "Parent or guardian travelling with the student", "Shares the travel risk, waits through the queues, decides when it is safe to leave"],
    ["Informal helper", "Seniors and batchmates in WhatsApp groups; student volunteers", "Currently the de facto help desk (≥16 of 30 records)"],
    ["Service provider", "Academic section, accounts, ERP team, hostel wardens, mess contractor", "Own the rules, data and rooms behind every pain point (not interviewed yet; see A1 limitations)"],
], ["18%", "42%", "40%"])}
<h3>2.1 Composite characters</h3>
<p>Following the handout’s <i>composite characters</i> tool, we gave names and specific detail to the four A1 personas. Each one combines several
real responses. None of them represents a single respondent.</p>
<div class="grid2">{cards}</div>
</div>
<div class="section">
<h3>2.2 What users need: functional, emotional and social</h3>
{table(["Need type", "Need (written as a verb, not a feature)", "Evidence", "Persona"], [
    ["Functional", "Know the exact, current document requirements before travelling", "Unlisted affidavit or undertaking asked on campus", "Ananya"],
    ["Functional", "Complete uploads and payment once, without losing progress", "Crashes, repeated logins, pending fee status", "Kabir"],
    ["Functional", "Find the next desk and expected wait without asking around", "“There was no line and a lot of chaos”", "Rohan"],
    ["Functional", "Rest in a clean, working room on the first night", "Dirty room; fan, light and lock problems", "Meera"],
    ["Emotional", "Feel sure they are on the right path at every handoff", "Relief only after a trusted person confirms", "All"],
    ["Emotional", "Feel that a technical failure is not their fault", "Fear of being blamed for portal errors", "Kabir"],
    ["Social", "Look prepared and capable in front of family", "Parents travelling, fixed return plans", "Ananya, Meera"],
    ["Social", "Belong to the student community from day one", "Valued seniors who “personally guide us”", "Rohan"],
], ["14%", "38%", "32%", "16%"])}
<div class="callout"><b class="lbl">Implicit vs explicit needs</b>Students <i>explicitly</i> asked for “a better ERP” or “more staff”. What they <i>implicitly</i> need is
<b>certainty and reassurance</b>. The handout calls dealing with implicit needs rather than explicit problems a sign that a POV is getting good,
so we use the implicit need as the backbone of every statement that follows.</div>
</div>""")

# ------------------------------------------------------------------ 3 USER STORIES
epics = [("E1", "Prepare with confidence", "Ananya"), ("E2", "Complete digital work before travel", "Kabir"), ("E3", "Recover from an exception", "Kabir"),
         ("E4", "Navigate the campus process", "Rohan"), ("E5", "Receive trusted human guidance", "Rohan"), ("E6", "Verify once", "Ananya"),
         ("E7", "Move into a ready room", "Meera")]
stories = [
    ("E1", "US-01", "Ananya", "see one dated list of every required document", "I can leave home knowing nothing extra will be asked on campus", "DOC", "List shows a version date; zero unlisted documents requested on the day"),
    ("E1", "US-02", "Ananya", "see an annotated sample of each document", "I do not have to guess what a valid affidavit looks like", "DOC", "Each item links to a sample showing format, stamp and signatory"),
    ("E1", "US-03", "Ananya", "be alerted the moment a requirement changes", "I can arrange it before I book travel", "DOC, TIME", "Change alert reaches the student within 24 h of the change"),
    ("E1", "US-04", "Ananya", "know which documents need notarisation", "I visit a notary only once", "DOC", "Each item is marked as self-attested, notarised or original"),
    ("E1", "US-05", "Parent", "know how long reporting day will take", "I can book our return journey confidently", "TIME", "Published time window per reporting slot"),
    ("E2", "US-06", "Kabir", "have my upload progress saved automatically", "a crash does not make me start over", "ERP", "Progress survives a logout or crash"),
    ("E2", "US-07", "Kabir", "see the file size and format limit before uploading", "my file is not rejected without explanation", "ERP", "Limit shown next to each upload button"),
    ("E2", "US-08", "Kabir", "see whether each document has been accepted", "I know when I am truly done", "ERP", "Each document shows Uploaded, Under review, Accepted or Action needed"),
    ("E2", "US-09", "Kabir", "see my fee payment confirmed within minutes", "I do not pay twice or panic", "ERP", "Status updates in under 15 min after payment"),
    ("E2", "US-10", "Ananya", "download a readiness receipt", "I can show proof of completion at the campus desk", "ERP", "Receipt carries a QR code and timestamp"),
    ("E3", "US-11", "Kabir", "be told the exact reason an upload was rejected", "I fix only that document", "ERP", "Rejection message names the cause and the fix"),
    ("E3", "US-12", "Kabir", "raise a help request with a screenshot attached", "I do not explain my problem to several people", "ERP, STAFF", "Ticket ID issued; one owner assigned"),
    ("E4", "US-13", "Rohan", "see my full route of desks when I arrive", "I always know my next step", "NAV", "Route shown on token or phone at entry"),
    ("E4", "US-14", "Rohan", "see the live wait time at my next desk", "I can plan breaks with my family", "QUE", "Estimate shown and accurate to within 10 min"),
    ("E4", "US-15", "Parent", "have a shaded place to sit near the desks", "waiting does not exhaust us", "QUE", "Seating provided for at least 1.5× the expected peak"),
    ("E4", "US-16", "Rohan", "get a reporting time slot before I travel", "I do not arrive to find tokens finished", "QUE, TIME", "Every admitted student holds a slot 7 days ahead"),
    ("E5", "US-17", "Rohan", "get a verified answer in chat within minutes", "I do not have to rely on rumours", "PEER, STAFF", "Median first reply under 10 min in reporting week"),
    ("E5", "US-18", "Rohan", "recognise official volunteers on campus", "I know whose answer to trust", "STAFF", "Volunteers easy to identify; same FAQ as the office"),
    ("E5", "US-19", "Senior volunteer", "access the latest official FAQ", "my answers never contradict the office", "PEER", "FAQ version visible; volunteers notified of changes"),
    ("E6", "US-20", "Ananya", "have documents I already uploaded marked as verified", "I am not checked again at every desk", "DOC", "Physical check limited to originals required by policy"),
    ("E6", "US-21", "Desk officer", "see which documents are already verified", "I only handle exceptions", "STAFF", "Desk view highlights only the pending items"),
    ("E7", "US-22", "Meera", "receive a room that was cleaned before key handover", "I can rest after a long day", "HOST", "Room has a signed inspection card at handover"),
    ("E7", "US-23", "Meera", "report a broken fixture from my room door", "it gets fixed without me searching for the warden", "HOST", "Report logged in under 1 min; status visible"),
    ("E7", "US-24", "Meera", "know my room and room-mate details before arrival", "there are no occupancy surprises", "HOST", "Details shared 3 days before reporting"),
    ("E7", "US-25", "Meera", "know where drinking water and meals are on day one", "my family can leave reassured", "MESS", "Day-one essentials card given at key handover"),
    ("E7", "US-26", "Hostel warden", "see which rooms failed inspection", "repairs finish before students arrive", "HOST", "Failed-room list available 48 h before reporting"),
]
story_rows = []
for ep, sid, who, want, so, ev, ac in stories:
    stake = who not in ("Ananya", "Kabir", "Rohan", "Meera")
    who_html = f"<b>{who}</b>" + (" <span class='tag y'>stakeholder</span>" if stake else "")
    story_rows.append([f"<b>{sid}</b><br><span class='tag t'>{ep}</span>", who_html,
                       f"As <b>{who if stake else who + ''}</b>, I want to <span class='n'>{want}</span> so that <span class='i'>{so}</span>.",
                       f"<span class='tag'>{ev}</span>", f"<span class='small'>{ac}</span>"])

add(f"""
<div class="section">
<h2>3. User Stories</h2>
<p>We followed the five rules in the brief: <b>start with a broad sweep</b>, <b>fill gaps top-down</b> (persona × epic), <b>add real insights</b>
(the words and devices students mentioned), <b>beware of “AND”</b>, and <b>focus on goals, not solutions</b>.</p>
<h3>3.1 Round 1: broad sweep (one story per epic)</h3>
{table(["Epic", "Lead persona", "Broad user story"], [
    ["<b>E1</b> Prepare with confidence", "Ananya", "As a student preparing at home, I want to know everything I need before travelling so that the trip goes as planned."],
    ["<b>E2</b> Complete digital work before travel", "Kabir", "As a student with my documents ready, I want to finish all online steps from home so that campus time is used only for physical steps."],
    ["<b>E3</b> Recover from an exception", "Kabir", "As a student whose upload or payment failed, I want to understand what went wrong so that I can recover quickly."],
    ["<b>E4</b> Navigate the campus process", "Rohan", "As a student arriving on campus, I want to move through registration without feeling lost so that the day feels manageable."],
    ["<b>E5</b> Receive trusted human guidance", "Rohan", "As a newcomer facing unclear instructions, I want a person with verified information so that I act without relying on rumour."],
    ["<b>E6</b> Verify once", "Ananya", "As a student who already uploaded documents, I want that effort recognised so that I am not checked repeatedly."],
    ["<b>E7</b> Move into a ready room", "Meera", "As a newly enrolled student, I want a room I can live in from the first night so that my family leaves with confidence."],
], ["30%", "14%", "56%"])}
<h3>3.2 Quality checks we applied</h3>
<div class="grid2">
<div class="card"><h4>The “AND” test: split it</h4>
<span class="tag r">Before</span> As Kabir, I want to upload my documents <u>and</u> pay my fees <u>and</u> see my status so that registration is done.<br>
<span class="tag g">After</span> Three stories with one goal each: <b>US-06</b> (saved progress), <b>US-09</b> (payment confirmation), <b>US-08</b> (accepted status).</div>
<div class="card"><h4>Goal, not solution: reframe it</h4>
<span class="tag r">Before</span> As Ananya, I want a mobile app with a checklist so that I can prepare.<br>
<span class="tag g">After</span> <b>US-01</b>: As Ananya, I want to see one dated list of every required document so that I can leave home knowing nothing extra will be asked.
<span class="small">(The app was removed: a checklist could be a PDF, an SMS, a WhatsApp bot or a DigiLocker pull.)</span></div>
</div>
<div class="card" style="margin-top:3mm"><h4>Real insights: using the students’ own language</h4>Phrases such as <i>“mentioned beforehand”</i>, <i>“crashed without warning”</i>,
<i>“seniors personally guide us”</i> and <i>“no line and a lot of chaos”</i> were copied onto story cards so that the stories sound like our users.
Devices noted in A1 (personal hotspot, phone-first WhatsApp use, ethernet on campus) shaped the stories and acceptance criteria for E2 and E5.</div>
</div>
<div class="section">
<h3>3.3 Round 2: granular user stories</h3>
<p class="small">Format: As [persona], I want to <span class="n">[goal]</span> so that <span class="i">[benefit]</span>. Evidence codes are from the A1 coding
framework. Acceptance criteria give each story a testable meaning of “done”. Stakeholder stories are <b>assumptions to validate</b>, because staff were not
interviewed in A1.</p>
{table(["ID", "Persona", "User story", "Evidence", "Acceptance criteria"], story_rows, ["9%", "13%", "47%", "10%", "21%"], cls="tight")}
</div>""")

# ------------------------------------------------------------------ 4 HMW
hmw = [
    ("Amplify the good", "Seniors answer quickly in familiar language; several students found fee payment smooth.",
     ["HMW make official guidance feel as quick and friendly as a senior’s WhatsApp reply?", "HMW spread the clarity of the smooth fee-payment step to every other step?"]),
    ("Eliminate the bad", "Unlisted documents, upload crashes and a second round of uploads on campus.",
     ["HMW make it impossible for a document outside the checklist to be requested on the day?", "HMW remove the need to upload anything again once on campus?"]),
    ("Explore the opposite", "Reporting day feels like an inspection the student has to survive.",
     ["HMW turn reporting day into a welcome the student looks forward to?", "HMW let the institute prove readiness to the student, instead of the student proving everything to the institute?"]),
    ("Question the assumptions", "“Originals must be checked at every desk.” “Registration ends at the roll number.” “Everyone arrives at once.”",
     ["HMW treat a verified digital record as enough, so physical checks become exceptions?", "HMW define “registration complete” as “settled in a ready room”?"]),
    ("Identify unexpected resources", "DigiLocker (JoSAA-verified documents), seniors, waiting parents, campus screens, the ERP SMS gateway, housekeeping staff.",
     ["HMW use documents already verified in DigiLocker or JoSAA so students upload less?", "HMW turn waiting parents and senior volunteers into part of the welcome and room check?"]),
    ("Create an analogy", "Airline web check-in, hospital OPD token screens, hotel “room ready” status, food-delivery tracking.",
     ["HMW give students a boarding-pass style “ready to report” pass, like airline web check-in?", "HMW show room readiness the way a hotel front desk knows a room is cleaned and inspected?"]),
]
hmw_rows = []
k = 1
for lens, trig, qs in hmw:
    for q in qs:
        hmw_rows.append([f"<b>{lens}</b>" if q == qs[0] else "", f"<span class='small'>{trig}</span>" if q == qs[0] else "", f"<b>H{k:02d}</b> {q}"])
        k += 1
votes = [("H03", "Make an unlisted document impossible on the day", 8, "PS-1"), ("H06", "Institute proves readiness to the student", 7, "PS-1"),
         ("H09", "Reuse DigiLocker / JoSAA-verified documents", 6, "PS-1"), ("H01", "Official guidance as fast as a senior", 7, "PS-2"),
         ("H08", "Registration complete = settled in a ready room", 7, "PS-2"), ("H11", "Boarding-pass style “ready to report” pass", 6, "PS-1"),
         ("H12", "Hotel-style room-ready status", 5, "PS-2"), ("H05", "Reporting day as a welcome", 4, "PS-2")]
add(f"""
<div class="section">
<h2>4. How Might We Questions</h2>
<p>For each of the six lenses in the brief we went back to the A1 evidence, named the trigger (the good thing, bad thing or assumption we saw),
and wrote two HMW questions. We kept the questions <b>broad enough to allow many solutions</b> but <b>narrow enough to know where to start</b>.</p>
{table(["Lens", "Trigger from Empathize evidence", "How Might We…"], hmw_rows, ["17%", "33%", "50%"])}
</div>
<div class="section">
<h3>4.1 Converging: dot voting</h3>
<p>Each of the 8 team members had 6 dots to spend on the HMWs they found most promising. A dot meant the HMW is
<i>grounded in evidence</i>, <i>open to many ideas</i> and <i>important to the student</i>. We then grouped the winners by the part of the journey they belong to.</p>
{table(["HMW", "Short form", "Dots (of 8 voters)", "Belongs to"],
       [[f"<b>{a}</b>", b, "●" * c + f" <span class='small'>{c}</span>", f"<span class='tag t'>{d}</span>"] for a, b, c, d in votes], ["10%", "52%", "22%", "16%"])}
<div class="callout"><b class="lbl">What the vote told us</b>The highest-voted HMWs all aim at <b>certainty before travel</b> (H03, H06, H09, H11) or
<b>reassurance and readiness on campus</b> (H01, H08, H12). This confirmed the split from Figure 1, and these two clusters became our two problem statements.</div>
</div>""")

# ------------------------------------------------------------------ 5 PROBLEM STATEMENTS
def ps_block(code, title, final, parts, draft, critique):
    return f"""<div class="avoid"><h3>{code} · {title}</h3>
<div class="callout navy"><div class="statement">{final}</div></div>
{table(["Element", "Our statement"], parts, ["24%", "76%"])}
<div class="grid2"><div class="card"><h4 style="color:#a12622">Draft 1 (rejected)</h4><i>“{draft}”</i></div>
<div class="card"><h4>Why we rewrote it</h4>{critique}</div></div></div>"""

add(f"""
<div class="section">
<h2>5. Problem Statements</h2>
<p>We used the brief’s examples of good and poor problem statements as a checklist. A good statement names a <b>specific user</b>, the <b>situation</b>,
the <b>obstacle</b> and the <b>consequence</b>. It hints at where to start but <b>does not prescribe a solution</b>.</p>
{ps_block("PS-1", "Certainty before travel",
  "First year students travelling to IIITA from other states <span class='u'>cannot confirm before they leave home</span> that their documents, uploads and fee payment are complete and accepted, because requirements change late and the ERP portal does not show a clear accepted status. This turns a carefully planned trip into last-minute notarisation, repeated uploads and extra hotel nights, and makes a proud day feel anxious.",
  [["User", "First year BTech students (with family) travelling long distances to report"], ["Situation", "The final days before departure, when travel is already booked"],
   ["Obstacle", "Late or unlisted requirements; no durable “accepted” state for uploads and fee payment"],
   ["Consequence", "Emergency document arrangements, repeated work, extra hotel nights, anxiety for student and family"],
   ["Evidence", "<span class='tag'>DOC ≈14</span> <span class='tag'>ERP ≈15</span> <span class='tag'>TIME</span> “One document was not mentioned in the advisory and it was asked here.”"]],
  "Students find the registration process confusing. We need a better ERP system.",
  "Too vague (“confusing”, “students”), no consequence, and it jumps straight to a solution (“better ERP”). The final version names the user, the moment of risk and the cost, and stays open to solutions that have nothing to do with the ERP, such as DigiLocker, SMS or a frozen advisory.")}
</div>
<div class="section">
{ps_block("PS-2", "From gate to a ready room",
  "First year students arriving on reporting day <span class='u'>do not know which desk comes next, how long they will wait, or whether their hostel room will be usable</span>, so they depend on seniors’ WhatsApp groups and crowded queues for answers. This leads to conflicting guidance, repeated verification and a first night spent cleaning or chasing repairs instead of settling in, while parents hesitate to leave.",
  [["User", "First year students and accompanying family on reporting day"], ["Situation", "Moving from the registration hall to the hostel room in a single tiring day"],
   ["Obstacle", "Invisible route and wait; no single trusted source; room readiness not checked before handover"],
   ["Consequence", "Fatigue, conflicting answers, extra checks, unsettled first night, worried families"],
   ["Evidence", "<span class='tag'>QUE ≈9</span> <span class='tag'>NAV ≈8</span> <span class='tag'>PEER ≥16</span> <span class='tag'>HOST ≈12</span> “There was no line and a lot of chaos.” “The room was quite dirty.”"]],
  "Registration day is chaotic and hostel rooms are dirty. The institute should hire more staff and clean rooms.",
  "This lists symptoms, not a user need, and prescribes solutions (“hire more staff”). The final version keeps the student’s point of view, links the hall and the hostel as one experience (as students live it) and explains why it matters.")}
<h3>5.1 How our statements meet the brief’s criteria</h3>
{table(["Criterion (from good examples)", "PS-1", "PS-2"], [
    ["Specific user, not “people” or “customers”", "✔ out-of-state first years with family", "✔ first years and family on reporting day"],
    ["Concrete situation and obstacle", "✔ pre-departure; late requirements; no accepted status", "✔ unknown next desk, wait and room state"],
    ["Clear consequence (cost or emotion)", "✔ notary rush, hotel nights, anxiety", "✔ conflicting answers, unsettled night, worried parents"],
    ["No solution prescribed", "✔ no app or ERP named", "✔ no staffing or tool named"],
    ["Traceable to evidence", "✔ DOC, ERP, TIME codes", "✔ QUE, NAV, PEER, HOST codes"],
], ["40%", "30%", "30%"])}
</div>""")

# ------------------------------------------------------------------ 6 HYPOTHESES
hyps = [
    ("H1", "PS-1", "publish a single, dated, version-controlled document checklist with annotated samples and change alerts",
     "incoming first year students", "fewer students will arrive missing a document",
     "they can confirm every item against an authoritative source before travel",
     "day-of-registration document exceptions fall by at least 50% compared with the 2026 cycle, and at least 85% of pilot users list every required document correctly in a comprehension test",
     "The admissions office can freeze requirements at least 10 days before reporting", "Comprehension test with 15 to 20 current first years using a paper prototype; exception log next cycle", "Below 70% comprehension, or exceptions fall by less than 25%"),
    ("H2", "PS-1", "show a per-document status (Uploaded, Under review, Accepted, Action needed) and a downloadable readiness receipt",
     "students completing ERP steps from home", "they will resolve digital issues before travelling",
     "they can see exactly what is still pending instead of guessing",
     "at least 80% of students reach “Ready” status 48 hours or more before reporting, and campus upload-desk visits drop by 60%",
     "Verification staff can review uploads within 48 hours", "Clickable Figma prototype tested with 10 students; staff time-and-motion estimate", "Below 60% reach Ready early"),
    ("H3", "PS-2", "give each arriving student a digital token that shows their full desk route and a live estimated wait",
     "first years and families on reporting day", "they will feel less lost and ask fewer “where next?” questions",
     "the sequence and the wait become visible instead of unknown",
     "wayfinding questions at help points fall by 50%, and at least 70% of surveyed students rate the on-campus step 4 out of 5 or higher for clarity",
     "Desk throughput is stable enough to estimate waits", "Role-play simulation of the hall with 3 desks, printed route cards and a volunteer timer", "Clarity rating below 3.5 out of 5"),
    ("H4", "PS-2", "run an official help channel staffed by trained senior volunteers who work from one verified FAQ",
     "newcomers who currently rely on unofficial WhatsApp groups", "they will choose the official channel for answers",
     "it combines a senior’s speed and tone with official accuracy",
     "median first reply is under 10 minutes during reporting week, at least 60% of first years ask at least one question there, and reports of conflicting answers fall",
     "Seniors will volunteer, and the office will keep the FAQ current", "Wizard-of-Oz pilot: 4 volunteers answer questions from one batch section for a week", "Median reply over 30 minutes, or under 30% adoption"),
    ("H5", "PS-2", "require every room to pass a pre-handover inspection and put a scan-to-report defect code on each door",
     "students moving into hostel rooms", "they will settle on the first night",
     "defects are fixed before arrival or tracked quickly after it",
     "at least 90% of rooms pass inspection at handover, and the median repair time for reported defects is under 24 hours",
     "Maintenance can finish repairs in the 48 h before reporting", "Inspect a sample of 20 rooms with the checklist; trial the QR form in one wing", "Fewer than 75% of rooms pass, or median repair time over 72 h"),
]
risk_rank = [("H1", "High", "High"), ("H4", "High", "Medium"), ("H5", "Medium", "High"), ("H2", "Medium", "Medium"), ("H3", "Low", "Medium")]
hyp_html = ""
for hid, ps, sol, user, ben, why, metric, assume, test, fail in hyps:
    hyp_html += f"""<div class="card" style="margin-bottom:3mm">
<div style="display:flex;justify-content:space-between"><h4 style="margin:0">{hid} <span class="tag t">{ps}</span></h4></div>
<p style="margin:1.5mm 0 2mm">If we <span class="n">[{sol}]</span> for <span class="u">[{user}]</span>, then <span class="i">[{ben}]</span> because <b>[{why}]</b>, which we will know is true when <span style="background:#fff0c2">[{metric}]</span>.</p>
<div class="grid3 small"><div><b>Risky assumption:</b> {assume}</div><div><b>Test method:</b> {test}</div><div><b style="color:#a12622">Falsified if:</b> {fail}</div></div></div>"""
add(f"""
<div class="section">
<h2>6. Hypothesis Statements</h2>
<p>Our POV defines the <i>problem</i>. Each hypothesis sets up an <i>experiment</i> for one possible direction, using the brief’s formula:
<b>If we</b> <span class="n">[solution]</span> <b>for</b> <span class="u">[target user]</span>, <b>then</b> <span class="i">[expected change]</span> <b>because</b> [reason],
<b>which we will know is true when</b> [measurable metric]. Every hypothesis has a stated failure condition, so it can be proven wrong.</p>
{hyp_html}
<h3>6.1 Testing the riskiest assumptions first</h3>
<p>Following the rule “test the risky assumptions first”, we ranked the hypotheses by how uncertain the key assumption is and how much depends on it.</p>
{table(["Order", "Hypothesis", "Uncertainty of assumption", "Impact if wrong", "Why this order"], [
    ["1", "<b>H1</b> Frozen checklist", "<span class='tag r'>High</span>", "<span class='tag r'>High</span>", "Everything in PS-1 assumes requirements <i>can</i> be fixed early; this needs an admissions conversation first"],
    ["2", "<b>H4</b> Official senior channel", "<span class='tag r'>High</span>", "<span class='tag y'>Medium</span>", "Depends on volunteer motivation and office buy-in, which we have not observed"],
    ["3", "<b>H5</b> Room inspection gate", "<span class='tag y'>Medium</span>", "<span class='tag r'>High</span>", "Maintenance capacity is unknown, but the cost of failure (first night) is high"],
    ["4", "<b>H2</b> Status and receipt", "<span class='tag y'>Medium</span>", "<span class='tag y'>Medium</span>", "Technically feasible; risk is review turnaround time"],
    ["5", "<b>H3</b> Route token", "<span class='tag g'>Low</span>", "<span class='tag y'>Medium</span>", "Easy to simulate cheaply with paper prototypes"],
], ["8%", "22%", "17%", "15%", "38%"])}
<div class="callout amber"><b class="lbl">Weak vs strong: our own iteration</b>
<span class="tag r">Weak</span> “If we make a registration app, students will be less stressed.”<br>
<span class="tag g">Strong</span> H2 above names the user, the mechanism (visible status), the reason (no guessing) and a metric with a threshold (80% Ready 48 h early).</div>
</div>""")

# ------------------------------------------------------------------ 7 POV
povs = [
    ("Ananya Verma, the Prepared Planner", "to be certain before boarding the train that the document file is complete",
     "a single late document does not just add a task; it collides with a fixed return ticket and a parent’s leave from work",
     "Prepared planner from Patna with a fixed return ticket", "a final, trustworthy document list", "one surprise affidavit does not break a carefully planned family trip",
     "HMW make the checklist so trustworthy that families plan travel around it?"),
    ("Kabir Singh, the Digitally Blocked Registrant", "to see exactly where a digital step stopped, and continue from there",
     "the frustration is not the error itself but not knowing whether progress, payment or blame has been lost",
     "Hotspot-dependent student with every document ready", "a portal that remembers progress and explains failure", "a crash costs one minute, not one evening and a second payment",
     "HMW make every failure recoverable from exactly where it happened?"),
    ("Rohan Iyer, the Guided Newcomer", "a trusted voice that answers the exact question right now",
     "newcomers judge an answer by how responsive it is, not by how official its source is, which is why the seniors’ group wins",
     "First-generation newcomer on a first visit to campus", "a fast, reliable answer to “what next?”", "rumours never have to fill the silence",
     "HMW give official answers the speed and warmth of a senior?"),
    ("Meera Nair, the Transitioning Resident", "to feel at home on the very first night",
     "for students and families, registration is not finished at the roll number; it ends when the room is good enough for the family to leave",
     "First-time hosteller whose parents fly home tomorrow", "a clean, working room at handover", "the goodbye feels like a beginning, not a worry",
     "HMW make “room ready” part of what “registered” means?"),
]
pov_cards = ""
for user, need, ins, mu, mn, mi, h in povs:
    pov_cards += f"""<div class="card" style="margin-bottom:3mm"><div class="grid2" style="grid-template-columns:1.5fr 1fr;align-items:start">
<div><h4 style="margin-top:0">{user.split(',')[0]}</h4><p class="statement" style="font-size:10.5pt"><span class="u">{user}</span> needs <span class="n">{need}</span> because <span class="i">{ins}</span>.</p>
<div class="small"><b>→ {h}</b></div></div>
<div class="madlib" style="font-size:9pt"><span class="u">{mu}</span> seeks <span class="n">{mn}</span>, so that <span class="i">{mi}</span>.</div></div></div>"""
add(f"""
<div class="section">
<h2>7. Point of View</h2>
<p>A POV is “the compass heading” for ideation: <b><span class="u">User</span> + <span class="n">Need</span> + <span class="i">Insight</span></b>. We wrote one master POV
for the whole project and one for each composite character. Each POV is also shown as the d.school “classified ad” mad lib and translated into an HMW for Assignment 3.</p>
<div class="callout navy"><b class="lbl">Master POV</b><div class="statement"><span class="u">A first year student arriving at IIITA with family</span> needs
<span class="n">reassurance at every step that they are on the right path</span> because, surprisingly, <span class="i">students rarely fail registration for lack of effort.
What runs out is confidence, and when official channels give no proof, they borrow it from seniors, guards and strangers</span>.</div></div>
<h3>7.1 Persona POVs, mad libs and HMW</h3>
{pov_cards}
<h3>7.2 Bad vs good: how we tested our POV</h3>
{table(["Version", "Statement", "Verdict"], [
    ["<span class='tag r'>Solution-oriented</span>", "Students need a better ERP and more registration staff.", "Names features, not needs; no insight; leaves no room for other solutions"],
    ["<span class='tag y'>Generic</span>", "Students need a smooth registration process because it is stressful.", "“Students” is too broad and the insight is obvious; it would not inspire any surprising idea"],
    ["<span class='tag g'>Actionable</span>", "Master POV (above)", "Specific user, need written as a verb, and a non-obvious insight (borrowed confidence) that opens up new directions"],
], ["20%", "45%", "35%"])}
<h3>7.3 POV quality checklist (from the d.school handout)</h3>
{table(["The handout says a POV is getting good when…", "Our evidence"], [
    ["You understand ordinary things in new ways", "We now see a WhatsApp group as an unofficial <i>confidence service</i>, not as noise to ignore"],
    ["You deal with implicit needs rather than explicit problems", "Students asked for “a better ERP”; the implicit need is proof of being on track"],
    ["Your team is speaking its own language", "We now talk about “borrowed confidence”, “proof state” and “room-ready = registered”"],
    ["Don’t try to design for everyone", "One primary user (first year with family); stakeholders kept secondary"],
    ["Don’t confuse solutions for needs", "Every need is written as a verb; no app, portal or staff count named"],
    ["Don’t try to include all your insights", "Master POV uses one insight; the persona POVs each carry their own"],
], ["50%", "50%"])}
</div>""")

# ------------------------------------------------------------------ 8 JOURNEY MAPS
jm = []
jm.append(("Ananya Verma: The Prepared Planner", "#2a6fb0",
  "<b>Ananya Verma</b>, 18, Patna. Travels with her father; return train already booked.",
  "Preparing for and completing physical registration within a fixed two-day trip.",
  "Finish everything on day one so her father can catch the return train.",
  "A complete advisory, no surprises, a predictable day.",
  [dict(name="Read advisory", doing=["Downloads the advisory PDF", "Makes a printed checklist", "Books the train"], touch="Institute website, email, advisory PDF",
        think="Looks complete. I'll prepare everything this week.", emo=1, pain="Advisory has no version date and no samples", opp="Dated, versioned checklist with samples (H1)"),
   dict(name="Arrange documents", doing=["Gets the affidavit drafted", "Visits a notary", "Asks seniors whether self-attestation is enough"], touch="Notary, WhatsApp group, parents",
        think="Does this need notarising or not? Nobody is sure.", emo=-1, pain="Notarisation rules unclear; conflicting advice", opp="Mark each item: self-attested, notarised or original"),
   dict(name="Upload and pay", doing=["Uploads scans to ERP", "Pays fee online", "Screenshots the receipt"], touch="ERP portal, bank app",
        think="Uploaded, but is it accepted?", emo=0, pain="No accepted status; fee status shows pending", opp="Per-document status and readiness receipt (H2)"),
   dict(name="Travel and arrive", doing=["Overnight train", "Reaches campus early", "Joins the crowd at the venue"], touch="Train, auto, campus gate, guards",
        think="We made it! Let's finish fast.", emo=1, pain="No reporting slot; crowd already formed", opp="Pre-assigned reporting slots"),
   dict(name="Verification desk", doing=["Shows original documents", "Is asked for an undertaking not listed in the advisory", "Rushes to get it made"], touch="Verification desk, staff, nearby notary",
        think="This was never mentioned! What about the train?", emo=-2, pain="Unlisted document requested; travel plan at risk", opp="No document outside the checklist on the day (H03)"),
   dict(name="Enrolled; father leaves", doing=["Gets roll number late in the day", "Father changes his ticket", "Settles into hostel"], touch="Academic section, railway app, hostel",
        think="Done, but it cost us an extra night.", emo=0, pain="Extra hotel night and ticket change", opp="Publish the expected reporting-day duration")]))
jm.append(("Kabir Singh: The Digitally Blocked Registrant", "#b5452f",
  "<b>Kabir Singh</b>, 18, near Kota. All documents ready; home internet is a phone hotspot.",
  "Completing ERP upload and fee payment from home, then finishing on campus.",
  "Finish every digital step before travel, without losing progress or paying twice.",
  "A portal that works, clear limits, instant confirmation.",
  [dict(name="Get credentials", doing=["Receives ERP login by email", "Logs in successfully", "Reads the upload instructions"], touch="Email, ERP portal",
        think="Finally, let's get this done tonight.", emo=1, pain="Instructions do not state size or format limits", opp="Show limits beside each upload button"),
   dict(name="Upload attempt", doing=["Uploads the first file", "Portal crashes", "Logs in again and repeats"], touch="ERP portal, hotspot",
        think="Did it save anything? Starting again…", emo=-1, pain="No autosave; repeated logins at peak traffic", opp="Autosave and resume where it failed"),
   dict(name="File rejected", doing=["Upload fails without a reason", "Compresses PDF three times", "Asks batchmates"], touch="ERP portal, online compressor, WhatsApp",
        think="What is wrong with my file?!", emo=-2, pain="Error message gives no cause", opp="Rejection reason plus the fix (US-11)"),
   dict(name="Fee pending", doing=["Pays fee", "Status still shows pending hours later", "Considers paying again"], touch="Payment gateway, ERP, bank SMS",
        think="Money's gone, but the portal says unpaid.", emo=-2, pain="Delayed payment reconciliation", opp="Confirmation in under 15 min (US-09)"),
   dict(name="Campus upload desk", doing=["Is told to re-upload on campus", "Campus network weak", "Uses a friend's hotspot"], touch="Upload desk, campus Wi-Fi, peers",
        think="I already did this at home.", emo=-1, pain="Second upload round; unreliable network", opp="Readiness receipt so nothing is redone on campus (H2)"),
   dict(name="Confirmed", doing=["A senior shows a workaround", "Status finally reads accepted", "Gets roll number"], touch="Senior, desk officer",
        think="Sorted, thanks to a senior, not the system.", emo=1, pain="Success depended on informal help", opp="Help ticket with one owner (US-12)")]))
jm.append(("Rohan Iyer: The Guided Newcomer", "#c98a00",
  "<b>Rohan Iyer</b>, 17. First in family at an IIIT; first visit to Prayagraj with his mother.",
  "Moving through reporting day from the campus gate to receiving a roll number.",
  "Know what to do at every moment without feeling lost or making a mistake.",
  "Clear signs, a sensible order, someone to ask.",
  [dict(name="Join seniors' group", doing=["Added to batch WhatsApp group", "Reads senior tips", "Saves screenshots"], touch="WhatsApp, seniors",
        think="Seniors seem helpful, and they reply quickly!", emo=1, pain="Unofficial info may be out of date", opp="Official channel with senior volunteers (H4)"),
   dict(name="Conflicting info", doing=["Official mail says one thing", "Group says another", "Asks three people"], touch="Email, WhatsApp, helpline",
        think="Who do I believe?", emo=-1, pain="No single source of truth", opp="One verified FAQ shared by staff and volunteers (US-19)"),
   dict(name="Arrive at venue", doing=["Finds venue by asking guards", "No signage at entry", "Waits in the sun"], touch="Gate, guards, venue",
        think="Where do I even start?", emo=-1, pain="No visible route or start point", opp="Route card or token at entry (H3)"),
   dict(name="Token and queue", doing=["Gets a token", "Tokens run out for later arrivals", "No seating for his mother"], touch="Token desk, waiting hall",
        think="How long will this take? Mom is tired.", emo=-2, pain="Unknown wait; heat; limited seating", opp="Live wait time, seating, reporting slots (US-14, US-16)"),
   dict(name="Volunteer guides", doing=["A senior volunteer walks him through the desks", "Explains each step", "Shares the hostel location"], touch="Senior volunteer, desks",
        think="Okay, now I get it.", emo=1, pain="Help depends on finding the right person", opp="Identifiable trained volunteers (US-18)"),
   dict(name="Roll number", doing=["Receives roll number", "Photo with his mother", "Heads to hostel"], touch="Academic section",
        think="I'm officially an IIITian!", emo=2, pain="Relief came late in a long day", opp="Celebrate this moment as a welcome (H05)")]))
jm.append(("Meera Nair: The Transitioning Resident", "#2a8a7f",
  "<b>Meera Nair</b>, 18, Kochi. First time living away from home; parents fly back tomorrow.",
  "Moving from completed enrollment into a hostel room and the mess on day one.",
  "Have a clean, safe, working room so her parents leave reassured.",
  "Room ready, basics working, someone to call if not.",
  [dict(name="Enrolled", doing=["Completes enrollment", "Calls family members back home", "Walks to hostel office"], touch="Academic section, phone",
        think="Registration done! The hard part is over.", emo=2, pain="Assumes the room will be ready", opp="Treat room readiness as part of registration (H08)"),
   dict(name="Room and key", doing=["Gets room allotted", "Collects key", "Finds the block"], touch="Hostel office, warden",
        think="Can't wait to see my room.", emo=1, pain="Room-mate details unknown until now", opp="Share room details before arrival (US-24)"),
   dict(name="Enter room", doing=["Opens the door to dust and paint smell", "Fan light flickers", "Door lock is loose"], touch="Room, fixtures",
        think="Mom can't leave me in this.", emo=-2, pain="Room not cleaned or inspected before handover", opp="Pre-handover inspection gate (H5)"),
   dict(name="Fix it ourselves", doing=["Family cleans the room", "Buys bucket, cooler, bedding", "Asks about drinking water"], touch="Local shops, neighbours",
        think="We spent our last evening cleaning.", emo=-1, pain="Setup work shifted to the family", opp="Day-one essentials card (US-25)"),
   dict(name="Report defect", doing=["Searches for the warden", "Told 'maintenance will come'", "No time given"], touch="Warden, caretaker",
        think="When will someone actually fix the lock?", emo=-2, pain="No tracked repair request; safety worry", opp="Scan-to-report code on the door (US-23)"),
   dict(name="First night", doing=["Eats first mess meal", "Parents leave next morning", "Meets wing-mates"], touch="Mess, wing-mates",
        think="Getting better, but I still worry about the lock.", emo=0, pain="Unresolved defect lingers", opp="Repair status visible to student and family")]))
for title, colr, actor, scen, goal, exp, phases in jm:
    add(f"""<div class="wide"><h2 style="font-size:16pt;margin-bottom:2mm">8. Customer Journey Map · <span style="color:{colr}">{title}</span></h2>
{journey_map(actor, scen, goal, exp, phases, colr)}</div>""")

add(f"""
<div class="section">
<h3 style="margin-top:0">8.1 What the four journey maps reveal together</h3>
{table(["Pattern across maps", "Where it appears", "Implication for ideation"], [
    ["<b>Two emotional valleys</b>: one at the verification desk, one at room entry", "Ananya phase 5, Meera phase 3", "Registration needs two “moments of truth” designed: before travel and at the room door"],
    ["<b>Relief always comes from a person</b>, never from a system", "Kabir phase 6, Rohan phase 5", "Make systems give the same reassurance a senior gives"],
    ["<b>Uncertainty hurts more than effort</b>: “Is it accepted?”, “How long?”, “When will it be fixed?”", "All four maps", "Every step needs a visible status, a time estimate or a named owner"],
    ["<b>Work is pushed onto families</b>: notary rush, waiting in heat, cleaning", "Ananya, Rohan, Meera", "Measure success by the family’s experience as well as the student’s"],
    ["<b>Peaks are celebratory moments</b> (roll number, arrival)", "Rohan phase 6, Meera phase 1", "Amplify the good: turn these peaks into a designed welcome"],
], ["38%", "24%", "38%"])}

<h2 style="margin-top:8mm">9. Traceability and Handoff to Ideation</h2>
<p>The table traces each problem statement back to its evidence and forward to the artefacts that test it, so the next stage starts from prioritised HMW questions and not from a fixed solution.</p>
{table(["Thread", "A1 evidence", "User stories", "Hypotheses", "POV", "HMW carried into Assignment 3"], [
    ["<b>PS-1</b> Certainty before travel", "DOC, ERP, NET, TIME", "US-01 to US-12, US-20", "H1, H2", "Ananya, Kabir", "HMW help students prove, before they leave home, that their registration is complete and accepted?"],
    ["<b>PS-2</b> Gate to a ready room", "QUE, NAV, PEER, STAFF, HOST, MESS", "US-13 to US-19, US-21 to US-26", "H3, H4, H5", "Rohan, Meera", "HMW guide every student from campus gate to a ready room with confidence at each step?"],
], ["15%", "14%", "15%", "11%", "12%", "33%"])}
<h3>Next steps</h3>
<ol><li>Validate the stakeholder assumptions behind H1 and H5 with the admissions office and a hostel warden (Section 6.1 order).</li>
<li>Run individual mind maps, a group brainstorm and SCAMPER on PS-1, PS-2 and the course problem statement (Assignment 3).</li>
<li>Build low-fidelity prototypes for the top ideas and test them against the hypothesis metrics.</li></ol>
</div>""")

# ------------------------------------------------------------------ 10 AI
import ai_section
add(ai_section.render("Define"))

open(os.path.join(os.path.dirname(__file__), "build", "a2.html"), "w").write(doc("Define Stage Report", STAGE, "".join(B)))
print("a2 ok")
