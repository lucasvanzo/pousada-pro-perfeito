import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/reservas")({
  component: ReservationsPage,
});

type Reservation = {
  id: string;
  guest_name: string;
  email: string | null;
  phone: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  status: string;
  total: number | null;
  notes: string | null;
  created_at: string;
};

function ReservationsPage() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    let q = supabase.from("reservations").select("*").order("check_in", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setItems((data as Reservation[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Reserva atualizada");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir esta reserva?")) return;
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Reserva removida");
    load();
  };

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-900 dark:text-yellow-200",
    confirmed: "bg-green-500/20 text-green-900 dark:text-green-200",
    cancelled: "bg-red-500/20 text-red-900 dark:text-red-200",
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display">Reservas</h1>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "cancelled"].map((s) => (
            <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)}>
              {s === "all" ? "Todas" : s}
            </Button>
          ))}
        </div>
      </div>
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hóspede</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Carregando…</TableCell></TableRow>
            ) : items.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhuma reserva</TableCell></TableRow>
            ) : items.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">
                  {r.guest_name}
                  {r.guests > 1 && <span className="text-xs text-muted-foreground"> · {r.guests} hóspedes</span>}
                </TableCell>
                <TableCell>{r.check_in}</TableCell>
                <TableCell>{r.check_out}</TableCell>
                <TableCell className="text-xs">
                  {r.email && <div>{r.email}</div>}
                  {r.phone && <div className="text-muted-foreground">{r.phone}</div>}
                </TableCell>
                <TableCell>
                  <Badge className={statusColor[r.status] ?? ""}>{r.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  {r.status !== "confirmed" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "confirmed")}>Confirmar</Button>
                  )}
                  {r.status !== "cancelled" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "cancelled")}>Cancelar</Button>
                  )}
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(r.id)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AdminLayout>
  );
}
