import React, { useEffect, useState } from "react";
import { ShieldCheck, HardHat, BadgeCheck, ExternalLink } from "lucide-react";
import { supabase } from "../supabaseClient";
import monLogo from "../logo.jpg";

// Écran public en lecture seule, sans authentification, affiché quand
// l'URL est /helmet/:id (scanné depuis le QR code d'un certificat PDF).
// Ne passe jamais par l'app authentifiée ni par la collection privée —
// la donnée vient d'une fonction Postgres dédiée (get_public_helmet_certificate)
// qui ne retourne qu'une seule fiche, par id exact, sans lister ni exposer
// le reste de la base.
export default function PublicHelmet({ helmetId }) {
  const [helmet, setHelmet] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | found | notfound | error
  const isFr = (navigator.language || "fr").toLowerCase().startsWith("fr");

  useEffect(() => {
    let cancelled = false;
    const fetchHelmet = async () => {
      const { data, error } = await supabase
        .rpc("get_public_helmet_certificate", { p_id: helmetId })
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setStatus("notfound");
      } else {
        setHelmet(data);
        setStatus("found");
      }
    };
    fetchHelmet();
    return () => {
      cancelled = true;
    };
  }, [helmetId]);

  const photos = helmet
    ? [
        { id: "main", url: helmet.image_url_main },
        { id: "front", url: helmet.image_url_front },
        { id: "left", url: helmet.image_url_left },
        { id: "right", url: helmet.image_url_right },
        { id: "interior", url: helmet.image_url_interior },
      ].filter((p) => p.url)
    : [];

  return (
    <div className="h-screen overflow-y-auto bg-[#1a1812] font-serif text-[#d0c7a8] relative">
      <div className="sticky top-0 left-0 right-0 z-30 p-4 md:p-6 flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-amber-900/20">
        <div className="flex items-center gap-3">
          <img src={monLogo} alt="Helmet Legends" className="h-9 w-auto" />
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 font-bold leading-none">
              {isFr ? "Certificat Vérifié" : "Verified Certificate"}
            </p>
          </div>
        </div>
        <a
          href="/"
          className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-amber-500 hover:text-white transition-colors"
        >
          {isFr ? "Découvrir l'app" : "Discover the app"}
          <ExternalLink size={12} />
        </a>
      </div>

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-32 opacity-50">
          <BadgeCheck size={48} className="animate-pulse mb-4" />
          <p className="text-xs uppercase tracking-widest font-bold">
            {isFr ? "Vérification en cours..." : "Verifying..."}
          </p>
        </div>
      )}

      {status === "notfound" && (
        <div className="flex flex-col items-center justify-center py-32 px-6 text-center opacity-70">
          <HardHat size={48} className="mb-4 opacity-40" />
          <p className="text-sm uppercase font-black tracking-widest mb-2">
            {isFr ? "Fiche introuvable" : "Record not found"}
          </p>
          <p className="text-xs italic opacity-60 max-w-xs">
            {isFr
              ? "Ce certificat ne correspond à aucune fiche active, ou a été supprimé."
              : "This certificate doesn't match any active record, or was deleted."}
          </p>
        </div>
      )}

      {status === "found" && helmet && (
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-72px)]">
          <div className="w-full lg:w-1/2 bg-black flex items-center justify-center relative h-[50vh] lg:h-auto border-b lg:border-b-0 lg:border-r border-amber-900/30">
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

          <div className="w-full lg:w-1/2 bg-[#2a2822] p-6 lg:p-12">
            <div className="flex items-center gap-2 mb-1">
              <BadgeCheck className="text-green-500" size={20} />
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-green-500">
                {isFr
                  ? "Authenticité de l'archive confirmée"
                  : "Archive authenticity confirmed"}
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-black italic uppercase text-[#f0ede0] leading-none mb-8">
              {helmet.model || (isFr ? "Modèle Inconnu" : "Unknown Model")}
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-[#1a1812] rounded-xl border border-amber-900/20">
                <p className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-tighter">
                  {isFr ? "Fabricant" : "Manufacturer"}
                </p>
                <p className="text-base font-bold text-amber-500">
                  {helmet.manufacturer || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-[#1a1812] rounded-xl border border-amber-900/20">
                <p className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-tighter">
                  {isFr ? "Branche" : "Branch"}
                </p>
                <p className="text-base font-bold text-amber-500">
                  {helmet.branch || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-[#1a1812] rounded-xl border border-amber-900/20">
                <p className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-tighter">
                  {isFr ? "Lot" : "Lot"}
                </p>
                <p className="text-base font-bold text-amber-500">
                  {helmet.lot_number || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                {
                  label: isFr ? "Taille Coque" : "Shell Size",
                  val: helmet.shell_size,
                },
                {
                  label: isFr ? "Taille Coiffe" : "Liner Size",
                  val: helmet.liner_size,
                },
                { label: isFr ? "Peinture" : "Paint", val: helmet.paint_condition },
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

            <div className="mb-8">
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

            <p className="text-[8px] text-center uppercase opacity-30 italic tracking-widest">
              {isFr
                ? "Base de données Helmet Legends - Archive Certifiée"
                : "Helmet Legends Database - Certified Archive"}
            </p>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
