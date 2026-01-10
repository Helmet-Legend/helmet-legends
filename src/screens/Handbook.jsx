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
  ExternalLink,
  Library,
} from "lucide-react";

const Handbook = ({ setScreen, lang }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "shells",
      title:
        lang === "fr" ? "I. Modèles & Métallurgie" : "I. Models & Metallurgy",
      icon: <HardHat size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-amber-200/70 italic text-xs border-b border-amber-900/30 pb-2">
            {lang === "fr"
              ? "Évolution de l'artisanat vers l'automatisation. Dureté Rockwell C 49-54."
              : "Evolution from craftsmanship to automation. Rockwell C Hardness 49-54."}
          </p>

          <div className="grid gap-4">
            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                WW1 : M16 / M17 / M18
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                {lang === "fr"
                  ? "Acier au Chrome-Nickel (1.3 kg)"
                  : "Chrome-Nickel Steel (1.3 kg)"}
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  •{" "}
                  <span className="text-white font-bold italic">
                    {lang === "fr" ? "Vents :" : "Vents:"}
                  </span>{" "}
                  {lang === "fr"
                    ? "Cornes saillantes pour Stirnpanzer."
                    : "Stepped lugs for Stirnpanzer (brow plate)."}
                </li>
                <li>
                  • <span className="text-white font-bold italic">M18 :</span>{" "}
                  {lang === "fr"
                    ? "Découpe d'oreille (Ear Cut-out)."
                    : "Ear Cut-out for improved hearing."}
                </li>
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                M35
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                {lang === "fr" ? "Acier au Molybdène" : "Molybdenum Steel"}
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  •{" "}
                  <span className="text-white font-bold">
                    {lang === "fr" ? "Bord :" : "Edge:"}
                  </span>{" "}
                  {lang === "fr"
                    ? "Roulé (replié vers l'intérieur)."
                    : "Rolled edge (folded inwards)."}
                </li>
                <li>
                  •{" "}
                  <span className="text-white font-bold">
                    {lang === "fr" ? "Aérations :" : "Vents:"}
                  </span>{" "}
                  {lang === "fr"
                    ? "Œillets rapportés pressés."
                    : "Pressed-in separate bushings."}
                </li>
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
              <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
                M40 & M42
              </h4>
              <p className="text-[10px] mt-1 text-white/70 italic">
                {lang === "fr"
                  ? "Acier au Manganèse-Silicium"
                  : "Manganese-Silicon Steel"}
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>
                  • <span className="text-white font-bold">M40 :</span>{" "}
                  {lang === "fr"
                    ? "Bord roulé, aérations embouties."
                    : "Rolled edge, stamped vents."}
                </li>
                <li>
                  • <span className="text-white font-bold">M42 :</span>{" "}
                  {lang === "fr"
                    ? "Bord brut / tranchant (évasé)."
                    : "Flared raw / sharp edge."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "manufacturers",
      title:
        lang === "fr" ? "II. Usines & Profils" : "II. Factories & Profiles",
      icon: <Search size={20} />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              {
                code: "ET / ckl",
                name: "Eisenhüttenwerke Thale",
                desc:
                  lang === "fr"
                    ? "Leader. Seul à produire tous les modèles. Profil standard."
                    : "Market leader. Only factory to produce all models. Standard profile.",
              },
              {
                code: "Q",
                name: "F.W. Quist",
                desc:
                  lang === "fr"
                    ? "Qualité supérieure. Refus de produire le M42. Aigle 'Bigfoot'."
                    : "Superior quality. Refused to produce the M42. 'Bigfoot' eagle.",
              },
              {
                code: "NS",
                name: "Nickelwerke Schwerte",
                desc:
                  lang === "fr"
                    ? "Visière pointue ('Sharp profile')."
                    : "Pointed visor ('Sharp profile').",
              },
              {
                code: "SE / hkp",
                name: "Sächsische Emaillierwerke",
                desc:
                  lang === "fr"
                    ? "Jupe arrière très évasée (Flare) sur tailles 66+."
                    : "Deep rear flare, especially on sizes 66+.",
              },
              {
                code: "EF / FS",
                name: "Emaillierwerke Fulda",
                desc:
                  lang === "fr"
                    ? "Profil plus haut. Principal fournisseur Polizei."
                    : "Taller dome profile. Main provider for the Polizei.",
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
                  <span className="text-[10px] text-white opacity-70 italic">
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
      title:
        lang === "fr"
          ? "III. Casques Parachutistes (M38)"
          : "III. Paratrooper Helmets (M38)",
      icon: <Wind size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-600/20 shadow-md">
            <h4 className="text-amber-500 font-black text-xs uppercase mb-2">
              M36 / M37 / M38 (ET)
            </h4>
            <ul className="text-xs space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {lang === "fr" ? "Fixation :" : "Fixation:"}
                </span>{" "}
                {lang === "fr"
                  ? "4 boulons creux ou fendus."
                  : "4 vented or split bolts."}
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {lang === "fr" ? "Amortisseurs :" : "Pads:"}
                </span>{" "}
                {lang === "fr"
                  ? "Mousse jaune naturelle ➔ Caoutchouc noir synthétique."
                  : "Natural yellow foam ➔ Synthetic black rubber."}
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold italic">
                  {lang === "fr" ? "Harnais :" : "Liner:"}
                </span>{" "}
                {lang === "fr"
                  ? "Jugulaire 4 points. Boutons pression prym 4."
                  : "4-point chinstrap. Prym 4 snaps."}
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "decals",
      title: lang === "fr" ? "V. Expertise Insignes" : "V. Decal Expertise",
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic">
                {lang === "fr" ? "Heer : Détails Macro" : "Heer: Macro Details"}
              </h4>
              <p className="text-[11px]">
                <span className="text-white font-bold">Style ET :</span>{" "}
                {lang === "fr"
                  ? "Point sur la griffe droite du pied droit."
                  : "Specific dot on the right claw of the right foot."}
              </p>
              <p className="text-[11px] mt-1">
                <span className="text-white font-bold">Bigfoot (Quist) :</span>{" "}
                {lang === "fr"
                  ? "Serres carrées. Tête de l'aigle plate."
                  : "Blocky square claws. Flat eagle head."}
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic">
                Luftwaffe
              </h4>
              <p className="text-[11px]">
                • <span className="text-white font-bold">Droop Tail :</span>{" "}
                {lang === "fr"
                  ? "Queue tombante (M35 précoce)."
                  : "Downward tail (Early M35)."}
              </p>
              <p className="text-[11px] mt-1">
                • <span className="text-white font-bold">Snake Leg :</span>{" "}
                {lang === "fr"
                  ? "Patte en zigzag (Standard)."
                  : "Zigzag leg (Standard)."}
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-amber-900/30 shadow-inner">
              <h4 className="text-amber-500 font-black text-[11px] uppercase mb-1 underline italic">
                Kriegsmarine
              </h4>
              <p className="text-[11px]">
                <span className="text-white font-bold">Relief Rim :</span>{" "}
                {lang === "fr"
                  ? "Bord noir en relief visible à la loupe."
                  : "Raised black border (rim) visible under magnification."}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "checklist",
      title: lang === "fr" ? "VII. Checklist Finale" : "VII. Final Checklist",
      icon: <Camera size={20} />,
      content: (
        <div className="space-y-4 bg-amber-900/10 p-4 rounded-xl border border-amber-600/20">
          <div className="space-y-3">
            {[
              {
                t: lang === "fr" ? "Vernis Zapon" : "Zapon Varnish",
                d:
                  lang === "fr"
                    ? "Craquelé 'Crazing' capillaire obligatoire."
                    : "Mandatory capillary 'Crazing' crackle.",
              },
              {
                t: lang === "fr" ? "Logique Lot" : "Lot Logic",
                d:
                  lang === "fr"
                    ? "Lot tardif (>1943) = AUCUN décal."
                    : "Late lot (>1943) = NO factory decal.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="bg-amber-600 text-black font-black px-1.5 rounded h-fit text-xs italic">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase italic underline">
                    {item.t}
                  </p>
                  <p className="text-[10px] text-amber-100/70 italic mt-0.5">
                    {item.d}
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
      title:
        lang === "fr"
          ? "VIII. Sources & Références"
          : "VIII. Sources & References",
      icon: <Library size={20} />,
      content: (
        <div className="space-y-4">
          <p className="text-[11px] italic text-amber-200/60 leading-relaxed">
            {lang === "fr"
              ? "Ouvrages et sites recommandés."
              : "Recommended books and websites."}
          </p>
          <div className="grid gap-3">
            <div className="bg-black/40 p-3 rounded-xl border border-amber-900/30">
              <h4 className="text-amber-500 font-black text-xs">
                Jan M. Meland
              </h4>
              <p className="text-[10px] text-white/80">
                "German Helmets 1916-1945" (2023)
              </p>
            </div>
            <a
              href="https://germanhelmetvault.com/"
              target="_blank"
              className="bg-amber-600/5 p-3 rounded-xl border border-amber-600/20 flex justify-between items-center group"
            >
              <span className="text-amber-500 font-black text-xs uppercase">
                German Helmet Vault
              </span>
              <ExternalLink
                size={16}
                className="text-amber-700 group-hover:text-amber-500"
              />
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2822] text-[#d0c7a8] font-serif p-6 pb-32">
      <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 shadow-xl">
        <div className="flex items-center gap-3">
          <BookOpen className="text-amber-500" size={28} />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            {lang === "fr" ? "Manuel Expert" : "Expert Handbook"}
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="flex items-center gap-1 px-4 py-1.5 bg-amber-900/30 rounded-full border border-amber-700/50 text-[10px] uppercase font-black"
        >
          <ArrowLeft size={14} /> {lang === "fr" ? "Retour" : "Back"}
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
              className="w-full flex items-center justify-between p-5 text-left active:bg-amber-900/20"
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
    </div>
  );
};

export default Handbook;
