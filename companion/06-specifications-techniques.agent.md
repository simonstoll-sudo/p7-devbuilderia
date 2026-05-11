# Companion — Spécifications techniques

## Stack obligatoire

| Couche | Technologie | Version |
|---|---|---|
| Frontend | React | 18 |
| Build frontend | Vite | 5 |
| Router frontend | React Router | v6 |
| Backend | Node.js | 20 (ESM — `"type": "module"`) |
| Framework back | Express | 4 |
| Base de données | SQLite via better-sqlite3 | ^12.9.0 |
| Hachage | bcrypt | 5 |
| Tokens | jsonwebtoken | 9 |
| Tests unitaires/intégration | Vitest | 1 |
| Requêtes HTTP dans les tests | Supertest | 6 |
| Tests E2E | Playwright | dernière version |

**Restriction absolue** : pas de TypeScript, pas de Docker, pas de GitHub Actions.

---

## Modules JavaScript

Le backend utilise les **ES modules** (`import`/`export`, pas `require`/`module.exports`). Le fichier `package.json` du back contient `"type": "module"`.

---

## Variables d'environnement

Définies dans `back/.env` (à créer depuis `.env.example`). Ne jamais committer `.env`.

| Variable | Usage |
|---|---|
| `PORT` | Port d'écoute du back (défaut : 3000) |
| `JWT_SECRET` | Clé secrète pour signer les tokens JWT |
| `DB_PATH` | Chemin vers le fichier SQLite |
| `NODE_ENV` | `development` en local, `production` en déploiement |

---

## Structure de la base de données

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'membre'
);

CREATE TABLE paniers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  description TEXT,
  prix REAL,
  disponible INTEGER DEFAULT 1
);

CREATE TABLE contenus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  panier_id INTEGER,
  legume TEXT NOT NULL,
  quantite INTEGER,
  unite TEXT
);

CREATE TABLE distributions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  lieu TEXT,
  panier_id INTEGER
);
```

**Attention** : la colonne des légumes s'appelle `legume` (pas `legume_nom`).

---

## Authentification JWT

- Header HTTP : `Authorization: Bearer <token>`
- Token généré à l'inscription et à la connexion
- Vérifié par le middleware `authMiddleware.js` (`requireAuth`)
- Contenu du token : `{ id, email, role }`

---

## URLs de développement

- Frontend : `http://localhost:5173` (Vite dev server)
- Backend : `http://localhost:3000`
- Base URL API dans le front : `http://localhost:3000/api` (constante `BASE_URL` dans `api.js`)

---

## Configuration des tests

### Vitest (`back/vitest.config.js`)

```js
export default {
  test: {
    environment: 'node',
    pool: 'forks',
    poolOptions: { forks: { singleFork: true } }
  }
}
```

`singleFork: true` est important pour éviter des conflits sur la base SQLite quand plusieurs fichiers de test tournent en parallèle.

### Playwright (`e2e/playwright.config.js`)

- `baseURL` : `http://localhost:5173`
- Navigateur : Chromium
- Le back et le front doivent être lancés manuellement avant d'exécuter les tests E2E

---

## Contraintes qualité

- Pas de secrets hardcodés dans le code (`JWT_SECRET`, URLs, mots de passe)
- Validation des données entrantes aux endpoints `register` et `login`
- Gestion des erreurs : retourner des codes HTTP appropriés (400, 401, 404, 500)
- Le front doit gérer les états de chargement et d'erreur pour les appels API

---

## Compatibilité

- Navigateurs cibles : Chrome/Chromium dernière version (suffisant pour ce projet pédagogique)
- L'app est responsive (CSS fourni) mais l'audit d'accessibilité doit inclure les vues mobile
