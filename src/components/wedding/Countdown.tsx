import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const TARGET = new Date("2027-01-16T16:00:00-03:00").getTime();

function diff() {
  const total = Math.max(0, TARGET - Date.now());
  return {
    dias: Math.floor(total / 86400000),
    horas: Math.floor((total / 3600000) % 24),
    minutos: Math.floor((total / 60000) % 60),
    segundos: Math.floor((total / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff());
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: Array<[string, number]> = [
    ["Dias", time?.dias ?? 0],
    ["Horas", time?.horas ?? 0],
    ["Minutos", time?.minutos ?? 0],
    ["Segundos", time?.segundos ?? 0],
  ];

  return (
    <section id="contagem" className="w-full bg-mustard px-6 py-20 sm:py-24">
      <Reveal>
        <h2 className="text-center font-script text-5xl text-primary-foreground sm:text-6xl">
          Contagem Regressiva
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-4 sm:gap-6">
        {items.map(([label, value], i) => (
          <Reveal key={label} delay={i * 120}>
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-card shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28">
              <span className="text-4xl font-light leading-none text-mustard tabular-nums sm:text-5xl">
                {time ? String(value).padStart(2, "0") : "--"}
              </span>
              <span className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-mustard">
                {label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-12 text-center text-sm uppercase tracking-[0.22em] text-primary-foreground/90">
          16 de Janeiro de 2027 — 16h
        </p>
      </Reveal>
    </section>
  );
}
