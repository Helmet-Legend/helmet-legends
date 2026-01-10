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
} from "lucide-react";

const Handbook = ({ setScreen }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "shells",
      title: "I. Structure & Métallurgie des Coques",
      icon: <HardHat size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-amber-200/70 italic text-xs border-b border-amber-900/30 pb-2">
            La transition entre modèles répond à un besoin de simplification
            industrielle. Dureté standard : Rockwell C 49-54.
          </p>

          <div className="grid gap-4">
            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                <span className="bg-amber-600 text-black px-1 rounded text-xs">
                  M35
                </span>{" "}
                Modell 1935
              </h4>
              <p className="text-xs mt-2 italic text-white underline decoration-amber-700">
                Finition "Luxe" & Soignée
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold italic">Bord :</span>{" "}
                  Roulé (replié vers l'intérieur).
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold italic">
                    Aérations :
                  </span>{" "}
                  Œillets rapportés (bushings séparés) pressés.
                </li>
                <li>
                  • <span className="text-white font-bold italic">Acier :</span>{" "}
                  Alliage au <span className="text-amber-500">Molybdène</span>.
                </li>
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                <span className="bg-amber-600 text-black px-1 rounded text-xs">
                  M40
                </span>{" "}
                Modell 1940
              </h4>
              <p className="text-xs mt-2 italic text-white underline decoration-amber-700">
                Simplification de Guerre
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold italic">Bord :</span>{" "}
                  Toujours roulé (replié).
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold italic">
                    Aérations :
                  </span>{" "}
                  <span className="text-amber-500 font-bold underline">
                    Embouties
                  </span>{" "}
                  (frappées dans la tôle).
                </li>
                <li>
                  • <span className="text-white font-bold italic">Acier :</span>{" "}
                  Alliage au Manganèse-Silicium.
                </li>
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                <span className="bg-amber-600 text-black px-1 rounded text-xs">
                  M42
                </span>{" "}
                Modell 1942
              </h4>
              <p className="text-xs mt-2 italic text-white underline decoration-amber-700">
                Urgence & Production de Masse
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  •{" "}
                  <span className="text-white font-bold italic italic uppercase">
                    Bord : Brut / Évasé
                  </span>{" "}
                  (non roulé, tranchant).
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold italic">Aspect :</span>{" "}
                  Finition plus rude, qualité de tôle variable.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "manufacturers",
      title: "II. Constructeurs & Profils d'Usines",
      icon: <Search size={20} />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              {
                code: "ET / ckl",
                name: "Eisenhüttenwerke Thale",
                desc: "Le plus gros producteur. Profil 'équilibré'. Code ckl dès 1943.",
              },
              {
                code: "EF / FS",
                name: "Emaillierwerke Fulda",
                desc: "Profils parfois plus hauts. Finitions de fin de guerre rudes.",
              },
              {
                code: "Q",
                name: "F.W. Quist",
                desc: "Excellente qualité. Aigle exclusif 'Big Foot' aux serres massives.",
              },
              {
                code: "SE / hkp",
                name: "Sächsische Emaillierwerke",
                desc: "Jupe arrière très évasée (Flare) sur les grandes tailles.",
              },
              {
                code: "NS",
                name: "Nickelwerke Schwerte",
                desc: "Visière souvent plus pointue ('Sharp Profile').",
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
          <div className="bg-amber-900/10 p-3 rounded border border-amber-900/40">
            <h4 className="text-amber-500 text-[10px] font-black uppercase underline mb-1 italic">
              Numéros de Lot (Losnummern)
            </h4>
            <p className="text-[10px]">
              Situés en nuquière. Ils servent à corréler l'usine avec la période
              de production et le type d'insigne via les bases de données
              (German Helmet Vault).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "decals",
      title: "III. Expertise Approfondie des Insignes",
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-amber-600/20 p-2 rounded border border-amber-600/30 text-[9px] text-white font-bold text-center italic">
              21 MARS 1940 : Suppression du Tricolore
            </div>
            <div className="bg-amber-600/20 p-2 rounded border border-amber-600/30 text-[9px] text-white font-bold text-center italic">
              OCTOBRE 1943 : Fin des décals en usine
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-2 italic underline underline-offset-4">
                1. Heer (Armée de Terre)
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Aigle "Bigfoot" :
                </span>{" "}
                Serres massives et carrées. Présence{" "}
                <span className="text-amber-500">
                  exclusive sur coques Quist
                </span>
                .
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Type ET :
                </span>{" "}
                Aigle gracile, plumes détaillées, profil plat argent/blanc.
              </p>
              <p className="text-[11px] mt-1 italic opacity-70">
                • Recherchez le "Halo" de vernis protecteur (Zapon) de 1mm.
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-2 italic underline underline-offset-4">
                2. Kriegsmarine (Marine)
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Encre Poudre Dorée :
                </span>{" "}
                Scintillement métallique, peut s'oxyder en vert.
              </p>
              <p className="text-[11px] mt-1">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Structure Multi-couches :
                </span>{" "}
                <span className="text-amber-500 font-bold underline">
                  Relief Rim (3D)
                </span>{" "}
                visible à la loupe x10 ou à l'Infrarouge (IR).
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-2 italic underline underline-offset-4">
                3. Luftwaffe (Aviation)
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline">
                  Aigle volant détouré :
                </span>{" "}
                Sans écu (M40/42). Patterns : "Snake Leg" ou "Droop Tail"
                (précoce).
              </p>
              <p className="text-[11px] mt-1 opacity-70">
                L'Infrarouge confirme qu'ils sont souvent masqués par les
                camouflages bleus.
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-2 italic underline underline-offset-4">
                4. Waffen-SS
              </h4>
              <p className="text-[11px]">
                •{" "}
                <span className="text-amber-500 font-bold italic underline underline-offset-2">
                  Micro-paillettes d'alu :
                </span>{" "}
                Scintillement caractéristique sous lampe LED.
              </p>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline underline-offset-2 italic italic">
                  Runes :
                </span>{" "}
                Bordure noire inférieure parfaitement alignée (Type ET).
              </p>
              <p className="text-[11px]">
                •{" "}
                <span className="text-white font-bold italic underline underline-offset-2 italic italic">
                  Pocher :
                </span>{" "}
                Trame points (lithographie) typique des reconditionnés.
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-red-900/30">
              <h4 className="text-red-500 font-black text-[11px] uppercase mb-1 flex items-center gap-1">
                <AlertTriangle size={14} /> Volontaires Étrangers
              </h4>
              <p className="text-[11px] italic">
                Les écussons nationaux (LVF, Azul) sont{" "}
                <span className="text-white font-bold underline">
                  rarissimes
                </span>
                . La zone de falsification la plus active du marché.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "liners",
      title: "IV. Système M31, Cuirs & Jugulaires",
      icon: <Settings size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-3 rounded-lg border border-amber-900/20">
            <h4 className="text-amber-500 text-[11px] font-black uppercase mb-2 underline underline-offset-4">
              Le Cerclage (Band)
            </h4>
            <p className="text-xs">
              • <span className="text-white font-bold">Pré-1940 :</span>{" "}
              Aluminium (Simple puis renforcé). Anneaux carrés.
            </p>
            <p className="text-xs">
              • <span className="text-white font-bold">Post-1940 :</span> Acier
              galvanisé. Anneaux de jugulaire{" "}
              <span className="text-amber-500 font-bold">Ronds</span>.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-black/40 p-2 rounded border border-amber-900/20">
              <span className="text-amber-500 font-bold">Cuirs :</span> Porc (
              <span className="text-white underline font-bold italic">
                Pores par 3
              </span>
              ) ou Mouton. Cordon de serrage requis.
            </div>
            <div className="bg-black/40 p-2 rounded border border-amber-900/20">
              <span className="text-amber-500 font-bold">Jugulaire :</span> 13
              trous{" "}
              <span className="text-white underline font-bold italic">
                Oblongs
              </span>
              . Marquages RBNr dès fin 1942.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "paint",
      title: "V. Peintures & Camouflages Terrain",
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
            Blaugrau (Bleu-gris) spécifique.
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Kriegsmarine :
            </span>{" "}
            Souvent recouvert de gris naval (Shipboard grey).
          </p>
          <div className="bg-amber-900/20 p-3 rounded border border-amber-900/40 mt-2">
            <h4 className="text-amber-500 font-bold text-[10px] uppercase mb-1 underline">
              Techniques Terrain :
            </h4>
            <p>
              Ajouts de sable, sciure ou copeaux pour briser le reflet. Camo
              Normandie (3 tons), Hivernal (chaux). Grillage (Chicken Wire)
              laissant des traces d'oxydation sur l'acier.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "checklist",
      title: "VI. Checklist d'Examen Rapide",
      icon: <Camera size={20} />,
      content: (
        <div className="space-y-4 bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
          <div className="space-y-3">
            {[
              {
                t: "Métallurgie",
                d: "Coque M42 ? Bords bruts et vents emboutis impératifs.",
              },
              {
                t: "Authenticité Décal",
                d: "Crazing capillaire (finesse cheveu) + fluorescence UV Jaune/Vert.",
              },
              {
                t: "Tampon de Dôme",
                d: "Situé au centre interne. Encre 'bue' par l'acier, jamais trop nette.",
              },
              {
                t: "Cohérence Liner",
                d: "Usure du cuir cohérente avec l'acier. Rivets repliés une seule fois ?",
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
          <div className="p-2 bg-black/60 rounded border border-amber-500/20 text-center">
            <p className="text-[10px] text-amber-500 font-bold italic">
              "Un M42 avec double décal est, sauf exception rarissime, une
              manipulation post-guerre."
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2822] text-[#d0c7a8] font-serif p-6 pb-32">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-amber-500" size={28} />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter italic italic italic">
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
            className="border-2 border-amber-900/30 rounded-2xl overflow-hidden bg-[#1a1812] shadow-xl"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-5 text-left active:bg-amber-900/20 transition-colors"
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
              <div className="p-6 pt-0 text-sm leading-relaxed border-t border-amber-900/20 animate-in slide-in-from-top-2 duration-300">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER TAILLES */}
      <div className="mt-8 p-5 bg-amber-600/5 rounded-2xl border border-amber-600/10">
        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 mb-4 tracking-tighter italic italic italic underline underline-offset-4 decoration-amber-900">
          <Ruler size={12} /> Correspondance Tailles Coque / Liner
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-bold text-center">
          {[
            "Coque 60 ➔ 52-53",
            "Coque 62 ➔ 54-55",
            "Coque 64 ➔ 56-57",
            "Coque 66 ➔ 58-59",
            "Coque 68 ➔ 60-61",
            "Coque 70 ➔ 62-63",
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
