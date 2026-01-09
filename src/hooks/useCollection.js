import { useState, useEffect } from "react";

export function useCollection() {
  // 1. Charger les données au démarrage depuis la mémoire du téléphone (LocalStorage)
  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem("helmet-collection");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. SAUVEGARDE AUTOMATIQUE : Dès que la collection change, on enregistre
  useEffect(() => {
    localStorage.setItem("helmet-collection", JSON.stringify(collection));
  }, [collection]);

  const addOrUpdate = (helmet) => {
    setCollection((prev) => {
      // Si le casque existe déjà (édition), on le met à jour
      const index = prev.findIndex((h) => h.id === helmet.id);
      if (index > -1) {
        const newCollection = [...prev];
        newCollection[index] = helmet;
        return newCollection;
      }
      // Sinon, on crée un nouveau casque avec un ID unique
      return [...prev, { ...helmet, id: Date.now().toString() }];
    });
  };

  const remove = (id) => {
    setCollection((prev) => prev.filter((h) => h.id !== id));
  };

  // Calcul basique des statistiques pour votre écran Stats
  const stats = {
    total: collection.length,
    // Vous pourrez ajouter d'autres stats ici plus tard
  };

  return { collection, addOrUpdate, remove, stats };
}