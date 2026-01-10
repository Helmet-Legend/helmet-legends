// src/data/lotDatabase.js
export const lotDatabase = [
  // ET / ckl (Eisenhüttenwerke Thale)
  {
    usine: "ET",
    lotStart: 1,
    lotEnd: 2800,
    modele: "M35",
    armee: { fr: "Heer/LW/SS", en: "Heer/LW/SS" },
    note: {
      fr: "Production initiale 1935-36 (Acier Molybdène). Peinture Apple Green lisse. Double décal systématique.",
      en: "Initial production 1935-36 (Molybdenum steel). Smooth Apple Green paint. Standard double decals.",
    },
  },
  {
    usine: "ET",
    lotStart: 5101,
    lotEnd: 15000,
    modele: "M40",
    armee: { fr: "Toutes", en: "All branches" },
    note: {
      fr: "Production massive M40. Évents emboutis. Peinture Feldgrau mat/granuleux.",
      en: "Mass M40 production. Stamped vents. Matte/textured Feldgrau paint.",
    },
  },
  {
    usine: "ckl",
    lotStart: 1,
    lotEnd: 2000,
    modele: "M42",
    armee: { fr: "Heer/SS/LW", en: "Heer/SS/LW" },
    note: {
      fr: "Début du code ckl. Bord brut évasé. Inscription souvent en nuquière. Simple décal.",
      en: "Start of ckl code. Flared raw edge. Marking often in rear skirt. Single decal.",
    },
  },
  // Fallschirmjäger M38
  {
    usine: "ET",
    lotStart: 719,
    lotEnd: 720,
    modele: "M38",
    armee: { fr: "Luftwaffe", en: "Luftwaffe" },
    note: {
      fr: "M38 Fallschirmjäger précoce. Boulons acier ventilés. Peinture lisse.",
      en: "Early M38 paratrooper. Vented steel bolts. Smooth paint.",
    },
  },
  // Q (Quist)
  {
    usine: "Q",
    lotStart: 1,
    lotEnd: 1200,
    modele: "M35",
    armee: { fr: "Heer/LW/SS", en: "Heer/LW/SS" },
    note: {
      fr: "Qualité Quist supérieure. Aigle 'Bigfoot' exclusif sur Heer.",
      en: "Superior Quist quality. Exclusive 'Bigfoot' eagle on Heer models.",
    },
  },
  {
    usine: "Q",
    lotStart: 2001,
    lotEnd: 4500,
    modele: "M40",
    armee: { fr: "Heer/KM/SS", en: "Heer/KM/SS" },
    note: {
      fr: "M40 Quist. KM identifiés avec relief 3D (Relief Rim).",
      en: "Quist M40. KM identified with 3D relief (Relief Rim).",
    },
  },
  // ... Ajoute le reste de tes lots ici sur le même modèle { fr: "...", en: "..." }
];
