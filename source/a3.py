import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import ai_section

STAGE = "Design Thinking Ideation Stage"
B = []
add = B.append

PS = [
    ("PS-T", "Course problem statement", "#d64545", "How might we make public transport (buses and trains) safer, more accessible and more engaging for daily commuters?"),
    ("PS-1", "Certainty before travel", "#2a6fb0", "How might we help first year students prove, before they leave home, that their registration is complete and accepted?"),
    ("PS-2", "From gate to a ready room", "#2a8a7f", "How might we guide every first year student from the campus gate to a ready hostel room with confidence at each step?"),
]

# ------------------------------------------------------------------ COVER
add(f"""
<div class="cover">
<div class="kicker">Design Thinking · Assignment 3</div>
<h1 class="title">IIITA Registration Experience<br>Ideation Stage Report</h1>
<div class="subtitle">Mind mapping, group brainstorming and SCAMPER across three problem statements</div>
{kv([("Group", GROUP), ("Stage", "Ideate"), ("Builds on", "Define Stage Report (Assignment 2): problem statements PS-1 and PS-2, five hypotheses, POVs"),
     ("Course", "Design Thinking, BTech V Semester, Section A (July to December 2026)"), ("Submission window", "Last week of October 2026")])}
<h3 style="margin-top:7mm">Team</h3>
{team_table()}
</div>""")

# ------------------------------------------------------------------ SUMMARY
req = [
    ["Mind map: central node plus 3 or more primary branches", "4 branches", "4 branches", "4 branches"],
    ["Mind map: 2 or more secondary nodes per branch", "3 to 4 each (14 nodes)", "3 each (12 nodes)", "3 each (12 nodes)"],
    ["Mind map: keywords, colour coding, icons, linked concepts", "✔ 3 links", "✔ 3 links", "✔ 3 links"],
    ["Brainstorm: 15 or more distinct ideas", "18 ideas", "17 ideas", "17 ideas"],
    ["Brainstorm: “Yes, and…” on 3 or more ideas", "4 builds", "3 builds", "3 builds"],
    ["Brainstorm: 3 labelled thematic clusters", "✔", "✔", "✔"],
    ["SCAMPER: all 7 letters on one existing feature", "Stop-request button", "Registration advisory PDF", "Paper token queue"],
]
add(f"""
<div class="section">
<h2>Executive Summary</h2>
<p>In Assignment 2 we defined two problem statements from our Empathize research on IIITA registration. This stage <b>diverges</b> on those two
and on the course problem statement, using three methods: individual mind mapping, a timed group brainstorm and SCAMPER. We then <b>converge</b>
on one concept per problem statement for prototyping.</p>
<h3>The three problem statements</h3>
{table(["Code", "Theme", "How Might We prompt"], [[f"<span class='pill' style='background:{c}'>{a}</span>", f"<b>{b}</b>", d] for a, b, c, d in PS], ["11%", "24%", "65%"])}
<h3>Requirement checklist</h3>
{table(["Brief requirement", "PS-T", "PS-1", "PS-2"], req, ["40%", "20%", "20%", "20%"])}
<h3>Report Contents</h3>
<table class="toc"><tbody>
<tr><td>1. Ideation approach</td><td>@@1@@</td><td>4. SCAMPER matrices (PS-T, PS-1, PS-2)</td><td>@@4@@</td></tr>
<tr><td>2. Individual mind maps (PS-T, PS-1, PS-2)</td><td>@@2@@</td><td>5. Converging: selecting concepts for prototyping</td><td>@@5@@</td></tr>
<tr><td>3. Group brainstorming boards (PS-T, PS-1, PS-2)</td><td>@@3@@</td><td>6. Generative AI acknowledgement</td><td>@@6@@</td></tr>
</tbody></table>
</div>""")

