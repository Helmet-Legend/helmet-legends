import React, { useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { TexturedButton } from "../components/TexturedButton";
// 1. On importe votre nouveau compresseur
import { compressImage } from "../utils/imageCompressor";

const MANUFACTURERS = {
  ET: "Eisenhüttenwerke, Thale",
  Q: "F.W. Quist, Esslingen",
  SE: "Sächsische Emaillier-und Stanzwerke",
  NS: "Vereinigte Deutsche Nickelwerke",
  EF: "Emaillierwerke AG, Fulda",
  CKL: "Eisenhüttenwerke Thale (Tardif)",
  HKP: "SE (Tardif)",
};

export default function AddHelmet({ setScreen, onSave, helmet }) {
  const [current, setCurrent] = useState(
    helmet || {
      id: null,
      model: "",
      manufacturer: "",
      lotNumber: "",
      provenance: "",
      description: "",
      images: {
        main: null,
        front: null,
        left: null,
        right: null,
        back: null,
        bottom: null,
        interior: null,
        chinstrap: null,
      },
    }
  );

  // 2. Mise à jour de la fonction de téléchargement (plus propre et asynchrone)
  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // On utilise votre utilitaire pour transformer la photo en WebP léger
      const compressed = await compressImage(file);
      
      setCurrent((prev) => ({
        ...prev,
        images: { ...prev.images, [type]: compressed },
      }));
    } catch (error) {
      console.error("Erreur lors de la compression :", error);
    }
  };

  return (
    <div className="p-6 h-screen overflow-y-auto pb-32 bg-[#2a2822] font-serif text-[#d0c7a8]">
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase">
          {current.id ? "Modification" : "Archivage"}
        </h2>
        <button
          onClick={() => setScreen("registry")}
          className="p-2 bg-[#3a3832] rounded-full"
        >
          <X />
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Usine
            </label>
            <input
              placeholder="ex: ET"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-amber-500 outline-none focus:border-amber-600"
              value={current.manufacturer}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  manufacturer: e.target.value.toUpperCase(),
                })
              }
            />
            {MANUFACTURERS[current.manufacturer] && (
              <p className="text-[9px] text-amber-500 font-bold ml-1">
                {MANUFACTURERS[current.manufacturer]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              N° Lot
            </label>
            <input
              placeholder="ex: 1234"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-amber-500 outline-none focus:border-amber-600 h-[56px]"
              value={current.lotNumber}
              onChange={(e) =>
                setCurrent({ ...current, lotNumber: e.target.value })
              }
            />
          </div>
        </div>

        <input
          placeholder="MODÈLE (ex: M40 ND)"
          className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-black text-[#f0ede0] outline-none"
          value={current.model}
          onChange={(e) =>
            setCurrent({ ...current, model: e.target.value.toUpperCase() })
          }
        />

        <div className="pt-4 space-y-3">
          <UploadRow
            type="main"
            label="Vue Principale"
            current={current}
            onUpload={handleUpload}
            height="h-40"
          />
          <div className="grid grid-cols-4 gap-2">
            {[
              "front",
              "left",
              "right",
              "back",
              "bottom",
              "interior",
              "chinstrap",
            ].map((v) => (
              <UploadRow
                key={v}
                type={v}
                label={v}
                current={current}
                onUpload={handleUpload}
              />
            ))}
          </div>
        </div>

        <textarea
          rows="4"
          placeholder="Notes & Histoire..."
          className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm italic outline-none text-[#d0c7a8] resize-none"
          value={current.description}
          onChange={(e) =>
            setCurrent({ ...current, description: e.target.value })
          }
        />

        <TexturedButton
          label={current.id ? "Mettre à jour" : "Sceller l'Archive"}
          onClick={() => {
            onSave(current);
            setScreen("registry");
          }}
        />
      </div>
    </div>
  );
}

const UploadRow = ({ type, label, current, onUpload, height = "h-20" }) => (
  <label
    className={`relative flex flex-col items-center justify-center bg-[#1a1812] border-2 border-[#3a3832] border-dashed rounded-xl cursor-pointer overflow-hidden ${height}`}
  >
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onUpload(e, type)}
    />
    {current.images[type] ? (
      <img
        src={current.images[type]}
        className="w-full h-full object-cover opacity-80"
        alt={label}
      />
    ) : (
      <div className="text-center">
        <ImageIcon size={16} className="mx-auto mb-1 opacity-20" />
        <span className="text-[7px] uppercase font-black opacity-40">
          {label}
        </span>
      </div>
    )}
  </label>
);