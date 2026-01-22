# Site vitrine – Ambulances & transport sanitaire (Next.js / TypeScript / Tailwind)

Ce projet est un **site vitrine premium** pour une société d’ambulances / transport sanitaire, pensé pour :

- inspirer confiance dès le premier écran ;
- rester clair et factuel (sans surpromesses) ;
- être facile à maintenir (contenu, zones, services, SEO local) ;
- optimiser la conversion vers l’**appel téléphonique**.

Ce document explique _où_ modifier les informations métier et le contenu, sans devoir parcourir tout le code React.

---

## 1. Données métier centrales (`data/site-config.ts`)

**Fichier clé :** `data/site-config.ts`  
**Type :** fichier TypeScript exportant un objet `siteConfig`.

C’est la **source de vérité** pour les informations suivantes :

- **Business / légal**
  - `business.brandName`, `business.baseline`
  - `business.legalName`, `business.siret`
  - `business.legalMentions` (capital, RCS, etc. – placeholders à compléter)
- **Coordonnées**
  - `contact.phoneMain`, `contact.phoneSecondary`
  - `contact.email`
  - `contact.address` (ligne d’adresse, CP, ville, pays, URL Google Maps, latitude/longitude optionnelles)
  - `contact.emergencyMessage` et `contact.nonEmergencyClarification` (messages affichés dans le bandeau d’urgence)
- **Horaires**
  - `openingHours`: tableau de plages `days + slots` (utilisé dans la home, la page contact, le JSON-LD)
- **Services**
  - `services.mainTypes`: Ambulance / VSL / transport assis / transport allongé (intitulés, descriptions, bullet points)
  - `services.medicalMissions`: catégories de missions (consultations, dialyse, transferts, etc.)
- **Zones**
  - `zones.mainCity`: ville principale cible (placeholder)
  - `zones.catchmentLabel`: description du secteur (agglomération, département…)
  - `zones.items`: liste des communes desservies (placeholders à remplacer)
  - `zones.localPagesExamples`: configuration des 3 pages locales SEO d’exemple :
    - `/ambulance-ville-exemple`
    - `/transport-sanitaire-ville-exemple`
    - `/vsl-ville-exemple`
- **Processus / prise en charge**
  - `process.steps`: étapes du parcours (contact, vérification, organisation, transport)
  - `process.documents`: documents à prévoir (prescription, carte Vitale, etc.)
  - `process.billing`: placeholders sur le conventionnement / tiers payant / transparence
- **FAQ**
  - `faq`: liste de questions / réponses sur le transport sanitaire non urgent
- **Formulaires**
  - `forms.requestTransport`: textes RGPD, lien vers la page de protection des données, messages de succès/erreur, délai minimal anti-spam
  - `forms.contact`: même logique pour le formulaire de contact
- **SEO global**
  - `seo.defaultTitle`, `seo.defaultDescription`
  - `seo.keywords`: mots-clés principaux (à affiner une fois la zone réelle connue)

> ✅ Pour changer **nom de la société, téléphone, adresse, zones, services, FAQ, messages RGPD**, on modifie uniquement `data/site-config.ts`.

---

## 2. SEO & métadonnées par page

### 2.1. SEO global

**Fichier :** `data/site-config.ts`, bloc `seo`  
**Utilisé dans :** `src/app/layout.tsx`

- `metadata.title` (Next.js)
- `metadata.description`, `metadata.keywords`
- `openGraph`
- JSON-LD `MedicalBusiness` (schema.org) pour le référencement local.

### 2.2. SEO spécifique par page

**Fichier :** `src/lib/page-seo.ts`

```ts
export const pageSeo = {
  home: { ... } as Metadata,
  services: { ... } as Metadata,
  priseEnCharge: { ... } as Metadata,
  zones: { ... } as Metadata,
  demandeTransport: { ... } as Metadata,
  contact: { ... } as Metadata,
  mentionsLegales: { ... } as Metadata,
  protectionDonnees: { ... } as Metadata,
  localAmbulanceVilleExemple: { ... } as Metadata,
  localTransportSanitaireVilleExemple: { ... } as Metadata,
  localVslVilleExemple: { ... } as Metadata,
};
```

Chaque page importante importe son SEO :

- `src/app/page.tsx` → `metadata = pageSeo.home;`
- `src/app/services/page.tsx` → `metadata = pageSeo.services;`
- `src/app/prise-en-charge/page.tsx` → `metadata = pageSeo.priseEnCharge;`
- `src/app/zones/page.tsx` → `metadata = pageSeo.zones;`
- `src/app/demande-transport/page.tsx` → `metadata = pageSeo.demandeTransport;`
- `src/app/contact/page.tsx` → `metadata = pageSeo.contact;`
- `src/app/mentions-legales/page.tsx` → `metadata = pageSeo.mentionsLegales;`
- `src/app/protection-des-donnees/page.tsx` → `metadata = pageSeo.protectionDonnees;`
- pages locales (`/ambulance-ville-exemple`, etc.) → SEO dédiés.

