# Companion — Spécifications fonctionnelles

## Pages et comportements attendus

### Page d'accueil `/`

- Affiche un bandeau de présentation de l'association (composant `InfoBanner`)
- Affiche une barre de filtres : **Tous** / **Disponibles** / **Indisponibles**
- Affiche la liste des paniers sous forme de cartes (`PanierCard`)
- Chaque carte affiche : nom du panier, prix, statut de disponibilité
- Un clic sur une carte redirige vers `/paniers/:id`
- Les filtres mettent à jour la liste en temps réel (sans rechargement de page)
- Les paniers non disponibles affichent un badge "Complet"

### Page détail `/paniers/:id`

- Affiche le nom et la description du panier
- Affiche la liste des légumes avec quantité et unité
- Si le chargement est en cours : afficher un indicateur
- Si une erreur survient : afficher un message d'erreur
- Si le panier n'est pas trouvé : afficher un message approprié

### Page login `/login`

- Formulaire avec champs email et mot de passe
- Soumission : appel à `POST /api/auth/login`
- Cas nominal : token reçu → stocké, redirection vers `/distributions`
- Identifiants incorrects : message d'erreur affiché à l'utilisateur
- Utilisateur déjà connecté : redirigé automatiquement

### Page distributions `/distributions`

- Accessible uniquement aux utilisateurs authentifiés (token JWT valide)
- Si non connecté : redirection vers `/login`
- Affiche les informations de distribution (données issues du back)

### Page à propos `/about`

- Présentation de l'association Panions
- Informations de contact

### Navigation

- `Navbar` présente sur toutes les pages
- Liens : Paniers (`/`), À propos (`/about`), Connexion (`/login`) si non connecté
- Liens : Paniers (`/`), À propos (`/about`), Distributions (`/distributions`), Déconnexion si connecté
- Déconnexion : supprime le token stocké, retour à l'état non-connecté

---

## API — Endpoints

### `POST /api/auth/register`

- Crée un compte utilisateur
- Body : `{ email, password }`
- Validation : email requis, password requis (longueur min 6)
- Mot de passe stocké hashé (jamais en clair)
- Retourne 201 + token JWT en cas de succès
- Retourne 400 si email déjà utilisé ou données invalides

### `POST /api/auth/login`

- Authentifie un utilisateur
- Body : `{ email, password }`
- Retourne 200 + token JWT si identifiants corrects
- Retourne 401 si email inconnu ou mot de passe incorrect

### `GET /api/paniers`

- Route publique (sans authentification)
- Retourne la liste des paniers avec leurs attributs (id, nom, description, prix, disponible)

### `GET /api/paniers/:id`

- Route publique
- Retourne un panier avec son tableau `contenus` (chaque contenu : legume, quantite, unite)
- Retourne 404 si panier non trouvé

### `GET /api/paniers/distributions`

- Route protégée (token JWT requis en header `Authorization: Bearer <token>`)
- Retourne 401 sans token ou avec token invalide
- Retourne les informations de distribution pour les membres authentifiés

---

## Règles métier

- Un panier peut être **disponible** (`disponible = 1`) ou **complet** (`disponible = 0`)
- Le champ `prix` est un nombre décimal (ex: 18.50)
- Les mots de passe sont toujours hashés avec bcrypt avant stockage
- Le token JWT contient : `id`, `email`, `role` de l'utilisateur
- Le token a une durée de vie limitée (configurée dans le back)
- `requireAdmin` refuse l'accès aux utilisateurs sans le rôle `admin`

---

## Ce qui est hors scope

- Pas de création/modification/suppression de paniers depuis le front (opérations admin back-office hors périmètre)
- Pas d'inscription depuis le front (register accessible via API uniquement pour les tests)
- Pas de gestion de profil utilisateur
- Pas de panier d'achat ou de commande
