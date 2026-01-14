import { jsPDF } from "jspdf";

/**
 * Logo Helmet Legends (Base64)
 * Remplacez la chaîne ci-dessous par votre véritable code Base64
 */
const logoBase64 = "data:image/png;base64,...";

/**
 * Génère un numéro de série unique format HL-YYYYMMDD-XXXX
 */
const generateSerialNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HL-${y}${m}${d}-${rand}`;
};

export const generateHelmetPDF = (helmet, lang = "fr") => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isFr = lang === "fr";
  const serialNumber = generateSerialNumber();

  // 🎨 PALETTE DE COULEURS EXPERT
  const gold = [173, 138, 86]; // Or vieilli (#AD8A56)
  const bg = [26, 24, 18]; // Anthracite (#1A1812)
  const textCrème = [229, 229, 229]; // Crème (#E5E5E5)
  const muted = [140, 140, 140]; // Gris technique

  // ─────────────────────────────
  // 1. FOND DE PAGE SOMBRE
  // ─────────────────────────────
  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.rect(0, 0, 210, 297, "F");

  // ─────────────────────────────
  // 2. FILIGRANE (WATERMARK) DISCRET
  // ─────────────────────────────
  try {
    if (typeof doc.saveGraphicsState === "function") {
      doc.saveGraphicsState();
      const gState = new doc.GState({ opacity: 0.05 }); // 5% d'opacité
      doc.setGState(gState);

      if (logoBase64.length > 50) {
        const size = 150;
        doc.addImage(
          logoBase64,
          "PNG",
          (210 - size) / 2,
          (297 - size) / 2,
          size,
          size,
          undefined,
          "FAST"
        );
      }
      doc.restoreGraphicsState();
    }
  } catch (e) {
    console.warn("Filigrane non supporté :", e);
  }

  // ─────────────────────────────
  // 3. CADRES DE PRESTIGE (TRIPLE BORDURE)
  // ─────────────────────────────
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.2);
  doc.rect(6, 6, 198, 285); // Bordure extérieure épaisse
  doc.setLineWidth(0.3);
  doc.rect(8, 8, 194, 281); // Filet intérieur 1
  doc.rect(9.5, 9.5, 191, 278); // Filet intérieur 2

  // ─────────────────────────────
  // 4. EN-TÊTE MAGISTRAL
  // ─────────────────────────────
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.text("HELMET LEGENDS", 105, 28, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text(
    isFr
      ? "ARCHIVE OFFICIELLE - DOSSIER D'EXPERTISE TECHNIQUE"
      : "OFFICIAL ARCHIVE - TECHNICAL EXPERTISE FILE",
    105,
    36,
    { align: "center" }
  );

  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`RÉFÉRENCE : ${serialNumber}`, 20, 48);
  doc.text(`ÉMIS LE : ${new Date().toLocaleDateString("fr-FR")}`, 190, 48, {
    align: "right",
  });

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.line(20, 50, 190, 50);

  // ─────────────────────────────
  // 5. PHOTO PRINCIPALE (DANS SON CADRE)
  // ─────────────────────────────
  if (helmet.images?.main) {
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.8);
    doc.rect(45, 58, 120, 85); // Cadre photo principal
    doc.addImage(
      helmet.images.main,
      "JPEG",
      46,
      59,
      118,
      83,
      undefined,
      "FAST"
    );
  }

  // ─────────────────────────────
  // 6. SPÉCIFICATIONS ET NOTES (2 COLONNES)
  // ─────────────────────────────
  const specsY = 160;
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text(
    isFr ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS",
    20,
    specsY
  );
  doc.text(
    isFr ? "NOTES ET ANALYSE DE TERRAIN" : "FIELD ANALYSIS & NOTES",
    110,
    specsY
  );

  doc.setLineWidth(0.4);
  doc.line(20, specsY + 2, 95, specsY + 2);
  doc.line(110, specsY + 2, 190, specsY + 2);

  // Colonne Gauche : Specs Techniques
  let currentY = specsY + 12;
  const drawField = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(label.toUpperCase(), 22, currentY);
    doc.setTextColor(textCrème[0], textCrème[1], textCrème[2]);
    doc.setFontSize(10);
    doc.text(String(value || "N/A"), 55, currentY);
    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.1);
    doc.line(22, currentY + 2, 95, currentY + 2);
    currentY += 10;
  };

  drawField(isFr ? "Usine" : "Factory", helmet.manufacturer);
  drawField(isFr ? "Modèle" : "Model", helmet.model);
  drawField(isFr ? "Lot" : "Lot", "#" + helmet.lotNumber);
  drawField(isFr ? "Peinture" : "Paint", (helmet.paintCondition || "0") + "%");
  drawField(isFr ? "Taille Coque" : "Shell Size", helmet.shellSize);
  drawField(isFr ? "Insignes" : "Decals", helmet.decals);
  drawField(isFr ? "Poids" : "Weight", (helmet.weight || "0") + " g");

  // Colonne Droite : Notes (sous forme de puces)
  const notesText =
    helmet.description || (isFr ? "Aucune note saisie." : "No notes recorded.");
  const noteLines = doc.splitTextToSize(notesText, 75);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);

  let notesY = specsY + 12;
  noteLines.forEach((line) => {
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text("•", 110, notesY); // Puce dorée
    doc.setTextColor(200, 200, 200);
    doc.text(line, 115, notesY);
    notesY += 6;
  });

  // ─────────────────────────────
  // 7. PIED DE PAGE ET MENTION LÉGALE
  // ─────────────────────────────
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.2);
  doc.line(40, 275, 170, 275);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  const legal = isFr
    ? "Cet outil fournit une aide à l’analyse historique et ne constitue en aucun cas une certification d’authenticité. Toute conclusion finale relève de l’expertise humaine."
    : "This tool provides historical analysis assistance and does not constitute a certification of authenticity. Final conclusions rely on human expertise.";
  doc.text(doc.splitTextToSize(legal, 140), 105, 281, { align: "center" });

  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text("app.helmetlegends.com", 105, 288, { align: "center" });

  // Lancement du téléchargement
  doc.save(`Expertise_${helmet.model}_${helmet.lotNumber}.pdf`);
};
