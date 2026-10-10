// Pétalas em aquarela caindo suavemente sobre o site.
// Os valores são determinísticos (sem Math.random) para não dar diferença
// entre o HTML do servidor e o do navegador.
import type { CSSProperties } from "react";

const COLORS = [
  "rgba(232, 128, 140, 0.85)", // rosa coral
  "rgba(244, 170, 175, 0.85)", // rosa claro
  "rgba(236, 170, 70, 0.8)", // dourado/laranja
  "rgba(190, 160, 210, 0.75)", // lilás
  "rgba(150, 175, 130, 0.7)", // verde folha
];

const PETAL_COUNT = 14;

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const seed = (i * 37) % 100; // espalha de forma "aleatória" mas fixa
  return {
    left: (i * 71) % 100,
    size: 8 + (seed % 7),
    duration: 14 + (seed % 10),
    delay: -((i * 2.3) % 20), // negativo = já começam espalhadas pela tela
    drift: (i % 2 === 0 ? 1 : -1) * (30 + (seed % 50)),
    color: COLORS[i % COLORS.length],
    opacity: 0.55 + (seed % 4) * 0.1,
  };
});

export function FallingPetals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute top-0 block"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.4,
              background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.5), ${p.color} 60%)`,
              borderRadius: "80% 0 80% 0",
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
              "--petal-drift": `${p.drift}px`,
              "--petal-opacity": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
