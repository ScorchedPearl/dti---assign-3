# IIITA Registration Experience · Group 10

Design Thinking project site (Empathize → Define → Ideate → Solution) with five built-in motion-graphic videos.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Option A: GitHub (recommended)
1. Create an empty GitHub repo and push this `website` folder to it.
2. On vercel.com choose **Add New → Project**, import the repo, keep the defaults (Framework: Next.js), and click **Deploy**.

Option B: Vercel CLI
```bash
npx vercel
```
Run it from inside the `website` folder and accept the defaults.

## Where things are

- `src/videos/*Video.tsx`: the five motion videos. Each scene is a pure function of time, so play, pause, scrub and chapters all work.
- `src/components/MotionVideo.tsx`: the video player (play/pause, chapter bar, captions, fullscreen, keyboard: Space, ←, →).
- `src/components/Empathize.tsx`, `Define.tsx`, `Ideate.tsx`: interactive sections.
- `src/data/content.json`: user stories, personas, journeys, mind maps, boards and SCAMPER, exported from the report sources.
- `public/gallery`: pages from the final A2/A3 PDFs; `public/docs`: the three submitted PDFs.

Need an MP4 of a video? Open the site, click fullscreen on the video, and screen-record (Cmd+Shift+5 on macOS).
