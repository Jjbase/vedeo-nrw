# VEDEO NRW – Anmeldung (GitHub Pages, Vite + React)

Deutsche, farbenfrohe Landing Page (Schwarz‑Rot‑Gold) zur Anmeldung für das VEDEO NRW Treffen am 11.10.2025 in Düsseldorf.

## Lokale Entwicklung
```bash
npm install
npm run dev
```
Öffnen: http://localhost:5173

## Deployment auf GitHub Pages
- `vite.config.js` ist auf `base: '/vedeo-nrw/'` gesetzt. Falls das Repo anders heißt, dort anpassen.
- GitHub → Settings → Pages → **Source = GitHub Actions**.
- Der Workflow `.github/workflows/deploy.yml` baut & veröffentlicht automatisch.

## E-Mail Adresse
Die Zieladresse für den „Als E-Mail öffnen“-Button ist auf **zollnerjosef3@gmail.com** gesetzt (in `src/VedeoLanding.jsx`).
