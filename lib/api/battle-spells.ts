import { BASE_URL } from "@/constants";

export async function getBattleSpells() {
  try {
    const response = await fetch(`${BASE_URL}/mlbb-battle-spells.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch battle spells");
    }

    const battleSpells = await response.json();

    return battleSpells;
  } catch (error) {
    console.error(error);
  }
}
