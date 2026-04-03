"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRandomizer } from "@/context/RandomizerContext";
import { LANES, ROLES, DAMAGE_TYPES, Lane, Role, DamageType } from "@/types";
import { Sword, Map, Zap } from "lucide-react";

const LANE_COLORS: Record<string, string> = {
  Gold: "data-[state=on]:bg-amber-500/20 data-[state=on]:border-amber-500/60 data-[state=on]:text-amber-300",
  EXP: "data-[state=on]:bg-red-500/20 data-[state=on]:border-red-500/60 data-[state=on]:text-red-300",
  Mid: "data-[state=on]:bg-violet-500/20 data-[state=on]:border-violet-500/60 data-[state=on]:text-violet-300",
  Jungle:
    "data-[state=on]:bg-green-500/20 data-[state=on]:border-green-500/60 data-[state=on]:text-green-300",
  Roaming:
    "data-[state=on]:bg-cyan-500/20 data-[state=on]:border-cyan-500/60 data-[state=on]:text-cyan-300",
};

const ROLE_COLORS: Record<string, string> = {
  Tank: "data-[state=on]:bg-amber-500/20 data-[state=on]:border-amber-500/60 data-[state=on]:text-amber-300",
  Fighter:
    "data-[state=on]:bg-red-500/20 data-[state=on]:border-red-500/60 data-[state=on]:text-red-300",
  Assassin:
    "data-[state=on]:bg-purple-500/20 data-[state=on]:border-purple-500/60 data-[state=on]:text-purple-300",
  Marksman:
    "data-[state=on]:bg-yellow-500/20 data-[state=on]:border-yellow-500/60 data-[state=on]:text-yellow-300",
  Mage: "data-[state=on]:bg-cyan-500/20 data-[state=on]:border-cyan-500/60 data-[state=on]:text-cyan-300",
  Support:
    "data-[state=on]:bg-teal-500/20 data-[state=on]:border-teal-500/60 data-[state=on]:text-teal-300",
};

interface FilterGroupProps<T extends string> {
  label: string;
  icon: React.ReactNode;
  values: readonly T[];
  value: T[] | T;
  onValueChange: (value: T[] | T) => void;
  colorMap?: Record<string, string>;
  type?: "single" | "multiple";
}

function FilterGroup<T extends string>({
  label,
  icon,
  values,
  value,
  onValueChange,
  colorMap = {},
  type = "multiple",
}: FilterGroupProps<T>) {
  const baseItem =
    "h-7 cursor-pointer px-3 text-[11px] font-semibold tracking-wider uppercase rounded-sm border border-border/50 bg-primary/40 text-foreground/60 transition-all duration-150 hover:border-border hover:text-foreground/90 hover:bg-primary/60";

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-2 w-full">
        <span className="text-foreground/40">{icon}</span>
        <h3 className="text-[10px] font-bold text-foreground/50 tracking-[0.2em] uppercase">
          {label}
        </h3>
      </div>

      {type === "multiple" ? (
        <ToggleGroup
          type="multiple"
          value={value as T[]}
          className="flex flex-wrap gap-1.5 justify-start"
          onValueChange={(newValue) => onValueChange(newValue as T[])}
        >
          {values.map((val) => (
            <ToggleGroupItem
              key={val}
              value={val}
              className={[baseItem, colorMap[val] ?? ""].join(" ")}
            >
              {val}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          value={value as T}
          className="flex flex-wrap gap-1.5 justify-start"
          onValueChange={(newValue) => onValueChange(newValue as T)}
        >
          {values.map((val) => (
            <ToggleGroupItem
              key={val}
              value={val}
              className={[baseItem, colorMap[val] ?? ""].join(" ")}
            >
              {val}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  );
}

export default function FilterPanel() {
  const { filters, setFilters } = useRandomizer();

  return (
    <aside
      aria-label="Randomizer filters"
      className="w-full shrink-0 flex flex-col gap-3 rounded-xl"
    >
      <FilterGroup
        label="Lane"
        icon={<Map className="w-3 h-3" />}
        values={LANES}
        value={filters.lanes as string[]}
        onValueChange={(value) => {
          setFilters((prev) => ({ ...prev, lanes: value as Lane[] }));
        }}
        colorMap={LANE_COLORS}
        type="multiple"
      />

      <FilterGroup
        label="Hero Role"
        icon={<Sword className="w-3 h-3" />}
        values={ROLES}
        value={filters.roles as string[]}
        onValueChange={(value) => {
          setFilters((prev) => ({ ...prev, roles: value as Role[] }));
        }}
        colorMap={ROLE_COLORS}
        type="multiple"
      />

      <FilterGroup
        label="Damage Type"
        icon={<Zap className="w-3 h-3" />}
        values={DAMAGE_TYPES}
        value={filters.damageType as string[]}
        onValueChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            damageType: value as DamageType[],
          }));
        }}
        colorMap={{
          Physical:
            "data-[state=on]:bg-red-500/20 data-[state=on]:border-red-500/60 data-[state=on]:text-red-300",
          Magic:
            "data-[state=on]:bg-cyan-500/20 data-[state=on]:border-cyan-500/60 data-[state=on]:text-cyan-300",
          Mixed:
            "data-[state=on]:bg-purple-500/20 data-[state=on]:border-purple-500/60 data-[state=on]:text-purple-300",
        }}
        type="multiple"
      />
    </aside>
  );
}
