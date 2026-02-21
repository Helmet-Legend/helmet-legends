import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import de la connexion

export function useCollection() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CHARGER LES DONNÉES : Depuis la base SQL Supabase
  const fetchCollection = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("helmets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCollection(data || []);
    } catch (error) {
      console.error("Erreur de chargement:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  // 2. AJOUTER OU METTRE À JOUR : Synchronisé avec l'ID expert
  const addOrUpdate = async (helmet) => {
    try {
      // Récupérer l'expert connecté pour lier le casque
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const helmetData = {
        ...helmet,
        user_id: user.id, // Sécurité : on lie le casque à l'utilisateur
      };

      // Si c'est un nouveau casque sans ID, Supabase le générera
      // Sinon, upsert mettra à jour la ligne existante
      const { error } = await supabase.from("helmets").upsert(helmetData);

      if (error) throw error;

      // Rafraîchir la liste locale après modification
      fetchCollection();
    } catch (error) {
      alert("Erreur de sauvegarde Cloud : " + error.message);
    }
  };

  // 3. SUPPRIMER : Directement dans la base de données
  const remove = async (id) => {
    try {
      const { error } = await supabase.from("helmets").delete().eq("id", id);

      if (error) throw error;
      setCollection((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      alert("Erreur de suppression Cloud : " + error.message);
    }
  };

  // Calcul des statistiques (toujours dynamique)
  const stats = {
    total: collection.length,
    // Vous pourrez ajouter ici des filtres par modèle (M35, M40...) plus tard
  };

  return { collection, addOrUpdate, remove, stats, loading };
}
