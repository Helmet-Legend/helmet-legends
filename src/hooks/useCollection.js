import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useCollection() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CHARGER LES DONNÉES
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

  // 2. AJOUTER OU METTRE À JOUR
  const addOrUpdate = async (helmet) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const helmetData = {
        user_id: user.id,
        model: helmet.model,
        manufacturer: helmet.manufacturer,
        lot_number: helmet.lotNumber,
        description: helmet.description,
        shell_size: helmet.shellSize,
        liner_size: helmet.linerSize,
        paint_condition: helmet.paintCondition,
        liner_condition: helmet.linerCondition,
        chinstrap_state: helmet.chinstrapState,
        decals: helmet.decals,
        expertise_message: helmet.expertiseMessage,
        image_url_main: helmet.images?.main,
        image_url_front: helmet.images?.front,
        image_url_left: helmet.images?.left,
        image_url_right: helmet.images?.right,
        image_url_interior: helmet.images?.interior,
      };

      let error;

      if (helmet.id) {
        // Mise à jour d'un casque existant
        ({ error } = await supabase
          .from("helmets")
          .update(helmetData)
          .eq("id", helmet.id));
      } else {
        // Nouvel ajout — insert simple sans upsert
        ({ error } = await supabase.from("helmets").insert(helmetData));
      }

      if (error) throw error;
      fetchCollection();
    } catch (error) {
      alert("Erreur de sauvegarde Cloud : " + error.message);
    }
  };

  // 3. SUPPRIMER
  const remove = async (id) => {
    try {
      const { error } = await supabase.from("helmets").delete().eq("id", id);
      if (error) throw error;
      setCollection((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      alert("Erreur de suppression Cloud : " + error.message);
    }
  };

  const stats = {
    total: collection.length,
  };

  return { collection, addOrUpdate, remove, stats, loading };
}
