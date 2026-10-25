import subprocess, re, sys, os
S = os.path.dirname(os.path.abspath(__file__))
HEAD = {
 'a2': ["1. From Empathize to Define", "2. Who Is the User?", "3. User Stories", "4. How Might We Questions", "5. Problem Statements",
        "6. Hypothesis Statements", "7. Point of View", "8. Customer Journey Map", "9. Traceability and Handoff", "10. Generative AI"],
 'a3': ["1. Ideation Approach", "2. Individual Mind Map", "3. Brainstorm Board", "4. SCAMPER Matrix", "5. Converging", "6. Generative AI"],
}
# a3 brainstorm pages have no "3." prefix; match board title instead
ALT = {'3. Brainstorm Board': 'Brainstorm Board · PS-T'}
def render(name):
    subprocess.run([f"{S}/render.sh", f"{S}/build/{name}.html", f"{S}/build/{name}.pdf"], check=True)
    out = subprocess.run(["swift", f"{S}/pdftext.swift", f"{S}/build/{name}.pdf"], capture_output=True, text=True).stdout
    return [p.split("===", 1)[1] if "===" in p else p for p in out.split("===PAGE ")[1:]]
for name in sys.argv[1:]:
    subprocess.run(["python3", f"{S}/{name}.py"], check=True)
    pages = render(name)
    toc_page = next(i for i, p in enumerate(pages) if "Report Contents" in p)
    html = open(f"{S}/build/{name}.html").read()
    for k, h in enumerate(HEAD[name], 1):
        key = ALT.get(h, h)
        pg = next((i + 1 for i, p in enumerate(pages) if i > toc_page and key in p), "?")
        html = html.replace(f"@@{k}@@", str(pg))
        print(name, h, pg)
    open(f"{S}/build/{name}.html", "w").write(html)
    pages = render(name)
    print(name, "pages:", len(pages))
