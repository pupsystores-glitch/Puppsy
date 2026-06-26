import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/LanguageContext";

const PawIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="5.5" cy="9" rx="2.2" ry="3" />
    <ellipse cx="11" cy="7" rx="2.2" ry="3" />
    <ellipse cx="16.5" cy="7" rx="2.2" ry="3" />
    <ellipse cx="21" cy="10" rx="2" ry="2.8" />
    <path d="M12 12c-4 0-7 2.5-6.5 6 .3 2 2 3.5 4 3.8 1.5.2 3.5.2 5 0 2-.3 3.7-1.8 4-3.8C19 14.5 16 12 12 12z" />
  </svg>
);

export default function DemandCard({ product, onVote, hasVoted, onShowInterest }) {
  const { t } = useLanguage();
  const [bursting, setBursting] = useState(false);

  const percentage = Math.min(
    Math.round((product.demand_count / (product.demand_goal || 1000)) * 100),
    100
  );

  const handleVote = () => {
    if (hasVoted) return;
    setBursting(true);
    onVote(product);
    setTimeout(() => setBursting(false), 900);
  };

  return (
    <motion.div
      className="group relative bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
            <PawIcon className="w-16 h-16" />
          </div>
        )}

        {/* Coming Soon Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full">
          <span className="text-[10px] font-body tracking-widest uppercase text-foreground/70">
            {t("coming_soon")}
          </span>
        </div>

        {/* PAW VOTE BUTTON */}
        <div className="absolute top-4 right-4">
          <motion.button
            onClick={handleVote}
            disabled={hasVoted}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              hasVoted
                ? "bg-primary text-primary-foreground shadow-[0_0_16px_rgba(212,140,112,0.5)]"
                : "bg-white/80 backdrop-blur-md text-foreground/50 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(212,140,112,0.4)]"
            }`}
            whileHover={!hasVoted ? { scale: 1.15, rotate: -10 } : {}}
            whileTap={!hasVoted ? { scale: 0.85 } : {}}
          >
            <PawIcon className={`w-5 h-5 transition-transform duration-300 ${hasVoted ? "scale-110" : ""}`} />

            {/* Burst particles */}
            <AnimatePresence>
              {bursting && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-primary rounded-full"
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i / 6) * Math.PI * 2) * 22,
                        y: Math.sin((i / 6) * Math.PI * 2) * 22,
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip label */}
          {!hasVoted && (
            <div className="absolute -bottom-7 right-0 whitespace-nowrap">
              <span className="text-[9px] font-body tracking-wide text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t("want_this")}
              </span>
            </div>
          )}
        </div>

        {/* "Wanted!" banner when voted */}
        <AnimatePresence>
          {hasVoted && (
            <motion.div
              className="absolute bottom-0 inset-x-0 py-2 bg-primary/90 backdrop-blur-sm flex items-center justify-center gap-1.5"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Sparkles className="w-3 h-3 text-primary-foreground" />
              <span className="text-[10px] font-body tracking-widest uppercase text-primary-foreground font-semibold">
                {t("you_wanted_this")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-1">{product.name}</h3>
        <p className="font-body text-xs text-muted-foreground mb-4 line-clamp-2">
          {product.description || t("waiting_for_vote")}
        </p>

        {/* Demand Meter */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-body font-medium text-foreground/80">
                {product.demand_count || 0} {t("want_this")}
              </span>
            </div>
            <span className="text-[10px] font-body text-muted-foreground">
              {percentage}% {t("of_goal")}
            </span>
          </div>
          <Progress value={percentage} className="h-1.5 bg-secondary" />
        </div>

        {/* Interest Button */}
        <button
          onClick={() => onShowInterest(product)}
          className="w-full py-2.5 text-xs font-body tracking-wide text-primary border border-primary/30 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {t("notify_me")}
        </button>
      </div>
    </motion.div>
  );
}