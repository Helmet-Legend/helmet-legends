// Service de filtrage "Veille Militaria" : applique les critères d'expertise
// du collectionneur à une liste d'annonces externes et met en évidence la
// meilleure opportunité du lot (rapport rareté/prix).
//
// Ce module ne récupère aucune annonce lui-même — aucune source d'annonces
// externe (eBay, Leboncoin, Delcampe...) n'existe dans ce projet. Il attend
// un tableau d'objets `listing` déjà constitué par l'appelant (import
// manuel, futur connecteur, etc.), avec la forme suivante :
//
//   {
//     id: string,
//     model: "M35" | "M40" | "M34" | "M42" | string,
//     manufacturer: string,          // ex: "ET", "EF", "Quist", "NS"...
//     seller: string,
//     location: string,
//     url: string,
//     price: number,                 // en euros
//     edgeType?: "replié" | "brut",
//     ventType?: "rapporté" | "frappé",
//     isReproduction?: boolean,
//     isPartsOnly?: boolean,         // pièce détachée
//     isBareShell?: boolean,         // coque nue, sans coiffe/jugulaire
//     decal?: {
//       type?: string,               // ex: "SS", "Polizei", "Heer"...
//       authentic?: boolean,
//       condition?: "bon" | "moyen" | "mauvais",
//     },
//   }
//
// Champs manquants = traités comme inconnus. Un champ inconnu ne fait
// jamais passer un critère strict par défaut (sécurité), mais une
// incohérence explicite (valeur fournie qui contredit la règle) est
// toujours rejetée.

const INCLUDED_MODELS = ["M35", "M40", "M34"];
const EXCLUDED_MODELS = ["M42"];
const BUDGET_MIN = 250;
const BUDGET_MAX = 800;
const PREMIUM_INSIGNIA = ["ss", "polizei", "feuerschutzpolizei"];

// Codes fabricants couverts par DATABASE_ULTIME_NORMALISEE.json (les "cinq
// géants" + variantes). Le M34 Polizei n'est pas couvert par cette base
// (fabrication différente des casques en acier M35/M40/M42) : son
// authenticité ne peut pas être croisée ici, seulement déclarée en entrée.
const MANUFACTURER_ALIASES = { quist: "Q" };

function normalizeManufacturer(code) {
  if (!code) return null;
  const lower = code.trim().toLowerCase();
  return (MANUFACTURER_ALIASES[lower] || code.trim()).toUpperCase();
}

/**
 * Construit un index { "MODEL|MANUFACTURER": count } à partir de
 * DATABASE_ULTIME_NORMALISEE.json, utilisé pour valider qu'un couple
 * modèle/fabricant est documenté, et pour estimer une rareté relative.
 */
export function buildReferenceIndex(referenceDatabase) {
  const index = new Map();
  for (const entry of referenceDatabase || []) {
    if (!entry.model || !entry.manufacturer) continue;
    const key = `${entry.model}|${entry.manufacturer.toUpperCase()}`;
    index.set(key, (index.get(key) || 0) + 1);
  }
  return index;
}

function checkConstruction(listing, reasons) {
  if (listing.model === "M34") return true; // règles repli/évent non applicables

  if (listing.edgeType && listing.edgeType !== "replié") {
    reasons.push(
      `Bord "${listing.edgeType}" incompatible avec un ${listing.model} (bord replié attendu).`
    );
    return false;
  }

  const expectedVent = listing.model === "M35" ? "rapporté" : "frappé";
  if (listing.ventType && listing.ventType !== expectedVent) {
    reasons.push(
      `Évent "${listing.ventType}" incompatible avec un ${listing.model} (évent ${expectedVent} attendu).`
    );
    return false;
  }

  return true;
}

function isPremiumInsignia(decal) {
  const type = decal?.type?.trim().toLowerCase();
  return !!type && PREMIUM_INSIGNIA.includes(type);
}

/**
 * Applique les critères stricts d'expertise à une liste d'annonces.
 * Retourne un tableau d'évaluations (une par annonce), chacune indiquant
 * si l'annonce passe le filtre, pourquoi (le cas échéant), et un score
 * de rareté/valeur utilisé ensuite par analyzeBestOpportunity().
 */
