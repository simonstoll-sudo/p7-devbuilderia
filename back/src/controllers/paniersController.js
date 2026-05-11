import { getDb } from '../db/database.js';

export function getAllPaniers(req, res) {
  try {
    const db = getDb();
    const paniers = db.prepare(`
      SELECT id, nom, description, prix, date_distribution, disponible, created_at
      FROM paniers
      ORDER BY date_distribution ASC
    `).all();

    res.json(paniers);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

export function getPanierById(req, res) {
  const { id } = req.params;

  try {
    const db = getDb();
    const panier = db.prepare(`
      SELECT id, nom, description, prix, date_distribution, disponible
      FROM paniers WHERE id = ?
    `).get(id);

    if (!panier) {
      return res.status(404).json({ message: 'Panier introuvable.' });
    }

    const contenus = db.prepare(`
      SELECT legume_nom, quantite, unite FROM contenus WHERE panier_id = ?
    `).all(id);

    res.json({ ...panier, contenus });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

export function getDistributions(req, res) {
  try {
    const db = getDb();
    const distributions = db.prepare(`
      SELECT d.id, d.lieu, d.date_heure, d.statut, p.nom AS panier_nom
      FROM distributions d
      JOIN paniers p ON p.id = d.panier_id
      ORDER BY d.date_heure ASC
    `).all();

    res.json(distributions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}
