"use client";

import { MapPin } from "lucide-react";

interface LaneBadgeProps {
  lane?: string | null;
}

const LANE_COLORS: Record<string, string> = {
  Gold: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  Exp: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  Mid: "text-violet-400 border-violet-500/40 bg-violet-500/10",
  Jungle: "text-green-400 border-green-500/40 bg-green-500/10",
  Roaming: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
};

export default function LaneBadge({ lane }: LaneBadgeProps) {
  const colorClasses =
    lane && LANE_COLORS[lane]
      ? LANE_COLORS[lane]
      : "text-foreground border bg-primary";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase ${colorClasses} transition-colors duration-200`}
      aria-label={lane ? `Lane: ${lane}` : "Lane not selected"}
    >
      <span>{lane ?? "Lane"}</span>
    </div>
  );
}
