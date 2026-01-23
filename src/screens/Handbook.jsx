import React, { useState } from "react";
import monFondExpert from "../assets/helmet-bg.png";

import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  HardHat,
  Search,
  ArrowLeft,
  History,
  AlertTriangle,
  Wind,
  Anchor,
  Zap,
  FlaskConical,
  Binary,
  Scale,
  Fingerprint,
  Crosshair,
  Cloud,
  Microscope,
  Flame,
  ShieldCheck,
  Layers,
} from "lucide-react";

const Handbook = ({ setScreen, lang }) => {
  const [openSection, setOpenSection] = useState(null);
  const isFr = lang === "fr";
  const toggleSection = (id) => setOpenSection(openSection === id ? null : id);

  const sections = [
    {
      id: "genesis",
      title: isFr
        ? "0. Genèse & Héraldique (1916-1934)"
        : "0. Genesis & Heraldry (1916-1934)",
      icon: <History size={20} />,
      content: (
        <div className="space-y-4 text-base leading-relaxed">
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20">
            <p className="mb-3">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Héritage (1917) :
              </span>{" "}
              Apparition d'emblèmes peints à la main sur le flanc gauche des
              modèles M16 et M18[cite: 8].
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Standardisation (1933) :
              </span>{" "}
              Décret du 14 mars 1933 imposant le bouclier tricolore
              (noir-blanc-rouge) à gauche pour standardiser l'hétérogénéité des
              Länder[cite: 10].
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                L'Ordre du 5 Avril 1934 :
              </span>{" "}
              Application de l'écusson national à droite et de l'emblème d'arme
              à gauche[cite: 39, 41].{" "}
              <span className="text-white font-bold underline">
                Règle de pose :
              </span>{" "}
              l'insigne doit être placé précisément à 3 mm sous l'évent
              d'aération.
            </p>
            <p>
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Configuration SS :
              </span>{" "}
              Inversion avec runes à droite et écu du parti à gauche. Adoption
              des décalcomanies Pocher dès le 14 août 1935[cite: 43].
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "shells",
      title: isFr ? "I. Modèles & Métallurgie" : "I. Models & Metallurgy",
      icon: <HardHat size={20} />,
      content: (
        <div className="space-y-6 text-base">
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 shadow-lg">
            <h4 className="font-black text-amber-500 text-lg uppercase mb-2">
              M35 (L'Apogée)
            </h4>
            <ul className="space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold">Acier Molybdène :</span>{" "}
                Alliage Chrome-Nickel-Molybdène offrant une résistance
                supérieure[cite: 101].
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">
                  Aérateurs Rapportés :
                </span>{" "}
                Orifices percés avec rivets creux sertis séparément appelés
                "Donut"[cite: 11].
              </li>
              <li>
                • <span className="text-white font-bold">Finition :</span> Bord
                roulé (Rolled Edge) et peinture lisse (Apfelgrün).
              </li>
            </ul>
          </div>
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 shadow-lg">
            <h4 className="font-black text-amber-500 text-lg uppercase mb-2">
              M40 & M42 (Rationalisation)
            </h4>
            <ul className="space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold">M40 (Mars 1940) :</span>{" "}
                Passage à l'acier Manganèse-Silicium et évents embossés
                directement[cite: 101].{" "}
                <span className="text-red-400 font-bold">21 Mars 1940 :</span>{" "}
                Suppression de l'écu tricolore pour le camouflage[cite: 45].
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">M42 (Avril 1942) :</span>{" "}
                Bord brut évasé (Flared Rim).{" "}
                <span className="text-red-400 font-bold underline">
                  Suppression finale :
                </span>{" "}
                l'aigle Heer s'arrête le 28 août 1943 [cite: 49] et les runes SS
                le 10 octobre 1943[cite: 50].
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "manufacturers",
      title: isFr
        ? "II. Les Cinq Géants & Codes"
        : "II. The Five Giants & Codes",
      icon: <Search size={20} />,
      content: (
        <div className="space-y-4">
          {[
            {
              code: "ET / ckl",
              name: "Thale",
              desc: "Plus gros producteur. Monopole M38. Seul fabricant des tailles 70-74[cite: 94]. Type ET.",
            },
            {
              code: "Q",
              name: "Quist",
              desc: "Aciers robustes. Refus tardif du M42[cite: 94]. Aigle 'Bigfoot' et Runes Quist exclusifs[cite: 60, 77].",
            },
            {
              code: "SE / hkp",
              name: "Lauter",
              desc: "Signature : évents coniques sur M40. Jupe arrière très évasée[cite: 94]. Style ET ou SE Polizei.",
            },
            {
              code: "NS",
              name: "Schwerte",
              desc: "Visière pointue. Préfixe 'D' sur les lots M35[cite: 94]. HJ&K ou Pocher.",
            },
            {
              code: "EF / FS",
              name: "Fulda",
              desc: "Fournisseur SS majeur[cite: 94]. M35 parfois mal finis. HJ&K ou Runes EF.",
            },
            {
              code: "qvl / bvL",
              name: "Dissimulation",
              desc: "Production satellite de Thale (1944-45) liée au cryptage industriel.",
            },
          ].map((m) => (
            <div
              key={m.code}
              className="bg-black/40 p-4 rounded-lg border border-amber-900/30 text-base"
            >
              <span className="text-amber-500 font-black italic">
                {m.code} — {m.name}
              </span>
              <p className="text-amber-100/80 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "heer_expert",
      title: isFr ? "III. Expertise : HEER" : "III. Expertise: HEER",
      icon: <Crosshair size={20} />,
      content: (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            • <span className="text-white font-bold underline">Style ET :</span>{" "}
            Ligne noire précise[cite: 55].{" "}
            <span className="text-amber-500 font-bold italic">Détail :</span>{" "}
            "dimple" (fossette) sur la griffe droite de la patte droite[cite:
            126].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Big Foot (Quist) :
            </span>{" "}
            Serres massives disproportionnées. Exclusif aux coques Q[cite: 60].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              HJ&K (Thin Wing) :
            </span>{" "}
            Ailes fines, texture granuleuse. Typique des coques EF et NS[cite:
            56, 57].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Variantes Rares :
            </span>{" "}
            Peiniger ("Mad Faced" [cite: 63]) et Methner & Burger (lignes
            grises).
          </p>
          <p>
            • <span className="text-white font-bold underline">Chimie :</span>{" "}
            Intégration de{" "}
            <span className="text-white font-bold underline">
              poudre d'aluminium (Pulver)
            </span>{" "}
            pour l'éclat métallique d'origine[cite: 20, 134].
          </p>
        </div>
      ),
    },
    {
      id: "luft_expert",
      title: isFr ? "IV. Expertise : LUFTWAFFE" : "IV. Expertise: LUFTWAFFE",
      icon: <Cloud size={20} />,
      content: (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Drooptail (1er Modèle) :
            </span>{" "}
            Plumes de la queue pointant vers le bas. Exclusif M35 SE, Q et
            ET[cite: 66]. Variantes 'Snake Leg' et 'Straight Leg'[cite: 67].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              2nd Modèle (1937+) :
            </span>{" "}
            Design agressif et détaillé[cite: 68]. Point noir repère à la base
            de l'aile sur ET, Q et SE.
          </p>
          <p>
            •{" "}
            <span className="text-white font-bold underline">
              Variante NS :
            </span>{" "}
            La griffe semble "flotter" au-dessus de la swastika.
          </p>
        </div>
      ),
    },
    {
      id: "km_expert",
      title: isFr
        ? "V. Expertise : KRIEGSMARINE"
        : "V. Expertise: KRIEGSMARINE",
      icon: <Anchor size={20} />,
      content: (
        <div className="p-5 bg-amber-900/10 rounded-xl border border-amber-900/30 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              The Ridge (La Crête) :
            </span>{" "}
            Signature absolue du type ET. Bordure noire en relief palpable
            faisant le tour du bouclier[cite: 72].
          </p>
          <p className="mb-3">
            • <span className="text-white font-bold underline">Vrai Or :</span>{" "}
            Utilise une poudre de Bronze/Laiton[cite: 70]. Le Heer jauni
            (toning) est une oxydation du vernis sans structure granulaire[cite:
            71].
          </p>
          <p>
            •{" "}
            <span className="text-red-400 font-bold underline">
              Avertissement NS :
            </span>{" "}
            L'usine NS n'a jamais produit d'insignes Kriegsmarine d'usine.
          </p>
        </div>
      ),
    },
    {
      id: "ss_expert",
      title: isFr ? "VI. Expertise : WAFFEN-SS" : "VI. Expertise: WAFFEN-SS",
      icon: <Zap size={20} />,
      content: (
        <div className="p-5 bg-red-900/10 rounded-xl border border-red-900/30 text-base leading-relaxed">
          <p className="mb-3">
            • <span className="text-white font-bold underline">Style ET :</span>{" "}
            Standard Thale. Runes pointues parfaitement proportionnées[cite:
            76].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Style Quist :
            </span>{" "}
            Plus massif, les runes descendent plus bas dans le bouclier[cite:
            78].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Style Pocher :
            </span>{" "}
            Très fréquent sur casques de transition M16/M18 réutilisés[cite:
            80].
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Champagne Runes :
            </span>{" "}
            Analyses de 2015 révélant une peinture au pochoir avec pigment
            spécifique plutôt qu'une décalcomanie.
          </p>
        </div>
      ),
    },
    {
      id: "polizei",
      title: isFr ? "VII. Expertise : POLIZEI" : "VII. Expertise: POLIZEI",
      icon: <ShieldCheck size={20} />,
      content: (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Configurations :
            </span>{" "}
            Deux insignes maintenus (Aigle à gauche / Écu du parti à
            droite)[cite: 82].
          </p>
          <p>
            • <span className="text-white font-bold underline">Styles :</span>{" "}
            Borderless précoce (ET/Quist [cite: 85]) et Bordered tardif standard
            pour SE et EF[cite: 87, 88].
          </p>
        </div>
      ),
    },
    {
      id: "forensics",
      title: isFr
        ? "VIII. Laboratoire Forensique"
        : "VIII. Forensic Laboratory",
      icon: <FlaskConical size={20} />,
      content: (
        <div className="space-y-5 text-base leading-relaxed">
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20">
            <p className="mb-3">
              • <span className="text-white font-bold underline">Chimie :</span>{" "}
              Émulsion incluant glucose (adhésion [cite: 17]) et liant à base
              d'huile de lin[cite: 19].
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-white font-bold underline">
                Spidering (Craquelage) :
              </span>{" "}
              Micro-fissures en toile d'araignée issues du séchage naturel du
              vernis sur 80 ans[cite: 114].
            </p>
            <p className="mb-4">
              •{" "}
              <span className="text-white font-bold underline">
                Réaction UV :
              </span>{" "}
              Vernis ancien ambre sombre. Le bleu vif trahit les azurants
              modernes des faux[cite: 158].
            </p>
            <div className="p-4 bg-amber-900/10 rounded-xl flex items-center gap-4 italic border border-amber-900/30">
              <Microscope size={24} className="text-amber-500 shrink-0" />
              <p>
                Trame "Saw Tooth" (Dents de scie) : visible au microscope x200
                sur les faux numériques[cite: 132]. Les originaux montrent des
                aplats fluides[cite: 133].
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reissue",
      title: isFr
        ? "IX. Reconditionnement & Volontaires"
        : "IX. Reissue & Volunteers",
      icon: <Layers size={20} />,
      content: (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Heereszeugamt :
            </span>{" "}
            Les dépôts sablaient ou repeignaient les casques avec une peinture
            mate à l'oxyde d'aluminium[cite: 101]. Usage d'insignes Pocher ou
            Methner & Bürger[cite: 103].
          </p>
          <p>
            •{" "}
            <span className="text-white font-bold underline">
              Reverse Decals :
            </span>{" "}
            Runes SS à gauche chez les volontaires étrangers (Belges,
            Hollandais) dues à des initiatives locales[cite: 106, 107].
          </p>
        </div>
      ),
    },
    {
      id: "paratroopers",
      title: isFr
        ? "X. Casques Parachutistes (M38)"
        : "X. Paratrooper Helmets (M38)",
      icon: <Wind size={20} />,
      content: (
        <div className="bg-amber-900/10 p-5 rounded-xl border border-amber-600/20 text-base leading-relaxed">
          <h4 className="text-amber-500 font-black uppercase mb-3">
            Architecture Aérodynamique
          </h4>
          <ul className="space-y-3">
            <li>
              • <span className="text-white font-bold">Acier renforcé :</span>{" "}
              Épaisseur de 1.5mm. Coque sphérique sans bords saillants.
            </li>
            <li>
              •{" "}
              <span className="text-white font-bold underline">Boulons :</span>{" "}
              Passage des modèles 'Spanner' aux modèles 'Slotted' (fente
              simple)[cite: 173].
            </li>
            <li>
              • <span className="text-white font-bold">Rétention :</span>{" "}
              Jugulaire en "Y" complexe à quatre points.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "civic",
      title: isFr
        ? "XI. Modèles Civiques & M34"
        : "XI. Civic Models & Formations",
      icon: <Flame size={20} />,
      content: (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-amber-500 font-bold underline">
              M34 Square Dip :
            </span>{" "}
            Transition abrupte visière-jupe pour l'étanchéité du masque à
            gaz[cite: 146].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Gladiator :
            </span>{" "}
            Construction 3 pièces ou monobloc pour la Luftschutz (insigne
            frontal ailé)[cite: 147, 148].
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Beaded (Bourrelet) :
            </span>{" "}
            Coques de combat avec défauts métallurgiques marquées d'un bourrelet
            pour interdire l'usage au front[cite: 156].
          </p>
        </div>
      ),
    },
    {
      id: "lot_logic",
      title: isFr ? "XII. Archivistique des Lots" : "XII. Lot Number Archiving",
      icon: <Binary size={20} />,
      content: (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <h4 className="text-amber-500 font-black uppercase mb-3">
            Méthode de Triangulation
          </h4>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">Lotnummer :</span>{" "}
            Désigne une coulée (heat) d'acier transformée en tôles.
            Triangulation nécessaire pour valider la branche d'origine.
          </p>
          <p>
            •{" "}
            <span className="text-white font-bold underline">
              Lot Twins (Jumeaux) :
            </span>{" "}
            Des coques du même lot peuvent porter des insignes de branches
            différentes[cite: 165].
          </p>
        </div>
      ),
    },
    {
      id: "metrology",
      title: isFr ? "XIII. Table de Métrologie" : "XIII. Metrology Table",
      icon: <Scale size={20} />,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="text-amber-500 uppercase border-b border-amber-900/30 text-left">
                <th className="p-2">Coque</th>
                <th className="p-2">Tête (cm)</th>
                <th className="p-2">Poids (g)</th>
              </tr>
            </thead>
            <tbody className="text-amber-100/60 italic">
              {[
                "62:54/55:880-1000",
                "64:56/57:920-1070",
                "66:58/59:1000-1125",
                "68:60/61:1025-1170",
              ].map((row) => {
                const [t, c, p] = row.split(":");
                return (
                  <tr key={t} className="border-b border-amber-900/10">
                    <td className="p-2 font-black text-white">{t}</td>
                    <td className="p-2">{c}</td>
                    <td className="p-2">{p}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative overflow-hidden">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.3) blur(5px)",
        }}
      ></div>

      <div className="relative z-10 p-6 pb-32 max-w-2xl mx-auto h-screen overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-sm bg-black/20 p-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <BookOpen className="text-amber-500" size={32} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              {isFr ? "Manuel Expert" : "Expert Handbook"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="flex items-center gap-1 px-5 py-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-[10px] uppercase font-black active:scale-90 transition-transform shadow-lg"
          >
            <ArrowLeft size={14} /> {isFr ? "Retour" : "Back"}
          </button>
        </div>

        <div className="space-y-5">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-2 border-amber-900/30 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md shadow-2xl"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left active:bg-amber-900/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-amber-600">{section.icon}</span>
                  <span className="font-black uppercase text-base tracking-widest text-white">
                    {section.title}
                  </span>
                </div>
                {openSection === section.id ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
              {openSection === section.id && (
                <div className="p-8 pt-0 text-base leading-relaxed border-t border-amber-900/20 animate-in slide-in-from-top-4 duration-500">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-black/60 backdrop-blur-md rounded-2xl border border-amber-600/10 shadow-2xl text-center">
          <p className="text-xs italic opacity-40 uppercase tracking-widest">
            Helmet Legends Forensic Database v4.1 — Certified Sources
          </p>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 119, 6, 0.3); border-radius: 10px; }`}</style>
    </div>
  );
};

export default Handbook;
