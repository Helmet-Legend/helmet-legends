import { jsPDF } from "jspdf";

// Votre logo Helmet Legends
const logoBase64 = "data:image/png;base64,...";

export const generateHelmetPDF = (helmet, lang = "fr") => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isFr = lang === "fr";
  const colorGold = [173, 138, 86]; // Or vieilli (#AD8A56)
  const colorBg = [26, 24, 18]; // Anthracite profond (#1A1812)
  const colorText = [229, 229, 229]; // Crème / Blanc cassé

  // --- 1. FOND DE PAGE ---
  doc.setFillColor(...colorBg);
  doc.rect(0, 0, 210, 297, "F");

  // --- 2. FILIGRANE (DISCRET ET CENTRÉ) ---
  try {
    doc.saveGraphicsState();
    const gState = new doc.GState({ opacity: 0.04 }); // Très subtil
    doc.setGState(gState);
    const size = 160;
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
  } catch (e) {}

  // --- 3. BORDURES MULTIPLES (CADRE DE PRESTIGE) ---
  doc.setDrawColor(...colorGold);
  // Ligne extérieure épaisse
  doc.setLineWidth(1.2);
  doc.rect(6, 6, 198, 285);
  // Lignes fines intérieures (effet cadre photo)
  doc.setLineWidth(0.3);
  doc.rect(8, 8, 194, 281);
  doc.rect(9.5, 9.5, 191, 278);

  // --- 4. EN-TÊTE MAGISTRAL ---
  doc.setTextColor(...colorGold);
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.text("HELMET LEGENDS", 105, 30, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(140, 140, 140);
  doc.text("ARCHIVE OFFICIELLE - DOSSIER D’EXPERTISE TECHNIQUE", 105, 38, {
    align: "center",
  });

  // Référence et Date (Ligne dorée)
  doc.setFontSize(9);
  doc.setTextColor(...colorGold);
  doc.text(`RÉFÉRENCE : #${helmet.lotNumber || "ID"}-6416`, 20, 50);
  doc.text(`ÉMIS LE : ${new Date().toLocaleDateString("fr-FR")}`, 190, 50, {
    align: "right",
  });
  doc.setLineWidth(0.4);
  doc.line(20, 52, 190, 52);

  // --- 5. ZONE IMAGE (CADRE CENTRAL) ---
  if (helmet.images?.main) {
    // Cadre de l'image
    doc.setDrawColor(...colorGold);
    doc.setLineWidth(0.8);
    doc.rect(40, 60, 130, 90); // Cadre principal
    doc.setLineWidth(0.2);
    doc.rect(41.5, 61.5, 127, 87); // Filet intérieur
    doc.addImage(
      helmet.images.main,
      "JPEG",
      42,
      62,
      126,
      86,
      undefined,
      "FAST"
    );
  }

  // --- 6. GRILLE DE DONNÉES EN DEUX COLONNES ---
  const specsY = 165;

  // Titres des colonnes
  doc.setTextColor(...colorGold);
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("SPÉCIFICATIONS TECHNIQUES", 20, specsY);
  doc.text("NOTES ET ANALYSE DE TERRAIN", 110, specsY);

  doc.setLineWidth(0.4);
  doc.line(20, specsY + 2, 95, specsY + 2);
  doc.line(110, specsY + 2, 190, specsY + 2);

  // Colonne Gauche : Specs Techniques
  let currentY = specsY + 12;
  const drawSpec = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(label.toUpperCase(), 22, currentY);
    doc.setTextColor(...colorText);
    doc.setFontSize(10);
    doc.text(String(value || "N/A"), 50, currentY);
    // Petite ligne de séparation grise sous chaque champ
    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.1);
    doc.line(22, currentY + 2, 95, currentY + 2);
    currentY += 10;
  };

  drawSpec("Usine", helmet.manufacturer);
  drawSpec("Modèle", helmet.model);
  drawSpec("Lot", "#" + helmet.lotNumber);
  drawSpec("Peinture", (helmet.paintCondition || "0") + "%");
  drawSpec("Taille Coque", helmet.shellSize);
  drawSpec("Insignes", helmet.decals);
  drawSpec("Poids", (helmet.weight || "0") + " g");

  // Colonne Droite : Notes (sous forme de puces)
  const notes = helmet.description || "Aucune note saisie pour cette pièce.";
  const noteLines = doc.splitTextToSize(notes, 75);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);

  let notesY = specsY + 12;
  noteLines.forEach((line) => {
    doc.setTextColor(...colorGold);
    doc.text("•", 110, notesY); // Puce dorée
    doc.setTextColor(200, 200, 200);
    doc.text(line, 115, notesY);
    notesY += 6;
  });

  // --- 7. MENTION LÉGALE (PIED DE PAGE) ---
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.2);
  doc.line(40, 272, 170, 272);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  const disclaimer =
    "Cet outil fournit une aide à l’analyse historique et ne constitue en aucun cas une certification d’authenticité ou d’attribution. Toute conclusion finale relève de l’expertise humaine.";
  doc.text(doc.splitTextToSize(disclaimer, 140), 105, 278, { align: "center" });

  doc.save(`Expertise_Legend_${helmet.model}_${helmet.lotNumber}.pdf`);
};
