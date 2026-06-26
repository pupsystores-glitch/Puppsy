import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const HERO_IMAGE = "https://media.base44.com/images/public/6a255cab0d5d0b6af3403775/a9a87a307_generated_d6d9b860.png";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Beautiful golden retriever looking at camera"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end pb-24 px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight whitespace-pre-line uppercase [font-family:'Nunito',_var(--font-heading)] font-semibold">
            {t("hero_title")}
          </h1>
          <p className="font-body text-base md:text-lg text-foreground/70 max-w-md mx-auto mb-8 uppercase">
            {t("hero_sub")}
          </p>
          <motion.a
            href="#shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-body text-sm tracking-wide hover:shadow-lg transition-all uppercase"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}>
            
            {t("hero_cta")}
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          
          <ChevronDown className="w-5 h-5 text-foreground/40" />
        </motion.div>
      </div>
    </section>);

}