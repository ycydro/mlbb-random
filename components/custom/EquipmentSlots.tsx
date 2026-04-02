"use client";

import { BASE_URL, MAX_ITEM_SLOTS } from "@/constants";
import { Item } from "@/types";
import { Plus } from "lucide-react";

interface EquipmentSlotsProps {
  items?: Item[];
}

export default function EquipmentSlots({ items = [] }: EquipmentSlotsProps) {
  const slots: Item[] = Array.from({ length: MAX_ITEM_SLOTS }, (_, i) => ({
    ...(items[i] ?? {}),
  }));

  return (
    <section aria-labelledby="equipment-heading">
      <h2
        id="equipment-heading"
        className="text-[10px] font-bold text-foreground tracking-[0.2em] uppercase mb-3"
      >
        Equipment
      </h2>

      <div className="flex justify-center flex-wrap gap-1 sm:gap-3">
        {slots.map((slot, index) => (
          <EquipmentSlot key={index} slot={slot} />
        ))}
      </div>
    </section>
  );
}

function EquipmentSlot({ slot }: { slot: Item }) {
  const filled = Boolean(slot.img);

  return (
    <button
      type="button"
      aria-label={slot.name ? `Equipment: ${slot.name}` : "Add equipment item"}
      className={[
        "relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-all duration-200 group",
        filled
          ? "border-2 bg-slate-900 shadow-lg shadow-blue-500/20 hover:border-blue-400 hover:shadow-blue-400/30"
          : "border-2 border-dashed bg-slate-900/60 hover:border-blue-500/60 hover:bg-slate-800/80",
      ].join(" ")}
    >
      {filled ? (
        <img
          src={`${BASE_URL}${slot.img}`}
          alt={slot.name ?? "Equipment"}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <Plus
          className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-200"
          strokeWidth={1.5}
        />
      )}
    </button>
  );
}
