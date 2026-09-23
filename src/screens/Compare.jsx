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
  Clock,
  ArrowLeft,
} from "lucide-react";

// Assure-toi que ce fichier existe dans ton dossier config
import { AUTHENTIC_DECALS } from "../config/decals";
import { COMPARATOR_ENABLED } from "../config/features";

// Taille de la grille utilisée pour la comparaison structurelle (SSIM)
const SAMPLE_SIZE = 48;

// Applique un étirement de contraste réel (min-max) à une image, en se
// basant sur sa luminance — corrige les écarts d'exposition entre la
// photo de l'utilisateur et la référence en studio.
const applyAutoContrast = (dataUrl) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = imageData.data;
        let min = 255;
        let max = 0;
        for (let i = 0; i < px.length; i += 4) {
          const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
          if (lum < min) min = lum;
          if (lum > max) max = lum;
        }
        const range = Math.max(max - min, 1);
        for (let i = 0; i < px.length; i += 4) {
          for (let c = 0; c < 3; c++) {
            px[i + c] = Math.min(
              255,
              Math.max(0, ((px[i + c] - min) / range) * 255)
            );
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      } catch (e) {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });

// Extrait, dans une petite grille NxN, exactement la zone actuellement
// visible à l'écran (celle que l'utilisateur a cadrée/zoomée), en
// recalculant l'inverse de la mise en page "object-contain" + du zoom/pan
// partagé entre les deux images.
const extractVisibleCrop = (boxEl, imgEl, zoom, position) => {
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!boxEl || !imgEl || !imgEl.naturalWidth) return canvas;

  const cw = boxEl.clientWidth;
  const ch = boxEl.clientHeight;
  const iw = imgEl.naturalWidth;
  const ih = imgEl.naturalHeight;
  if (!cw || !ch) return canvas;

  const s = Math.min(cw / iw, ch / ih);
  const fx = (cw - iw * s) / 2;
  const fy = (ch - ih * s) / 2;
  const ccx = cw / 2;
  const ccy = ch / 2;

  const toSource = (screenX, screenY) => {
    const localX = ccx + (screenX - ccx - position.x) / zoom;
    const localY = ccy + (screenY - ccy - position.y) / zoom;
    return { x: (localX - fx) / s, y: (localY - fy) / s };
  };

  const p0 = toSource(0, 0);
  const p1 = toSource(cw, ch);

  const sx = Math.max(0, Math.min(p0.x, p1.x));
  const sy = Math.max(0, Math.min(p0.y, p1.y));
  const sw = Math.min(iw - sx, Math.abs(p1.x - p0.x));
  const sh = Math.min(ih - sy, Math.abs(p1.y - p0.y));
  if (sw <= 0 || sh <= 0) return canvas;

  ctx.drawImage(imgEl, sx, sy, sw, sh, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  return canvas;
};

const toGrayscaleArray = (canvas) => {
  const ctx = canvas.getContext("2d");
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const gray = new Float64Array(canvas.width * canvas.height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return gray;
};

// Indice de similarité structurelle (SSIM), calculé globalement sur la
// grille échantillonnée — même métrique que celle utilisée pour comparer
// des images en traitement du signal. 1 = identique, 0 = sans rapport.
const computeSSIM = (a, b) => {
  const n = a.length;
  let meanA = 0;
  let meanB = 0;
  for (let i = 0; i < n; i++) {
    meanA += a[i];
    meanB += b[i];
  }
  meanA /= n;
  meanB /= n;

  let varA = 0;
  let varB = 0;
  let covAB = 0;
  for (let i = 0; i < n; i++) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    varA += da * da;
    varB += db * db;
    covAB += da * db;
  }
  varA /= n - 1;
  varB /= n - 1;
  covAB /= n - 1;

  const C1 = (0.01 * 255) ** 2;
  const C2 = (0.03 * 255) ** 2;
  const ssim =
    ((2 * meanA * meanB + C1) * (2 * covAB + C2)) /
    ((meanA ** 2 + meanB ** 2 + C1) * (varA + varB + C2));

  return Math.max(0, Math.min(1, ssim));
};

