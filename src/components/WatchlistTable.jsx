import React, { useMemo } from "react";
import { ExternalLink, Gem } from "lucide-react";
import {
  filterHelmetListings,
  analyzeBestOpportunity,
} from "../utils/helmetFilter";

// Tableau de veille "opportunités" : reçoit une liste brute d'annonces
// (voir la forme attendue en en-tête de src/utils/helmetFilter.js) et un
// index de référence optionnel (le contenu de
// DATABASE_ULTIME_NORMALISEE.json), applique les critères stricts
// d'expertise, puis n'affiche que les annonces retenues — triées par
// meilleur rapport rareté/prix — avec une courte analyse en dessous.
//
// Ce composant est purement présentationnel : il ne va chercher aucune
// annonce lui-même. C'est à l'appelant de lui fournir le tableau
// `listings` (import manuel, futur connecteur vers un flux externe...).
export default function WatchlistTable({ listings = [], referenceDatabase = [], lang = "fr" }) {
  const isFr = lang === "fr";

  const evaluations = useMemo(
    () => filterHelmetListings(listings, referenceDatabase),
    [listings, referenceDatabase]
  );

  const opportunities = useMemo(
    () =>
      evaluations
        .filter((e) => e.passed)
        .sort((a, b) => b.valueScore - a.valueScore),
    [evaluations]
  );

  const analysis = useMemo(() => analyzeBestOpportunity(evaluations), [evaluations]);

  const rejectedCount = evaluations.length - opportunities.length;

  return (
    <div className="bg-black/40 border border-amber-900/20 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-amber-900/20 flex items-center justify-between">
        <p className="text-[10px] uppercase font-black text-amber-600 tracking-widest">
          {isFr ? "Opportunités retenues" : "Retained opportunities"}
        </p>
        {evaluations.length > 0 && (
          <p className="text-[10px] italic opacity-40">
            {opportunities.length}/{evaluations.length}{" "}
            {isFr ? "annonces conformes" : "matching listings"}
          </p>
        )}
      </div>

      {opportunities.length === 0 ? (
        <p className="p-8 text-center text-xs italic opacity-50">
          {isFr
            ? "Aucune annonce ne passe les critères stricts pour le moment."
            : "No listing currently passes the strict criteria."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[9px] uppercase font-black text-amber-600/80 tracking-widest border-b border-amber-900/20">
                <th className="text-left p-3">{isFr ? "Modèle" : "Model"}</th>
                <th className="text-left p-3">{isFr ? "Vendeur" : "Seller"}</th>
                <th className="text-left p-3">{isFr ? "Localisation" : "Location"}</th>
                <th className="text-right p-3">{isFr ? "Prix" : "Price"}</th>
                <th className="text-left p-3">{isFr ? "État des insignes" : "Insignia condition"}</th>
                <th className="text-center p-3">{isFr ? "Lien" : "Link"}</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map(({ listing, rarityScore }) => (
                <tr
                  key={listing.id}
                  className="border-b border-amber-900/10 last:border-0 hover:bg-amber-900/5"
                >
                  <td className="p-3 font-bold text-[#f0ede0]">
                    {listing.model} {listing.manufacturer || ""}
                    {rarityScore >= 40 && (
                      <Gem size={11} className="inline ml-1.5 text-amber-500" />
                    )}
                  </td>
                  <td className="p-3 opacity-80">{listing.seller || "—"}</td>
                  <td className="p-3 opacity-80">{listing.location || "—"}</td>
                  <td className="p-3 text-right font-bold text-amber-500">
                    {listing.price} €
                  </td>
                  <td className="p-3 opacity-80">
                    {listing.decal?.type || "—"}
                    {listing.decal?.condition ? ` (${listing.decal.condition})` : ""}
                  </td>
                  <td className="p-3 text-center">
                    {listing.url ? (
                      <a
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-white inline-flex"
                      >
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rejectedCount > 0 && (
        <p className="px-5 pb-3 text-[10px] italic opacity-30">
          {rejectedCount} {isFr ? "annonce(s) écartée(s) par les critères." : "listing(s) excluded by the criteria."}
        </p>
      )}

      <div className="p-5 border-t border-amber-900/20 bg-black/20">
        <p className="text-[9px] uppercase font-black text-amber-600/80 tracking-widest mb-2">
          {isFr ? "Analyse" : "Analysis"}
        </p>
        <p className="text-xs italic leading-relaxed opacity-90">{analysis}</p>
      </div>
    </div>
  );
}
