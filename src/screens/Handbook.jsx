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
} from "lucide-react";

const Handbook = ({ setScreen }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "shells",
      title: "I. Modèles & Métallurgie",
      icon: <HardHat size={20} />,
      content: (
        <div className="space-y-4">
          <p className="text-amber-200/70 italic text-xs">
            Dureté standard d'une coque authentique : Rockwell C 49-54.
          </p>
          <div className="border-l-2 border-amber-600 pl-4 space-y-4">
            <div>
              <h4 className="font-bold text-amber-500">M35 (1935-1940)</h4>
              <p className="text-sm">
                Acier au <span className="text-white">Molybdène</span>. Bords
                repliés. Évents d'aération rapportés (rivets creux "bushings").
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-500">M40 (1940-1942)</h4>
              <p className="text-sm">
                Acier au <span className="text-white">Manganèse-Silicium</span>.
                Évents frappés directement dans la masse. Bords repliés.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-500">M42 (1942-1945)</h4>
              <p className="text-sm">
                Acier Manganèse-Silicium.{" "}
                <span className="text-white font-bold underline">
                  Bords évasés bruts
                </span>{" "}
                (non repliés).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-500">
                M34 (Police/Pompiers)
              </h4>
              <p className="text-sm">
                Acier léger/Alu.{" "}
                <span className="text-white font-bold">
                  7 ou 15 petits trous
                </span>{" "}
                d'aération. Parfois avec cimier métallique.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "paint",
      title: "II. Peintures & Textures",
      icon: <Droplets size={20} />,
      content: (
        <div className="space-y-3">
          <ul className="list-disc ml-4 space-y-2 text-sm">
            <li>
              <span className="text-amber-500 font-bold">M35 :</span> Vert Pomme
              (Apfelgrün) ou Bleu-Gris (LW) lisse.
            </li>
            <li>
              <span className="text-amber-500 font-bold">M40 :</span> Feldgrau
              mat. Texture{" "}
              <span className="text-white font-bold">granuleuse</span> (oxyde
              d'alu/sable).
            </li>
            <li>
              <span className="text-amber-500 font-bold">M42 :</span> Gris
              Ardoise sombre, finition très rugueuse.
            </li>
            <li>
              <span className="text-amber-500 font-bold">Camouflages :</span>{" "}
              Normandie (3 tons), Hivernal (chaux), sciure de bois.
            </li>
            <li>
              <span className="text-amber-500 font-bold">Grillage :</span>{" "}
              Traces d'oxydation du fil de fer souvent visibles sur la coque.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "liners",
      title: "III. Intérieur, Cuirs & Rivets",
      icon: <Settings size={20} />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-amber-500 uppercase text-[10px] font-black mb-2 tracking-widest">
              Cerclages (Liner Bands)
            </h4>
            <p className="text-xs leading-loose">
              •{" "}
              <span className="text-white font-bold">
                Alu Renforcé (1935-37)
              </span>{" "}
              : Anneaux carrés + renforts.
              <br />•{" "}
              <span className="text-white font-bold">
                Alu Simple (1938-40)
              </span>{" "}
              : Anneaux carrés.
              <br />•{" "}
              <span className="text-white font-bold">
                Acier Zingué (1940-45)
              </span>{" "}
              : Anneaux{" "}
              <span className="text-amber-500 font-bold italic">Ronds</span>.
            </p>
          </div>
          <div>
            <h4 className="text-amber-500 uppercase text-[10px] font-black mb-2 tracking-widest">
              Cuirs & Rivets
            </h4>
            <p className="text-xs mb-2">
              • <span className="text-white font-bold">Mouton/Chèvre</span> :
              Fin (M35).
              <br />• <span className="text-white font-bold">Porc</span> :{" "}
              <span className="text-amber-500 underline font-bold">
                Pores par 3
              </span>{" "}
              (Standard M42).
            </p>
            <p className="text-[10px] bg-black/40 p-2 rounded border border-amber-900/30 italic">
              Rivets : Laiton/Alu (Précoces) ou Acier (Tardifs). Branches non
              "neuves".
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "decals",
      title: "IV. Expertise des Insignes",
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-3">
          <p className="text-[10px] italic text-amber-200/50 mb-2">
            Protégés par vernis cellulosique (Zapon). Halo de 1mm attendu.
          </p>

          <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1">
              Heer (Armée de Terre)
            </h4>
            <p className="text-[11px]">
              <span className="text-white font-bold">Bigfoot :</span> Serres
              massives, exclusivement chez{" "}
              <span className="text-amber-500 underline">Quist (Q)</span>.
            </p>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1">
              Kriegsmarine (Marine)
            </h4>
            <p className="text-[11px]">
              <span className="text-white font-bold">Poudre Dorée :</span>{" "}
              Brillance métallique.{" "}
              <span className="text-amber-500 font-bold italic">
                Relief Rim
              </span>{" "}
              (3D) visible à la loupe.
            </p>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1">
              Luftwaffe (Aviation)
            </h4>
            <p className="text-[11px]">
              <span className="text-white font-bold">Aigle détouré :</span>{" "}
              Snake Leg (M35) ou Droop Tail (M35 précoce). Pas d'écu.
            </p>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1">
              Waffen-SS
            </h4>
            <p className="text-[11px]">
              <span className="text-amber-500 font-bold">
                Paillettes d'alu :
              </span>{" "}
              Scintillement sous LED. Type ET : runes alignées en bas.
            </p>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30">
            <h4 className="text-amber-500 font-black text-[10px] uppercase mb-1">
              Polizei (Police)
            </h4>
            <p className="text-[11px]">
              Aigle lauré (G) et Bouclier Parti (D). Souvent réduits sur M34.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "straps",
      title: "V. Jugulaires & Marquages",
      icon: <Search size={20} />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-amber-500 uppercase text-[10px] font-black mb-1">
              Jugulaires
            </h4>
            <p className="text-xs">
              • Boucles Alu (pré-40) ou Acier (post-40).
              <br />• 13 trous{" "}
              <span className="text-white font-bold">Oblongues (Ovales)</span>.
              <br />• Marquage Nom ou Codes{" "}
              <span className="text-amber-500 font-bold italic">
                RBNr / 3 lettres
              </span>{" "}
              (ftb 44).
            </p>
          </div>
          <div className="border-t border-amber-900/30 pt-3">
            <h4 className="text-amber-500 uppercase text-[10px] font-black mb-1">
              Marquages Coque
            </h4>
            <p className="text-xs">
              • <span className="text-white font-bold">M35/40</span> : Flanc
              gauche.
              <br />• <span className="text-white font-bold">M42</span> :
              Nuquière.
              <br />• <span className="text-white font-bold">Dôme</span> :
              Tampon inspecteur "bu" par l'acier.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "auth",
      title: "VI. Checklist d'Authenticité",
      icon: <AlertCircle size={20} />,
      content: (
        <div className="space-y-4 bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
          <div className="flex gap-3">
            <div className="bg-amber-600 text-black font-black px-2 rounded h-fit">
              1
            </div>
            <p className="text-xs text-white font-bold underline italic">
              Crazing :{" "}
              <span className="font-normal no-underline not-italic text-amber-100/70">
                Le vernis Zapon craquelle comme un cheveu.
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-amber-600 text-black font-black px-2 rounded h-fit">
              2
            </div>
            <p className="text-xs text-white font-bold underline italic">
              Réaction UV :{" "}
              <span className="font-normal no-underline not-italic text-amber-100/70">
                Jaune/Vert terne attendu. Bleu = Faux.
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-amber-600 text-black font-black px-2 rounded h-fit">
              3
            </div>
            <p className="text-xs text-white font-bold underline italic">
              Usure :{" "}
              <span className="font-normal no-underline not-italic text-amber-100/70">
                Logique sur les reliefs et points de contact.
              </span>
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
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Manuel
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="flex items-center gap-1 px-4 py-1.5 bg-amber-900/30 rounded-full border border-amber-700/50 text-[10px] uppercase font-black active:scale-90 transition-transform"
        >
          <ArrowLeft size={14} /> Retour
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-2 border-amber-900/30 rounded-2xl overflow-hidden bg-[#1a1812]"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-5 text-left active:bg-amber-900/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-amber-600">{section.icon}</span>
                <span className="font-black uppercase text-sm tracking-widest leading-none">
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
              <div className="p-5 pt-0 text-sm leading-relaxed border-t border-amber-900/20">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-8 p-4 bg-amber-600/5 rounded-2xl border border-amber-600/10">
        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 mb-3 tracking-tighter">
          <Ruler size={12} /> Correspondance (Coque ➔ Cuir)
        </h4>
        <div className="grid grid-cols-5 gap-1 text-[9px] font-bold text-center">
          {["60➔52", "62➔54", "64➔56", "66➔58", "68➔60"].map((t) => (
            <div
              key={t}
              className="bg-black/40 py-2 rounded border border-amber-900/20"
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
