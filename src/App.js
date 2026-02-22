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

  // --- 2. RÉCUPÉRATION DE LA COLLECTION ---
  const fetchCollection = async () => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("helmets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur fetch:", error.message);
    } else {
      setCollection(data || []);
    }
  };

  useEffect(() => {
    if (session) fetchCollection();
  }, [session]);

  // --- 3. SAUVEGARDE ---
  const handleSave = async (helmetData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      user_id: user.id,
      model: helmetData.model,
      manufacturer: helmetData.manufacturer,
      lot_number: helmetData.lotNumber,
      description: helmetData.description,
      shell_size: helmetData.shellSize,
      liner_size: helmetData.linerSize,
      paint_condition: helmetData.paintCondition,
      liner_condition: helmetData.linerCondition,
      chinstrap_state: helmetData.chinstrapState,
      decals: helmetData.decals,
      expertise_message: helmetData.expertiseMessage,
      image_url_main: helmetData.images?.main,
      image_url_front: helmetData.images?.front,
      image_url_left: helmetData.images?.left,
      image_url_right: helmetData.images?.right,
      image_url_interior: helmetData.images?.interior,
    };

    let error;

    if (helmetData.id) {
      ({ error } = await supabase
        .from("helmets")
        .update(payload)
        .eq("id", helmetData.id));
    } else {
      ({ error } = await supabase.from("helmets").insert(payload));
    }

    if (error) throw new Error(error.message);
    await fetchCollection();
  };

  // --- 4. SUPPRESSION ---
  const handleDelete = async (id) => {
    const { error } = await supabase.from("helmets").delete().eq("id", id);
    if (error) {
      alert("Erreur suppression : " + error.message);
    } else {
      fetchCollection();
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
            helmets={collection}
            onDelete={handleDelete}
            onEdit={(h) => {
              setSelectedHelmet(h);
              setScreen("add");
            }}
          />
        );

      case "add":
        return (
          <AddHelmet
            setScreen={setScreen}
            onSave={handleSave}
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

      case "stats":
        return (
          <Stats
            setScreen={setScreen}
            total={collection.length}
            stats={{ total: collection.length }}
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
