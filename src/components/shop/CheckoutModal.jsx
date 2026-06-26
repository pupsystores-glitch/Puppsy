import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, MapPin, User, CheckCircle2, Lock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function CheckoutModal({ product, qty, onClose }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: "", phone: "+995 ",
    firstName: "", lastName: "",
    address: "", city: "თბილისი", zip: "", country: "საქართველო",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const STEPS = [t("step_contact"), t("step_shipping"), t("step_payment")];
  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handlePhoneChange = (val) => {
    if (!val.startsWith("+995 ")) {
      update("phone", "+995 ");
    } else {
      update("phone", val);
    }
  };

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else setDone(true);
  };

  const total = (product.price * qty).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative bg-background w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="px-7 pt-7 pb-5 border-b border-border/40 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="font-display text-xl font-bold">{t("checkout")}</h2>
              {!done && <p className="font-body text-xs text-muted-foreground mt-0.5">Step {step + 1} of 3 — {STEPS[step]}</p>}
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="px-7 py-4 bg-secondary/20 flex items-center gap-4 flex-shrink-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              {product.image_url
                ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-secondary" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold truncate">{product.name}</p>
              <p className="font-body text-xs text-muted-foreground">Qty: {qty}</p>
            </div>
            <span className="font-body font-bold text-lg">₾{total}</span>
          </div>

          {/* Step Progress */}
          {!done && (
            <div className="px-7 pt-5 flex gap-2 flex-shrink-0">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`h-1 w-full rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-secondary"}`} />
                  <span className={`text-[10px] font-body tracking-wide transition-colors ${i === step ? "text-primary font-semibold" : "text-muted-foreground"}`}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            {done ? (
              <motion.div
                className="flex flex-col items-center text-center py-6 gap-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="font-display text-2xl font-bold">{t("order_placed")}</h3>
                <p className="font-body text-muted-foreground text-sm max-w-xs">
                  {t("order_thanks")} <strong>{form.email}</strong> {t("order_thanks2")}
                </p>
                <p className="font-body text-xs text-muted-foreground">{t("order_total")} <strong>₾{total}</strong></p>
                <button onClick={onClose} className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:shadow-lg transition-all">
                  {t("continue_shopping")}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {step === 0 && (
                  <>
                    <div className="flex items-center gap-2 mb-5">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-body text-sm font-semibold">{t("contact_info")}</span>
                    </div>
                    <Field label={t("email_address")} type="email" value={form.email} onChange={v => update("email", v)} placeholder="you@example.com" />
                    <div className="space-y-1.5">
                      <label className="font-body text-xs text-muted-foreground tracking-wide">{t("phone_number")}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => handlePhoneChange(e.target.value)}
                        placeholder="+995 555 000 000"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 focus:border-primary focus:outline-none font-body text-sm placeholder:text-muted-foreground/50 transition-colors"
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="flex items-center gap-2 mb-5">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-body text-sm font-semibold">{t("shipping_address")}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label={t("first_name")} value={form.firstName} onChange={v => update("firstName", v)} placeholder="ნინო" />
                      <Field label={t("last_name")} value={form.lastName} onChange={v => update("lastName", v)} placeholder="გელაშვილი" />
                    </div>
                    <Field label={t("street_address")} value={form.address} onChange={v => update("address", v)} placeholder="რუსთაველის გამზირი 15" />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label={t("city")} value={form.city} onChange={v => update("city", v)} placeholder="თბილისი" />
                      <Field label={t("zip_code")} value={form.zip} onChange={v => update("zip", v)} placeholder="0108" />
                    </div>
                    <Field label={t("country")} value={form.country} onChange={v => update("country", v)} placeholder="საქართველო" />
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex items-center gap-2 mb-5">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="font-body text-sm font-semibold">{t("payment_details")}</span>
                    </div>
                    <Field label={t("name_on_card")} value={form.cardName} onChange={v => update("cardName", v)} placeholder="NINO GELASHVILI" />
                    <Field label={t("card_number")} value={form.cardNumber} onChange={v => update("cardNumber", v)} placeholder="1234 5678 9012 3456" maxLength={19} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label={t("expiry_date")} value={form.expiry} onChange={v => update("expiry", v)} placeholder="MM / YY" maxLength={7} />
                      <Field label="CVV" value={form.cvv} onChange={v => update("cvv", v)} placeholder="123" maxLength={4} type="password" />
                    </div>
                    <div className="flex items-center gap-2 mt-3 p-3 bg-secondary/40 rounded-xl">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-body text-xs text-muted-foreground">{t("secure_payment")}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {!done && (
            <div className="px-7 pb-7 pt-4 border-t border-border/30 flex-shrink-0">
              <motion.button
                onClick={handleNext}
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-body font-medium tracking-wide hover:shadow-lg transition-all"
                whileTap={{ scale: 0.98 }}
              >
                {step < 2 ? t("continue_btn") : `${t("pay_btn")} ₾${total}`}
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", maxLength }) {
  return (
    <div className="space-y-1.5">
      <label className="font-body text-xs text-muted-foreground tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 focus:border-primary focus:outline-none font-body text-sm placeholder:text-muted-foreground/50 transition-colors"
      />
    </div>
  );
}