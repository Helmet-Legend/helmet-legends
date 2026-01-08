import React, { useState, useRef } from "react";
import { X, Upload, ZoomIn, Move } from "lucide-react";
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
    <div className="p-4 h-screen flex flex-col bg-[#1a1812] text-[#d0c7a8] select-none touch-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-[#8a7f5d] pb-2">
        <h2 className="text-sm font-black uppercase italic tracking-tighter">
          Comparateur Synchronisé
        </h2>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-[#3a3832] rounded-full"
        >
          <X size={16} />
        </button>
      </div>

      {/* Sélecteur */}
      <select
        className="mb-4 w-full bg-[#2a2822] border border-[#3a3832] p-2 rounded-lg text-[10px] font-bold text-amber-500 outline-none"
        onChange={(e) =>
          setRefImg(AUTHENTIC_DECALS.find((d) => d.id === e.target.value))
        }
      >
        {AUTHENTIC_DECALS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* ZONE DE COMPARAISON (Double écran) */}
      <div
        className="flex-grow grid grid-rows-2 gap-2 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      >
        {/* IMAGE 1 : RÉFÉRENCE */}
        <div className="relative bg-black rounded-xl overflow-hidden border border-[#3a3832]">
          <div className="absolute top-2 left-2 z-10 bg-green-900/80 px-2 py-0.5 rounded text-[8px] font-black uppercase">
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
        <div className="relative bg-black rounded-xl overflow-hidden border border-amber-600/50">
          <div className="absolute top-2 left-2 z-10 bg-amber-900/80 px-2 py-0.5 rounded text-[8px] font-black uppercase">
            Votre Photo
          </div>

          {!userImg ? (
            <label className="flex flex-col items-center justify-center h-full cursor-pointer">
              <Upload size={24} className="opacity-20 mb-2" />
              <span className="text-[8px] uppercase font-black opacity-40">
                Charger l'insigne
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

      {/* CONTRÔLES DE ZOOM SYNCHRONISÉS */}
      <div className="mt-4 p-4 bg-[#2a2822] rounded-2xl border border-[#3a3832] space-y-4">
        <div className="flex items-center gap-4">
          <ZoomIn size={16} className="opacity-40" />
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-grow accent-amber-600"
          />
          <span className="text-[10px] font-black w-8 text-amber-500">
            x{zoom.toFixed(1)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[8px] uppercase font-bold opacity-30 flex items-center gap-1">
            <Move size={10} /> Glissez pour déplacer les deux images
          </p>
          <button
            onClick={resetView}
            className="text-[8px] uppercase font-black bg-[#3a3832] px-3 py-1 rounded-lg border border-[#5a523d]"
          >
            Réinitialiser la vue
          </button>
        </div>
      </div>
    </div>
  );
}
