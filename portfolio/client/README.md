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

 **Fonts**: Montserrat and Bebas Neue are loaded from Google Fonts in `index.html`. **Neue Montreal is a paid font** (Pangram Pangram) and isn't available on free font CDNs — the site currently falls back to a system sans-serif. If you have the licensed font files, add them via `@font-face` in `src/styles/global.css`.

## Design tokens

Colors, fonts, and spacing are centralized in `src/styles/global.css` as CSS custom properties (`--bg`, `--text`, `--accent`, etc.) — change them there to restyle the whole site at once.
