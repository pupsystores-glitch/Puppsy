import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-100 ${
        scrolled ?
        "bg-background/90 backdrop-blur-xl shadow-sm py-3" :
        "bg-transparent py-6"}`
        }
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between opacity-100">
          {/* Left: Hamburger */}
          <button
            className="text-foreground z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setSidebarOpen(true)}>
            
            <Menu size={26} />
          </button>

          {/* Center Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}>
              
              <img
                src="https://media.base44.com/images/public/6a255cab0d5d0b6af3403775/c3cc6ac71_E4FBF423-180D-47A9-9F96-88055B9733F2.png"
                alt="PUPSY"
                className={`object-contain transition-all duration-500 ${scrolled ? "h-10" : "h-14 md:h-16"}`} />
              
            </motion.div>
          </Link>

          {/* Right: empty spacer to balance */}
          <div className="w-10 h-10" />
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen &&
        <>
            {/* Backdrop */}
            <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)} />
          

            {/* Sidebar Panel */}
            <motion.div
            className="fixed top-0 left-0 h-full w-72 z-50 bg-background shadow-2xl flex flex-col"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
                <img
                src="https://media.base44.com/images/public/6a255cab0d5d0b6af3403775/c3cc6ac71_E4FBF423-180D-47A9-9F96-88055B9733F2.png"
                alt="PUPSY"
                className="h-10 object-contain" />
              
                <button
                onClick={() => setSidebarOpen(false)}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links + Language Toggle */}
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {[
              { key: "shop", href: "#shop" },
              { key: "demand", href: "#demand" },
              { key: "stories", href: "#stories" },
              { key: "contact", href: "#stories" }].
              map(({ key, href }) =>
              <a
                key={key}
                href={href}
                className="py-3 px-4 rounded-xl font-display text-lg font-bold text-foreground hover:bg-secondary hover:text-primary transition-all uppercase"
                onClick={() => setSidebarOpen(false)}>
                
                    {t(key)}
                  </a>
              )}

                {/* Language Toggle — same spacing as top logo */}
                <div className="mt-8 pt-8 border-t border-border/40">
                  <p className="font-body text-xs text-muted-foreground mb-3 uppercase tracking-widest px-4">
                    {lang === "ka" ? "ენა" : "Language"}
                  </p>
                  <div className="flex gap-2">
                    <button
                    onClick={() => setLang("ka")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-display font-bold transition-all uppercase ${
                    lang === "ka" ?
                    "bg-primary text-primary-foreground shadow-sm" :
                    "bg-secondary text-foreground hover:bg-secondary/80"}`
                    }>
                    
                      ქართული
                    </button>
                    <button
                    onClick={() => setLang("en")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-display font-bold transition-all uppercase ${
                    lang === "en" ?
                    "bg-primary text-primary-foreground shadow-sm" :
                    "bg-secondary text-foreground hover:bg-secondary/80"}`
                    }>
                    
                      English
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

}