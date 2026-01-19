import React, { useState, useEffect } from "react";
import expertBg from "../assets/expert-bg.png"; // Assurez-vous que le chemin est correct

// Configuration des couleurs historiques pour les badges
const BRANCH_STYLES = {
  Heer: { bg: "#4a5d4e", label: "HEER (ARMY)" },
  Luftwaffe: { bg: "#3c4e5e", label: "LUFTWAFFE" },
  "Waffen-SS": { bg: "#1a1a1a", label: "WAFFEN-SS" },
  Kriegsmarine: { bg: "#b08d57", label: "KRIEGSMARINE" },
  Polizei: { bg: "#2c3e50", label: "POLIZEI" },
  default: { bg: "#333", label: "BRANCHE INCONNUE" },
};

const LotSearch = () => {
  const [db, setDb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMfr, setSelectedMfr] = useState("ET");
  const [results, setResults] = useState([]);

  // Chargement de la base de données au montage du composant
  useEffect(() => {
    setIsLoading(true);
    fetch("/DATABASE_ULTIME_NORMALISEE.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement du fichier JSON");
        return res.json();
      })
      .then((data) => {
        setDb(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur base:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!searchTerm) return;

    // 1. On prépare la recherche (numérique pur et texte brut)
    const numericInput = searchTerm.replace(/\D/g, "");
    const rawInput = searchTerm.trim().toUpperCase();

    // 2. Filtrage multicritères
    const matches = db.filter((item) => {
      // Correspondance Fabricant (On gère les majuscules)
      const mfrMatch =
        item.manufacturer?.toUpperCase() === selectedMfr.toUpperCase();

      // Correspondance Lot (Soit le numéro pur, soit présent dans le texte brut)
      const lotMatch =
        item.lot_number === numericInput ||
        item.lot_raw?.toUpperCase().includes(rawInput);

      return mfrMatch && lotMatch;
    });

    setResults(matches);
  };

  return (
    <div style={styles.container}>
      {/* Background avec overlay pour lisibilité */}
      <div style={{ ...styles.overlay, backgroundImage: `url(${expertBg})` }} />

      <div style={styles.content}>
        <header style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🔍</span>
            <h1 style={styles.title}>Moteur d'Expertise de Lot</h1>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            style={styles.backBtn}
          >
            ← RETOUR
          </button>
        </header>

        {/* --- FORMULAIRE DE RECHERCHE --- */}
        <div style={styles.searchCard}>
          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>FABRICANT / CODE</label>
              <select
                value={selectedMfr}
                onChange={(e) => setSelectedMfr(e.target.value)}
                style={styles.select}
              >
                <option value="ET">ET (Thale)</option>
                <option value="CKL">CKL (Thale - Tardif)</option>
                <option value="Q">Q (Quist)</option>
                <option value="SE">SE (Sachsische E.)</option>
                <option value="HKP">HKP (Sachsische E. - Tardif)</option>
                <option value="NS">NS (Vereinigte D.)</option>
                <option value="EF">EF (Emaillerwerke AG)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>NUMÉRO DE LOT</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Ex: 4520"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  style={styles.input}
                />
                <button onClick={handleSearch} style={styles.searchBtn}>
                  ANALYSER
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- AFFICHAGE DES RÉSULTATS --- */}
        <div style={styles.resultsArea}>
          {isLoading ? (
            <p style={styles.statusText}>
              Initialisation de la base (32k entrées)...
            </p>
          ) : results.length > 0 ? (
            results.map((item, idx) => {
              const branchInfo =
                BRANCH_STYLES[item.branch] || BRANCH_STYLES.default;

              return (
                <div key={idx} style={styles.resultCard}>
                  <div style={styles.cardHeader}>
                    <div>
                      <small style={styles.sourceLabel}>
                        {item.sources?.join(" / ")}
                      </small>
                      <h2 style={styles.modelTitle}>
                        {item.model} {item.manufacturer} {item.size || ""}
                      </h2>
                    </div>
                    <div style={styles.lotBadge}>LOT {item.lot_raw}</div>
                  </div>

                  <div style={styles.badgeRow}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: branchInfo.bg,
                      }}
                    >
                      {branchInfo.label}
                    </span>
                    {item.insignia_type && (
                      <span style={styles.insigniaBadge}>
                        {item.insignia_type}
                      </span>
                    )}
                  </div>

                  <div style={styles.details}>
                    <div style={styles.detailBlock}>
                      <label style={styles.detailLabel}>
                        DESCRIPTION DE L'INSIGNE
                      </label>
                      <p style={styles.detailText}>
                        {item.decals?.description_brute || "Non spécifié"}
                      </p>
                    </div>

                    {(item.liner?.year || item.liner?.material) && (
                      <div style={styles.detailBlock}>
                        <label style={styles.detailLabel}>
                          CONFIG. COIFFE (LINER)
                        </label>
                        <p style={styles.detailText}>
                          {item.liner.year ? `Année : ${item.liner.year}` : ""}
                          {item.liner.material
                            ? ` | Matériau : ${item.liner.material}`
                            : ""}
                        </p>
                      </div>
                    )}

                    {item.decals?.notes && (
                      <div style={styles.notesBox}>
                        <strong>Observations :</strong> {item.decals.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            searchTerm &&
            !isLoading && (
              <p style={styles.statusText}>
                Aucun lot correspondant répertorié pour ce fabricant.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#050505",
    color: "#e0e0e0",
    padding: "20px",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.15,
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "700px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #333",
    paddingBottom: "15px",
  },
  title: {
    fontSize: "1.3rem",
    color: "#c1b49a",
    textTransform: "uppercase",
    letterSpacing: "2px",
    margin: 0,
  },
  backBtn: {
    background: "rgba(193, 180, 154, 0.1)",
    border: "1px solid #c1b49a",
    color: "#c1b49a",
    padding: "6px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  searchCard: {
    background: "#111",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #222",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    marginBottom: "30px",
  },
  inputRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
  label: {
    display: "block",
    fontSize: "0.7rem",
    color: "#d3791d",
    fontWeight: "bold",
    marginBottom: "8px",
    letterSpacing: "1px",
  },
  select: {
    width: "100%",
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "12px",
    borderRadius: "6px",
    outline: "none",
  },
  input: {
    flex: 1,
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "12px",
    borderRadius: "6px",
    outline: "none",
  },
  searchBtn: {
    background: "#d3791d",
    border: "none",
    color: "#fff",
    padding: "0 25px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultCard: {
    background: "rgba(20, 20, 20, 0.95)",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #333",
    marginBottom: "20px",
    borderLeft: "4px solid #d3791d",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  sourceLabel: {
    fontSize: "0.6rem",
    color: "#888",
    textTransform: "uppercase",
  },
  modelTitle: { fontSize: "1.4rem", margin: "5px 0 0 0", color: "#fff" },
  lotBadge: {
    background: "#d3791d",
    color: "#000",
    padding: "5px 12px",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  badgeRow: { display: "flex", gap: "10px", marginBottom: "20px" },
  badge: {
    padding: "5px 12px",
    borderRadius: "3px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "#fff",
  },
  insigniaBadge: {
    border: "1px solid #d3791d",
    color: "#d3791d",
    padding: "4px 12px",
    borderRadius: "3px",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  detailBlock: { marginBottom: "15px" },
  detailLabel: {
    fontSize: "0.65rem",
    color: "#555",
    fontWeight: "bold",
    display: "block",
    marginBottom: "4px",
  },
  detailText: {
    fontSize: "0.95rem",
    color: "#ddd",
    margin: 0,
    lineHeight: "1.4",
  },
  notesBox: {
    background: "rgba(0,0,0,0.3)",
    padding: "15px",
    borderRadius: "6px",
    borderLeft: "3px solid #d3791d",
    fontSize: "0.9rem",
    color: "#bbb",
    marginTop: "15px",
  },
  statusText: {
    textAlign: "center",
    color: "#555",
    marginTop: "50px",
    fontStyle: "italic",
  },
};

export default LotSearch;
