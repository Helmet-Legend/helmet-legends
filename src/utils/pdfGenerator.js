import { jsPDF } from "jspdf";

const logoPath = "/icon-512.png";

const generateSerialNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HL-${y}${m}${d}-${rand}`;
};

const getBase64FromUrl = async (url) => {
  try {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Erreur de conversion d'image en Base64", e);
    return null;
  }
};

export const generateHelmetPDF = async (helmet, lang = "fr") => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const isFr = lang === "fr";
  const serialNumber = generateSerialNumber();

  const gold = [173, 138, 86];
  const brightGold = "ceac5d";
  const bg = [26, 24, 18];
  const textCrème = [229, 229, 229];
  const muted = [140, 140, 140];

  // 1. FOND DE PAGE
  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.rect(0, 0, 210, 297, "F");

  // 2. FILIGRANE
  try {
    doc.saveGraphicsState();
    const gState = new doc.GState({ opacity: 0.06 });
    doc.setGState(gState);
    const size = 155;
    doc.addImage(
      logoPath,
      "PNG",
      (210 - size) / 2,
      (297 - size) / 2,
      size,
      size,
      undefined,
      "FAST"
    );
    doc.restoreGraphicsState();
  } catch (e) {
    console.warn("Filigrane ignoré");
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

  // 5. RÉFÉRENCE ET DATE
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`RÉFÉRENCE : ${serialNumber}`, 20, 48);
  doc.text(`ÉMIS LE : ${new Date().toLocaleDateString("fr-FR")}`, 190, 48, {
    align: "right",
  });
  doc.setLineWidth(0.4);
  doc.line(20, 50, 190, 50);

  // 6. PHOTO PRINCIPALE — ✅ Corrigé : image_url_main
  if (helmet.image_url_main) {
    try {
      const imgData = await getBase64FromUrl(helmet.image_url_main);
      if (imgData) {
        doc.setDrawColor(gold[0], gold[1], gold[2]);
        doc.setLineWidth(0.8);
        doc.rect(45, 58, 120, 85);
        doc.addImage(imgData, "JPEG", 46, 59, 118, 83, undefined, "FAST");
      }
    } catch (e) {
      console.error("Erreur image principale", e);
    }
  }

  // 7. SPÉCIFICATIONS TECHNIQUES — ✅ Corrigé : snake_case
  const specsY = 155;
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text(
    isFr ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS",
    20,
    specsY
  );
  doc.text(isFr ? "NOTES ET ANALYSE" : "FIELD ANALYSIS", 110, specsY);
  doc.line(20, specsY + 2, 95, specsY + 2);
  doc.line(110, specsY + 2, 190, specsY + 2);

  let curY = specsY + 12;
  const fields = [
    [isFr ? "Usine" : "Factory", helmet.manufacturer],
    [isFr ? "Modèle" : "Model", helmet.model],
    [isFr ? "Lot" : "Lot", "#" + (helmet.lot_number || "-")],
    [isFr ? "Peinture" : "Paint", helmet.paint_condition || "-"],
    [isFr ? "Taille" : "Size", helmet.shell_size || "-"],
    [isFr ? "Insignes" : "Decals", helmet.decals || "-"],
  ];

  fields.forEach(([label, val]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(label.toUpperCase() + " :", 22, curY);
    doc.setTextColor(textCrème[0], textCrème[1], textCrème[2]);
    doc.setFontSize(9);
    doc.text(String(val || "-"), 55, curY);
    curY += 8.5;
  });

  const notesText =
    helmet.expertise_message ||
    helmet.description ||
    (isFr ? "Aucun historique." : "No history.");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text(doc.splitTextToSize(notesText, 75), 110, specsY + 12);

  // 8. GALERIE PHOTOS — ✅ Corrigé : image_url_*
  const galleryY = 248;
  const otherPhotos = [
    ["front", helmet.image_url_front],
    ["left", helmet.image_url_left],
    ["right", helmet.image_url_right],
    ["interior", helmet.image_url_interior],
  ]
    .filter(([_, v]) => v)
    .slice(0, 4);

  let xPos = 20;
  for (const [key, url] of otherPhotos) {
    try {
      const imgData = await getBase64FromUrl(url);
      if (imgData) {
        doc.setDrawColor(gold[0], gold[1], gold[2]);
        doc.setLineWidth(0.2);
        doc.rect(xPos, galleryY, 40, 30);
        doc.addImage(
          imgData,
          "JPEG",
          xPos + 0.5,
          galleryY + 0.5,
          39,
          29,
          undefined,
          "FAST"
        );
        xPos += 45;
      }
    } catch (e) {}
  }

  // 9. QR CODE
  try {
    const helmetUrl = `https://app.helmetlegends.com/helmet/${
      helmet.id || "view"
    }`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      helmetUrl
    )}&color=${brightGold}&bgcolor=1a1812`;
    const qrBase64 = await getBase64FromUrl(qrImageUrl);
    if (qrBase64) {
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.3);
      doc.rect(171, 11, 24, 24);
      doc.addImage(qrBase64, "PNG", 172, 12, 22, 22);
      doc.setFontSize(5);
      doc.setTextColor(gold[0], gold[1], gold[2]);
      doc.text(isFr ? "SCANNER LA FICHE" : "SCAN SHEET", 183, 37.5, {
        align: "center",
      });
    }
  } catch (err) {
    console.error("Erreur QR Code", err);
  }

  // 10. PIED DE PAGE
  doc.setFontSize(7);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("app.helmetlegends.com", 105, 290, { align: "center" });

  const safeModelName = (helmet.model || "Helmet").replace(
    /[/\\?%*:|"<>]/g,
    "-"
  );
  doc.save(`Archive_HL_${safeModelName}.pdf`);
};
