'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Check, Loader2, Plus, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const SpinnerIcon = () => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
    <Loader2 className="w-5 h-5 animate-spin" />
  </motion.div>
);

const SuccessIcon = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <Check className="h-16 w-16 text-green-500 mx-auto" />
  </motion.div>
);

export default function RsvpForm() {
  const [formData, setFormData] = useState({ is_attending: true, guest_count: 1, dietary_notes: '', names: [''] });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const { error } = await supabase.from('rsvps').insert([
      {
        is_attending: formData.is_attending,
        guest_count: formData.names.length,
        dietary_notes: formData.dietary_notes,
        name: formData.names.join(', ')
      }
    ]);

    if (error) {
      console.error("Hiba az RSVP mentésekor:", error);
      setStatus('error');
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setStatus('success');
    }
  };

  const updateName = (index, value) => {
    const updated = [...formData.names];
    updated[index] = value;
    setFormData({ ...formData, names: updated });
  };

  const addNameField = () => {
    const updated = [...formData.names, ''];
    setFormData({ ...formData, names: updated });
  };

  const removeNameField = (index) => {
    const updated = [...formData.names];
    updated.splice(index, 1);
    setFormData({ ...formData, names: updated });
  };

  const handleGuestCountChange = (value) => {
    let num = parseInt(value);
    const names = [...formData.names];
    if (num > names.length) {
      while (names.length < num) names.push('');
    } else {
      names.length = num;
    }
    setFormData({ ...formData, guest_count: num, names });
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 bg-white rounded-xl shadow-xl max-w-xl mx-auto"
      >
        <SuccessIcon />
        <h3 className="text-3xl font-serif mt-4 text-emerald-700">Köszönjük a visszajelzésed!</h3>
        <p className="mt-2 text-gray-600">Szeretettel várunk a nagy napon!</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 p-8 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg max-w-xl mx-auto"
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setFormData({ ...formData, is_attending: true })}
          className={`p-4 rounded-xl border transition-all text-center font-medium text-lg shadow-sm hover:shadow-md ${
            formData.is_attending ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-white border-gray-200'
          }`}
        >
          Ott leszek!
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setFormData({ ...formData, is_attending: false })}
          className={`p-4 rounded-xl border transition-all text-center font-medium text-lg shadow-sm hover:shadow-md ${
            !formData.is_attending ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-white border-gray-200'
          }`}
        >
          Nem tudok menni
        </motion.button>
      </div>

      <AnimatePresence>
        {formData.is_attending && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 overflow-hidden"
          >
            <div>
              <label htmlFor="guest_count" className="block text-sm font-semibold text-gray-700">
                Hány fővel érkezel?
              </label>
              <select
                id="guest_count"
                value={formData.names.length}
                onChange={(e) => handleGuestCountChange(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Nevek
              </label>
              {formData.names.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateName(index, e.target.value)}
                    placeholder={`Név ${index + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  {formData.names.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNameField(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                      title="Név eltávolítása"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addNameField()}
                className="flex items-center gap-2 text-emerald-700 mt-2 hover:underline"
              >
                <Plus className="w-4 h-4" /> Még egy név hozzáadása
              </button>
            </div>

            <div>
              <label htmlFor="dietary_notes" className="block text-sm font-semibold text-gray-700">
                Ételérzékenység, allergia?
              </label>
              <textarea
                id="dietary_notes"
                placeholder="Pl. gluténmentes, vegetáriánus..."
                value={formData.dietary_notes}
                onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                rows={3}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-right">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:to-emerald-700 transition-all"
        >
          {status === 'sending' && <SpinnerIcon />}
          {status === 'sending' ? 'Küldés...' : 'Visszajelzés elküldése'}
        </motion.button>
      </div>
    </motion.form>
  );
}
