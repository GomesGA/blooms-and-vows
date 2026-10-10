import { cn } from "@/lib/utils";

/** Divisor floral em aquarela (mesmo estilo do convite), com leve balanço. */
export function FloralDivider({ className }: { className?: string }) {
  return (
    <img
      src="/divisor-floral.png"
      alt=""
      aria-hidden
      draggable={false}
      className={cn("w-64 md:w-80 h-auto select-none animate-sway origin-center", className)}
    />
  );
}
