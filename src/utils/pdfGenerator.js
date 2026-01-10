import { jsPDF } from "jspdf";

// Votre logo Helmet Legends (conservé)
const logoBase64 = "data:image/png;base64,...";

/**
 * Génère le PDF incluant les spécifications techniques et l'analyse d'expertise
 * @param {Object} helmet - Les données du casque (incluant helmet.expertiseMessage)
 * @param {string} expertiseMessage - (Optionnel) Message de secours passé en direct
 */
export const generateHelmetPDF = (helmet, expertiseMessage) => {
  const doc = new jsPDF();
  const primaryColor = [138, 127, 93]; // Or technique
  const darkColor = [26, 24, 18]; // Noir profond

  // --- 1. EN-TÊTE ---
  doc.setFillColor(...darkColor);
  doc.rect(0, 0, 210, 45, "F");

  try {
    doc.addImage(logoBase64, "PNG", 15, 7, 30, 30);
  } catch (e) {
    console.error("Erreur logo:", e);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("HELMET LEGENDS", 50, 20);

  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.text("CERTIFICAT D'ARCHIVAGE TECHNIQUE", 50, 29);

  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text(
    `RÉFÉRENCE : ${helmet.lotNumber || "ID"}-${Math.floor(
      Math.random() * 10000
    )}`,
    50,
    35
  );
  doc.text(
    `DATE D'ÉMISSION : ${new Date().toLocaleDateString("fr-FR")}`,
    50,
    39
  );

  // --- 2. MODÈLE ET LIGNE DE SÉPARATION ---
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`${helmet.model}`, 20, 60);

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.8);
  doc.line(20, 63, 190, 63);

  // --- 3. TABLEAU DES SPÉCIFICATIONS TECHNIQUES ---
  doc.setFillColor(245, 245, 240);
  doc.rect(20, 70, 95, 85, "F");

  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.text("CARACTÉRISTIQUES DÉCLARÉES", 25, 78);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  const specs = [
    ["USINE", helmet.manufacturer || "N/A"],
    ["NUMÉRO DE LOT", helmet.lotNumber || "N/A"],
    ["INSIGNES", helmet.decals || "Aucun"],
    ["TAILLE COQUE", helmet.shellSize || "N/A"],
    ["TAILLE COIFFE", helmet.linerSize || "N/A"],
    ["POIDS", helmet.weight ? `${helmet.weight} g` : "N/A"],
    ["ÉTAT PEINTURE", helmet.paintCondition || "N/A"],
    ["ÉTAT COIFFE", helmet.linerCondition || "N/A"],
    ["JUGULAIRE", helmet.chinstrapState || "N/A"],
  ];

  let yPos = 86;
  specs.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label} :`, 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${value}`, 65, yPos);
    yPos += 8;
  });

  // --- 4. PHOTO PRINCIPALE ---
  if (helmet.images && helmet.images.main) {
    doc.setDrawColor(200, 200, 200);
    doc.rect(120, 70, 70, 85);
    doc.addImage(
      helmet.images.main,
      "JPEG",
      122,
      72,
      66,
      81,
      undefined,
      "FAST"
    );
  }

  // --- 5. RAPPORT D'EXPERTISE (CORRECTION DE LA LOGIQUE) ---
  const expertiseY = 162;
  doc.setFillColor(240, 238, 230);
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(20, expertiseY, 170, 25, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...primaryColor);
  doc.text("RAPPORT D'ANALYSE HISTORIQUE", 25, expertiseY + 7);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);

  // PRIORITÉ AU MESSAGE DÉJÀ ENREGISTRÉ DANS L'OBJET HELMET
  const finalMessage =
    helmet.expertiseMessage ||
    expertiseMessage ||
    "Analyse standard : configuration conforme aux standards de production connus.";

  const splitExpert = doc.splitTextToSize(finalMessage, 160);
  doc.text(splitExpert, 25, expertiseY + 13);

  // --- 6. NOTES ET OBSERVATIONS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...darkColor);
  doc.text("NOTES ET OBSERVATIONS DE COLLECTION :", 20, 195);
  doc.setFont("helvetica", "normal");
  const description =
    helmet.description || "Aucune note saisie pour cette pièce.";
  const splitDesc = doc.splitTextToSize(description, 170);
  doc.text(splitDesc, 20, 202);

  // --- 7. RÉCAPITULATIF DES VUES TECHNIQUES ---
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("VUES DE DÉTAILS", 105, 232, { align: "center" });

  const views = [
    "front",
    "left",
    "right",
    "back",
    "bottom",
    "interior",
    "chinstrap",
  ];
  let x = 20;
  let y = 238;

  views.forEach((view, index) => {
    if (helmet.images && helmet.images[view]) {
      doc.addImage(
        helmet.images[view],
        "JPEG",
        x,
        y,
        35,
        26,
        undefined,
        "FAST"
      );
      doc.setFontSize(6);
      doc.text(view.toUpperCase(), x + 17.5, y + 30, { align: "center" });
    }
    x += 45;
    if ((index + 1) % 4 === 0) {
      x = 20;
      y += 38;
    }
  });

  // --- 8. PIED DE PAGE ---
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Certificat numérique descriptif généré par Helmet Legends Archive.",
    105,
    290,
    { align: "center" }
  );
  doc.setTextColor(...primaryColor);
  doc.text("app.helmetlegends.com", 105, 294, { align: "center" });

  doc.save(`Archive_HL_${helmet.model.replace(/\s+/g, "_")}.pdf`);
};
