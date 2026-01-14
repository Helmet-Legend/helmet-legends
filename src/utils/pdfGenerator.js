import { jsPDF } from "jspdf";

// Votre logo Helmet Legends (conservé)
const logoBase64 = "data:image/png;base64,...";

/**
 * Génère le Certificat d'Archivage Technique au design Expert Sombre
 * @param {Object} helmet - Données normalisées du casque
 * @param {string} expertiseMessage - Message d'analyse historique
 */
export const generateHelmetPDF = (helmet, expertiseMessage) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // --- CONFIGURATION DES COULEURS (IDENTITÉ VISUELLE) ---
  const colorAmber = [211, 121, 29]; // Or technique / Ambre
  const colorBg = [26, 24, 18]; // Anthracite profond (Fond)
  const colorText = [229, 229, 229]; // Blanc cassé (Données)
  const colorMuted = [150, 150, 150]; // Gris (Labels)

  // --- 1. FOND DE PAGE ET BORDURES DOUBLE ---
  doc.setFillColor(...colorBg);
  doc.rect(0, 0, 210, 297, "F"); // Fond total

  doc.setDrawColor(...colorAmber);
  doc.setLineWidth(0.8);
  doc.rect(5, 5, 200, 287); // Cadre extérieur
  doc.setLineWidth(0.2);
  doc.rect(7, 7, 196, 283); // Cadre intérieur fin

  // --- 2. EN-TÊTE ET LOGO ---
  try {
    doc.addImage(logoBase64, "PNG", 15, 12, 25, 25);
  } catch (e) {
    console.error("Erreur logo:", e);
  }

  doc.setTextColor(...colorAmber);
  doc.setFont("times", "bold");
  doc.setFontSize(26);
  doc.text("HELMET LEGENDS", 105, 22, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colorMuted);
  doc.text("CERTIFICAT D'ARCHIVAGE TECHNIQUE", 105, 28, { align: "center" });

  doc.setDrawColor(...colorAmber);
  doc.setLineWidth(0.5);
  doc.line(20, 38, 190, 38);

  doc.setFontSize(8);
  doc.setTextColor(...colorAmber);
  doc.text(
    `RÉFÉRENCE : ${helmet.lotNumber || "ID"}-${Math.floor(
      Math.random() * 10000
    )}`,
    20,
    44
  );
  doc.text(
    `DATE D'ÉMISSION : ${new Date().toLocaleDateString("fr-FR")}`,
    190,
    44,
    { align: "right" }
  );

  // --- 3. PHOTO PRINCIPALE (CENTRÉE ET CADRÉE) ---
  if (helmet.images && helmet.images.main) {
    doc.setDrawColor(...colorAmber);
    doc.setLineWidth(0.4);
    doc.rect(60, 52, 90, 68); // Cadre photo
    doc.addImage(helmet.images.main, "JPEG", 61, 53, 88, 66, undefined, "FAST");
  }

  // --- 4. GRILLE DES SPÉCIFICATIONS (DEUX COLONNES) ---
  const specsY = 130;
  doc.setTextColor(...colorAmber);
  doc.setFontSize(14);
  doc.setFont("times", "bold");
  doc.text("CARACTÉRISTIQUES DÉCLARÉES", 20, specsY);
  doc.line(20, specsY + 2, 95, specsY + 2);

  const leftColX = 25;
  const rightColX = 110;
  let currentY = specsY + 12;

  const drawDataField = (label, value, x, y) => {
    doc.setFontSize(8);
    doc.setTextColor(...colorMuted);
    doc.setFont("helvetica", "normal");
    doc.text(label + " :", x, y);
    doc.setFontSize(10);
    doc.setTextColor(...colorText);
    doc.setFont("helvetica", "bold");
    doc.text(String(value || "N/A"), x + 35, y);
  };

  // Liste des champs normalisés
  const fields = [
    ["USINE", helmet.manufacturer, "TAILLE COQUE", helmet.shellSize],
    ["NUMÉRO DE LOT", helmet.lotNumber, "TAILLE COIFFE", helmet.linerSize],
    [
      "INSIGNES",
      helmet.decals,
      "POIDS",
      helmet.weight ? `${helmet.weight} g` : "N/A",
    ],
    [
      "ÉTAT PEINTURE",
      helmet.paintCondition,
      "ÉTAT COIFFE",
      helmet.linerCondition || helmet.linerState,
    ],
    ["JUGULAIRE", helmet.chinstrapState, "MODÈLE", helmet.model],
  ];

  fields.forEach(([l1, v1, l2, v2]) => {
    drawDataField(l1, v1, leftColX, currentY);
    drawDataField(l2, v2, rightColX, currentY);
    currentY += 9;
  });

  // --- 5. RAPPORT D'ANALYSE HISTORIQUE ---
  currentY += 5;
  doc.setTextColor(...colorAmber);
  doc.setFontSize(13);
  doc.setFont("times", "bold");
  doc.text("RAPPORT D'ANALYSE HISTORIQUE", 20, currentY);
  doc.line(20, currentY + 2, 90, currentY + 2);

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  const finalMessage =
    helmet.expertiseMessage ||
    expertiseMessage ||
    "Analyse standard : configuration conforme aux standards connus.";
  const splitExpert = doc.splitTextToSize(finalMessage, 170);
  doc.text(splitExpert, 20, currentY + 10);

  // --- 6. VUES DE DÉTAILS (MOSAÏQUE) ---
  const detailY = 215;
  doc.setTextColor(...colorAmber);
  doc.setFontSize(11);
  doc.setFont("times", "bold");
  doc.text("VUES DE DÉTAILS", 105, detailY, { align: "center" });

  const technicalViews = ["interior", "chinstrap", "left", "right", "lot"];
  let xView = 20;
  technicalViews.forEach((view) => {
    if (helmet.images && helmet.images[view]) {
      doc.setDrawColor(60, 60, 60);
      doc.rect(xView, detailY + 5, 33, 25);
      doc.addImage(
        helmet.images[view],
        "JPEG",
        xView + 0.5,
        detailY + 5.5,
        32,
        24,
        undefined,
        "FAST"
      );
      xView += 37;
    }
  });

  // --- 7. PIED DE PAGE ET MENTION LÉGALE ---
  doc.setDrawColor(...colorAmber);
  doc.setLineWidth(0.2);
  doc.line(40, 275, 170, 275);

  doc.setFontSize(7);
  doc.setTextColor(...colorMuted);
  doc.setFont("helvetica", "normal");
  const legalDisclaimer =
    "Cet outil fournit une aide à l’analyse historique et ne constitue en aucun cas une certification d’authenticité ou d’attribution. Toute conclusion finale relève de l’expertise humaine.";
  doc.text(doc.splitTextToSize(legalDisclaimer, 150), 105, 281, {
    align: "center",
  });

  doc.setTextColor(...colorAmber);
  doc.text("app.helmetlegends.com", 105, 288, { align: "center" });

  doc.save(`Archive_HL_${helmet.model.replace(/\s+/g, "_")}.pdf`);
};
