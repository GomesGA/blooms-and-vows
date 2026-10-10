import { useRef } from "react";
import { createFileRoute } from '@tanstack/react-router';
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpSection } from "@/components/wedding/RsvpSection";
import { GiftsSection } from "../components/wedding/GiftsSection";
import { SectionDots, type SectionDot } from "@/components/wedding/SectionDots";
import { FallingPetals } from "@/components/wedding/FallingPetals";

export const Route = createFileRoute('/')({
  component: Index,
});

// Seções exibidas nos pontos de navegação à direita
// (use `dark: true` se alguma seção voltar a ter fundo escuro → pontos brancos)
const SECTIONS: SectionDot[] = [
  { id: "inicio", label: "Início" },
  { id: "contagem", label: "Contagem" },
  { id: "presenca", label: "Presença" },
  { id: "presentes", label: "Presentes" },
];

function Index() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    // Removido o 'flex flex-col' e o fundo global que estavam esmagando o layout
    // Barra de rolagem escondida (a navegação é feita pelos pontos à direita)
    <div
      ref={scrollRef}
      className="snap-y snap-mandatory h-[100dvh] overflow-y-scroll w-full bg-[#FAF5EC] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <SectionDots sections={SECTIONS} containerRef={scrollRef} />
      <FallingPetals />

      {/*
        Todas as telas usam o mesmo fundo floral do convite.
        Elas alternam entre normal e espelhado (floral-page-flip), então as flores
        de baixo de uma tela continuam no topo da próxima.
      */}

      {/* SEÇÃO 1: Apresentação */}
      <section id="inicio" className="h-[100dvh] w-full snap-start floral-page floral-page-intro flex flex-col items-center justify-center p-4">
        <div className="relative text-center flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-12">
          <p className="text-sm md:text-base text-[#47512F] uppercase tracking-widest leading-relaxed animate-fade-up" style={{ animationDelay: "300ms" }}>
            "Para que todos vejam e saibam e considerem e juntamente entendam que a mão do Senhor fez isto…"
            <span className="block mt-2 font-bold text-xs">Isaías 41:20</span>
          </p>
          
          <h1 className="text-7xl md:text-8xl text-[#96691E] my-4 font-normal drop-shadow-sm animate-fade-up" style={{ fontFamily: "'Alex Brush', cursive", animationDelay: "800ms" }}>
            Brunna e Luis Felipe
          </h1>
          
          <p className="text-sm md:text-base text-[#5C6A3E] tracking-[0.15em] uppercase animate-fade-up" style={{ animationDelay: "1300ms" }}>
            Junto com a benção de Deus e seus pais
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 text-center text-[#4A3E2E] text-lg mt-4 animate-fade-up" style={{ animationDelay: "1600ms" }}>
            <div>
              <p className="mb-1">Cristiane Lopes de Jesus Gervásio</p>
              <p>Antônio Gervásio Arantes Neto</p>
            </div>
            <div>
              <p className="mb-1">Rosilda do Carmo Costa Silva</p>
              <p>Iromar Cosmo da Silva</p>
            </div>
          </div>
          
          <p className="text-sm md:text-base text-[#5C6A3E] tracking-[0.15em] uppercase mt-8 animate-fade-up" style={{ animationDelay: "1900ms" }}>
            Convidam para o seu casamento
          </p>
        </div>

        {/* Indicação para rolar */}
        <button
          type="button"
          onClick={() => document.getElementById("contagem")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#5C6A3E] animate-fade-up cursor-pointer"
          style={{ animationDelay: "2600ms" }}
          aria-label="Ir para a contagem regressiva"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Role</span>
          <svg className="w-5 h-5 animate-scroll-hint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {/* SEÇÃO 2: Contagem Regressiva (fundo espelhado) */}
      <section id="contagem" className="h-[100dvh] w-full snap-start floral-page floral-page-flip flex flex-col items-center justify-center">
        <div className="relative w-full">
          <Countdown />
        </div>
      </section>

      {/* SEÇÃO 3: RSVP (fundo normal) */}
      <section id="presenca" className="h-[100dvh] w-full snap-start floral-page flex flex-col items-center justify-center">
        <div className="relative w-full max-w-3xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto w-full pt-12 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <RsvpSection />
          </div>
          <p className="text-center text-[#5C6A3E] pb-8 pt-2 text-xl md:text-2xl px-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Agradecemos de coração a todos que poderão compartilhar esse momento tão especial conosco.
          </p>
        </div>
      </section>

      {/* SEÇÃO 4: Lista de Presentes */}
      <GiftsSection />

    </div>
  );
}