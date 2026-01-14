import React, { useState, useEffect } from "react";
// Importation corrigée selon votre arborescence
import { LOT_RANGES } from "../data/lotRanges";
import expertBg from "../assets/expert-bg.png";

const MODEL_DEFAULTS = {
  M35: {
    phase: "Production Initiale",
    years: "1935–1940",
    info: "Bords repliés, évents rapportés.",
  },
  M40: {
    phase: "Production Standard",
    years: "1940–1942",
    info: "Évents embossés.",
  },
  M42: {
    phase: "Production Tardive",
    years: "1942–1945",
    info: "Bords évasés.",
  },
};

const LotSearch = () => {
  const [db, setDb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMfr, setSelectedMfr] = useState("ET / ckl (Thale)");
  const [selectedSize, setSelectedSize] = useState("64");
  const [result, setResult] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/lotDatabase.json")
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

    const mfrKey = selectedMfr.split(" ")[0];

    // 1. RECHERCHE DE CONCORDANCE (VERT)
    const master = db.find(
      (i) =>
        i.mfr === mfrKey &&
        String(i.lot) === searchTerm &&
        String(i.size) === selectedSize
    );

    if (master) {
      setResult({
        ...MODEL_DEFAULTS[master.model || "M40"],
        ...master,
        type: "master",
        statusMessage: "CONCORDANCE TROUVÉE DANS L'ARCHIVE",
        statusColor: "#27ae60",
      });
      return;
    }

    // 2. RECHERCHE DANS LES REGISTRES D'USINE (ORANGE)
    const lotNum = parseInt(searchTerm);
    const range = LOT_RANGES.find(
      (r) => r.mfr === mfrKey && lotNum >= r.start && lotNum <= r.end
    );

    if (range) {
      setResult({
        ...MODEL_DEFAULTS[range.model || "M40"],
        ...range,
        type: "range",
        lot: searchTerm,
        size: selectedSize,
        decal: "À vérifier",
        statusMessage: "ESTIMATION D'APRÈS LES REGISTRES D'USINE",
        statusColor: "#d3791d",
      });
      return;
    }

    // 3. RÉPONSE SYSTÉMATIQUE
    setResult({
      ...MODEL_DEFAULTS["M40"],
      mfr: mfrKey,
      lot: searchTerm,
      size: selectedSize,
      decal: "Inconnu",
      type: "general",
      statusMessage: "ESTIMATION GÉNÉRALE (HORS REGISTRES PRÉCIS)",
      statusColor: "#d3791d",
    });
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000",
        color: "#f5f5f5",
        fontFamily: "serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${expertBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
          filter: "blur(5px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "450px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(193, 180, 154, 0.4)",
            paddingBottom: "15px",
            marginBottom: "25px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#d3791d", fontSize: "22px" }}>🗃️</span>
            <h1
              style={{
                color: "#c1b49a",
                fontSize: "1.3rem",
                textTransform: "uppercase",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              Recherche par lot
            </h1>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "rgba(193, 180, 154, 0.1)",
              border: "1px solid #c1b49a",
              color: "#c1b49a",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ← RETOUR
          </button>
        </header>

        <div
          style={{
            background: "rgba(25, 25, 25, 0.85)",
            padding: "25px",
            borderRadius: "25px",
            border: "1px solid rgba(193, 180, 154, 0.15)",
            backdropFilter: "blur(12px)",
            marginBottom: "30px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
          }}
        >
          <label
            style={{
              color: "#d3791d",
              fontSize: "0.75rem",
              fontWeight: "bold",
              display: "block",
              marginBottom: "10px",
              letterSpacing: "1px",
            }}
          >
            🏭 FABRICANT
          </label>
          <select
            value={selectedMfr}
            onChange={(e) => setSelectedMfr(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid #444",
              color: "white",
              padding: "14px",
              borderRadius: "12px",
              marginBottom: "25px",
              outline: "none",
              fontSize: "1rem",
            }}
          >
            <option>ET / ckl (Thale)</option>
            <option>Q (Quist)</option>
            <option>SE / hkp (Sachsische E.)</option>
            <option>NS (Vereinigte D.)</option>
            <option>EF (Emaillerwerke AG)</option>
          </select>

          <label
            style={{
              color: "#d3791d",
              fontSize: "0.75rem",
              fontWeight: "bold",
              display: "block",
              marginBottom: "10px",
              letterSpacing: "1px",
            }}
          >
            📐 TAILLE COQUE
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid #444",
              color: "white",
              padding: "14px",
              borderRadius: "12px",
              marginBottom: "25px",
              outline: "none",
              fontSize: "1rem",
            }}
          >
            {["60", "62", "64", "66", "68", "70"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label
            style={{
              color: "#d3791d",
              fontSize: "0.75rem",
              fontWeight: "bold",
              display: "block",
              marginBottom: "10px",
              letterSpacing: "1px",
            }}
          >
            NUMÉRO DE LOT
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Ex: 4520"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: "1px solid #444",
                color: "white",
                padding: "14px",
                borderRadius: "12px",
                outline: "none",
                fontSize: "1rem",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                background: "#d3791d",
                border: "none",
                width: "60px",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 5px 15px rgba(211, 121, 29, 0.3)",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🔍</span>
            </button>
          </div>
        </div>

        {/* --- SECTION RÉSULTAT MISE À JOUR --- */}
        {result && (
          <div
            style={{
              marginTop: "10px",
              padding: "25px",
              borderRadius: "20px",
              background: "rgba(30, 30, 30, 0.7)",
              borderLeft: `6px solid ${result.statusColor}`,
              boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                color: result.statusColor,
                fontSize: "0.75rem",
                fontWeight: "bold",
                marginBottom: "12px",
                letterSpacing: "1.5px",
              }}
            >
              {result.statusMessage}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "15px",
              }}
            >
              <h2
                style={{
                  color: "#c1b49a",
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {result.model || "M40"} {result.mfr}
              </h2>
              <span
                style={{
                  color: "#d3791d",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                #{result.lot}
              </span>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#ccc",
                margin: "0 0 20px 0",
              }}
            >
              Taille enregistrée : <strong>{result.size}</strong>
            </p>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "20px",
              }}
            >
              {/* Grille à 3 colonnes pour une meilleure lisibilité */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.65rem",
                      display: "block",
                      textTransform: "uppercase",
                    }}
                  >
                    Phase
                  </span>
                  <span style={{ fontSize: "0.85rem" }}>{result.phase}</span>
                </div>
                <div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.65rem",
                      display: "block",
                      textTransform: "uppercase",
                    }}
                  >
                    Période
                  </span>
                  <span style={{ fontSize: "0.85rem" }}>{result.years}</span>
                </div>
                <div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.65rem",
                      display: "block",
                      textTransform: "uppercase",
                    }}
                  >
                    Insigne
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#d3791d",
                      fontWeight: "bold",
                    }}
                  >
                    {result.decal}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: "#eee",
                  lineHeight: "1.5",
                  background: "rgba(0,0,0,0.2)",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                "{result.notes || result.info}"
              </p>
            </div>
            <div
              style={{
                marginTop: "25px",
                paddingTop: "15px",
                borderTop: "1px solid rgba(193, 180, 154, 0.2)",
                fontSize: "0.7rem",
                color: "rgba(255, 255, 255, 0.4)",
                textAlign: "center",
                lineHeight: "1.4",
              }}
            >
              ⚠️ <strong>Note de l'expert :</strong> Cet outil fournit une aide
              à l’analyse historique et ne constitue en aucun cas une
              certification d’authenticité ou d’attribution. Toute conclusion
              finale relève de l’expertise humaine.
            </div>
          </div>
        )}

        {!result && !isLoading && (
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.25)",
              marginTop: "40px",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            Entrez un numéro de lot pour lancer l'expertise
          </p>
        )}
      </div>
    </div>
  );
};

export default LotSearch;
