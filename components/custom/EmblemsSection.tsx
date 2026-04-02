"use client";

import { BASE_URL } from "@/constants";
import { EmblemSet, EmblemTalent, FinalEmblemSet } from "@/types";
import { Plus, ChevronRight } from "lucide-react";

interface EmblemsSectionProps {
  emblemSet: FinalEmblemSet | null;
}

const MAIN_EMBLEMS = 1;
const TALENT_SLOTS = 3;

export default function EmblemsSection({
  emblemSet = null,
}: EmblemsSectionProps) {
  return (
    <section aria-labelledby="emblems-heading" className="flex-1 min-w-0">
      <h2
        id="emblems-heading"
        className="text-[10px] font-bold text-foreground tracking-[0.2em] uppercase mb-3"
      >
        Emblems
      </h2>

      <div className="flex justify-center items-center gap-0.5 sm:gap-2 flex-wrap">
        {/* Main Emblem */}
        <EmblemSlot slot={emblemSet?.main} size="lg" />

        {/* Arrow separator */}
        <ChevronRight className="size-2.5 md:size-4 text-foreground shrink-0" />
        {/* Talent Emblems */}
        <EmblemSlot slot={emblemSet?.tierOne} size="md" />
        <EmblemSlot slot={emblemSet?.tierTwo} size="md" />
        <EmblemSlot slot={emblemSet?.core} size="md" />
      </div>
    </section>
  );
}

function EmblemSlot({
  slot,
  size,
}: {
  slot: EmblemTalent | undefined;
  size: "lg" | "md";
}) {
  const filled = Boolean(slot?.img);
  const sizeClasses =
    size === "lg" ? "w-10.5 h-10.5 sm:w-14 sm:h-14" : "w-8 h-8 sm:w-12 sm:h-12";

  return (
    <button
      type="button"
      aria-label={slot?.name ? `Emblem: ${slot.name}` : "Add emblem"}
      className={[
        "relative rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-all duration-200 group",
        sizeClasses,
        filled
          ? "border-2 bg-slate-900 shadow-lg shadow-blue-500/20 hover:border-blue-400"
          : "border-2 border-dashed bg-slate-900/60 hover:border-blue-500/60 hover:bg-slate-800/80",
      ].join(" ")}
    >
      {filled ? (
        <img
          src={`${BASE_URL}${slot?.img}`}
          alt={slot?.name ?? "Emblem"}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <Plus
          className="w-4 h-4 text-foreground group-hover:text-blue-400/70 transition-colors duration-200"
          strokeWidth={1.5}
        />
      )}
    </button>
  );
}
