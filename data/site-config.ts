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
    brandName: "Ambulances Exemple",
    baseline: "Ambulances & transport sanitaire non urgent",
    legalName: "TODO – Raison sociale complète de la société d'ambulances",
    siret: "TODO – Numéro SIRET / numéro d'enregistrement",
    legalMentions:
      "TODO – Capital social, RCS / registre, coordonnées du responsable légal. À compléter et valider avant mise en production.",
  },
  contact: {
    phoneMain: "01 23 45 67 89",
    phoneSecondary: "",
    email: "contact@ambulances-exemple.fr",
    emailSecondary: "",
    emergencyMessage: "En cas d'urgence vitale, appelez le 15 (SAMU) ou le 112.",
    nonEmergencyClarification:
      "Ce site est dédié à l'organisation de transports sanitaires programmés et non urgents. Il ne permet pas de gérer les situations d'urgence vitale ni de délivrer de conseil médical.",
    address: {
      line1: "TODO – Adresse complète du siège ou de la base des ambulances",
      postalCode: "00000",
      city: "Ville principale",
      country: "France",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=TODO+adresse+ambulances",
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
          "Transport en position allongée ou semi-assise pour les patients nécessitant une surveillance rapprochée pendant le trajet.",
        enabled: true,
        bulletPoints: [
          "Prise en charge sur prescription médicale de transport",
          "Transport allongé ou semi-assis selon l'état du patient",
          "Interventions pour hospitalisation, examens ou retour à domicile",
        ],
      },
      {
        id: "vsl",
        label: "VSL (Véhicule Sanitaire Léger)",
        description:
          "Transport assis dans un véhicule sanitaire adapté, pour les patients autonomes nécessitant un accompagnement vers un lieu de soins.",
        enabled: true,
        bulletPoints: [
          "Transport sanitaire assis sur prescription médicale",
          "Idéal pour les séances de dialyse, les consultations régulières, la rééducation",
          "Prise en charge possible selon les règles de l'Assurance Maladie",
        ],
      },
      {
        id: "transport-assis",
        label: "Transport assis professionnalisé",
        description:
          "Transport assis avec chauffeur formé aux spécificités du transport sanitaire, dans le respect des consignes médicales.",
        enabled: true,
        bulletPoints: [
          "Accompagnement jusqu'au service ou au cabinet médical si nécessaire",
          "Prise en charge de personnes à mobilité réduite selon les possibilités du véhicule",
          "Organisation claire des horaires de prise en charge",
        ],
      },
      {
        id: "transport-allonge",
        label: "Transport allongé non urgent",
        description:
          "Transport allongé planifié à l'avance pour des rendez-vous médicaux, des retours à domicile ou des transferts entre établissements.",
        enabled: true,
        bulletPoints: [
          "Organisation du trajet en lien avec les équipes soignantes",
          "Prise en charge adaptée au confort et à la sécurité du patient",
          "Trajets inter-hospitaliers ou vers des structures de soins de suite",
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
          "Aller-retour centre de dialyse",
          "Organisation récurrente des créneaux de prise en charge",
        ],
      },
      {
        id: "reeducation",
        label: "Rééducation & soins réguliers",
        items: [
          "Séances de kinésithérapie ou de rééducation",
          "Suivi de soins programmés",
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
    mainCity: "Ville principale (à personnaliser)",
    catchmentLabel:
      "TODO – Décrire brièvement la zone d'intervention (ex. agglomération, département, communes voisines).",
    items: [
      {
        slug: "ville-exemple",
        label: "Ville exemple (à remplacer par la commune principale)",
        type: "principale",
      },
      {
        slug: "commune-voisine-1",
        label: "Commune voisine 1 (à remplacer)",
        type: "voisine",
      },
      {
        slug: "commune-voisine-2",
        label: "Commune voisine 2 (à remplacer)",
        type: "voisine",
      },
    ],
    localPagesExamples: [
      {
        slug: "ville-exemple",
        path: "/ambulance-ville-exemple",
        type: "ambulance",
        title: "Ambulances à Ville exemple – Transport sanitaire non urgent",
        intro:
          "Organisation de transports en ambulance à Ville exemple et dans les communes voisines pour vos rendez-vous médicaux programmés.",
        specificPoints: [
          "Prise en charge en ambulance pour hospitalisation, examens ou retour à domicile (selon prescription médicale).",
          "Intervention sur Ville exemple et les communes alentours, en lien avec les structures de santé locales.",
          "Planification des trajets pour limiter l'attente et respecter les horaires de convocation.",
        ],
      },
      {
        slug: "ville-exemple",
        path: "/transport-sanitaire-ville-exemple",
        type: "transport-sanitaire",
        title:
          "Transport sanitaire à Ville exemple – Ambulance, VSL & transport assis",
        intro:
          "Solutions de transport sanitaire programmées à Ville exemple : ambulance, VSL et transport assis, adaptées à chaque situation médicale.",
        specificPoints: [
          "Orientation vers le bon type de véhicule (ambulance, VSL ou transport assis) en fonction de la prescription.",
          "Transports réguliers pour dialyse, rééducation ou consultations spécialisées.",
          "Coopération avec les établissements de santé pour organiser les arrivées et les retours.",
        ],
      },
      {
        slug: "ville-exemple",
        path: "/vsl-ville-exemple",
        type: "vsl",
        title:
          "VSL à Ville exemple – Véhicule Sanitaire Léger pour vos rendez-vous médicaux",
        intro:
          "Mise à disposition de VSL à Ville exemple pour les transports assis sur prescription médicale de transport.",
        specificPoints: [
          "Prise en charge assise pour les patients autonomes nécessitant un accompagnement.",
          "Trajets pour consultations, bilans, séances de dialyse ou de rééducation.",
          "Organisation possible de transports récurrents sur plusieurs semaines.",
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
          "Vous contactez le standard des ambulances par téléphone ou via le formulaire de demande de transport en précisant le motif, la date, les adresses et, si possible, la prescription médicale.",
      },
      {
        id: "verification",
        title: "2. Vérification de la prise en charge",
        description:
          "L'équipe vérifie avec vous la prescription médicale de transport, les conditions d'éligibilité et les modalités de prise en charge éventuelle par l'Assurance Maladie et/ou votre complémentaire santé.",
      },
      {
        id: "organisation",
        title: "3. Organisation du véhicule et de l'horaire",
        description:
          "En fonction de votre situation, un type de transport est proposé (ambulance, VSL ou transport assis). L'horaire de prise en charge est défini pour respecter au mieux l'heure de convocation.",
      },
      {
        id: "prise-en-charge",
        title: "4. Prise en charge le jour du transport",
        description:
          "Le jour du rendez-vous, l'équipe arrive à l'adresse convenue, vous accompagne jusqu'au service ou au cabinet médical, puis organise le retour selon les modalités définies ensemble.",
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
      isConventionne: false,
      conventionLabel:
        "TODO – Préciser si la société est conventionnée avec l'Assurance Maladie et les modalités de tiers payant.",
      conventionDetail:
        "Ces informations doivent être complétées et validées avec le client avant la mise en production du site.",
      transparencyNote:
        "La prise en charge financière d'un transport sanitaire dépend de la prescription médicale de transport et des critères d'éligibilité définis par l'Assurance Maladie. En cas de doute, les équipes peuvent vous orienter vers les informations officielles, sans se substituer à un avis médical.",
    },
  },
  faq: [
    {
      id: "types-transport",
      question: "Quels types de transports sanitaires proposez-vous ?",
      answer:
        "Selon la situation et la prescription médicale, différents types de transports peuvent être proposés : ambulance pour les transports allongés ou surveillés, VSL (Véhicule Sanitaire Léger) pour les transports assis sur prescription, et transport assis professionnalisé pour certaines situations particulières. Le standard vous aide à y voir clair lors de la prise de contact.",
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
        "Dans la plupart des cas, oui. La prescription médicale de transport permet de déterminer le type de véhicule adapté et les conditions de prise en charge éventuelle par l'Assurance Maladie. Lors de votre appel, le standard vous indiquera les documents à préparer.",
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
        "En envoyant ce formulaire, j’accepte que mes données soient utilisées uniquement pour traiter ma demande de transport sanitaire et pour me recontacter à ce sujet.",
      privacyLink: "/protection-des-donnees",
      privacyLinkLabel: "En savoir plus sur la protection de vos données",
      successMessage:
        "Votre demande de transport a bien été envoyée. Une personne de l’équipe vous recontactera au plus vite au numéro indiqué pour finaliser l’organisation du trajet.",
      errorMessage:
        "Une erreur est survenue lors de l’envoi du formulaire. Vous pouvez réessayer dans quelques instants ou nous contacter directement par téléphone.",
    },
    contact: {
      minSubmitDelayMs: 2000,
      rgpdConsentLabel:
        "En envoyant ce formulaire, j’accepte que mes données soient utilisées uniquement pour répondre à ma demande de contact.",
      privacyLink: "/protection-des-donnees",
      privacyLinkLabel: "Détails sur la protection des données",
      successMessage:
        "Votre message a bien été envoyé. Nous reviendrons vers vous dans les meilleurs délais.",
      errorMessage:
        "Une erreur est survenue lors de l’envoi du message. Vous pouvez réessayer ou privilégier un contact téléphonique.",
    },
  },
  seo: {
    defaultTitle: "Ambulances & transport sanitaire – Site de démonstration",
    defaultDescription:
      "Site vitrine de démonstration pour une société d’ambulances et de transport sanitaire non urgent. Présentation des services, zones d’intervention, procédures de prise en charge et formulaire de demande de transport.",
    keywords: [
      "ambulances",
      "transport sanitaire",
      "VSL",
      "transport assis professionnalisé",
      "transport médical non urgent",
      "ambulance Ville exemple",
      "VSL Ville exemple",
      "transport sanitaire Ville exemple",
    ],
  },
};