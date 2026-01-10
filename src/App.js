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
  const [lang, setLang] = useState("fr");

  const { collection, addOrUpdate, remove, stats } = useCollection();

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home setScreen={setScreen} lang={lang} setLang={setLang} />;

      case "registry":
        return (
          <Registry
            setScreen={setScreen}
            lang={lang}
            // --- CORRECTION DES NOMS ICI ---
            helmets={collection} // On envoie collection sous le nom 'helmets'
            onDelete={remove} // On envoie remove sous le nom 'onDelete'
            onEdit={(h) => {
              // On envoie cette fonction sous le nom 'onEdit'
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
