import { BASE_URL } from "@/constants";

export async function getEmblems() {
  try {
    const response = await fetch(`${BASE_URL}/mlbb-emblems.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch emblems");
    }

    const emblems = await response.json();

    return emblems;
  } catch (error) {
    console.error(error);
  }
}
