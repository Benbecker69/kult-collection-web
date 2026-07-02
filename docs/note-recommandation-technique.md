# Note de recommandation technique

**Projet :** Refonte du site KULT Collection
**Pôle :** Développement Web (M1WD) — Groupe 1
**Livrable :** Note de recommandation technique justifiant le choix de plateforme
**Version :** 1.0

---

## 1. Objet de la note

Cette note justifie le choix de la **plateforme technique** pour la refonte du site KULT Collection. Elle répond à la contrainte du brief :

> « Vous allez développer le site pour des raisons pédagogiques, mais ce dernier doit pouvoir être reproduit avec une solution CMS existante (Wix, WordPress ou autre) pour assurer à l'équipe Kult une gestion facile et rapide. »

Elle présente les options évaluées, notre recommandation, et la manière dont l'architecture retenue concilie **un site sur-mesure haut de gamme** et **une gestion de contenu simple par une équipe non-technique**.

---

## 2. Les enjeux du site KULT

La refonte doit servir quatre objectifs métier issus du brief :

| Enjeu | Ce que ça implique techniquement |
|---|---|
| **Univers & storytelling de marque fort** | Liberté totale de direction artistique, animations, mise en scène éditoriale |
| **Croissance internationale (30+ pays)** | SEO solide, performance, internationalisation (i18n), multi-devises |
| **Parcours B2C fluide + Espace B2B dédié** | E-commerce, comptes clients, comptes revendeurs, suivi commande/livraison |
| **Gestion facile par une équipe non-technique** | Un back-office simple, sans code, pour éditer produits et contenus |

