"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Hero } from "@/types";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import FilterPanel from "./FilterPanel";

interface HeroDrawerProps {
  heroes: Hero[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onHeroSelect?: (heroID: Hero["heroid"]) => void;
}

export function HeroDrawer({
  heroes,
  open,
  onOpenChange,
  onHeroSelect,
}: HeroDrawerProps) {
  const handleHeroClick = (hero: Hero) => {
    if (onHeroSelect) {
      onHeroSelect(hero.heroid);
      setSearch("");
    }
  };

  const [search, setSearch] = useState("");
  const filteredHeroes = useMemo(
    () =>
      heroes.filter((hero) =>
        (hero.name ?? "").toLowerCase().includes(search.toLowerCase()),
      ),
    [heroes, search],
  );

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select a Hero</DrawerTitle>
          <DrawerDescription>Choose from available heroes</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 space-y-5">
          <Input
            id="input-demo-api-key"
            className="mt-1"
            placeholder="e.g Suyou"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterPanel />
          <div className="flex items-center gap-2 border-b border-border/40">
            <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-foreground/70">
              Hero List
            </h2>
            <span className="ml-auto text-[10px] text-foreground tracking-wider uppercase">
              {filteredHeroes.length} heroes
            </span>
          </div>
          <div className="flex flex-wrap justify-evenly gap-y-4">
            {filteredHeroes.map((hero) => (
              <button
                key={hero.heroid}
                onClick={() => handleHeroClick(hero)}
                className="flex flex-col w-fit justify-center items-center gap-0.5 group"
              >
                <img
                  src={hero.img}
                  alt={hero.name ?? "Hero avatar"}
                  className={`size-15 sm:size-20 rounded-full hover:border-3 hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-xl transition-[border] duration-100 group-hover:border-3 group-hover:border-blue-400`}
                />
                <span className="text-sm mt-1">{hero.name ?? null}</span>
              </button>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
