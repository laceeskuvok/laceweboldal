"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function WeddingMessagesForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("wedding_messages").insert({
      name,
      email,
      message,
    });

    if (!error) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }

    setSubmitting(false);
  }

  return (
    <motion.section
      id="uzenet"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="max-w-xl mx-auto px-6 py-20 text-center"
    >
      <h3 className="text-3xl font-semibold text-brand-rose mb-4">Üzenj nekünk!</h3>
      {submitted ? (
        <p className="text-green-600 font-medium">Köszönjük az üzeneted! ❤️</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Neved"
            className="w-full border rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email (opcionális)"
            className="w-full border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Üzeneted..."
            className="w-full border rounded px-4 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-rose text-white px-6 py-2 rounded shadow hover:bg-brand-rose/80 transition"
          >
            {submitting ? "Küldés..." : "Üzenet elküldése"}
          </button>
        </form>
      )}
    </motion.section>
  );
}
