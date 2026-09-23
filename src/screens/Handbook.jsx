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
  CheckSquare,
  Square,
  ClipboardList,
} from "lucide-react";

const CHECKLIST_ITEMS = [
  {
    id: "pulver",
    fr: "Scintillement solaire : la poudre d'aluminium (Pulver) d'un décal d'époque a un éclat incomparable ; un faux en plastique moderne est terne ou gris.",
    en: "Solar scintillation: period aluminum powder (Pulver) has an incomparable shine; a modern plastic fake is dull or grey.",
  },
  {
    id: "choc",
    fr: "Comportement au choc : un décal d'époque en celluloïd s'écaille en micro-morceaux secs ; un faux moderne se recourbe ou se décolle en bloc.",
    en: "Impact behavior: a period celluloid decal flakes off in dry micro-pieces; a modern fake curls or peels off in one piece.",
  },
  {
    id: "uv",
    fr: "Test UV : les fils de coiffe/jugulaire d'époque (lin, coton) restent mats sous lampe noire ; les fils synthétiques modernes brillent d'un blanc fluorescent.",
    en: "UV test: period liner/chinstrap threads (linen, cotton) stay matte under blacklight; modern synthetic threads glow fluorescent white.",
  },
  {
    id: "coherence",
    fr: "Cohérence globale : l'usure de la coque, du liner, de la jugulaire et des décalcomanies ne présente aucune contradiction temporelle ou topographique.",
    en: "Overall consistency: wear on the shell, liner, chinstrap and decals shows no temporal or topographical contradiction.",
  },
  {
    id: "etat",
    fr: "Le mythe de l'état parfait : un casque en excellent état n'est ni une preuve d'authenticité ni un motif de suspicion — il appelle simplement une vérification croisée plus poussée.",
    en: "The 'perfect condition' myth: excellent condition is neither proof of authenticity nor a reason for suspicion — it simply calls for deeper cross-checking.",
  },
  {
    id: "odeur",
    fr: "Expertise olfactive : une odeur de solvant, de colle ou de cirage moderne doit immédiatement éveiller la méfiance, même si l'aspect visuel semble convaincant.",
    en: "Olfactory test: a smell of solvent, glue or modern polish should immediately raise suspicion, even if the visual appearance looks convincing.",
  },
];

