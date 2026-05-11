# Companion — Présentation du projet

## Contexte

Panions est une application web créée par une association locale qui prépare et distribue des paniers de légumes bio. Elle permet de consulter les paniers disponibles, de vérifier leur contenu et de suivre les informations utiles à l'organisation des distributions.

Une première version a été développée mais n'a jamais été mise en production. Le code contient des anomalies qui bloquent certains parcours. Des tests automatisés existent — unitaires (Vitest) et end-to-end (Playwright) — mais plusieurs sont cassés ou incomplets.

## Mission de l'étudiant

Vous intervenez comme développeur junior. Vous reprenez un projet existant avec pour objectif de :

1. **Diagnostiquer et corriger** les anomalies bloquantes
2. **Réparer et compléter** les tests automatisés
3. **Auditer** la performance, la sécurité et l'accessibilité
4. **Préparer** un déploiement propre sur une plateforme adaptée

Vous ne partez pas d'une page blanche. Vous ne construisez pas l'application — vous l'améliorez, la corrigez et la préparez pour la mise en ligne.

## Objectifs d'apprentissage

- Lire et comprendre un code existant (front + back)
- Déboguer méthodiquement (symptôme → cause racine → correctif)
- Écrire et réparer des tests unitaires, d'intégration et E2E
- Comprendre les briques sécuritaires d'une API (hachage de mot de passe, JWT)
- Utiliser des outils d'audit automatisés (Lighthouse, npm audit, WAVE)
- Préparer un déploiement (artefacts, variables d'environnement, hébergeur)

## Compétences évaluées

| Compétence | Description |
|---|---|
| Débogage méthodique | Identifier la cause racine, distinguer symptôme et cause |
| Tests unitaires | Écrire des tests Vitest sur des fonctions critiques (bcrypt, JWT, validation) |
| Tests d'intégration | Tester des endpoints Express avec Supertest |
| Tests E2E | Valider des parcours utilisateur avec Playwright |
| Audit qualité | Lighthouse, npm audit, WAVE/axe DevTools |
| Déploiement | Comparer des hébergeurs, préparer des artefacts de production |

## Les 9 livrables

1. Code corrigé et testé (URL du repository)
2. Compte rendu de débogage
3. Cahier de recette complété
4. Documentation technique
5. Rapport d'audit automatisé
6. Note de synthèse et préconisations
7. Tableau comparatif des hébergeurs
8. Artefacts de production
9. Checklist de mise en production
