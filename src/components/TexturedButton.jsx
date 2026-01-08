import React from "react";

export const TexturedButton = ({ icon, label, onClick, variant = "gold" }) => (
  <button
    onClick={onClick}
    className="w-full group relative active:scale-95 transition-all outline-none"
  >
    <div className="absolute inset-0 bg-black/40 rounded-xl translate-y-1"></div>
    <div
      className={`relative p-4 rounded-xl border-2 flex items-center justify-center gap-3 overflow-hidden shadow-inner
      ${
        variant === "gold"
          ? "bg-[#d0c7a8] border-[#8a7f5d] text-[#2a2822]"
          : "bg-[#3a3832] border-[#5a523d] text-[#d0c7a8]"
      }`}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rough-cloth.png')] opacity-20 pointer-events-none"></div>
      {icon}
      <span className="font-black tracking-widest text-xs uppercase">
        {label}
      </span>
    </div>
  </button>
);