# ------------------------------------------------------------------ APPROACH
dd = '<svg viewBox="0 0 1000 170" width="100%">'
dd += '<path d="M20,85 L330,15 L330,155 Z" fill="#dce6f0"/><path d="M330,15 L640,15 L640,155 L330,155 Z" fill="#eef6f7"/><path d="M640,15 L980,85 L640,155 Z" fill="#fff0c2"/>'
for x, t, s in [(175, "DIVERGE", "Mind maps: explore the space alone"), (485, "BUILD", "Brainstorm: “Yes, and…” as a group"),
                (800, "TRANSFORM + CONVERGE", "SCAMPER, then impact × effort")]:
    dd += svg_lines(x, 72, [t], 17, weight=800, fill=NAVY) + svg_lines(x, 100, [s], 12, fill="#333")
dd += "</svg>"
add(f"""
<div class="section">
<h2>1. Ideation Approach</h2>
<p>Each method has a different job. <b>Mind mapping</b> is done individually first, so that every member explores the problem space before the group can anchor
on one idea. <b>Brainstorming</b> uses the group to build quantity and to combine ideas. <b>SCAMPER</b> forces structured variation on one feature that already
exists, which tends to produce ideas the open brainstorm missed.</p>
{dd}
<h3>Rules we followed</h3>
<div class="grid2">
<div class="card"><h4>Brainstorm rules (15:00 timer)</h4><ul style="margin:0">
<li>Defer judgement: no “but” for the first 15 minutes</li><li>Go for quantity: target 15 or more ideas per board</li>
<li>Build on others with <b>“Yes, and…”</b>, written as an attached note</li><li>One idea per sticky, with a headline verb</li>
<li>Each member has their own sticky colour, so contributions stay visible</li></ul></div>
<div class="card"><h4>Staying anchored to evidence</h4><ul style="margin:0">
<li>Every board starts with the HMW from Assignment 2</li><li>The persona POVs (Ananya, Kabir, Rohan, Meera) are pinned beside the board</li>
<li>Clusters are named after user needs, not technologies</li><li>Ideas are tagged later with the hypothesis they would test (H1 to H5)</li>
<li>For PS-T, we reused the same lenses: safety, access, engagement</li></ul></div>
</div>
<h3>From Define to Ideate</h3>
{table(["Assignment 2 output", "How it feeds this stage"], [
    ["Master POV: students need repeated proof they are on the right path", "Central lens for PS-1 and PS-2 mind maps: every branch must produce proof or reassurance"],
    ["HMW lenses (amplify, eliminate, opposite, assumptions, resources, analogy)", "Used as prompts when the brainstorm slowed down; analogies seeded the SCAMPER “Adapt” row"],
    ["Hypotheses H1 to H5", "Convergence criteria: concepts that can test a hypothesis rank higher"],
    ["Journey-map valleys (verification desk, room entry)", "Priority targets for PS-1 and PS-2 respectively"],
], ["45%", "55%"])}
</div>""")

