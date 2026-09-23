import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Images,
  HardHat,
  EyeOff,
  Loader2,
  Search,
  SearchX,
  MessageCircle,
} from "lucide-react";
import galleryHelmetIcon from "../assets/gallery-helmet-icon.png";
import { supabase } from "../supabaseClient";

const MODELS = ["M35", "M40", "M42"];
const BRANCHES = ["Heer", "Luftwaffe", "Kriegsmarine", "Waffen-SS", "Polizei"];

// Vitrine communautaire : uniquement les pièces publiées volontairement
// par leur propriétaire (opt-in, depuis la fiche de détail), réservée
// aux comptes sécurisés (get_public_gallery le vérifie aussi côté
// serveur). Le pseudo affiché est celui, définitif, choisi à
// l'inscription -- jamais le user_id ni un nom générique du site.
export default function Gallery({ setScreen, lang, isAdmin, onContact }) {
  const isFr = lang === "fr";
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | restricted | error
  const [hidingId, setHidingId] = useState(null);
  const [modelFilter, setModelFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((it) => {
      if (modelFilter !== "all" && it.model !== modelFilter) return false;
      if (branchFilter !== "all" && it.branch !== branchFilter) return false;
      if (
        q &&
        !it.model?.toLowerCase().includes(q) &&
        !it.branch?.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [items, modelFilter, branchFilter, searchQuery]);

  const isFiltering =
    modelFilter !== "all" || branchFilter !== "all" || searchQuery.trim() !== "";

  const load = async () => {
    setStatus("loading");
    const { data, error } = await supabase.rpc("get_public_gallery");
    if (error) {
      setStatus(
        error.message?.includes("Réservé") ? "restricted" : "error"
      );
      return;
    }
    setItems(data || []);
    setStatus("ok");
  };

  useEffect(() => {
    load();
  }, []);

  const handleHide = async (id) => {
    setHidingId(id);
    const { error } = await supabase.rpc("admin_hide_from_gallery", {
      p_helmet_id: id,
    });
    setHidingId(null);
    if (error) {
      alert("Erreur : " + error.message);
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#1a1812] font-serif text-[#d0c7a8] relative">
      <div className="sticky top-0 z-20 flex items-center justify-between mb-2 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <img src={galleryHelmetIcon} alt="" className="h-6 w-auto" />
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            {isFr ? "Galerie" : "Gallery"}
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-24 opacity-50">
            <Loader2 size={32} className="animate-spin mb-3" />
            <p className="text-xs uppercase tracking-widest font-bold">
              {isFr ? "Chargement..." : "Loading..."}
            </p>
          </div>
        )}

        {status === "restricted" && (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center opacity-70">
            <HardHat size={48} className="mb-4 opacity-40" />
            <p className="text-sm uppercase font-black tracking-widest mb-2">
              {isFr ? "Réservé aux comptes sécurisés" : "Members only"}
            </p>
            <p className="text-xs italic opacity-60 max-w-xs mb-6">
              {isFr
                ? "Sécurise ton compte (email + mot de passe) pour accéder à la galerie."
                : "Secure your account (email + password) to access the gallery."}
            </p>
            <button
              onClick={() => setScreen("account")}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-black rounded-xl font-black text-xs uppercase tracking-widest"
            >
              {isFr ? "Mon Compte" : "My Account"}
            </button>
          </div>
        )}

        {status === "error" && (
          <p className="text-center py-24 text-sm opacity-50 italic">
            {isFr ? "Une erreur est survenue." : "Something went wrong."}
          </p>
        )}

        {status === "ok" && items.length > 0 && (
          <div className="relative mb-3">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isFr
                  ? "Rechercher par modèle ou arme..."
                  : "Search by model or branch..."
              }
              className="w-full bg-black/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3 text-sm text-amber-100 outline-none focus:border-amber-500 placeholder:text-amber-900/60"
            />
          </div>
        )}

        {status === "ok" && items.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              className="bg-black/60 border border-amber-900/30 rounded-xl px-4 py-2.5 text-xs font-bold text-amber-200 outline-none focus:border-amber-500"
            >
              <option value="all">{isFr ? "Tous les modèles" : "All models"}</option>
              {MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-black/60 border border-amber-900/30 rounded-xl px-4 py-2.5 text-xs font-bold text-amber-200 outline-none focus:border-amber-500"
            >
              <option value="all">{isFr ? "Toutes les armes" : "All branches"}</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        {status === "ok" && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center opacity-60">
            <Images size={48} className="mb-4 opacity-30" />
            <p className="text-sm uppercase font-black tracking-widest">
              {isFr ? "Aucune pièce publiée pour l'instant" : "No published pieces yet"}
            </p>
          </div>
        )}

        {status === "ok" && items.length > 0 && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center opacity-60">
            <SearchX size={48} className="mb-4 opacity-30" />
            <p className="text-sm uppercase font-black tracking-widest">
              {isFr ? "Aucune pièce ne correspond" : "No matching pieces"}
            </p>
          </div>
        )}

        {status === "ok" && filteredItems.length > 0 && (
          <>
            {isFiltering && (
              <p className="text-[10px] uppercase font-bold text-amber-500 tracking-widest mb-4">
                {filteredItems.length}{" "}
                {isFr ? "résultat(s)" : "result(s)"}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((it) => (
              <div
                key={it.id}
                className="bg-black/50 border border-amber-900/30 rounded-2xl overflow-hidden shadow-xl"
              >
                <a
                  href={`/helmet/${it.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="h-48 bg-black flex items-center justify-center">
                    {it.image_url_main ? (
                      <img
                        src={it.image_url_main}
                        alt={it.model}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <HardHat size={40} className="opacity-20" />
                    )}
                  </div>
                  <div className="p-4 pb-2">
                    <h3 className="text-amber-500 font-black uppercase italic text-base truncate">
                      {it.model || (isFr ? "Modèle Inconnu" : "Unknown Model")}
                    </h3>
                    <p className="text-[10px] text-white/40 font-bold tracking-widest mb-2">
                      {[it.manufacturer, it.branch].filter(Boolean).join(" · ") ||
                        "—"}
                    </p>
                    <p className="text-[10px] uppercase font-bold text-amber-200">
                      {isFr ? "Par" : "By"} {it.username}
                    </p>
                  </div>
                </a>
                <div className="px-4 pb-4">
                  {!it.is_own && onContact && (
                    <button
                      onClick={() => onContact(it.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-900/20 border border-amber-700/40 text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-900/40 transition-colors"
                    >
                      <MessageCircle size={12} />
                      {isFr ? "Contacter" : "Contact"}
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => handleHide(it.id)}
                      disabled={hidingId === it.id}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-2 border border-red-900/40 text-red-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-900/10 transition-colors disabled:opacity-40"
                    >
                      {hidingId === it.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <EyeOff size={12} />
                      )}
                      {isFr ? "Masquer (modération)" : "Hide (moderation)"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
