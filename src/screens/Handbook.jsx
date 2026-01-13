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
  Zap,
  FlaskConical,
  Binary,
  Scale,
  Anchor,
  Flame,
  Fingerprint,
  Crosshair,
  Cloud,
  Microscope,
  PenTool,
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
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-xs leading-relaxed">
            <p>
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Héritage (1917) :
              </span>{" "}
              Apparition d'insignes régimentaires peints à la main (ex: écusson
              des Hohenzollern) sur les flancs gauches des modèles M16 et M18.
            </p>
            <p>
              •{" "}
              <span className="text-amber-500 font-bold underline">
                L'Ordre du 5 Avril 1934 :
              </span>{" "}
              Standardisation prescrivant l'écusson national tricolore
              (noir-blanc-rouge) à droite et l'emblème de l'armée à gauche.
            </p>
            <p>
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Configuration SS :
              </span>{" "}
              Inversion réglementaire avec les runes Siegrunen à droite et l'écu
              du parti (croix gammée sur disque blanc) à gauche.
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
        <div className="space-y-6">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
            <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
              {isFr ? "M35 (L'Apogée)" : "M35 (The Peak)"}
            </h4>
            <ul className="text-xs space-y-2 mt-2">
              <li>
                •{" "}
                <span className="text-white font-bold">
                  Acier au Molybdène :
                </span>{" "}
                Alliage Chrome-Nickel-Molybdène offrant une résistance
                supérieure pour un poids réduit (1.1mm à 1.2mm).
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">
                  Aérateurs Rapportés :
                </span>{" "}
                Orifices percés puis équipés d'œillets (rivets creux) insérés et
                sertis séparément ("Donut").
              </li>
              <li>
                • <span className="text-white font-bold">Finition :</span> Bord
                roulé vers l'intérieur (Rolled Edge) et peinture lisse
                (Apfelgrün).
              </li>
            </ul>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 shadow-lg">
            <h4 className="font-black text-amber-500 text-sm uppercase flex items-center gap-2">
              M40 & M42 (Rationalisation)
            </h4>
            <ul className="text-xs space-y-2 mt-2">
              <li>
                •{" "}
                <span className="text-white font-bold">M40 (Mars 1940) :</span>{" "}
                Bascule vers l'acier Manganèse-Silicium (pénurie de molybdène).
                Évents embossés directement ("volcaniques").
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">M42 (Avril 1942) :</span>{" "}
                Suppression du roulage pour gagner du temps. Bord brut évasé
                (Flared Rim) tranchant.
              </li>
              <li>
                •{" "}
                <span className="text-amber-500 font-bold italic">
                  Note de Production :
                </span>{" "}
                L'usine Quist a produit des M40 jusqu'en 1944. Les M42 marqués
                "Q" sont rarissimes.
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
          <div className="space-y-2">
            {[
              {
                code: "ET / ckl",
                name: "Eisenhüttenwerke Thale",
                desc: "Plus gros producteur. Monopole M38. Seul fabricant des tailles 70 à 74.",
              },
              {
                code: "Q",
                name: "F.W. Quist (Esslingen)",
                desc: "Aciers réputés robustes. Refus tardif du M42. Aigle 'Bigfoot' exclusif.",
              },
              {
                code: "SE / hkp",
                name: "Sächsische Emaillierwerke",
                desc: "Signature : évents coniques sur M40. Jupe arrière très évasée.",
              },
              {
                code: "NS",
                name: "Nickelwerke Schwerte",
                desc: "Visière pointue ('Sharp profile'). Préfixe 'D' sur les lots M35.",
              },
              {
                code: "EF",
                name: "Emaillierwerke Fulda",
                desc: "Fournisseur privilégié Waffen-SS. M35 parfois mal finis.",
              },
              {
                code: "qvl / bvL",
                name: "Codes de Dissimulation",
                desc: "Production satellite de Thale (1944-45) liée au cryptage du R.B.Nr.",
              },
            ].map((m) => (
              <div
                key={m.code}
                className="bg-black/40 p-3 rounded-lg border border-amber-900/30"
              >
                <span className="text-amber-500 font-black text-sm italic">
                  {m.code}
                </span>
                <p className="text-[11px] text-amber-100/80 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "heer_expert",
      title: isFr
        ? "III. Expertise : HEER (Armée de Terre)"
        : "III. Expertise: HEER (Army)",
      icon: <Crosshair size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-[10px] leading-relaxed">
            <h4 className="text-amber-500 font-black uppercase mb-2">
              Morphologie de l'Aigle (Hoheitsadler)
            </h4>
            <p className="mb-2">
              • <span className="text-white font-bold">Style ET :</span> Lignes
              nettes, bordure noire précise. Courbure "hump" sur l'aile gauche
              (droite pour l'observateur).{" "}
              <span className="text-amber-500 italic">Défaut récurrent :</span>{" "}
              point sur la griffe droite de la patte droite.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold">
                Type Big Foot (Quist) :
              </span>{" "}
              Griffes larges, structure massive. Plumage de poitrine fin.
              Exclusif aux coques Q.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold">
                Style HJ&K (Thin Wing) :
              </span>{" "}
              Ailes fines, texture granuleuse. Typique des coques EF, NS et
              reconditionnements.
            </p>
            <p>
              • <span className="text-white font-bold">Variantes Rares :</span>{" "}
              <span className="text-amber-500">Gustav Peiniger</span> ("Mad
              Faced" - visage distordu) et{" "}
              <span className="text-amber-500">Methner & Burger</span> (lignes
              internes grises).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "luft_expert",
      title: isFr ? "IV. Expertise : LUFTWAFFE" : "IV. Expertise: LUFTWAFFE",
      icon: <Cloud size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-[10px] leading-relaxed">
            <h4 className="text-amber-500 font-black uppercase mb-2">
              L'Aigle en Vol
            </h4>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold">
                Droop Tail (1er Modèle - 1935/37) :
              </span>{" "}
              Plumes de la queue pointant vers le bas. Variantes{" "}
              <span className="text-amber-500 italic">Snake Leg</span>{" "}
              (onduleuse) et{" "}
              <span className="text-amber-500 italic">Straight Leg</span>{" "}
              (perpendiculaire).
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold">
                Modèle Standard (1937+) :
              </span>{" "}
              Design anguleux. Présence d'un{" "}
              <span className="text-amber-500 italic">petit point noir</span>{" "}
              repère à la base de l'aile gauche sur ET, Quist et SE.
            </p>
            <p>
              • <span className="text-white font-bold">Variante NS :</span> La
              griffe semble "flotter" au-dessus de la croix gammée.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "km_expert",
      title: isFr
        ? "V. Expertise : KRIEGSMARINE (Marine)"
        : "V. Expertise: KRIEGSMARINE",
      icon: <Anchor size={20} />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-900/10 rounded-xl border border-amber-900/30 text-[10px]">
            <h4 className="text-amber-500 font-black uppercase mb-2">
              Le Défi de l'Or et du Vernis "Toné"
            </h4>
            <p className="mb-3 italic opacity-80">
              Le vernis Zapon des insignes Heer (argent) jaunit avec l'âge. Un
              vrai KM utilise une poudre de Bronze/Laiton (or dans la masse).
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-white font-bold underline">
                La Crête (The Ridge) :
              </span>{" "}
              Signature absolue des insignes KM produits pour{" "}
              <span className="text-amber-500 font-bold">ET et SE</span>. Ligne
              noire en relief palpable visible à la loupe.
            </p>
            <p>
              •{" "}
              <span className="text-white font-bold underline">
                Avertissement NS :
              </span>{" "}
              L'usine NS n'a jamais produit d'insignes Kriegsmarine. Toute coque
              NS "KM" est un faux ou un Heer jauni.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "ss_expert",
      title: isFr
        ? "VI. Expertise : WAFFEN-SS (Runes)"
        : "VI. Expertise: WAFFEN-SS",
      icon: <Zap size={20} />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-red-900/10 rounded-xl border border-red-900/30 text-[10px] leading-relaxed">
            <h4 className="text-red-500 font-black uppercase mb-2 flex items-center gap-2">
              <AlertTriangle size={14} /> Géométrie et Mythes
            </h4>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold underline">
                Style C.A. Pocher (1er Modèle) :
              </span>{" "}
              Angles très vifs. Alignement exact de la base des runes avec le
              point de rupture de l'écusson.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold underline">
                Style Quist :
              </span>{" "}
              La rune de gauche descend légèrement plus bas que celle de droite.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold underline">
                Le Mythe Champagne :
              </span>{" "}
              Runes rosées/dorées trouvées sur coques NS. Longtemps débattues,
              elles sont désormais reconnues comme authentiques variantes
              chimiques.{" "}
              <span className="text-white font-bold italic">
                (Note : D'autres sources les classent comme toxiques sur coques
                ND - vérifier lot)
              </span>
              .
            </p>
            <p>
              •{" "}
              <span className="text-white font-bold underline">
                Border Break :
              </span>{" "}
              Micro-cassures irrégulières dans le trait noir périphérique
              (impression lithographique).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "polizei",
      title: isFr
        ? "VII. Expertise : POLIZEI (Police)"
        : "VII. Expertise: POLIZEI",
      icon: <ShieldCheck size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-[10px]">
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold underline">
                Configurations :
              </span>{" "}
              Deux insignes maintenus sur M35/40/42 (Aigle de police à gauche /
              Écu du parti à droite).
            </p>
            <p className="mb-2">
              • <span className="text-white font-bold underline">Styles :</span>{" "}
              Style <span className="text-amber-500 font-bold">SE</span>{" "}
              (bordure noire nette - très commun) et Style{" "}
              <span className="text-amber-500 font-bold">EF</span> (exclusif
              Fulda).
            </p>
            <p>
              •{" "}
              <span className="text-white font-bold underline">
                Réattributions :
              </span>{" "}
              Des casques Heer ont été réattribués à la police en appliquant les
              nouveaux insignes par-dessus les anciens.
            </p>
          </div>
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
        <div className="space-y-5">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-[10px] leading-relaxed">
            <h4 className="text-amber-500 font-black uppercase mb-2">
              Technologie de Production d'époque
            </h4>
            <p className="mb-2">
              <span className="text-white font-bold underline">
                Stratification "Sandwich" :
              </span>{" "}
              Couche de base transparente + Couche métallique (Pulver d'Alu ou
              Bronze) + Couche de détail noire + Vernis Zapon (Copal ou
              Nitrocellulose).
            </p>
            <p className="mb-2">
              <span className="text-white font-bold underline">
                Adhésion Moléculaire :
              </span>{" "}
              Le transfert à sec/vernis utilisé en usine fusionne avec la
              peinture. Absence de "marche" au toucher contrairement aux
              autocollants modernes.
            </p>
            <p>
              <span className="text-white font-bold underline">
                Crazing (Craquelures) :
              </span>{" "}
              Réseau de micro-fissures aléatoires dû au vieillissement de 80
              ans. Les faux présentent des rayures au scalpel trop droites.
            </p>
          </div>
          <div className="p-3 bg-amber-900/10 rounded-xl border border-amber-900/30 flex items-center gap-3 italic text-[10px]">
            <Microscope size={16} className="text-amber-500 shrink-0" />
            <p>
              Signature d'Impression (x200) : Les originaux montrent une
              distribution aléatoire des pigments. Les faux numériques révèlent
              une trame de points régulière ou des bords en "dents de scie".
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "paratroopers",
      title: isFr
        ? "IX. Casques Parachutistes (M38)"
        : "IX. Paratrooper Helmets (M38)",
      icon: <Wind size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-600/20 text-xs">
            <h4 className="text-amber-500 font-black uppercase mb-2">
              Architecture Aérodynamique (ET/ckl)
            </h4>
            <ul className="space-y-2">
              <li>
                • <span className="text-white font-bold">Acier renforcé :</span>{" "}
                Épaisseur de 1.5mm pour les contraintes de saut. Coque sphérique
                sans bords saillants.
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">
                  Système de Rétention :
                </span>{" "}
                Quatre boulons de fixation et jugulaire en "Y" complexe.
              </li>
              <li>
                • <span className="text-white font-bold">Boulons :</span>{" "}
                Modèles 'Spanner' (deux trous) ➔ modèles 'Slotted' (fente
                simple).
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "civic",
      title: isFr ? "X. Modèles Civiques & M34" : "X. Civic Models & M34",
      icon: <Flame size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-xs leading-relaxed">
            <p className="mb-2">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                M34 Square Dip :
              </span>{" "}
              Transition angulaire abrupte visière-jupe pour étanchéité accrue
              du masque à gaz.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Salt Shaker (Salière) :
              </span>{" "}
              Aérateurs formés de deux groupes de sept perforations circulaires.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Casque Gladiator :
              </span>{" "}
              Construction en 3 pièces ou monobloc pour la Luftschutz (Défense
              passive).
            </p>
            <p>
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Beaded (Bourrelet) :
              </span>{" "}
              Coques de combat (M35/40/42) présentant des défauts
              métallurgiques, marquées d'un bourrelet horizontal pour interdire
              l'usage au front.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "lot_logic",
      title: isFr ? "XI. Archivistique des Lots" : "XI. Lot Number Archiving",
      icon: <Binary size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20 text-[10px] leading-relaxed">
            <h4 className="text-amber-500 font-black uppercase mb-2">
              Méthode de Triangulation
            </h4>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold underline">
                Définition :
              </span>{" "}
              Le Lotnummer désigne une coulée (heat) d'acier spécifique
              transformée en tôles.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="text-white font-bold underline">
                Lot Twins (Jumeaux) :
              </span>{" "}
              Des coques d'un même lot peuvent porter des insignes de branches
              différentes car elles étaient stockées "nues".
            </p>
            <p>
              •{" "}
              <span className="text-white font-bold underline">
                Chronologie :
              </span>{" "}
              La transition M35/M40 chez ET se situe autour du lot{" "}
              <span className="text-amber-500 font-bold">4800</span>. Chez
              Quist, le M35 perdure jusqu'aux lots 4000-5000.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "dome_stamp",
      title: isFr
        ? "XII. Tampon de Dôme (Abgenommen)"
        : "XII. Dome Stamp (Abgenommen)",
      icon: <Fingerprint size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-900/30 text-[10px]">
            <h4 className="text-amber-500 font-black uppercase mb-2 italic">
              Certification d'Inspection
            </h4>
            <p className="italic leading-relaxed">
              Marquage à l'encre certifiant l'acceptation par le bureau de
              l'armement. L'encre doit être{" "}
              <span className="text-white font-bold">poreuse</span> (absorbée
              par la peinture mate). Un tampon brillant ou posé en surface est
              un indicateur de manipulation post-guerre.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "metrology",
      title: isFr ? "XIII. Table de Métrologie" : "XIII. Metrology Table",
      icon: <Scale size={20} />,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="text-amber-500 uppercase border-b border-amber-900/30 text-left">
                <th className="p-2">Coque</th>
                <th className="p-2">Tête (cm)</th>
                <th className="p-2">Poids (g)</th>
                <th className="p-2">Note</th>
              </tr>
            </thead>
            <tbody className="text-amber-100/60 italic">
              {[
                "60:52/53:810-930:Peu courant",
                "62:54/55:880-1000:Standard Petit",
                "64:56/57:920-1070:Plus répandu",
                "66:58/59:1000-1125:Gabarit Large",
                "68:60/61:1025-1170:Moins courant",
                "70:62/63:Rare:Exclusivité Thale/Quist",
              ].map((row) => {
                const [t, c, p, n] = row.split(":");
                return (
                  <tr key={t} className="border-b border-amber-900/10">
                    <td className="p-2 font-black text-white">{t}</td>
                    <td className="p-2">{c}</td>
                    <td className="p-2">{p}</td>
                    <td className="p-2 text-[8px]">{n}</td>
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
            <BookOpen className="text-amber-500" size={28} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
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
                  <span className="font-black uppercase text-sm tracking-widest text-white">
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

        <div className="mt-10 p-5 bg-black/60 backdrop-blur-md rounded-2xl border border-amber-600/10 shadow-2xl text-center">
          <p className="text-[10px] italic opacity-40 uppercase tracking-widest">
            Helmet Legends Forensic Database v4.0
          </p>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 119, 6, 0.2); border-radius: 10px; }`}</style>
    </div>
  );
};

export default Handbook;
