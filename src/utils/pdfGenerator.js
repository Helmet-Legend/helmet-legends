import { jsPDF } from "jspdf";

// Remplacez par votre véritable chaîne Base64 pour le filigrane
const logoBase64 = "data:image/png;base64,...";

const generateSerialNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HL-${y}${m}${d}-${rand}`;
};

export const generateHelmetPDF = (helmet, lang = "fr") => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const isFr = lang === "fr";
  const serialNumber = generateSerialNumber();

  // COULEURS EXPERT
  const gold = [173, 138, 86];
  const bg = [26, 24, 18];
  const textCrème = [229, 229, 229];
  const muted = [140, 140, 140];

  // 1. FOND SOMBRE
  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.rect(0, 0, 210, 297, "F");

  // 2. FILIGRANE LOGO (OPACITÉ 6% CENTRÉE)
  try {
    if (typeof doc.saveGraphicsState === "function" && logoBase64.length > 50) {
      doc.saveGraphicsState();
      const gState = new doc.GState({ opacity: 0.06 });
      doc.setGState(gState);
      const size = 155;
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
      doc.restoreGraphicsState();
    }
  } catch (e) {
    console.warn("Filigrane erreur:", e);
  }

  // 3. CADRES DORÉS
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.2);
  doc.rect(6, 6, 198, 285);
  doc.setLineWidth(0.3);
  doc.rect(8, 8, 194, 281);
  doc.rect(9.5, 9.5, 191, 278);

  // 4. EN-TÊTE
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.text("HELMET LEGENDS", 105, 28, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text(isFr ? "FICHE DESCRIPTIVE" : "DESCRIPTIVE SHEET", 105, 36, {
    align: "center",
  });

  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`RÉFÉRENCE : ${serialNumber}`, 20, 48);
  doc.text(`ÉMIS LE : ${new Date().toLocaleDateString("fr-FR")}`, 190, 48, {
    align: "right",
  });
  doc.setLineWidth(0.4);
  doc.line(20, 50, 190, 50);

  // 5. PHOTO PRINCIPALE
  if (helmet.images?.main) {
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.8);
    doc.rect(45, 58, 120, 85);
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

  // 6. SPÉCIFICATIONS TECHNIQUES (COLONNES)
  const specsY = 155;
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text(
    isFr ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS",
    20,
    specsY
  );
  doc.text(isFr ? "NOTES D'ANALYSE" : "FIELD ANALYSIS", 110, specsY);
  doc.setLineWidth(0.4);
  doc.line(20, specsY + 2, 95, specsY + 2);
  doc.line(110, specsY + 2, 190, specsY + 2);

  let curY = specsY + 12;
  const fields = [
    [isFr ? "Usine" : "Factory", helmet.manufacturer],
    [isFr ? "Modèle" : "Model", helmet.model],
    [isFr ? "Lot" : "Lot", "#" + helmet.lotNumber],
    [isFr ? "Peinture" : "Paint", (helmet.paintCondition || "0") + "%"],
    [isFr ? "Taille Coque" : "Shell Size", helmet.shellSize],
    [isFr ? "Taille Coiffe" : "Liner Size", helmet.linerSize],
    [isFr ? "Insignes" : "Decals", helmet.decals],
    [isFr ? "Poids" : "Weight", (helmet.weight || "0") + " g"],
    [isFr ? "Coiffe" : "Liner", helmet.linerCondition || helmet.linerState],
    [isFr ? "Jugulaire" : "Chinstrap", helmet.chinstrapState],
  ];

  fields.forEach(([label, val]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(label.toUpperCase() + " :", 22, curY);
    doc.setTextColor(textCrème[0], textCrème[1], textCrème[2]);
    doc.setFontSize(9);
    doc.text(String(val || "-"), 55, curY);
    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.1);
    doc.line(22, curY + 2, 95, curY + 2);
    curY += 8.5;
  });

  // NOTES D'ANALYSE
  const notes =
    helmet.description || (isFr ? "Aucune note saisie." : "No notes.");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text(doc.splitTextToSize(notes, 75), 115, specsY + 12);

  // 7. GALERIE PHOTOS (TITRE EFFACÉ POUR ÉVITER LES EMPRIÈTEMENTS)
  const galleryY = 248; // Position ajustée pour laisser respirer les détails techniques

  const otherViews = Object.entries(helmet.images || {})
    .filter(([k, v]) => k !== "main" && v !== null)
    .slice(0, 4);

  let xPos = 20;
  otherViews.forEach(([key, url]) => {
    try {
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.2);
      doc.rect(xPos, galleryY, 40, 30); // Cadres photos directs
      doc.addImage(
        url,
        "JPEG",
        xPos + 0.5,
        galleryY + 0.5,
        39,
        29,
        undefined,
        "FAST"
      );
      xPos += 45;
    } catch (e) {}
  });

  // 8. PIED DE PAGE
  doc.setFontSize(7);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("app.helmetlegends.com", 105, 290, { align: "center" });

  doc.save(`Expertise_HL_${helmet.model}_${helmet.lotNumber}.pdf`);
};
