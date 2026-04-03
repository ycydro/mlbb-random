"use client";

import { Hero, Role } from "@/types";
import { Dice3, PenBox, Plus, Trash2Icon, UserPlus } from "lucide-react";
import { useRandomizer } from "@/context/RandomizerContext";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface HeroCardProps {
  onImageClick?: () => void;
}

export default function HeroCard({ onImageClick }: HeroCardProps) {
  const [open, setOpen] = useState(false);
  const { selected, state, heroPool, randomizeHero, resetHero } =
    useRandomizer();
  const hero = selected.hero ?? state.hero;
  const isLocked = Boolean(selected.hero);

  const handleClick = () => {
    if (onImageClick) {
      onImageClick();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Hero Avatar */}
      {/* <Button
        onClick={handleClick}
        aria-label={
          hero?.name ? `Hero avatar for ${hero.name}` : "Add hero avatar"
        }
        className="relative bg-slate-900 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-lg hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-200 group outline-none"
      >
        {hero ? (
          <>
            <img
              src={hero.img}
              alt={hero.name ?? "Hero avatar"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200`}
            />
          </>
        ) : (
          <Plus
            className="w-6 h-6 text-foreground group-hover:text-foreground transition-colors duration-200"
            strokeWidth={1.5}
          />
        )}
      </Button> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            aria-label={
              hero?.name ? `Hero avatar for ${hero.name}` : "Add hero avatar"
            }
            className="relative bg-slate-900 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-lg hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-200 group outline-none"
          >
            {hero ? (
              <>
                <img
                  src={hero.img}
                  alt={hero.name ?? "Hero avatar"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200`}
                />
              </>
            ) : (
              <Plus
                className="w-6 h-6 text-foreground group-hover:text-foreground transition-colors duration-200"
                strokeWidth={1.5}
              />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          sideOffset={8}
          className="w-fit p-1 bg-darker-background border-border/60 shadow-xl shadow-black/50"
        >
          <div className="flex flex-col gap-0.5">
            <Button
              onClick={() => {
                randomizeHero();
                setOpen(false);
              }}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sm font-normal text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Dice3 className="h-3.5 w-3.5 text-muted-foreground" />
              Randomize
            </Button>
            <Button
              onClick={onImageClick}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sm font-normal text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
              Filter / Select
            </Button>
            {selected.hero && (
              <Button
                onClick={() => {
                  resetHero();
                  setOpen(false);
                }}
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-sm font-normal text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                <Trash2Icon className="h-3.5 w-3.5 text-muted-foreground" />
                Unselect
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Hero Info */}
      <div className="flex flex-col justify-center items-start min-w-0">
        <Button
          variant="ghost"
          size="sm"
          asChild
          onClick={handleClick}
          className="h-fit tracking-wide truncate text-foreground text-md sm:text-2xl font-bold p-0 hover:bg-transparent hover:text-accent-foreground group cursor-pointer"
        >
          <div className="max-w-fit flex items-center gap-1.5">
            {!hero ? (
              <span className="font-bold uppercase">Hero</span>
            ) : (
              hero.name
            )}
            <PenBox className="size-4 sm:size-5 text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300 cursor-pointer" />
          </div>
        </Button>

        <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
          {heroPool.length ?? "0"} heroes
        </p>
      </div>
    </div>
  );
}