# ------------------------------------------------------------------ MIND MAPS
MM = [
    ("PS-T", "Next-Gen Commuter Experience", [
        dict(name="Safety & Security", icon="🛡️", color="#d64545", angle=-140, nodes=[("🆘", "One-tap SOS to driver and control room"), ("📹", "Live CCTV with crowd-density alerts"), ("💡", "Lit safe-wait zones at stops"), ("🪪", "Driver and conductor ID on screen")]),
        dict(name="Accessibility", icon="♿", color="#2a6fb0", angle=-40, nodes=[("🛗", "Level boarding and ramps on demand"), ("🔊", "Audio and visual next-stop announcements"), ("🗣️", "Multilingual and tactile route info"), ("📶", "SMS or IVR arrival info for feature phones")]),
        dict(name="In-Transit Comfort", icon="🎧", color="#2a8a7f", angle=40, nodes=[("👥", "Real-time crowd level per coach"), ("🌡️", "Seat and temperature display"), ("📚", "Micro-learning and local stories")]),
        dict(name="Engagement & Payment", icon="🎮", color="#c98a00", angle=140, nodes=[("💳", "One QR or NCMC card for bus, metro and rail"), ("🏅", "Green-commute reward points"), ("⭐", "Rate-my-ride feedback loop")]),
    ], [("Live CCTV with crowd-density alerts", "Real-time crowd level per coach", "shared crowd data"),
        ("Lit safe-wait zones at stops", "SMS or IVR arrival info for feature phones", "less waiting at night"),
        ("Driver and conductor ID on screen", "Rate-my-ride feedback loop", "accountability")],
     ["Safety and comfort share one data source: crowd density helps a commuter both avoid a packed bus and feel safer.",
      "Accessibility ideas must also reach feature-phone users (SMS or IVR), not only app users.",
      "Engagement works best when it rewards behaviour that also helps the system, such as off-peak travel or feedback."]),
    ("PS-1", "Travel-Ready Registration", [
        dict(name="Verified Checklist", icon="📋", color="#2a6fb0", angle=-140, nodes=[("🗓️", "Dated, versioned checklist"), ("🖼️", "Annotated sample per document"), ("🔔", "Change alerts by SMS and email")]),
        dict(name="Upload Confidence", icon="☁️", color="#b5452f", angle=-40, nodes=[("💾", "Autosave and resume"), ("📏", "Size and format check before upload"), ("🔁", "Staggered upload windows")]),
        dict(name="Status & Proof", icon="✅", color="#2a8a7f", angle=40, nodes=[("🚦", "Per-document status lights"), ("🎫", "Ready to Report pass with QR"), ("💸", "Fee confirmed in under 15 min")]),
        dict(name="Unexpected Resources", icon="🔗", color="#c98a00", angle=140, nodes=[("🗂️", "DigiLocker and JoSAA verified documents"), ("🧑‍🎓", "Senior volunteers on the official FAQ"), ("👨‍👩‍👧", "One-page summary for parents")]),
    ], [("Annotated sample per document", "Size and format check before upload", "prevent rejections"),
        ("DigiLocker and JoSAA verified documents", "Per-document status lights", "auto-accepted items"),
        ("Change alerts by SMS and email", "One-page summary for parents", "family plans travel")],
     ["The checklist and the upload should be the same object: every list item becomes an upload slot with a status.",
      "The institute already holds verified data (JoSAA, DigiLocker). Reusing it shrinks the checklist instead of explaining it better.",
      "Parents are decision-makers for travel, so the proof has to reach them in plain language too."]),
    ("PS-2", "Gate-to-Room Arrival Day", [
        dict(name="Wayfinding & Flow", icon="🧭", color="#2a6fb0", angle=-140, nodes=[("🗺️", "Personal desk route on the token"), ("⏰", "Reporting time slots"), ("🪧", "Colour-coded floor trail")]),
        dict(name="Waiting Better", icon="🪑", color="#c98a00", angle=-40, nodes=[("📺", "Live now-serving screens"), ("🥤", "Shaded seating and water for families"), ("🎬", "Welcome content while waiting")]),
        dict(name="Trusted Help", icon="💬", color="#7a4fb0", angle=40, nodes=[("🧑‍🎓", "Badged senior buddies"), ("🤖", "Official WhatsApp FAQ bot"), ("🙋", "Single exception desk")]),
        dict(name="Room Ready", icon="🛏️", color="#2a8a7f", angle=140, nodes=[("✔️", "Pre-handover inspection card"), ("📱", "Scan-to-report QR on door"), ("🧺", "Day-one essentials kit")]),
    ], [("Personal desk route on the token", "Live now-serving screens", "same token data"),
        ("Badged senior buddies", "Scan-to-report QR on door", "buddy escalates"),
        ("Reporting time slots", "Shaded seating and water for families", "smaller crowds")],
     ["One token can drive the route, the wait screens and the hostel handover, so data entered once serves the whole day.",
      "Senior buddies are the bridge between the hall and the hostel. They are already trusted (PEER ≥16 in A1).",
      "Slots reduce peak crowding, which makes every waiting-comfort idea cheaper to deliver."]),
]
for code, center, branches, links, takeaways in MM:
    pcol = {p[0]: p[2] for p in PS}[code]
    hmw = {p[0]: p[3] for p in PS}[code]
    add(f"""<div class="wide">
<div style="display:flex;justify-content:space-between;align-items:baseline"><h2 style="font-size:16pt;margin:0">2. Individual Mind Map · <span style="color:{pcol}">{code}</span></h2>
<span class="small"><b>HMW:</b> {e(hmw)}</span></div>
<div style="margin-top:2mm">{mind_map(center, branches, links, H=600)}</div>
{mind_legend(branches)}
<div class="grid3 small" style="margin-top:2mm">{''.join(f'<div class="card" style="padding:2mm 3mm"><b style="color:{pcol}">Insight {k+1}.</b> {e(t)}</div>' for k, t in enumerate(takeaways))}</div>
</div>""")

