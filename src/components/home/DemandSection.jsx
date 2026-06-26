import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DemandCard from "./DemandCard";
import InterestModal from "./InterestModal";
import { useLanguage } from "@/lib/LanguageContext";

export default function DemandSection() {
  const { t } = useLanguage();
  const [votedIds, setVotedIds] = useState(() => {
    const saved = localStorage.getItem("pupsy_votes");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["future-products"],
    queryFn: () => base44.entities.FutureProduct.filter({ status: "coming_soon" }, "-demand_count", 10)
  });

  const voteMutation = useMutation({
    mutationFn: async (product) => {
      await base44.entities.DemandVote.create({ product_id: product.id });
      await base44.entities.FutureProduct.update(product.id, {
        demand_count: (product.demand_count || 0) + 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["future-products"] });
    }
  });

  const handleVote = (product) => {
    if (votedIds.includes(product.id)) return;
    const newVoted = [...votedIds, product.id];
    setVotedIds(newVoted);
    localStorage.setItem("pupsy_votes", JSON.stringify(newVoted));
    voteMutation.mutate(product);
  };

  return (
    <section id="demand" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">
            {t("demand_badge")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 uppercase">
            {t("demand_title")}
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto uppercase">
            {t("demand_sub")}
          </p>
        </motion.div>

        {/* Product Grid */}
        {isLoading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) =>
          <div key={i} className="bg-card rounded-[2rem] overflow-hidden border border-border/50 animate-pulse">
                <div className="aspect-square bg-secondary/50" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-secondary/50 rounded-full w-3/4" />
                  <div className="h-3 bg-secondary/50 rounded-full w-full" />
                  <div className="h-1.5 bg-secondary/50 rounded-full w-full mt-4" />
                </div>
              </div>
          )}
          </div> :
        products.length === 0 ?
        <div className="text-center py-20">
            <p className="font-display text-2xl text-muted-foreground">Coming soon...</p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              We're preparing exciting products for you to vote on!
            </p>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) =>
          <DemandCard
            key={product.id}
            product={product}
            onVote={handleVote}
            hasVoted={votedIds.includes(product.id)}
            onShowInterest={setSelectedProduct} />

          )}
          </div>
        }
      </div>

      {/* Interest Modal */}
      <AnimatePresence>
        {selectedProduct &&
        <InterestModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} />

        }
      </AnimatePresence>
    </section>);

}