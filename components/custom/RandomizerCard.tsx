"use client";

import HeroCard from "./HeroCard";
import EquipmentSlots from "./EquipmentSlots";
import EmblemsSection from "./EmblemsSection";
import BattleSpellSlot from "./BattleSpellSlot";
import RandomizeButton from "./RandomizeButton";
import LaneBadge from "./LaneBadge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRandomizer } from "@/context/RandomizerContext";
import { Button } from "../ui/button";

interface RandomizerCardProps {
  isLoading?: boolean;
}

export default function RandomizerCard({
  isLoading = false,
}: RandomizerCardProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  // TODO: ENABLE RANDOMIZATION OF ALL COMPONENTS
  const { state, randomizeAll } = useRandomizer();
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col relative z-10">
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
          <HeroCard hero={state.hero} />
          <LaneBadge lane={state.lane} />
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
            <BattleSpellSlot battleSpell={state.battleSpell} />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <RandomizeButton isLoading={isLoading} onClick={randomizeAll} />
      </div>
    </div>
  );
}