# ------------------------------------------------------------------ BOARDS
BOARDS = [
    ("PS-T", "Brainstorm Board · PS-T Next-Gen Commuter", PS[0][3], [
        ("Feel Safe, Day & Night", "🛡️", "#d64545", [
            ("SD", "Panic button on every seat row that alerts the driver and the nearest police van", ("VS", "it also shares live GPS and a 10-second cabin clip"), 1),
            ("SS", "Women’s safe-seat zone near the driver, lit in purple", None, 2),
            ("KM", "Live crowd-density meter at stops, so you can skip a packed bus", None, 3),
            ("AP", "Night request to get off between stops after 9 pm", None, 4),
            ("VR", "Driver and conductor photo and ID QR shown on screen", None, 5),
            ("ST", "Commuter-rated safe-stop map", None, 6)]),
        ("Ride for Everyone", "♿", "#2a6fb0", [
            ("SR", "Wheelchair users pre-book ramp and priority space via SMS", ("SD", "the driver’s dashboard shows which stop needs the ramp"), 7),
            ("VS", "Handrail vibrates one stop before your destination", None, 8),
            ("SS", "Tactile and braille route strip on poles", None, 9),
            ("KM", "Announcements switch between Hindi, English and the regional language by route", None, 10),
            ("AP", "Missed-call IVR gives bus ETA to feature-phone users", None, 11),
            ("VR", "Kneeling low-floor buses on hospital and market routes", None, 12)]),
        ("Make the Ride Worth It", "🎧", "#c98a00", [
            ("ST", "Green-commute points redeemable at metro and canteen", ("SR", "double points for off-peak travel, to spread the crowd"), 13),
            ("SD", "Two-minute local-history audio stories tied to stops", None, 14),
            ("VS", "Quiet study coach with free Wi-Fi on trains", None, 15),
            ("SR", "One-tap rate-my-ride after alighting", None, 16),
            ("KM", "Seat-availability lights outside each coach", ("VR", "the same data feeds the crowd meter at stops"), 17),
            ("AP", "Single QR or NCMC card for bus, metro and rail", None, 18)]),
    ]),
    ("PS-1", "Brainstorm Board · PS-1 Certainty Before Travel", PS[1][3], [
        ("Know Exactly What to Bring", "📋", "#2a6fb0", [
            ("VS", "Personalised checklist generated from category, state and quota", ("SS", "each item expands to a photo of a correct sample"), 1),
            ("AP", "Advisory frozen 10 days before reporting, with a visible version number", None, 2),
            ("SR", "SMS, email and WhatsApp alert whenever any rule changes", None, 3),
            ("KM", "“Notary needed?” tag on every document", None, 4),
            ("SD", "One-page summary for parents in Hindi and English", None, 5),
            ("ST", "Seniors film a mock verification desk walkthrough", None, 6)]),
        ("Upload Once, Confidently", "☁️", "#b5452f", [
            ("VR", "Autosave every field; resume from the exact failed step", ("KM", "an offline mode queues uploads until the hotspot reconnects"), 7),
            ("SS", "Pre-upload checker flags size, format or blur before submit", None, 8),
            ("SD", "Staggered upload windows by roll number to avoid crashes", None, 9),
            ("AP", "Pull documents directly from DigiLocker or JoSAA", None, 10),
            ("ST", "Fee status auto-updates from the bank reference within 15 min", None, 11),
            ("SR", "Downloadable “Ready to Report” pass with QR, like airline web check-in", None, 12)]),
        ("Help That Answers Fast", "💬", "#7a4fb0", [
            ("KM", "Official WhatsApp FAQ bot that uses only the latest advisory", ("VS", "anything it cannot answer goes to a senior volunteer within 10 min"), 13),
            ("VR", "Bookable video-call document check before travel", None, 14),
            ("SS", "Help ticket with screenshot; one owner until resolved", None, 15),
            ("ST", "Seniors certified as verified helpers with an official badge", None, 16),
            ("SD", "Public change-log page: what changed, when and why", None, 17)]),
    ]),
    ("PS-2", "Brainstorm Board · PS-2 Gate to a Ready Room", PS[2][3], [
        ("Move Without Getting Lost", "🧭", "#2a6fb0", [
            ("SR", "Token shows a personal route: Desk A, then B, then C, then Hostel", ("VR", "it pings your phone when your desk is ready, so you can sit anywhere"), 1),
            ("VS", "Colour-coded floor trail from the gate to each desk", None, 2),
            ("SD", "Reporting slots by branch, assigned a week ahead", None, 3),
            ("KM", "Campus map card handed to families at the gate", None, 4),
            ("AP", "Express green lane for pre-verified students", None, 5),
            ("ST", "One exception desk at the entrance for every problem case", None, 6)]),
        ("Wait Less, Wait Better", "🪑", "#c98a00", [
            ("SS", "Live now-serving screens per desk", ("AP", "show the average time per student so families can plan"), 7),
            ("VR", "Shaded seating, fans and water for parents", None, 8),
            ("KM", "Welcome film and club stalls in the waiting hall", None, 9),
            ("SD", "Roaming verifiers come to seated families by token", None, 10),
            ("ST", "Parents’ lounge with an FAQ volunteer", None, 11)]),
        ("A Room Ready to Live In", "🛏️", "#2a8a7f", [
            ("VS", "Pre-handover inspection card signed by the caretaker", ("SR", "a photo of the inspected room is sent before arrival"), 12),
            ("AP", "QR on the door: scan, report, then track the repair", None, 13),
            ("SS", "Day-one essentials kit: bucket, mug, mattress cover", None, 14),
            ("SR", "Room and room-mate details shared 3 days early", None, 15),
            ("ST", "Warden’s first-night round with senior buddies", None, 16),
            ("KM", "Essentials map: water cooler, mess, medical, laundry", None, 17)]),
    ]),
]
for code, title, hmw, clusters in BOARDS:
    add(f'<div class="wide">{board(title, hmw, clusters)}</div>')

