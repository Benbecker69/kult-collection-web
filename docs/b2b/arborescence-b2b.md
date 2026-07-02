# Arborescence de l'Espace B2B — KULT Collection

**Projet :** Refonte du site KULT Collection — **Focus Espace B2B dédié**
**Pôle :** Développement Web (M1WD) — Groupe 1
**Livrable :** Arborescence complète de l'espace B2B
**Version :** 1.0

> **Objectif du focus (brief) :** création d'un compte professionnel pour le suivi des commandes et livraisons, à destination des revendeurs (Monoprix, Alter Mundi, boutiques indépendantes…).

Voir aussi : la vitrine publique B2B `/entreprise` est décrite dans `../site/arborescence-site.md` (§3.5).

---

## 1. Vue d'ensemble

L'espace B2B doit offrir **4 fonctions clés** (brief) :

1. **Création de compte pro** — inscription et **validation** des comptes revendeurs.
2. **Commande en ligne** — catalogue pro, **conditions tarifaires**, **minimum de commande**.
3. **Suivi de commande** — statut visible en temps réel par le client pro.
4. **Suivi de livraison** — information sur l'expédition et la livraison jusqu'à réception.

On distingue **deux niveaux** :
- **Vitrine B2B publique** (`/entreprise`) — accessible à tous, avec formulaire de devis *(cf. arborescence site)*.
- **Espace B2B connecté** (`/compte/entreprise/*`) — réservé aux comptes pro validés.

---

## 2. Parcours utilisateur (consumer journey)

```
1. DÉCOUVERTE                2. INSCRIPTION              3. VALIDATION
   Vitrine /entreprise   →     Formulaire compte pro  →    Validation KULT
   (secteurs, services,        (SIRET, société,            (compte activé,
    CTA, devis)                 contact, docs)              e-mail de confirmation)
        │                                                        │
        ▼                                                        ▼
6. SUIVI LIVRAISON         5. SUIVI COMMANDE            4. COMMANDE
   Expédition → transit  ←    Statut temps réel      ←    Connexion → catalogue pro
   → livré (tracking)         (validation → préparation)    → conditions tarifaires
                                                            → minimum de commande
                                                            → validation panier pro
```

**Séquence détaillée :**
1. Le prospect pro découvre la **vitrine `/entreprise`**.
2. Il **crée une demande de compte pro** (`/entreprise/inscription`).
3. KULT **valide** le compte (statut « en attente » → « validé »).
4. Le pro se **connecte** et **commande** via le **catalogue pro** (tarifs remisés, minimum de commande).
5. Il **suit sa commande** (statuts en temps réel).
6. Il **suit sa livraison** (numéro de suivi, étapes d'expédition).

---

## 3. Arborescence de navigation

```
ESPACE B2B
│
├── /entreprise ................................ VITRINE B2B (publique)
│   ├── Bannière CTA
│   ├── Secteurs Pro
│   ├── Services Pro
│   ├── Formulaire Devis
│   └── CTA « Créer un compte pro » → /entreprise/inscription
│
├── /entreprise/inscription .................... CRÉATION DE COMPTE PRO
│   ├── Formulaire société (raison sociale, SIRET/TVA, secteur)
│   ├── Contact (nom, e-mail, téléphone)
│   ├── Justificatifs (Kbis, RIB — optionnel)
│   └── Écran de confirmation (« demande envoyée, en attente de validation »)
│
├── /connexion ................................. CONNEXION (commune B2C/B2B)
│   └── Redirige un compte pro validé vers /compte/entreprise
│
└── /compte/entreprise ......................... TABLEAU DE BORD B2B (connecté)
    ├── Vue d'ensemble (dernières commandes, statut, raccourcis)
    ├── /compte/entreprise/informations ....... Informations client (société, contact)
    ├── /compte/entreprise/catalogue .......... Catalogue Pro (commande en ligne)
    │   ├── Tarifs pro (remisés)
    │   ├── Minimum de commande
    │   └── Ajout au panier pro
    ├── /compte/entreprise/panier ............. Panier Pro
    │   ├── Récapitulatif + quantités
    │   ├── Contrôle du minimum de commande
    │   └── Validation de commande
    ├── /compte/entreprise/commandes .......... Historique des commandes
    │   └── /compte/entreprise/commandes/[id] . Détail commande + SUIVI
    │       ├── Suivi de commande (statuts)
    │       └── Suivi de livraison (expédition → réception)
    ├── /compte/entreprise/adresses ........... Adresses de livraison / facturation
    ├── /compte/entreprise/reductions ......... Réductions / conditions tarifaires
    ├── /compte/entreprise/paiement ........... Moyens de paiement
    ├── /compte/entreprise/favoris ............ Favoris / réassort rapide
    └── /compte/entreprise/devis .............. Mes demandes de devis
```

---

## 4. Détail par écran

### 4.1 Vitrine B2B — `/entreprise` *(publique)*
Point d'entrée pro : Bannière CTA, Secteurs Pro, Services Pro, Formulaire Devis, et **CTA « Créer un compte pro »**. *(Détail dans l'arborescence site §3.5.)*

### 4.2 Création de compte pro — `/entreprise/inscription`
Formulaire de demande d'ouverture de compte revendeur :
- **Société** : raison sociale, SIRET / n° TVA, secteur d'activité.
- **Contact** : nom, e-mail professionnel, téléphone.
- **Justificatifs** (optionnel) : Kbis, RIB.
- **Confirmation** : message « demande envoyée, en attente de validation par KULT ».
- **Validation** : le compte passe de `en_attente` à `validé` (déclenche un e-mail). Tant qu'il n'est pas validé, l'accès au catalogue pro est bloqué.

