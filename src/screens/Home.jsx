import React, { useEffect, useState } from "react";
// --- IMPORT DE L'IMAGE DEPUIS ASSETS ---
import monFondExpert from "../assets/helmet-bg.png";

import monLogo from "../logo.jpg";
import galleryHelmetIcon from "../assets/gallery-helmet-icon.png";
import { TexturedButton } from "../components/TexturedButton";
import {
  Search,
  Shield,
  PieChart,
  BookOpen,
  Layers,
  Database,
  ShieldCheck,
  Lock,
  Tag,
  MessageCircle,
  Link2,
  Clock,
} from "lucide-react";
import { translations } from "../data/translations";
import { supabase } from "../supabaseClient";
import { COMPARATOR_ENABLED } from "../config/features";

export default function Home({ setScreen, lang, setLang, isUpgraded }) {
  const t = (translations[lang] || translations["fr"]).home;
  const isFr = lang === "fr";
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isUpgraded) return;
    supabase
      .rpc("get_unread_message_count")
      .then(({ data }) => setUnreadCount(data || 0));
  }, [isUpgraded]);

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-[#1a1812] items-center p-6 text-[#d0c7a8] relative">
      {/* --- FOND D'ÉCRAN MODIFIÉ (PLUS CLAIR) --- */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          // Modification ici : brightness passe de 0.7 à 0.85
          filter: "brightness(0.85) contrast(1.1)",
        }}
      >
        {/* Overlay modifié : On réduit l'opacité du noir pour éclaircir l'ensemble */}
        {/* from-black/70 devient from-black/50 */}
        {/* via-[#1a1812]/40 devient via-[#1a1812]/30 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#1a1812]/30 to-[#1a1812] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
      </div>

      {/* --- LE CONTENU (Z-INDEX 10) --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs py-6">
        {/* SÉLECTEUR MINIATURE -- fixe (toujours visible, même en scrollant) */}
        <div className="fixed top-4 right-4 flex items-center gap-2 z-50 bg-black/60 p-1.5 px-3 rounded-full border border-amber-900/30 backdrop-blur-md shadow-lg">
          <div
            onClick={() => setLang("fr")}
            className={`cursor-pointer transition-all duration-300 ${
              lang === "fr"
                ? "saturate-100 scale-105"
                : "saturate-0 opacity-20 hover:opacity-100"
            }`}
          >
            <img
              src="https://flagcdn.com/w40/fr.png"
              alt="FR"
              className="w-4 h-3 object-cover rounded-[1px]"
            />
          </div>

          <div
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="relative w-9 h-4.5 bg-black rounded-full border border-amber-900/40 cursor-pointer flex items-center shadow-inner"
          >
            <div
              className={`absolute w-3.5 h-3.5 bg-gradient-to-br from-amber-400 to-amber-700 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.5)] transition-all duration-300 ease-in-out transform ${
                lang === "fr" ? "translate-x-0.5" : "translate-x-[1.15rem]"
              }`}
            ></div>
          </div>

          <div
            onClick={() => setLang("en")}
            className={`cursor-pointer transition-all duration-300 ${
              lang === "en"
                ? "saturate-100 scale-105"
                : "saturate-0 opacity-20 hover:opacity-100"
            }`}
          >
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="EN"
              className="w-4 h-3 object-cover rounded-[1px]"
            />
          </div>
        </div>

        {/* LOGO */}
        <div className="h-44 flex items-center justify-center mb-8">
          <img
            src={monLogo}
            className="max-h-full w-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.9)]"
            alt="Logo"
          />
        </div>

        {/* MENU */}
        <div className="space-y-4 w-full">
          <TexturedButton
            icon={<Search size={18} />}
            label={t.expert}
            onClick={() => setScreen("expert")}
          />
          <TexturedButton
            icon={<BookOpen size={18} />}
            label={t.handbook}
            onClick={() => setScreen("handbook")}
            variant="dark"
          />
          <TexturedButton
            icon={<Database size={18} />}
            label={t.lotSearch}
            onClick={() => setScreen("lotsearch")}
            variant="dark"
          />
          <TexturedButton
            icon={<Shield size={18} />}
            label={t.registry}
            onClick={() => setScreen("registry")}
            variant="dark"
          />
          <div
            className={!COMPARATOR_ENABLED ? "opacity-40 grayscale" : ""}
            title={
              !COMPARATOR_ENABLED
                ? isFr
                  ? "Temporairement suspendu"
                  : "Temporarily suspended"
                : undefined
            }
          >
            <TexturedButton
              icon={
                COMPARATOR_ENABLED ? (
                  <Layers size={18} />
                ) : (
                  <Clock size={18} />
                )
              }
              label={t.compare}
              onClick={() => setScreen("compare")}
              variant="dark"
            />
          </div>

          <div
            className={!isUpgraded ? "opacity-40 grayscale" : ""}
            title={
              !isUpgraded
                ? isFr
                  ? "Sécurise ton compte pour accéder à la galerie"
                  : "Secure your account to access the gallery"
                : undefined
            }
          >
            <TexturedButton
              icon={
                isUpgraded ? (
                  <img src={galleryHelmetIcon} alt="" className="h-[18px] w-auto" />
                ) : (
                  <Lock size={18} />
                )
              }
              label={t.gallery}
              onClick={() => setScreen(isUpgraded ? "gallery" : "account")}
              variant="dark"
            />
          </div>

          <div
            className={!isUpgraded ? "opacity-40 grayscale" : ""}
            title={
              !isUpgraded
                ? isFr
                  ? "Sécurise ton compte pour accéder aux annonces"
                  : "Secure your account to access listings"
                : undefined
            }
          >
            <TexturedButton
              icon={isUpgraded ? <Tag size={18} /> : <Lock size={18} />}
              label={t.listings}
              onClick={() => setScreen(isUpgraded ? "listings" : "account")}
              variant="dark"
            />
          </div>

          <div
            className={`relative ${!isUpgraded ? "opacity-40 grayscale" : ""}`}
            title={
              !isUpgraded
                ? isFr
                  ? "Sécurise ton compte pour accéder à la messagerie"
                  : "Secure your account to access messaging"
                : undefined
            }
          >
            <TexturedButton
              icon={isUpgraded ? <MessageCircle size={18} /> : <Lock size={18} />}
              label={t.messages}
              onClick={() => setScreen(isUpgraded ? "messages" : "account")}
              variant="dark"
            />
            {isUpgraded && unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center shadow-lg">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>

          <button
            onClick={() => setScreen("stats")}
            className="w-full text-[10px] uppercase font-bold opacity-60 flex items-center justify-center gap-2 mt-6 hover:opacity-100 transition-opacity text-amber-200"
          >
            <PieChart size={14} /> {t.stats}
          </button>

          <button
            onClick={() => setScreen("account")}
            className="w-full text-[10px] uppercase font-bold opacity-60 flex items-center justify-center gap-2 mt-3 hover:opacity-100 transition-opacity text-amber-200"
          >
            <ShieldCheck size={14} /> {t.account}
          </button>

          <button
            onClick={() => setScreen("links")}
            className="w-full text-[10px] uppercase font-bold opacity-60 flex items-center justify-center gap-2 mt-3 hover:opacity-100 transition-opacity text-amber-200"
          >
            <Link2 size={14} /> {t.links}
          </button>
        </div>
      </div>
    </div>
  );
}
