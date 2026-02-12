'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// === A TE EREDETI BORÍTÉK KOMPONENSED, JAVÍTOTT VEZÉRLÉSSEL ===
const EnvelopeMessage = ({ msg, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-md mx-auto cursor-pointer perspective-[1500px] break-inside-avoid"
      onClick={onToggle}
    >
      <div className="relative h-56 md:h-64">
        <div
          className="absolute inset-0 rounded-xl border border-[#b58e8e] z-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #e7c5c5, #d8aeb0), radial-gradient(circle at top left, rgba(255,255,255,0.3), transparent)",
            backgroundBlendMode: "overlay",
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.15), inset 0 -2px 3px rgba(255,255,255,0.2)",
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 rounded-t-xl origin-bottom z-10 border-b border-[#c29898]"
          animate={{
            rotateX: isOpen ? -160 : 0,
            backgroundImage: isOpen
              ? "linear-gradient(to bottom, #f8eaea, #f3dede)"
              : "linear-gradient(to bottom, #e7c5c5, #d8aeb0)",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            boxShadow: isOpen
              ? "inset 0 -3px 6px rgba(0,0,0,0.05)"
              : "0 6px 12px rgba(0,0,0,0.2)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-md border border-[#ebcaca] flex items-center justify-center group-hover:animate-pulse-slow transition-all duration-300">
            <Heart className="w-6 h-6 md:w-7 md:h-7 text-rose-400" />
          </div>
        </div>
        <motion.div
          className="absolute left-1/2 top-1/2 w-[90%] md:w-[85%] bg-white rounded-xl shadow-xl p-4 -translate-x-1/2 z-20"
          initial={false}
          animate={{
            x: "-50%",
            y: isOpen ? "-110%" : "-20%",
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
        >
          <p className="font-semibold text-[#b65d5d]">{msg.name}</p>
          <p className="text-gray-700 mt-2 text-sm whitespace-pre-wrap">
            {msg.message}
          </p>
          <p className="text-xs text-gray-400 mt-3 text-right">
            {new Date(msg.created_at).toLocaleString("hu-HU")}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WeddingMessages = () => {
  const [messages, setMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [openEnvelopeId, setOpenEnvelopeId] = useState(null); // State a nyitott borítékhoz

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("wedding_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setMessages(data);
    };

    fetchMessages();
  }, []);

  const handleToggleEnvelope = (id) => {
      setOpenEnvelopeId(prevId => (prevId === id ? null : id));
  };

  const displayedMessages = showAllMessages ? messages : messages.slice(0, 6); // 6 üzenet

  return (
    <section id="uzenet" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center">
        <h3 className="text-3xl font-semibold text-brand-rose mb-4">Jó Kívánságok</h3>
        <p className="text-gray-600 mb-12">
          Hagyjatok nekünk egy kedves üzenetet, amit az esküvő után is örömmel olvasunk majd vissza!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-8">
            Még nincs üzenet. Legyetek ti az elsők!
          </p>
        ) : (
          displayedMessages.map((msg, index) => (
            <EnvelopeMessage 
                key={msg.id} 
                msg={msg} 
                index={index} 
                isOpen={openEnvelopeId === msg.id} 
                onToggle={() => handleToggleEnvelope(msg.id)}
            />
          ))
        )}
      </div>

      {!showAllMessages && messages.length > 6 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAllMessages(true)}
            className="text-brand-rose font-semibold hover:underline"
          >
            További üzenetek betöltése ({messages.length - 6} db)
          </button>
        </div>
      )}
    </section>
  );
};

export default WeddingMessages;