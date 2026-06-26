import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function StoryCard({ story }) {
  return (
    <motion.div
      className="flex-shrink-0 w-64 md:w-72 relative rounded-[2rem] overflow-hidden group cursor-grab active:cursor-grabbing"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="aspect-[9/16] relative">
        {story.image_url ? (
          <img
            src={story.image_url}
            alt={`${story.customer_name}'s pet`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="font-display text-4xl text-muted-foreground/20">🐾</span>
          </div>
        )}

        {/* Glassmorphism Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            {/* Stars */}
            {story.rating && (
              <div className="flex gap-0.5 mb-2">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < (story.rating || 5)
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
            <p className="text-white text-xs leading-relaxed line-clamp-3 font-body">
              "{story.testimonial}"
            </p>
            <p className="text-white/70 text-[10px] mt-2 font-body tracking-wide">
              — {story.customer_name}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}