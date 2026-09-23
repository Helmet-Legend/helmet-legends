import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Tag,
  HardHat,
  EyeOff,
  Loader2,
  SearchX,
  Repeat,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../supabaseClient";

// Vente & Échange : les pièces marquées avec un type d'annonce
// (listing_type non nul), toujours aussi visibles dans la Galerie
// (contrainte imposée côté serveur). Même restriction d'accès et même
// principe de pseudo verrouillé que la Galerie.
export default function Listings({ setScreen, lang, isAdmin, onContact }) {
  const isFr = lang === "fr";
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | restricted | error
  const [hidingId, setHidingId] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all"); // all | vente | echange

  const load = async () => {
    setStatus("loading");
    const { data, error } = await supabase.rpc("get_public_listings");
    if (error) {
      setStatus(error.message?.includes("Réservé") ? "restricted" : "error");
      return;
    }
    setItems(data || []);
    setStatus("ok");
  };

  useEffect(() => {
    load();
  }, []);

  const filteredItems = useMemo(() => {
    if (typeFilter === "all") return items;
    return items.filter((it) => it.listing_type === typeFilter);
  }, [items, typeFilter]);

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
    <div className="min-h-screen bg-[#1a1812] font-serif text-[#d0c7a8] relative">
      <div className="sticky top-0 z-20 flex items-center justify-between mb-2 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <Tag className="text-amber-500" size={24} />
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            {isFr ? "Vente & Échange" : "Buy & Trade"}
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
                ? "Sécurise ton compte (email + mot de passe) pour accéder aux annonces."
                : "Secure your account (email + password) to access listings."}
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
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border ${
                typeFilter === "all"
                  ? "bg-amber-600 border-amber-600 text-black"
                  : "bg-black/60 border-amber-900/30 text-amber-200"
              }`}
            >
              {isFr ? "Tout" : "All"}
            </button>
            <button
              onClick={() => setTypeFilter("vente")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border ${
                typeFilter === "vente"
                  ? "bg-amber-600 border-amber-600 text-black"
                  : "bg-black/60 border-amber-900/30 text-amber-200"
              }`}
            >
              {isFr ? "À vendre" : "For sale"}
            </button>
            <button
              onClick={() => setTypeFilter("echange")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border ${
                typeFilter === "echange"
                  ? "bg-amber-600 border-amber-600 text-black"
                  : "bg-black/60 border-amber-900/30 text-amber-200"
              }`}
            >
              {isFr ? "Échange" : "Trade"}
            </button>
          </div>
        )}

        {status === "ok" && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center opacity-60">
            <Tag size={48} className="mb-4 opacity-30" />
            <p className="text-sm uppercase font-black tracking-widest">
              {isFr ? "Aucune annonce pour l'instant" : "No listings yet"}
            </p>
          </div>
        )}

        {status === "ok" && items.length > 0 && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center opacity-60">
            <SearchX size={48} className="mb-4 opacity-30" />
            <p className="text-sm uppercase font-black tracking-widest">
              {isFr ? "Aucune annonce ne correspond" : "No matching listings"}
            </p>
          </div>
        )}

        {status === "ok" && filteredItems.length > 0 && (
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
                  <div className="h-48 bg-black flex items-center justify-center relative">
                    {it.image_url_main ? (
                      <img
                        src={it.image_url_main}
                        alt={it.model}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <HardHat size={40} className="opacity-20" />
                    )}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${
                        it.listing_type === "vente"
                          ? "bg-green-900/80 text-green-300 border border-green-500/40"
                          : "bg-blue-900/80 text-blue-300 border border-blue-500/40"
                      }`}
                    >
                      {it.listing_type === "vente" ? (
                        isFr ? (
                          "À vendre"
                        ) : (
                          "For sale"
                        )
                      ) : (
                        <>
                          <Repeat size={10} /> {isFr ? "Échange" : "Trade"}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="p-4 pb-2">
                    <h3 className="text-amber-500 font-black uppercase italic text-base truncate">
                      {it.model || (isFr ? "Modèle Inconnu" : "Unknown Model")}
                    </h3>
                    <p className="text-[10px] text-white/40 font-bold tracking-widest mb-2">
                      {[it.manufacturer, it.branch].filter(Boolean).join(" · ") ||
                        "—"}
                    </p>

                    {it.listing_type === "vente" && it.listing_price && (
                      <p className="text-lg font-black text-green-400 mb-2">
                        {it.listing_price}
                      </p>
                    )}
                    {it.listing_type === "echange" && it.listing_wanted && (
                      <p className="text-xs italic text-blue-300 mb-2">
                        {isFr ? "Recherché : " : "Wanted: "}
                        {it.listing_wanted}
                      </p>
                    )}

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
        )}
      </div>
    </div>
  );
}
