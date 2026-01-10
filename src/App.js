import React, { useState } from "react";
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

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedHelmet, setSelectedHelmet] = useState(null);

  // NOUVEAU : État de la langue (français par défaut)
  const [lang, setLang] = useState("fr");

  // Toute la logique est isolée dans ce Hook
  const { collection, addOrUpdate, remove, stats } = useCollection();

  const renderScreen = () => {
    switch (screen) {
      case "home":
        // L'accueil a besoin de setLang pour basculer la langue
        return <Home setScreen={setScreen} lang={lang} setLang={setLang} />;

      case "registry":
        return (
          <Registry
            setScreen={setScreen}
            collection={collection}
            remove={remove}
            lang={lang}
            setSelectedHelmet={(h) => {
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

  return <div className="min-h-screen bg-[#2a2822]">{renderScreen()}</div>;
}
