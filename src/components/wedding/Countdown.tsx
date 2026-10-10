import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { FloralDivider } from "./FloralDivider";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // Definindo a data: 16 de Janeiro de 2027 às 16:00
    const targetDate = new Date("2027-01-16T16:00:00").getTime();

    const interval = setInterval(() => tick(), 1000);
    tick(); // calcula na hora, sem esperar 1 segundo

    function tick() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <Reveal>
        <h2 className="text-5xl md:text-7xl text-[#96691E] mb-2 font-normal text-center" style={{ fontFamily: "'Alex Brush', cursive" }}>
          Contagem Regressiva
        </h2>
      </Reveal>

      {/* Divisor floral em aquarela */}
      <Reveal delay={150} className="mb-10">
        <FloralDivider />
      </Reveal>

      {/* Caixas do Cronômetro */}
      <div className="flex gap-3 md:gap-6 justify-center">
        {Object.entries(timeLeft).map(([unit, value], i) => (
          <Reveal key={unit} delay={250 + i * 120}>
            {/* Caixa translúcida com borda dourada */}
            <div className="bg-white/60 backdrop-blur-[2px] border border-[#C19B5E]/50 w-[72px] h-24 md:w-[120px] md:h-[140px] rounded-2xl flex flex-col items-center justify-center shadow-[0_10px_30px_-10px_rgba(74,85,67,0.35)] transition-transform duration-500 hover:-translate-y-1">
              {/* Número serifado e verde escuro (anima a cada mudança) */}
              <span
                key={value}
                className="text-4xl md:text-6xl text-[#4A5543] animate-tick"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {formatNumber(value)}
              </span>
              {/* Rótulo dourado */}
              <span className="text-[9px] md:text-[11px] text-[#96691E] uppercase tracking-[0.25em] mt-2 md:mt-3 font-semibold">
                {unit}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Data e hora no rodapé */}
      <Reveal delay={800}>
        <p className="mt-12 text-[#5C6A3E] text-xs md:text-sm tracking-[0.3em] uppercase text-center font-semibold">
          16 de Janeiro de 2027 — 16h
        </p>
      </Reveal>
      <Reveal delay={950}>
        <p className="mt-4 text-3xl md:text-5xl text-[#96691E] text-center" style={{ fontFamily: "'Alex Brush', cursive" }}>
          Rua Josina Luiza Tupinambá, 1062, Morada Nova
        </p>
      </Reveal>
    </div>
  );
}