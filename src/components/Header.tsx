import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/acomodacoes", label: t("nav.rooms") },
    { to: "/localizacao", label: t("nav.location") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contato", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-display text-xl tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-cream",
            )}
          >
            Estalagem Colonial
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                scrolled
                  ? "text-foreground/80 hover:text-accent"
                  : "text-cream/90 hover:text-cream",
              )}
              activeProps={{
                className: cn(
                  "px-3 py-2 text-sm font-medium uppercase tracking-wide",
                  scrolled ? "text-accent" : "text-gold",
                ),
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className={scrolled ? "text-foreground" : "text-cream"}>
            <LanguageSwitcher />
          </div>
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/acomodacoes">{t("nav.book")}</Link>
          </Button>
          <button
            className={cn("md:hidden p-2", scrolled ? "text-foreground" : "text-cream")}
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container-prose flex flex-col py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-muted rounded-md"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/acomodacoes" onClick={() => setOpen(false)}>{t("nav.book")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
