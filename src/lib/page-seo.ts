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
      "Présentation détaillée des types de transports sanitaires proposés, conformément aux prescriptions médicales de transport : ambulance, VSL (Véhicule Sanitaire Léger), transport assis professionnalisé et transports allongés non urgents.",
  } as Metadata,
  priseEnCharge: {
    title: `Prise en charge & organisation du transport – ${brand}`,
    description:
      "Étapes de prise en charge pour organiser un transport sanitaire non urgent sur prescription médicale : prise de contact, recueil des informations figurant sur la prescription, choix du véhicule et déroulement du trajet.",
  } as Metadata,
  zones: {
    title: `Zones desservies – Ambulances & transport sanitaire autour de ${mainCity} (Oise 60)`,
    description:
      "Présentation des principales zones d'intervention pour les transports sanitaires non urgents : Saint-Crépin-Ibouvillers, Méru, Neuilly-en-Thelle, Chambly et communes voisines dans le sud de l'Oise (60). Certains trajets plus éloignés peuvent être étudiés au cas par cas, en fonction des disponibilités.",
  } as Metadata,
  demandeTransport: {
    title: `Demande de transport sanitaire – ${brand}`,
    description:
      "Formulaire permettant de transmettre les informations nécessaires à l'étude d'une demande de transport sanitaire non urgent : coordonnées, type de transport, date, départ et destination. Un membre de l'équipe recontacte l'usager pour préciser les modalités d'organisation.",
  } as Metadata,
  contact: {
    title: `Contact – ${brand}`,
    description:
      "Coordonnées de la société d’ambulances (téléphone, e-mail, adresse) et formulaire de contact pour les questions relatives à l'organisation des transports sanitaires non urgents.",
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
    title:
      "Ambulances à Saint-Crépin-Ibouvillers (Oise 60) – Transport sanitaire non urgent",
    description:
      "Page locale de démonstration pour les services d’ambulances à Saint-Crépin-Ibouvillers (Oise 60) et dans les communes voisines (Méru, Neuilly-en-Thelle, Chambly…), dans le cadre de transports sanitaires programmés sur prescription médicale.",
  } as Metadata,
  localTransportSanitaireVilleExemple: {
    title:
      "Transport sanitaire à Saint-Crépin-Ibouvillers (Oise 60) – Ambulance, VSL & transport assis",
    description:
      "Page locale de démonstration présentant l'offre de transport sanitaire à Saint-Crépin-Ibouvillers (Oise 60) : ambulance, VSL et transport assis professionnalisé pour des rendez-vous médicaux programmés sur prescription.",
  } as Metadata,
  localVslVilleExemple: {
    title:
      "VSL à Saint-Crépin-Ibouvillers (Oise 60) – Véhicule Sanitaire Léger",
    description:
      "Page locale de démonstration pour le transport assis en VSL à Saint-Crépin-Ibouvillers (Oise 60) et dans les communes voisines, sur prescription médicale de transport pour des rendez-vous médicaux programmés.",
  } as Metadata,
  localAmbulanceMeru: {
    title: "Ambulances à Méru (Oise 60) – Transport sanitaire non urgent",
    description:
      "Page locale présentant l'offre d'ambulances à Méru (Oise 60) et dans les communes voisines pour des transports sanitaires non urgents programmés sur prescription médicale.",
  } as Metadata,
  localTransportSanitaireMeru: {
    title:
      "Transport sanitaire à Méru (Oise 60) – Ambulance, VSL & transport assis",
    description:
      "Page locale présentant les solutions de transport sanitaire à Méru (Oise 60) : ambulance, VSL et transport assis professionnalisé pour des rendez-vous médicaux programmés sur prescription.",
  } as Metadata,
  localVslMeru: {
    title: "VSL à Méru (Oise 60) – Véhicule Sanitaire Léger",
    description:
      "Page locale présentant le transport assis en VSL à Méru (Oise 60) et dans les communes voisines, sur prescription médicale de transport pour des rendez-vous médicaux programmés.",
  } as Metadata,
};