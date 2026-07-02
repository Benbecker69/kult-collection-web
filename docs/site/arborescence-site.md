# Arborescence du site — KULT Collection

**Projet :** Refonte du site KULT Collection
**Pôle :** Développement Web (M1WD) — Groupe 1
**Livrable :** Arborescence complète du site
**Version :** 1.0

Langue du site : **français**. Les libellés ci-dessous sont les intitulés à afficher.

---

## 1. Vue d'ensemble

Le site comporte **10 pages / sections principales** :

1. Home (accueil)
2. Collections
3. Catalogue
4. Espace Entreprise (vitrine B2B)
5. Notre Histoire
6. Contacts
7. Bar de recherche *(composant global)*
8. Espace Login / Compte (Particulier + Entreprise)
9. Panier
10. Footer *(composant global, présent sur toutes les pages)*

> Le détail interne de l'**Espace B2B** (parcours compte pro, commande, suivi commande, suivi livraison) fait l'objet d'un livrable dédié : `../b2b/arborescence-b2b.md`.

---

## 2. Arborescence de navigation

```
KULT COLLECTION
│
├── / .......................................... HOME
│   ├── Mise en avant Collections
│   ├── Sélection (grille de cartes produits)
│   ├── Histoire de la marque (bloc storytelling)
│   ├── Inscription Newsletter
│   └── Footer
│
├── /collections ............................... COLLECTIONS (liste)
│   ├── Collection 1 → 7
│   │   └── /collections/[slug] ............... PAGE COLLECTION
│   │       ├── Grille de Cartes Produits
│   │       └── Footer
│   └── Footer
│
├── /catalogue ................................. CATALOGUE (par catégorie)
│   ├── Bougies ──────────► Grille de Cartes Produits
│   ├── Parfums ──────────► Grille de Cartes Produits
│   ├── Céramiques ───────► Grille de Cartes Produits
│   ├── Diffuseurs ───────► Grille de Cartes Produits
│   ├── Collections ──────► Grille de Cartes Produits
│   ├── Sélection ────────► Grille de Cartes Produits
│   └── Footer
│
├── /produits/[slug] ........................... FICHE PRODUIT
│   ├── Galerie visuels
│   ├── Infos produit (nom, prix, description, matières, parfum)
│   ├── Ajout au panier
│   ├── Cross-sell (produits associés / composer l'intérieur)
│   └── Footer
│
├── /entreprise ................................ ESPACE ENTREPRISE (vitrine B2B)
│   ├── Bannière CTA
│   ├── Secteurs Pro
│   ├── Services Pro
│   ├── Formulaire Devis
│   └── Footer
│
├── /histoire .................................. NOTRE HISTOIRE
│   ├── Description de la marque
│   ├── Services Proposés
│   ├── Mise en avant Collections
│   ├── Renvoi Services Pro
│   └── Footer
│
├── /contact ................................... CONTACTS
│   ├── Formulaire de contact
│   ├── Adresses (boutiques Paris 20 & Vincennes)
│   ├── Mail / Téléphone
│   ├── Réseaux sociaux
│   └── Footer
│
├── /compte .................................... ESPACE LOGIN / COMPTE
│   ├── /compte/particulier ................... Espace Particulier (B2C)
│   └── /compte/entreprise ................... Espace Entreprise (B2B)
│
├── /panier .................................... PANIER (tunnel de commande)
│   ├── Récapitulatif produits (Cartes Produits)
│   ├── Suggestions (produits recommandés)
│   ├── Formulaire Livraison
│   ├── Moyens de Paiement
│   └── Footer
│
├── /recherche ................................. RÉSULTATS DE RECHERCHE
│   └── (déclenché par le Bar de recherche global du header)
│
└── [global] .................................. Header (nav + recherche) · Footer
```

---

## 3. Détail par page

### 3.1 Home — `/`
Page d'accueil, sections dans l'ordre vertical :
- **Collections** — mise en avant, liens vers la page Collections et les collections individuelles.
- **Sélection** — grille de cartes produits sélectionnées.
- **Histoire de la marque** — bloc storytelling (inspiration californienne & méditerranéenne, atelier, savoir-faire).
- **Inscription Newsletter** — formulaire.
- **Footer**.

### 3.2 Collections — `/collections`
Liste des **7 collections**. Chaque collection ouvre une page dédiée `/collections/[slug]` contenant une **grille de Cartes Produits** + Footer.

