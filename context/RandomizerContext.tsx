"use client";

import { getRandomIndex } from "@/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  BattleSpell,
  DamageType,
  EmblemSet,
  FinalEmblemSet,
  Hero,
  Item,
  ITEM_CATEGORIES,
  ItemCategory,
  Lane,
  LANES,
  Role,
} from "@/types";
import { MAX_ITEM_SLOTS } from "../constants";

export interface RandomizerState {
  hero: Hero | null;
  role: Role | null;
  lane: Lane | null;
  items: Item[];
  emblemSet: FinalEmblemSet | null;
  battleSpell: BattleSpell | null;
  damageType: DamageType | null;
}

interface RandomizerContextValue {
  state: RandomizerState;
  randomizeHero: () => void;
  randomizeItems: () => void;
  randomizeEmblems: () => FinalEmblemSet;
  randomizeBattleSpell: () => BattleSpell;
  randomizeAll: () => void;
}

const RandomizerContext = createContext<RandomizerContextValue | null>(null);

interface RandomizerProviderProps {
  children: React.ReactNode;
  heroes: Hero[];
  emblems: EmblemSet[];
  items: Item[];
  battleSpells: BattleSpell[];
}

const initialState: RandomizerState = {
  hero: null,
  role: null,
  lane: null,
  items: [],
  emblemSet: null,
  battleSpell: null,
  damageType: null,
};

export function RandomizerProvider({
  children,
  heroes,
  emblems,
  items,
  battleSpells,
}: RandomizerProviderProps) {
  const [state, setState] = useState<RandomizerState>(initialState);

  // memoized so they don't recompute on every render
  const { mainEmblems, tierOneTalents, tierTwoTalents, coreTalents } = useMemo(
    () => ({
      mainEmblems: emblems.map((e) => e.main),
      tierOneTalents: emblems.flatMap((e) => e["standard-talents"]["tier-one"]),
      tierTwoTalents: emblems.flatMap((e) => e["standard-talents"]["tier-two"]),
      coreTalents: emblems.flatMap((e) => e["core-talents"]).flat(),
    }),
    [emblems],
  );

  // helpers
  const determineItemCategories = useCallback(
    (hero: Pick<Hero, "roles" | "damage-type">): ItemCategory[] => {
      const categories: ItemCategory[] = ["Neutral"];
      const roles = hero.roles ?? [];
      const damageType = hero["damage-type"] ?? null;

      if (roles.includes("Tank")) {
        categories.push("Defense");
        return categories;
      }

      if (roles.includes("Support") || roles.includes("Fighter")) {
        categories.push("Defense");
      }

      categories.push(damageType === "Physical" ? "Physical Attack" : "Magic");

      return categories;
    },
    [],
  );

  const generateRandomItem = useCallback(
    (categories: ItemCategory[]): Item => {
      const validItems = items.filter((item) =>
        categories.includes(item.category),
      );
      return validItems[getRandomIndex(validItems.length)];
    },
    [items],
  );

  const buildItemList = useCallback(
    (hero: Hero | null): Item[] => {
      const categories = hero
        ? determineItemCategories(hero)
        : ITEM_CATEGORIES.filter((cat) => cat !== "Movement");

      const newItems: Item[] = [];
      const selected = new Set<Item>();

      const boots = generateRandomItem(["Movement"]);
      newItems.push(boots);
      selected.add(boots);

      while (newItems.length < MAX_ITEM_SLOTS) {
        const item = generateRandomItem(categories);
        if (!selected.has(item)) {
          newItems.push(item);
          selected.add(item);
        }
      }

      return newItems;
    },
    [determineItemCategories, generateRandomItem],
  );

  const buildEmblemSet = useCallback((): FinalEmblemSet => {
    return {
      main: mainEmblems[getRandomIndex(mainEmblems.length)],
      tierOne: tierOneTalents[getRandomIndex(tierOneTalents.length)],
      tierTwo: tierTwoTalents[getRandomIndex(tierTwoTalents.length)],
      core: coreTalents[getRandomIndex(coreTalents.length)],
    };
  }, [mainEmblems, tierOneTalents, tierTwoTalents, coreTalents]);

  const buildBattleSpell = useCallback(
    (lane: Lane | null): BattleSpell => {
      if (lane === "Jungle") {
        return battleSpells.find((s) => s.name === "Retribution")!;
      }
      const pool = battleSpells.filter((s) => s.name !== "Retribution");
      return pool[getRandomIndex(pool.length)];
    },
    [battleSpells],
  );

  // exposed
  const randomizeHero = useCallback(() => {
    const hero = heroes[getRandomIndex(heroes.length)];
    setState((prev) => ({
      ...prev,
      hero,
      damageType: hero["damage-type"] ?? null,
    }));
  }, [heroes]);

  const randomizeItems = useCallback(() => {
    setState((prev) => ({
      ...prev,
      items: buildItemList(prev.hero),
    }));
  }, [buildItemList]);

  const randomizeEmblems = useCallback((): FinalEmblemSet => {
    const emblemSet = buildEmblemSet();
    setState((prev) => ({ ...prev, emblemSet }));
    return emblemSet;
  }, [buildEmblemSet]);

  const randomizeBattleSpell = useCallback((): BattleSpell => {
    const battleSpell = buildBattleSpell(state.lane);
    setState((prev) => ({ ...prev, battleSpell }));
    return battleSpell;
  }, [buildBattleSpell, state.lane]);

  const randomizeAll = useCallback(() => {
    const hero = heroes[getRandomIndex(heroes.length)];
    const lane = LANES[getRandomIndex(LANES.length)];

    setState({
      hero,
      damageType: hero["damage-type"] ?? null,
      lane,
      role: null,
      items: buildItemList(hero),
      emblemSet: buildEmblemSet(),
      battleSpell: buildBattleSpell(lane),
    });
  }, [heroes, buildItemList, buildEmblemSet, buildBattleSpell]);

  const value = useMemo<RandomizerContextValue>(
    () => ({
      state,
      randomizeHero,
      randomizeItems,
      randomizeEmblems,
      randomizeBattleSpell,
      randomizeAll,
    }),
    [
      state,
      randomizeHero,
      randomizeItems,
      randomizeEmblems,
      randomizeBattleSpell,
      randomizeAll,
    ],
  );

  return (
    <RandomizerContext.Provider value={value}>
      {children}
    </RandomizerContext.Provider>
  );
}

export function useRandomizer(): RandomizerContextValue {
  const ctx = useContext(RandomizerContext);
  if (!ctx) {
    throw new Error("useRandomizer must be used within a <RandomizerProvider>");
  }
  return ctx;
}
