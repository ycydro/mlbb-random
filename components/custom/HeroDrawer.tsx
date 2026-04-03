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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

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
            placeholder="Search for MLBB Hero names..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="filters"
              className="border-b border-border/40"
            >
              <AccordionTrigger className="py-2 text-left">
                <div className="flex w-full items-center gap-2">
                  <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-foreground/70">
                    Hero Filters
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <FilterPanel />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