# yes-and summary page
ya_rows = []
for code, title, hmw, clusters in BOARDS:
    for label, icon, color, notes in clusters:
        for nt in notes:
            if nt[2]:
                ya_rows.append([f"<span class='tag t'>{code}</span>", f"<b>{nt[0]}</b>: {e(nt[1])}", f"<b>{nt[2][0]}</b>: …and {e(nt[2][1])}", e(label)])
add(f"""
<div class="section">
<h3 style="margin-top:0">3.1 “Yes, and…” builds across the three boards</h3>
<p>Each build kept the original idea and pushed it further. The builds were usually where the more novel ideas came from.</p>
{table(["Board", "Original idea", "“Yes, and…” build", "Cluster"], ya_rows, ["9%", "38%", "38%", "15%"])}
<h3>3.2 What clustering revealed</h3>
{table(["Board", "Clusters (named by user need)", "Observation"], [
    ["PS-T", "Feel Safe, Day & Night · Ride for Everyone · Make the Ride Worth It", "Safety ideas were the most numerous; accessibility ideas were the most specific. Engagement ideas worked best when they also helped the system run better."],
    ["PS-1", "Know Exactly What to Bring · Upload Once, Confidently · Help That Answers Fast", "The checklist cluster and the upload cluster kept merging, which showed the checklist and the upload should be one object (later SCAMPER “Combine”)."],
    ["PS-2", "Move Without Getting Lost · Wait Less, Wait Better · A Room Ready to Live In", "The token idea connected all three clusters, which made it the backbone of the PS-2 concept."],
], ["10%", "40%", "50%"])}
</div>""")

# ------------------------------------------------------------------ SCAMPER
def stars(n):
    return f'<span style="color:#c98a00;letter-spacing:.5px">{"★"*n}</span><span style="color:#ccc">{"★"*(5-n)}</span>'


