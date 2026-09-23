import React from "react";
import { ArrowLeft, Link2, Facebook, Globe, ExternalLink } from "lucide-react";
import { translations } from "../data/translations";

// Ajoute une entrée ici pour chaque nouveau lien externe utile.
const USEFUL_LINKS = [
  {
    id: "facebook",
    icon: Facebook,
    url: "https://www.facebook.com/helmetlegends",
    labelKey: "facebook",
    descKey: "facebookDesc",
  },
  {
    id: "germanHelmetVault",
    icon: Globe,
    url: "https://germanhelmetvault.com/",
    labelKey: "germanHelmetVault",
    descKey: "germanHelmetVaultDesc",
  },
  {
    id: "germanWW2Helmet",
    icon: Globe,
    url: "https://german-ww2-helmet.com/",
    labelKey: "germanWW2Helmet",
    descKey: "germanWW2HelmetDesc",
  },
  {
    id: "passionMilitaria",
    icon: Globe,
    url: "https://www.passionmilitaria.com/",
    labelKey: "passionMilitaria",
    descKey: "passionMilitariaDesc",
  },
  {
    id: "germanHelmetWalhalla",
    icon: Globe,
    url: "https://www.germanhelmetwalhalla.com/",
    labelKey: "germanHelmetWalhalla",
    descKey: "germanHelmetWalhallaDesc",
  },
  {
    id: "warHats",
    icon: Globe,
    url: "https://warhats.com/",
    labelKey: "warHats",
    descKey: "warHatsDesc",
  },
];

export default function Links({ setScreen, lang = "fr" }) {
  const t = (translations[lang] || translations["fr"]).links;
  const isFr = lang === "fr";

  return (
    <div className="h-screen overflow-y-auto bg-[#1a1812] text-[#d0c7a8] font-serif relative">
      <div className="relative z-10 p-4 md:p-8 pb-32 max-w-2xl mx-auto">
        <div className="sticky top-0 z-20 flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <Link2 className="text-amber-500" size={28} />
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
              {t.title}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 hover:bg-amber-600 hover:text-black transition-all"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {USEFUL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-black/60 backdrop-blur-lg border border-amber-900/30 rounded-2xl p-5 hover:border-amber-500/50 transition-all duration-300 shadow-xl"
              >
                <div className="p-3 bg-amber-900/20 rounded-xl border border-amber-900/40 text-amber-500 flex-shrink-0">
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black uppercase tracking-wide text-[#f0ede0]">
                    {t[link.labelKey]}
                  </p>
                  <p className="text-xs italic opacity-60 truncate">
                    {t[link.descKey]}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-amber-700 group-hover:text-amber-400 transition-colors flex-shrink-0"
                />
              </a>
            );
          })}

          {USEFUL_LINKS.length === 0 && (
            <p className="text-center text-sm italic opacity-40 py-10">
              {isFr ? "Aucun lien pour le moment." : "No links yet."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
