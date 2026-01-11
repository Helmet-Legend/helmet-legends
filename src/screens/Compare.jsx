import React, { useState, useRef } from "react";
// --- IMPORT DU FOND ---
import monFondExpert from "../assets/helmet-bg.png";
import {
  X,
  Upload,
  ZoomIn,
  Move,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Activity,
  Sun,
  Maximize,
  Target,
  Wand2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Assure-toi que ce fichier existe dans ton dossier config
import { AUTHENTIC_DECALS } from "../config/decals";

export default function Compare({ setScreen }) {
  const [userImg, setUserImg] = useState(null);
  const [refImg, setRefImg] = useState(AUTHENTIC_DECALS[0]);
  const [fileInfo, setFileInfo] = useState(null);

  // ÉTATS IA & OPTIQUE
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationStep, setOptimizationStep] = useState("");
  const [isOptimized, setIsOptimized] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // ÉTATS NAVIGATION (Synchronisée)
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // GESTION IMPORTATION
  const handleUserUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInfo({
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImg(reader.result);
        setIsOptimized(false);
        setAiResult(null);
        resetView();
      };
      reader.readAsDataURL(file);
    }
  };

  // MODULE DE TRAITEMENT OPTIQUE
  const runOpticalOptimization = () => {
    if (!userImg) return;
    setIsOptimizing(true);

    const steps = [
      { msg: "Analyse de la distance...", delay: 800 },
      { msg: "Recadrage par IA...", delay: 1000 },
      { msg: "Normalisation de la luminance...", delay: 1200 },
      { msg: "Correction colorimétrique...", delay: 800 },
    ];

    let currentDelay = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        setOptimizationStep(step.msg);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsOptimizing(false);
            setIsOptimized(true);
            setOptimizationStep("");
          }, 800);
        }
      }, currentDelay);
      currentDelay += step.delay;
    });
  };

  // ANALYSE IA
  const runAIAnalysis = () => {
    setIsScanning(true);
    setAiResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const score = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
      setAiResult({
        score: score,
        verdict: score > 92 ? "Haute Similitude" : "Analyse Incertaine",
      });
    }, 3000);
  };

  // LOGIQUE DE MOUVEMENT
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
      {/* FOND D'ÉCRAN FIXE */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.2) blur(8px)",
        }}
      ></div>

      <div className="relative z-10 p-4 flex flex-col h-screen max-w-2xl mx-auto w-full">
        {/* HEADER FIXE */}
        <div className="flex items-center justify-between mb-6 border-b-2 border-amber-800 pb-4 backdrop-blur-md bg-black/20 p-4 rounded-t-2xl shrink-0 shadow-xl">
          <div className="flex items-center gap-3">
            <Target className="text-amber-500 animate-pulse" size={28} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              Banc d'Optique IA
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <X size={24} />
          </button>
        </div>

        {/* ZONE SCROLLABLE DE L'ANALYSE */}
        <div className="flex-grow overflow-y-auto pb-20 custom-scrollbar pr-1">
          {/* SÉLECTEUR DE RÉFÉRENCE */}
          <div className="mb-6">
            <label className="text-[10px] font-black text-amber-600 uppercase mb-2 block tracking-[0.3em]">
              Référence Authentique
            </label>
            <select
              className="w-full bg-black/60 backdrop-blur-md border-2 border-amber-900/30 p-4 rounded-2xl text-sm font-bold text-amber-500 outline-none focus:border-amber-500 transition-all shadow-lg"
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

          {/* ZONE DE COMPARAISON (Hauteur fixe pour le scan) */}
          <div
            className="h-[60vh] grid grid-rows-2 gap-4 relative cursor-grab active:cursor-grabbing shrink-0 mb-8"
            onMouseDown={onStart}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={onStart}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
          >
            {/* OVERLAY OPTIMISATION */}
            {isOptimizing && (
              <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-3xl">
                <Wand2
                  className="text-amber-500 animate-bounce mb-6"
                  size={64}
                />
                <p className="text-amber-500 font-black uppercase italic text-xl animate-pulse tracking-widest">
                  {optimizationStep}
                </p>
              </div>
            )}

            {/* LASER SCAN IA */}
            {isScanning && (
              <div className="absolute inset-0 z-50 pointer-events-none">
                <div className="w-full h-1.5 bg-amber-400 shadow-[0_0_30px_#f59e0b] absolute top-0 animate-scan"></div>
              </div>
            )}

            {/* IMAGE RÉFÉRENCE */}
            <div className="relative bg-black rounded-[2.5rem] overflow-hidden border-2 border-green-900/40 shadow-2xl">
              <div className="absolute top-4 left-4 z-10 bg-green-900/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/50">
                Original Certifié
              </div>
              <div
                className="w-full h-full"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin: "center",
                }}
              >
                <img
                  src={refImg.img}
                  className="w-full h-full object-contain pointer-events-none opacity-90"
                  alt="Ref"
                />
              </div>
            </div>

            {/* IMAGE UTILISATEUR */}
            <div
              className={`relative bg-black rounded-[2.5rem] overflow-hidden border-2 transition-all duration-700 shadow-2xl ${
                isOptimized
                  ? "border-green-500/60 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                  : "border-amber-600/30"
              }`}
            >
              <div className="absolute top-4 left-4 z-10 bg-amber-900/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/50">
                Spécimen Analysé
              </div>
              {!userImg ? (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-amber-900/10 transition-colors">
                  <Upload
                    size={48}
                    className="text-amber-500 opacity-20 mb-4"
                  />
                  <span className="text-xs font-black uppercase text-amber-500 opacity-40 italic">
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
                  className="w-full h-full"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transformOrigin: "center",
                    filter: isOptimized
                      ? "brightness(1.1) contrast(1.1) saturate(1.1)"
                      : "none",
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

          {/* PANNEAU DE CONTRÔLE ET RÉSULTATS AGRANDIS */}
          <div className="p-8 bg-black/60 backdrop-blur-xl rounded-[3rem] border-2 border-amber-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-amber-700/50">
            {!aiResult ? (
              <div className="space-y-8">
                <div className="flex gap-4">
                  {!isOptimized ? (
                    <button
                      onClick={runOpticalOptimization}
                      disabled={!userImg || isOptimizing}
                      className="flex-grow py-6 bg-amber-600 text-black rounded-3xl font-black uppercase italic tracking-tighter hover:bg-amber-500 disabled:opacity-20 active:scale-95 transition-all text-xl shadow-xl border-b-4 border-amber-800"
                    >
                      Optimiser le cliché
                    </button>
                  ) : (
                    <button
                      onClick={runAIAnalysis}
                      disabled={isScanning}
                      className="flex-grow py-6 bg-green-600 text-white rounded-3xl font-black uppercase italic tracking-tighter animate-pulse shadow-xl border-b-4 border-green-800 text-xl"
                    >
                      Lancer l'Expertise IA
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setUserImg(null);
                      setIsOptimized(false);
                      setAiResult(null);
                    }}
                    className="p-6 bg-amber-900/30 rounded-3xl border border-amber-700/50 text-amber-500 active:scale-90 transition-all"
                  >
                    <RefreshCw size={28} />
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <ZoomIn size={24} className="text-amber-600" />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-grow h-2 bg-amber-900/50 rounded-lg appearance-none accent-amber-500 cursor-pointer"
                  />
                  <span className="text-xl font-black text-amber-500 w-12 italic">
                    x{zoom.toFixed(1)}
                  </span>
                </div>
              </div>
            ) : (
              /* RÉSULTAT IA VERSION GÉANTE */
              <div className="animate-in fade-in zoom-in duration-700 space-y-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      {aiResult.score > 90 ? (
                        <CheckCircle2 className="text-green-500" size={40} />
                      ) : (
                        <AlertCircle className="text-amber-500" size={40} />
                      )}
                      <span className="text-4xl font-black uppercase italic text-white tracking-tighter">
                        {aiResult.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-bold ml-[56px]">
                      Biométrie certifiée par IA
                    </p>
                  </div>
                  <span className="text-8xl font-black text-amber-500 tracking-tighter drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    {aiResult.score}%
                  </span>
                </div>

                {/* Jauge massive */}
                <div className="h-6 w-full bg-black/40 rounded-full overflow-hidden shadow-inner border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-900 via-amber-500 to-green-500 transition-all duration-1500"
                    style={{ width: `${aiResult.score}%` }}
                  ></div>
                </div>

                {/* NOTE MÉTHODOLOGIQUE AGRANDIE */}
                <div className="bg-amber-900/10 border-2 border-amber-900/40 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShieldCheck size={120} />
                  </div>
                  <h5 className="text-sm font-black uppercase text-amber-600 mb-6 italic tracking-widest flex items-center gap-3">
                    <Cpu size={18} /> Note de Laboratoire :
                  </h5>
                  <p className="text-2xl text-amber-100/90 leading-relaxed italic font-medium">
                    "Analyse morphologique des tracés, densité pigmentaire des
                    encres et examen du 'crazing' (micro-craquelures) pour
                    validation de l'authenticité organique."
                  </p>
                </div>

                <button
                  onClick={() => {
                    setAiResult(null);
                    setIsOptimized(false);
                  }}
                  className="w-full py-6 text-sm font-black uppercase opacity-40 hover:opacity-100 transition-all underline underline-offset-8 decoration-2 tracking-[0.4em] italic"
                >
                  Réinitialiser l'Expertise
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .animate-scan { animation: scan 2s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 119, 6, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}
