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
      "Secteur de Saint-Crépin-Ibouvillers et des communes voisines, dans le département de l'Oise (60), à proximité de Méru, Neuilly-en-Thelle, Chambly et du sud du département.",
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
        slug: "autres-communes-oise-sud",
        label: "Autres communes du sud de l'Oise (60) – à préciser avec la société",
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
      "Carlier Ambulances Les Sablons assure des transports sanitaires non urgents sur prescription médicale à Saint-Crépin-Ibouvillers (Oise 60) et dans les communes voisines (Méru, Neuilly-en-Thelle, Chambly, Hénonville…) : ambulances, VSL et transport assis professionnalisé, pour consultations, dialyse, hôpital de jour, rééducation et transferts entre établissements.",
    keywords: [
      "Carlier Ambulances Les Sablons",
      "ambulances Saint-Crépin-Ibouvillers",
      "transport sanitaire Saint-Crépin-Ibouvillers",
      "VSL Saint-Crépin-Ibouvillers",
      "transport assis professionnalisé Saint-Crépin-Ibouvillers",
      "ambulance Oise 60",
      "transport sanitaire Oise 60",
      "ambulance Méru",
      "transport sanitaire Méru",
      "ambulance Neuilly-en-Thelle",
      "transport sanitaire Neuilly-en-Thelle",
      "ambulance Chambly",
      "transport sanitaire Chambly",
    ],
  },
};