> ✅ Pour ajuster les titres / descriptions SEO par page, on modifie `src/lib/page-seo.ts` (en s’appuyant sur `siteConfig`).

---

## 3. Layout global, bandeau d’urgence & CTA

**Fichier :** `src/app/layout.tsx`

- Header avec :
  - nom commercial (`siteConfig.business.brandName`),
  - baseline (`siteConfig.business.baseline`),
  - navigation principale (Accueil, Services, Prise en charge, Zones, Demande de transport, Contact),
  - CTA **“Appeler maintenant”**.
- Bandeau informatif sous le header :
  - `siteConfig.contact.emergencyMessage`  
  - `siteConfig.contact.nonEmergencyClarification`  
  → rappelle de manière claire : **urgence vitale = 15 / 112**, site réservé aux transports non urgents.
- Footer :
  - coordonnées (adresse, téléphone, e-mail),
  - mentions légales / protection des données,
  - placeholders pour les informations juridiques exactes.

Un **bouton flottant “Appeler maintenant”** est affiché en bas d’écran sur mobile (CTA principal).

---

## 4. Pages principales

### 4.1. Accueil `/`

**Fichier :** `src/app/page.tsx`

Sections :

- **Hero** (`<Hero />`)
  - H1 : `Ambulances & transport sanitaire à [Ville principale]`
  - CTA : Appeler maintenant / Demande de transport
  - Rappel synthétique des horaires et coordonnées.
- **Services** (extrait de `siteConfig.services.mainTypes`)
- **Zones desservies** (extrait de `siteConfig.zones`)
- **Prise en charge** (résumé des étapes `siteConfig.process.steps`)
- **FAQ** (questions / réponses `siteConfig.faq`, avec schema.org FAQPage)
- **Contact rapide** (coordonnées + horaires, `OpeningHours`)

> ✅ Tout le contenu “business” de la home (services, zones, FAQ…) vient de `siteConfig`.

### 4.2. Services `/services`

**Fichier :** `src/app/services/page.tsx`

- Présentation détaillée des **types de transport** : ambulance, VSL, transport assis, etc.  
- Liste des **missions** (consultations, dialyse, transferts, rééducation) depuis `siteConfig.services.medicalMissions`.

### 4.3. Prise en charge `/prise-en-charge`

**Fichier :** `src/app/prise-en-charge/page.tsx`

- Étapes du **processus de prise en charge** (`siteConfig.process.steps`).
- Bloc “Documents à prévoir” (`siteConfig.process.documents`).
- Bloc “Conventionnement & tiers payant” (`siteConfig.process.billing` – placeholders à compléter et valider).

### 4.4. Zones `/zones`

**Fichier :** `src/app/zones/page.tsx`

- Liste des **zones desservies** (`siteConfig.zones.items`).
- Carte Google via `MapEmbed` (URL depuis `siteConfig.contact.address.mapUrl`).
- Rappel des **pages locales SEO d’exemple** (liens vers les 3 pages `/ambulance-ville-exemple`, etc.).

### 4.5. Demande de transport `/demande-transport`

**Fichier :** `src/app/demande-transport/page.tsx`

Formulaire dédié aux **transports sanitaires non urgents** :

Champs :

- Nom (optionnel),
- Téléphone (obligatoire),
- E-mail (optionnel),
- Type de transport souhaité,
- Date / heure,
- Adresse de départ / destination,
- Position (assis / allongé / à définir),
- Commentaire libre.

Fonctionnalités :

- **Honeypot** (`website`) pour filtrer les robots.
- **Délai minimal anti-spam** (serveur) via jeton signé (`createFormTimeToken` / `verifyFormTimeToken`).
- Case de **consentement RGPD** + lien vers `/protection-des-donnees` :
  - textes dans `siteConfig.forms.requestTransport`.

Traitement :

- Soumission en `POST` vers `POST /api/request` (voir §5).

### 4.6. Contact `/contact`

**Fichier :** `src/app/contact/page.tsx`

- Coordonnées complètes (téléphone, e-mail, adresse).
- CTA “Appeler maintenant” + boutons principaux (`CTAButtons`).
- Formulaire de contact léger (nom, e-mail, téléphone, message) :
  - même logique anti-spam / RGPD que la demande de transport,
  - `formType="contact"` → traité par `POST /api/request`.

### 4.7. Mentions légales `/mentions-legales`

**Fichier :** `src/app/mentions-legales/page.tsx`

- Utilise `siteConfig.business` + `siteConfig.contact` pour structurer :
  - éditeur du site,
  - coordonnées,
  - informations juridiques (placeholders à compléter),
  - hébergement (à préciser une fois l’hébergeur choisi).

### 4.8. Protection des données `/protection-des-donnees`

**Fichier :** `src/app/protection-des-donnees/page.tsx`

- Base de texte pour le **RGPD** :
  - responsable de traitement,
  - finalités,
  - base légale (consentement),
  - destinataires,
  - durée de conservation (à préciser),
  - droits des personnes,
  - sécurité des données.

