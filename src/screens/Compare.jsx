import React, { useState, useRef } from "react";
// --- IMPORT DU FOND ---
import monFondExpert from "../assets/helmet-bg.png";
import { X, Upload, ZoomIn, Move, ShieldCheck, RefreshCw } from "lucide-react";
import { AUTHENTIC_DECALS } from "../config/decals";

export default function Compare({ setScreen }) {
  const [userImg, setUserImg] = useState(null);
  const [refImg, setRefImg] = useState(AUTHENTIC_DECALS[0]);

  // ÉTATS DE SYNCHRONISATION
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleUserUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // LOGIQUE DE DÉPLACEMENT SYNCHRONISÉ
  const onStart = (e) => {
    isDragging.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const onMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - startPos.current.x,
      y: clientY - startPos.current.y,
    });
  };

  const onEnd = () => {
    isDragging.current = false;
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative overflow-hidden flex flex-col select-none touch-none">
      {/* BACKGROUND (FLOU 5px) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.2) blur(5px)",
        }}
      ></div>

      <div className="relative z-10 p-4 h-screen flex flex-col max-w-2xl mx-auto w-full">
        {/* HEADER STYLE "LABO" */}
        <div className="flex items-center justify-between mb-4 border-b-2 border-amber-800 pb-4 backdrop-blur-md bg-black/20 p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-amber-500" size={24} />
            <h2 className="text-xl font-black uppercase italic tracking-tighter">
              Comparateur Macro
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
        </div>

        {/* SÉLECTEUR DE RÉFÉRENCE STYLE "DROPDOWN TECHNIQUE" */}
        <div className="mb-4">
          <label className="text-[10px] font-black text-amber-600 uppercase mb-1 block tracking-widest">
            Insigne de Référence (Original HD)
          </label>
          <select
            className="w-full bg-black/60 backdrop-blur-md border-2 border-amber-900/30 p-3 rounded-xl text-xs font-bold text-amber-500 outline-none focus:border-amber-500 transition-colors cursor-pointer"
            onChange={(e) =>
              setRefImg(AUTHENTIC_DECALS.find((d) => d.id === e.target.value))
            }
          >
            {AUTHENTIC_DECALS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* ZONE DE COMPARAISON (Double écran synchronisé) */}
        <div
          className="flex-grow grid grid-rows-2 gap-3 overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={onStart}
          onMouseMove={onMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
        >
          {/* IMAGE 1 : RÉFÉRENCE */}
          <div className="relative bg-black/80 rounded-3xl overflow-hidden border-2 border-green-900/40 shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-green-900/80 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/50">
              Original Certifié
            </div>
            <div
              className="w-full h-full transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: "center",
              }}
            >
              <img
                src={refImg.img}
                className="w-full h-full object-contain pointer-events-none"
                alt="Ref"
              />
            </div>
          </div>

          {/* IMAGE 2 : UTILISATEUR */}
          <div className="relative bg-black/80 rounded-3xl overflow-hidden border-2 border-amber-600/30 shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-amber-900/80 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/50">
              Votre Analyse
            </div>

            {!userImg ? (
              <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-amber-900/10 transition-colors group">
                <Upload
                  size={40}
                  className="text-amber-500 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all mb-4"
                />
                <span className="text-[10px] uppercase font-black text-amber-500 opacity-40 group-hover:opacity-100">
                  Charger l'insigne à expertiser
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUserUpload}
                />
              </label>
            ) : (
              <div
                className="w-full h-full transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin: "center",
                }}
              >
                <img
                  src={userImg}
                  className="w-full h-full object-contain pointer-events-none"
                  alt="User"
                />
              </div>
            )}
          </div>
        </div>

        {/* CONTRÔLES DE ZOOM STYLE "CONSOLES" */}
        <div className="mt-4 p-5 bg-black/60 backdrop-blur-xl rounded-[2rem] border-2 border-amber-900/20 space-y-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <ZoomIn size={20} className="text-amber-500" />
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-grow h-1 bg-amber-900/50 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-xs font-black w-10 text-amber-500 italic">
              x{zoom.toFixed(1)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 opacity-50">
              <Move size={14} className="text-amber-500" />
              <p className="text-[9px] uppercase font-bold tracking-widest">
                Navigation synchronisée activée
              </p>
            </div>
            <button
              onClick={resetView}
              className="flex items-center gap-2 text-[10px] font-black uppercase bg-amber-900/30 px-4 py-2 rounded-xl border border-amber-700/50 hover:bg-amber-600 hover:text-black transition-all active:scale-95"
            >
              <RefreshCw size={12} /> Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
