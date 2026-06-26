import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLang("ka")}
        className={`px-2 py-0.5 rounded text-xs font-body font-semibold transition-all ${
          lang === "ka" ? "bg-primary text-primary-foreground" : "text-foreground/50 hover:text-foreground"
        }`}
      >
        GEO
      </button>
      <span className="text-foreground/30 text-xs">|</span>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-0.5 rounded text-xs font-body font-semibold transition-all ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground/50 hover:text-foreground"
        }`}
      >
        ENG
      </button>
    </div>
  );
}