# Companion — Checklist de validation

> À partager avec l'étudiant quand il pense avoir terminé un livrable.
> Cette checklist l'aide à s'auto-évaluer avant la session mentoring.

---

## Livrable 1 — Code corrigé et testé

- [ ] Les 4 bugs sont corrigés (login fonctionne, détail panier s'affiche, no crash React)
- [ ] `npm run dev` dans `back/` démarre sans erreur
- [ ] `npm run dev` dans `front/` démarre sans erreur
- [ ] Le login avec `admin@panions.fr` / `admin123` fonctionne
- [ ] La page détail d'un panier affiche les légumes
- [ ] `npm test` dans `back/` : tous les tests passent
- [ ] `npm run test:coverage` : rapport de couverture disponible
- [ ] Les tests couvrent : hash bcrypt, validation des entrées, JWT (création + vérification + expiration)
- [ ] Les tests couvrent : endpoints GET /api/paniers, GET /api/paniers/:id, GET /api/paniers/distributions (avec et sans token)
- [ ] Les tests E2E Playwright passent (catalogue, login, distributions)
- [ ] Le code est commité et poussé sur le repo GitHub

---

## Livrable 2 — Compte rendu de débogage

- [ ] Un bloc par bug (les 4 bugs documentés)
- [ ] Pour chaque bug : symptôme décrit
- [ ] Pour chaque bug : cause racine identifiée (pas juste le symptôme)
- [ ] Pour chaque bug : correctif explicité avec justification
- [ ] Pour chaque bug : méthode de vérification décrite
- [ ] Langage clair, compréhensible pour un autre développeur

---

## Livrable 3 — Cahier de recette complété

- [ ] Parcours : accueil → catalogue → détail d'un panier → déroulé
- [ ] Parcours : filtres (disponibles / indisponibles) → déroulé
- [ ] Parcours : login avec mauvais identifiants → message d'erreur visible
- [ ] Parcours : login valide → accès distributions → déroulé
- [ ] Parcours : accès `/distributions` sans connexion → redirection login
- [ ] Résultats attendus vs obtenus remplis pour chaque scénario

---

## Livrable 4 — Documentation technique

- [ ] Rôle de chaque dossier/fichier clé expliqué
- [ ] Instructions d'installation complètes (clone → install → seed → .env → dev)
- [ ] Endpoints API documentés (méthode, URL, authentification requise, exemple de réponse)
- [ ] Code complexe commenté (middleware JWT, bcrypt, gestion erreurs)

---

## Livrable 5 — Rapport d'audit automatisé

- [ ] Lighthouse exécuté sur un build (pas le dev server)
- [ ] Captures d'écran des scores (Performance, Accessibilité, Bonnes pratiques, SEO)
- [ ] npm audit exécuté, résultat joint
- [ ] WAVE ou axe DevTools : violations d'accessibilité listées

---

## Livrable 6 — Note de synthèse et préconisations

- [ ] Alertes classées par priorité (haute / moyenne / basse)
- [ ] Corrections techniques proposées pour chaque alerte prioritaire
- [ ] Impact estimé (effort, bénéfice)

---

## Livrable 7 — Tableau comparatif des hébergeurs

- [ ] Au moins 3 hébergeurs comparés
- [ ] Critères objectifs : prix, support Node.js, support SQLite, simplicité, performances
- [ ] Choix final justifié

---

## Livrable 8 — Artefacts de production

- [ ] `npm run build` dans `front/` génère un dossier `dist/` sans erreur
- [ ] `.env.example` complet et à jour
- [ ] `.env` absent du repo (dans `.gitignore`)
- [ ] Variables de production définies (`NODE_ENV=production`, `JWT_SECRET` sécurisé)

---

## Livrable 9 — Checklist de mise en production

- [ ] Tous les items de la checklist cochés ou explicitement justifiés
- [ ] HTTPS mentionné comme exigence de production
- [ ] Gestion des secrets documentée
- [ ] Limite de SQLite sur les systèmes de fichiers éphémères mentionnée
