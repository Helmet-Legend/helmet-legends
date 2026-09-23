import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowLeft,
  MessageCircle,
  Send,
  HardHat,
  ShieldAlert,
  Loader2,
  Paperclip,
  MoreVertical,
  UserX,
  UserCheck,
  Flag,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { uploadToCloudinary } from "../utils/cloudinary";

// Messagerie entre membres sécurisés. Une seule conversation par paire
// d'utilisateurs (comme une vraie messagerie), les nouveaux messages
// arrivent en direct via Supabase Realtime -- pas besoin de rafraîchir.
export default function Messages({
  setScreen,
  lang,
  authUserId,
  initialConversationId,
  onConsumedInitial,
}) {
  const isFr = lang === "fr";
  const [view, setView] = useState("inbox"); // inbox | thread
  const [conversations, setConversations] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [activeConv, setActiveConv] = useState(null); // { id, other_username, helmet_model, helmet_image }
  const [messages, setMessages] = useState([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [blocking, setBlocking] = useState(false);
  const [reporting, setReporting] = useState(false);
  const scrollRef = useRef(null);

  const loadInbox = async () => {
    setLoadingInbox(true);
    const { data, error } = await supabase.rpc("get_my_conversations");
    if (!error) setConversations(data || []);
    setLoadingInbox(false);
  };

  useEffect(() => {
    loadInbox();
    // eslint-disable-next-line
  }, []);

  const openThread = async (conv) => {
    setActiveConv(conv);
    setView("thread");
    setLoadingThread(true);
    setShowTip(true);
    setShowMenu(false);
    setShowReportForm(false);
    setReportReason("");

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: true });
    setMessages(data || []);
    setLoadingThread(false);

    await supabase.rpc("mark_conversation_read", { p_conversation_id: conv.id });
    loadInbox();
  };

  // Ouvre directement le fil venant d'un bouton "Contacter" ailleurs
  // dans l'app (Galerie / Vente & Échange).
  useEffect(() => {
    if (!initialConversationId) return;
    (async () => {
      const { data } = await supabase.rpc("get_my_conversations");
      const conv = (data || []).find((c) => c.id === initialConversationId);
      if (conv) await openThread(conv);
      onConsumedInitial?.();
    })();
    // eslint-disable-next-line
  }, [initialConversationId]);

  // Temps réel : les nouveaux messages du fil ouvert apparaissent sans
  // avoir besoin de rafraîchir.
  useEffect(() => {
    if (!activeConv) return;
    const channel = supabase
      .channel(`messages-${activeConv.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConv.id}`,
        },
        (payload) => {
          setMessages((prev) =>
            prev.some((m) => m.id === payload.new.id) ? prev : [...prev, payload.new]
          );
          if (payload.new.sender_id !== authUserId) {
            supabase.rpc("mark_conversation_read", {
              p_conversation_id: activeConv.id,
            });
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConv, authUserId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body || !activeConv) return;
    setSending(true);
    setDraft("");
    const { error } = await supabase.from("messages").insert({
      conversation_id: activeConv.id,
      sender_id: authUserId,
      body,
    });
    setSending(false);
    if (error) {
      alert(
        error.code === "42501"
          ? isFr
            ? "Impossible d'envoyer ce message."
            : "This message could not be sent."
          : "Erreur : " + error.message
      );
      setDraft(body);
    }
  };

  const handleAttach = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file || !activeConv) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      const { error } = await supabase.from("messages").insert({
        conversation_id: activeConv.id,
        sender_id: authUserId,
        image_url: url,
      });
      if (error) throw error;
    } catch (err) {
      alert(isFr ? "Erreur d'envoi de la photo" : "Error sending photo");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleToggleBlock = async () => {
    if (!activeConv) return;
    setBlocking(true);
    setShowMenu(false);
    if (activeConv.i_blocked_them) {
      const { error } = await supabase
        .from("blocked_users")
        .delete()
        .eq("blocker_id", authUserId)
        .eq("blocked_id", activeConv.other_user_id);
      if (!error) {
        setActiveConv((c) => ({ ...c, i_blocked_them: false }));
      }
    } else {
      const { error } = await supabase.from("blocked_users").insert({
        blocker_id: authUserId,
        blocked_id: activeConv.other_user_id,
      });
      if (!error) {
        setActiveConv((c) => ({ ...c, i_blocked_them: true }));
      }
    }
    setBlocking(false);
    loadInbox();
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!activeConv || !reportReason.trim()) return;
    setReporting(true);
    const { error } = await supabase.from("reports").insert({
      reporter_id: authUserId,
      reported_id: activeConv.other_user_id,
      conversation_id: activeConv.id,
      reason: reportReason.trim(),
    });
    setReporting(false);
    if (error) {
      alert("Erreur : " + error.message);
      return;
    }
    setShowReportForm(false);
    setReportReason("");
    alert(isFr ? "Signalement envoyé. Merci." : "Report sent. Thank you.");
  };

  return (
    <div className="min-h-screen bg-[#1a1812] font-serif text-[#d0c7a8] relative flex flex-col">
      <div className="sticky top-0 z-20 flex items-center justify-between mb-2 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          {view === "thread" ? (
            <button
              onClick={() => {
                setView("inbox");
                setActiveConv(null);
              }}
              className="p-1 text-amber-500 active:scale-90 transition-transform"
            >
              <ArrowLeft size={22} />
            </button>
          ) : (
            <MessageCircle className="text-amber-500" size={24} />
          )}
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            {view === "thread"
              ? activeConv?.other_username
              : isFr
              ? "Messagerie"
              : "Messages"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {view === "thread" && (
            <div className="relative">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
              >
                <MoreVertical size={18} />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a1812] border border-amber-900/40 rounded-xl shadow-2xl overflow-hidden z-30">
                  <button
                    onClick={handleToggleBlock}
                    disabled={blocking}
                    className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-left hover:bg-amber-900/20 disabled:opacity-40"
                  >
                    {activeConv?.i_blocked_them ? (
                      <UserCheck size={14} />
                    ) : (
                      <UserX size={14} />
                    )}
                    {activeConv?.i_blocked_them
                      ? isFr
                        ? "Débloquer"
                        : "Unblock"
                      : isFr
                      ? "Bloquer"
                      : "Block"}
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowReportForm(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-left text-red-400 hover:bg-red-900/10"
                  >
                    <Flag size={14} />
                    {isFr ? "Signaler" : "Report"}
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {view === "inbox" && (
        <div className="max-w-2xl mx-auto w-full p-4 flex-1">
          {loadingInbox && (
            <div className="flex flex-col items-center justify-center py-24 opacity-50">
              <Loader2 size={32} className="animate-spin mb-3" />
              <p className="text-xs uppercase tracking-widest font-bold">
                {isFr ? "Chargement..." : "Loading..."}
              </p>
            </div>
          )}

          {!loadingInbox && conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center opacity-60">
              <MessageCircle size={48} className="mb-4 opacity-30" />
              <p className="text-sm uppercase font-black tracking-widest mb-2">
                {isFr ? "Aucune conversation" : "No conversations"}
              </p>
              <p className="text-xs italic opacity-60 max-w-xs">
                {isFr
                  ? "Contacte un membre depuis la Galerie ou Vente & Échange pour démarrer."
                  : "Contact a member from the Gallery or Buy & Trade to get started."}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => openThread(c)}
                className="w-full flex items-center gap-4 bg-black/50 border border-amber-900/30 rounded-2xl p-4 text-left hover:border-amber-600/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center shrink-0 overflow-hidden border border-amber-900/20">
                  {c.helmet_image ? (
                    <img
                      src={c.helmet_image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <HardHat size={24} className="opacity-30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-black uppercase italic text-amber-500 truncate">
                      {c.other_username}
                    </p>
                    {c.unread_count > 0 && (
                      <span className="bg-red-600 text-white text-[10px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center shrink-0">
                        {c.unread_count > 9 ? "9+" : c.unread_count}
                      </span>
                    )}
                  </div>
                  {c.helmet_model && (
                    <p className="text-[9px] uppercase font-bold text-amber-700 tracking-widest">
                      {c.helmet_model}
                    </p>
                  )}
                  <p
                    className={`text-xs truncate ${
                      c.unread_count > 0
                        ? "text-white font-bold"
                        : "text-white/50 italic"
                    }`}
                  >
                    {c.last_message ||
                      (isFr ? "Aucun message" : "No message yet")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "thread" && (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full overflow-hidden">
          {activeConv?.helmet_model && (
            <div className="flex items-center gap-3 px-4 py-3 bg-black/30 border-b border-amber-900/20 shrink-0">
              {activeConv.helmet_image && (
                <img
                  src={activeConv.helmet_image}
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover"
                />
              )}
              <p className="text-[10px] uppercase font-bold text-amber-500 tracking-widest">
                {isFr ? "À propos de : " : "About: "}
                {activeConv.helmet_model}
              </p>
            </div>
          )}

          {showTip && (
            <div className="mx-4 mt-3 p-3 bg-amber-900/10 border border-amber-900/30 rounded-xl flex gap-3 items-start shrink-0">
              <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed text-amber-200/90 flex-1">
                {isFr
                  ? "Ne paie jamais avant d'avoir reçu ou inspecté la pièce, méfie-toi des offres trop urgentes, et utilise le certificat de vérification pour confirmer qu'une fiche est authentique."
                  : "Never pay before receiving or inspecting the piece, be wary of urgent pressure, and use the verification certificate to confirm a listing is genuine."}
              </p>
              <button
                onClick={() => setShowTip(false)}
                className="text-amber-500/50 hover:text-amber-500 shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {showReportForm && (
            <form
              onSubmit={handleReport}
              className="mx-4 mt-3 p-3 bg-red-900/10 border border-red-900/30 rounded-xl shrink-0 space-y-2"
            >
              <p className="text-[10px] uppercase font-black text-red-400 tracking-widest">
                {isFr ? "Signaler ce membre" : "Report this member"}
              </p>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder={
                  isFr
                    ? "Explique le problème..."
                    : "Describe the issue..."
                }
                rows={3}
                className="w-full bg-black/60 border border-red-900/30 rounded-lg px-3 py-2 text-xs outline-none focus:border-red-500 resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest opacity-60"
                >
                  {isFr ? "Annuler" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={reporting || !reportReason.trim()}
                  className="flex-1 py-2 bg-red-900/40 border border-red-700/50 text-red-300 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-40"
                >
                  {reporting
                    ? isFr
                      ? "Envoi..."
                      : "Sending..."
                    : isFr
                    ? "Envoyer"
                    : "Send"}
                </button>
              </div>
            </form>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {loadingThread && (
              <div className="flex justify-center py-10 opacity-50">
                <Loader2 size={24} className="animate-spin" />
              </div>
            )}
            {!loadingThread &&
              messages.map((m) => {
                const mine = m.sender_id === authUserId;
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl overflow-hidden ${
                        mine
                          ? "bg-amber-600 text-black rounded-br-sm"
                          : "bg-black/60 border border-amber-900/20 text-[#d0c7a8] rounded-bl-sm"
                      }`}
                    >
                      {m.image_url && (
                        <a href={m.image_url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={m.image_url}
                            alt=""
                            className="max-w-full max-h-64 object-cover block"
                          />
                        </a>
                      )}
                      {m.body && (
                        <p className="px-4 py-2.5 text-sm leading-relaxed">
                          {m.body}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            <div ref={scrollRef} />
          </div>

          {activeConv?.i_blocked_them ? (
            <div className="p-4 border-t border-amber-900/20 shrink-0 flex items-center justify-between gap-3 bg-black/30">
              <p className="text-xs italic opacity-60">
                {isFr
                  ? "Tu as bloqué ce membre."
                  : "You've blocked this member."}
              </p>
              <button
                onClick={handleToggleBlock}
                disabled={blocking}
                className="px-4 py-2 border border-amber-700/40 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0"
              >
                {isFr ? "Débloquer" : "Unblock"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-amber-900/20 flex gap-2 shrink-0"
            >
              <label className="p-3 bg-black/60 border border-amber-900/30 rounded-full shrink-0 text-amber-500 cursor-pointer flex items-center justify-center active:scale-90 transition-transform">
                {uploadingImage ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Paperclip size={18} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingImage}
                  onChange={handleAttach}
                />
              </label>
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={isFr ? "Écris un message..." : "Write a message..."}
                className="flex-1 bg-black/60 border border-amber-900/30 rounded-full px-4 py-3 text-sm outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={sending || !draft.trim()}
                className="p-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-black rounded-full shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 119, 6, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}
