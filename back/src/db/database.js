import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../panions.db');

let db;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema(db);
  }
  return db;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'member',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS paniers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      description TEXT,
      date_distribution DATE NOT NULL,
      disponible INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contenus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      panier_id INTEGER NOT NULL,
      legume TEXT NOT NULL,
      quantite REAL NOT NULL,
      unite TEXT NOT NULL,
      FOREIGN KEY (panier_id) REFERENCES paniers(id)
    );

    CREATE TABLE IF NOT EXISTS distributions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      panier_id INTEGER NOT NULL,
      lieu TEXT NOT NULL,
      date_heure DATETIME NOT NULL,
      statut TEXT NOT NULL DEFAULT 'planifiee',
      FOREIGN KEY (panier_id) REFERENCES paniers(id)
    );
  `);
}
