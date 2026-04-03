"use client";

import { BASE_URL } from "@/constants";
import { BattleSpell } from "@/types";
import { Lock, Plus, X } from "lucide-react";
import { useRandomizer } from "@/context/RandomizerContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";

export default function BattleSpellSlot() {
  const {
    selected,
    state,
    selectBattleSpell,
    resetBattleSpell,
    allBattleSpells,
  } = useRandomizer();
  const [open, setOpen] = useState(false);

  const battleSpell = selected.battleSpell ?? state.battleSpell;
  const filled = Boolean(battleSpell?.img);
  const isLocked = Boolean(selected.battleSpell);

  return (
    <section
      aria-labelledby="battle-spell-heading"
      className="flex flex-col shrink-0 items-center w-fit justify-center"
    >
      {/* Header */}
      <div className="flex justify-center items-center gap-1 mb-2">
        <h2
          id="battle-spell-heading"
          className="text-[10px] font-bold text-foreground tracking-[0.2em] uppercase"
        >
          Battle Spell
        </h2>
        {isLocked && (
          <Button
            onClick={resetBattleSpell}
            className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 hover:bg-red-500/30 border border-border/40 hover:border-red-500/60 transition-all duration-150 group"
            aria-label="Clear battle spell selection"
          >
            <X className="w-2 h-2 text-foreground/50 group-hover:text-red-400" />
          </Button>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={
              battleSpell?.name
                ? `Battle Spell: ${battleSpell.name}. Click to change.`
                : "Select battle spell"
            }
            className={[
              "relative w-9 h-9 sm:w-14.5 sm:h-14.5 rounded-full flex items-center justify-center overflow-hidden transition-all duration-200 group cursor-pointer",
              filled
                ? isLocked
                  ? "border-2 border-amber-400/70 bg-slate-900 shadow-lg shadow-amber-500/30 ring-1 ring-amber-400/30"
                  : "border-2 bg-slate-900 shadow-lg shadow-amber-500/20 hover:border-amber-400"
                : "border-2 border-dashed bg-slate-900/60 hover:border-amber-500/60 hover:bg-slate-800/80",
            ].join(" ")}
          >
            {filled ? (
              <>
                <img
                  src={`${BASE_URL}${battleSpell?.img}`}
                  alt={battleSpell?.name ?? "Battle Spell"}
                  className="w-full h-full object-cover rounded-full"
                />
              </>
            ) : (
              <Plus
                className="w-5 h-5 text-foreground group-hover:text-amber-400/70 transition-colors duration-200"
                strokeWidth={1.5}
              />
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="end"
          sideOffset={8}
          className="w-52 p-2 bg-darker-background border-border/60 shadow-xl shadow-black/50"
        >
          <p className="text-[9px] text-center font-bold text-foreground/40 tracking-[0.2em] uppercase px-1">
            Select Battle Spell
          </p>

          <div className="grid grid-cols-4 gap-1.5">
            {allBattleSpells.map((spell) => {
              const isActive = selected.battleSpell?.name === spell.name;
              return (
                <button
                  key={spell.name}
                  onClick={() => {
                    selectBattleSpell(isActive ? null : spell);
                    setOpen(false);
                  }}
                  title={spell.name}
                  className={[
                    "relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-150",
                    isActive
                      ? "border-amber-400 shadow-md shadow-amber-500/30 scale-105"
                      : "border-transparent hover:border-white/30",
                  ].join(" ")}
                >
                  <img
                    src={`${BASE_URL}${spell.img}`}
                    alt={spell.name}
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 flex items-end justify-end p-0.5 pointer-events-none">
                      <div className="bg-amber-500/90 rounded-full p-0.5">
                        <Lock className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}
