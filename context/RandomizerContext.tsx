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
import { toast } from "sonner";

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
  selected: Selected;
  setSelected: React.Dispatch<React.SetStateAction<Selected>>;
  heroPool: Hero[];
  allBattleSpells: BattleSpell[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  selectHero: (heroID: Hero["heroid"]) => void;
  selectLane: (lane: Lane | null) => void;
  selectBattleSpell: (battleSpell: BattleSpell | null) => void;
  resetHero: () => void;
  resetLane: () => void;
  resetBattleSpell: () => void;
  resetAll: () => void;
  resetState: () => void;
  randomizeHero: () => void;
  randomizeItems: () => void;
  randomizeEmblems: () => FinalEmblemSet;
  randomizeBattleSpell: () => BattleSpell;
  randomizeAll: () => void;
}

interface Filters {
  lanes?: Lane[];
  roles?: Role[];
  damageType?: DamageType[];
}

interface Selected {
  hero?: Hero | null;
  lane?: Lane | null;
  role?: Role | null;
  battleSpell?: BattleSpell | null;
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

const iniitalSelection: Selected = {
  hero: null,
  role: null,
  lane: null,
  battleSpell: null,
};

export function RandomizerProvider({
  children,
  heroes,
  emblems,
  items,
  battleSpells,
}: RandomizerProviderProps) {
  const [state, setState] = useState<RandomizerState>(initialState);
  const [selected, setSelected] = useState<Selected>(iniitalSelection);
  const [filters, setFilters] = useState<Filters>({});

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

  const filterHero = useCallback(
    (hero: Hero): boolean => {
      const laneMatch =
        !filters.lanes?.length ||
        (hero.lanes ?? []).some((lane) => filters.lanes!.includes(lane));

      const roleMatch =
        !filters.roles?.length ||
        (hero.roles ?? []).some((role) => filters.roles!.includes(role));

      const damageType = hero["damage-type"] ?? null;
      const damageTypeMatch =
        !filters.damageType?.length ||
        (damageType !== null && filters.damageType!.includes(damageType));

      return laneMatch && roleMatch && damageTypeMatch;
    },
    [filters],
  );

  const filteredHeroes = useMemo(
    () => heroes.filter(filterHero),
    [heroes, filterHero, filters],
  );

  const heroPool = filteredHeroes.length > 0 ? filteredHeroes : heroes;

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

      if (damageType === "Physical") {
        categories.push("Physical Attack");
      } else if (damageType === "Magic") {
        categories.push("Magic");
      } else {
        categories.push("Physical Attack");
        categories.push("Magic");
      }

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

  // selects
  const selectHero = useCallback(
    (heroID: Hero["heroid"]) => {
      const hero = heroes.find((h) => h.heroid === heroID) ?? null;

      setSelected({ ...iniitalSelection, hero });

      // setState({
      //   ...initialState,
      //   hero,
      //   damageType: hero?.["damage-type"] ?? null,
      //   // items: buildItemList(hero),
      // });
    },
    [heroes],
  );
  const selectLane = useCallback(
    (lane: Lane | null) => {
      if (selected.lane === lane) return;

      // if (selected.battleSpell?.name === "Retribution") {
      //   toast.error("Please remove Retribution as Battle Spell first.");
      //   return;
      // }

      if (lane === "Jungle") {
        const retribution = battleSpells.find(
          (spell) => spell.name === "Retribution",
        );
        if (retribution) {
          setSelected((prev) => ({ ...prev, lane, battleSpell: retribution }));
          return;
        }
      }

      setSelected((prev) => ({ ...prev, lane }));
    },
    [selected.lane, selected.battleSpell, battleSpells],
  );

  const selectBattleSpell = useCallback(
    (battleSpell: BattleSpell | null) => {
      if (selected.battleSpell?.name === battleSpell?.name) return;

      if (
        selected.battleSpell?.name === "Retribution" &&
        selected.lane === "Jungle"
      ) {
        toast.error("Please remove Jungle as your selected lane first.");
        return;
      }

      // if (battleSpell?.name === "Retribution") {
      //   setSelected((prev) => ({ ...prev, battleSpell, lane: "Jungle" }));
      //   return;
      // }

      setSelected((prev) => ({ ...prev, battleSpell }));
    },
    [selected.battleSpell, selected.lane],
  );

  const resetHero = useCallback(() => {
    setSelected((prev) => ({ ...prev, hero: null }));
    setState((prev) => ({ ...prev, hero: null, damageType: null }));
  }, []);

  const resetLane = useCallback(() => {
    setSelected((prev) => ({ ...prev, lane: null }));
    setState((prev) => ({ ...prev, lane: null }));
  }, [selected.lane, selected.battleSpell]);

  const resetBattleSpell = useCallback(() => {
    if (selected.lane === "Jungle") {
      toast.error("Please remove Jungle as your selected lane first.");
      return;
    }
    setSelected((prev) => ({ ...prev, battleSpell: null }));
    setState((prev) => ({ ...prev, battleSpell: null }));
  }, [selected.lane]);

  const resetAll = useCallback(() => {
    setSelected(iniitalSelection);
    setState(initialState);
  }, []);

  // exposed
  const resetState = useCallback(() => {
    setState(initialState);
    setFilters({});
  }, []);

  const randomizeHero = useCallback(() => {
    const hero = heroPool[getRandomIndex(heroPool.length)];
    setState((prev) => ({
      ...prev,
      hero,
      damageType: hero["damage-type"] ?? null,
    }));
  }, [heroPool]);

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
    if (heroPool.length === 0) return;
    const hero = selected.hero ?? heroPool[getRandomIndex(heroPool.length)];
    const lane = selected.lane ?? LANES[getRandomIndex(LANES.length)];
    const battleSpell = selected.battleSpell ?? buildBattleSpell(lane);
    let items: Item[] = [];
    try {
      items = buildItemList(hero);
    } catch {}
    setState({
      hero,
      damageType: hero["damage-type"] ?? null,
      lane,
      role: null,
      items,
      emblemSet: buildEmblemSet(),
      battleSpell,
    });
  }, [
    selected.hero,
    selected.lane,
    selected.battleSpell,
    heroPool,
    buildItemList,
    buildEmblemSet,
    buildBattleSpell,
  ]);

  const value = useMemo<RandomizerContextValue>(
    () => ({
      state,
      resetState,
      // SELECTED
      selected,
      setSelected,
      // HEROES
      heroPool,
      // FILTERS
      filters,
      setFilters,
      // SELECTS
      selectHero,
      selectLane,
      selectBattleSpell,
      resetHero,
      resetLane,
      resetBattleSpell,
      resetAll,
      allBattleSpells: battleSpells,
      // RANDOMIZERS
      randomizeHero,
      randomizeItems,
      randomizeEmblems,
      randomizeBattleSpell,
      randomizeAll,
    }),
    [
      state,
      selected,
      heroPool,
      filters,
      selectHero,
      selectLane,
      selectBattleSpell,
      resetHero,
      resetLane,
      resetBattleSpell,
      resetAll,
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
