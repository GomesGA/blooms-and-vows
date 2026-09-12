import { createFileRoute } from "@tanstack/react-router";
import floral from "@/assets/floral-frame.png.asset.json";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpSection } from "@/components/wedding/RsvpSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brunna & Luis Felipe — Confirme sua presença" },
      {
        name: "description",
        content:
          "Convite de casamento de Brunna e Luis Felipe. 16 de janeiro de 2027, às 16h. Encontre seu nome e confirme sua presença.",
      },
      { property: "og:title", content: "Brunna & Luis Felipe — 16.01.2027" },
      {
        property: "og:description",
        content: "Encontre seu nome na lista e confirme sua presença no nosso casamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Seção 1 — Apresentação */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-16"
        style={{
          backgroundImage: `url(${floral.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-full max-w-2xl text-center">
          <Reveal>
            <p className="mx-auto max-w-md text-sm uppercase leading-relaxed tracking-[0.12em] text-olive-deep sm:text-[0.95rem]">
              “Para que todos vejam e saibam e considerem e juntamente entendam que a mão do Senhor
              fez isto…”
              <span className="mt-2 block text-xs tracking-[0.2em]">Isaías 41:20</span>
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-10 font-script text-[3.4rem] leading-none text-gold-deep sm:text-7xl md:text-8xl">
              Brunna <span className="text-gold">e</span> Luis Felipe
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-8 text-base uppercase tracking-[0.14em] text-olive">
              Junto com a benção de Deus e seus pais
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 grid grid-cols-1 gap-6 text-lg text-ink sm:grid-cols-2 sm:gap-12">
              <div>
                <p>Cristiane Lopes de Jesus Gervásio</p>
                <p>Antônio Gervásio Arantes Neto</p>
              </div>
              <div>
                <p>Rosilda do Carmo Costa Silva</p>
                <p>Iromar Cosmo da Silva</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={540}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="h-px w-14 bg-gold/60" />
              <p className="text-sm uppercase tracking-[0.18em] text-gold-deep">
                Convidam para o seu casamento
              </p>
              <span className="h-px w-14 bg-gold/60" />
            </div>
          </Reveal>

          <Reveal delay={660}>
            <a
              href="#rsvp"
              className="mt-12 inline-block rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-[0.18em] text-gold-deep transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Confirmar presença
            </a>
          </Reveal>
        </div>
      </section>

      {/* Seção 2 — Contagem regressiva */}
      <Countdown />

      {/* Seção 3 — RSVP */}
      <div
        style={{
          backgroundImage: `url(${floral.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <RsvpSection />
      </div>

      {/* Seção 4 — Agradecimento */}
      <footer className="bg-cream-deep px-6 py-20 text-center">
        <Reveal>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-ink sm:text-2xl">
            Agradecemos de coração a todos que poderão compartilhar esse momento tão especial e
            inesquecível conosco. Mal podemos esperar para celebrar com vocês!
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 font-script text-6xl text-gold-deep">B &amp; L</p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-olive">16.01.2027</p>
        </Reveal>
      </footer>
    </main>
  );
}