### 3.3 Catalogue — `/catalogue`
Organisé par **catégories** : Bougies, Parfums, Céramiques, Diffuseurs, Collections, Sélection. Chaque catégorie affiche une **grille de Cartes Produits**. + Footer.

### 3.4 Fiche produit — `/produits/[slug]`
Galerie visuels, informations produit (nom, prix, description, matières/parfum), ajout au panier, bloc **cross-sell** (« composer son intérieur »), Footer.

### 3.5 Espace Entreprise (vitrine B2B) — `/entreprise`
Page publique dédiée aux professionnels : Bannière CTA, Secteurs Pro, Services Pro, **Formulaire Devis**, Footer.
*(L'espace client B2B connecté est traité dans `../b2b/arborescence-b2b.md`.)*

### 3.6 Notre Histoire — `/histoire`
Description de la marque, Services Proposés, mise en avant Collections, renvoi Services Pro, Footer.

### 3.7 Contacts — `/contact`
Formulaire de contact, Adresses (boutiques), Mail / Téléphone, Réseaux sociaux, Footer.

### 3.8 Espace Login / Compte — `/compte`
Point d'entrée d'authentification, deux parcours distincts :
- **Espace Particulier (B2C)** — `/compte/particulier` : informations personnelles, adresse de livraison, historique de commande, suivi de commande, contact manager, réductions, dernières factures, favoris.
- **Espace Entreprise (B2B)** — `/compte/entreprise` : informations client, adresse de livraison, historique de commande, suivi de commande, réductions, moyens de paiement, favoris.

> Le détail des écrans B2B est développé dans le livrable dédié `../b2b/arborescence-b2b.md`.

### 3.9 Panier — `/panier`
Tunnel de commande : récapitulatif produits, Suggestions, Formulaire Livraison, Moyens de Paiement, Footer.

### 3.10 Bar de recherche — composant global (header) → `/recherche`
Recherche de produits sur l'ensemble du site, présent dans le header ; les résultats s'affichent sur `/recherche`.

### 3.11 Footer — composant global
Présent au bas de **toutes les pages** (navigation secondaire, contact, réseaux sociaux, newsletter, mentions légales).

---

## 4. Composants partagés à factoriser

| Composant | Utilisé dans |
|---|---|
| **Header** (nav + Bar de recherche) | Toutes les pages |
| **Footer** | Toutes les pages |
| **Carte Produit** | Home, Collections, Catalogue, Fiche produit (cross-sell), Panier |
| **Grille de Cartes Produits** | Home, Collections, Catalogue |
| **Formulaire** (contact / devis / newsletter / livraison) | Contacts, Entreprise, Home, Panier |

> Règle d'équipe : **construire d'abord les composants partagés** (Header, Footer, Carte Produit, Grille) — tout le reste en dépend.

---

## 5. Correspondance routes Next.js (App Router)

| Route | Page | Type |
|---|---|---|
| `/` | Home | Statique |
| `/collections` | Liste des collections | Statique |
| `/collections/[slug]` | Page d'une collection | Dynamique |
| `/catalogue` | Catalogue par catégorie | Statique (+ filtres) |
| `/produits/[slug]` | Fiche produit | Dynamique |
| `/entreprise` | Vitrine B2B | Statique |
| `/histoire` | Notre Histoire | Statique |
| `/contact` | Contacts | Statique |
| `/compte` | Login / choix de compte | Statique |
| `/compte/particulier` | Espace client B2C | Statique (protégé) |
| `/compte/entreprise` | Espace client B2B | Statique (protégé) |
| `/panier` | Tunnel de commande | Statique |
| `/recherche` | Résultats de recherche | Dynamique |

---

## 6. Notes d'implémentation

- Différencier clairement **Espace Particulier (B2C)** et **Espace Entreprise (B2B)** : deux parcours distincts à partir de `/compte`.
- L'**Espace Entreprise** existe à deux niveaux : (1) page publique vitrine `/entreprise` avec formulaire de devis ; (2) espace client connecté `/compte/entreprise`.
- Libellés à clarifier avec le client : « Réductions ? » (système de remises) et « Contact Manager » (commercial dédié).
- Toutes les données produits/collections passent par `src/lib/repository.ts` — **aucun composant ne lit le JSON directement** (cf. note de recommandation technique).
- Prévoir **Header + Bar de recherche + Footer** comme composants partagés dès le départ.
