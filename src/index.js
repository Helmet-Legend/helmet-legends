import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import PublicHelmet from "./screens/PublicHelmet";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Lien de vérification public (QR code du certificat PDF) : /helmet/<id>.
// Détecté avant tout le reste — aucune session, aucune donnée privée,
// aucun passage par l'app authentifiée.
const publicHelmetMatch = window.location.pathname.match(
  /^\/helmet\/([0-9a-fA-F-]{36})\/?$/
);

root.render(
  <StrictMode>
    {publicHelmetMatch ? (
      <PublicHelmet helmetId={publicHelmetMatch[1]} />
    ) : (
      <App />
    )}
  </StrictMode>
);
