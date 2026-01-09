import { jsPDF } from "jspdf";

// Votre logo Helmet Legends converti en Base64
const logoBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYA AAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfqAQgVHTap5AsFAACAAElE... (le reste de votre code)";

export const generateHelmetPDF = (helmet) => {
  const doc = new jsPDF();
  const primaryColor = [138, 127, 93]; // Or/Ambre technique
  const darkColor = [26, 24, 18]; // Noir profond de l'app

  // --- 1. EN-TÊTE FACTUEL (OPTION A) ---
  doc.setFillColor(...darkColor);
  doc.rect(0, 0, 210, 45, "F");

  // Ajout du LOGO
  try {
    doc.addImage(logoBase64, "PNG", 15, 7, 30, 30);
  } catch (e) {
    console.error("Erreur logo:", e);
  }

  // Titres ajustés pour être descriptifs et non certificatifs
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("HELMET LEGENDS", 50, 20);

  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.text("FICHE TECHNIQUE DESCRIPTIVE", 50, 29); // Titre Option A

  doc.setFontSize(9);
  doc.text(
    `RÉFÉRENCE DE FICHE : ${helmet.lotNumber || "ID"}-${Math.floor(
      Math.random() * 10000
    )}`,
    50,
    35
  );

  // Mention de responsabilité en en-tête
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Données générées sur la base des informations déclarées par l'utilisateur",
    50,
    40
  );

  // --- 2. INFORMATIONS GÉNÉRALES ---
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`${helmet.model}`, 20, 60);

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.8);
  doc.line(20, 63, 190, 63);

  doc.setFontSize(10);
  doc.text("DONNÉES DE FABRICATION DÉCLARÉES :", 20, 75);
  doc.setFont("helvetica", "normal");
  doc.text(`USINE / FABRICANT : ${helmet.manufacturer || "N/A"}`, 20, 82);
  doc.text(`NUMÉRO DE LOT : ${helmet.lotNumber || "N/A"}`, 20, 88);
  doc.text(
    `DATE D'ÉDITION : ${new Date().toLocaleDateString("fr-FR")}`,
    140,
    82
  );

  // --- 3. PHOTO PRINCIPALE ---
  if (helmet.images && helmet.images.main) {
    doc.setDrawColor(200, 200, 200);
    doc.rect(118, 95, 72, 52);
    doc.addImage(helmet.images.main, "JPEG", 120, 97, 68, 48);
  }

  // --- 4. NOTES ET HISTORIQUE ---
  doc.setFont("helvetica", "bold");
  doc.text("NOTES ET OBSERVATIONS SAISIES :", 20, 105);
  doc.setFont("helvetica", "italic");
  const description =
    helmet.description || "Aucune note saisie pour cette pièce.";
  const splitDesc = doc.splitTextToSize(description, 90);
  doc.text(splitDesc, 20, 112);

  // --- 5. EXAMEN VISUEL (LES 7 VUES) ---
  doc.setFillColor(248, 248, 245);
  doc.rect(15, 155, 180, 105, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("RÉCAPITULATIF DES VUES TECHNIQUES", 105, 165, { align: "center" });

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
  let y = 175;

  views.forEach((view, index) => {
    if (helmet.images && helmet.images[view]) {
      doc.addImage(helmet.images[view], "JPEG", x, y, 35, 26);
      doc.setFontSize(7);
      doc.text(view.toUpperCase(), x + 17.5, y + 32, { align: "center" });
    }
    x += 45;
    if ((index + 1) % 4 === 0) {
      x = 25;
      y += 42;
    }
  });

  // --- 6. PIED DE PAGE SÉCURISÉ ---
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Cette fiche d'identité technique est un récapitulatif numérique des données saisies par l'utilisateur.",
    105,
    285,
    { align: "center" }
  );
  doc.setTextColor(...primaryColor);
  doc.text("app.helmetlegends.com", 105, 290, { align: "center" });

  // Téléchargement avec nom de fichier neutre
  doc.save(
    `Fiche_${helmet.model.replace(/\s+/g, "_")}_${
      helmet.lotNumber || "sans-lot"
    }.pdf`
  );
};
