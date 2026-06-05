# 🌰 Acornia TTRPG

A squirrel-themed tabletop roleplaying game web app for young adventurers!

## Deploy to Netlify

### Option A — Drag & Drop (Fastest)
1. Run `npm install && npm run build` in this folder
2. Go to [netlify.com](https://netlify.com) → Sign up / Log in
3. Drag the `dist/` folder onto the Netlify dashboard
4. Done! Your site is live! 🎉

### Option B — GitHub + Netlify (Recommended for updates)
1. Push this folder to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Connect your GitHub repo
4. Build settings are already in `netlify.toml` — just click Deploy!

### Option C — Netlify CLI
```bash
npm install -g netlify-cli
npm install
npm run build
netlify deploy --prod --dir=dist
```

## Local Development
```bash
npm install
npm run dev
```
Then open http://localhost:5173

## Features
- 🐿️ Character creator with 5 folk & 4 classes
- 📈 Full leveling system (levels 1–10)
- 📖 Complete rules reference
- 🎲 Animated dice roller
- ⚔️ Combat tracker
- 👤 NPC generator
- 📝 Session notes
- 💾 Persistent character storage
