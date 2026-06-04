import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Calendar, BedDouble, MessageSquareQuote, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ pending: 0, confirmed: 0, rooms: 0, pendingReviews: 0 });
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const today = new Date().toISOString().slice(0, 10);
      const [r1, r2, r3, r4, up] = await Promise.all([
        supabase.from("reservations").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("reservations").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
        supabase.from("rooms").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("approved", false),
        supabase.from("reservations").select("id,guest_name,check_in,check_out,status").gte("check_in", today).order("check_in").limit(8),
      ]);
      setStats({
        pending: r1.count || 0,
        confirmed: r2.count || 0,
        rooms: r3.count || 0,
        pendingReviews: r4.count || 0,
      });
      setUpcoming(up.data || []);
    })();
  }, []);

  const cards = [
    { label: "Reservas pendentes", value: stats.pending, icon: Calendar },
    { label: "Reservas confirmadas", value: stats.confirmed, icon: TrendingUp },
    { label: "Acomodações", value: stats.rooms, icon: BedDouble },
    { label: "Avaliações p/ aprovar", value: stats.pendingReviews, icon: MessageSquareQuote },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-display mb-6">Painel</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="text-3xl font-display mt-1">{c.value}</p>
                </div>
                <Icon className="h-8 w-8 text-accent" />
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Próximas reservas</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma reserva futura.</p>
        ) : (
          <ul className="divide-y">
            {upcoming.map((r) => (
              <li key={r.id} className="py-3 flex justify-between text-sm">
                <span className="font-medium">{r.guest_name}</span>
                <span className="text-muted-foreground">
                  {r.check_in} → {r.check_out} · {r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AdminLayout>
  );
}
