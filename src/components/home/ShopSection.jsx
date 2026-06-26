import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const TAG_STYLES = {
  bestseller: "bg-amber-100 text-amber-700",
  new: "bg-emerald-100 text-emerald-700",
  sale: "bg-rose-100 text-rose-700",
  limited: "bg-violet-100 text-violet-700"
};

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <motion.div
      className="flex-shrink-0 w-64 md:w-80 group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/product/${product.id}`)}>
      
      <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-secondary/30 mb-4">
        {product.image_url ?
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> :

        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
            <ShoppingBag className="w-12 h-12" />
          </div>
        }
        {product.tag &&
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase ${TAG_STYLES[product.tag]}`}>
            {t(`tag_${product.tag}`)}
          </div>
        }
        <motion.button
          onClick={(e) => {e.stopPropagation();setLiked(!liked);}}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm"
          whileTap={{ scale: 0.85 }}>
          
          <Heart className={`w-4 h-4 transition-all duration-300 ${liked ? "fill-rose-500 text-rose-500 scale-110" : "text-foreground/50"}`} />
        </motion.button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-3 bg-foreground text-background text-xs font-body tracking-widest uppercase hover:bg-primary transition-colors">
            {t("add_to_bag")}
          </button>
        </div>
      </div>
      <div className="px-1">
      <h3 className="font-body text-base font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors uppercase">{product.name}</h3>
      <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-2.5 uppercase">{product.description}</p>
      <div className="flex items-baseline gap-2">
        <span className="font-body font-bold text-base">₾{product.price?.toFixed(2)}</span>
        {product.original_price &&
          <span className="font-body text-sm text-muted-foreground line-through">₾{product.original_price?.toFixed(2)}</span>
          }
      </div>
      </div>
    </motion.div>);

}

function ProductRow({ title, products, isLoading }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="mb-12">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-5">
        <h3 className="font-display text-xl md:text-2xl font-bold uppercase">{title}</h3>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 px-6 snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
        
        <div className="flex-shrink-0 w-4 md:w-[calc((100vw-80rem)/2+0rem)]" />
        {isLoading ?
        Array(5).fill(0).map((_, i) =>
        <div key={i} className="flex-shrink-0 w-52 md:w-60 animate-pulse">
              <div className="aspect-square rounded-[1.5rem] bg-secondary/50 mb-4" />
              <div className="space-y-2 px-1">
                <div className="h-4 bg-secondary/50 rounded-full w-3/4" />
                <div className="h-3 bg-secondary/50 rounded-full w-full" />
                <div className="h-4 bg-secondary/50 rounded-full w-1/3" />
              </div>
            </div>
        ) :
        products.length === 0 ? null :
        <AnimatePresence mode="popLayout">
            {products.map((product, i) =>
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex-shrink-0 snap-start">
            
                <ProductCard product={product} />
              </motion.div>
          )}
          </AnimatePresence>
        }
        <div className="flex-shrink-0 w-6" />
      </div>
    </div>);

}

export default function ShopSection() {
  const { t } = useLanguage();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.filter({ in_stock: true }, "name")
  });

  const featured = products.filter((p) => p.tag === "bestseller" || p.tag === "new" || !p.tag);
  const newArrivals = products.filter((p) => p.tag === "new");
  const bestsellers = products.filter((p) => p.tag === "bestseller");

  // Fallback: if rows would be empty, show all products in featured
  const row1 = featured.length > 0 ? featured : products;
  const row2 = newArrivals.length > 0 ? newArrivals : products.slice(0, 6);
  const row3 = bestsellers.length > 0 ? bestsellers : products.slice(0, 6);

  return (
    <section id="shop" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">
            {t("our_collection")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            {t("shop_by_category")}
          </h2>
        </motion.div>
      </div>

      <ProductRow title={t("row_featured")} products={row1} isLoading={isLoading} />
    </section>);

}