import React from "react";
import { X } from "lucide-react";

export default function Stats({ setScreen, stats, total }) {
  return (
    <div className="p-6 h-screen bg-[#2a2822] text-[#d0c7a8]">
      <div className="flex justify-between items-center mb-10 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase">Statistiques</h2>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-[#3a3832] rounded-full"
        >
          <X />
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(stats).map(([label, count]) => (
          <div
            key={label}
            className="bg-[#1a1812] p-4 rounded-xl border border-[#3a3832]"
          >
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-black uppercase tracking-widest">
                {label}
              </span>
              <span className="text-amber-600 font-black">{count}</span>
            </div>
            <div className="w-full h-3 bg-black rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all duration-1000"
                style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        ))}
        <div className="pt-10 text-center opacity-30 italic text-sm">
          Total enregistré : {total} pièces
        </div>
      </div>
    </div>
  );
}
