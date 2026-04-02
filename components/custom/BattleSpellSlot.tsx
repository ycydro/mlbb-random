"use client";

import { BASE_URL } from "@/app/constants";
import { BattleSpell } from "@/app/types";
import { Plus } from "lucide-react";

export default function BattleSpellSlot({
  battleSpell,
}: {
  battleSpell: BattleSpell | null;
}) {
  const filled = Boolean(battleSpell?.img);

  return (
    <section
      aria-labelledby="battle-spell-heading"
      className="flex flex-col shrink-0 items-center w-fit justify-center"
    >
      <h2
        id="battle-spell-heading"
        className="text-[10px] font-bold text-foreground tracking-[0.2em] uppercase mb-3"
      >
        Battle Spell
      </h2>

      <button
        type="button"
        aria-label={
          battleSpell?.name
            ? `Battle Spell: ${battleSpell.name}`
            : "Add battle spell"
        }
        className={[
          "relative w-9 h-9 sm:w-14.5 sm:h-14.5 rounded-full flex items-center justify-center overflow-hidden transition-all duration-200 group",
          filled
            ? "border-2 bg-slate-900 shadow-lg shadow-amber-500/20 hover:border-amber-400"
            : "border-2 border-dashed bg-slate-900/60 hover:border-amber-500/60 hover:bg-slate-800/80",
        ].join(" ")}
      >
        {filled ? (
          <img
            src={`${BASE_URL}${battleSpell?.img}`}
            alt={battleSpell?.name ?? "Battle Spell"}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <Plus
            className="w-5 h-5 text-foregroundgroup-hover:text-amber-400/70 transition-colors duration-200"
            strokeWidth={1.5}
          />
        )}
      </button>

      {/* {battleSpell?.name && (
        <p className="text-[10px] text-foregroundfont-semibold tracking-wide text-center mt-1.5 truncate max-w-16">
          {battleSpell.name}
        </p>
      )} */}
    </section>
  );
}
