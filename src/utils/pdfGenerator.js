import { jsPDF } from "jspdf";

const getImageData = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Image non chargée:", url);
    return null;
  }
};

export const generateHelmetPDF = async (helmet, lang = "fr") => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const isFr = lang === "fr";

  const gold = [173, 138, 86];
  const brightGold = "ceac5d";
  const bg = [26, 24, 18];
  const textCrème = [229, 229, 229];
  const muted = [140, 140, 140];

  // Fond sombre
  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.rect(0, 0, 210, 297, "F");

  // Cadres dorés
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.2);
  doc.rect(6, 6, 198, 285);
  doc.setLineWidth(0.3);
  doc.rect(8, 8, 194, 281);
  doc.rect(9.5, 9.5, 191, 278);

  // En-tête
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.text("HELMET LEGENDS", 105, 28, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text(
    isFr ? "FICHE DESCRIPTIVE D'ARCHIVE" : "ARCHIVE DESCRIPTIVE SHEET",
    105,
    36,
    { align: "center" }
  );

  // Référence + Date
  const ref = helmet.id ? helmet.id.slice(0, 8).toUpperCase() : "N/A";
  const date = new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US");
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`${isFr ? "RÉFÉRENCE" : "REFERENCE"} : #${ref}`, 20, 47);
  doc.text(`${isFr ? "ÉMIS LE" : "ISSUED ON"} : ${date}`, 190, 47, {
    align: "right",
  });
  doc.setLineWidth(0.3);
  doc.line(15, 50, 195, 50);

  // Photo principale
  const mainPhoto = helmet.image_url_main;
  if (mainPhoto) {
    try {
      const imgData = await getImageData(mainPhoto);
      if (imgData) {
        doc.setDrawColor(gold[0], gold[1], gold[2]);
        doc.setLineWidth(0.8);
        doc.rect(45, 55, 120, 88);
        doc.addImage(imgData, "JPEG", 46, 56, 118, 86, undefined, "FAST");
      }
    } catch (e) {
      console.error("Erreur image principale");
    }
  }

  // Ligne séparatrice
  doc.setLineWidth(0.3);
  doc.line(15, 152, 195, 152);

  // Spécifications
  const specsY = 162;
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text(
    isFr ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS",
    20,
    specsY
  );
  doc.line(20, specsY + 2, 95, specsY + 2);

  let curY = specsY + 10;
  const fields = [
    [isFr ? "Usine" : "Factory", helmet.manufacturer],
    [isFr ? "Modèle" : "Model", helmet.model],
    [isFr ? "Lot" : "Lot", "#" + (helmet.lot_number || "-")],
    [isFr ? "Peinture" : "Paint", helmet.paint_condition || "-"],
    [isFr ? "Taille Coque" : "Shell Size", helmet.shell_size || "-"],
    [isFr ? "Insignes" : "Decals", helmet.decals || "-"],
  ];

  fields.forEach(([label, val]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text("• " + label.toUpperCase(), 22, curY);
    doc.setTextColor(textCrème[0], textCrème[1], textCrème[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(String(val || "-"), 58, curY);
    curY += 9;
  });

  // Notes & Analyse
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text(
    isFr ? "NOTES ET ANALYSE DE TERRAIN" : "FIELD ANALYSIS NOTES",
    110,
    specsY
  );
  doc.line(110, specsY + 2, 193, specsY + 2);

  const notesText =
    helmet.expertise_message ||
    helmet.description ||
    (isFr ? "Aucun historique disponible." : "No history available.");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  const splitNotes = doc.splitTextToSize(notesText, 78);
  doc.text(splitNotes, 112, specsY + 10);

  if (helmet.description && helmet.expertise_message) {
    const descY = specsY + 10 + splitNotes.length * 5 + 4;
    const splitDesc = doc.splitTextToSize(helmet.description, 78);
    doc.text(splitDesc, 112, descY);
  }

  // QR Code
  try {
    const helmetUrl = `https://app.helmetlegends.com/helmet/${
      helmet.id || "view"
    }`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      helmetUrl
    )}&color=${brightGold}&bgcolor=1a1812`;
    const qrBase64 = await getImageData(qrImageUrl);
    if (qrBase64) {
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.rect(171, 11, 24, 24);
      doc.addImage(qrBase64, "PNG", 172, 12, 22, 22);
    }
  } catch (err) {}

  // Pied de page
  doc.setLineWidth(0.3);
  doc.line(15, 275, 195, 275);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  const disclaimer = isFr
    ? "Cet outil fournit une aide à l'analyse historique et ne constitue en aucun cas une certification d'authenticité ou d'attribution. Toute conclusion finale relève de l'expertise humaine."
    : "This tool provides historical analysis assistance and does not constitute any certification of authenticity. Final conclusions rely on human expertise.";
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
  doc.text(splitDisclaimer, 105, 280, { align: "center" });

  // Sauvegarde
  const fileName = `HL_Archive_${helmet.model || "Certificat"}_${ref}.pdf`;
  doc.save(fileName);
};
