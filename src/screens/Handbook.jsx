import React, { useState } from "react";
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
} from "lucide-react";

const Handbook = ({ setScreen }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "shells",
      title: "I. Modèles & Métallurgie (1916-1945)",
      icon: <HardHat size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-amber-200/70 italic text-xs border-b border-amber-900/30 pb-2">
            Évolution de l'artisanat vers l'automatisation. Dureté Rockwell C
            49-54.
          </p>

          <div className="grid gap-4">
            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                WW1 : M16 / M17 / M18
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                Acier au Chrome-Nickel (1.3 kg)
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold italic">Vents :</span>{" "}
                  Cornes saillantes pour Stirnpanzer (Plaque de dôme).
                </li>
                <li>
                  • <span className="text-white font-bold italic">M18 :</span>{" "}
                  Découpe d'oreille (Ear Cut-out) pour améliorer l'audition.
                </li>
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                M35 (L'Excellence)
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                Acier au Molybdène
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold">Bord :</span> Roulé à
                  la machine (replié vers l'intérieur).
                </li>
                <li>
                  • <span className="text-white font-bold">Aérations :</span>{" "}
                  Œillets rapportés (bushings) pressés mécaniquement.
                </li>
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                M40 & M42 (Simplification)
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                Acier au Manganèse-Silicium
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold">M40 :</span> Bord
                  roulé, mais aérations{" "}
                  <span className="text-amber-500 font-bold underline">
                    embouties
                  </span>{" "}
                  directement.
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold">M42 (Août 42) :</span>{" "}
                  Bord{" "}
                  <span className="text-amber-500 font-bold uppercase underline">
                    brut / tranchant
                  </span>{" "}
                  (évasé).
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "manufacturers",
      title: "II. Usines & Profils Spécifiques",
      icon: <Search size={20} />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              {
                code: "ET / ckl",
                name: "Eisenhüttenwerke Thale",
                desc: "Seule usine produisant TOUS les modèles (M16 à M42). Profil standard.",
              },
              {
                code: "Q",
                name: "F.W. Quist",
                desc: "Qualité supérieure. Refus de produire le M42 (Q continue le M40 jusqu'en 1945). Aigle 'Bigfoot'.",
              },
              {
                code: "NS",
                name: "Nickelwerke Schwerte",
                desc: "Visière pointue ('Sharp profile'). Vents souvent plus petits.",
              },
              {
                code: "SE / hkp",
                name: "Sächsische Emaillierwerke",
                desc: "Jupe arrière très évasée (Flare) sur tailles 66+. KM rares identifiées.",
              },
              {
                code: "EF / FS",
                name: "Emaillierwerke Fulda",
                desc: "Profil de dôme plus haut. Fournisseur n°1 de la Polizei après 1942.",
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
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "paratroopers",
      title: "III. Casques Parachutistes (M38)",
      icon: <Wind size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
            <h4 className="text-amber-500 font-black text-xs uppercase mb-2">
              M36 / M37 / M38 (ET Uniquement)
            </h4>
            <ul className="text-xs space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold italic">Fixation :</span>{" "}
                4 boulons creux (ventilation) ou fendus (production tardive).
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  Amortisseurs :
                </span>{" "}
                Mousse jaune naturelle (précoce) ➔ Caoutchouc noir (synthétique
                dès 1939).
              </li>
              <li>
                • <span className="text-white font-bold italic">Harnais :</span>{" "}
                Jugulaire 4 points en cuir de chèvre. Boutons pression{" "}
                <span className="text-amber-500 underline italic">prym 4</span>.
              </li>
              <li>
                • <span className="text-white font-bold italic">Note :</span>{" "}
                Absence totale de visière pour éviter les torsions cervicales
                aux sauts.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "liners",
      title: "IV. Système M31 & Fixations",
      icon: <Settings size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-3 rounded-lg border border-amber-900/20 shadow-md">
            <h4 className="text-amber-500 text-[11px] font-black uppercase mb-2 underline italic underline-offset-4">
              Le Cerclage (Band)
            </h4>
            <p className="text-xs leading-loose">
              • <span className="text-white font-bold">Pré-1940 :</span>{" "}
              Aluminium (anneaux de jugulaire carrés).
              <br />• <span className="text-white font-bold">
                Post-1940 :
              </span>{" "}
              Acier galvanisé (anneaux{" "}
              <span className="text-amber-500 font-black italic">RONDS</span>).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-black/40 p-2 rounded border border-amber-900/20 shadow-md">
              <span className="text-amber-500 font-bold uppercase italic block mb-1">
                Cuirs & Sizing
              </span>
              Mouton (M35) / Porc (M42 -{" "}
              <span className="text-white font-bold underline">
                pores par 3
              </span>
              ).
              <br />
              <span className="text-white">Note :</span> 8 languettes standard /{" "}
              <span className="text-amber-500 font-bold underline">
                9 languettes
              </span>{" "}
              sur tailles 68/70.
            </div>
            <div className="bg-black/40 p-2 rounded border border-amber-900/20 shadow-md">
              <span className="text-amber-500 font-bold uppercase italic block mb-1">
                Rivets (Pins)
              </span>
              Laiton nickelé (pré-guerre) ➔ Acier galvanisé (1940+). Pattes
              pliées dans la longueur à l'arrière.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "decals",
      title: "V. Expertise Approfondie des Insignes",
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-5">
          <div className="flex gap-2 justify-center">
            <div className="bg-amber-600/10 p-1.5 rounded border border-amber-600/30 text-[9px] text-white font-black italic uppercase">
              Décret 1940 : Fin Tricolore
            </div>
            <div className="bg-amber-600/10 p-1.5 rounded border border-amber-600/30 text-[9px] text-white font-black italic uppercase">
              Décret 1943 : Fin Décals
            </div>
          </div>

          <div className="space-y-4">
            {/* HEER */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Heer : Détails Macro
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Style ET :
                </span>{" "}
                Point spécifique sur la{" "}
                <span className="text-amber-500 underline font-black">
                  griffe droite du pied droit
                </span>
                .
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Style Bigfoot (Quist) :
                </span>{" "}
                Serres massives et carrées. Tête de l'aigle plate.
              </p>
            </div>

            {/* LUFTWAFFE */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Luftwaffe : L'Aigle Volant
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Droop Tail :
                </span>{" "}
                Queue tombante (Variante précoce sur M35).
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Snake Leg :
                </span>{" "}
                Patte en zigzag/serpent (Standard sur M35/M40).
              </p>
              <p className="text-[11px] mt-1 italic text-white/60">
                • Aigle toujours détouré, sans bouclier sur les modèles M40/M42.
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
                Deux couches d'encre (poudre d'or).{" "}
                <span className="text-amber-500 font-black underline italic">
                  Bord noir en relief
                </span>{" "}
                visible à la loupe x10.
              </p>
            </div>

            {/* WAFFEN-SS */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic underline-offset-4">
                Waffen-SS : Paillettes d'Alu
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Composition :
                </span>{" "}
                Scintillement sous lampe LED. Runes alignées en bas (Type ET).
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Type EF :
                </span>{" "}
                La rune de gauche frôle presque le bord noir de l'insigne.
              </p>
            </div>

            <div className="p-3 bg-red-900/10 rounded-xl border border-red-900/30">
              <h4 className="text-red-500 font-black text-[10px] uppercase mb-1 flex items-center gap-1">
                <AlertTriangle size={14} /> Unités Spéciales & Volontaires
              </h4>
              <ul className="text-[10px] space-y-1 italic text-amber-100/70">
                <li>
                  •{" "}
                  <span className="text-red-400 font-bold uppercase">
                    RAD :
                  </span>{" "}
                  Aigle debout sur une pelle. Insigne large et haut.
                </li>
                <li>
                  •{" "}
                  <span className="text-red-400 font-bold uppercase">
                    Volontaires :
                  </span>{" "}
                  Ecussons nationaux (Azul/LVF) rarissimes. 99% de faux.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "paint",
      title: "VI. Peintures & Camouflages",
      icon: <Droplets size={20} />,
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Heer/SS :
            </span>{" "}
            Apple Green lisse (M35) ➔ Feldgrau mat/granuleux (M40/42).
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Luftwaffe :
            </span>{" "}
            Blaugrau spécifique (Bleu-gris).
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Kriegsmarine :
            </span>{" "}
            Shipboard grey (Naval - Gris d'acier).
          </p>
          <div className="bg-amber-900/20 p-3 rounded border border-amber-900/40 mt-2 italic shadow-lg">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1 underline">
              Techniques Terrain :
            </h4>
            Ajout de sable, sciure ou copeaux de bois (Texture). Grillage
            (Chicken Wire) laissant des marques d'oxydation définitives sur
            l'acier.
          </div>
        </div>
      ),
    },
    {
      id: "checklist",
      title: "VII. Checklist Finale d'Expertise",
      icon: <Camera size={20} />,
      content: (
        <div className="space-y-4 bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
          <div className="space-y-3">
            {[
              {
                t: "Alliage & Bords",
                d: "M42 = bords bruts tranchants. M35/40 = bords roulés parfaits.",
              },
              {
                t: "Vernis Zapon",
                d: "Craquelé 'Crazing' organique obligatoire sur transferts à l'eau.",
              },
              {
                t: "Tampon de Dôme",
                d: "Forme ovale 'Abgenommen'. Encre 'bue' par l'acier (poreuse).",
              },
              {
                t: "Cohérence Lot",
                d: "Lot tardif (>1943) = AUCUN décal d'usine. Coque M42 double décal = manipulation.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="bg-amber-600 text-black font-black px-1.5 rounded h-fit text-xs italic">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase italic underline underline-offset-2">
                    {item.t}
                  </p>
                  <p className="text-[10px] text-amber-100/70 italic mt-0.5 leading-snug">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2822] text-[#d0c7a8] font-serif p-6 pb-32 shadow-inner">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 shadow-xl">
        <div className="flex items-center gap-3">
          <BookOpen className="text-amber-500" size={28} />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Manuel Expert
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="flex items-center gap-1 px-4 py-1.5 bg-amber-900/30 rounded-full border border-amber-700/50 text-[10px] uppercase font-black active:scale-90 transition-transform shadow-lg shadow-black/40"
        >
          <ArrowLeft size={14} /> Retour
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-2 border-amber-900/30 rounded-2xl overflow-hidden bg-[#1a1812] shadow-2xl"
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
      <div className="mt-10 p-5 bg-amber-600/5 rounded-2xl border border-amber-600/10 shadow-2xl">
        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 mb-4 tracking-tighter underline underline-offset-4 decoration-amber-900 italic">
          <Ruler size={12} /> Correspondance Tailles Coque / Liner
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-bold text-center">
          {[
            "Coque 60 ➔ 52-53",
            "Coque 62 ➔ 54-55",
            "Coque 64 ➔ 56-57",
            "Coque 66 ➔ 58-59",
            "Coque 68 ➔ 60-61 (9 lang.)",
            "Coque 70 ➔ 62-63 (9 lang.)",
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
  );
};

export default Handbook;
