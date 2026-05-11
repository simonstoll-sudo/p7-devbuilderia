import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDb } from '../db/database.js';

export async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
  }

  try {
    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

    if (existing) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const result = db.prepare(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)'
    ).run(email, password_hash, 'member');

    res.status(201).json({ message: 'Compte créé avec succès.', id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  try {
    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    const isValid = password === user.password_hash;

    if (!isValid) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}
