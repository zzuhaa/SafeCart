# SafeCart (hackathon demo)

Disguised fashion storefront (Layer 1) with a hidden **Safe Space** (Layer 2): Kerala helplines, AI chat (via your API key), legal info, safety plan, grounding exercises, encrypted-at-rest-style file vault per user, SOS SMS helper, shelter list, mood journal.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer  
- npm

## Setup

```bash
cd "Project SafeCart"
```

Windows CMD: `copy .env.example .env`  
PowerShell: `Copy-Item .env.example .env`

Edit `.env`:

- `JWT_SECRET` — long random string  
- `GOOGLE_AI_API_KEY` — optional; get a key from [Google AI Studio](https://aistudio.google.com/apikey). Without it, chat shows a supportive fallback instead of calling **Gemini**.  

## Run

```bash
npm install
npm start
```

Open **http://localhost:3000**

## Demo flow

1. **Create Account** — shop password (min 6 chars) + **private space password** (min 4 chars, stored hashed on the server).  
2. Browse the shop; **tap the logo 5 times within 3 seconds** (while signed in).  
3. Enter your **private space password** — verified by `POST /api/safe/unlock`.  
4. Use **← Back to Shopping** for instant return to the storefront.  
5. **Sign In** button shows **Account** when logged in; click again to **sign out**.

Data is stored under `data/db.json`; uploads under `uploads/`. Replace with PostgreSQL / S3 for production.

## API (all JSON except vault upload)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/register` | — | Register + set private password |
| POST | `/api/auth/login` | — | Login → JWT |
| GET | `/api/auth/me` | Bearer | Current user |
| POST | `/api/safe/unlock` | Bearer | Check private password |
| GET/POST | `/api/safety-plan` | Bearer | Safety plan |
| GET/POST/DELETE | `/api/journal` | Bearer | Mood journal |
| GET/POST | `/api/sos` | Bearer | Trusted contact |
| GET/POST/DELETE | `/api/vault` | Bearer | File list / upload / delete |
| GET | `/api/vault/file/:id?token=JWT` | query | View thumbnail (for `<img src>`) |
| POST | `/api/chat` | Bearer | AI messages → Google Gemini |

## Mobile

Same URL on phone and desktop; layout uses responsive CSS. For HTTPS on LAN, use a tunnel (e.g. ngrok) if you need secure context features.
