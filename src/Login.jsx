import { useState } from "react";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react"; // ShieldCheck n'est plus nécessaire
import { supabase } from "../supabaseClient";
// REMPLACEZ PAR LE CHEMIN RÉEL DE VOTRE LOGO
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert("Erreur : " + error.message);
      else alert("Compte créé ! Vérifiez vos emails.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert("Erreur : " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] font-serif relative overflow-hidden p-6">
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #3a1a00 0%, #0d0d0d 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-3xl p-10 shadow-2xl overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(24px)",
          border: "2px solid rgba(120,53,15,0.35)",
        }}
      >
        {/* EN-TÊTE AVEC LOGO */}
        <div className="text-center mb-10">
          {/* Conteneur circulaire pour le logo */}
          <div
            className="w-28 h-28 bg-black rounded-full mx-auto flex items-center justify-center mb-6 p-1"
            style={{
              border: "2px solid rgb(217,119,6)",
              boxShadow: "0 0 40px rgba(217,119,6,0.3)",
            }}
          >
            <img
              src={logo}
              alt="Helmet Legends Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Titre et Sous-titre */}
          <h2 className="text-3xl font-black uppercase text-white tracking-tighter italic">
            Helmet Legends
          </h2>
          <p
            className="text-[10px] mt-2 uppercase font-bold tracking-[0.3em]"
            style={{ color: "rgba(217,119,6,0.7)" }}
          >
            L'Expert de Poche du Collectionneur
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleAuth}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div>
            <label
              className="block text-[10px] uppercase font-black mb-2 ml-2 tracking-widest"
              style={{ color: "rgba(217,119,6,0.5)" }}
            >
              Email
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: email ? "rgb(217,119,6)" : "rgb(120,53,15)" }}
                size={18}
              />
              <input
                type="email"
                required
                className="w-full bg-black/50 border-2 border-amber-900/25 rounded-2xl p-4 pl-12 text-sm text-white outline-none focus:border-amber-600 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-[10px] uppercase font-black mb-2 ml-2 tracking-widest"
              style={{ color: "rgba(217,119,6,0.5)" }}
            >
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: password ? "rgb(217,119,6)" : "rgb(120,53,15)",
                }}
                size={18}
              />
              <input
                type="password"
                required
                className="w-full bg-black/50 border-2 border-amber-900/25 rounded-2xl p-4 pl-12 text-sm text-white outline-none focus:border-amber-600 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full font-black uppercase text-sm p-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #b45309)",
              color: "black",
            }}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isSignUp ? (
              "Créer un Compte"
            ) : (
              "Se Connecter"
            )}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-amber-900/20 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] text-amber-500 uppercase font-black hover:underline tracking-widest"
          >
            {isSignUp ? "J'ai déjà un compte" : "Créer un compte expert"}
          </button>
        </div>
      </div>
    </div>
  );
}
