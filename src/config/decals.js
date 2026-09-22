// Importation de ton image depuis le dossier assets
import bigfootImg from "../assets/bigfoot-quist.png";
import luftNSImg from "../assets/LUFT-NSM42.png";
import etHeerImg from "../assets/et-heer-decal.webp";
import quistHeerImg from "../assets/quist-heer-decal.webp";
import quistTricoloreImg from "../assets/quist-tricolore-decal.webp";
import quistSSImg from "../assets/quist-ss-decal.webp";
import etSSImg from "../assets/et-ss-decal.webp";
import etKMImg from "../assets/et-km-decal.webp";

export const AUTHENTIC_DECALS = [
  {
    id: "quist-bigfoot",
    name: "Quist - Bigfoot Eagle (Original)",
    img: bigfootImg,
    description:
      "Insigne authentique de l'usine Quist, design 'Bigfoot' aux pattes épaisses.",
  },
  {
    id: "LUFT-NSM42",
    name: "NS - Aigle Standard M42",
    img: luftNSImg,
    description: "Modèle de référence pour l'usine NS sur M42.",
  },
  {
    id: "et-heer-decal",
    name: "ET - Aigle Heer (Thale)",
    img: etHeerImg,
    description:
      "Insigne Heer authentique de l'usine ET (Thale), décal doré sur fond noir.",
  },
  {
    id: "quist-heer-decal",
    name: "Quist - Aigle Heer",
    img: quistHeerImg,
    description:
      "Insigne Heer authentique de l'usine Quist, aigle blanc sur fond noir.",
  },
  {
    id: "quist-tricolore",
    name: "Quist - Écusson tricolore",
    img: quistTricoloreImg,
    description:
      "Écusson tricolore (noir/blanc/rouge) authentique de l'usine Quist.",
  },
  {
    id: "quist-ss",
    name: "Quist - Runes SS",
    img: quistSSImg,
    description:
      "Insigne Waffen-SS authentique de l'usine Quist, runes SS argentées sur fond clair.",
  },
  {
    id: "et-ss",
    name: "ET - Runes SS",
    img: etSSImg,
    description:
      "Insigne Waffen-SS authentique de l'usine ET (Thale), runes SS sur fond doré/beige.",
  },
  {
    id: "et-km",
    name: "ET - Aigle Kriegsmarine",
    img: etKMImg,
    description:
      "Insigne Kriegsmarine authentique de l'usine ET (Thale), aigle doré sur fond noir.",
  },
];
