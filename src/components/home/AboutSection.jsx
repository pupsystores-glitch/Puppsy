import React from "react";
import { motion } from "framer-motion";
import { Heart, Leaf, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every product we curate is chosen with love and your pet's wellbeing in mind.",
  },
  {
    icon: Leaf,
    title: "Natural & Safe",
    description: "We source only natural, non-toxic, and eco-friendly products for your companions.",
  },
  {
    icon: Shield,
    title: "Community Driven",
    description: "Your voice matters. We build our collection based on what you and your pets truly need.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">
            Our Philosophy
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            The Pupsy Way
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            We believe every pet deserves the finest. That's why we let our community shape what comes next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center p-8 rounded-[2rem] bg-card border border-border/40 hover:border-primary/20 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {value.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}