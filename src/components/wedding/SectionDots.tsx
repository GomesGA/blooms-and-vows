import { useEffect, useState, type RefObject } from "react";

export type SectionDot = {
  id: string;
  label: string;
  /** Indica se a seção tem fundo escuro (os pontos ficam claros para contrastar) */
  dark?: boolean;
};

type SectionDotsProps = {
  sections: SectionDot[];
  /** Container com scroll (snap) onde as seções estão */
  containerRef: RefObject<HTMLElement | null>;
};

export function SectionDots({ sections, containerRef }: SectionDotsProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Observa qual seção ocupa a maior parte da tela
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { root, threshold: [0.5, 0.75] },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, containerRef]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = sections.find((s) => s.id === activeId)?.dark ?? false;

  return (
    <nav
      aria-label="Navegação entre seções"
      className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 md:gap-5"
    >
      {sections.map(({ id, label }) => {
        const active = id === activeId;
        return (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            className="group relative flex items-center justify-end h-4 w-6 md:w-8 cursor-pointer"
          >
            {/* Rótulo que aparece ao passar o mouse (apenas desktop) */}
            <span
              className={`pointer-events-none absolute right-6 md:right-8 whitespace-nowrap text-sm tracking-[0.2em] uppercase opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block ${
                isDark ? "text-white" : "text-[#4A5543]"
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {label}
            </span>

            {/* Ponto */}
            <span
              className={`block rounded-full border transition-all duration-500 ease-out ${
                active ? "h-[10px] w-[10px] md:h-3.5 md:w-3.5" : "h-2 w-2 md:h-2.5 md:w-2.5 group-hover:scale-125"
              } ${
                isDark
                  ? active
                    ? "bg-white border-white shadow-[0_0_0_3px_rgba(255,255,255,0.25)]"
                    : "bg-transparent border-white/80"
                  : active
                    ? "bg-[#4A5543] border-[#4A5543] shadow-[0_0_0_3px_rgba(74,85,67,0.2)]"
                    : "bg-transparent border-[#4A5543]/80"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
