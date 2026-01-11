import React, { useState } from "react";
// --- ÉTAPE 1 : IMPORT DE L'IMAGE POUR LA COHÉRENCE ---
import monFondExpert from "../assets/helmet-bg.png";

import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Shield,
  Settings,
  Droplets,
  Ruler,
  AlertCircle,
  HardHat,
  Search,
  ArrowLeft,
  History,
  Camera,
  Info,
  AlertTriangle,
  Wind,
  Library,
  ExternalLink,
  Cpu,
  Target,
  ShieldCheck,
} from "lucide-react";

const Handbook = ({ setScreen, lang }) => {
  const [openSection, setOpenSection] = useState(null);
  const isFr = lang === "fr";

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "shells",
      title: isFr
        ? "I. Modèles & Métallurgie (1935-1945)"
        : "I. Models & Metallurgy (1935-1945)",
      icon: <HardHat size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-amber-200/70 italic text-xs border-b border-amber-900/30 pb-2">
            {isFr
              ? "Évolution de l'artisanat vers l'automatisation. Dureté Rockwell C 49-54."
              : "Evolution from craftsmanship to automation. Rockwell C hardness 49-54."}
          </p>

          <div className="grid gap-4">
            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                {isFr ? "M35 (L'Excellence)" : "M35 (The Excellence)"}
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                {isFr ? "Acier au Molybdène" : "Molybdenum Steel"}
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  •{" "}
                  <span className="text-white font-bold">
                    {isFr ? "Bord :" : "Edge:"}
                  </span>{" "}
                  {isFr
                    ? "Roulé à la machine (replié vers l'intérieur)."
                    : "Machine-rolled (folded inwards)."}
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold">
                    {isFr ? "Aérations :" : "Vents:"}
                  </span>{" "}
                  {isFr
                    ? "Œillets rapportés (bushings) pressés mécaniquement."
                    : "Separate bushings mechanically pressed in."}
                </li>
              </ul>
              {/* AJOUT : DÉTAILS ALLIAGES ET QUIST */}
              <div className="mt-3 pt-3 border-t border-amber-900/20 text-[10px] space-y-1 text-amber-100/60">
                <p>
                  •{" "}
                  <span className="text-white font-bold">
                    {isFr ? "Alliage :" : "Alloy:"}
                  </span>{" "}
                  {isFr
                    ? "Acier Chrome-Nickel-Manganèse. Emboutissage en plusieurs étapes avec recuit."
                    : "Chrome-Nickel-Manganese steel. Multi-stage stamping with annealing."}
                </p>
                <p>
                  •{" "}
                  <span className="text-white font-bold">
                    {isFr
                      ? "Spécificité Quist (Q) :"
                      : "Quist Specificity (Q):"}
                  </span>{" "}
                  {isFr
                    ? "Coque plus épaisse de 0.1mm à 0.2mm, augmentant la robustesse et le poids."
                    : "Shell 0.1mm to 0.2mm thicker, increasing robustness and weight."}
                </p>
                <p>
                  •{" "}
                  <span className="text-white font-bold">
                    {isFr ? "Tailles Géantes :" : "Giant Sizes:"}
                  </span>{" "}
                  {isFr
                    ? "Seule l'usine ET (Thale) a produit des tailles 70, 72 et 74 (Rarissimes)."
                    : "Only the ET (Thale) factory produced sizes 70, 72, and 74 (Extremely rare)."}
                </p>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                {isFr
                  ? "M40 & M42 (Simplification)"
                  : "M40 & M42 (Simplification)"}
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                {isFr
                  ? "Acier au Manganèse-Silicium"
                  : "Manganese-Silicon Steel"}
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold">M40 :</span>{" "}
                  {isFr
                    ? "Bord roulé, mais aérations"
                    : "Rolled edge, but vents"}{" "}
                  <span className="text-amber-500 font-bold underline">
                    {isFr ? "embouties" : "stamped"}
                  </span>{" "}
                  {isFr ? "directement." : "directly."}
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold">M42 (Août 42) :</span>{" "}
                  {isFr ? "Bord" : "Edge"}{" "}
                  <span className="text-amber-500 font-bold uppercase underline">
                    {isFr ? "brut / tranchant" : "raw / flared"}
                  </span>{" "}
                  {isFr ? "(évasé)." : "(flared)."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "manufacturers",
      title: isFr
        ? "II. Usines & Profils Spécifiques"
        : "II. Factories & Specific Profiles",
      icon: <Search size={20} />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              {
                code: "ET / ckl",
                name: "Eisenhüttenwerke Thale",
                descFr:
                  "Seule usine produisant TOUS les modèles (M35 à M42). Profil standard.",
                descEn:
                  "Only factory producing ALL models (M35 to M42). Standard profile.",
              },
              {
                code: "Q",
                name: "F.W. Quist",
                descFr:
                  "Qualité supérieure. Refus de produire le M42 (Q continue le M40 jusqu'en 1945). Aigle 'Bigfoot'.",
                descEn:
                  "Superior quality. Refused to produce the M42 (Q continued M40 until 1945). 'Bigfoot' eagle.",
              },
              {
                code: "NS",
                name: "Nickelwerke Schwerte",
                descFr:
                  "Visière pointue ('Sharp profile'). Vents souvent plus petits.",
                descEn: "Pointed visor ('Sharp profile'). Vents often smaller.",
              },
              {
                code: "SE / hkp",
                name: "Sächsische Emaillierwerke",
                descFr:
                  "Jupe arrière très évasée (Flare) sur tailles 66+. KM rares identifiées.",
                descEn:
                  "Deep rear flare on sizes 66+. Rare KM examples identified.",
              },
              {
                code: "EF / FS",
                name: "Emaillierwerke Fulda",
                descFr:
                  "Profil de dôme plus haut. Fournisseur n°1 de la Polizei après 1942.",
                descEn:
                  "Higher dome profile. #1 provider for the Polizei after 1942.",
              },
            ].map((m) => (
              <div
                key={m.code}
                className="bg-black/40 p-3 rounded-lg border border-amber-900/30"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-amber-500 font-black text-sm italic">
                    {m.code}
                  </span>
                  <span className="text-[10px] text-white opacity-70 italic font-serif">
                    {m.name}
                  </span>
                </div>
                <p className="text-[11px] text-amber-100/80 leading-snug">
                  {isFr ? m.descFr : m.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "paratroopers",
      title: isFr
        ? "III. Casques Parachutistes (FJ)"
        : "III. Paratrooper Helmets (FJ)",
      icon: <Wind size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
            <h4 className="text-amber-500 font-black text-xs uppercase mb-2">
              M38 (ET Uniquement)
            </h4>
            <ul className="text-xs space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {isFr ? "Fixation :" : "Fixation:"}
                </span>{" "}
                {isFr
                  ? "4 boulons creux (ventilation) ou fendus (production tardive)."
                  : "4 hollow bolts (ventilation) or split bolts (late production)."}
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {isFr ? "Amortisseurs :" : "Pads:"}
                </span>{" "}
                {isFr
                  ? "Mousse jaune naturelle (précoce) ➔ Caoutchouc noir (synthétique dès 1939)."
                  : "Natural yellow foam (early) ➔ Black rubber (synthetic from 1939)."}
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {isFr ? "Harnais :" : "Harness:"}
                </span>{" "}
                {isFr
                  ? "Jugulaire 4 points en cuir de chèvre. Boutons pression"
                  : "4-point goatskin chinstrap. Snaps"}{" "}
                <span className="text-amber-500 underline italic">prym 4</span>.
              </li>
              <li>
                • <span className="text-white font-bold italic">Note :</span>{" "}
                {isFr
                  ? "Absence totale de visière pour éviter les torsions cervicales aux sauts."
                  : "Total absence of visor to prevent neck torsion during jumps."}
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "liners",
      title: isFr
        ? "IV. Système M31 & Intérieurs"
        : "IV. M31 Liner System & Interiors",
      icon: <Settings size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-3 rounded-lg border border-amber-900/20 shadow-md">
            <h4 className="text-amber-500 text-[11px] font-black uppercase mb-2 underline italic underline-offset-4">
              {isFr ? "Le Cerclage (Band)" : "The Band"}
            </h4>
            <p className="text-xs leading-loose">
              •{" "}
              <span className="text-white font-bold">
                {isFr ? "Pré-1940 :" : "Pre-1940:"}
              </span>{" "}
              {isFr
                ? "Aluminium (anneaux de jugulaire carrés)."
                : "Aluminum (square chinstrap rings)."}
              <br />•{" "}
              <span className="text-white font-bold">
                {isFr ? "Post-1940 :" : "Post-1940:"}
              </span>{" "}
              {isFr ? "Acier galvanisé (anneaux" : "Galvanized steel ("}{" "}
              <span className="text-amber-500 font-black italic">
                {isFr ? "RONDS" : "ROUND"}
              </span>
              ).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-black/40 p-2 rounded border border-amber-900/20 shadow-md">
              <span className="text-amber-500 font-bold uppercase italic block mb-1">
                {isFr ? "Cuirs & Sizing" : "Leather & Sizing"}
              </span>
              {isFr
                ? "Mouton (M35) / Porc (M42 -"
                : "Sheepskin (M35) / Pigskin (M42 -"}{" "}
              <span className="text-white font-bold underline">
                {isFr ? "pores par 3" : "3-pore pattern"}
              </span>
              ).
              <br />
              <span className="text-white">Note :</span>{" "}
              {isFr ? "8 languettes standard /" : "8 standard tongues /"}{" "}
              <span className="text-amber-500 font-bold underline">
                {isFr ? "9 languettes" : "9 tongues"}
              </span>{" "}
              {isFr ? "sur tailles 68/70." : "on sizes 68/70."}
            </div>
            <div className="bg-black/40 p-2 rounded border border-amber-900/20 shadow-md">
              <span className="text-amber-500 font-bold uppercase italic block mb-1">
                {isFr ? "Rivets (Pins)" : "Split Pins"}
              </span>
              {isFr
                ? "Laiton nickelé (pré-guerre) ➔ Acier galvanisé (1940+). Pattes pliées dans la longueur à l'arrière."
                : "Nickeled brass (pre-war) ➔ Galvanized steel (1940+). Legs folded lengthwise at the back."}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "decals",
      title: isFr
        ? "V. Expertise Approfondie des Insignes"
        : "V. In-Depth Decal Expertise",
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-5">
          <div className="flex gap-2 justify-center">
            <div className="bg-amber-600/10 p-1.5 rounded border border-amber-600/30 text-[9px] text-white font-black italic uppercase">
              {isFr
                ? "Décret 1940 : Fin Tricolore"
                : "1940 Decree: End of Tricolor"}
            </div>
            <div className="bg-amber-600/10 p-1.5 rounded border border-amber-600/30 text-[9px] text-white font-black italic uppercase">
              {isFr ? "Décret 1943 : Fin Décals" : "1943 Decree: End of Decals"}
            </div>
          </div>

          <div className="space-y-4">
            {/* HEER */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Heer : {isFr ? "Détails Macro" : "Macro Details"}
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Style ET :
                </span>{" "}
                {isFr ? "Point spécifique sur la" : "Specific dot on the"}{" "}
                <span className="text-amber-500 underline font-black">
                  {isFr
                    ? "griffe droite du pied droit"
                    : "right claw of the right foot"}
                </span>
                .
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Style Bigfoot (Quist) :
                </span>{" "}
                {isFr
                  ? "Serres massives et carrées. Tête de l'aigle plate."
                  : "Massive square claws. Flat eagle head."}
              </p>
            </div>

            {/* LUFTWAFFE */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Luftwaffe : {isFr ? "L'Aigle Volant" : "The Flying Eagle"}
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Droop Tail :
                </span>{" "}
                {isFr
                  ? "Queue tombante (Variante précoce sur M35)."
                  : "Dropping tail (Early M35 variant)."}
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Snake Leg :
                </span>{" "}
                {isFr
                  ? "Patte en zigzag/serpent (Standard sur M35/M40)."
                  : "Snake/zigzag leg (Standard on M35/M40)."}
              </p>
              <p className="text-[11px] mt-1 italic text-white/60">
                •{" "}
                {isFr
                  ? "Aigle toujours détouré, sans bouclier sur les modèles M40/M42."
                  : "Eagle always cutout, no shield on M40/M42 models."}
              </p>
            </div>

            {/* KRIEGSMARINE */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Kriegsmarine : Relief Rim
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Structure :
                </span>{" "}
                {isFr
                  ? "Deux couches d'encre (poudre d'or)."
                  : "Two layers of ink (gold powder)."}{" "}
                <span className="text-amber-500 font-black underline italic">
                  {isFr ? "Bord noir en relief" : "Raised black border"}
                </span>{" "}
                {isFr
                  ? "visible à la loupe x10."
                  : "visible under x10 magnification."}
              </p>
              {/* AJOUT : ADHÉSION ET ZAPON */}
              <p className="text-[10px] mt-2 italic text-amber-100/40">
                {isFr
                  ? "Note : Les décals originaux sont protégés par un vernis Zapon qui fusionne avec la peinture sur 80 ans, rendant le transfert indissociable du métal."
                  : "Note: Original decals are protected by Zapon varnish which fuses with the paint over 80 years, making the transfer inseparable from the metal."}
              </p>
            </div>

            {/* WAFFEN-SS */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Waffen-SS : {isFr ? "Paillettes d'Alu" : "Aluminum Flakes"}
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Composition :
                </span>{" "}
                {isFr
                  ? "Scintillement sous lampe LED. Runes alignées en bas (Type ET)."
                  : "Sparkling under LED light. Runes aligned at the bottom (ET Type)."}
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Type EF :
                </span>{" "}
                {isFr
                  ? "La rune de gauche frôle presque le bord noir de l'insigne."
                  : "The left rune nearly touches the black border of the decal."}
              </p>
            </div>

            <div className="p-3 bg-red-900/10 rounded-xl border border-red-900/30">
              <h4 className="text-red-500 font-black text-[10px] uppercase mb-1 flex items-center gap-1">
                <AlertTriangle size={14} />{" "}
                {isFr
                  ? "Unités Spéciales & Volontaires"
                  : "Special Units & Volunteers"}
              </h4>
              <ul className="text-[10px] space-y-1 italic text-amber-100/70">
                <li>
                  •{" "}
                  <span className="text-red-400 font-bold uppercase">
                    RAD :
                  </span>{" "}
                  {isFr
                    ? "Aigle debout sur une pelle. Insigne large et haut."
                    : "Eagle standing on a shovel. Wide and tall decal."}
                </li>
                <li>
                  •{" "}
                  <span className="text-red-400 font-bold uppercase">
                    Volontaires :
                  </span>{" "}
                  {isFr
                    ? "Ecussons nationaux (Azul/LVF) rarissimes. 99% de faux."
                    : "National shields (Azul/LVF) extremely rare. 99% fake."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "paint",
      title: isFr ? "VI. Peintures & Camouflages" : "VI. Paints & Camouflages",
      icon: <Droplets size={20} />,
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Heer/SS :
            </span>{" "}
            {isFr
              ? "Apple Green lisse (M35) ➔ Feldgrau mat/granuleux (M40/42)."
              : "Smooth Apple Green (M35) ➔ Matte/textured Feldgrau (M40/42)."}
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Luftwaffe :
            </span>{" "}
            {isFr
              ? "Blaugrau spécifique (Bleu-gris)."
              : "Specific Blaugrau (Blue-grey)."}
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Kriegsmarine :
            </span>{" "}
            {isFr
              ? "Shipboard grey (Naval - Gris d'acier)."
              : "Shipboard grey (Steel grey)."}
          </p>
          <div className="bg-amber-900/20 p-3 rounded border border-amber-900/40 mt-2 italic shadow-lg">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1 underline">
              {isFr ? "Techniques Terrain :" : "Field Techniques:"}
            </h4>
            {isFr
              ? "Ajout de sable, sciure ou copeaux de bois (Texture). Grillage (Chicken Wire) laissant des marques d'oxydation définitives sur l'acier."
              : "Addition of sand, sawdust or wood chips (Texture). Wire mesh (Chicken Wire) leaving permanent oxidation marks on the steel."}
          </div>
        </div>
      ),
    },
    {
      id: "checklist",
      title: isFr
        ? "VII. Checklist Finale d'Expertise"
        : "VII. Final Expertise Checklist",
      icon: <Camera size={20} />,
      content: (
        <div className="space-y-4 bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
          <div className="space-y-3">
            {[
              {
                tFr: "Alliage & Bords",
                tEn: "Alloy & Edges",
                dFr: "M42 = bords bruts tranchants. M35/40 = bords roulés parfaits.",
                dEn: "M42 = raw sharp edges. M35/40 = perfect rolled edges.",
              },
              {
                tFr: "Vernis Zapon",
                tEn: "Zapon Varnish",
                dFr: "Craquelé 'Crazing' organique obligatoire sur transferts à l'eau.",
                dEn: "Organic 'Crazing' mandatory on water-slide decals.",
              },
              {
                tFr: "Tampon de Dôme",
                tEn: "Dome Stamp",
                dFr: "Forme ovale 'Abgenommen'. Encre 'bue' par l'acier (poreuse).",
                dEn: "Oval 'Abgenommen' shape. Ink 'soaked' into the steel (porous).",
              },
              {
                tFr: "Logique Lot",
                tEn: "Lot Logic",
                dFr: "Lot tardif (>1943) = AUCUN décal d'usine. Coque M42 double décal = manipulation.",
                dEn: "Late lot (>1943) = NO factory decal. Double decal M42 shell = manipulation.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="bg-amber-600 text-black font-black px-1.5 rounded h-fit text-xs italic">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase italic underline underline-offset-2">
                    {isFr ? item.tFr : item.tEn}
                  </p>
                  <p className="text-[10px] text-amber-100/70 italic mt-0.5 leading-snug">
                    {isFr ? item.dFr : item.dEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "resources",
      title: isFr
        ? "VIII. Pour aller plus loin (Sources)"
        : "VIII. Further Reading (Sources)",
      icon: <Library size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-[11px] italic text-amber-200/60 leading-relaxed">
            {isFr
              ? "L'expertise est un apprentissage continu. Nous vous recommandons vivement ces sources qui ont permis la création de cette base de données."
              : "Expertise is continuous learning. We highly recommend these sources that enabled the creation of this database."}
          </p>

          <div className="grid gap-4">
            <div className="bg-black/40 p-4 rounded-xl border border-amber-900/30 shadow-md">
              <h4 className="text-amber-500 font-black text-xs uppercase mb-1">
                Jan M. Meland
              </h4>
              <p className="text-[11px] text-white/80">
                {isFr
                  ? "Livre : 'German Helmets 1916-1945'. La référence visuelle et technique la plus récente (2023)."
                  : "Book: 'German Helmets 1916-1945'. The most recent visual and technical reference (2023)."}
              </p>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-amber-900/30 shadow-md">
              <h4 className="text-amber-500 font-black text-xs uppercase mb-1">
                Brian Ice
              </h4>
              <p className="text-[11px] text-white/80">
                {isFr
                  ? "Base de données 'German Helmet Lot Numbers'. Le travail colossal de recensement des numéros de lots."
                  : "Database 'German Helmet Lot Numbers'. The colossal work of indexing lot numbers."}
              </p>
            </div>

            <a
              href="https://germanhelmetvault.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600/5 p-4 rounded-xl border border-amber-600/20 flex justify-between items-center hover:bg-amber-600/10 transition-all group"
            >
              <div>
                <h4 className="text-amber-500 font-black text-xs uppercase mb-1">
                  German Helmet Vault
                </h4>
                <p className="text-[11px] text-white/80">
                  {isFr
                    ? "Site d'Andrea : Études statistiques et visuelles de haute précision."
                    : "Andrea's Site: High-precision statistical and visual studies."}
                </p>
              </div>
              <ExternalLink
                size={18}
                className="text-amber-700 group-hover:text-amber-500 transition-colors"
              />
            </a>

            <div className="p-4 bg-black/20 rounded-xl border border-amber-900/20">
              <h4 className="text-amber-600 font-black text-[10px] uppercase mb-2">
                {isFr ? "Forums Recommandés" : "Recommended Forums"}
              </h4>
              <ul className="text-[10px] space-y-1 text-white/60">
                <li>• Wehrmacht-Awards Forum (WA)</li>
                <li>• German Helmet Walhalla (GHW2)</li>
                <li>• War Relics Forum</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ai_tech",
      title: isFr
        ? "IX. Assistance IA & Optique Macro"
        : "IX. AI Assistance & Macro Optics",
      icon: <Cpu size={20} />,
      content: (
        <div className="space-y-4">
          <p className="text-amber-200/70 italic text-xs border-b border-amber-900/30 pb-2">
            {isFr
              ? "Analyse biométrique des insignes par intelligence artificielle."
              : "Biometric analysis of decals using artificial intelligence."}
          </p>
          <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
            <ul className="text-xs space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {isFr ? "Banc d'Optique :" : "Optical Bench:"}
                </span>{" "}
                {isFr
                  ? "Normalisation automatique de la luminance et correction de la perspective pour une comparaison scientifique."
                  : "Automatic luminance normalization and perspective correction for scientific comparison."}
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {isFr ? "Vecteurs de Tracé :" : "Tracing Vectors:"}
                </span>{" "}
                {isFr
                  ? "Comparaison mathématique de la courbure des ailes et de l'épaisseur des traits (Précision : 0.2mm)."
                  : "Mathematical comparison of wing curvature and stroke thickness (Precision: 0.2mm)."}
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {isFr ? "Crazing Organique :" : "Organic Crazing:"}
                </span>{" "}
                {isFr
                  ? "Analyse de la structure des micro-craquelures du vernis Zapon pour détecter les vieillissements chimiques artificiels."
                  : "Analysis of Zapon varnish micro-crack structure to detect artificial chemical aging."}
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "m34_civil",
      title: isFr
        ? "X. Modèles Légers & Civiques (M34)"
        : "X. Lightweight & Civil Models (M34)",
      icon: <ShieldCheck size={20} />,
      content: (
        <div className="space-y-4">
          <p className="text-amber-200/70 italic text-xs border-b border-amber-900/30 pb-2">
            {isFr
              ? "Casques destinés à la Police, aux Pompiers et à la Défense Passive."
              : "Helmets intended for Police, Firefighters, and Civil Defense."}
          </p>
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
            <ul className="text-xs space-y-3">
              <li>
                •{" "}
                <span className="text-amber-500 font-bold uppercase">
                  {isFr ? "Évents 'Salière' :" : "Salt Shaker Vents:"}
                </span>{" "}
                {isFr
                  ? "2 groupes de 7 trous poinçonnés de chaque côté (caractéristique unique)."
                  : "2 groups of 7 punched holes on each side (unique characteristic)."}
              </li>
              <li>
                •{" "}
                <span className="text-amber-500 font-bold uppercase">
                  {isFr ? "Poids & Matières :" : "Weight & Materials:"}
                </span>{" "}
                {isFr
                  ? "Moyenne de 900g. Acier léger ou aluminium pour les modèles de parade."
                  : "Average of 900g. Lightweight steel or aluminum for parade models."}
              </li>
              <li>
                •{" "}
                <span className="text-amber-500 font-bold uppercase">
                  {isFr ? "Fixation :" : "Fixation:"}
                </span>{" "}
                {isFr
                  ? "Souvent montés avec 4 rivets au lieu de 3. Jugulaire simple ou à 2 points."
                  : "Often mounted with 4 rivets instead of 3. Simple or 2-point chinstrap."}
              </li>
              <li>
                •{" "}
                <span className="text-amber-500 font-bold uppercase">
                  {isFr ? "Usage :" : "Usage:"}
                </span>{" "}
                {isFr
                  ? "Feuerschutzpolizei (noir), Luftschutz (bleu), Croix-Rouge (blanc/gris)."
                  : "Feuerschutzpolizei (black), Luftschutz (blue), Red Cross (white/grey)."}
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative overflow-hidden">
      {/* --- IMAGE DE FOND COHÉRENTE (Floutée à 5px) --- */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.3) blur(5px)",
        }}
      ></div>

      {/* --- CONTENU --- */}
      <div className="relative z-10 p-6 pb-32 max-w-2xl mx-auto h-screen overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-sm bg-black/20 p-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <BookOpen className="text-amber-500" size={28} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              {isFr ? "Manuel Expert" : "Expert Handbook"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="flex items-center gap-1 px-4 py-1.5 bg-amber-900/40 rounded-full border border-amber-700/50 text-[10px] uppercase font-black active:scale-90 transition-transform shadow-lg"
          >
            <ArrowLeft size={14} /> {isFr ? "Retour" : "Back"}
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-2 border-amber-900/30 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md shadow-2xl"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 text-left active:bg-amber-900/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-amber-600">{section.icon}</span>
                  <span className="font-black uppercase text-sm tracking-widest">
                    {section.title}
                  </span>
                </div>
                {openSection === section.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {openSection === section.id && (
                <div className="p-6 pt-0 text-sm leading-relaxed border-t border-amber-900/20 animate-in slide-in-from-top-4 duration-500">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER TAILLES */}
        <div className="mt-10 p-5 bg-black/60 backdrop-blur-md rounded-2xl border border-amber-600/10 shadow-2xl">
          <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 mb-4 tracking-tighter underline underline-offset-4 decoration-amber-900 italic">
            <Ruler size={12} />{" "}
            {isFr
              ? "Correspondance Tailles Coque / Liner"
              : "Shell / Liner Size Correspondence"}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-bold text-center">
            {[
              isFr ? "Coque 60 ➔ 52-53" : "Shell 60 ➔ 52-53",
              isFr ? "Coque 62 ➔ 54-55" : "Shell 62 ➔ 54-55",
              isFr ? "Coque 64 ➔ 56-57" : "Shell 64 ➔ 56-57",
              isFr ? "Coque 66 ➔ 58-59" : "Shell 66 ➔ 58-59",
              isFr
                ? "Coque 68 ➔ 60-61 (9 lang.)"
                : "Shell 68 ➔ 60-61 (9 lang.)",
              isFr
                ? "Coque 70 ➔ 62-63 (9 lang.)"
                : "Shell 70 ➔ 62-63 (9 lang.)",
            ].map((t) => (
              <div
                key={t}
                className="bg-black/40 py-2 rounded-lg border border-amber-900/20 italic text-white/90 shadow-inner"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Handbook;