Le point de tension est clair : concilier **le sur-mesure** (exigé par l'image premium de la marque) et **la simplicité de gestion** (exigée par une équipe non-technique). C'est ce compromis que notre recommandation résout.

---

## 3. Les familles de solutions évaluées

### 3.1 Solutions « tout-en-un » (site builder / CMS classique)
*Exemples : Wix, WordPress + WooCommerce, thème Shopify standard.*

- ✅ Back-office intégré, prise en main rapide par une équipe non-technique.
- ✅ Mise en ligne rapide, coût initial faible.
- ❌ **Direction artistique bridée** par les thèmes/templates : difficile d'atteindre le niveau premium attendu.
- ❌ Performance et SEO souvent contraints (surcouches, plugins).
- ❌ Personnalisation avancée = coûteuse et fragile (dette technique, sécurité des plugins).

### 3.2 Solution « full sur-mesure » (front + back développés de zéro)

- ✅ Contrôle total, DA et performance maximales.
- ❌ Il faut **réinventer le back-office** : long, coûteux, et **contraire à la contrainte « gestion facile non-technique »**.
- ❌ Maintenance lourde à la charge de la marque.

### 3.3 Architecture « headless / découplée » — **notre choix**

On sépare le **front** (l'affichage, sur-mesure) du **back** (la donnée, gérée par un service spécialisé) :

- ✅ Front 100 % sur-mesure en **Next.js** → DA premium, performance, SEO, i18n.
- ✅ Back géré par un **CMS / commerce headless** avec un back-office simple → l'équipe Kult édite sans toucher au code.
- ✅ Le meilleur des deux mondes : **sur-mesure ET gestion facile**.

---

## 4. Notre recommandation

> **Une architecture headless : un front Next.js sur-mesure, alimenté par une solution de gestion de contenu/commerce headless dotée d'un back-office non-technique.**

**En production, la solution recommandée :**

- **Shopify (mode headless)** pour le commerce : catalogue produits, panier, paiement, comptes clients, **et B2B natif** (Shopify B2B : comptes revendeurs, tarifs pro, minimums de commande). Back-office reconnu, pensé pour des équipes non-techniques.
- **Option — Sanity ou Storyblok** pour le contenu éditorial (storytelling, univers de marque, pages « Notre Histoire »), si l'on souhaite une flexibilité éditoriale maximale.

Le front Next.js reste **le même** quelle que soit la source : c'est la couche d'accès aux données qui fait le lien.

---

## 5. Le pont technique : comment le site est « reproductible sur CMS »

C'est le cœur de la réponse à la contrainte du brief.

Dans notre prototype, les données sont **mockées en JSON**, mais **aucun composant ne lit le JSON directement**. Toutes les données transitent par une **couche d'accès unique** : `src/lib/repository.ts`.

```
        Composants (UI Next.js)
                │  appellent uniquement
                ▼
        src/lib/repository.ts          ← POINT DE BASCULE UNIQUE
           getProducts()               • aujourd'hui : lit src/data/*.json
           getProductBySlug(slug)      • demain : appelle l'API Shopify / Sanity
           getCollections() ...
                │
                ▼
        src/data/*.json (mock)   ⇄   [ remplaçable par un CMS sans toucher au front ]
```

**Conséquence concrète :** passer du prototype à une solution gérée par le client = **réécrire l'implémentation de `repository.ts`** (quelques fonctions), **sans modifier une seule ligne des composants ni des pages**.

➡️ C'est précisément ce qui rend le site **« reproductible avec un CMS »** : le JSON est une donnée de **développement**, jamais une contrainte pour le client. En production, l'équipe Kult gère produits et contenus depuis un **back-office**, **sans jamais toucher au code ni au JSON**.

---

## 6. La stack du prototype livré

| Couche | Techno | Rôle |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | Front, routing, rendu serveur (SSR/SSG) |
| Style | **Tailwind CSS** | Design system aligné sur la charte du pôle DA |
| Données (proto) | **JSON** (`src/data/`) via `src/lib/repository.ts` | Source de données du prototype, point de bascule CMS |
| Formulaires | **react-hook-form + zod** | Devis B2B, contact, newsletter, livraison |
| Panier | **Zustand** (mocké) | Gestion d'état du panier (sans paiement réel en proto) |
| Déploiement | **Vercel** | Aperçus de déploiement, CI/CD |

> Versions cibles : Node 20+, Next.js 16, React 19.

---

## 7. Justification par critères

| Critère | Wix | WordPress + Woo | Shopify (thème) | **Next.js headless + Shopify (reco)** |
|---|:---:|:---:|:---:|:---:|
| Direction artistique premium | ▲ Faible | ◆ Moyenne | ◆ Moyenne | ✅ **Totale** |
| Performance / SEO | ◆ | ◆ | ◆ | ✅ **Excellente** (SSR/SSG) |
| International (i18n, 30+ pays) | ▲ | ◆ | ◆ | ✅ **Natif** |
| Gestion non-technique (back-office) | ✅ | ◆ | ✅ | ✅ **Oui (Shopify)** |
| E-commerce B2C | ◆ | ◆ | ✅ | ✅ |
| **B2B (revendeurs, tarifs pro)** | ▲ | ◆ (plugins) | ✅ (Shopify B2B) | ✅ **Shopify B2B** |
| Évolutivité / maintenance | ◆ | ▲ (plugins/sécurité) | ◆ | ✅ **Découplée** |
| Coût de personnalisation avancée | ▲ | ▲ | ◆ | ✅ **Maîtrisé** |

Légende : ✅ fort · ◆ moyen · ▲ limité

**Alternatives open-source évaluées :** **Medusa** (commerce headless open-source) est une option crédible pour éviter les frais de licence, mais elle est **auto-hébergée** et demande une **maintenance technique** (DevOps, back-office moins mûr) — moins adaptée à une équipe non-technique que Shopify. Nous la citons comme alternative, sans la recommander en premier choix.

---

## 8. Focus Espace B2B

L'architecture headless couvre nativement le besoin B2B du focus M1WD :

- **Création de compte pro** → comptes revendeurs (Shopify B2B / logique de rôle).
- **Commande en ligne** → catalogue pro, conditions tarifaires, minimum de commande.
- **Suivi de commande** → statut en temps réel via l'API commerce.
- **Suivi de livraison** → informations d'expédition jusqu'à réception.

Dans le prototype, ces parcours sont démontrés avec des données mockées (comptes, commandes, statuts de livraison) servies par `repository.ts`, exactement comme le catalogue B2C.

---

## 9. Feuille de route de mise en production

1. **Phase 1 — Prototype (livré).** Front Next.js sur-mesure, données JSON via `repository.ts`, parcours B2C et B2B démontrés.
2. **Phase 2 — Branchement CMS/commerce.** Réécriture de l'implémentation de `repository.ts` pour consommer l'API Shopify (+ Sanity en option). Le front ne change pas.
3. **Phase 3 — Reprise des données & formation.** Import du catalogue réel, configuration B2B, **formation de l'équipe Kult au back-office** (gestion produits, contenus, commandes sans code).
4. **Phase 4 — Mise en ligne & international.** Configuration i18n / multi-devises, SEO, suivi de performance.

---

## 10. Synthèse

- Le brief demande un site **développé** ET **reproductible sur un CMS** pour une gestion simple : une **architecture headless** répond aux deux.
- Le front **Next.js sur-mesure** garantit le niveau premium attendu par la marque (DA, performance, SEO, international).
- La **couche `repository.ts`** est le point de bascule unique : JSON aujourd'hui, **Shopify / CMS headless demain**, sans réécrire le front.
- En production, l'équipe Kult gère tout depuis un **back-office non-technique** — **jamais de code, jamais de JSON**.

**En un mot : un site sur-mesure aujourd'hui, facile à gérer demain, sans compromis.**
