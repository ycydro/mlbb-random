import { BASE_URL } from "@/app/constants";

export async function getHeroes() {
  try {
    const response = await fetch(`${BASE_URL}/mlbb-heroes.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch heroes");
    }

    const heroes = await response.json();

    return heroes;
  } catch (error) {
    console.error(error);
  }
}
