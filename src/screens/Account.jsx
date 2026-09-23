import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Mail,
  Lock,
  User as UserIcon,
  LogIn,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../supabaseClient";

// Compte optionnel : convertit la session anonyme existante en compte
// email + mot de passe (auth.updateUser), en conservant le même user_id
// et donc toute la collection déjà enregistrée. Aucune inscription n'est
// jamais imposée pour utiliser l'app normalement — cet écran n'est
// accessible que si l'utilisateur va lui-même le chercher.
//
// Le pseudo est choisi une seule fois, à la sécurisation du compte, et
// devient définitif (verrouillé aussi côté serveur par un trigger) —
// pour que l'identité derrière une annonce/fiche publiée reste fiable
// et ne puisse pas être changée après coup.
export default function Account({ setScreen, lang, user, profile, onChanged }) {
  const isFr = lang === "fr";
  const isUpgraded = user && user.is_anonymous === false;

  const [mode, setMode] = useState("upgrade"); // "upgrade" | "signin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!pseudo.trim()) {
      setError(isFr ? "Choisis un pseudo." : "Choose a display name.");
      return;
    }
    setLoading(true);
    const { data, error: updateError } = await supabase.auth.updateUser({
      email,
      password,
    });
    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }
    const uid = data?.user?.id || user?.id;
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: uid, username: pseudo.trim() });
    setLoading(false);
    if (profileError) {
      setError(profileError.message);
      return;
    }
    setSuccess(
      isFr
        ? "Compte sécurisé ! Si une confirmation par email est requise, vérifie ta boîte mail."
        : "Account secured! If an email confirmation is required, check your inbox."
    );
    await onChanged();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    await onChanged();
    setScreen("home");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setScreen("home");
  };

  return (
    <div className="min-h-screen bg-[#1a1812] font-serif text-[#d0c7a8] relative">
      <div className="sticky top-0 z-20 flex items-center justify-between mb-2 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-amber-500" size={24} />
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            {isFr ? "Mon Compte" : "My Account"}
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-md mx-auto p-6">
        {isUpgraded ? (
          <div className="space-y-6">
            <div className="p-5 bg-black/40 border border-amber-900/20 rounded-2xl">
              <p className="text-[10px] uppercase font-black opacity-40 mb-1 tracking-widest">
                {isFr ? "Email" : "Email"}
              </p>
              <p className="text-sm font-bold text-amber-100">{user.email}</p>
            </div>

            <div className="p-5 bg-black/40 border border-amber-900/20 rounded-2xl">
              <p className="text-[10px] uppercase font-black opacity-40 mb-1 tracking-widest">
                {isFr ? "Pseudo affiché" : "Display name"}
              </p>
              <p className="text-sm font-bold text-amber-100">
                {profile?.username || "—"}
              </p>
              <p className="text-[10px] italic opacity-40 mt-2">
                {isFr
                  ? "Définitif — choisi une seule fois pour garantir la fiabilité des annonces et fiches publiées."
                  : "Permanent — chosen once to keep published listings and records trustworthy."}
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-4 flex items-center justify-center gap-2 border border-red-900/40 text-red-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-900/10 transition-colors"
            >
              <LogOut size={16} />
              {isFr ? "Se déconnecter" : "Sign out"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-amber-900/20">
              <button
                onClick={() => {
                  setMode("upgrade");
                  setError("");
                  setSuccess("");
                }}
                className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === "upgrade"
                    ? "bg-amber-600 text-black"
                    : "text-amber-500 opacity-60"
                }`}
              >
                {isFr ? "Sécuriser mon compte" : "Secure my account"}
              </button>
              <button
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setSuccess("");
                }}
                className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === "signin"
                    ? "bg-amber-600 text-black"
                    : "text-amber-500 opacity-60"
                }`}
              >
                {isFr ? "J'ai déjà un compte" : "I already have an account"}
              </button>
            </div>

            {mode === "upgrade" ? (
              <>
                <p className="text-xs italic opacity-60 leading-relaxed">
                  {isFr
                    ? "Optionnel. Ça garde ta collection actuelle intacte et te donne un moyen de la retrouver si tu changes d'appareil, plus un pseudo pour la galerie publique."
                    : "Optional. This keeps your current collection intact and gives you a way to recover it if you switch devices, plus a display name for the public gallery."}
                </p>
                <form onSubmit={handleUpgrade} className="space-y-3">
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isFr ? "Adresse email" : "Email address"}
                      className="w-full bg-black/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
                    />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isFr ? "Mot de passe (6+ car.)" : "Password (6+ chars)"}
                      className="w-full bg-black/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="relative">
                    <UserIcon
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
                    />
                    <input
                      type="text"
                      required
                      value={pseudo}
                      onChange={(e) => setPseudo(e.target.value)}
                      placeholder={isFr ? "Pseudo affiché" : "Display name"}
                      className="w-full bg-black/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  {error && (
                    <p className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={14} /> {error}
                    </p>
                  )}
                  {success && (
                    <p className="flex items-center gap-2 text-xs text-green-400">
                      <CheckCircle2 size={14} /> {success}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-black rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {isFr ? "Sécuriser mon compte" : "Secure my account"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="text-xs italic opacity-60 leading-relaxed">
                  {isFr
                    ? "Se connecter à un compte existant remplace la session actuelle de cet appareil. Toute donnée enregistrée uniquement ici, sans compte, ne sera plus accessible après connexion."
                    : "Signing in to an existing account replaces this device's current session. Any data saved only here, without an account, won't be accessible after signing in."}
                </p>
                <form onSubmit={handleSignIn} className="space-y-3">
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isFr ? "Adresse email" : "Email address"}
                      className="w-full bg-black/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
                    />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isFr ? "Mot de passe" : "Password"}
                      className="w-full bg-black/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  {error && (
                    <p className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={14} /> {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-black rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogIn size={16} />
                    )}
                    {isFr ? "Se connecter" : "Sign in"}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
