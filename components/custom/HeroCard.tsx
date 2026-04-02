"use client";

import { useEffect, useRef, useState } from "react";
import { Hero, Role } from "@/types";
import { Plus } from "lucide-react";

interface HeroCardProps {
  hero: Hero | null;
}

export default function HeroCard({ hero }: HeroCardProps) {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [isHeroSwitchLoading, setIsHeroSwitchLoading] = useState(false);
  const previousHeroRef = useRef<Hero | null>(null);

  useEffect(() => {
    const previousHero = previousHeroRef.current;
    const heroChanged = Boolean(previousHero && hero && previousHero !== hero);

    if (!hero) {
      setIsAvatarLoaded(false);
      setIsHeroSwitchLoading(false);
    } else if (heroChanged) {
      setIsAvatarLoaded(false);
      setIsHeroSwitchLoading(true);
    } else {
      setIsHeroSwitchLoading(false);
    }

    previousHeroRef.current = hero;
  }, [hero]);

  const showDetails = !hero || !isHeroSwitchLoading || isAvatarLoaded;

  return (
    <div className="flex items-center gap-4">
      {/* Hero Avatar */}
      {hero ? (
        <button
          type="button"
          aria-label={
            hero.name ? `Hero avatar for ${hero.name}` : "Hero avatar"
          }
          className="relative bg-slate-900 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-lg hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-200 group outline-none"
        >
          {!isAvatarLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-800" />
          )}

          <img
            src={hero.img}
            alt={hero.name ?? "Hero avatar"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isAvatarLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => {
              setIsAvatarLoaded(true);
              setIsHeroSwitchLoading(false);
            }}
            onError={() => {
              setIsAvatarLoaded(true);
              setIsHeroSwitchLoading(false);
            }}
          />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Add hero avatar"
          className="relative bg-slate-900 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-lg hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-200 group outline-none"
        >
          <Plus
            className="w-6 h-6 text-foreground group-hover:text-foreground transition-colors duration-200"
            strokeWidth={1.5}
          />
        </button>
      )}

      {/* Hero Info */}
      {showDetails && (
        <div className="flex justify-center items-center gap-2 min-w-0">
          {/* Hero Name Row */}
          <div className="flex justify-center items-center gap-2 h-full flex-wrap">
            <span className="text-2xl font-bold text-white tracking-wide truncate max-w-36 sm:max-w-50">
              {!hero?.name ? (
                <span className="font-bold text-foreground tracking-[0.2em] uppercase">
                  Hero
                </span>
              ) : (
                hero.name
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