### 4.3 Connexion — `/connexion`
Écran de connexion commun. Un compte **pro validé** est redirigé vers `/compte/entreprise` ; un particulier vers `/compte/particulier`.

### 4.4 Tableau de bord B2B — `/compte/entreprise`
Vue d'ensemble : dernières commandes et leur statut, raccourcis (recommander, suivre une livraison, mes devis).

### 4.5 Informations client — `/compte/entreprise/informations`
Coordonnées société et contact, gestion du compte.

### 4.6 Catalogue Pro — `/compte/entreprise/catalogue`
Catalogue réservé aux pros : **tarifs remisés**, mention du **minimum de commande**, ajout au **panier pro**. Mêmes fiches produits que le B2C, avec la couche tarifaire pro.

### 4.7 Panier Pro — `/compte/entreprise/panier`
Récapitulatif, quantités, **contrôle du minimum de commande** (blocage si non atteint), validation de commande.

### 4.8 Historique des commandes — `/compte/entreprise/commandes`
Liste des commandes (n°, date, montant, statut). Chaque ligne mène au détail.

### 4.9 Détail commande + suivi — `/compte/entreprise/commandes/[id]`
- **Récapitulatif** : produits, quantités, montants.
- **Suivi de commande** : statut en temps réel *(cf. §5)*.
- **Suivi de livraison** : transporteur, numéro de suivi, étapes d'expédition jusqu'à réception.

### 4.10 Adresses — `/compte/entreprise/adresses`
Adresses de livraison et de facturation (plusieurs points de vente possibles).

### 4.11 Réductions / conditions tarifaires — `/compte/entreprise/reductions`
Conditions négociées, paliers de remise, codes éventuels. *(Libellé « Réductions ? » du brief — à préciser avec le client.)*

### 4.12 Moyens de paiement — `/compte/entreprise/paiement`
Modes de paiement pro (CB, virement, paiement à échéance selon conditions).

### 4.13 Favoris / réassort — `/compte/entreprise/favoris`
Produits favoris pour un réassort rapide.

### 4.14 Mes devis — `/compte/entreprise/devis`
Suivi des demandes de devis émises depuis la vitrine `/entreprise`.

---

## 5. Statuts (suivi commande & livraison)

**Suivi de commande :**
```
En attente de validation → Validée → En préparation → Expédiée → Livrée
                                                    └────► Annulée (cas d'exception)
```

**Suivi de livraison :**
```
En préparation → Expédiée (n° de suivi) → En transit → En cours de livraison → Livrée
```

Ces statuts sont mockés dans le prototype (données servies par `repository.ts`) et, en production, alimentés par l'API commerce (Shopify) / le transporteur.

---

## 6. Composants — réutilisés vs spécifiques B2B

| Composant | Origine |
|---|---|
| Header, Footer, Bar de recherche | ♻️ Partagé (cf. site) |
| Carte Produit, Grille de produits | ♻️ Partagé (avec surcouche **tarif pro**) |
| Formulaire (devis, inscription) | ♻️ Partagé (variantes B2B) |
| **Fil de statut** (commande / livraison) | ⭐ Spécifique B2B |
| **Bandeau minimum de commande** | ⭐ Spécifique B2B |
| **Tableau historique commandes** | ⭐ Spécifique B2B |

---

## 7. Correspondance routes Next.js (App Router)

| Route | Écran | Accès |
|---|---|---|
| `/entreprise` | Vitrine B2B | Public |
| `/entreprise/inscription` | Création de compte pro | Public |
| `/connexion` | Connexion | Public |
| `/compte/entreprise` | Tableau de bord B2B | Protégé (pro validé) |
| `/compte/entreprise/informations` | Informations client | Protégé |
| `/compte/entreprise/catalogue` | Catalogue pro | Protégé |
| `/compte/entreprise/panier` | Panier pro | Protégé |
| `/compte/entreprise/commandes` | Historique commandes | Protégé |
| `/compte/entreprise/commandes/[id]` | Détail + suivi commande/livraison | Protégé |
| `/compte/entreprise/adresses` | Adresses | Protégé |
| `/compte/entreprise/reductions` | Réductions / conditions | Protégé |
| `/compte/entreprise/paiement` | Moyens de paiement | Protégé |
| `/compte/entreprise/favoris` | Favoris / réassort | Protégé |
| `/compte/entreprise/devis` | Mes devis | Protégé |

---

## 8. Notes d'implémentation

- **Validation manuelle des comptes** : un compte pro n'accède au catalogue qu'une fois le statut `validé`. Prévoir l'état `en_attente`.
- **Couche tarifaire pro** : le même produit affiche un prix différent selon le rôle (particulier / pro). Géré via `repository.ts` (rôle passé en paramètre), jamais en dur dans les composants.
- **Minimum de commande** : contrôle bloquant à la validation du panier pro.
- Libellés à clarifier avec le client : « Réductions ? » (paliers de remise) et « Contact Manager » (commercial dédié, présent côté B2C).
- Toutes les données (comptes, commandes, statuts, livraisons) passent par `src/lib/repository.ts` — mock JSON aujourd'hui, API Shopify demain (cf. note de recommandation technique).
