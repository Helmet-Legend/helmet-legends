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

// Rend transparents les pixels noirs/quasi-noirs d'une image (le logo est
// détouré sur fond noir plein) pour qu'il se fonde dans le fond du PDF
// au lieu d'apparaître posé dans un carré.
const stripBlackBackground = (dataUrl, threshold = 35) =>
  new Promise((resolve) => {
    if (!dataUrl) return resolve(dataUrl);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = imageData.data;
        for (let i = 0; i < px.length; i += 4) {
          if (px[i] <= threshold && px[i + 1] <= threshold && px[i + 2] <= threshold) {
            px[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });

const SECONDARY_VIEWS = [
  { id: "front", fr: "Face avant", en: "Front" },
  { id: "left", fr: "Côté gauche", en: "Left side" },
  { id: "right", fr: "Côté droit", en: "Right side" },
  { id: "interior", fr: "Intérieur", en: "Interior" },
];

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

  // Récupération des visuels en parallèle (logo, QR, photos)
  const secondaryPhotos = SECONDARY_VIEWS.filter((v) => helmet[`image_url_${v.id}`]);
  const [rawLogoData, mainImgData, ...secondaryImgData] = await Promise.all([
    getImageData(`${window.location.origin}/icon-512.png`),
    helmet.image_url_main ? getImageData(helmet.image_url_main) : Promise.resolve(null),
    ...secondaryPhotos.map((v) => getImageData(helmet[`image_url_${v.id}`])),
  ]);
  const logoData = await stripBlackBackground(rawLogoData);

  // En-tête : logo de la marque
  if (logoData) {
    doc.addImage(logoData, "PNG", 84.5, 8, 41, 41, undefined, "FAST");
  } else {
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("HELMET LEGENDS", 105, 28, { align: "center" });
  }

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text(
    isFr ? "CARTE D'IDENTITÉ DE LA PIÈCE" : "PIECE IDENTITY CARD",
    105,
    55,
    { align: "center" }
  );

  // Référence + Date
  const ref = helmet.id ? helmet.id.slice(0, 8).toUpperCase() : "N/A";
  const date = new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US");
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`${isFr ? "RÉFÉRENCE" : "REFERENCE"} : #${ref}`, 20, 61);
  doc.text(`${isFr ? "ÉMIS LE" : "ISSUED ON"} : ${date}`, 190, 61, {
    align: "right",
  });
  doc.setLineWidth(0.3);
  doc.line(15, 64, 195, 64);

  // QR Code (coin supérieur droit, en miroir du logo) — pointe vers la
  // fiche de vérification publique (lecture seule) de cette pièce précise.
  try {
    const helmetUrl = helmet.id
      ? `https://app.helmetlegends.com/helmet/${helmet.id}`
      : null;
    const qrImageUrl = helmetUrl
      ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
          helmetUrl
        )}&color=${brightGold}&bgcolor=1a1812`
      : null;
    const qrBase64 = qrImageUrl ? await getImageData(qrImageUrl) : null;
    if (qrBase64) {
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.rect(171, 11, 24, 24);
      doc.addImage(qrBase64, "PNG", 172, 12, 22, 22);
      doc.setFontSize(5.5);
      doc.setTextColor(muted[0], muted[1], muted[2]);
      doc.text(isFr ? "Vérifier" : "Verify", 183, 37, { align: "center" });
    }
  } catch (err) {}

  // Photo principale + photos secondaires
  // Le bloc visuel occupe toujours 69→160 ; la photo principale s'étend
  // jusqu'en bas s'il n'y a aucune photo secondaire à afficher en dessous.
  const hasSecondary = secondaryImgData.some(Boolean);
  const mainPhotoHeight = hasSecondary ? 70 : 91;

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.8);
  doc.rect(45, 69, 120, mainPhotoHeight);
  if (mainImgData) {
    doc.addImage(mainImgData, "JPEG", 46, 70, 118, mainPhotoHeight - 2, undefined, "FAST");
  } else {
    doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(
      isFr ? "AUCUN VISUEL PRINCIPAL" : "NO MAIN PHOTO",
      105,
      69 + mainPhotoHeight / 2,
      { align: "center" }
    );
  }

  if (hasSecondary) {
    const boxW = 27;
    const gap = 3;
    const n = secondaryPhotos.length;
    const rowWidth = n * boxW + (n - 1) * gap;
    const startX = 45 + (120 - rowWidth) / 2;
    const thumbY = 142;
    const thumbH = 24;

    secondaryPhotos.forEach((view, i) => {
      const x = startX + i * (boxW + gap);
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.5);
      doc.rect(x, thumbY, boxW, thumbH);
      const imgData = secondaryImgData[i];
      if (imgData) {
        doc.addImage(imgData, "JPEG", x + 0.8, thumbY + 0.8, boxW - 1.6, thumbH - 1.6, undefined, "FAST");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.setTextColor(muted[0], muted[1], muted[2]);
      doc.text((isFr ? view.fr : view.en).toUpperCase(), x + boxW / 2, thumbY + thumbH + 4, {
        align: "center",
      });
    });
  }

  // Ligne séparatrice
  doc.setLineWidth(0.3);
  doc.line(15, 172, 195, 172);

  // Spécifications — carte d'identité complète du casque
  const specsY = 182;
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text(
    isFr ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS",
    20,
    specsY
  );
  doc.line(20, specsY + 2, 95, specsY + 2);

  const addedOn = helmet.created_at
    ? new Date(helmet.created_at).toLocaleDateString(isFr ? "fr-FR" : "en-US")
    : "-";

  let curY = specsY + 10;
  const fields = [
    [isFr ? "Usine" : "Factory", helmet.manufacturer],
    [isFr ? "Branche" : "Branch", helmet.branch || "-"],
    [isFr ? "Modèle" : "Model", helmet.model],
    [isFr ? "Lot" : "Lot", "#" + (helmet.lot_number || "-")],
    [isFr ? "Taille Coque" : "Shell Size", helmet.shell_size || "-"],
    [isFr ? "Coiffe" : "Liner", helmet.liner_size || "-"],
    [isFr ? "Peinture" : "Paint", helmet.paint_condition || "-"],
    [isFr ? "Insignes" : "Decals", helmet.decals || "-"],
    [isFr ? "Ajouté le" : "Added on", addedOn],
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
    curY += 8;
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
  doc.setTextColor(textCrème[0], textCrème[1], textCrème[2]);
  const splitNotes = doc.splitTextToSize(notesText, 78);
  doc.text(splitNotes, 112, specsY + 10);

  if (helmet.description && helmet.expertise_message) {
    const descY = specsY + 10 + splitNotes.length * 5 + 4;
    const splitDesc = doc.splitTextToSize(helmet.description, 78);
    doc.text(splitDesc, 112, descY);
  }

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
  const fileName = `HL_CarteIdentite_${helmet.model || "Piece"}_${ref}.pdf`;
  doc.save(fileName);
};
