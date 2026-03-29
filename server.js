"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  readDb,
  writeDb,
  nextUserId,
  nextVaultId,
  UPLOADS_DIR,
} = require("./database.js");

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-only-change-me";
const GOOGLE_AI_KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-2.5-flash";

const CHAT_SYSTEM = `You are a warm, compassionate support companion inside a women's safety app called SafeSpace (hidden inside a shopping app called SafeCart). The user may be experiencing domestic violence, emotional abuse, or crisis. Respond with empathy, warmth, and care. Never judge. Offer practical, gentle guidance. You speak Kerala-aware English. If the user seems in immediate danger, always mention they can call 112 (Police) or 181 (Women's Helpline) or 1091. Keep responses concise — 2-4 sentences unless the user needs more.`;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({
  dest: UPLOADS_DIR,
  limits: { fileSize: 4 * 1024 * 1024 },
});

function authMiddleware(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not signed in." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Session expired. Sign in again." });
  }
}

function optionalAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch {
      req.user = null;
    }
  } else req.user = null;
  next();
}

function findUserByEmail(db, email) {
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function findUserById(db, id) {
  return db.users.find((u) => u.id === id);
}

app.post("/api/auth/register", async (req, res) => {
  const { email, password, name, safePassword } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });
  if (password.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  if (!safePassword || safePassword.length < 4)
    return res
      .status(400)
      .json({ error: "Private space password is required (min 4 characters)." });

  const db = readDb();
  if (findUserByEmail(db, email))
    return res.status(409).json({ error: "An account with this email already exists." });

  const passwordHash = await bcrypt.hash(password, 10);
  const safePasswordHash = await bcrypt.hash(safePassword, 10);
  const user = {
    id: nextUserId(db),
    email: String(email).trim().toLowerCase(),
    name: (name && String(name).trim()) || "",
    passwordHash,
    safePasswordHash,
    createdAt: Date.now(),
  };
  db.users.push(user);
  writeDb(db);

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });

  const db = readDb();
  const user = findUserByEmail(db, email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ error: "Invalid email or password." });

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  const db = readDb();
  const user = findUserById(db, req.user.sub);
  if (!user) return res.status(401).json({ error: "User not found." });
  res.json({ id: user.id, email: user.email, name: user.name });
});

app.post("/api/safe/unlock", authMiddleware, async (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: "Password required." });

  const db = readDb();
  const user = findUserById(db, req.user.sub);
  if (!user || !user.safePasswordHash)
    return res.status(400).json({ error: "No private password set for this account." });

  const ok = await bcrypt.compare(password, user.safePasswordHash);
  if (!ok) return res.status(403).json({ error: "Incorrect private password." });
  res.json({ ok: true });
});

app.post("/api/safe/set-password", authMiddleware, async (req, res) => {
  const { password, currentPassword } = req.body || {};
  if (!password || password.length < 4)
    return res.status(400).json({ error: "New password must be at least 4 characters." });

  const db = readDb();
  const user = findUserById(db, req.user.sub);
  if (!user) return res.status(404).json({ error: "User not found." });

  if (user.safePasswordHash) {
    if (!currentPassword)
      return res.status(400).json({ error: "Current private password required." });
    if (!(await bcrypt.compare(currentPassword, user.safePasswordHash)))
      return res.status(403).json({ error: "Current password is incorrect." });
  }

  user.safePasswordHash = await bcrypt.hash(password, 10);
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/safety-plan", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = String(req.user.sub);
  res.json(db.plans[uid] || {});
});

app.post("/api/safety-plan", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = String(req.user.sub);
  db.plans[uid] = req.body && typeof req.body === "object" ? req.body : {};
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/journal", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = String(req.user.sub);
  res.json(db.journal[uid] || {});
});

app.post("/api/journal", authMiddleware, (req, res) => {
  const { date, mood, note } = req.body || {};
  if (!date) return res.status(400).json({ error: "date required (YYYY-MM-DD)" });
  const db = readDb();
  const uid = String(req.user.sub);
  if (!db.journal[uid]) db.journal[uid] = {};
  db.journal[uid][date] = {
    mood: mood != null ? String(mood) : null,
    note: note != null ? String(note) : "",
    ts: Date.now(),
  };
  writeDb(db);
  res.json({ ok: true });
});

