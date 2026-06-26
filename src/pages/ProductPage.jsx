import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart, Shield, Truck, RotateCcw, Star, Check, ChevronLeft, ChevronRight, Package, Clock, Award } from "lucide-react";
import CheckoutModal from "@/components/shop/CheckoutModal";
import ProductFooter from "@/components/shop/ProductFooter";
import SizeSelector from "@/components/shop/SizeSelector";
import { useLanguage } from "@/lib/LanguageContext";

const TAG_STYLES = {
  bestseller: "bg-amber-100 text-amber-700",
  new: "bg-emerald-100 text-emerald-700",
  sale: "bg-rose-100 text-rose-700",
  limited: "bg-violet-100 text-violet-700"
};

// Categories where color swatches are irrelevant
const NO_COLOR_CATS = ["food", "treats"];

// Fallback extra images using product main image
function getGallery(product) {
  const imgs = [product.image_url];
  if (product.extra_images?.length) {
    product.extra_images.forEach((u) => u && imgs.push(u));
  }
  return imgs.filter(Boolean);
}

export default function ProductPage() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { t } = useLanguage();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => base44.entities.Product.filter({ id }),
    select: (data) => data[0]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin" />
      </div>);

  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="font-display text-2xl text-muted-foreground">Product not found</p>
        <Link to="/" className="text-primary font-body text-sm underline">← Back to shop</Link>
      </div>);

  }

  const gallery = getGallery(product);
  const savings = product.original_price ? (product.original_price - product.price).toFixed(2) : null;
  const showColors = !NO_COLOR_CATS.includes(product.category) && product.colors?.length > 0;
  const showSizes = product.sizes?.length > 0;

  const prevImg = () => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % gallery.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/30 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors uppercase">
            <ArrowLeft className="w-4 h-4" />
            {t("back_to_shop")}
          </Link>
          <img
            src="https://media.base44.com/images/public/6a255cab0d5d0b6af3403775/c3cc6ac71_E4FBF423-180D-47A9-9F96-88055B9733F2.png"
            alt="PUPSY"
            className="h-9 object-contain" />
          
          <div className="w-24" />
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── LEFT: Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            
            {/* Main image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-secondary/30 mb-4 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }} />
                
              </AnimatePresence>

              {product.tag &&
              <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-display font-bold tracking-wider uppercase ${TAG_STYLES[product.tag]}`}>
                  {product.tag}
                </div>
              }

              <button onClick={() => setLiked(!liked)} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                <Heart className={`w-5 h-5 transition-all duration-300 ${liked ? "fill-rose-500 text-rose-500" : "text-foreground/40"}`} />
              </button>

              {gallery.length > 1 &&
              <>
                  <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              }
            </div>

            {/* Thumbnail strip */}
            {gallery.length > 1 &&
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {gallery.map((img, i) =>
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeImg ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-90"}`
                }>
                
                    <img src={img} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
              )}
              </div>
            }
          </motion.div>

          {/* ── RIGHT: Product Details ── */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            
            <p className="text-xs font-display font-bold tracking-[0.3em] uppercase text-primary mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{product.name}</h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) =>
                <Star key={s} className={`w-4 h-4 ${s <= 4 ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                )}
              </div>
              <span className="text-xs font-body text-muted-foreground">4.0 · 124 {t("reviews")}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-4xl font-extrabold">₾{product.price?.toFixed(2)}</span>
              {product.original_price &&
              <>
                  <span className="font-body text-lg text-muted-foreground line-through">₾{product.original_price?.toFixed(2)}</span>
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-600 text-xs font-display font-bold rounded-full">დაზოგე ₾{savings}</span>
                </>
              }
            </div>

            <p className="font-body text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
              t("highlight_1"),
              t("highlight_2"),
              t("highlight_3"),
              t("highlight_4")].
              map((f) =>
              <div key={f} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="font-body text-xs text-foreground/70 font-body">{f}</span>
                </div>
              )}
            </div>

            {/* Color Swatches — only for relevant categories */}
            {showColors &&
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-bold text-sm">Color</span>
                  {selectedColor &&
                <span className="font-body text-xs text-muted-foreground">{selectedColor}</span>
                }
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {product.colors.map((hex) =>
                <button
                  key={hex}
                  onClick={() => setSelectedColor(hex)}
                  title={hex}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === hex ? "border-foreground scale-110 shadow-md" : "border-transparent hover:scale-105"}`
                  }
                  style={{ backgroundColor: hex }} />

                )}
                </div>
              </div>
            }

            {/* Size Selector */}
            {showSizes &&
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize} />

            }

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="font-display font-bold text-sm">{t("quantity")}</span>
              <div className="flex items-center border border-border rounded-full overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-lg hover:bg-secondary transition-colors">−</button>
                <span className="w-10 text-center font-body text-sm font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-lg hover:bg-secondary transition-colors">+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                onClick={() => setShowCheckout(true)}
                className="flex-1 py-4 bg-primary text-primary-foreground rounded-full font-display font-bold tracking-wide hover:shadow-lg transition-all text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                
                {t("buy_now")} · ₾{(product.price * qty).toFixed(2)}
              </motion.button>
              <motion.button
                className="flex-1 py-4 border-2 border-foreground/20 rounded-full font-display font-bold tracking-wide hover:bg-secondary transition-all text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                
                {t("add_to_cart")}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-5 bg-secondary/30 rounded-2xl mb-6">
              {[
              { Icon: Truck, label: t("free_shipping"), sub: t("orders_over") },
              { Icon: Shield, label: t("secure_payment_badge"), sub: t("ssl") },
              { Icon: RotateCcw, label: t("easy_returns"), sub: t("return_policy") }].
              map(({ Icon, label, sub }) =>
              <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-display font-bold text-xs">{label}</span>
                  <span className="font-body text-[10px] text-muted-foreground">{sub}</span>
                </div>
              )}
            </div>

            {/* Extra info strip */}
            <div className="flex flex-col gap-2">
              {[
              { Icon: Package, text: t("ships_within") },
              { Icon: Clock, text: t("same_day") },
              { Icon: Award, text: t("loved_by") }].
              map(({ Icon, text }) =>
              <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body text-xs text-muted-foreground">{text}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Footer */}
      <ProductFooter />

      {/* Checkout Modal */}
      {showCheckout &&
      <CheckoutModal
        product={product}
        qty={qty}
        onClose={() => setShowCheckout(false)} />

      }
    </div>);

}