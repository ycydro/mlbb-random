"use client";

import { Lock, X, MapPin, Trash2Icon } from "lucide-react";
import { Lane, LANES } from "@/types";
import { useRandomizer } from "@/context/RandomizerContext";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

const LANE_COLORS: Record<string, string> = {
  Gold: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  EXP: "text-red-400 border-red-500/40 bg-red-500/10",
  Mid: "text-violet-400 border-violet-500/40 bg-violet-500/10",
  Jungle: "text-green-400 border-green-500/40 bg-green-500/10",
  Roaming: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
};

const LANE_LOCKED_RING: Record<string, string> = {
  Gold: "ring-amber-400/40",
  EXP: "ring-red-400/40",
  Mid: "ring-violet-400/40",
  Jungle: "ring-green-400/40",
  Roaming: "ring-cyan-400/40",
};

const LANE_ACTIVE_BG: Record<string, string> = {
  Gold: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  EXP: "bg-red-500/20 text-red-300 border-red-500/40",
  Mid: "bg-violet-500/20 text-violet-300 border-violet-500/40",
  Jungle: "bg-green-500/20 text-green-300 border-green-500/40",
  Roaming: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
};

interface LaneBadgeProps {}

export default function LaneBadge({}: LaneBadgeProps) {
  const [open, setOpen] = useState(false);
  const { selected, state, selectLane, resetLane } = useRandomizer();
  const lane = selected.lane ?? state.lane;
  const isLocked = Boolean(selected.lane);

  const colorClasses =
    lane && LANE_COLORS[lane]
      ? LANE_COLORS[lane]
      : "text-foreground/60 border-border/50 bg-primary/40";

  const lockedRing =
    lane && LANE_LOCKED_RING[lane] ? LANE_LOCKED_RING[lane] : "";

  return (
    <div className="flex items-center gap-1">
      {/* Clear button — only when locked */}
      {isLocked && (
        <button
          onClick={resetLane}
          className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 hover:bg-red-500/30 border border-border/40 hover:border-red-500/60 transition-all duration-150 group"
          aria-label="Clear lane selection"
        >
          <X className="w-2.5 h-2.5 text-foreground/50 group-hover:text-red-400" />
        </button>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            aria-label={
              lane ? `Lane: ${lane}. Click to change.` : "Select a lane"
            }
            className={[
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer hover:opacity-80",
              colorClasses,
              isLocked ? `ring-1 ${lockedRing}` : "",
            ].join(" ")}
          >
            {isLocked && <Lock className="w-2.5 h-2.5 opacity-70" />}
            <span>{lane ?? "Lane"}</span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={8}
          className="w-36 p-1.5 bg-darker-background border-border/60 shadow-xl shadow-black/50"
        >
          <div className="flex flex-col gap-0.5">
            {LANES.map((l) => {
              const isActive = selected.lane === l;
              return (
                <button
                  key={l}
                  onClick={() => {
                    selectLane(isActive ? null : l);
                    setOpen(false);
                  }}
                  className={[
                    "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase transition-all duration-150 border",
                    isActive
                      ? LANE_ACTIVE_BG[l]
                      : "border-transparent text-foreground/60 hover:text-foreground hover:bg-white/5",
                  ].join(" ")}
                >
                  <span>{l}</span>
                  {isActive && (
                    <Lock className="w-2.5 h-2.5 opacity-60 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {isLocked && (
            <Button
              onClick={() => {
                resetLane();
                setOpen(false);
              }}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sm font-normal text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <div className="flex gap-1 justify-center items-center w-full">
                <Trash2Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Unselect</span>
              </div>
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
