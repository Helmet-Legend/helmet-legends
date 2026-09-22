// Importation de ton image depuis le dossier assets
import bigfootImg from "../assets/bigfoot-quist.png";
import luftNSImg from "../assets/LUFT-NSM42.png";
import etHeerImg from "../assets/et-heer-decal.webp";

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
];
