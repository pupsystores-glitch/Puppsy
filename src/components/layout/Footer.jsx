import React from "react";
import { Heart } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-16 px-6 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="https://media.base44.com/images/public/6a255cab0d5d0b6af3403775/c3cc6ac71_E4FBF423-180D-47A9-9F96-88055B9733F2.png"
              alt="PUPSY"
              className="h-12 object-contain mb-3"
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {t("brand_tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              {t("navigate")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { key: "shop", href: "#shop" },
                { key: "demand", href: "#demand" },
                { key: "stories", href: "#stories" },
              ].map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              {t("contact_footer")}
            </h4>
            <ul className="space-y-2.5">
              <li className="font-body text-sm text-muted-foreground">hello@pupsy.com</li>
              <li className="font-body text-sm text-muted-foreground">WhatsApp Support</li>
              <li className="font-body text-sm text-muted-foreground">Social Media</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              {t("legal")}
            </h4>
            <ul className="space-y-2.5">
              {["privacy_policy", "terms", "shipping_info"].map((key) => (
                <li key={key}>
                  <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} PUPSY. {t("rights")}
          </p>
          <p className="font-body text-xs text-muted-foreground flex items-center gap-1">
            {t("made_with")} <Heart className="w-3 h-3 text-primary fill-primary" /> {t("for_pets")}
          </p>
        </div>
      </div>
    </footer>
  );
}