import { jsPDF } from "jspdf";

export const generateHelmetPDF = async (helmet, lang = "fr") => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const isFr = lang === "fr";
    const gold = [173, 138, 86];
    const bg = [26, 24, 18];

    // 1. DESIGN DE BASE
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.rect(0, 0, 210, 297, "F");
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(1);
    doc.rect(7, 7, 196, 283);

    // 2. TITRE
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("HELMET LEGENDS", 105, 25, { align: "center" });

    // 3. INFOS DU CASQUE
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`MODELE : ${helmet.model || "N/A"}`, 20, 50);
    doc.text(`LOT : ${helmet.lot_number || helmet.lot_raw || "N/A"}`, 20, 60);

    // --- 4. LE QR CODE (VERSION SANS INSTALLATION) ---
    // On utilise l'API gratuite de QRServer
    const helmetUrl = `https://app.helmetlegends.com/helmet/${
      helmet.id || "search"
    }`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      helmetUrl
    )}&color=ad8a56&bgcolor=1a1812`;

    // On télécharge l'image du QR code et on l'ajoute au PDF
    const response = await fetch(qrImageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      doc.addImage(base64data, "PNG", 170, 260, 22, 22);

      // On sauvegarde seulement une fois que l'image est chargée
      doc.save(`Fiche_HL_${helmet.lot_number || "export"}.pdf`);
    };
  } catch (error) {
    console.error("Erreur PDF:", error);
    alert("Erreur lors de la génération. Vérifiez la console.");
  }
};
