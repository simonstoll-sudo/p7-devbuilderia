# Panions

Application web de gestion et distribution de paniers de légumes bio en circuit court.

## Présentation

Panions permet à une association locale de publier ses paniers disponibles, d'en détailler le contenu et de gérer le calendrier des distributions. Les membres de l'association accèdent à un espace authentifié pour suivre les distributions planifiées.

---

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- npm v10+

---

## Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd panions

# Installer les dépendances (back + front)
npm install --prefix back
npm install --prefix front
```

### Configuration de l'environnement

```bash
cp back/.env.example back/.env
```

Éditer `back/.env` et renseigner une valeur pour `JWT_SECRET`.

### Initialiser la base de données

```bash
cd back && npm run seed
```

---

## Lancement

### En développement (deux terminaux)

**Terminal 1 — Backend**
```bash
cd back
npm run dev
# Serveur disponible sur http://localhost:3000
```

**Terminal 2 — Frontend**
```bash
cd front
npm run dev
# Interface disponible sur http://localhost:5173
```

---

## Tests

### Tests unitaires et d'intégration (Vitest)

```bash
cd back
npm test
```

Rapport de couverture :

```bash
npm run test:coverage
```

### Tests end-to-end (Playwright)

Démarrer le back et le front avant de lancer les tests E2E.

```bash
# Depuis la racine du projet
npx playwright test --config e2e/playwright.config.js
```

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js 20 + Express 4 |
| Base de données | SQLite (better-sqlite3) |
| Tests unitaires | Vitest + Supertest |
| Tests E2E | Playwright |

---

## Structure du projet

```
panions/
├── back/                    # API REST Node.js/Express
│   ├── src/
│   │   ├── server.js        # Point d'entrée Express
│   │   ├── db/
│   │   │   ├── database.js  # Connexion SQLite + schéma
│   │   │   └── seed.js      # Données initiales
│   │   ├── routes/          # Définition des routes
│   │   ├── controllers/     # Logique métier
│   │   └── middleware/      # Middlewares (auth)
│   └── tests/               # Tests Vitest
├── front/                   # Application React
│   └── src/
│       ├── pages/           # Composants de page
│       ├── components/      # Composants réutilisables
│       └── services/        # Appels API
└── e2e/                     # Tests Playwright
```

## API Endpoints

| Méthode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | — | Statut du serveur |
| POST | `/api/auth/register` | — | Créer un compte |
| POST | `/api/auth/login` | — | Se connecter |
| GET | `/api/paniers` | — | Lister les paniers |
| GET | `/api/paniers/:id` | — | Détail d'un panier |
| GET | `/api/paniers/distributions` | ✅ JWT | Distributions planifiées |

---

## Licence

MIT
