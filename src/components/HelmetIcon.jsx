import React from "react";

// Silhouette de casque allemand (stahlhelm), dans le même style trait fin
// que les icônes lucide-react utilisées partout ailleurs dans l'app —
// reprend la forme du logo (dôme + bord évasé + rivets), pas le casque de
// chantier générique de lucide.
export const HelmetIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3.5 14.5C3.5 9.5 7.3 5.5 12 5.5s8.5 4 8.5 9" />
    <path d="M2.5 15c2 1 5.6 1.7 9.5 1.7s7.5-.7 9.5-1.7" />
    <circle cx="9" cy="10.5" r="0.5" fill="currentColor" />
    <circle cx="15" cy="10.5" r="0.5" fill="currentColor" />
  </svg>
);