export function filterHelmetListings(listings, referenceDatabase = []) {
  const referenceIndex = buildReferenceIndex(referenceDatabase);

  return (listings || []).map((listing) => {
    const reasons = [];
    let passed = true;

    // 1. Inclusion stricte des modèles
    if (!INCLUDED_MODELS.includes(listing.model)) {
      passed = false;
      reasons.push(
        EXCLUDED_MODELS.includes(listing.model)
          ? `Modèle ${listing.model} explicitement exclu (bord brut).`
          : `Modèle "${listing.model || "inconnu"}" hors périmètre (M35, M40, M34 uniquement).`
      );
    }

    // 2. Exclusion catégorique : copies, reproductions, pièces détachées, coques nues
    if (listing.isReproduction) {
      passed = false;
      reasons.push("Reproduction / copie déclarée.");
    }
    if (listing.isPartsOnly) {
      passed = false;
      reasons.push("Pièce détachée, pas un casque complet.");
    }
    if (listing.isBareShell) {
      passed = false;
      reasons.push("Coque nue, sans coiffe ni jugulaire.");
    }

    // 3. Cohérence de construction (bords / évents) pour M35 et M40
    if (passed && !checkConstruction(listing, reasons)) {
      passed = false;
    }

    // 4. Authenticité des décals
    const decal = listing.decal || {};
    if (!decal.authentic) {
      passed = false;
      reasons.push("Décal non déclaré authentique.");
    } else if (decal.condition === "mauvais") {
      passed = false;
      reasons.push("Décal authentique mais en mauvais état.");
    }

    const manufacturer = normalizeManufacturer(listing.manufacturer);
    const refKey = manufacturer ? `${listing.model}|${manufacturer}` : null;
    const refCount = refKey ? referenceIndex.get(refKey) || 0 : 0;
    const isDocumentedCombo = listing.model === "M34" ? null : refCount > 0;
    if (isDocumentedCombo === false) {
      reasons.push(
        `Combinaison ${listing.model}/${listing.manufacturer || "?"} absente de la base de référence — à vérifier manuellement.`
      );
      // Avertissement, pas un rejet automatique : la base ne couvre pas
      // tous les fabricants confidentiels.
    }

    // 5. Filtre budgétaire, avec dépassement autorisé pour insigne SS/Polizei original
    const premium = decal.authentic && isPremiumInsignia(decal);
    const price = typeof listing.price === "number" ? listing.price : null;
    if (price === null) {
      passed = false;
      reasons.push("Prix non renseigné.");
    } else {
      if (price < BUDGET_MIN) {
        passed = false;
        reasons.push(`Prix (${price} €) sous le plancher de ${BUDGET_MIN} €.`);
      }
      if (price > BUDGET_MAX && !premium) {
        passed = false;
        reasons.push(
          `Prix (${price} €) au-delà de ${BUDGET_MAX} € sans insigne SS/Polizei justifiant le dépassement.`
        );
      }
    }

    // Score de rareté : combinaison rare dans la base + insigne premium,
    // utilisé seulement pour classer les annonces qui passent le filtre.
    const rarityScore =
      (refCount > 0 ? Math.max(1, 50 - refCount / 100) : 10) + (premium ? 15 : 0);
    const valueScore = passed && price ? rarityScore / price : 0;

    return {
      listing,
      passed,
      reasons,
      rarityScore: Math.round(rarityScore * 10) / 10,
      valueScore: Math.round(valueScore * 1000) / 1000,
      referenceCount: refCount,
    };
  });
}

/**
 * Génère une courte analyse textuelle (FR) mettant en évidence la
 * meilleure opportunité parmi les évaluations retournées par
 * filterHelmetListings() — celle avec le meilleur rapport rareté/prix
 * parmi les annonces qui passent le filtre.
 */
export function analyzeBestOpportunity(evaluations) {
  const passing = (evaluations || []).filter((e) => e.passed);
  if (passing.length === 0) {
    return "Aucune annonce ne répond actuellement aux critères stricts de la veille.";
  }

  const best = passing.reduce((top, e) => (e.valueScore > top.valueScore ? e : top));
  const { listing, rarityScore, referenceCount } = best;

  const rarityNote =
    referenceCount > 0
      ? `seulement ${referenceCount} entrée(s) de ce type référencées dans la base`
      : listing.model === "M34"
      ? "modèle M34 Polizei, hors base de référence steel-shell"
      : "combinaison non documentée dans la base, rareté potentiellement élevée";

  const insigniaNote = isPremiumInsignia(listing.decal)
    ? ` et porte un insigne ${listing.decal.type} recherché`
    : "";

  return (
    `Meilleure opportunité : ${listing.model} ${listing.manufacturer || ""} à ${listing.price} € ` +
    `chez ${listing.seller || "vendeur non précisé"}${
      listing.location ? ` (${listing.location})` : ""
    } — score de rareté ${rarityScore}/65 (${rarityNote})${insigniaNote}.`
  );
}
