"use client";

import { Shuffle } from "lucide-react";

interface RandomizeButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export default function RandomizeButton({
  onClick,
  isLoading,
}: RandomizeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      aria-label="Randomize hero, build, lane, role, and battle spell"
      className="bg-[#B9A37F] border border-[#C4B289] w-full max-w-sm mx-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-sm text-[#fff9ef] font-black text-sm tracking-[0.25em] uppercase active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
    >
      <Shuffle
        className={`w-4 h-4 shrink-0 ${isLoading ? "animate-spin" : ""}`}
      />
      {isLoading ? "Randomizing..." : "Randomize"}
    </button>
  );
}
