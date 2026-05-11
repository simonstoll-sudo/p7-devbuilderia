# Companion — Starter pack étudiant

## Ce qui est déjà présent dans le repo

### Structure générale

```
p7-devbuilderia/
├── README.md              ← Instructions d'installation et de lancement
├── agents.md              ← Point d'entrée de l'assistant (ce fichier)
├── back/                  ← Backend Node.js/Express
├── front/                 ← Frontend React/Vite
└── e2e/                   ← Tests end-to-end Playwright
```

### Backend (`back/`)

```
back/
├── package.json           ← Dépendances : express, better-sqlite3, bcrypt, jsonwebtoken, vitest, supertest
├── vitest.config.js       ← Configuration des tests unitaires
├── .env.example           ← Template des variables d'environnement (à copier en .env)
└── src/
    ├── server.js          ← Point d'entrée Express, montage des routes
    ├── db/
    │   ├── database.js    ← Connexion SQLite (singleton), création des tables
    │   └── seed.js        ← Données de test (3 paniers, 2 utilisateurs)
    ├── middleware/
    │   └── authMiddleware.js  ← requireAuth (vérifie JWT) + requireAdmin
    ├── routes/
    │   ├── auth.js        ← POST /api/auth/register, POST /api/auth/login
    │   └── paniers.js     ← GET /api/paniers, GET /api/paniers/:id, GET /api/paniers/distributions
    └── controllers/
        ├── authController.js    ← Logique register/login (contient un bug)
        └── paniersController.js ← Logique CRUD paniers (contient un bug)
```

**Tests existants (partiels, certains cassés) :**
```
back/tests/
├── auth.test.js     ← Squelette de tests — à compléter et réparer
└── paniers.test.js  ← Quelques tests passants, un échoue
```

### Frontend (`front/`)

```
front/
├── package.json     ← react, react-dom, react-router-dom, vite
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx     ← Point d'entrée React
    ├── App.jsx      ← Router avec routes : /, /paniers/:id, /login, /distributions, /about
    ├── index.css    ← Styles globaux
    ├── services/
    │   └── api.js   ← Centralise tous les appels HTTP (contient un bug)
    ├── pages/
    │   ├── Home.jsx          ← Catalogue des paniers avec FilterBar + InfoBanner
    │   ├── PanierDetail.jsx  ← Détail d'un panier avec son contenu (contient un bug)
    │   ├── Login.jsx         ← Formulaire de connexion
    │   ├── Distributions.jsx ← Page réservée aux membres connectés
    │   └── About.jsx         ← Présentation de l'association + contact
    └── components/
        ├── PanierCard.jsx    ← Carte affichant un panier (prix, disponibilité)
        ├── Navbar.jsx        ← Navigation principale
        ├── InfoBanner.jsx    ← Bandeau de présentation association
        └── FilterBar.jsx     ← Filtres : Tous / Disponibles / Indisponibles
```

### Tests E2E (`e2e/`)

```
e2e/
├── playwright.config.js  ← baseURL: localhost:5173, chromium
├── paniers.spec.js       ← Tests catalogue + navigation + contenu
└── auth.spec.js          ← Tests login valide/invalide + distributions
```

**État des tests E2E :** les tests sont corrects, mais ils échouent parce que les fonctionnalités qu'ils vérifient sont cassées. Une fois les bugs corrigés, les tests doivent passer.

---

## Ce que l'étudiant doit faire

1. **Identifier et corriger** les anomalies dans le code (4 bugs + 1 test cassé)
2. **Réparer** les tests Vitest cassés (`auth.test.js`)
3. **Compléter** la couverture de tests : briques sécuritaires du back (bcrypt, JWT)
4. **Écrire** des tests d'intégration complets sur les endpoints Express
5. **Vérifier** que les tests Playwright passent après les corrections
6. **Dérouler** le cahier de recettes manuellement
7. **Rédiger** la documentation technique
8. **Effectuer** les audits (Lighthouse, npm audit, WAVE/axe)
9. **Comparer** des hébergeurs et préparer les artefacts de production

---

## Ordre logique recommandé

1. Installer les dépendances (`npm install` dans `back/` ET dans `front/`)
2. Copier `.env.example` en `.env` dans `back/`
3. Seeder la base : `npm run seed` dans `back/`
4. Lancer le back (`npm run dev`) et explorer l'API manuellement
5. Lancer le front et naviguer dans l'app — noter les comportements anormaux
6. Corriger les bugs un par un en commençant par ceux repérés via les logs back
7. Lancer les tests Vitest et réparer les erreurs d'import
8. Compléter les tests jusqu'à couvrir les briques sécuritaires
9. Vérifier que les tests Playwright passent
10. Passer à l'audit puis au déploiement

---

## Modèle de référence — `front/src/services/api.js`

Ce fichier contient plusieurs fonctions déjà correctement implémentées (`getPaniers`, `getPanierById`, `getDistributions`). La constante `BASE_URL` en tête de fichier est le modèle à suivre pour uniformiser tous les appels HTTP. C'est LE point de référence pour comprendre comment structurer les requêtes dans ce projet.

---

## Données disponibles après seed

| Email | Mot de passe | Rôle |
|---|---|---|
| `admin@panions.fr` | `admin123` | admin |
| `membre@panions.fr` | `membre123` | membre |

Trois paniers sont disponibles en base, avec leurs contenus en légumes.
