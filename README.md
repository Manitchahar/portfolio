# portfolio

Three iterations of my personal portfolio: React + TypeScript + Vite single-page sites with a Gemini-powered "ask about me" chat. Each version was its own repository; they're consolidated here with commit history preserved.

| Version | Folder | What changed |
| --- | --- | --- |
| v1 | [`v1/`](v1) | First version: hero, projects, skills, timeline, a recruiter view, and a Gemini chat assistant. |
| v2 | [`v2/`](v2) | Iteration on v1 with an animated anime-grid background and reworked components. |
| v3 (latest) | [`v3-material-expressive/`](v3-material-expressive) | Redesign using Material 3 Expressive ideas: new canvas background, an immersive ↔ recruiter view toggle, project cards, and a "neural interface" chat. |

## Run a version locally

```bash
cd v3-material-expressive
npm install
echo "GEMINI_API_KEY=your-key" > .env.local
npm run dev
```

> **Note:** these started as Google AI Studio templates, which inject the Gemini key into the client bundle at build time. That's fine for local dev, but **don't deploy with a real key**: anyone could read it from the page's JavaScript. For a public deploy, move the Gemini call behind a small server/edge function.
