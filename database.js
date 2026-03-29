"use strict";

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const defaultDb = () => ({
  users: [],
  plans: {},
  journal: {},
  sos: {},
  vaultIndex: [],
});

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) return defaultDb();
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const data = JSON.parse(raw);
    return { ...defaultDb(), ...data };
  } catch {
    return defaultDb();
  }
}

function writeDb(data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

function nextUserId(db) {
  const max = db.users.reduce((m, u) => Math.max(m, u.id), 0);
  return max + 1;
}

function nextVaultId(db) {
  const max = db.vaultIndex.reduce((m, v) => Math.max(m, v.id), 0);
  return max + 1;
}

module.exports = {
  readDb,
  writeDb,
  nextUserId,
  nextVaultId,
  DATA_DIR,
  UPLOADS_DIR: path.join(__dirname, "uploads"),
};
