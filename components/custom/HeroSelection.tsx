"use client";

import { useState } from "react";
import { Hero } from "@/types";
import HeroCard from "./HeroCard";
import { HeroDrawer } from "./HeroDrawer";
import { useRandomizer } from "@/context/RandomizerContext";

interface HeroSelectionProps {}

export default function HeroSelection({}: HeroSelectionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { state, selected, heroPool: heroes, selectHero } = useRandomizer();

  return (
    <>
      <HeroCard onImageClick={() => setIsDrawerOpen(true)} />
      <HeroDrawer
        heroes={heroes}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onHeroSelect={(hero) => {
          selectHero(hero);
          setIsDrawerOpen(false);
        }}
      />
    </>
  );
}