SC = [
    ("PS-T", "Bus stop-request button", "A push-button on poles that sounds a bell and lights a “STOP” sign. It is hard to reach in a crowd, out of reach for some wheelchair users and children, and gives no confirmation to the person who pressed it.", [
        ("S", "Substitute", "Replace the push-button with a <b>capacitive touch strip along every handrail</b>, reachable from any seat or standing spot.", "Accessibility and hygiene; nobody has to push through a crowd", 4, 4),
        ("C", "Combine", "Merge stop request with <b>assistance and SOS</b>: short press to stop, long press for “need ramp or more time”, triple press for a silent alert to the driver and control room.", "Safety and accessibility from one familiar control", 5, 3),
        ("A", "Adapt", "Borrow from the <b>aircraft cabin call bell and game-controller haptics</b>: the strip glows, vibrates to confirm, and shows the seat zone on the driver display.", "The person pressing knows the request was received", 4, 4),
        ("M", "Modify / Magnify", "Enlarge the feedback: a <b>large LED panel</b> reads “STOP REQUESTED · Next: Civil Lines · ramp needed”, with an audio confirmation.", "Visually and hearing-impaired passengers are both informed", 4, 5),
        ("P", "Put to another use", "Off-peak, the strip becomes a <b>one-press poll</b> (“Was this bus clean?”), feeding the operator dashboard.", "Engagement; continuous service-quality data", 3, 4),
        ("E", "Eliminate", "Remove the button entirely: the <b>destination on the digital ticket or NCMC tap registers the stop automatically</b>.", "No action needed from passengers; fewer missed stops", 5, 2),
        ("R", "Reverse / Rearrange", "Reverse who signals: the <b>bus tells the passenger</b>. The ticket or phone vibrates “your stop is next” one stop ahead.", "Removes anxiety about missing the stop, especially for newcomers", 5, 3),
    ]),
    ("PS-1", "Registration advisory PDF (document checklist)", "A static PDF on the website listing documents for all categories. It has no version date and no samples, and it does not show which items the student has already completed. In A1, students reported documents asked for on campus that were not in this list.", [
        ("S", "Substitute", "Replace the static PDF with a <b>personalised interactive checklist</b> generated from the student’s JoSAA category, state and quota.", "Each student sees only their own items, which cuts confusion (US-01)", 5, 3),
        ("C", "Combine", "Merge the checklist with the ERP upload: <b>each checklist line is its own upload slot with a status light</b> (grey, amber, green, red).", "One place for “what” and “done”; addresses the missing accepted status (H2)", 5, 3),
        ("A", "Adapt", "Borrow <b>airline web check-in</b>: when every item turns green, issue a “Ready to Report” boarding pass with QR and reporting slot.", "Tangible proof before travel for student and parents (H1, H2)", 5, 4),
        ("M", "Modify / Magnify", "Magnify the examples: an <b>annotated sample for every document</b> showing where the stamp, signature and date must go.", "Fewer rejected or wrongly notarised documents (US-02)", 4, 5),
        ("P", "Put to another use", "After admissions, the same checklist becomes the <b>official FAQ knowledge base</b> for senior volunteers and the WhatsApp bot.", "One source of truth for every helper (US-19, H4)", 4, 5),
        ("E", "Eliminate", "Drop documents <b>already verified through JoSAA or DigiLocker</b>, and drop notarisation wherever institute policy accepts self-attestation.", "Shorter list, less cost, fewer notary visits (US-04)", 5, 3),
        ("R", "Reverse / Rearrange", "Reverse the burden: the institute <b>pre-fills what it already knows</b> (“we have 7 of 9; upload these 2”) instead of the student discovering requirements.", "The institute proves readiness to the student (HMW H06)", 5, 3),
    ]),
    ("PS-2", "Paper token queue at the registration hall", "A paper slip with a number, issued at the entrance. It does not show which desk comes next or how long the wait is. Tokens ran out for later arrivals, and families waited standing in the heat (A1: QUE ≈9, NAV ≈8).", [
        ("S", "Substitute", "Replace paper with a <b>QR e-token on SMS or WhatsApp</b>, tied to a pre-assigned reporting slot.", "No running out of tokens; arrival is spread through the day (US-16)", 4, 4),
        ("C", "Combine", "Merge the token with the <b>personal desk route and hostel room number</b>: one pass for the whole day.", "Students always know the next step (US-13, H3)", 5, 4),
        ("A", "Adapt", "Borrow <b>theme-park virtual queues and hospital OPD displays</b>: families wait anywhere and are pinged when their desk is near.", "Families can rest in shade instead of standing in line", 5, 3),
        ("M", "Modify / Magnify", "Magnify visibility: <b>big now-serving screens per desk</b> with average time per student and the live total wait.", "The wait becomes known and plannable (US-14)", 4, 5),
        ("P", "Put to another use", "Off-peak, token kiosks and screens become <b>hostel defect-ticket desks</b> and orientation schedule boards.", "Reuses the hardware; supports room readiness (H5)", 3, 5),
        ("E", "Eliminate", "Remove the queue for <b>pre-verified students</b>: a green express lane straight to ID photo and hostel.", "Rewards pre-arrival work; shortens queues for everyone", 5, 4),
        ("R", "Reverse / Rearrange", "Rearrange the order: <b>hostel key and luggage drop first</b>, paperwork afterwards, or verifiers walk to seated families.", "Families rest in the room while the student completes the desks", 4, 3),
    ]),
]
for code, feat, before, rows in SC:
    pcol = {p[0]: p[2] for p in PS}[code]
    trs = [[f'<div style="font-family:\'Exo 2\';font-weight:800;font-size:20pt;color:{pcol};text-align:center;line-height:1">{l}</div><div class="small" style="text-align:center">{n}</div>',
            idea, f"<span class='small'>{why}</span>", stars(i), stars(f)] for l, n, idea, why, i, f in rows]
    add(f"""<div class="section">
<h2 style="font-size:17pt">4. SCAMPER Matrix · <span style="color:{pcol}">{code}</span></h2>
<div class="callout" style="border-color:{pcol}"><b class="lbl" style="color:{pcol}">Existing feature: {e(feat)}</b>{e(before)}</div>
{table(["", "Innovative variation", "User benefit (linked need)", "Impact", "Feasibility"], trs, ["12%", "44%", "24%", "10%", "10%"])}
</div>""")

