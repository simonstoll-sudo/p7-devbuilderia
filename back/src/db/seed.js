import 'dotenv/config';
import bcrypt from 'bcrypt';
import { getDb } from './database.js';

async function seed() {
  const db = getDb();

  db.exec('DELETE FROM distributions');
  db.exec('DELETE FROM contenus');
  db.exec('DELETE FROM paniers');
  db.exec('DELETE FROM users');

  const adminHash = await bcrypt.hash('admin123', 10);
  const memberHash = await bcrypt.hash('membre123', 10);

  db.prepare(
    'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)'
  ).run('admin@panions.fr', adminHash, 'admin');

  db.prepare(
    'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)'
  ).run('membre@panions.fr', memberHash, 'member');

  const insertPanier = db.prepare(
    'INSERT INTO paniers (nom, description, date_distribution, disponible) VALUES (?, ?, ?, ?)'
  );

  const p1 = insertPanier.run('Panier Printemps', 'Légumes de saison du jardin partagé', '2026-05-15', 1);
  const p2 = insertPanier.run('Panier Été', 'Tomates, courgettes et herbes fraîches', '2026-06-12', 1);
  const p3 = insertPanier.run('Panier Découverte', 'Assortiment de légumes oubliés', '2026-05-08', 0);

  const insertContenu = db.prepare(
    'INSERT INTO contenus (panier_id, legume, quantite, unite) VALUES (?, ?, ?, ?)'
  );

  insertContenu.run(p1.lastInsertRowid, 'Carottes', 500, 'g');
  insertContenu.run(p1.lastInsertRowid, 'Poireaux', 3, 'pièces');
  insertContenu.run(p1.lastInsertRowid, 'Épinards', 200, 'g');
  insertContenu.run(p1.lastInsertRowid, 'Radis', 1, 'botte');

  insertContenu.run(p2.lastInsertRowid, 'Tomates cerises', 400, 'g');
  insertContenu.run(p2.lastInsertRowid, 'Courgettes', 2, 'pièces');
  insertContenu.run(p2.lastInsertRowid, 'Basilic', 1, 'botte');

  insertContenu.run(p3.lastInsertRowid, 'Panais', 400, 'g');
  insertContenu.run(p3.lastInsertRowid, 'Topinambours', 300, 'g');
  insertContenu.run(p3.lastInsertRowid, 'Rutabaga', 1, 'pièce');

  const insertDistrib = db.prepare(
    'INSERT INTO distributions (panier_id, lieu, date_heure, statut) VALUES (?, ?, ?, ?)'
  );

  insertDistrib.run(p1.lastInsertRowid, 'Place du marché — Stand B12', '2026-05-15 09:00:00', 'planifiee');
  insertDistrib.run(p2.lastInsertRowid, 'Salle communale — Entrée principale', '2026-06-12 17:00:00', 'planifiee');
  insertDistrib.run(p3.lastInsertRowid, 'Place du marché — Stand B12', '2026-05-08 09:00:00', 'terminee');

  console.log('Base de données initialisée avec succès.');
}

seed().catch(console.error);
