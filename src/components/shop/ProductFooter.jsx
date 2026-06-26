import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductFooter() {
  return (
    <footer className="py-16 px-6 border-t border-border/40 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="https://media.base44.com/images/public/6a255cab0d5d0b6af3403775/c3cc6ac71_E4FBF423-180D-47A9-9F96-88055B9733F2.png"
              alt="PUPSY"
              className="h-12 object-contain mb-3"
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              A curated sanctuary for your beloved companions. Built by pet lovers, for pet lovers.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Shop", href: "/#shop" },
                { label: "Future Collection", href: "/#demand" },
                { label: "Happy Tails", href: "/#stories" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="font-body text-sm text-muted-foreground">hello@pupsy.com</li>
              <li className="font-body text-sm text-muted-foreground">WhatsApp Support</li>
              <li className="font-body text-sm text-muted-foreground">Social Media</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Shipping Info"].map(link => (
                <li key={link}>
                  <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} PUPSY. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for pets everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}