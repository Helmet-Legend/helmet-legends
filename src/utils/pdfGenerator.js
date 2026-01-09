import { jsPDF } from "jspdf";

// Votre logo Helmet Legends
const logoBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYA AAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfqAQgVHTap5AsFAACAAElE... (votre code logo)";

export const generateHelmetPDF = (helmet) => {
  const doc = new jsPDF();
  const primaryColor = [138, 127, 93]; // Or technique
  const darkColor = [26, 24, 18]; // Noir profond

  // --- 1. EN-TÊTE FACTUEL ---
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
  doc.text("FICHE TECHNIQUE DESCRIPTIVE", 50, 29); // Titre neutre

  doc.setFontSize(9);
  doc.text(
    `RÉFÉRENCE DE FICHE : ${helmet.lotNumber || "ID"}-${Math.floor(
      Math.random() * 10000
    )}`,
    50,
    35
  );

  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Données générées sur la base des informations déclarées par l'utilisateur",
    50,
    40
  );

  // --- 2. MODÈLE ET LIGNE DE SÉPARATION ---
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`${helmet.model}`, 20, 60);

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.8);
  doc.line(20, 63, 190, 63);

  // --- 3. TABLEAU DES SPÉCIFICATIONS TECHNIQUES (NOUVEAU) ---
  doc.setFillColor(245, 245, 240);
  doc.rect(20, 70, 90, 75, "F"); // Fond gris clair pour les specs

  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.text("CARACTÉRISTIQUES DÉCLARÉES", 25, 78);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  const specs = [
    ["USINE", helmet.manufacturer || "N/A"],
    ["NUMÉRO DE LOT", helmet.lotNumber || "N/A"],
    ["TAILLE COQUE", helmet.shellSize || "N/A"],
    ["TAILLE COIFFE", helmet.linerSize || "N/A"],
    ["POIDS", helmet.weight ? `${helmet.weight} g` : "N/A"],
    ["MATÉRIAU", helmet.material || "N/A"],
    ["ÉTAT PEINTURE", `${helmet.paintCondition || 0}%`],
    ["ÉTAT COIFFE", helmet.linerCondition || "N/A"],
    ["JUGULAIRE", helmet.chinstrapState || "N/A"],
  ];

  let yPos = 85;
  specs.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label} :`, 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${value}`, 65, yPos);
    yPos += 7;
  });

  // --- 4. PHOTO PRINCIPALE ---
  if (helmet.images && helmet.images.main) {
    doc.setDrawColor(200, 200, 200);
    doc.rect(118, 70, 72, 75); // Cadre photo agrandi
    doc.addImage(
      helmet.images.main,
      "JPEG",
      120,
      72,
      68,
      71,
      undefined,
      "FAST"
    );
  }

  // --- 5. NOTES ET OBSERVATIONS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("NOTES ET OBSERVATIONS SAISIES :", 20, 155);
  doc.setFont("helvetica", "italic");
  const description =
    helmet.description || "Aucune note saisie pour cette pièce.";
  const splitDesc = doc.splitTextToSize(description, 170);
  doc.text(splitDesc, 20, 162);

  // --- 6. EXAMEN VISUEL (LES 7 VUES) ---
  doc.setFillColor(248, 248, 245);
  doc.rect(15, 185, 180, 95, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("RÉCAPITULATIF DES VUES TECHNIQUES", 105, 192, { align: "center" });

  const views = [
    "front",
    "left",
    "right",
    "back",
    "bottom",
    "interior",
    "chinstrap",
  ];
  let x = 25;
  let y = 200;

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
      doc.setFontSize(7);
      doc.text(view.toUpperCase(), x + 17.5, y + 32, { align: "center" });
    }
    x += 45;
    if ((index + 1) % 4 === 0) {
      x = 25;
      y += 40;
    }
  });

  // --- 7. PIED DE PAGE ---
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Cette fiche technique descriptive est un récapitulatif numérique des données saisies par l'utilisateur.",
    105,
    288,
    { align: "center" }
  );
  doc.setTextColor(...primaryColor);
  doc.text("app.helmetlegends.com", 105, 293, { align: "center" });

  doc.save(`Fiche_${helmet.model.replace(/\s+/g, "_")}.pdf`);
};
