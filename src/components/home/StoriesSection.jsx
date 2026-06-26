import React, { useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "./StoryCard";
import { useLanguage } from "@/lib/LanguageContext";

export default function StoriesSection() {
  const { t } = useLanguage();
  const scrollRef = useRef(null);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["user-stories"],
    queryFn: () => base44.entities.UserStory.list("-created_date", 20),
  });

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="stories" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">
              {t("stories_badge")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              {t("stories_title")}
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 px-6 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex-shrink-0 w-4 md:w-[calc((100vw-80rem)/2+1.5rem)]" />
        {isLoading
          ? Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64 md:w-72 rounded-[2rem] bg-secondary/50 animate-pulse aspect-[9/16]" />
            ))
          : stories.length === 0
          ? (
            <div className="flex items-center justify-center w-full py-20">
              <p className="font-body text-muted-foreground">Stories coming soon...</p>
            </div>
          )
          : stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))
        }
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  );
}