// components/WeddingGifts.js
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Plus, UploadCloud, Check } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// === Supabase inicializálás ===
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const WeddingGifts = () => {
  const [giftList, setGiftList] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const [addGiftModalOpen, setAddGiftModalOpen] = useState(false);

  const fetchGifts = async () => {
    const { data, error } = await supabase
      .from("ajandeklista")
      .select("*")
      .order("created_at");
    if (!error) setGiftList(data);
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleClaimGift = async (id, name) => {
    const { error } = await supabase
      .from("ajandeklista")
      .update({ is_claimed: true, claimed_by: name || "Egy kedves vendég" })
      .eq("id", id);

    if (!error) {
      fetchGifts();
      setSelectedGift(null);
    } else {
      alert("Hiba történt a foglalás során.");
    }
  };

  const handleAddNewGift = async ({ name, description, imageFile }) => {
    try {
      let imageUrl = null;
      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from("testimonials")
          .upload(`gifts/${fileName}`, imageFile);
        if (uploadError) throw uploadError;

        imageUrl = supabase.storage
          .from("testimonials")
          .getPublicUrl(data.path).data.publicUrl;
      }

      const { error } = await supabase
        .from("ajandeklista")
        .insert([{ name, description, image_url: imageUrl }]);

      if (error) throw error;

      fetchGifts();
      setAddGiftModalOpen(false);
    } catch (error) {
      alert("Hiba történt a hozzáadás során.");
      console.error("Hozzáadási hiba:", error);
    }
  };

  return (
    <>
      <motion.section
        id="ajandek"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-brand-rose mb-4">Ajándékötletek</h3>
          <p className="text-gray-600 mb-10">
            Számunkra a legnagyobb ajándék, ha velünk ünnepeltek! Ha mégis szeretnétek meglepni
            minket valamivel, az alábbi listával szeretnénk segíteni nektek.
          </p>
        </div>

        <div className="space-y-4">
          {giftList.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg flex items-center gap-4 transition-all ${
                item.is_claimed ? "bg-gray-100" : "bg-rose-50"
              }`}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="flex-grow">
                <p
                  className={`font-semibold ${
                    item.is_claimed
                      ? "text-gray-400 line-through"
                      : "text-brand-text"
                  }`}
                >
                  {item.name}
                </p>
                {item.description && (
                  <p
                    className={`text-sm ${
                      item.is_claimed ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </p>
                )}
                {item.is_claimed && (
                  <p className="text-xs text-gray-500 mt-1">
                    Lefoglalva ({item.claimed_by})
                  </p>
                )}
              </div>
              {!item.is_claimed && (
                <button
                  onClick={() => setSelectedGift(item)}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-brand-rose text-brand-rose rounded-full hover:bg-brand-rose/10 transition"
                >
                  <Check size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setAddGiftModalOpen(true)}
            className="btn-primary text-sm"
          >
            + Új ajándékötlet hozzáadása
          </button>
        </div>
      </motion.section>

      {selectedGift && (
        <ClaimGiftModal
          item={selectedGift}
          onClaim={handleClaimGift}
          onCancel={() => setSelectedGift(null)}
        />
      )}

      {addGiftModalOpen && (
        <AddGiftModal
          onAdd={handleAddNewGift}
          onCancel={() => setAddGiftModalOpen(false)}
        />
      )}
    </>
  );
};

// === MODAL: Ajándék lefoglalása ===
const ClaimGiftModal = ({ item, onClaim, onCancel }) => {
  const [name, setName] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
      >
        <Gift className="mx-auto h-12 w-12 text-brand-rose" />
        <h2 className="mt-4 text-2xl font-serif text-gray-800">
          Ajándék lefoglalása
        </h2>
        <p className="mt-2 text-gray-600">
          Szeretnéd lefoglalni a következőt:{" "}
          <strong className="text-brand-text">{item.name}</strong>?
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Neved (opcionális)"
          className="w-full mt-4 border rounded px-4 py-2"
        />
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Mégse
          </button>
          <button
            onClick={() => onClaim(item.id, name)}
            className="px-6 py-2 rounded-full text-white bg-brand-rose hover:bg-opacity-80"
          >
            Lefoglalom
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// === MODAL: Új ajándék hozzáadása ===
const AddGiftModal = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const imageInputRef = useRef(null);

  const handleAddClick = () => {
    if (!name) {
      alert("Kérlek, add meg az ajándék nevét!");
      return;
    }
    setIsAdding(true);
    onAdd({ name, description, imageFile });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4"
      >
        <Plus className="mx-auto h-12 w-12 text-brand-rose" />
        <h2 className="text-2xl font-serif text-gray-800">Új ajándékötlet</h2>

        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />
        <div
          onClick={() => imageInputRef.current.click()}
          className="mt-1 flex justify-center items-center w-full h-32 px-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
        >
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              className="h-full rounded-md object-contain p-2"
            />
          ) : (
            <div className="text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
              <p className="text-xs text-gray-500">Kép feltöltése (opcionális)</p>
            </div>
          )}
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ajándék neve (pl. Repülőjegy)"
          required
          className="w-full border rounded px-4 py-2 focus:ring-brand-rose focus:border-brand-rose"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Rövid leírás (opcionális)"
          rows="2"
          className="w-full border rounded px-4 py-2 focus:ring-brand-rose focus:border-brand-rose"
        />

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Mégse
          </button>
          <button
            onClick={handleAddClick}
            disabled={isAdding}
            className="px-6 py-2 rounded-full text-white bg-brand-rose hover:bg-opacity-80 flex items-center gap-2 disabled:opacity-70"
          >
            {isAdding && <SpinnerIcon />} Hozzáadás
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeddingGifts;
