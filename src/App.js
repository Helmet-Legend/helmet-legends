import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Home from "./screens/Home";
import Registry from "./screens/Registry";
import Stats from "./screens/Stats";
import AddHelmet from "./screens/AddHelmet";
import Details from "./screens/Details";
import Expert from "./screens/Expert";
import Compare from "./screens/Compare";
import Handbook from "./screens/Handbook";
import LotSearch from "./screens/LotSearch";
import Login from "./screens/Login";

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState("home");
  const [selectedHelmet, setSelectedHelmet] = useState(null);
  const [lang, setLang] = useState("fr");

  // ✅ NOUVEL ÉTAT : La collection provient directement de Supabase
  const [collection, setCollection] = useState([]);

  // --- 1. LOGIQUE DE SESSION ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- 2. RÉCUPÉRATION DE LA COLLECTION (Source de Vérité) ---
  const fetchCollection = async () => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("helmets")
      .select("*")
      .order("created_at", { ascending: false }); // Les plus récents en haut

    if (error) {
      console.error("Erreur fetch:", error.message);
    } else {
      setCollection(data || []); // ✅ On met à jour la liste locale avec la DB
    }
  };

  // On recharge la liste dès que la session est active
  useEffect(() => {
    if (session) fetchCollection();
  }, [session]);

  // --- 3. SUPPRESSION RÉELLE DANS SUPABASE ---
  const handleDelete = async (id) => {
    const { error } = await supabase.from("helmets").delete().eq("id", id);

    if (error) {
      alert("Erreur suppression : " + error.message);
    } else {
      fetchCollection(); // ✅ On recharge pour supprimer le doublon visuel
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home setScreen={setScreen} lang={lang} setLang={setLang} />;

      case "registry":
        return (
          <Registry
            setScreen={setScreen}
            lang={lang}
            helmets={collection} // ✅ Utilise la liste de Supabase
            onDelete={handleDelete} // ✅ Utilise la fonction de suppression DB
            onEdit={(h) => {
              setSelectedHelmet(h);
              setScreen(h ? "add" : "add"); // On va sur add pour modifier
            }}
          />
        );

      case "add":
        return (
          <AddHelmet
            setScreen={setScreen}
            onSave={fetchCollection} // ✅ Recharge la liste après sauvegarde
            helmet={selectedHelmet}
            lang={lang}
          />
        );

      case "stats":
        return (
          <Stats setScreen={setScreen} total={collection.length} lang={lang} />
        );

      // ... (Gardez Expert, Compare, Handbook, LotSearch identiques)
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

      default:
        return <Home setScreen={setScreen} lang={lang} setLang={setLang} />;
    }
  };

  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-[#2a2822]">
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
