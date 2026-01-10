// src/data/lotDatabase.js - Version Master "Big Data" Enrichie
export const lotDatabase = [
  // ==========================================
  // ET / ckl (Eisenhüttenwerke Thale)
  // ==========================================
  {
    usine: "ET",
    lotStart: 1,
    lotEnd: 2800,
    modele: "M35",
    armee: "Heer/LW/SS",
    note: "Production initiale 1935-36 (Acier Molybdène). Bord roulé, évents rapportés. Peinture Apple Green lisse. Double décal systématique.",
  },
  {
    usine: "ET",
    lotStart: 2801,
    lotEnd: 4900,
    modele: "M35",
    armee: "Toutes",
    note: "M35 standard. Transition cerclage alu simple vers lot 3800. Profil de coque 'Standard'.",
  },
  {
    usine: "ET",
    lotStart: 4901,
    lotEnd: 5100,
    modele: "M35/M40",
    armee: "Heer/SS",
    note: "Lots de transition (Passage Acier Molybdène -> Manganèse). Décret 21 mars 1940 : suppression du tricolore.",
  },
  {
    usine: "ET",
    lotStart: 5101,
    lotEnd: 15000,
    modele: "M40",
    armee: "Toutes",
    note: "Production massive M40. Évents emboutis. Peinture Feldgrau mat/granuleux.",
  },
  {
    usine: "ckl",
    lotStart: 1,
    lotEnd: 2000,
    modele: "M42",
    armee: "Heer/SS/LW",
    note: "Début du code ckl. Bord brut évasé. Inscription souvent en nuquière. Simple décal.",
  },
  {
    usine: "ckl",
    lotStart: 4291,
    lotEnd: 6000,
    modele: "M42",
    armee: "Heer/LW",
    note: "Lots post-octobre 1943. 'No Decal' (Insignes supprimés). Finitions rudes de fin de guerre.",
  },

  // Fallschirmjäger (Parachutistes) - Spécificité ET uniquement
  {
    usine: "ET",
    lotStart: 719,
    lotEnd: 720,
    modele: "M38",
    armee: "Luftwaffe",
    note: "M38 Fallschirmjäger précoce. Boulons acier ventilés. Peinture lisse.",
  },
  {
    usine: "ET",
    lotStart: 4461,
    lotEnd: 5059,
    modele: "M38",
    armee: "Luftwaffe",
    note: "M38 tardif (1944). Boulons alu non ventilés. Camouflages Normandie fréquents.",
  },

  // ==========================================
  // Q (F.W. Quist)
  // ==========================================
  {
    usine: "Q",
    lotStart: 1,
    lotEnd: 1200,
    modele: "M35",
    armee: "Heer/LW/SS",
    note: "Qualité Quist supérieure. Aigle 'Bigfoot' exclusif sur Heer. Double décal systématique.",
  },
  {
    usine: "Q",
    lotStart: 2001,
    lotEnd: 4500,
    modele: "M40",
    armee: "Heer/KM/SS",
    note: "M40 Quist. KM identifiés avec relief multi-couches (Rim 3D) visible en IR.",
  },
  {
    usine: "Q",
    lotStart: 5174,
    lotEnd: 5175,
    modele: "M35",
    taille: 64,
    armee: "Luftwaffe",
    note: "Lot spécifique Luftwaffe taille 64. Variante de décal 'Snake Leg'.",
  },

  // ==========================================
  // SE / hkp (Sächsische Emaillierwerke)
  // ==========================================
  {
    usine: "SE",
    lotStart: 1,
    lotEnd: 1000,
    modele: "M35/M40",
    armee: "Heer/LW/Polizei",
    note: "Transition SE. Profil de jupe arrière très évasé, particulièrement sur grandes tailles.",
  },
  {
    usine: "SE",
    lotStart: 4789,
    lotEnd: 4858,
    modele: "M35",
    taille: 68,
    armee: "Kriegsmarine",
    note: "RARE : KM spécifique produit par SE. Structure multi-couches épaisse confirmée par analyse IR.",
  },
  {
    usine: "hkp",
    lotStart: 2000,
    lotEnd: 8000,
    modele: "M42",
    armee: "Heer/LW",
    note: "Code hkp (tardif). Bords bruts, absence d'insignes (No decal). Coque simplifiée.",
  },

  // ==========================================
  // EF / FS (Emaillierwerke Fulda)
  // ==========================================
  {
    usine: "EF",
    lotStart: 1,
    lotEnd: 937,
    modele: "M35",
    armee: "Heer/KM",
    note: "Profil de coque EF plus haut. Acier Manganèse. Peinture mate rugueuse sur lots tardifs.",
  },
  {
    usine: "EF",
    lotStart: 2514,
    lotEnd: 2585,
    modele: "M42",
    armee: "Polizei",
    note: "M42 Police. Double décal souvent observé malgré la date tardive. Cuir de porc granuleux.",
  },
  {
    usine: "EF",
    lotStart: 4784,
    lotEnd: 11000,
    modele: "M42",
    armee: "Heer/SS",
    note: "Lots massifs fin de guerre. Suppression des insignes. Finition rude (Rough texture).",
  },

  // ==========================================
  // NS (Nickelwerke Schwerte)
  // ==========================================
  {
    usine: "NS",
    lotStart: 1,
    lotEnd: 1500,
    modele: "M35",
    armee: "Heer/LW",
    note: "Profil NS : Visière très pointue et courte. Peinture Feldgrau semi-brillante.",
  },
  {
    usine: "NS",
    lotStart: 1501,
    lotEnd: 4000,
    modele: "M40",
    armee: "Heer/SS",
    note: "Lots M40 massifs. Nombreux modèles SS SD identifiés. Usure de peinture souvent localisée sur les reliefs.",
  },
  {
    usine: "NS",
    lotStart: 3272,
    lotEnd: 3300,
    taille: 64,
    modele: "M42",
    armee: "Heer/LW",
    note: "M42 NS taille 64. Simple décal tardif observé (Exception terrain).",
  },
];
