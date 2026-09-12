import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { GUESTS, normalize } from "@/data/guests";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Status = "confirmed" | "declined";

/**
 * Opcional: defina VITE_RSVP_WEBHOOK_URL (Zapier / Make / n8n) para receber
 * cada resposta também por webhook, além do banco de dados.
 */
const WEBHOOK_URL = import.meta.env['VITE_RSVP_WEBHOOK_URL'] as string | undefined;

export function RsvpSection() {
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("rsvps")
      .select("guest_name, attending")
      .then(({ data }) => {
        if (!active || !data) return;
        const next: Record<string, Status> = {};
        data.forEach((row) => {
          next[row.guest_name] = row.attending ? "confirmed" : "declined";
        });
        setStatuses(next);
      });
    return () => {
      active = false;
    };
  }, []);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return GUESTS;
    return GUESTS.filter((name) => normalize(name).includes(q));
  }, [query]);

  async function respond(attending: boolean) {
    if (!selected) return;
    setSaving(true);
    const guestName = selected;

    const { error } = await supabase
      .from("rsvps")
      .upsert({ guest_name: guestName, attending }, { onConflict: "guest_name" });

    if (error) {
      setSaving(false);
      setFeedback("Não foi possível salvar. Tente novamente em instantes.");
      return;
    }

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guest_name: guestName,
            attending,
            answered_at: new Date().toISOString(),
          }),
        });
      } catch {
        // O registro no banco já foi salvo; falha de webhook não bloqueia o convidado.
      }
    }

    setStatuses((prev) => ({ ...prev, [guestName]: attending ? "confirmed" : "declined" }));
    setSaving(false);
    setSelected(null);
    setFeedback(
      attending
        ? `Que alegria, ${guestName}! Sua presença está confirmada.`
        : `Obrigado por avisar, ${guestName}. Sentiremos sua falta.`,
    );
  }

  return (
    <section id="rsvp" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center font-script text-5xl text-gold-deep sm:text-6xl">
            Confirme sua Presença
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-ink-soft">
            Encontre seu nome na lista abaixo e nos informe se poderá celebrar este dia conosco.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-10 max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite seu nome..."
              aria-label="Buscar seu nome na lista de convidados"
              className="w-full rounded-full border border-border bg-card/70 px-6 py-3 text-center text-lg text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-gold"
            />
            <p className="mt-3 text-center text-xs uppercase tracking-[0.16em] text-ink-soft">
              {results.length} {results.length === 1 ? "convidado" : "convidados"}
            </p>
          </div>
        </Reveal>

        {feedback && (
          <p className="mt-6 text-center text-base text-olive-deep" role="status">
            {feedback}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((name, i) => {
            const status = statuses[name];
            return (
              <Reveal key={name} delay={Math.min(i, 8) * 60}>
                <button
                  type="button"
                  onClick={() => {
                    setFeedback(null);
                    setSelected(name);
                  }}
                  className={cn(
                    "w-full rounded-xl border bg-card/60 px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-card",
                    status === "confirmed" && "border-olive bg-olive/10",
                    status === "declined" && "border-rose bg-rose/10",
                    !status && "border-border",
                  )}
                >
                  <span className="block text-lg text-ink">{name}</span>
                  <span
                    className={cn(
                      "mt-1 block text-[0.68rem] uppercase tracking-[0.14em]",
                      status === "confirmed" && "text-olive-deep",
                      status === "declined" && "text-rose",
                      !status && "text-ink-soft/70",
                    )}
                  >
                    {status === "confirmed"
                      ? "Presença confirmada"
                      : status === "declined"
                        ? "Não poderá comparecer"
                        : "Aguardando resposta"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {results.length === 0 && (
          <p className="mt-10 text-center text-lg text-ink-soft">
            Não encontramos esse nome na lista. Confira a grafia ou fale com os noivos.
          </p>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5 animate-in fade-in"
          onClick={() => !saving && setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-cream px-8 py-10 text-center shadow-2xl animate-in fade-in zoom-in-95"
          >
            <p className="font-script text-5xl text-gold-deep">{selected}</p>
            <p className="mt-4 text-lg text-ink">Você poderá comparecer ao nosso casamento?</p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => respond(true)}
                className="w-full rounded-full bg-olive px-6 py-3 text-base uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                Sim, estarei lá
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => respond(false)}
                className="w-full rounded-full border border-border bg-transparent px-6 py-3 text-base uppercase tracking-[0.12em] text-ink-soft transition-colors hover:bg-cream-deep disabled:opacity-60"
              >
                Não poderei comparecer
              </button>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={() => setSelected(null)}
              className="mt-5 text-sm uppercase tracking-[0.14em] text-ink-soft underline-offset-4 hover:underline"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
