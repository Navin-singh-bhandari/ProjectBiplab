# Alex Rivera — Portfolio

A multi-page React (Vite) portfolio for a video editor & motion designer.

## Structure

- `/` — Home (hero, video reel, capabilities, featured works, CTA)
- `/about` — About / bio / timeline
- `/works` — Full project grid with filtering
- `/tools` — Software & hardware used
- `/contact` — Contact form + direct contact info

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> /dist
```

## To customize

1. **Name**: replace "ALEX RIVERA" in `src/components/Navbar.jsx`, `src/pages/Home.jsx`, and `src/components/Footer.jsx`.
2. **Showreel video**: in `src/pages/Home.jsx`, pass a `src` prop to `<VideoFrame />`, e.g. `<VideoFrame src="/reel.mp4" poster="/reel-poster.jpg" />`. Put the video file in `/public`.
3. **Projects**: edit `src/data/works.js` — add thumbnails by replacing the placeholder `<span>` blocks in `Home.jsx` / `Works.jsx` with `<img>` tags.
4. **Contact form**: `src/pages/Contact.jsx` currently just shows a success state on submit. Wire the `handleSubmit` function up to a form backend (Formspree, Resend, a serverless function, etc.) to actually receive submissions.
5. **Fonts**: Montserrat and Bebas Neue are loaded from Google Fonts in `index.html`. **Neue Montreal is a paid font** (Pangram Pangram) and isn't available on free font CDNs — the site currently falls back to a system sans-serif. If you have the licensed font files, add them via `@font-face` in `src/styles/global.css`.

## Design tokens

Colors, fonts, and spacing are centralized in `src/styles/global.css` as CSS custom properties (`--bg`, `--text`, `--accent`, etc.) — change them there to restyle the whole site at once.