# ------------------------------------------------------------------ CONVERGE
def mpts(lst, col):
    return [(a, x, y, col) for a, x, y in lst]

m1 = matrix_2x2(mpts([("Annotated samples", .15, .62), ("Ready to Report pass", .45, .9), ("Checklist = upload slots", .62, .92),
                      ("DigiLocker pull", .8, .82), ("WhatsApp FAQ bot + seniors", .35, .74), ("Change-log page", .1, .4),
                      ("Video-call doc check", .7, .45)], "#2a6fb0"), "Effort to build", "Impact on student",
                ["Quick wins", "Big bets", "Fill-ins", "Avoid for now"], W=560, H=360)
m2 = matrix_2x2(mpts([("Route on e-token", .45, .9), ("Now-serving screens", .3, .7), ("Senior buddies", .18, .78),
                      ("Room inspection card", .22, .88), ("QR defect report", .3, .8), ("Virtual queue pings", .7, .78),
                      ("Roaming verifiers", .78, .45), ("Welcome film", .2, .32)], "#2a8a7f"), "Effort to build", "Impact on student",
                ["Quick wins", "Big bets", "Fill-ins", "Avoid for now"], W=560, H=360)
add(f"""
<div class="section">
<h2>5. Converging: Selecting Concepts</h2>
<p>We placed the strongest ideas from the mind maps, boards and SCAMPER on an <b>impact versus effort</b> grid, then combined compatible ideas
into one concept per problem statement. Ideas that can directly test an Assignment 2 hypothesis were ranked higher.</p>
<div class="grid2"><div class="avoid"><h4>PS-1 candidates</h4>{m1}</div><div class="avoid"><h4>PS-2 candidates</h4>{m2}</div></div>
<div class="figcap">Figure. Impact versus effort plots. Positions are team estimates to be checked with admissions, ERP and hostel staff.</div>
{table(["Criterion (weight)", "ReadyPass (PS-1)", "Gate-to-Room Pass (PS-2)", "Smart Stop Strip (PS-T)"], [
    ["Addresses the POV’s core insight (30%)", "5: proof before travel", "5: reassurance at every handoff", "4: confirmation of request"],
    ["Evidence from Empathize or brief (25%)", "5: DOC, ERP", "5: QUE, NAV, PEER, HOST", "4: course brief"],
    ["Feasible in one admission cycle (20%)", "3", "4", "3"],
    ["Tests a hypothesis (15%)", "H1, H2", "H3, H4, H5", "n/a"],
    ["Novelty (10%)", "4", "4", "5"],
    ["<b>Weighted score / 5</b>", "<b>4.5</b>", "<b>4.7</b>", "<b>3.9</b>"],
], ["31%", "23%", "23%", "23%"])}
</div>
<div class="section">
<h3 style="margin-top:0">5.1 Selected concepts</h3>
<div class="card" style="border-left:6px solid #2a6fb0;margin-bottom:3mm"><h4>ReadyPass · PS-1 Certainty before travel</h4>
A personalised checklist built from the student’s category, in which <b>every line is an upload slot with a status light</b>. Items already verified through JoSAA or DigiLocker turn green automatically.
Each item shows an annotated sample and a notarisation tag. When all items are green, the student and parents receive a <b>“Ready to Report” pass</b> with a QR code and reporting slot.
Any rule change triggers an alert and a change-log entry.<br><span class="small"><b>Built from:</b> SCAMPER S, C, A, E, R · Board ideas 1, 4, 7, 10, 12 · Mind-map links “prevent rejections” and “auto-accepted items” · <b>Tests:</b> H1, H2</span></div>
<div class="card" style="border-left:6px solid #2a8a7f;margin-bottom:3mm"><h4>Gate-to-Room Pass · PS-2 From gate to a ready room</h4>
A slot-based e-token that shows the student’s <b>personal desk route, live wait time and hostel room</b>. It pings families when their desk is near, so they can wait in shaded seating. Pre-verified students use a green lane.
<b>Badged senior buddies</b> answer questions from the same official FAQ. Every room passes an <b>inspection card</b> before handover and carries a <b>scan-to-report QR</b> with visible repair status.<br>
<span class="small"><b>Built from:</b> SCAMPER S, C, A, M, E · Board ideas 1, 5, 7, 12, 13 · Mind-map links “same token data” and “buddy escalates” · <b>Tests:</b> H3, H4, H5</span></div>
<div class="card" style="border-left:6px solid #d64545;margin-bottom:3mm"><h4>Smart Stop Strip · PS-T Next-gen commuter experience</h4>
A <b>touch strip along handrails</b> with three modes: tap to stop, hold for assistance (ramp or more time), triple-tap for a silent SOS to the driver and control room. A large LED panel confirms each request, and
the passenger’s ticket vibrates <b>“your stop is next”</b> one stop ahead.<br><span class="small"><b>Built from:</b> SCAMPER S, C, A, M, R · Board ideas 1, 7, 8</span></div>
<h3>5.2 Next step: prototype and test</h3>
{table(["Concept", "Low-fidelity prototype", "Test with", "Success signal (from A2 hypotheses)"], [
    ["ReadyPass", "Clickable Figma flow: checklist, status lights, Ready pass", "10 to 15 current first years plus 3 parents", "85% or more identify all documents; 80% or more say they would feel ready to travel"],
    ["Gate-to-Room Pass", "Paper tokens with printed routes; role-play of 3 desks; room inspection card on 5 rooms", "One section of juniors acting as arrivals, plus 2 wardens", "Clarity rating 4 out of 5 or higher; 50% fewer “where next?” questions; 90% of rooms pass"],
    ["Smart Stop Strip", "Cardboard handrail with an LED strip; storyboard of the three modes", "8 commuters, including 2 elderly and 1 wheelchair user", "All participants trigger the correct mode on the first try"],
], ["17%", "33%", "23%", "27%"])}
</div>""")

add(ai_section.render("Ideation"))
open(os.path.join(os.path.dirname(__file__), "build", "a3.html"), "w").write(doc("Ideation Stage Report", STAGE, "".join(B)))
print("a3 ok")
