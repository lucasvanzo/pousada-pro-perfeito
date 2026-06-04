import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, BedDouble, MessageSquareQuote, Settings, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const nav: Array<{ to: string; label: string; icon: typeof LayoutDashboard; end?: boolean }> = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/reservas", label: "Reservas", icon: Calendar },
  { to: "/admin/acomodacoes", label: "Acomodações", icon: BedDouble },
  { to: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquareQuote },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  const logout = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
    navigate({ to: "/auth", replace: true });
  };

  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-xl font-semibold">Acesso negado</h1>
          <p className="text-sm text-muted-foreground mt-2">Sua conta não tem permissão de administrador.</p>
          <Button className="mt-4" onClick={logout}>Sair</Button>
        </div>
      </div>
    );
  }
  if (isAdmin === null) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Carregando…</div>;
  }

  const sidebar = (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link to="/admin" className="font-display text-lg">Estalagem · Admin</Link>
        <button className="lg:hidden" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to as any}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3 space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/">← Ver site</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-destructive" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" /> Sair
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-muted/20">
      <div className="hidden lg:block">{sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative">{sidebar}</div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 items-center gap-3 border-b bg-card px-4 lg:hidden">
          <button onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          <span className="font-display">Admin</span>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
