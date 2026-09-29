import React, { useEffect, useState } from "react";
import {
  X,
  LayoutDashboard,
  Users,
  UserCheck,
  Shield,
  Images,
  Tag,
  MessageCircle,
  Flag,
  Loader2,
} from "lucide-react";
import { supabase } from "../supabaseClient";

// Tableau de bord réservé aux administrateurs (profiles.is_admin) — la
// fonction serveur get_admin_dashboard_stats() vérifie ce statut de son
// côté aussi, donc cet écran ne fait qu'afficher ce qu'elle renvoie.
export default function Dashboard({ setScreen, lang }) {
  const isFr = lang === "fr";
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    supabase
      .rpc("get_admin_dashboard_stats")
      .then(({ data, error }) => {
        if (error) {
          setStatus("error");
          return;
        }
        setStats(data);
        setStatus("ok");
      });
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString(isFr ? "fr-FR" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fusionne les 14 derniers jours (même sans donnée) pour un histogramme continu.
  const buildDailySeries = (byDay) => {
    const map = new Map((byDay || []).map((d) => [d.day, d.count]));
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ day: key, count: map.get(key) || 0 });
    }
    return days;
  };

  const StatCard = ({ icon: Icon, label, value, sub }) => (
    <div className="bg-black/50 border border-amber-900/30 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2 text-amber-600">
        <Icon size={16} />
        <p className="text-[9px] uppercase font-black tracking-widest opacity-70">
          {label}
        </p>
      </div>
      <p className="text-3xl font-black italic text-white">{value}</p>
      {sub && <p className="text-[10px] italic opacity-50 mt-1">{sub}</p>}
    </div>
  );

  const MiniBarChart = ({ data, colorClass }) => {
    const max = Math.max(1, ...data.map((d) => d.count));
    return (
      <div className="flex items-end gap-1.5 h-24">
        {data.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t ${colorClass}`}
              style={{ height: `${(d.count / max) * 80 + (d.count > 0 ? 4 : 0)}px` }}
              title={`${d.day} : ${d.count}`}
            />
            <span className="text-[7px] opacity-40">{d.day.slice(8, 10)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#1a1812] font-serif text-[#d0c7a8] relative">
      <div className="sticky top-0 z-20 flex items-center justify-between mb-2 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-amber-500" size={24} />
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            {isFr ? "Tableau de bord" : "Dashboard"}
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-24 opacity-50">
            <Loader2 size={32} className="animate-spin mb-3" />
            <p className="text-xs uppercase tracking-widest font-bold">
              {isFr ? "Chargement..." : "Loading..."}
            </p>
          </div>
        )}

        {status === "error" && (
          <p className="text-center py-24 text-sm opacity-50 italic">
            {isFr
              ? "Accès refusé ou erreur de chargement."
              : "Access denied or loading error."}
          </p>
        )}

        {status === "ok" && stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={Users}
                label={isFr ? "Comptes total" : "Total accounts"}
                value={stats.total_users}
                sub={`${stats.secured_users} ${isFr ? "sécurisés" : "secured"}`}
              />
              <StatCard
                icon={UserCheck}
                label={isFr ? "Nouveaux (7j)" : "New (7d)"}
                value={stats.new_users_7d}
                sub={`${stats.new_users_30d} ${isFr ? "sur 30j" : "in 30d"}`}
              />
              <StatCard
                icon={Shield}
                label={isFr ? "Casques enregistrés" : "Registered helmets"}
                value={stats.total_helmets}
                sub={`${stats.users_with_helmets} ${isFr ? "collectionneurs" : "collectors"}`}
              />
              <StatCard
                icon={Images}
                label={isFr ? "En galerie" : "In gallery"}
                value={stats.public_helmets}
              />
              <StatCard
                icon={Tag}
                label={isFr ? "En vente/échange" : "For sale/trade"}
                value={stats.listed_helmets}
              />
              <StatCard
                icon={MessageCircle}
                label={isFr ? "Messages" : "Messages"}
                value={stats.total_messages}
                sub={`${stats.total_conversations} ${isFr ? "conversations" : "conversations"}`}
              />
            </div>

            {stats.total_reports > 0 || stats.total_blocks > 0 ? (
              <div className="flex items-center gap-3 bg-red-900/10 border border-red-900/30 rounded-xl p-4 mb-8">
                <Flag size={18} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-300">
                  {stats.total_reports} {isFr ? "signalement(s)" : "report(s)"} ·{" "}
                  {stats.total_blocks} {isFr ? "blocage(s)" : "block(s)"}
                </p>
              </div>
            ) : null}

            <div className="bg-black/40 border border-amber-900/20 rounded-2xl p-5 mb-6">
              <p className="text-[10px] uppercase font-black text-amber-600 tracking-widest mb-4">
                {isFr ? "Nouveaux comptes (14 derniers jours)" : "New accounts (last 14 days)"}
              </p>
              <MiniBarChart
                data={buildDailySeries(stats.signups_by_day)}
                colorClass="bg-amber-600"
              />
            </div>

            <div className="bg-black/40 border border-amber-900/20 rounded-2xl p-5 mb-8">
              <p className="text-[10px] uppercase font-black text-amber-600 tracking-widest mb-4">
                {isFr ? "Casques ajoutés (14 derniers jours)" : "Helmets added (last 14 days)"}
              </p>
              <MiniBarChart
                data={buildDailySeries(stats.helmets_by_day)}
                colorClass="bg-blue-500"
              />
            </div>

            <div className="text-[10px] italic opacity-40 space-y-1 text-center">
              <p>
                {isFr ? "Dernière connexion : " : "Last signup: "}
                {formatDate(stats.last_signup)}
              </p>
              <p>
                {isFr ? "Dernier casque ajouté : " : "Last helmet added: "}
                {formatDate(stats.last_helmet_added)}
              </p>
              <p className="pt-2">
                {isFr
                  ? "Un compte \"nouveau\" est créé automatiquement à chaque première visite sans session existante — ce n'est pas forcément une personne différente à chaque fois."
                  : "A \"new\" account is created automatically on every first visit without an existing session — it doesn't always mean a different person each time."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