export default function Compare({ setScreen, lang }) {
  const isFr = lang === "fr";
  const [userImg, setUserImg] = useState(null);
  const [refImg, setRefImg] = useState(AUTHENTIC_DECALS[0]);
  const [fileInfo, setFileInfo] = useState(null);

  // ÉTATS DE COMPARAISON
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

  // RÉFÉRENCES DOM (pour extraire la zone actuellement cadrée)
  const refBoxRef = useRef(null);
  const refImgElRef = useRef(null);
  const userBoxRef = useRef(null);
  const userImgElRef = useRef(null);

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

  // NORMALISATION DE L'IMAGE (étirement de contraste réel)
  const runOpticalOptimization = () => {
    if (!userImg) return;
    setIsOptimizing(true);
    setOptimizationStep(isFr ? "Lecture de l'image..." : "Reading image...");

    setTimeout(() => {
      setOptimizationStep(
        isFr ? "Normalisation du contraste..." : "Normalizing contrast..."
      );
      applyAutoContrast(userImg).then((enhanced) => {
        setUserImg(enhanced);
        setTimeout(() => {
          setIsOptimizing(false);
          setIsOptimized(true);
          setOptimizationStep("");
        }, 300);
      });
    }, 300);
  };

  // COMPARAISON STRUCTURELLE (SSIM, calculée localement — aucun serveur)
  const runAIAnalysis = () => {
    if (!userImg) return;
    setIsScanning(true);
    setAiResult(null);

    // Court délai purement visuel (animation de scan) ; le calcul lui-même
    // est quasi instantané.
    setTimeout(() => {
      const refCanvas = extractVisibleCrop(
        refBoxRef.current,
        refImgElRef.current,
        zoom,
        position
      );
      const userCanvas = extractVisibleCrop(
        userBoxRef.current,
        userImgElRef.current,
        zoom,
        position
      );
      const score = Math.round(
        computeSSIM(toGrayscaleArray(refCanvas), toGrayscaleArray(userCanvas)) *
          100
      );
      setIsScanning(false);
      setAiResult({
        score,
        verdict:
          score >= 75
            ? isFr
              ? "Similitude élevée"
              : "High similarity"
            : score >= 50
            ? isFr
              ? "Similitude modérée"
              : "Moderate similarity"
            : isFr
            ? "Similitude faible"
            : "Low similarity",
      });
    }, 700);
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

  if (!COMPARATOR_ENABLED) {
    return (
      <div
        className="h-screen overflow-y-auto bg-[#1a1812] font-serif text-[#d0c7a8] relative flex flex-col items-center justify-center p-6 text-center"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-sm">
          <Clock size={48} className="mx-auto mb-4 text-amber-500 opacity-70" />
          <h2 className="text-lg font-black uppercase italic tracking-tighter text-[#f0ede0] mb-3">
            {isFr ? "Comparateur temporairement suspendu" : "Comparator temporarily suspended"}
          </h2>
          <p className="text-xs italic opacity-70 leading-relaxed mb-8">
            {isFr
              ? "Les photos de référence utilisées par cet outil proviennent de sources externes dont nous clarifions actuellement les droits d'usage. Le comparateur sera réactivé dès que ce point sera réglé."
              : "The reference photos used by this tool come from external sources whose usage rights we're currently clarifying. The comparator will be reactivated once this is resolved."}
          </p>
          <button
            onClick={() => setScreen("home")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 hover:bg-amber-600 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            {isFr ? "Retour à l'accueil" : "Back to home"}
          </button>
        </div>
      </div>
    );
  }

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
              {isFr ? "Banc d'Optique" : "Optical Bench"}
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
              {isFr ? "Référence Authentique" : "Authentic Reference"}
            </label>
            <select
              className="w-full bg-black/60 backdrop-blur-md border-2 border-amber-900/30 p-4 rounded-2xl text-sm font-bold text-amber-500 outline-none focus:border-amber-500 transition-all shadow-lg"
              onChange={(e) =>
                setRefImg(AUTHENTIC_DECALS.find((d) => d.id === e.target.value))
              }
            >
              {AUTHENTIC_DECALS.map((d) => (
                <option key={d.id} value={d.id}>
                  {(isFr ? d.name : d.nameEn || d.name).toUpperCase()}
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
            {/* OVERLAY NORMALISATION */}
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

            {/* SCAN VISUEL (animation) */}
            {isScanning && (
              <div className="absolute inset-0 z-50 pointer-events-none">
                <div className="w-full h-1.5 bg-amber-400 shadow-[0_0_30px_#f59e0b] absolute top-0 animate-scan"></div>
              </div>
            )}

            {/* IMAGE RÉFÉRENCE */}
            <div
              ref={refBoxRef}
              className="relative bg-black rounded-[2.5rem] overflow-hidden border-2 border-green-900/40 shadow-2xl"
            >
              <div className="absolute top-4 left-4 z-10 bg-green-900/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/50">
                {isFr ? "Référence" : "Reference"}
              </div>
              <div
                className="w-full h-full"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin: "center",
                }}
              >
                <img
                  ref={refImgElRef}
                  src={refImg.img}
                  crossOrigin="anonymous"
                  className="w-full h-full object-contain pointer-events-none opacity-90"
                  alt="Ref"
                />
              </div>
            </div>

            {/* IMAGE UTILISATEUR */}
            <div
              ref={userBoxRef}
              className={`relative bg-black rounded-[2.5rem] overflow-hidden border-2 transition-all duration-700 shadow-2xl ${
                isOptimized
                  ? "border-green-500/60 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                  : "border-amber-600/30"
              }`}
            >
              <div className="absolute top-4 left-4 z-10 bg-amber-900/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/50">
                {isFr ? "Votre Photo" : "Your Photo"}
              </div>
              {!userImg ? (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-amber-900/10 transition-colors">
                  <Upload
                    size={48}
                    className="text-amber-500 opacity-20 mb-4"
                  />
                  <span className="text-xs font-black uppercase text-amber-500 opacity-40 italic">
                    {isFr ? "Charger l'insigne" : "Upload the insignia"}
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
                  }}
                >
                  <img
                    ref={userImgElRef}
                    src={userImg}
                    crossOrigin="anonymous"
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
                      {isFr ? "Normaliser le contraste" : "Normalize contrast"}
                    </button>
                  ) : (
                    <button
                      onClick={runAIAnalysis}
                      disabled={isScanning}
                      className="flex-grow py-6 bg-green-600 text-white rounded-3xl font-black uppercase italic tracking-tighter animate-pulse shadow-xl border-b-4 border-green-800 text-xl"
                    >
                      {isFr ? "Comparer les deux images" : "Compare both images"}
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
              /* RÉSULTAT DE LA COMPARAISON */
              <div className="animate-in fade-in zoom-in duration-700 space-y-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      {aiResult.score >= 75 ? (
                        <CheckCircle2 className="text-green-500" size={40} />
                      ) : (
                        <AlertCircle className="text-amber-500" size={40} />
                      )}
                      <span className="text-4xl font-black uppercase italic text-white tracking-tighter">
                        {aiResult.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-bold ml-[56px]">
                      {isFr
                        ? "Similarité visuelle calculée"
                        : "Computed visual similarity"}
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

                {/* NOTE MÉTHODOLOGIQUE */}
                <div className="bg-amber-900/10 border-2 border-amber-900/40 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShieldCheck size={120} />
                  </div>
                  <h5 className="text-sm font-black uppercase text-amber-600 mb-6 italic tracking-widest flex items-center gap-3">
                    <Cpu size={18} /> {isFr ? "Méthode :" : "Method:"}
                  </h5>
                  <p className="text-2xl text-amber-100/90 leading-relaxed italic font-medium">
                    {isFr
                      ? "Comparaison structurelle (SSIM) entre la zone actuellement cadrée de la référence et celle de votre photo. Ceci est une aide visuelle et ne constitue en aucun cas une certification d'authenticité — seule une expertise physique fait foi."
                      : "Structural comparison (SSIM) between the currently framed area of the reference and that of your photo. This is a visual aid and does not constitute a certification of authenticity in any way — only a physical expert appraisal is conclusive."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setAiResult(null);
                    setIsOptimized(false);
                  }}
                  className="w-full py-6 text-sm font-black uppercase opacity-40 hover:opacity-100 transition-all underline underline-offset-8 decoration-2 tracking-[0.4em] italic"
                >
                  {isFr ? "Réinitialiser la comparaison" : "Reset comparison"}
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