> ✅ Cette page doit être relue et complétée avec le client (et, si nécessaire, un conseil juridique) avant mise en production.

---

## 5. API & envoi d’e-mails (`POST /api/request`)

**Route :** `src/app/api/request/route.ts`  
**Bibliothèque :** `src/lib/email.ts` (Nodemailer)  
**Anti-spam :** `src/lib/anti-spam.ts`

### 5.1. Anti-spam

- Honeypot `website` (doit rester vide).
- Délai minimal entre génération du formulaire et soumission :
  - `siteConfig.forms.requestTransport.minSubmitDelayMs`
  - `siteConfig.forms.contact.minSubmitDelayMs`
- Jeton signé côté serveur :

  - `createFormTimeToken(Date.now())` → inséré en champ caché `formTimeToken`.
  - `verifyFormTimeToken(token, minDelayMs)` côté API :
    - vérification signature,
    - vérification délai minimal.

### 5.2. Envoi d’e-mails

**Config :** `src/lib/email.ts` (Nodemailer)

Variables d’environnement attendues :

```bash
SMTP_HOST=...
SMTP_PORT=587 # ou 465 si TLS direct
SMTP_USER=...
SMTP_PASS=...

# Optionnels (fallback sur siteConfig.contact.email / SMTP_USER)
FORM_EMAIL_TO=contact@exemple.fr
FORM_EMAIL_FROM=site@exemple.fr
```

Comportement :

- Si SMTP est **configuré** → envoie un e-mail texte avec :
  - type de formulaire (demande de transport / contact),
  - coordonnées,
  - détails du trajet (le cas échéant),
  - commentaire,
  - statut du consentement RGPD.
- Si SMTP n’est **pas configuré** → ne plante pas :
  - log du contenu dans la console (`console.log`),
  - message de warning clair.

> ✅ Le traitement des formulaires est centralisé dans `POST /api/request`.  
> ✅ Le front ne fait qu’un `POST` HTML standard (aucun JavaScript client n’est requis).

---

## 6. Composants de design & accessibilité

Les composants principaux sont dans `src/components/` :

- `Hero.tsx` – section d’intro (H1, CTA, rappel des horaires / coordonnées).
- `Section.tsx` – wrapper pour les sections (titre, eyebrow, CTA).
- `CTAButtons.tsx` – CTA transverses :
  - Appeler maintenant,
  - Demande de transport,
  - Itinéraire.
- `OpeningHours.tsx` – rendu accessible des horaires à partir de `siteConfig.openingHours`.
- `MapEmbed.tsx` – carte Google Maps (iframe accessible).
- `SocialLinks.tsx` – place pour de futurs liens (site principal, fiche établissement, etc.).

> ✅ Modifier ces composants impacte le **design global**, mais pas les données métier.

---

## 7. SEO technique : sitemap, robots, JSON-LD, FAQ schema

- `src/app/robots.ts` – robots.txt généré par Next.js.
- `src/app/sitemap.ts` – sitemap incluant :
  - pages principales (`/`, `/services`, `/prise-en-charge`, `/zones`, `/demande-transport`, `/contact`, `/mentions-legales`, `/protection-des-donnees`),
  - pages locales d’exemple :
    - `/ambulance-ville-exemple`
    - `/transport-sanitaire-ville-exemple`
    - `/vsl-ville-exemple`
- `src/app/layout.tsx` – JSON-LD **MedicalBusiness** (schema.org) pour le référencement local.
- `src/app/page.tsx` – JSON-LD **FAQPage** généré à partir de `siteConfig.faq`.

---

## 8. Variables d’environnement (général)

**Fichier :** `src/lib/seo.ts`

```ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const defaultLocale = "fr-FR";
```

En production, définir :

```bash
NEXT_PUBLIC_SITE_URL="https://ton-domaine-production.com"
```

pour que :

- le sitemap,
- les tags OpenGraph,
- le JSON-LD schema.org

pointent vers la bonne URL.

---

## 9. Résumé pratique

- **Données métier & coordonnées** → `data/site-config.ts`
- **Services, zones, FAQ, process** → `data/site-config.ts`
- **SEO global** → `data/site-config.ts` (`seo`)
- **SEO par page** → `src/lib/page-seo.ts`
- **Formulaires & e-mails** → `src/app/api/request/route.ts` + `src/lib/email.ts` + `src/lib/anti-spam.ts`
- **Textes de pages** → fichiers `src/app/.../page.tsx` (structure + wording d’encadrement)

Avec cette organisation :

- tu peux ajuster le **positionnement**, les **zones desservies**, les **services**, la **FAQ**, le **RGPD** et les **CTA** en éditant principalement `data/site-config.ts` et `src/lib/page-seo.ts` ;
- le code reste orienté **accessibilité**, **clarté** et **conversion par appel**, sans promesses excessives ni logique métier dispersée dans les composants.
