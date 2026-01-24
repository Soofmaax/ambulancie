export interface Address {
  line1: string;
  postalCode: string;
  city: string;
  country: string;
  /**
   * Lien complet vers Google Maps ou un autre service de cartographie.
   * Exemple : "https://www.google.com/maps/search/?api=1&query=..."
   */
  mapUrl: string;
  latitude?: number;
  longitude?: number;
}

export interface OpeningHourSlot {
  from: string;
  to: string;
  label?: string;
}

export interface OpeningHourRange {
  days: string;
  slots: OpeningHourSlot[];
}

export interface ContactConfig {
  phoneMain: string;
  phoneSecondary?: string;
  email: string;
  emailSecondary?: string;
  /**
   * Ce site est dédié à l'organisation de transports sanitaires non urgents.
   * Le message d'urgence vitale est affiché de manière systématique dans le layout.
   */
  emergencyMessage: string;
  nonEmergencyClarification: string;
  address: Address;
}

export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  bulletPoints: string[];
}

export interface MedicalMissionCategory {
  id: string;
  label: string;
  items: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface RequiredDocument {
  id: string;
  label: string;
  description?: string;
}

export interface BillingInfo {
  isConventionne: boolean;
  conventionLabel: string;
  conventionDetail: string;
  transparencyNote: string;
}

export interface ZoneConfig {
  slug: string;
  label: string;
  /**
   * Indication libre : commune principale, commune voisine, etc.
   */
  type: "principale" | "voisine" | "autre";
}

export interface LocalPageConfig {
  slug: string;
  path: string;
  type: "ambulance" | "transport-sanitaire" | "vsl";
  title: string;
  intro: string;
  specificPoints: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FormsConfig {
  requestTransport: {
    minSubmitDelayMs: number;
    rgpdConsentLabel: string;
    privacyLink: string;
    privacyLinkLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  contact: {
    minSubmitDelayMs: number;
    rgpdConsentLabel: string;
    privacyLink: string;
    privacyLinkLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}

export interface BusinessInfo {
  /**
   * Nom commercial visible dans le header.
   */
  brandName: string;
  /**
   * Baseline courte sous le logo.
   */
  baseline: string;
  /**
   * Raison sociale complète (à confirmer).
   */
  legalName: string;
  /**
   * Numéro SIRET ou équivalent.
   */
  siret: string;
  /**
   * Informations légales diverses (capital, RCS, etc.).
   * À compléter avec les informations exactes du client.
   */
  legalMentions: string;
}

export interface SeoConfig {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
}

export interface SiteConfig {
  business: BusinessInfo;
  contact: ContactConfig;
  openingHours: OpeningHourRange[];
  services: {
    mainTypes: ServiceCategory[];
    medicalMissions: MedicalMissionCategory[];
  };
  zones: {
    mainCity: string;
    catchmentLabel: string;
    items: ZoneConfig[];
    localPagesExamples: LocalPageConfig[];
  };
  process: {
    steps: ProcessStep[];
    documents: RequiredDocument[];
    billing: BillingInfo;
  };
  faq: FaqItem[];
  forms: FormsConfig;
  seo: SeoConfig;
}

/**
 * Configuration centrale du site vitrine d'ambulances / transport sanitaire.
 *
 * Toutes les informations métier (coordonnées, zones, services, contenus principaux)
 * doivent être modifiées ici plutôt que dans les composants React.
 */
export const siteConfig: SiteConfig = {
  business: {
    brandName: "Carlier Ambulances Les Sablons",
    baseline: "Transports sanitaires non urgents sur prescription médicale",
    legalName: "CARLIER AMBULANCES LES SABLONS",
    siret: "420 641 680 00038",
    legalMentions:
      "EURL au capital de 50 000 € – 420 641 680 RCS Beauvais – Siège social : 3 rue de l'Europe, 60149 Saint-Crépin-Ibouvillers – Gérant : M. Abdelhalim Chelda (informations à vérifier et compléter avant mise en production).",
  },
  contact: {
    phoneMain: "À compléter",
    phoneSecondary: "",
    email: "À compléter",
    emailSecondary: "",
    emergencyMessage: "En cas d'urgence vitale, appelez le 15 (SAMU) ou le 112.",
    nonEmergencyClarification:
      "Ce site est destiné à l'organisation de transports sanitaires programmés sur prescription médicale. Il ne permet pas de solliciter une prise en charge en urgence vitale ni de recevoir un avis médical.",
    address: {
      line1: "3 rue de l'Europe",
      postalCode: "60149",
      city: "Saint-Crépin-Ibouvillers",
      country: "France",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=3+rue+de+l%27Europe+60149+Saint-Cr%C3%A9pin-Ibouvillers",
      latitude: undefined,
      longitude: undefined,
    },
  },
  openingHours: [
    {
      days: "Lundi au dimanche",
      slots: [
        {
          from: "00:00",
          to: "24:00",
          label: "Standard téléphonique (à adapter selon l'organisation réelle)",
        },
      ],
    },
  ],
  services: {
    mainTypes: [
      {
        id: "ambulance",
        label: "Ambulance",
        description:
          "Transport en position allongée ou semi-assise pour les patients nécessitant une surveillance pendant le trajet, conformément à la prescription médicale de transport.",
        enabled: true,
        bulletPoints: [
          "Intervention réalisée sur la base d'une prescription médicale de transport",
          "Position allongée ou semi-assise selon l'état de santé décrit par le prescripteur",
          "Trajets liés à une hospitalisation, un examen ou un retour à domicile lorsque cela est médicalement indiqué",
        ],
      },
      {
        id: "vsl",
        label: "VSL (Véhicule Sanitaire Léger)",
        description:
          "Transport assis dans un véhicule sanitaire adapté pour les patients autonomes nécessitant un accompagnement vers un lieu de soins, sur prescription médicale de transport.",
        enabled: true,
        bulletPoints: [
          "Transport sanitaire assis réalisé sur prescription médicale de transport",
          "Fréquemment utilisé pour les séances de dialyse, les consultations régulières, la rééducation ou les venues en hôpital de jour",
          "La prise en charge par l'Assurance Maladie dépend des conditions prévues par la réglementation en vigueur (à vérifier auprès de votre caisse)",
        ],
      },
      {
        id: "transport-assis",
        label: "Transport assis professionnalisé",
        description:
          "Transport assis avec conducteur formé aux spécificités du transport sanitaire, lorsque ce mode de transport est prévu par la prescription médicale ou retenu après échange avec le prescripteur.",
        enabled: true,
        bulletPoints: [
          "Accompagnement jusqu'au service ou au cabinet médical lorsque cela est prévu",
          "Prise en charge possible de personnes à mobilité réduite (PMR) selon les capacités du véhicule et les aides au transfert disponibles",
          "Possibilité de présence d'un accompagnant, lorsque la réglementation et la configuration du véhicule le permettent",
          "Organisation des horaires en cohérence avec l'heure de convocation (consultations, hôpital de jour, examens programmés)",
        ],
      },
      {
        id: "transport-allonge",
        label: "Transport allongé non urgent",
        description:
          "Transport allongé programmé à l'avance pour des rendez-vous médicaux, des retours à domicile ou des transferts entre établissements, lorsque l'état de santé le justifie.",
        enabled: true,
        bulletPoints: [
          "Coordination possible avec les équipes soignantes pour organiser le trajet",
          "Prise en compte du confort et de la sécurité du patient pendant le transport",
          "Transferts inter-établissements ou vers des structures de soins de suite, selon la prescription médicale",
        ],
      },
    ],
    medicalMissions: [
      {
        id: "consultations-examens",
        label: "Consultations & examens",
        items: [
          "Consultations hospitalières ou de ville",
          "Examens d'imagerie (scanner, IRM, radiologie…)",
          "Bilan pré-opératoire ou post-opératoire",
        ],
      },
      {
        id: "dialyse",
        label: "Séances de dialyse",
        items: [
          "Aller-retour centre de dialyse ou unité de dialyse médicalisée",
          "Organisation récurrente des créneaux de prise en charge pour les séances plurihebdomadaires",
        ],
      },
      {
        id: "hospitalisation-jour",
        label: "Hospitalisation de jour & hôpital de jour",
        items: [
          "Transports pour hospitalisation de jour (médecine, chirurgie, oncologie, etc.)",
          "Aller-retour pour soins itératifs réalisés en hôpital de jour",
        ],
      },
      {
        id: "reeducation",
        label: "Rééducation & soins réguliers",
        items: [
          "Séances de kinésithérapie ou de rééducation",
          "Suivi de soins programmés en centre de rééducation ou en hôpital de jour",
        ],
      },
      {
        id: "transferts",
        label: "Transferts entre établissements",
        items: [
          "Transferts entre hôpital, clinique, centre de soins de suite",
          "Retour à domicile après hospitalisation (selon avis médical)",
        ],
      },
    ],
  },
  zones: {
    mainCity: "Saint-Crépin-Ibouvillers",
    catchmentLabel:
      "Secteur de Saint-Crépin-Ibouvillers et des communes voisines, dans le département de l'Oise (60), avec des interventions régulières vers l'Île-de-France (Paris et départements limitrophes).",
    items: [
      {
        slug: "saint-crepin-ibouvillers",
        label: "Saint-Crépin-Ibouvillers",
        type: "principale",
      },
      {
        slug: "meru",
        label: "Méru",
        type: "voisine",
      },
      {
        slug: "neuilly-en-thelle",
        label: "Neuilly-en-Thelle",
        type: "voisine",
      },
      {
        slug: "chambly",
        label: "Chambly",
        type: "voisine",
      },
      {
        slug: "henonville",
        label: "Hénonville",
        type: "autre",
      },
      {
        slug: "cergy",
        label: "Cergy",
        type: "autre",
      },
      {
        slug: "pontoise",
        label: "Pontoise",
        type: "autre",
      },
      {
        slug: "argenteuil",
        label: "Argenteuil",
        type: "autre",
      },
      {
        slug: "beauvais",
        label: "Beauvais",
        type: "autre",
      },
      {
        slug: "paris",
        label: "Paris (différents arrondissements, dont Paris 17)",
        type: "autre",
      },
      {
        slug: "autres-communes-oise-sud",
        label: "Autres communes du sud de l'Oise (60) – à préciser avec la société",
        type: "autre",
      },
      {
        slug: "ile-de-france",
        label: "Île-de-France (Paris et départements limitrophes)",
        type: "autre",
      },
    ],
    localPagesExamples: [
      {
        slug: "saint-crepin-ibouvillers",
        path: "/ambulance-saint-crepin-ibouvillers",
        type: "ambulance",
        title:
          "Ambulances à Saint-Crépin-Ibouvillers (Oise 60) – Transport sanitaire non urgent",
        intro:
          "Organisation de transports en ambulance à Saint-Crépin-Ibouvillers, dans le sud de l'Oise (60), et dans les communes voisines pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile lorsque cela est prévu par la prescription médicale.",
          "Intervention sur Saint-Crépin-Ibouvillers, Méru, Neuilly-en-Thelle, Chambly et les communes alentours, en lien avec les structures de santé locales.",
          "Planification des trajets pour limiter l'attente et respecter les horaires de convocation lorsqu'elles sont fixées.",
        ],
      },
      {
        slug: "saint-crepin-ibouvillers",
        path: "/transport-sanitaire-saint-crepin-ibouvillers",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire à Saint-Crépin-Ibouvillers (Oise 60) – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées à Saint-Crépin-Ibouvillers et dans le sud de l'Oise (60) : ambulance, VSL et transport assis professionnalisé, en appui des prescriptions médicales de transport.",
        specificPoints: [
          "Orientation vers le type de véhicule (ambulance, VSL ou transport assis) correspondant à la prescription médicale.",
          "Transports ponctuels ou réguliers pour dialyse, rééducation, hôpital de jour ou consultations spécialisées dans les établissements du secteur.",
          "Coopération avec les établissements de santé du département de l'Oise pour organiser les arrivées et les retours dans la mesure du possible.",
        ],
      },
      {
        slug: "saint-crepin-ibouvillers",
        path: "/vsl-saint-crepin-ibouvillers",
        type: "vsl",
        title:
          "VSL à Saint-Crépin-Ibouvillers (Oise 60) – Véhicule Sanitaire Léger pour vos rendez-vous médicaux",
        intro:
          "Mise à disposition de VSL à Saint-Crépin-Ibouvillers et dans les communes voisines du sud de l'Oise (60) pour les transports assis sur prescription médicale de transport, dans le cadre de rendez-vous médicaux programmés.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement vers les établissements de santé du secteur.",
          "Trajets pour consultations, bilans, séances de dialyse, de rééducation ou en hôpital de jour, selon les indications portées sur la prescription.",
          "Organisation possible de transports récurrents sur plusieurs semaines lorsque cela est prévu.",
        ],
      },
      {
        slug: "meru",
        path: "/ambulance-meru",
        type: "ambulance",
        title: "Ambulances à Méru (Oise 60) – Transport sanitaire non urgent",
        intro:
          "Organisation de transports en ambulance à Méru et dans les communes voisines pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile lorsque cela est prévu par la prescription médicale.",
          "Intervention sur Méru et les communes proches (Neuilly-en-Thelle, Chambly, Saint-Crépin-Ibouvillers…) en lien avec les structures de santé locales.",
          "Transports vers les établissements hospitaliers du secteur, selon la prescription et l'organisation retenue.",
        ],
      },
      {
        slug: "meru",
        path: "/transport-sanitaire-meru",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire à Méru (Oise 60) – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées à Méru : ambulance, VSL et transport assis professionnalisé, en appui des prescriptions médicales de transport.",
        specificPoints: [
          "Orientation vers le type de véhicule (ambulance, VSL ou transport assis) correspondant à la prescription médicale et à la situation.",
          "Transports ponctuels ou réguliers pour consultations, rééducation, hôpital de jour ou séances de dialyse dans les établissements de la région.",
          "Organisation des horaires en fonction des heures de convocation et des contraintes des établissements de soins.",
        ],
      },
      {
        slug: "meru",
        path: "/vsl-meru",
        type: "vsl",
        title: "VSL à Méru (Oise 60) – Véhicule Sanitaire Léger",
        intro:
          "Mise à disposition de VSL à Méru pour les transports assis sur prescription médicale de transport, dans le cadre de rendez-vous médicaux programmés.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement vers les centres de soins de Méru et des communes voisines.",
          "Trajets réguliers possibles pour consultations spécialisées, rééducation ou hospitalisation de jour, selon la prescription.",
          "Coordination avec les services de soins pour organiser les horaires de prise en charge lorsque cela est nécessaire.",
        ],
      },
      {
        slug: "ile-de-france",
        path: "/ambulance-ile-de-france",
        type: "ambulance",
        title:
          "Ambulances en Île-de-France – Transports sanitaires non urgents sur prescription médicale",
        intro:
          "Organisation de transports en ambulance en Île-de-France (Paris et départements limitrophes) pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile lorsque cela est prévu par la prescription médicale.",
          "Transports possibles vers les principaux établissements de santé d'Île-de-France, selon les besoins et l'organisation retenue.",
          "Étude au cas par cas des trajets de longue distance ou interrégionaux, en fonction des disponibilités et des contraintes médicales.",
        ],
      },
      {
        slug: "ile-de-france",
        path: "/transport-sanitaire-ile-de-france",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire en Île-de-France – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées en Île-de-France : ambulance, VSL et transport assis professionnalisé, en appui des prescriptions médicales de transport.",
        specificPoints: [
          "Choix du mode de transport (ambulance, VSL ou transport assis) en fonction de la prescription médicale et de la situation du patient.",
          "Transports ponctuels ou réguliers pour consultations, hospitalisation de jour, rééducation ou séances de dialyse dans les établissements franciliens.",
          "Organisation des horaires en tenant compte des heures de convocation et des contraintes de circulation en Île-de-France.",
        ],
      },
      {
        slug: "ile-de-france",
        path: "/vsl-ile-de-france",
        type: "vsl",
        title:
          "VSL en Île-de-France – Véhicules Sanitaires Légers pour vos rendez-vous médicaux",
        intro:
          "Mise à disposition de VSL en Île-de-France pour les transports assis sur prescription médicale de transport, dans le cadre de rendez-vous médicaux programmés.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement vers les centres de soins en Île-de-France.",
          "Possibilité de programmer des transports récurrents (consultations spécialisées, rééducation, hospitalisation de jour), dans le respect de la prescription.",
          "Adaptation des trajets et des horaires aux contraintes de circulation de la région francilienne.",
        ],
      },
      {
        slug: "cergy",
        path: "/ambulance-cergy",
        type: "ambulance",
        title:
          "Ambulances à Cergy (Île-de-France) – Transport sanitaire non urgent",
        intro:
          "Organisation de transports en ambulance à Cergy et dans les communes voisines pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile lorsque cela est prévu par la prescription médicale.",
          "Intervention sur Cergy, Cergy-Pontoise et les communes voisines, en lien avec les établissements de santé du secteur.",
          "Étude au cas par cas des trajets plus éloignés en Île-de-France, en fonction des disponibilités et des horaires de convocation.",
        ],
      },
      {
        slug: "cergy",
        path: "/vsl-cergy",
        type: "vsl",
        title: "VSL à Cergy (Île-de-France) – Véhicule Sanitaire Léger",
        intro:
          "Mise à disposition de VSL à Cergy pour les transports assis sur prescription médicale de transport, notamment pour les consultations spécialisées et la rééducation.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement vers les centres de soins de Cergy et de l'agglomération de Cergy-Pontoise.",
          "Possibilité de programmer des transports réguliers pour des rendez-vous médicaux récurrents, dans le respect de la prescription.",
          "Organisation des horaires en tenant compte des contraintes de circulation locales et des heures de convocation.",
        ],
      },
      {
        slug: "pontoise",
        path: "/ambulance-pontoise",
        type: "ambulance",
        title:
          "Ambulances à Pontoise (Île-de-France) – Transports sanitaires non urgents",
        intro:
          "Organisation de transports en ambulance à Pontoise et dans l'agglomération de Cergy-Pontoise pour des rendez-vous médicaux programmés, sur prescription médicale de transport.",
        specificPoints: [
          "Transports en ambulance pour hospitalisations, examens ou retours à domicile lorsque cela est prévu par la prescription médicale.",
          "Intervention sur Pontoise et les communes alentours, en coordination avec les structures de soins locales.",
          "Trajets possibles vers les principaux établissements hospitaliers d'Île-de-France, étudiés au cas par cas avec le standard.",
        ],
      },
      {
        slug: "argenteuil",
        path: "/ambulance-argenteuil",
        type: "ambulance",
        title:
          "Ambulances à Argenteuil (Île-de-France) – Transport sanitaire non urgent",
        intro:
          "Organisation de transports en ambulance à Argenteuil et dans les communes voisines pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisations, examens ou retours à domicile lorsque cela est prévu sur la prescription médicale.",
          "Intervention sur Argenteuil et les communes proches, en lien avec les établissements de santé du secteur.",
          "Organisation des trajets en tenant compte des horaires de convocation et des spécificités de circulation en Île-de-France.",
        ],
      },
      {
        slug: "beauvais",
        path: "/ambulance-beauvais",
        type: "ambulance",
        title:
          "Ambulances à Beauvais (Oise 60) – Transport sanitaire non urgent",
        intro:
          "Organisation de transports en ambulance à Beauvais et dans les communes voisines pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile lorsque cela est prévu par la prescription médicale.",
          "Intervention sur Beauvais et le bassin beauvaisien, en lien avec les structures de soins locales.",
          "Trajets possibles vers les principaux établissements hospitaliers de l'Oise et d'Île-de-France, étudiés au cas par cas avec le standard.",
        ],
      },
      {
        slug: "beauvais",
        path: "/transport-sanitaire-beauvais",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire à Beauvais (Oise 60) – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées à Beauvais : ambulance, VSL et transport assis professionnalisé, en appui des prescriptions médicales de transport.",
        specificPoints: [
          "Choix du mode de transport (ambulance, VSL ou transport assis) en fonction de la prescription médicale et de la situation du patient.",
          "Transports ponctuels ou réguliers pour consultations, rééducation, hospitalisation de jour ou séances de dialyse, selon les indications portées sur la prescription.",
          "Organisation des horaires en tenant compte des heures de convocation et des contraintes de circulation autour de Beauvais.",
        ],
      },
      {
        slug: "beauvais",
        path: "/vsl-beauvais",
        type: "vsl",
        title:
          "VSL à Beauvais (Oise 60) – Véhicule Sanitaire Léger pour vos rendez-vous médicaux",
        intro:
          "Mise à disposition de VSL à Beauvais pour les transports assis sur prescription médicale de transport, dans le cadre de rendez-vous médicaux programmés.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement vers les centres de soins de Beauvais et des communes alentours.",
          "Possibilité de programmer des transports récurrents pour des consultations spécialisées, des séances de rééducation ou d'hôpital de jour.",
          "Adaptation des trajets et des horaires aux contraintes de circulation locales et aux impératifs médicaux.",
        ],
      },
      {
        slug: "paris",
        path: "/ambulance-paris",
        type: "ambulance",
        title:
          "Ambulances à Paris – Transports sanitaires non urgents sur prescription",
        intro:
          "Organisation de transports en ambulance à Paris et dans les différents arrondissements pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisations, examens ou retours à domicile lorsque cela est prévu par la prescription médicale.",
          "Transports possibles vers les principaux hôpitaux et cliniques parisiens, étudiés au cas par cas en fonction des disponibilités.",
          "Organisation des trajets en tenant compte des horaires de convocation et des contraintes de circulation à Paris.",
        ],
      },
      {
        slug: "paris",
        path: "/transport-sanitaire-paris",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire à Paris – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées à Paris : ambulance, VSL et transport assis professionnalisé, en appui des prescriptions médicales de transport.",
        specificPoints: [
          "Choix du mode de transport (ambulance, VSL ou transport assis) en fonction de la prescription médicale et de la situation du patient.",
          "Transports pour consultations, examens, hospitalisations de jour ou séances récurrentes dans les établissements parisiens.",
          "Adaptation des horaires aux contraintes de circulation et aux heures de convocation dans la capitale.",
        ],
      },
      {
        slug: "paris",
        path: "/vsl-paris",
        type: "vsl",
        title:
          "VSL à Paris – Véhicules Sanitaires Légers pour vos rendez-vous médicaux",
        intro:
          "Mise à disposition de VSL à Paris pour les transports assis sur prescription médicale de transport, dans le cadre de rendez-vous médicaux programmés.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement dans Paris intra-muros.",
          "Possibilité de programmer des transports récurrents pour des consultations spécialisées, de la rééducation ou une hospitalisation de jour.",
          "Organisation des trajets en tenant compte des temps de déplacement en milieu urbain dense et des horaires de convocation.",
        ],
      },
      {
        slug: "paris",
        path: "/ambulance-paris-17",
        type: "ambulance",
        title:
          "Ambulances Paris 17 – Transport sanitaire non urgent dans le 17e arrondissement",
        intro:
          "Organisation de transports en ambulance dans le 17e arrondissement de Paris (Paris 17) pour des rendez-vous médicaux programmés sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile dans Paris 17 et les arrondissements limitrophes, lorsque cela est prévu par la prescription médicale.",
          "Transports possibles vers les établissements hospitaliers parisiens, étudiés au cas par cas selon les besoins et les disponibilités.",
          "Planification des trajets en tenant compte des contraintes de circulation propres au secteur (Batignolles, Ternes, etc.).",
        ],
      },
      {
        slug: "paris",
        path: "/transport-sanitaire-paris-17",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire Paris 17 – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées dans le 17e arrondissement de Paris (Paris 17) : ambulance, VSL et transport assis professionnalisé, en appui des prescriptions médicales de transport.",
        specificPoints: [
          "Choix du mode de transport (ambulance, VSL ou transport assis) en fonction de la prescription médicale et de la situation du patient dans Paris 17.",
          "Transports pour consultations, examens ou hospitalisations de jour dans les structures de soins parisiennes.",
          "Organisation des horaires en tenant compte des temps de déplacement intra-muros et des impératifs médicaux.",
        ],
      },
      {
        slug: "paris",
        path: "/vsl-paris-17",
        type: "vsl",
        title:
          "VSL Paris 17 – Véhicules Sanitaires Légers pour vos rendez-vous médicaux",
        intro:
          "Mise à disposition de VSL dans le 17e arrondissement de Paris (Paris 17) pour les transports assis sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement dans Paris 17 et les quartiers limitrophes.",
          "Possibilité de programmer des transports réguliers pour des consultations spécialisées, des séances de rééducation ou une hospitalisation de jour à Paris.",
          "Adaptation des trajets et des horaires aux conditions de circulation dans le 17e arrondissement et les secteurs voisins.",
        ],
      },
    ],
  },
  process: {
    steps: [
      {
        id: "contact",
        title: "1. Prise de contact",
        description:
          "Vous contactez le standard des ambulances par téléphone ou via le formulaire de demande de transport en précisant le motif du déplacement, la date envisagée, les adresses de départ et de destination et, si possible, les références de la prescription médicale de transport.",
      },
      {
        id: "verification",
        title: "2. Vérification de la prise en charge",
        description:
          "L'équipe recueille les informations figurant sur la prescription médicale de transport et, à titre indicatif, vous rappelle les grands principes d'éligibilité et les modalités de prise en charge prévues par l'Assurance Maladie. En cas de question spécifique, il peut être nécessaire de vous rapprocher directement de votre caisse.",
      },
      {
        id: "organisation",
        title: "3. Organisation du véhicule et de l'horaire",
        description:
          "En fonction des éléments médicaux mentionnés sur la prescription et des informations communiquées, un type de transport est proposé (ambulance, VSL ou transport assis). L'horaire de prise en charge est défini en visant la compatibilité avec votre heure de convocation.",
      },
      {
        id: "prise-en-charge",
        title: "4. Prise en charge le jour du transport",
        description:
          "Le jour du rendez-vous, l'équipe se présente à l'adresse convenue, assure votre acheminement jusqu'au service ou au cabinet médical, puis organise le retour selon les modalités définies lorsque celui-ci est prévu.",
      },
    ],
    documents: [
      {
        id: "prescription-medicale",
        label: "Prescription médicale de transport",
        description:
          "Document établi par votre médecin ou par l'établissement de santé précisant le type de transport nécessaire (ambulance, VSL, transport assis).",
      },
      {
        id: "carte-vitale",
        label: "Carte Vitale ou attestation de droits",
        description:
          "Justificatif de vos droits à jour auprès de l'Assurance Maladie. À présenter lors de la prise en charge.",
      },
      {
        id: "mutuelle",
        label: "Informations complémentaires (mutuelle, prise en charge spécifique)",
        description:
          "Selon votre situation, certains organismes ou complémentaires peuvent intervenir. Ces éléments seront clarifiés lors de l'échange avec le standard.",
      },
    ],
    billing: {
      isConventionne: true,
      conventionLabel:
        "Entreprise de transport sanitaire agréée et conventionnée avec l'Assurance Maladie (à confirmer et adapter selon la situation réelle de la société).",
      conventionDetail:
        "Selon la prescription médicale de transport et votre situation, un tiers payant total ou partiel peut être applicable, conformément aux règles de l'Assurance Maladie et, le cas échéant, de votre organisme complémentaire. Ces éléments doivent être vérifiés et validés avec la société et les caisses concernées avant la mise en production.",
      transparencyNote:
        "La prise en charge financière d'un transport sanitaire dépend de la prescription médicale de transport et des critères d'éligibilité définis par l'Assurance Maladie. En cas de doute, les équipes peuvent vous orienter vers les informations officielles, sans se substituer à un avis médical. La société d'ambulances ne se substitue ni au médecin prescripteur ni à l'Assurance Maladie pour l'appréciation finale de la prise en charge.",
    },
  },
  faq: [
    {
      id: "types-transport",
      question: "Quels types de transports sanitaires proposez-vous ?",
      answer:
        "Selon la situation et la prescription médicale, différents types de transports peuvent être proposés : ambulance pour les transports allongés ou surveillés, VSL (Véhicule Sanitaire Léger) pour les transports assis sur prescription, et transport assis professionnalisé pour certaines situations particulières. Lors de la prise de contact, le standard peut vous expliquer quelle catégorie de transport correspond à la prescription.",
    },
    {
      id: "urgence-vs-non-urgence",
      question:
        "Ce service est-il adapté aux urgences vitales ou aux situations imprévues ?",
      answer:
        "Non. En cas d'urgence vitale ou de situation nécessitant une prise en charge immédiate, il est indispensable de contacter le 15 (SAMU) ou le 112. Les transports gérés via ce site sont des transports sanitaires programmés ou organisés à l'avance, selon prescription médicale.",
    },
    {
      id: "prescription-necessaire",
      question:
        "Une prescription médicale est-elle nécessaire pour organiser un transport ?",
      answer:
        "Dans la plupart des cas, oui. La prescription médicale de transport permet de déterminer le type de véhicule adapté et les conditions de prise en charge éventuelle par l'Assurance Maladie. Lors de votre appel, les équipes peuvent vous indiquer quels documents seront à présenter, sans se substituer aux indications de votre médecin prescripteur ni des organismes d'assurance maladie.",
    },
    {
      id: "horaires-trajets",
      question:
        "Réalisez-vous des transports tôt le matin, le soir ou la nuit ?",
      answer:
        "Selon la demande, le type de transport et l'organisation des plannings, il est possible de programmer des transports très tôt le matin, en soirée ou de nuit, notamment pour des hospitalisations, des retours à domicile ou des consultations avec horaires spécifiques. Ces possibilités sont étudiées au cas par cas lors de la prise de contact, en fonction des disponibilités et des contraintes réglementaires.",
    },
    {
      id: "accompagnant",
      question: "Un accompagnant peut-il être présent pendant le transport ?",
      answer:
        "La présence d'un accompagnant peut être envisagée lorsque la réglementation le permet et que la configuration du véhicule offre une place disponible, sans compromettre la sécurité du patient et des équipes. Ce point est à préciser lors de la demande de transport, afin de vérifier les possibilités pour le trajet concerné.",
    },
    {
      id: "zones-desservies",
      question: "Quelles sont les zones géographiques desservies ?",
      answer:
        "La société d’ambulances intervient principalement sur la commune de référence indiquée sur le site ainsi que sur les communes voisines précisées dans la rubrique « Zones desservies ». Pour des trajets plus éloignés ou spécifiques, une étude de faisabilité peut être réalisée au cas par cas.",
    },
    {
      id: "tarifs-prise-en-charge",
      question:
        "Comment sont gérés les tarifs et la prise en charge financière du transport ?",
      answer:
        "Les modalités de prise en charge dépendent de votre situation, de la prescription médicale de transport et des règles en vigueur de l'Assurance Maladie. Lors de l'échange avec le standard, les équipes vous indiquent quelles informations ou documents préparer. Le site n'a pas vocation à délivrer un conseil médical ni à se substituer aux informations officielles.",
    },
  ],
  forms: {
    requestTransport: {
      minSubmitDelayMs: 3000,
      rgpdConsentLabel:
        "En envoyant ce formulaire, j’accepte que les informations saisies soient utilisées uniquement pour l'étude et le traitement de ma demande de transport sanitaire non urgent et, le cas échéant, pour être recontacté à ce sujet, dans le respect de la réglementation applicable en matière de protection des données personnelles.",
      privacyLink: "/protection-des-donnees",
      privacyLinkLabel: "En savoir plus sur la protection de vos données",
      successMessage:
        "Votre demande de transport a bien été envoyée. Un membre de l’équipe vous recontactera dans les meilleurs délais au numéro indiqué afin de préciser les modalités d’organisation du trajet.",
      errorMessage:
        "Une erreur est survenue lors de l’envoi du formulaire. Vous pouvez réessayer dans quelques instants ou nous contacter directement par téléphone.",
    },
    contact: {
      minSubmitDelayMs: 2000,
      rgpdConsentLabel:
        "En envoyant ce formulaire, j’accepte que les informations saisies soient utilisées uniquement pour répondre à ma demande de contact, dans le respect de la réglementation applicable en matière de protection des données personnelles.",
      privacyLink: "/protection-des-donnees",
      privacyLinkLabel: "Détails sur la protection des données",
      successMessage:
        "Votre message a bien été envoyé. Nous reviendrons vers vous dans les meilleurs délais, par téléphone ou par e-mail selon les informations fournies.",
      errorMessage:
        "Une erreur est survenue lors de l’envoi du message. Vous pouvez réessayer ou privilégier un contact téléphonique.",
    },
  },
  seo: {
    defaultTitle:
      "Carlier Ambulances Les Sablons – Transports sanitaires non urgents à Saint-Crépin-Ibouvillers",
    defaultDescription:
      "Carlier Ambulances Les Sablons assure des transports sanitaires non urgents sur prescription médicale à Saint-Crépin-Ibouvillers (Oise 60), dans les communes voisines (Méru, Neuilly-en-Thelle, Chambly, Hénonville, Beauvais…) et vers l'Île-de-France (Paris, Cergy, Pontoise, Argenteuil et départements limitrophes) : ambulances, VSL et transport assis professionnalisé, pour consultations, dialyse, hôpital de jour, rééducation et transferts entre établissements.",
    keywords: [
      "Carlier Ambulances Les Sablons",
      "ambulances Saint-Crépin-Ibouvillers",
      "transport sanitaire Saint-Crépin-Ibouvillers",
      "VSL Saint-Crépin-Ibouvillers",
      "transport assis professionnalisé Saint-Crépin-Ibouvillers",
      "ambulance Oise 60",
      "transport sanitaire Oise 60",
      "ambulance Beauvais",
      "transport sanitaire Beauvais",
      "VSL Beauvais",
      "ambulance Méru",
      "transport sanitaire Méru",
      "ambulance Neuilly-en-Thelle",
      "transport sanitaire Neuilly-en-Thelle",
      "ambulance Chambly",
      "transport sanitaire Chambly",
      "ambulance Cergy",
      "transport sanitaire Cergy",
      "VSL Cergy",
      "ambulance Pontoise",
      "transport sanitaire Pontoise",
      "ambulance Argenteuil",
      "transport sanitaire Argenteuil",
      "ambulance Île-de-France",
      "transport sanitaire Île-de-France",
      "VSL Île-de-France",
      "ambulance Paris",
      "transport sanitaire Paris",
      "VSL Paris",
      "ambulance Paris 17",
      "transport sanitaire Paris 17",
      "VSL Paris 17",
    ],
  },
};