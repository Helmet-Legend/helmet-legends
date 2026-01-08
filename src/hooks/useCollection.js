import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "helmet-legends-v16";

export function useCollection() {
  const [collection, setCollection] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  }, [collection]);

  const addOrUpdate = (helmet) => {
    setCollection((prev) =>
      helmet.id
        ? prev.map((h) => (h.id === helmet.id ? helmet : h))
        : [...prev, { ...helmet, id: Date.now().toString() }]
    );
  };

  const remove = (id) =>
    setCollection((prev) => prev.filter((h) => h.id !== id));

  // On utilise useMemo pour ne pas recalculer les stats si la collection n'a pas changé
  const stats = useMemo(() => {
    return collection.reduce(
      (acc, h) => {
        const m = h.model.toUpperCase();
        if (m.includes("M35")) acc.M35++;
        else if (m.includes("M40")) acc.M40++;
        else if (m.includes("M42")) acc.M42++;
        else acc.Autre++;
        return acc;
      },
      { M35: 0, M40: 0, M42: 0, Autre: 0 }
    );
  }, [collection]);

  return { collection, addOrUpdate, remove, stats };
}