app.delete("/api/journal", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = String(req.user.sub);
  db.journal[uid] = {};
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/sos", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = String(req.user.sub);
  res.json(db.sos[uid] || { name: "", phone: "", msg: "" });
});

app.post("/api/sos", authMiddleware, (req, res) => {
  const { name, phone, msg } = req.body || {};
  const db = readDb();
  const uid = String(req.user.sub);
  db.sos[uid] = {
    name: name != null ? String(name) : "",
    phone: phone != null ? String(phone) : "",
    msg: msg != null ? String(msg) : "",
  };
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/vault", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = req.user.sub;
  const list = db.vaultIndex.filter((v) => v.userId === uid);
  res.json(
    list.map((v) => ({
      id: v.id,
      name: v.originalName,
      mime: v.mime,
      createdAt: v.createdAt,
    }))
  );
});

app.post("/api/vault", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  const db = readDb();
  const uid = req.user.sub;
  const id = nextVaultId(db);
  const originalName = req.file.originalname || "file";
  const mime = req.file.mimetype || "application/octet-stream";

  db.vaultIndex.push({
    id,
    userId: uid,
    diskPath: req.file.path,
    originalName,
    mime,
    createdAt: Date.now(),
  });
  writeDb(db);
  res.json({ ok: true, id, name: originalName, mime });
});

app.get("/api/vault/file/:id", optionalAuth, (req, res) => {
  const qToken = req.query.token;
  const h = req.headers.authorization || "";
  const headerToken = h.startsWith("Bearer ") ? h.slice(7) : null;
  const token = qToken || headerToken;
  if (!token) return res.status(401).end();

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).end();
  }

  const db = readDb();
  const vid = Number(req.params.id);
  const item = db.vaultIndex.find((v) => v.id === vid && v.userId === payload.sub);
  if (!item || !fs.existsSync(item.diskPath)) return res.status(404).end();

  res.setHeader("Content-Type", item.mime);
  res.setHeader("Content-Disposition", "inline");
  fs.createReadStream(item.diskPath).pipe(res);
});

app.delete("/api/vault/:id", authMiddleware, (req, res) => {
  const db = readDb();
  const uid = req.user.sub;
  const vid = Number(req.params.id);
  const idx = db.vaultIndex.findIndex((v) => v.id === vid && v.userId === uid);
  if (idx === -1) return res.status(404).json({ error: "Not found." });

  const item = db.vaultIndex[idx];
  try {
    if (item.diskPath && fs.existsSync(item.diskPath)) fs.unlinkSync(item.diskPath);
  } catch (_) {}
  db.vaultIndex.splice(idx, 1);
  writeDb(db);
  res.json({ ok: true });
});

app.post("/api/chat", authMiddleware, async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || !messages.length)
    return res.status(400).json({ error: "messages array required" });

  if (!GOOGLE_AI_KEY) {
    return res.json({
      reply:
        "I'm here with you. Add GOOGLE_AI_API_KEY to your server .env for full AI replies (Google Gemini). You can call the Women's Helpline at 181 or 1091 anytime — you are not alone.",
    });
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content) }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GOOGLE_AI_KEY)}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: CHAT_SYSTEM }] },
        contents,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        },
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      console.error("Gemini error:", data);
      return res.status(502).json({
        reply:
          "I'm having trouble reaching the AI just now. Please try again, or call 181 or 1091 if you need immediate support.",
      });
    }
    const reply =
      data.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text ||
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here with you. You are not alone.";
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(502).json({
      reply:
        "Connection issue. You can still call 181 or 1091 anytime. I'm sorry this is hard.",
    });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`SafeCart server http://localhost:${PORT}`);
  if (!GOOGLE_AI_KEY)
    console.log("Tip: set GOOGLE_AI_API_KEY in .env for Gemini chat (Google AI Studio).");
});
