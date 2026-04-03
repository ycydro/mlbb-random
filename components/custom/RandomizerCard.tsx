"use client";

import EquipmentSlots from "./EquipmentSlots";
import EmblemsSection from "./EmblemsSection";
import BattleSpellSlot from "./BattleSpellSlot";
import RandomizeButton from "./RandomizeButton";
import LaneBadge from "./LaneBadge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRandomizer } from "@/context/RandomizerContext";
import { RotateCcw } from "lucide-react";
import HeroSelection from "./HeroSelection";
import { Button } from "../ui/button";

interface RandomizerCardProps {
  isLoading?: boolean;
}

export default function RandomizerCard({
  isLoading = false,
}: RandomizerCardProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  // TODO: ENABLE RANDOMIZATION OF ALL COMPONENTS
  const { state, randomizeAll, resetAll, selected } = useRandomizer();
  const hasAnySelection =
    selected.hero || selected.lane || selected.battleSpell;
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col relative z-10">
      {hasAnySelection && (
        <Button
          onClick={resetAll}
          className="flex items-center w-full mb-2 justify-center gap-2 mx-auto text-[11px] font-semibold text-foreground/40 hover:text-foreground/70 tracking-wider uppercase transition-colors duration-200 py-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All Selections
        </Button>
      )}
      {/* Hero*/}
      <div
        className={cn(
          "relative bg-background border border-1.5 rounded-xl backdrop-blur-sm p-4 transition-opacity ease-out duration-100",
          isAnimate ? "opacity-0" : "opacity-100",
        )}
        onTransitionEnd={() => {
          if (isAnimate) setIsAnimate(false);
        }}
      >
        <div className="flex items-center justify-between gap-3 pb-3">
          <HeroSelection />
          <LaneBadge />
        </div>

        {/* Equipment card */}
        <div className="relative bg-primary border border-1.5 backdrop-blur-sm p-4">
          <EquipmentSlots items={state.items} />
        </div>
        {/* Emblems + Battle Spell card */}
        <div className="relative bg-primary border border-1.5 backdrop-blur-sm p-4">
          <div className="flex items-start gap-1.5 sm:gap-4">
            <EmblemsSection emblemSet={state.emblemSet} />

            <div className="w-px self-stretch bg-border shrink-0 mt-5" />
            <BattleSpellSlot />
          </div>
        </div>
      </div>

      <div className="pt-2 space-y-2">
        <RandomizeButton isLoading={isLoading} onClick={randomizeAll} />
      </div>
    </div>
  );
}