const Handbook = ({ setScreen, lang }) => {
  const [openSection, setOpenSection] = useState(null);
  const [checklist, setChecklist] = useState({});
  const isFr = lang === "fr";
  const toggleSection = (id) => setOpenSection(openSection === id ? null : id);
  const toggleCheck = (id) =>
    setChecklist((c) => ({ ...c, [id]: !c[id] }));
  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const sections = [
    {
      id: "genesis",
      title: isFr
        ? "0. Genèse & Héraldique (1916-1934)"
        : "0. Genesis & Heraldry (1916-1934)",
      icon: <History size={20} />,
      content: isFr ? (
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
      ) : (
        <div className="space-y-4 text-base leading-relaxed">
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20">
            <p className="mb-3">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Heritage (1917):
              </span>{" "}
              First hand-painted emblems appear on the left side of the M16
              and M18 models[cite: 8].
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                Standardization (1933):
              </span>{" "}
              Decree of March 14, 1933 imposing the tricolor shield
              (black-white-red) on the left, to standardize the Länder's
              heterogeneous emblems[cite: 10].
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-amber-500 font-bold underline">
                The Order of April 5, 1934:
              </span>{" "}
              Application of the national shield on the right and the branch
              emblem on the left[cite: 39, 41].{" "}
              <span className="text-white font-bold underline">
                Placement rule:
              </span>{" "}
              the decal must be positioned precisely 3 mm below the air
              vent.
            </p>
            <p>
              •{" "}
              <span className="text-amber-500 font-bold underline">
                SS Configuration:
              </span>{" "}
              Reversed, with runes on the right and party shield on the
              left. Pocher decals adopted from August 14, 1935[cite: 43].
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "shells",
      title: isFr ? "I. Modèles & Métallurgie" : "I. Models & Metallurgy",
      icon: <HardHat size={20} />,
      content: isFr ? (
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
      ) : (
        <div className="space-y-6 text-base">
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 shadow-lg">
            <h4 className="font-black text-amber-500 text-lg uppercase mb-2">
              M35 (The Peak)
            </h4>
            <ul className="space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold">Molybdenum Steel:</span>{" "}
                Chrome-Nickel-Molybdenum alloy offering superior
                resistance[cite: 101].
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">
                  Applied Vents:
                </span>{" "}
                Drilled openings with separately crimped hollow rivets, known
                as "Donuts"[cite: 11].
              </li>
              <li>
                • <span className="text-white font-bold">Finish:</span> Rolled
                edge and smooth paint (Apfelgrün).
              </li>
            </ul>
          </div>
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 shadow-lg">
            <h4 className="font-black text-amber-500 text-lg uppercase mb-2">
              M40 & M42 (Streamlining)
            </h4>
            <ul className="space-y-3">
              <li>
                •{" "}
                <span className="text-white font-bold">M40 (March 1940):</span>{" "}
                Switch to Manganese-Silicon steel with vents stamped directly
                into the shell[cite: 101].{" "}
                <span className="text-red-400 font-bold">March 21, 1940:</span>{" "}
                Removal of the tricolor shield for camouflage[cite: 45].
              </li>
              <li>
                •{" "}
                <span className="text-white font-bold">M42 (April 1942):</span>{" "}
                Raw flared rim.{" "}
                <span className="text-red-400 font-bold underline">
                  Final phase-out:
                </span>{" "}
                the Heer eagle stops on August 28, 1943 [cite: 49] and the SS
                runes on October 10, 1943[cite: 50].
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
          {(isFr
            ? [
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
              ]
            : [
                {
                  code: "ET / ckl",
                  name: "Thale",
                  desc: "Largest producer. M38 monopoly. Sole maker of sizes 70-74[cite: 94]. Type ET.",
                },
                {
                  code: "Q",
                  name: "Quist",
                  desc: "Sturdy steels. Late refusal to adopt the M42[cite: 94]. Exclusive 'Bigfoot' eagle and Quist runes[cite: 60, 77].",
                },
                {
                  code: "SE / hkp",
                  name: "Lauter",
                  desc: "Signature: conical vents on the M40. Very flared rear skirt[cite: 94]. ET or SE Polizei style.",
                },
                {
                  code: "NS",
                  name: "Schwerte",
                  desc: "Pointed visor. 'D' prefix on M35 lots[cite: 94]. HJ&K or Pocher.",
                },
                {
                  code: "EF / FS",
                  name: "Fulda",
                  desc: "Major SS supplier[cite: 94]. M35s sometimes poorly finished. HJ&K or EF runes.",
                },
                {
                  code: "qvl / bvL",
                  name: "Concealment",
                  desc: "Satellite production of Thale (1944-45) linked to industrial code-marking.",
                },
              ]
          ).map((m) => (
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
      content: isFr ? (
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
      ) : (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            • <span className="text-white font-bold underline">ET Style:</span>{" "}
            Precise black line[cite: 55].{" "}
            <span className="text-amber-500 font-bold italic">Detail:</span>{" "}
            "dimple" on the right claw of the right foot[cite: 126].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Big Foot (Quist):
            </span>{" "}
            Massive, disproportionate talons. Exclusive to Q shells[cite: 60].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              HJ&K (Thin Wing):
            </span>{" "}
            Thin wings, grainy texture. Typical of EF and NS shells[cite: 56,
            57].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Rare Variants:
            </span>{" "}
            Peiniger ("Mad Faced" [cite: 63]) and Methner & Burger (grey
            lines).
          </p>
          <p>
            • <span className="text-white font-bold underline">Chemistry:</span>{" "}
            Integration of{" "}
            <span className="text-white font-bold underline">
              aluminum powder (Pulver)
            </span>{" "}
            for the original metallic shine[cite: 20, 134].
          </p>
        </div>
      ),
    },
    {
      id: "luft_expert",
      title: isFr ? "IV. Expertise : LUFTWAFFE" : "IV. Expertise: LUFTWAFFE",
      icon: <Cloud size={20} />,
      content: isFr ? (
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
      ) : (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Drooptail (1st Model):
            </span>{" "}
            Tail feathers pointing downward. Exclusive to M35 SE, Q and
            ET[cite: 66]. 'Snake Leg' and 'Straight Leg' variants[cite: 67].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              2nd Model (1937+):
            </span>{" "}
            Aggressive, detailed design[cite: 68]. Black registration dot at
            the base of the wing on ET, Q and SE.
          </p>
          <p>
            •{" "}
            <span className="text-white font-bold underline">
              NS Variant:
            </span>{" "}
            The claw appears to "float" above the swastika.
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
      content: isFr ? (
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
      ) : (
        <div className="p-5 bg-amber-900/10 rounded-xl border border-amber-900/30 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              The Ridge:
            </span>{" "}
            Absolute signature of the ET type. Palpable raised black border
            running around the shield[cite: 72].
          </p>
          <p className="mb-3">
            • <span className="text-white font-bold underline">True Gold:</span>{" "}
            Uses a Bronze/Brass powder[cite: 70]. A yellowed Heer eagle
            (toning) is a varnish oxidation with no granular structure[cite:
            71].
          </p>
          <p>
            •{" "}
            <span className="text-red-400 font-bold underline">
              NS Warning:
            </span>{" "}
            The NS factory never produced factory Kriegsmarine insignia.
          </p>
        </div>
      ),
    },
    {
      id: "ss_expert",
      title: isFr ? "VI. Expertise : WAFFEN-SS" : "VI. Expertise: WAFFEN-SS",
      icon: <Zap size={20} />,
      content: isFr ? (
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
          <p className="mb-3">
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Champagne Runes :
            </span>{" "}
            Analyses de 2015 révélant une peinture au pochoir avec pigment
            spécifique plutôt qu'une décalcomanie.
          </p>
          <p>
            •{" "}
            <span className="text-red-400 font-bold underline">
              Tabou NS &amp; SE :
            </span>{" "}
            Ni Schwerte (NS) ni Lauter (SE/hkp) n'ont jamais reçu de contrat
            d'usine pour la SS. Toute rune sur une coque NS ou SE est
            statistiquement un faux — seule exception documentée : un
            reconditionnement d'insignes Pocher en dépôt sur des coques NS,
            jamais une production neuve.
          </p>
        </div>
      ) : (
        <div className="p-5 bg-red-900/10 rounded-xl border border-red-900/30 text-base leading-relaxed">
          <p className="mb-3">
            • <span className="text-white font-bold underline">ET Style:</span>{" "}
            Standard Thale. Perfectly proportioned, pointed runes[cite: 76].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Quist Style:
            </span>{" "}
            More massive, runes extend lower into the shield[cite: 78].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Pocher Style:
            </span>{" "}
            Very common on reused M16/M18 transitional helmets[cite: 80].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Champagne Runes:
            </span>{" "}
            2015 analyses revealing stencil-painted pigment rather than a
            decal.
          </p>
          <p>
            •{" "}
            <span className="text-red-400 font-bold underline">
              NS &amp; SE Taboo:
            </span>{" "}
            Neither Schwerte (NS) nor Lauter (SE/hkp) ever received an SS
            factory contract. Any runes on an NS or SE shell are
            statistically fake — the only documented exception is a depot
            reconditioning with Pocher insignia applied to NS shells, never
            new factory production.
          </p>
        </div>
      ),
    },
    {
      id: "polizei",
      title: isFr ? "VII. Expertise : POLIZEI" : "VII. Expertise: POLIZEI",
      icon: <ShieldCheck size={20} />,
      content: isFr ? (
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
      ) : (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Configurations:
            </span>{" "}
            Two insignia retained (Eagle on the left / Party shield on the
            right)[cite: 82].
          </p>
          <p>
            • <span className="text-white font-bold underline">Styles:</span>{" "}
            Early Borderless (ET/Quist [cite: 85]) and standard late
            Bordered for SE and EF[cite: 87, 88].
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
      content: isFr ? (
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
      ) : (
        <div className="space-y-5 text-base leading-relaxed">
          <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20">
            <p className="mb-3">
              • <span className="text-white font-bold underline">Chemistry:</span>{" "}
              Emulsion including glucose (adhesion [cite: 17]) and a
              linseed-oil-based binder[cite: 19].
            </p>
            <p className="mb-3">
              •{" "}
              <span className="text-white font-bold underline">
                Spidering:
              </span>{" "}
              Spiderweb-like micro-cracks from the varnish's natural drying
              over 80 years[cite: 114].
            </p>
            <p className="mb-4">
              •{" "}
              <span className="text-white font-bold underline">
                UV Reaction:
              </span>{" "}
              Period varnish is dark amber. Bright blue betrays the modern
              brighteners used in fakes[cite: 158].
            </p>
            <div className="p-4 bg-amber-900/10 rounded-xl flex items-center gap-4 italic border border-amber-900/30">
              <Microscope size={24} className="text-amber-500 shrink-0" />
              <p>
                "Saw Tooth" pattern: visible at x200 magnification on digital
                fakes[cite: 132]. Originals show smooth, fluid fills[cite:
                133].
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
      content: isFr ? (
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
      ) : (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">
              Heereszeugamt:
            </span>{" "}
            Depots sandblasted or repainted helmets with a matte
            aluminum-oxide paint[cite: 101]. Use of Pocher or Methner &
            Bürger insignia[cite: 103].
          </p>
          <p>
            •{" "}
            <span className="text-white font-bold underline">
              Reverse Decals:
            </span>{" "}
            SS runes on the left among foreign volunteers (Belgian, Dutch)
            due to local initiatives[cite: 106, 107].
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
      content: isFr ? (
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
      ) : (
        <div className="bg-amber-900/10 p-5 rounded-xl border border-amber-600/20 text-base leading-relaxed">
          <h4 className="text-amber-500 font-black uppercase mb-3">
            Aerodynamic Architecture
          </h4>
          <ul className="space-y-3">
            <li>
              • <span className="text-white font-bold">Reinforced steel:</span>{" "}
              1.5mm thickness. Spherical shell with no protruding edges.
            </li>
            <li>
              •{" "}
              <span className="text-white font-bold underline">Bolts:</span>{" "}
              Transition from 'Spanner' to 'Slotted' (single-slot)
              models[cite: 173].
            </li>
            <li>
              • <span className="text-white font-bold">Retention:</span>{" "}
              Complex four-point "Y" chinstrap.
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
      content: isFr ? (
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
      ) : (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <p className="mb-3">
            •{" "}
            <span className="text-amber-500 font-bold underline">
              M34 Square Dip:
            </span>{" "}
            Abrupt visor-to-skirt transition for gas-mask sealing[cite: 146].
          </p>
          <p className="mb-3">
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Gladiator:
            </span>{" "}
            3-piece or monobloc construction for the Luftschutz (winged
            frontal insignia)[cite: 147, 148].
          </p>
          <p>
            •{" "}
            <span className="text-amber-500 font-bold underline">
              Beaded:
            </span>{" "}
            Combat shells with metallurgical defects, marked with a bead to
            bar front-line use[cite: 156].
          </p>
        </div>
      ),
    },
    {
      id: "lot_logic",
      title: isFr ? "XII. Archivistique des Lots" : "XII. Lot Number Archiving",
      icon: <Binary size={20} />,
      content: isFr ? (
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
      ) : (
        <div className="bg-black/30 p-5 rounded-xl border border-amber-900/20 text-base leading-relaxed">
          <h4 className="text-amber-500 font-black uppercase mb-3">
            Triangulation Method
          </h4>
          <p className="mb-3">
            •{" "}
            <span className="text-white font-bold underline">Lotnummer:</span>{" "}
            Designates a steel heat processed into sheets. Triangulation is
            required to validate the branch of origin.
          </p>
          <p>
            •{" "}
            <span className="text-white font-bold underline">
              Lot Twins:
            </span>{" "}
            Shells from the same lot can carry insignia from different
            branches[cite: 165].
          </p>
        </div>
      ),
    },
    {
      id: "buyers_checklist",
      title: isFr
        ? "XIII. Checklist d'Achat"
        : "XIII. Buyer's Checklist",
      icon: <ClipboardList size={20} />,
      content: (
        <div className="space-y-4">
          <p className="text-xs italic opacity-60 mb-2">
            {isFr
              ? "Auto-évaluation avant achat — cochez chaque critère vérifié sur la pièce. Un outil d'aide personnelle, pas une certification."
              : "Self-assessment before buying — check each criterion you've verified on the piece. A personal aid, not a certification."}
          </p>
          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all ${
                  checklist[item.id]
                    ? "bg-green-900/20 border-green-700/40"
                    : "bg-black/30 border-amber-900/20"
                }`}
              >
                {checklist[item.id] ? (
                  <CheckSquare
                    size={20}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                ) : (
                  <Square
                    size={20}
                    className="text-amber-700 shrink-0 mt-0.5"
                  />
                )}
                <span className="text-sm leading-relaxed">
                  {isFr ? item.fr : item.en}
                </span>
              </button>
            ))}
          </div>
          <div className="text-center pt-2 text-xs uppercase font-black tracking-widest text-amber-500">
            {checkedCount} / {CHECKLIST_ITEMS.length}{" "}
            {isFr ? "critères vérifiés" : "criteria verified"}
          </div>
        </div>
      ),
    },
    {
      id: "metrology",
      title: isFr ? "XIV. Table de Métrologie" : "XIV. Metrology Table",
      icon: <Scale size={20} />,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="text-amber-500 uppercase border-b border-amber-900/30 text-left">
                <th className="p-2">{isFr ? "Coque" : "Shell"}</th>
                <th className="p-2">{isFr ? "Tête (cm)" : "Head (cm)"}</th>
                <th className="p-2">{isFr ? "Poids (g)" : "Weight (g)"}</th>
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
          <div className="mt-5 p-4 bg-amber-900/10 rounded-xl border border-amber-900/30 text-sm italic leading-relaxed">
            {isFr ? (
              <>
                <span className="text-amber-500 font-bold not-italic uppercase text-xs tracking-widest">
                  L'épreuve de la balance :
                </span>{" "}
                l'acier allemand d'époque, d'épaisseur constante (1,1-1,2 mm),
                donne une coque nue dans une fourchette générale d'environ
                850 à 1 100 g selon la taille. De nombreuses reproductions
                modernes utilisent un acier d'épaisseur différente, d'où un
                poids sensiblement décalé — un test simple et peu coûteux, à
                utiliser en complément des critères visuels, jamais seul.
              </>
            ) : (
              <>
                <span className="text-amber-500 font-bold not-italic uppercase text-xs tracking-widest">
                  The Scale Test:
                </span>{" "}
                period German steel, of constant thickness (1.1-1.2 mm),
                gives a bare shell in a general range of roughly 850 to
                1,100 g depending on size. Many modern reproductions use
                steel of a different thickness, resulting in a noticeably
                different weight — a simple, low-cost test to use alongside
                visual criteria, never alone.
              </>
            )}
          </div>
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
