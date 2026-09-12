import { createFileRoute } from '@tanstack/react-router';
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpSection } from "@/components/wedding/RsvpSection";

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    // Adicionado scroll-smooth para transições mais fluidas e classes para esconder a barra de rolagem geral
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory font-serif scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* SEÇÃO 1: Apresentação (Usa o floral-frame.png) */}
      <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center p-4 bg-[url('/floral-frame.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[#F5EDDC]/40"></div>
        
        <div className="z-10 text-center flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto">
          <p className="text-sm md:text-base text-[#47512F] uppercase tracking-widest leading-relaxed">
            "Para que todos vejam e saibam e considerem e juntamente entendam que a mão do Senhor fez isto…"
            <span className="block mt-2 font-bold text-xs">Isaías 41:20</span>
          </p>
          
          <h1 className="text-7xl md:text-8xl text-[#96691E] my-4 font-normal drop-shadow-sm" style={{ fontFamily: "'Alex Brush', cursive" }}>
            Brunna e Luis Felipe
          </h1>
          
          <p className="text-sm md:text-base text-[#5C6A3E] tracking-[0.15em] uppercase">
            Junto com a benção de Deus e seus pais
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 text-center text-[#4A3E2E] text-lg mt-4">
            <div>
              <p className="mb-1">Cristiane Lopes de Jesus Gervásio</p>
              <p>Antônio Gervásio Arantes Neto</p>
            </div>
            <div>
              <p className="mb-1">Rosilda do Carmo Costa Silva</p>
              <p>Iromar Cosmo da Silva</p>
            </div>
          </div>
          
          <p className="text-sm md:text-base text-[#5C6A3E] tracking-[0.15em] uppercase mt-8">
            Convidam para o seu casamento
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: Contagem Regressiva */}
      <section className="h-screen w-full snap-start bg-[#4A5543] flex items-center justify-center">
        <Countdown />
      </section>

      {/* SEÇÃO 3: RSVP (Usa o floral-rsvp-bg.jpg) */}
      <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center p-4 bg-[url('/floral-rsvp-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[#F5EDDC]/60"></div>
        <div className="z-10 w-full max-w-3xl mx-auto h-full flex flex-col">
          
          {/* Área da lista conectada ao RsvpSection. A barra de rolagem foi ocultada aqui também. */}
          <div className="flex-1 overflow-y-auto w-full pt-12 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <RsvpSection />
          </div>

          {/* Mensagem de agradecimento com tamanho aumentado (text-xl md:text-2xl) */}
          <p className="text-center text-[#5C6A3E] pb-8 pt-2 text-xl md:text-2xl px-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Agradecemos de coração a todos que poderão compartilhar esse momento tão especial conosco.
          </p>
        </div>
      </section>
    </div>
  );
}