import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "../lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Estalagem Colonial — Pousada no Centro Histórico de Paraty" },
      { name: "description", content: "Pousada colonial no centro histórico de Paraty, tombado pela UNESCO. Quartos confortáveis, café da manhã regional e atendimento familiar." },
      { name: "author", content: "Estalagem Colonial" },
      { property: "og:title", content: "Estalagem Colonial — Pousada no Centro Histórico de Paraty" },
      { property: "og:description", content: "Pousada colonial no centro histórico de Paraty, tombado pela UNESCO. Quartos confortáveis, café da manhã regional e atendimento familiar." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Estalagem Colonial" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Estalagem Colonial — Pousada no Centro Histórico de Paraty" },
      { name: "twitter:description", content: "Pousada colonial no centro histórico de Paraty, tombado pela UNESCO. Quartos confortáveis, café da manhã regional e atendimento familiar." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/775601a4-2300-4020-ae53-060c9d8390cc/id-preview-061e37b9--befecb53-583e-4a57-a7ed-fb5919e2a440.lovable.app-1780586109896.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/775601a4-2300-4020-ae53-060c9d8390cc/id-preview-061e37b9--befecb53-583e-4a57-a7ed-fb5919e2a440.lovable.app-1780586109896.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Estalagem Colonial",
          description: "Pousada colonial no centro histórico de Paraty.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Comendador José Luiz, 231 — Casa 07",
            addressLocality: "Paraty",
            addressRegion: "RJ",
            addressCountry: "BR",
          },
          telephone: "+55 24 99999-9999",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function LangSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language || "pt";
    }
  }, [i18n.language]);
  return null;
}

function AuthSync() {
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router, queryClient]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isChrome = !pathname.startsWith("/admin") && !pathname.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      <LangSync />
      <AuthSync />
      {isChrome && <Header />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {isChrome && <Footer />}
      {isChrome && <WhatsAppFab />}
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
