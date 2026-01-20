import React, { useState, useEffect } from "react";
import expertBg from "../assets/expert-bg.png";

// IMPORTATION DES ASSETS
import heerImg from "../assets/heer_decal.png";
import kmImg from "../assets/km_decal.png";
import ssImg from "../assets/SS_decal.png";
import poliImg from "../assets/polize_decali.png";
import lwImg from "../assets/lw_decal.png";

const BRANCH_CONFIG = {
  Heer: { bg: "#4a5d43", label: "HEER", img: heerImg, count: 14560 },
  Luftwaffe: { bg: "#3c4e5e", label: "LUFTWAFFE", img: lwImg, count: 7764 },
  "Waffen-SS": { bg: "#1a1a1a", label: "WAFFEN-SS", img: ssImg, count: 2338 },
  Kriegsmarine: {
    bg: "#8b7355",
    label: "KRIEGSMARINE",
    img: kmImg,
    count: 879,
  },
  Polizei: { bg: "#2c3e50", label: "POLIZEI", img: poliImg, count: 1336 },
  default: { bg: "#333", label: "À CONFIRMER", img: null, count: 5791 },
};

const MFR_STATS = [
  { name: "ET (Thale)", count: 10797 },
  { name: "EF (Fulda)", count: 6334 },
  { name: "SE (Berlin)", count: 3769 },
  { name: "NS (Esslingen)", count: 3600 },
  { name: "CKL (Thale tardif)", count: 3463 },
  { name: "Q (Quist)", count: 2426 },
  { name: "HKP (Berlin tardif)", count: 2144 },
];

