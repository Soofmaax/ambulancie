import type { Metadata } from "next";
import { siteConfig } from "@data/site-config";

const brand = siteConfig.business.brandName;
const mainCity = siteConfig.zones.mainCity;

export const pageSeo = {
  home: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  } as Metadata,
  services: {
    title: `Services d'ambulances & transport sanitaire – ${brand}`,
    description:
      "Présentation détaillée des types de transports sanitaires proposés : ambulance, VSL (Véhicule Sanitaire Léger), transport assis professionnalisé et transports allongés non urgents.",
  } as Metadata,
  priseEnCharge: {
    title: `Prise en charge & organisation du transport – ${brand}`,
    description:
      "Étapes de prise en charge pour organiser un transport sanitaire non urgent : prise de contact, vérification de la prescription, choix du véhicule et déroulement du trajet.",
  } as Metadata,
  zones: {
    title: `Zones desservies – Ambulances & transport sanitaire autour de ${mainCity}`,
    description:
      "Liste des principales zones d'intervention pour les transports sanitaires : commune de référence et communes voisines. Possibilité d'étudier certains trajets plus éloignés sur demande.",
  } as Metadata,
  demandeTransport: {
    title: `Demande de transport sanitaire – ${brand}`,
    description:
      "Formulaire de demande de transport sanitaire non urgent : coordonnées, type de transport, date, départ et destination. Un membre de l'équipe vous recontacte pour finaliser l'organisation.",
  } as Metadata,
  contact: {
    title: `Contact – ${brand}`,
    description:
      "Coordonnées de la société d’ambulances (téléphone, e-mail, adresse) et formulaire de contact pour vos questions ou demandes d'informations complémentaires.",
  } as Metadata,
  mentionsLegales: {
    title: `Mentions légales – ${brand}`,
    description:
      "Mentions légales et informations réglementaires concernant le site vitrine de la société d’ambulances et de transport sanitaire.",
  } as Metadata,
  protectionDonnees: {
    title: `Protection des données personnelles – ${brand}`,
    description:
      "Informations sur la collecte, l'utilisation et la conservation des données personnelles dans le cadre du site vitrine et des formulaires de contact / demande de transport.",
  } as Metadata,
  localAmbulanceVilleExemple: {
    title: `Ambulances à Ville exemple – Transport sanitaire non urgent`,
    description:
      "Page locale de démonstration pour les services d’ambulances à Ville exemple et dans les communes voisines, dans le cadre de transports sanitaires programmés.",
  } as Metadata,
  localTransportSanitaireVilleExemple: {
    title:
      "Transport sanitaire à Ville exemple – Ambulance, VSL & transport assis",
    description:
      "Page locale de démonstration présentant l'offre de transport sanitaire à Ville exemple : ambulance, VSL et transport assis professionnalisé pour les rendez-vous médicaux programmés.",
  } as Metadata,
  localVslVilleExemple: {
    title: "VSL à Ville exemple – Véhicule Sanitaire Léger",
    description:
      "Page locale de démonstration pour le transport assis en VSL à Ville exemple, sur prescription médicale de transport.",
  } as Metadata,
};