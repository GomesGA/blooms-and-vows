import { useEffect, useState } from "react";

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

    const interval = setInterval(() => {
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 text-white">
      <h2 className="text-5xl md:text-6xl text-[#F9F7F1] mb-6 font-normal drop-shadow-md" style={{ fontFamily: "'Alex Brush', cursive" }}>
        Contagem Regressiva
      </h2>
      
      {/* Divisor decorativo (Linha fina com losango no meio) */}
      <div className="flex items-center gap-3 mb-14">
        <div className="w-16 h-[1px] bg-[#C19B5E]"></div>
        <div className="w-1.5 h-1.5 rotate-45 bg-[#C19B5E]"></div>
        <div className="w-16 h-[1px] bg-[#C19B5E]"></div>
      </div>

      {/* Caixas do Cronômetro */}
      <div className="flex gap-4 md:gap-6 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            {/* Caixa creme */}
            <div className="bg-[#FAF5EC] w-20 h-24 md:w-[110px] md:h-[130px] rounded-2xl flex flex-col items-center justify-center shadow-xl">
              {/* Número serifado e verde escuro */}
              <span className="text-4xl md:text-5xl text-[#2C3E2D]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {formatNumber(value)}
              </span>
              {/* Rótulo dourado */}
              <span className="text-[9px] md:text-[10px] text-[#B8842E] uppercase tracking-[0.25em] mt-3 font-semibold">
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
{     /* Data e hora no rodapé */}

      <p className="mt-14 text-[#C19B5E] text-xs md:text-sm tracking-[0.3em] uppercase text-center">
        16 DE JANEIRO DE 2027 — 16H
      </p>
      <p className="mt-3 text-[#C19B5E] text-xs md:text-sm tracking-[0.3em] uppercase text-center max-w-md">
        Rua Josina Luiza Tupinambá, 1062, Morada Nova
      </p>
    </div>
  );
}