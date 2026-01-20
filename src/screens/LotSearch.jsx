import React, { useState, useEffect } from "react";
import expertBg from "../assets/expert-bg.png";

// IMPORTATION DES ASSETS
import heerImg from "../assets/heer_decal.png";
import kmImg from "../assets/km_decal.png";
import ssImg from "../assets/SS_decal.png";
import poliImg from "../assets/polize_decali.png";
import lwImg from "../assets/lw_decal.png";

const BRANCH_CONFIG = {
  Heer: { bg: "#4a5d43", label: "HEER", img: heerImg },
  Luftwaffe: { bg: "#3c4e5e", label: "LUFTWAFFE", img: lwImg },
  "Waffen-SS": { bg: "#1a1a1a", label: "WAFFEN-SS", img: ssImg },
  Kriegsmarine: { bg: "#8b7355", label: "KRIEGSMARINE", img: kmImg },
  Polizei: { bg: "#2c3e50", label: "POLIZEI", img: poliImg },
  default: { bg: "#333", label: "À CONFIRMER", img: null },
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
      .catch(() => setIsLoading(false));
  }, []);

  const handleSearch = () => {
    if (!searchTerm) return;
    const numericInput = searchTerm.replace(/\D/g, "");
    const rawInput = searchTerm.trim().toUpperCase();

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
          <h1 style={styles.mainTitle}>Expertise de Lot</h1>
          <button
            onClick={() => (window.location.href = "/")}
            style={styles.backBtn}
          >
            ← RETOUR
          </button>
        </header>

        <div style={styles.searchBox}>
          <div style={styles.inputGrid}>
            <div style={{ flex: 1 }}>
              <label style={styles.fieldLabel}>FABRICANT</label>
              <select
                value={selectedMfr}
                onChange={(e) => setSelectedMfr(e.target.value)}
                style={styles.select}
              >
                <option value="ET">ET / ckl (Thale)</option>
                <option value="Q">Q (Quist)</option>
                <option value="SE">SE / hkp (Berlin)</option>
                <option value="NS">NS (Esslingen)</option>
                <option value="EF">EF (Fulda)</option>
              </select>
            </div>
            <div style={{ flex: 1.5 }}>
              <label style={styles.fieldLabel}>NUMÉRO DE LOT</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="text"
                  placeholder="Ex: 124"
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

        <div style={styles.resultsContainer}>
          {results.map((item, idx) => {
            const config = BRANCH_CONFIG[item.branch] || BRANCH_CONFIG.default;
            return (
              <div key={idx} style={styles.expertCard}>
                <div
                  style={{
                    ...styles.cardSideDecoration,
                    backgroundColor: config.bg,
                  }}
                />

                <div style={styles.cardHeader}>
                  <div style={{ flex: 1 }}>
                    <span style={styles.sourceText}>
                      DOSSIER : {item.sources[0]}
                    </span>
                    <h2 style={styles.helmetTitle}>
                      {item.model} {item.manufacturer} {item.size || ""}
                    </h2>
                    <div style={styles.badgeRow}>
                      <span
                        style={{
                          ...styles.branchBadge,
                          backgroundColor: config.bg,
                        }}
                      >
                        {config.label}
                      </span>
                      {item.insignia_type && (
                        <span style={styles.insigniaBadge}>
                          {item.insignia_type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ZONE DU SCEAU (LOT + IMAGE 55PX) */}
                  <div style={styles.stampArea}>
                    <div style={styles.lotStamp}>#{item.lot_raw}</div>
                    {config.img && (
                      <img
                        src={config.img}
                        alt="insigne"
                        style={styles.largeMiniature}
                      />
                    )}
                  </div>
                </div>

                <div style={styles.dataSection}>
                  <p style={styles.dataValue}>
                    {item.decals?.description_brute || "ND"}
                  </p>
                  {item.decals?.notes && (
                    <div style={styles.expertNotes}>
                      <span style={{ color: "#d3791d", fontWeight: "bold" }}>
                        NOTE :
                      </span>{" "}
                      {item.decals.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#d1d1d1",
    padding: "20px",
    fontFamily: "Georgia, serif",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "620px",
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
  mainTitle: {
    fontSize: "1.2rem",
    color: "#c1b49a",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  backBtn: {
    background: "none",
    border: "1px solid #c1b49a",
    color: "#c1b49a",
    padding: "5px 12px",
    cursor: "pointer",
    fontSize: "0.7rem",
  },
  searchBox: {
    background: "rgba(20, 20, 20, 0.9)",
    padding: "20px",
    border: "1px solid #222",
    marginBottom: "20px",
  },
  fieldLabel: {
    display: "block",
    fontSize: "0.65rem",
    color: "#d3791d",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "10px",
  },
  input: {
    flex: 1,
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "10px",
  },
  searchBtn: {
    background: "#d3791d",
    border: "none",
    color: "#000",
    padding: "0 20px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  expertCard: {
    position: "relative",
    background: "#151515",
    padding: "25px",
    border: "1px solid #222",
    marginBottom: "15px",
  },
  cardSideDecoration: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },
  sourceText: { fontSize: "0.6rem", color: "#555" },
  helmetTitle: { fontSize: "1.4rem", color: "#fff", margin: "4px 0 12px 0" },
  badgeRow: { display: "flex", gap: "10px", alignItems: "center" },
  branchBadge: {
    padding: "4px 10px",
    borderRadius: "2px",
    fontSize: "0.65rem",
    fontWeight: "bold",
    color: "#fff",
  },
  insigniaBadge: {
    border: "1px solid #d3791d",
    color: "#d3791d",
    padding: "3px 10px",
    fontSize: "0.65rem",
    fontWeight: "bold",
  },

  // ZONE SCEAU MISE À JOUR
  stampArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    minWidth: "110px",
  },
  lotStamp: {
    background: "#d3791d",
    color: "#000",
    padding: "4px 10px",
    fontWeight: "bold",
    fontSize: "1rem",
    width: "100%",
    textAlign: "center",
  },
  largeMiniature: {
    height: "55px",
    width: "auto",
    filter: "drop-shadow(0px 5px 6px rgba(0,0,0,0.8))",
  },

  dataSection: { borderTop: "1px solid #222", paddingTop: "15px" },
  dataValue: {
    fontSize: "0.95rem",
    color: "#ccc",
    marginBottom: "12px",
    fontFamily: "sans-serif",
  },
  expertNotes: {
    background: "rgba(0,0,0,0.2)",
    padding: "12px",
    borderLeft: "2px solid #555",
    fontSize: "0.85rem",
    color: "#888",
    fontStyle: "italic",
  },
};

export default LotSearch;
