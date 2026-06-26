import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";

export default function InterestModal({ product, onClose }) {
  const [form, setForm] = useState({
    full_name: "",
    phone_or_whatsapp: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim()) return;
    setSubmitting(true);
    await base44.entities.ProductInterest.create({
      product_id: product.id,
      product_name: product.name,
      full_name: form.full_name,
      phone_or_whatsapp: form.phone_or_whatsapp,
      message: form.message,
    });
    toast({
      title: "Thank you!",
      description: `Your interest in "${product.name}" has been recorded.`,
    });
    setSubmitting(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Pupsy, I am interested in "${product.name}". My name is ${form.full_name || "[Your Name]"}. Please let me know when it's available!`
  );
  const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-md bg-card rounded-[2rem] p-8 border border-border shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <p className="text-xs font-body tracking-widest uppercase text-primary mb-2">
            Express Interest
          </p>
          <h3 className="font-display text-2xl font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 font-body">
            Leave your details and we'll notify you when it's available.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Full Name *"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="rounded-xl border-border/60 bg-background h-12 font-body text-sm"
              required
            />
          </div>
          <div>
            <Input
              placeholder="WhatsApp / Phone Number"
              value={form.phone_or_whatsapp}
              onChange={(e) => setForm({ ...form, phone_or_whatsapp: e.target.value })}
              className="rounded-xl border-border/60 bg-background h-12 font-body text-sm"
            />
          </div>
          <div>
            <Textarea
              placeholder="Optional message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl border-border/60 bg-background font-body text-sm resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-full font-body text-sm tracking-wide disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              {submitting ? "Sending..." : "Submit"}
            </motion.button>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 border border-green-500/30 text-green-600 rounded-full font-body text-sm hover:bg-green-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}