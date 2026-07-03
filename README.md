# KULT Collection — Refonte du site

Refonte totale du site e-commerce de **KULT Collection** (maison d'artisanat : bougies parfumées, parfums d'intérieur, diffuseurs et céramique — art de vivre californien & méditerranéen).

Projet pédagogique **EEMI x KULT Collection** — pôle développement web (M1 WD).

---

## 🎯 Périmètre du pôle dev

- **Refonte du site vitrine + e-commerce** (B2C)
- **Espace B2B dédié** (compte revendeur, catalogue pro, panier, suivi de commande & de livraison)

Les volets TikTok et Salon Maison & Objet sont traités par les autres pôles — hors de notre scope.

---

## 🧱 Stack technique

| Couche | Techno | Rôle |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | Front, routing, rendu serveur (SSR/SSG) |
| Style | **Tailwind CSS v4** | Design system (design tokens dans `globals.css`) |
| État client | **Zustand** (persistant via `localStorage`) | Panier, commandes, compte, favoris, auth |
| Données (prototype) | **JSON** (`src/data/`) via `src/lib/repository.ts` | Source de données du prototype |
| Animations | **CSS** (keyframes) + reveal au scroll | Apparitions, hover, timelines |
| Déploiement | **Vercel** | Aperçus de déploiement |

> **Versions cibles** : Node 20+, Next.js 16, React 19.

---

## 🔌 Architecture « CMS-ready » — le point clé

Le prototype lit des données **mockées en JSON**, mais **aucun composant ne lit le JSON directement**. Toutes les données produits/collections/commandes passent par une **couche d'accès unique** : `src/lib/repository.ts`.

```
Composants (UI)
      │  appellent uniquement
      ▼
src/lib/repository.ts          ← POINT DE BASCULE UNIQUE
   getProducts()               • aujourd'hui : lit src/data/*.json
   getProProducts()            • demain : appelle l'API d'un CMS / commerce
   getB2bOrders() ...            headless (Shopify, Sanity…)
      │
      ▼
src/data/*.json (mock)   ⇄   [ remplaçable par un CMS sans toucher au front ]
```

**Conséquence concrète** : passer du prototype à une solution gérée par le client = réécrire **l'implémentation de `repository.ts`**, pas l'interface des composants. Le front ne bouge pas.

> **Règle d'or : un composant n'importe JAMAIS un fichier de `src/data/`. Il passe toujours par `src/lib/repository.ts`.**
> L'état applicatif (panier, commandes en cours…) est géré côté client par Zustand, et serait synchronisé avec l'API commerce en production.

---

## ✨ Fonctionnalités

### Site B2C
- Page d'accueil : collections, sélection produits, section histoire, newsletter.
- Données servies via `repository.ts`.

### Espace B2B (`/entreprise`, `/compte/entreprise`)
- **Vitrine pro** : secteurs, services, « comment ça marche », **formulaire de devis** (validé).
- **Création de compte pro** : assistant en 2 étapes, **validation par champ** (SIRET 14 chiffres, e-mail, téléphone, mot de passe + confirmation).
- **Connexion** : authentification mockée avec **compte de démonstration** (voir plus bas), garde d'accès sur l'espace privé, déconnexion.
- **Tableau de bord** : statistiques animées (count-up), dernière commande, raccourcis.
- **Catalogue pro** : prix remisés, **filtres par catégorie**, **recherche**, **favoris**, ajout au **panier**.
- **Panier / commande** : édition des quantités, contrôle du **minimum de commande**, choix adresse & paiement, création d'une commande réelle (persistée).
- **Commandes** : historique + détail avec **suivi de commande** et **suivi de livraison** (bouton démo pour faire progresser le statut en direct).
- **Compte** : informations éditables, gestion des adresses, favoris (réassort rapide).
- **Feedback UX** : toasts, validations en ligne, animations douces (respecte `prefers-reduced-motion`).

---

## 🔑 Compte de démonstration

L'authentification est **mockée** (prototype, sans backend). Pour accéder à l'espace pro :

```
E-mail       : demo@kult.fr
Mot de passe : kult1234
```

La page `/connexion` propose un bouton **« Remplir automatiquement »**.

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── layout.tsx              # Layout racine (polices, <html>)
│   ├── globals.css             # Tailwind v4 + design tokens + animations
│   ├── (site)/                 # Site B2C (accueil)
│   ├── (b2b-site)/             # Espace pro — pages publiques
│   │   ├── entreprise/                     # vitrine B2B
│   │   ├── entreprise/inscription/         # création de compte pro
│   │   └── connexion/                      # connexion (auth mockée)
│   └── (b2b-app)/              # Espace pro — dashboard (protégé)
│       └── compte/entreprise/  # tableau de bord, catalogue, panier,
│                               # commandes, informations, adresses, favoris
├── components/
│   ├── layout/                 # composants du site B2C
│   └── b2b/                    # composants de l'espace pro
├── lib/
│   ├── repository.ts           # ⭐ couche d'accès aux données
│   ├── validation.ts           # validateurs de formulaires
│   └── use-hydrated.ts         # hook anti-mismatch d'hydratation
├── stores/                     # état client Zustand (cart, orders, account,
│                               # favorites, auth, toast)
├── data/                       # JSON mockés (produits, collections, commandes)
└── types/                      # types TypeScript partagés
```

---

## ⚙️ Démarrer le projet

```bash
# Installer les dépendances
npm install

# Serveur de développement
npm run dev          # http://localhost:3000

# Build de production
npm run build
npm start
```

> Node 20+ requis.

---

## 📋 Conventions

- **Langue du site** : français.
- **TypeScript** partout, types partagés dans `src/types/`.
- **Pas de données en dur dans les composants** → tout passe par `repository.ts`.
- **Style** : Tailwind, tokens de couleur/police définis dans `globals.css`.
- **Commits** : messages en anglais avec préfixe de type (`[feat]`, `[chore]`, `[docs]`, `[fix]`).

---

## ✅ État d'avancement

- [x] Cadrage techno & architecture
- [x] Note de recommandation technique (livrable jury) — `docs/`
- [x] Arborescences site & B2B — `docs/`
- [x] Initialisation Next.js + couche de données (`repository.ts`)
- [x] Site B2C (page d'accueil)
- [x] Espace B2B complet (vitrine, compte, catalogue, panier, commandes, suivi)
- [ ] Habillage final aligné sur la charte du pôle DA
- [ ] Branchement d'un CMS / commerce headless (phase de production)
