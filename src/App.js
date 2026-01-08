import React, { useState } from "react";
import { useCollection } from "./hooks/useCollection";
import Home from "./screens/Home";
import Registry from "./screens/Registry";
import Stats from "./screens/Stats";
import AddHelmet from "./screens/AddHelmet";
import Details from "./screens/Details";
import Expert from "./screens/Expert";
import Compare from "./screens/Compare";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedHelmet, setSelectedHelmet] = useState(null);

  // Toute la logique est maintenant isolée dans ce Hook
  const { collection, addOrUpdate, remove, stats } = useCollection();

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home setScreen={setScreen} />;
      case "registry":
        return (
          <Registry
            setScreen={setScreen}
            collection={collection}
            remove={remove}
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
          />
        );
      case "expert":
        return (
          <Expert setScreen={setScreen} setSelectedHelmet={setSelectedHelmet} />
        );
      case "compare":
        return <Compare setScreen={setScreen} />;
      case "add":
        return (
          <AddHelmet
            setScreen={setScreen}
            onSave={addOrUpdate}
            helmet={selectedHelmet}
          />
        );
      case "details":
        return (
          <Details
            setScreen={setScreen}
            helmet={selectedHelmet}
            onEdit={() => setScreen("add")}
          />
        );
      default:
        return <Home setScreen={setScreen} />;
    }
  };

  return <div className="min-h-screen bg-[#2a2822]">{renderScreen()}</div>;
}
