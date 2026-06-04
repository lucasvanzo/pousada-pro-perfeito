import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-colonial text-colonial-foreground mt-24">
      <div className="container-prose py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl">Estalagem Colonial</h3>
          <p className="mt-3 text-sm text-cream/70 max-w-sm">{t("footer.tagline")}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-gold">{t("footer.unesco")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">
            {t("footer.navigate")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/" className="hover:text-gold">{t("nav.home")}</Link></li>
            <li><Link to="/acomodacoes" className="hover:text-gold">{t("nav.rooms")}</Link></li>
            <li><Link to="/localizacao" className="hover:text-gold">{t("nav.location")}</Link></li>
            <li><Link to="/faq" className="hover:text-gold">{t("nav.faq")}</Link></li>
            <li><Link to="/contato" className="hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">
            {t("footer.contact")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {SITE.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> {SITE.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> {SITE.email}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-cream/70 hover:text-gold">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-cream/70 hover:text-gold">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-prose py-6 text-xs text-cream/50 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Estalagem Colonial. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <p>{SITE.city}</p>
            <Link to="/auth" className="text-cream/60 hover:text-gold transition-colors">
              Área Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
