import { jsPDF } from "jspdf";

/**
 * CHEMIN DU LOGO DANS LE DOSSIER PUBLIC
 */
const logoPath = "/icon-512.png";

const generateSerialNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HL-${y}${m}${d}-${rand}`;
};

export const generateHelmetPDF = async (helmet, lang = "fr") => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const isFr = lang === "fr";
  const serialNumber = generateSerialNumber();

  // 🎨 PALETTE EXPERT
  const gold = [173, 138, 86];
  const bg = [26, 24, 18];
  const textCrème = [229, 229, 229];
  const muted = [140, 140, 140];

  // 1. FOND DE PAGE SOMBRE
  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.rect(0, 0, 210, 297, "F");

  // 2. FILIGRANE (WATERMARK) PLEIN ÉCRAN
  try {
    doc.saveGraphicsState();
    const gState = new doc.GState({ opacity: 0.06 });
    doc.setGState(gState);
    const size = 155;
    const xPos = (210 - size) / 2;
    const yPos = (297 - size) / 2;
    doc.addImage(logoPath, "PNG", xPos, yPos, size, size, undefined, "FAST");
    doc.restoreGraphicsState();
  } catch (e) {
    console.warn("Filigrane ignoré");
  }

  // 3. TRIPLE CADRE DORÉ GLOBAL
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

  // 6. SPÉCIFICATIONS ET NOTES (2 COLONNES)
  const specsY = 155;
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text(
    isFr ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS",
    20,
    specsY
  );
  doc.text(
    isFr ? "NOTES ET ANALYSE DE TERRAIN" : "FIELD ANALYSIS",
    110,
    specsY
  );
  doc.setLineWidth(0.4);
  doc.line(20, specsY + 2, 95, specsY + 2);
  doc.line(110, specsY + 2, 190, specsY + 2);

  let curY = specsY + 12;
  const fields = [
    [isFr ? "Usine" : "Factory", helmet.manufacturer],
    [isFr ? "Modèle" : "Model", helmet.model],
    [isFr ? "Lot" : "Lot", "#" + (helmet.lotNumber || helmet.lot_raw)],
    [isFr ? "Peinture" : "Paint", (helmet.paintCondition || "0") + "%"],
    [isFr ? "Taille Coque" : "Shell Size", helmet.shellSize || helmet.size],
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

  const notesText =
    helmet.description ||
    (isFr ? "Aucun historique documenté." : "No documented history.");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text(doc.splitTextToSize(notesText, 75), 115, specsY + 12);

  // 7. GALERIE PHOTOS
  const galleryY = 248;
  const otherPhotos = Object.entries(helmet.images || {})
    .filter(([k, v]) => k !== "main" && v !== null)
    .slice(0, 4);

  let xPos = 20;
  otherPhotos.forEach(([key, url]) => {
    try {
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.2);
      doc.rect(xPos, galleryY, 40, 30);
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
    } catch (e) {
      console.error("Erreur galerie", e);
    }
  });

  // --- 8. AJOUT DU QR CODE (DÉPLACÉ EN HAUT À DROITE + PETIT CADRE) ---
  try {
    const helmetUrl = `https://app.helmetlegends.com/helmet/${
      helmet.id || "view"
    }`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      helmetUrl
    )}&color=ad8a56&bgcolor=1a1812`;

    const response = await fetch(qrImageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const base64data = reader.result;

      // --- NOUVEAU : PETIT CADRE DISCRET AUTOUR DU QR CODE ---
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.3); // Trait fin pour la discrétion
      // On dessine un carré légèrement plus grand (171,11) que l'image (172,12)
      // Taille 24x24 pour laisser 1mm de marge autour de l'image de 22x22
      doc.rect(171, 11, 24, 24);

      // Image du QR Code à l'intérieur du petit cadre
      doc.addImage(base64data, "PNG", 172, 12, 22, 22);

      // Légende en dessous
      doc.setFontSize(5);
      doc.setTextColor(gold[0], gold[1], gold[2]);
      doc.text(isFr ? "SCANNER LA FICHE" : "SCAN SHEET", 183, 37.5, {
        align: "center",
      });

      // 9. PIED DE PAGE
      doc.setFontSize(7);
      doc.setTextColor(muted[0], muted[1], muted[2]);
      doc.text("app.helmetlegends.com", 105, 290, { align: "center" });

      // SAUVEGARDE FINALE
      doc.save(`Archive_HL_${helmet.model}_${helmet.lotNumber || "Lot"}.pdf`);
    };
  } catch (err) {
    console.error("Erreur QR Code", err);
    doc.save(`Archive_HL_${helmet.model}_${helmet.lotNumber || "Lot"}.pdf`);
  }
};
