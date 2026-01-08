import React, { useState } from "react";
import { Search, X, Trash2, Shield, Plus } from "lucide-react";

export default function Registry({
  setScreen,
  collection,
  remove,
  setSelectedHelmet,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = collection.filter(
    (h) =>
      h.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 h-screen overflow-y-auto pb-20 bg-[#2a2822] text-[#d0c7a8]">
      <div className="flex justify-between items-center mb-6 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase">Registre</h2>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-[#3a3832] rounded-full"
        >
          <X />
        </button>
      </div>

      <button
        onClick={() => {
          setSelectedHelmet(null);
          setScreen("add");
        }}
        className="w-full bg-amber-700/30 border-2 border-amber-600 p-4 rounded-xl text-amber-500 font-black uppercase text-xs mb-8 active:scale-95 transition-all"
      >
        + Ajouter une pièce
      </button>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full bg-[#1a1812] border border-[#3a3832] p-3 pl-10 rounded-xl text-xs outline-none focus:border-amber-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3 opacity-30" size={16} />
      </div>

      <div className="grid gap-4">
        {filtered.map((h) => (
          <div
            key={h.id}
            onClick={() => {
              setSelectedHelmet(h);
              setScreen("details");
            }}
            className="bg-[#1a1812] border border-[#3a3832] p-3 rounded-xl flex items-center gap-4 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex-grow">
              <p className="text-amber-600 font-black italic uppercase">
                {h.model}
              </p>
              <p className="text-[10px] opacity-50 uppercase">
                {h.manufacturer} | {h.lotNumber}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                remove(h.id);
              }}
              className="text-gray-600 hover:text-red-500 p-2"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