const LotSearch = () => {
  const [db, setDb] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMfr, setSelectedMfr] = useState("ET");
  const [results, setResults] = useState([]);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  useEffect(() => {
    fetch("/DATABASE_ULTIME_NORMALISEE.json")
      .then((res) => res.json())
      .then((data) => setDb(data))
      .catch((err) => console.error(err));
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
          <div>
            <h1 style={styles.mainTitle}>Registre d'Expertise</h1>
            <p style={styles.subTitle}>
              {db.length.toLocaleString()} ENTRÉES CERTIFIÉES
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            style={styles.backBtn}
          >
            ← RETOUR
          </button>
        </header>

        {/* --- ACCORDÉON DES STATISTIQUES --- */}
        <div style={styles.accordionWrapper}>
          <button
            onClick={() => setIsStatsOpen(!isStatsOpen)}
            style={styles.accordionHeader}
          >
            <span>📊 STATISTIQUES DE PRODUCTION</span>
            <span>{isStatsOpen ? "▲" : "▼"}</span>
          </button>

          {isStatsOpen && (
            <div style={styles.accordionBody}>
              <div style={styles.statsGrid}>
                <div style={styles.statsCol}>
                  <h4 style={styles.statsTitle}>RÉPARTITION PAR ARME</h4>
                  {Object.entries(BRANCH_CONFIG)
                    .filter(([k]) => k !== "default")
                    .map(([key, cfg]) => (
                      <div key={key} style={styles.statRow}>
                        <span style={styles.statLabel}>{cfg.label}</span>
                        <div style={styles.progressBarBg}>
                          <div
                            style={{
                              ...styles.progressBarFill,
                              width: `${((cfg.count / 32668) * 100).toFixed(
                                1
                              )}%`,
                              backgroundColor: cfg.bg,
                            }}
                          />
                        </div>
                        <span style={styles.statValue}>{cfg.count}</span>
                      </div>
                    ))}
                  <div
                    style={{
                      ...styles.statRow,
                      marginTop: "15px",
                      borderTop: "1px solid #333",
                      paddingTop: "10px",
                    }}
                  >
                    <h4 style={styles.statsTitle}>MODÈLES</h4>
                  </div>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>M35</span>
                    <span style={styles.statValue}>37.2%</span>
                  </div>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>M40</span>
                    <span style={styles.statValue}>28.6%</span>
                  </div>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>M42</span>
                    <span style={styles.statValue}>34.1%</span>
                  </div>
                </div>

                <div style={styles.statsCol}>
                  <h4 style={styles.statsTitle}>PRINCIPALES USINES</h4>
                  {MFR_STATS.map((mfr, i) => (
                    <div key={i} style={styles.statRow}>
                      <span style={{ ...styles.statLabel, width: "110px" }}>
                        {mfr.name}
                      </span>
                      <div style={styles.progressBarBg}>
                        <div
                          style={{
                            ...styles.progressBarFill,
                            width: `${((mfr.count / 10797) * 100).toFixed(1)}%`,
                            backgroundColor: "#d3791d",
                          }}
                        />
                      </div>
                      <span style={styles.statValue}>{mfr.count}</span>
                    </div>
                  ))}
                  <p style={styles.statsFooter}>
                    Données consolidées : Brian Ice, GHV & V3 Master.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RECHERCHE */}
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
                <option value="CKL">CKL (Fin de guerre)</option>
                <option value="HKP">HKP (Fin de guerre)</option>
              </select>
            </div>
            <div style={{ flex: 1.5 }}>
              <label style={styles.fieldLabel}>NUMÉRO DE LOT</label>
              <div style={{ display: "flex", gap: "8px" }}>
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

        {/* RÉSULTATS */}
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
                      SOURCE : {item.sources[0]}
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
                        EXPERTISE :
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
    backgroundColor: "#050505",
    color: "#d1d1d1",
    padding: "40px 20px",
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
    backgroundSize: "cover",
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "680px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #222",
    paddingBottom: "20px",
  },
  mainTitle: {
    fontSize: "1.6rem",
    color: "#c1b49a",
    textTransform: "uppercase",
    letterSpacing: "3px",
    margin: 0,
  },
  subTitle: {
    fontSize: "0.6rem",
    color: "#555",
    letterSpacing: "2px",
    marginTop: "5px",
  },
  backBtn: {
    background: "none",
    border: "1px solid #c1b49a",
    color: "#c1b49a",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "0.7rem",
    transition: "0.3s",
  },

  accordionWrapper: {
    background: "rgba(15, 15, 15, 0.95)",
    border: "1px solid #222",
    marginBottom: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  accordionHeader: {
    width: "100%",
    padding: "15px 20px",
    background: "none",
    border: "none",
    color: "#d3791d",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  accordionBody: { padding: "0 20px 25px 20px", borderTop: "1px solid #222" },
  statsGrid: {
    display: "flex",
    gap: "40px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  statsCol: { flex: 1, minWidth: "250px" },
  statsTitle: {
    fontSize: "0.65rem",
    color: "#c1b49a",
    marginBottom: "15px",
    borderBottom: "1px solid #333",
    display: "inline-block",
    paddingBottom: "3px",
  },
  statRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
    fontSize: "0.75rem",
  },
  statLabel: { width: "100px", color: "#777" },
  statValue: { fontWeight: "bold", color: "#fff", marginLeft: "auto" },
  progressBarBg: {
    flex: 1,
    height: "3px",
    background: "#1a1a1a",
    borderRadius: "1px",
    overflow: "hidden",
  },
  progressBarFill: { height: "100%" },
  statsFooter: {
    fontSize: "0.6rem",
    color: "#333",
    marginTop: "20px",
    fontStyle: "italic",
  },

  searchBox: {
    background: "#111",
    padding: "30px",
    border: "1px solid #222",
    marginBottom: "30px",
    borderRadius: "8px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },
  fieldLabel: {
    display: "block",
    fontSize: "0.7rem",
    color: "#d3791d",
    fontWeight: "bold",
    marginBottom: "10px",
    letterSpacing: "1px",
  },
  select: {
    width: "100%",
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "12px",
    outline: "none",
    borderRadius: "4px",
  },
  input: {
    flex: 1,
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "12px",
    outline: "none",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  searchBtn: {
    background: "#d3791d",
    border: "none",
    color: "#000",
    padding: "0 25px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "0.2s",
  },

  expertCard: {
    position: "relative",
    background: "#1a1a1a",
    padding: "30px",
    border: "1px solid #222",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  cardSideDecoration: {
    position: "absolute",
    left: 0,
    top: 15,
    bottom: 15,
    width: "4px",
    borderRadius: "0 4px 4px 0",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25px",
  },
  sourceText: {
    fontSize: "0.65rem",
    color: "#444",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  helmetTitle: {
    fontSize: "1.6rem",
    color: "#fff",
    margin: "8px 0 15px 0",
    letterSpacing: "-0.5px",
  },
  badgeRow: { display: "flex", gap: "10px" },
  branchBadge: {
    padding: "5px 12px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "#fff",
    borderRadius: "3px",
    letterSpacing: "0.5px",
  },
  insigniaBadge: {
    border: "1px solid #d3791d",
    color: "#d3791d",
    padding: "4px 12px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    borderRadius: "3px",
  },
  stampArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    minWidth: "120px",
    background: "rgba(0,0,0,0.2)",
    padding: "15px",
    borderRadius: "8px",
  },
  lotStamp: {
    background: "#d3791d",
    color: "#000",
    padding: "5px 15px",
    fontWeight: "900",
    fontSize: "1.1rem",
    textAlign: "center",
    borderRadius: "2px",
    width: "100%",
  },
  largeMiniature: {
    height: "55px",
    width: "auto",
    filter: "drop-shadow(0px 8px 10px rgba(0,0,0,0.8))",
  },
  dataSection: { borderTop: "1px solid #222", paddingTop: "20px" },
  dataValue: {
    fontSize: "1rem",
    color: "#bbb",
    fontFamily: "sans-serif",
    lineHeight: "1.5",
    fontStyle: "italic",
  },
  expertNotes: {
    background: "rgba(0,0,0,0.3)",
    padding: "15px",
    borderLeft: "2px solid #333",
    fontSize: "0.9rem",
    color: "#888",
    marginTop: "15px",
  },
};

export default LotSearch;
