import { BASE_URL } from "@/app/constants";

export async function getItems() {
  try {
    const response = await fetch(`${BASE_URL}/mlbb-items.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const items = await response.json();

    return items;
  } catch (error) {
    console.error(error);
  }
}
