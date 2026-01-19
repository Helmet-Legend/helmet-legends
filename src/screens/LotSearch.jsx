import React, { useState, useEffect } from "react";
import expertBg from "../assets/expert-bg.png";

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

  useEffect(() => {
    setIsLoading(true);
    fetch("/DATABASE_ULTIME_NORMALISEE.json")
      .then((res) => res.json())
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
    const numericInput = searchTerm.replace(/\D/g, "");
    const rawInput = searchTerm.trim().toUpperCase();

    // FILTRAGE STRICT POUR ÉVITER LES DOUBLONS COMME 1124 POUR 124
    const matches = db.filter((item) => {
      const mfrMatch =
        item.manufacturer?.toUpperCase() === selectedMfr.toUpperCase();
      const lotMatch =
        item.lot_number === numericInput ||
        item.lot_raw?.toUpperCase() === rawInput;

      return mfrMatch && lotMatch;
    });

    setResults(matches);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.overlay, backgroundImage: `url(${expertBg})` }} />
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Moteur d'Expertise</h1>
          <button
            onClick={() => (window.location.href = "/")}
            style={styles.backBtn}
          >
            ← RETOUR
          </button>
        </header>

        <div style={styles.searchCard}>
          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>FABRICANT</label>
              <select
                value={selectedMfr}
                onChange={(e) => setSelectedMfr(e.target.value)}
                style={styles.select}
              >
                <option value="ET">ET / ckl</option>
                <option value="Q">Q (Quist)</option>
                <option value="SE">SE / hkp</option>
                <option value="NS">NS</option>
                <option value="EF">EF</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>NUMÉRO DE LOT EXACT</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Ex: 124"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  style={styles.input}
                />
                <button onClick={handleSearch} style={styles.searchBtn}>
                  🔍
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.resultsArea}>
          {results.length > 0
            ? results.map((item, idx) => {
                const branchInfo =
                  BRANCH_STYLES[item.branch] || BRANCH_STYLES.default;
                return (
                  <div key={idx} style={styles.resultCard}>
                    <div style={styles.cardHeader}>
                      <h2 style={styles.modelTitle}>
                        {item.model} {item.manufacturer} {item.size}
                      </h2>
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
                    <p style={styles.detailText}>
                      {item.decals?.description_brute}
                    </p>
                    <small
                      style={{
                        display: "block",
                        marginTop: "10px",
                        color: "#666",
                      }}
                    >
                      Source: {item.sources?.join(" / ")}
                    </small>
                  </div>
                );
              })
            : searchTerm &&
              !isLoading && (
                <p style={styles.statusText}>
                  Aucun résultat pour le lot {searchTerm} chez {selectedMfr}.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#050505",
    color: "#e0e0e0",
    padding: "20px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    marginBottom: "30px",
    borderBottom: "1px solid #333",
    paddingBottom: "15px",
  },
  title: { fontSize: "1.2rem", color: "#c1b49a", textTransform: "uppercase" },
  backBtn: {
    background: "none",
    border: "1px solid #c1b49a",
    color: "#c1b49a",
    padding: "5px 15px",
    cursor: "pointer",
  },
  searchCard: {
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #222",
  },
  inputRow: { display: "flex", gap: "20px" },
  label: {
    display: "block",
    fontSize: "0.7rem",
    color: "#d3791d",
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    background: "#000",
    color: "#fff",
    padding: "10px",
    border: "1px solid #333",
  },
  input: {
    flex: 1,
    background: "#000",
    color: "#fff",
    padding: "10px",
    border: "1px solid #333",
  },
  searchBtn: {
    background: "#d3791d",
    border: "none",
    color: "#fff",
    padding: "0 20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultCard: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    borderLeft: "4px solid #d3791d",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  modelTitle: { fontSize: "1.2rem", margin: 0 },
  lotBadge: {
    background: "#d3791d",
    color: "#000",
    padding: "3px 10px",
    fontWeight: "bold",
  },
  badgeRow: { display: "flex", gap: "10px", marginBottom: "15px" },
  badge: {
    padding: "4px 10px",
    fontSize: "0.7rem",
    color: "#fff",
    borderRadius: "3px",
  },
  insigniaBadge: {
    border: "1px solid #d3791d",
    color: "#d3791d",
    padding: "4px 10px",
    fontSize: "0.7rem",
  },
  detailText: { fontSize: "0.9rem", color: "#ccc", margin: 0 },
  statusText: { textAlign: "center", color: "#444", marginTop: "40px" },
};

export default LotSearch;
