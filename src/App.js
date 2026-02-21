import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // Import de la connexion
import { useCollection } from "./hooks/useCollection";
import Home from "./screens/Home";
import Registry from "./screens/Registry";
import Stats from "./screens/Stats";
import AddHelmet from "./screens/AddHelmet";
import Details from "./screens/Details";
import Expert from "./screens/Expert";
import Compare from "./screens/Compare";
import Handbook from "./screens/Handbook";
import LotSearch from "./screens/LotSearch";
import Login from "./screens/Login"; // Import de votre nouvel écran

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState("home");
  const [selectedHelmet, setSelectedHelmet] = useState(null);
  const [lang, setLang] = useState("fr");

  const { collection, addOrUpdate, remove, stats } = useCollection();

  // --- LOGIQUE DE SESSION SUPABASE ---
  useEffect(() => {
    // Vérification de la session au démarrage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Écoute des changements (Connexion / Déconnexion)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home setScreen={setScreen} lang={lang} setLang={setLang} />;

      case "registry":
        return (
          <Registry
            setScreen={setScreen}
            lang={lang}
            helmets={collection}
            onDelete={remove}
            onEdit={(h) => {
              setSelectedHelmet(h);
              setScreen(h ? "details" : "add");
            }}
          />
        );

      case "stats":
        return (
          <Stats
            setScreen={setScreen}
            stats={stats}
            total={collection.length}
            lang={lang}
          />
        );

      case "expert":
        return (
          <Expert
            setScreen={setScreen}
            setSelectedHelmet={setSelectedHelmet}
            lang={lang}
          />
        );

      case "compare":
        return <Compare setScreen={setScreen} lang={lang} />;

      case "handbook":
        return <Handbook setScreen={setScreen} lang={lang} />;

      case "lotsearch":
        return <LotSearch setScreen={setScreen} lang={lang} />;

      case "add":
        return (
          <AddHelmet
            setScreen={setScreen}
            onSave={addOrUpdate}
            helmet={selectedHelmet}
            lang={lang}
          />
        );

      case "details":
        return (
          <Details
            setScreen={setScreen}
            helmet={selectedHelmet}
            onEdit={() => setScreen("add")}
            lang={lang}
          />
        );

      default:
        return <Home setScreen={setScreen} lang={lang} setLang={setLang} />;
    }
  };

  // --- VERROUILLAGE : SI PAS DE SESSION, AFFICHER LOGIN ---
  if (!session) {
    return <Login />;
  }

  // --- SI SESSION ACTIVE : AFFICHER L'APP ---
  return (
    <div className="min-h-screen bg-[#2a2822]">
      {/* Petit indicateur de connexion optionnel en haut */}
      <div className="bg-black/20 p-2 flex justify-end">
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-[9px] text-amber-500/50 uppercase font-black hover:text-red-500 transition-colors"
        >
          Déconnexion expert
        </button>
      </div>

      {renderScreen()}
    </div>
  );
}
