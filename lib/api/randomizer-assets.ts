import { safe } from "../utils";
import { getHeroes } from "./heroes";
import { getEmblems } from "./emblem";
import { getItems } from "./items";
import { getBattleSpells } from "./battle-spells";

export async function getRandomizerAssets() {
  const [heroes, emblems, items, battleSpells] = await Promise.all([
    safe(getHeroes()),
    safe(getEmblems()),
    safe(getItems()),
    safe(getBattleSpells()),
  ]);

  return {
    heroes: heroes ?? [],
    emblems: emblems ?? [],
    items: items ?? [],
    battleSpells: battleSpells ?? [],
  };
}
