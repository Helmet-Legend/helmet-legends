import React from "react";
import {
  ChevronLeft,
  Edit3,
  Download,
  Printer,
  ShieldCheck,
  HardHat,
} from "lucide-react";
import { translations } from "../data/translations";

const generateHelmetPDF = (helmet, lang) => {
  const isFr = lang === "fr";
  const photos = [
    helmet.image_url_main,
    helmet.image_url_front,
    helmet.image_url_left,
    helmet.image_url_right,
    helmet.image_url_interior,
  ].filter(Boolean);

  const photoHTML = photos
    .map(
      (url) => `
    <img src="${url}" style="width:180px;height:140px;object-fit:cover;border-radius:8px;border:1px solid #8a7f5d;" />
  `
    )
    .join("");

  const win = window.open("", "_blank");
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Helmet Legends - ${helmet.model}</title>
      <style>
        body { font-family: Georgia, serif; background: #1a1812; color: #d0c7a8; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { color: #f0ede0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; }
        .subtitle { color: #d97706; font-size: 11px; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 32px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .field { background: #2a2822; padding: 12px 16px; border-radius: 8px; border: 1px solid #3a3832; }
        .field-label { font-size: 9px; text-transform: uppercase; color: #6b7280; font-weight: bold; margin-bottom: 4px; }
        .field-value { color: #d97706; font-weight: bold; font-size: 14px; }
        .photos { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }
        .expertise { background: #2a2822; border: 1px solid #3a3832; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
        .expertise-title { color: #d97706; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 12px; }
        .footer { text-align: center; font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 2px; margin-top: 40px; border-top: 1px solid #3a3832; padding-top: 16px; }
        @media print { body { background: white; color: black; } .field { background: #f9f9f9; } }
      </style>
    </head>
    <body>
      <h1>${helmet.model || "Modèle Inconnu"}</h1>
      <p class="subtitle">Helmet Legends · ${
        isFr ? "Certificat d'Archive" : "Archive Certificate"
      }</p>

      <div class="grid">
        <div class="field">
          <div class="field-label">${isFr ? "Fabricant" : "Manufacturer"}</div>
          <div class="field-value">${helmet.manufacturer || "N/A"}</div>
        </div>
        <div class="field">
          <div class="field-label">${
            isFr ? "Numéro de Lot" : "Lot Number"
          }</div>
          <div class="field-value">${helmet.lot_number || "N/A"}</div>
        </div>
        <div class="field">
          <div class="field-label">${isFr ? "Taille Coque" : "Shell Size"}</div>
          <div class="field-value">${helmet.shell_size || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">${
            isFr ? "Taille Coiffe" : "Liner Size"
          }</div>
          <div class="field-value">${helmet.liner_size || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">${
            isFr ? "État Peinture" : "Paint Condition"
          }</div>
          <div class="field-value">${helmet.paint_condition || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">${isFr ? "Insignes" : "Decals"}</div>
          <div class="field-value">${helmet.decals || "-"}</div>
        </div>
      </div>

      ${photos.length > 0 ? `<div class="photos">${photoHTML}</div>` : ""}

      <div class="expertise">
        <div class="expertise-title">⚔ ${
          isFr ? "Expertise & Historique" : "Expertise & History"
        }</div>
        <p style="font-style:italic;font-size:13px;line-height:1.7;">${
          helmet.expertise_message || ""
        }</p>
        ${
          helmet.description
            ? `<p style="font-size:12px;margin-top:12px;opacity:0.8;">${helmet.description}</p>`
            : ""
        }
      </div>

      <div class="footer">
        Helmet Legends · ${
          isFr ? "Base de données certifiée" : "Certified database"
        } · ${new Date().toLocaleDateString()}
      </div>

      <script>window.onload = () => { window.print(); }</script>
    </body>
    </html>
  `);
  win.document.close();
};

export default function Details({ setScreen, helmet, onEdit, lang }) {
  const labels = translations[lang]?.add || {};
  const isFr = lang === "fr";

  if (!helmet) return null;

  // Lit les URLs directement depuis le format Supabase (snake_case)
  const photos = [
    { id: "main", url: helmet.image_url_main },
    { id: "front", url: helmet.image_url_front },
    { id: "left", url: helmet.image_url_left },
    { id: "right", url: helmet.image_url_right },
    { id: "interior", url: helmet.image_url_interior },
  ].filter((p) => p.url);

  return (
    <div className="min-h-screen bg-[#1a1812] font-serif text-[#d0c7a8] relative">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-30 p-4 md:p-6 flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-amber-900/20">
        <button
          onClick={() => setScreen("registry")}
          className="p-2 bg-[#2a2822] rounded-full border border-[#3a3832] hover:bg-amber-900 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-black italic uppercase text-[#f0ede0] leading-none">
            {helmet.model}
          </h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 font-bold">
            {isFr ? "Fiche Technique" : "Technical Sheet"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-amber-600 rounded-full text-[#1a1812] shadow-lg hover:scale-105 transition-transform"
          >
            <Edit3 size={20} />
          </button>
          <button
            onClick={() => generateHelmetPDF(helmet, lang)}
            className="p-2 bg-amber-800 rounded-full text-[#f0ede0] shadow-lg hover:scale-105 transition-transform"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-88px)]">
        {/* Galerie Photo */}
        <div className="w-full lg:w-1/2 bg-black flex items-center justify-center relative h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-amber-900/30">
          <div className="flex overflow-x-auto snap-x snap-mandatory h-full w-full no-scrollbar">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4"
                >
                  <img
                    src={photo.url}
                    alt={photo.id}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/60 backdrop-blur-sm border border-amber-900/30 rounded-full text-[9px] uppercase font-black tracking-widest text-amber-500">
                    {isFr ? "Vue" : "View"} : {photo.id}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
                <HardHat size={64} />
                <p className="mt-4 uppercase font-black tracking-widest text-xs">
                  {isFr ? "Aucun visuel" : "No visuals"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Informations */}
        <div className="w-full lg:w-1/2 bg-[#2a2822] p-6 lg:p-12 lg:overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-[#1a1812] rounded-xl border border-amber-900/20">
              <p className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-tighter">
                {labels.labelFactory}
              </p>
              <p className="text-base font-bold text-amber-500">
                {helmet.manufacturer || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-[#1a1812] rounded-xl border border-amber-900/20">
              <p className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-tighter">
                {labels.labelLot}
              </p>
              <p className="text-base font-bold text-amber-500">
                {helmet.lot_number || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: labels.labelSize, val: helmet.shell_size },
              {
                label: isFr ? "Taille Coiffe" : "Liner Size",
                val: helmet.liner_size,
              },
              {
                label: isFr ? "Peinture" : "Paint",
                val: helmet.paint_condition,
              },
            ].map((spec, i) => (
              <div
                key={i}
                className="p-3 bg-black/30 rounded-lg border border-amber-900/10 text-center"
              >
                <p className="text-[8px] uppercase font-black opacity-40 mb-1">
                  {spec.label}
                </p>
                <p className="text-sm font-bold text-white">
                  {spec.val || "-"}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-amber-600" size={16} />
              <p className="text-[11px] uppercase font-black tracking-[0.2em] text-white">
                {isFr ? "Expertise & Histoire" : "History & Notes"}
              </p>
            </div>
            <div className="p-5 bg-black/20 rounded-2xl border border-amber-900/10">
              {helmet.expertise_message && (
                <p className="text-xs italic text-amber-400 mb-3 leading-relaxed">
                  {helmet.expertise_message}
                </p>
              )}
              <p className="text-sm italic leading-relaxed opacity-90 whitespace-pre-wrap font-serif">
                {helmet.description ||
                  (isFr
                    ? "Aucun historique documenté pour cette pièce."
                    : "No documented history for this item.")}
              </p>
            </div>
          </div>

          <button
            onClick={() => generateHelmetPDF(helmet, lang)}
            className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-black rounded-xl flex items-center justify-center gap-4 text-xs uppercase font-black tracking-widest transition-all shadow-2xl mb-6"
          >
            <Printer size={20} />
            {isFr ? "Générer Certificat PDF" : "Generate PDF Certificate"}
          </button>

          <p className="text-[8px] text-center uppercase opacity-30 italic tracking-widest">
            {isFr
              ? "Base de données Helmet Legends - Archive Certifiée"
              : "Helmet Legends Database - Certified Archive"}
          </p>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #451a03; border-radius: 10px; }
      `}</style>
    </div>
  );
}
