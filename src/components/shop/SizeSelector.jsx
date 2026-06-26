import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// Standard dog sizing chart – neck, chest, back length in cm
const SIZE_GUIDE = [
  { size: "XS", neck: "20–25", chest: "30–36", back: "18–24" },
  { size: "S",  neck: "25–31", chest: "36–43", back: "24–30" },
  { size: "M",  neck: "31–38", chest: "43–52", back: "30–38" },
  { size: "L",  neck: "38–46", chest: "52–62", back: "38–46" },
  { size: "XL", neck: "46–54", chest: "62–72", back: "46–54" },
  { size: "XXL",neck: "54–62", chest: "72–84", back: "54–62" },
];

export default function SizeSelector({ sizes, selected, onSelect }) {
  const { t } = useLanguage();
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="mb-6">
      {/* Label row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-display font-bold text-sm">Size</span>
        {selected && (
          <span className="font-body text-xs text-muted-foreground">— {selected}</span>
        )}
      </div>

      {/* Size buttons */}
      <div className="flex gap-2 flex-wrap mb-3">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s === selected ? null : s)}
            className={`min-w-[3rem] px-3 py-2 rounded-xl border-2 text-sm font-display font-bold transition-all duration-200 ${
              selected === s
                ? "border-primary bg-primary text-primary-foreground shadow-sm scale-105"
                : "border-border bg-background hover:border-primary/60 text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Size guide toggle */}
      <button
        onClick={() => setGuideOpen(!guideOpen)}
        className="flex items-center gap-1.5 text-xs font-body text-primary hover:underline transition-colors"
      >
        <Ruler className="w-3.5 h-3.5" />
        {t("measurement_guide")}
      </button>

      {/* Size guide table */}
      <AnimatePresence>
        {guideOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-border/60 overflow-hidden bg-background">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/50 border-b border-border/40">
                <span className="font-display font-bold text-xs tracking-wide uppercase text-foreground/70">
                  {t("size_chart")}
                </span>
                <button onClick={() => setGuideOpen(false)}>
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              {/* Table */}
              <table className="w-full text-xs font-body">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/30">
                    <th className="text-left px-4 py-2 font-semibold">Size</th>
                    <th className="text-center px-3 py-2 font-semibold">{t("neck")}</th>
                    <th className="text-center px-3 py-2 font-semibold">{t("chest")}</th>
                    <th className="text-center px-3 py-2 font-semibold">{t("back")}</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-border/20 last:border-0 transition-colors ${
                        selected === row.size ? "bg-primary/10 font-semibold" : i % 2 === 0 ? "bg-background" : "bg-secondary/20"
                      }`}
                    >
                      <td className="px-4 py-2.5 font-display font-bold text-foreground">{row.size}</td>
                      <td className="px-3 py-2.5 text-center text-muted-foreground">{row.neck}</td>
                      <td className="px-3 py-2.5 text-center text-muted-foreground">{row.chest}</td>
                      <td className="px-3 py-2.5 text-center text-muted-foreground">{row.back}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="px-4 py-2.5 text-[10px] font-body text-muted-foreground border-t border-border/30 bg-secondary/30">
                {t("size_tip")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}