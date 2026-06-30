# KULT Collection — Refonte du site

Refonte totale du site e-commerce de **KULT Collection** (maison d'artisanat : bougies parfumées, parfums d'intérieur, diffuseurs et céramique — art de vivre californien & méditerranéen).

Projet pédagogique **EEMI x KULT Collection** — pôle développement web (M1 WD).

---

## 🎯 Périmètre du pôle dev

Le projet global est découpé en plusieurs briefs. **Notre périmètre (développeurs)** :

- **Refonte totale du site vitrine + e-commerce** (B2C)
- **Espace B2B dédié** (compte revendeur, devis, suivi de commande/livraison)

Les volets TikTok et Salon Maison & Objet sont traités par les autres pôles (MD / UXUI) — hors de notre scope.

---

## 🧱 Choix techniques & justification

### Pourquoi du pro-code (Next.js) plutôt qu'un CMS clé-en-main (Wix / WordPress) ?

Le brief demande un site **reproductible sur un CMS** pour une gestion facile par l'équipe Kult. On répond à cette contrainte **sans sacrifier la qualité**, via une **architecture headless / découplée** :

| Besoin du brief | Réponse |
|---|---|
| Univers & storytelling de marque fort | Liberté totale de DA en pro-code (impossible à ce niveau sur un thème Wix) |
| Croissance internationale (30+ pays) | SEO/SSR + i18n natifs de Next.js |
| Performance (→ conversion) | Rendu serveur, optimisation images, Core Web Vitals |
| **Gestion facile par une équipe non-technique** | **Architecture CMS-ready** (voir ci-dessous) |

### Stack

| Couche | Techno | Rôle |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Front + routing + rendu serveur |
| Style | **Tailwind CSS** | Design system aligné sur la charte graphique (pôle DA) |
| Données (prototype) | **JSON mocké** (`src/data/`) | Source de données du prototype |
| Animations | Framer Motion | Mise en scène de l'univers sensoriel |
| Déploiement | Vercel | Aperçus de déploiement à montrer au jury |

> **Versions cibles** : Node 20+, Next.js 15, React 19.

---

## 🔌 Architecture « CMS-ready » — le point clé

Le prototype lit des données **mockées en JSON**, mais **aucun composant ne lit le JSON directement**. Toutes les données passent par une **couche d'accès unique** (`src/lib/repository.ts`).

```
Composants (UI)
      │  appellent uniquement
      ▼
src/lib/repository.ts          ← POINT DE BASCULE UNIQUE
   getProducts()               • aujourd'hui : lit src/data/*.json
   getProductBySlug(slug)      • demain : appelle l'API d'un CMS headless
   getCollections()              (Sanity / Storyblok) ou commerce (Shopify)
   ...
      │
      ▼
src/data/*.json (mock)   ⇄   [ remplaçable par un CMS sans toucher au front ]
```

**Conséquence concrète** : passer du prototype à une vraie solution gérable par le client = remplacer **l'implémentation de `repository.ts`** (quelques fonctions), pas l'interface des composants. Le front ne bouge pas.

➡️ C'est ce qui rend le site **« reproductible avec un CMS »** comme l'exige le brief : le JSON est une donnée de **développement**, jamais une contrainte pour le client final.

**Règle d'or de l'équipe : un composant n'importe JAMAIS un fichier de `src/data/`. Il passe toujours par `src/lib/repository.ts`.**

---

## 📁 Structure du projet (cible)

```
kult-collection-web/
├── src/
│   ├── app/                  # Pages (App Router Next.js)
│   │   ├── (boutique)/       # Home, Collections, Catalogue, Fiche produit
│   │   ├── entreprise/       # Vitrine B2B + formulaire devis
│   │   ├── histoire/         # Notre Histoire
│   │   ├── contact/
│   │   ├── compte/           # Espace Login (B2C + B2B)
│   │   └── panier/
│   ├── components/           # Composants réutilisables
│   │   ├── product/          # CarteProduit, GrilleProduits
│   │   ├── layout/           # Header, Footer, BarRecherche
│   │   └── forms/            # Contact, Devis, Newsletter, Livraison
│   ├── lib/
│   │   └── repository.ts     # ⭐ couche d'accès aux données (cf. ci-dessus)
│   ├── data/                 # JSON mockés (produits, collections, contenus)
│   └── types/                # Types TypeScript partagés
├── public/                   # Assets statiques (images, fonts)
├── docs/                     # Documentation projet
└── README.md
```

---

## 🗺️ Arborescence du site (réalisée par le pôle UX/MD)

10 pages / sections principales :

1. **Home** — Collections, Sélection produits, Histoire, Newsletter, Footer
2. **Collections** — 7 collections, chacune → grille de cartes produits
3. **Catalogue** — par catégorie : Bougies, Parfums, Céramiques, Diffuseurs, Collections, Sélection
4. **Espace Entreprise (B2B)** — Bannière CTA, Secteurs Pro, Services Pro, Formulaire Devis
5. **Notre Histoire** — storytelling de marque
6. **Contacts** — formulaire, adresses, réseaux sociaux
7. **Bar de recherche** — composant global (header)
8. **Espace Login** — compte **Particulier (B2C)** + compte **Entreprise (B2B)**, parcours distincts
9. **Panier** — tunnel de commande (récap, suggestions, livraison, paiement)
10. **Footer** — composant global

**Composants à factoriser dès le départ** : Footer, Bar de recherche, Carte Produit, Grille de produits, Formulaires.

> Détail complet : voir `docs/architecture-site.md` (à intégrer au repo).

---

## ⚙️ Démarrer le projet (une fois initialisé)

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev          # http://localhost:3000

# Build de production
npm run build && npm start
```

> ⚠️ Le projet Next.js n'est **pas encore initialisé** : on attend les **wireframes** du pôle UX/DA avant de développer le visuel. En attendant, on prépare l'arborescence, le modèle de données et la note de reco technique.

---

## 🌿 Workflow de dev (à 2 développeurs)

- **`main`** : branche stable, toujours fonctionnelle. On ne pousse jamais directement dessus.
- **`feat/<nom>`** : une branche par fonctionnalité (ex. `feat/carte-produit`, `feat/page-catalogue`).
- **Pull Request** : chaque feature passe par une PR relue par l'autre dev avant merge.
- **Commits** : messages clairs en français, au présent (`ajoute la grille de produits`, `corrige le header mobile`).

### Répartition indicative
- Se mettre d'accord page par page / composant par composant pour éviter les conflits.
- Construire **d'abord les composants partagés** (Footer, Header, Carte Produit) → tout le reste en dépend.

---

## 📋 Conventions

- **Langue du site** : français (libellés tels que définis dans l'arborescence).
- **TypeScript** partout, types partagés dans `src/types/`.
- **Composants** : un dossier par composant complexe, nommage en PascalCase.
- **Pas de données en dur dans les composants** → tout passe par `repository.ts`.

---

## ✅ État d'avancement

- [x] Cadrage techno & architecture
- [x] Arborescence du site (pôle UX/MD)
- [ ] Note de recommandation technique (livrable jury)
- [ ] Modèle de données JSON
- [ ] Wireframes (en attente du pôle UX/DA)
- [ ] Initialisation du projet Next.js
- [ ] Développement des pages
