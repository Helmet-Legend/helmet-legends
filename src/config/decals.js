// Importation de ton image depuis le dossier assets
import bigfootImg from "../assets/bigfoot-quist.png";
import luftNSImg from "../assets/LUFT-NSM42.png";
import etHeerImg from "../assets/et-heer-decal.webp";
import quistHeerImg from "../assets/quist-heer-decal.webp";
import quistTricoloreImg from "../assets/quist-tricolore-decal.webp";
import quistSSImg from "../assets/quist-ss-decal.webp";
import etSSImg from "../assets/et-ss-decal.webp";
import etKMImg from "../assets/et-km-decal.webp";
import quistKMImg from "../assets/quist-km-decal.webp";
import luftDroptailImg from "../assets/luft-droptail-decal.webp";
import nsLuftImg from "../assets/ns-luft-decal.webp";
import etPartiImg from "../assets/et-parti-decal.webp";

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
  {
    id: "quist-km",
    name: "Quist - Aigle Kriegsmarine",
    img: quistKMImg,
    description:
      "Insigne Kriegsmarine authentique de l'usine Quist, aigle doré sur fond noir.",
  },
  {
    id: "luft-droptail",
    name: "Luftwaffe - Aigle 'Droptail'",
    img: luftDroptailImg,
    description:
      "Insigne Luftwaffe authentique, aigle aux ailes déployées type 'Droptail'.",
  },
  {
    id: "ns-luft",
    name: "NS - Aigle Luftwaffe",
    img: nsLuftImg,
    description:
      "Insigne Luftwaffe authentique de l'usine NS (Esslingen), aigle doré tenant la croix gammée.",
  },
  {
    id: "et-parti",
    name: "ET - Insigne du Parti (NSDAP)",
    img: etPartiImg,
    description:
      "Insigne du Parti authentique de l'usine ET (Thale), écusson rouge, croix gammée noire sur cercle clair.",
  },
];
