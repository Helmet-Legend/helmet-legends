import React from "react";
import { X } from "lucide-react";
import { translations } from "../data/translations"; // Import des traductions

export default function Stats({ setScreen, stats, total, lang }) {
  // Accès aux textes traduits
  const t = translations[lang].stats;

  return (
    <div className="p-6 h-screen bg-[#2a2822] text-[#d0c7a8]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase">{t.title}</h2>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-[#3a3832] rounded-full active:scale-90 transition-transform"
        >
          <X />
        </button>
      </div>

      <div className="space-y-8">
        {/* Affichage dynamique des barres de statistiques */}
        {Object.entries(stats).map(([label, count]) => (
          <div
            key={label}
            className="bg-[#1a1812] p-4 rounded-xl border border-[#3a3832] shadow-lg"
          >
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-black uppercase tracking-widest">
                {/* Traduction automatique de "Inconnu" si présent dans les stats */}
                {label === "Inconnu" && lang === "en" ? "Unknown" : label}
              </span>
              <span className="text-amber-600 font-black">{count}</span>
            </div>

            {/* Barre de progression */}
            <div className="w-full h-3 bg-black rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all duration-1000 ease-out"
                style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        ))}

        {/* Résumé du total en bas */}
        <div className="pt-10 text-center opacity-30 italic text-sm">
          {lang === "fr"
            ? `Total enregistré : ${total} pièces`
            : `Total registered: ${total} items`}
        </div>
      </div>
    </div>
  );
}
