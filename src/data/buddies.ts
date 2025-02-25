interface BuddyLevel {
  uuid: string;
  charmLevel: number;
  displayName: string;
  displayIcon: string;
  assetPath: string;
}

interface Buddy {
  uuid: string;
  displayName: string;
  isHiddenIfNotOwned: boolean;
  themeUuid: string | null;
  displayIcon: string;
  assetPath: string;
  levels: BuddyLevel[];
}

const ITEMS_PER_PAGE = 20;

export async function getBuddies(page: number = 0): Promise<{
  items: Buddy[];
  nextPage: number | null;
}> {
  const response = await fetch(
    "https://valorant-api.com/v1/buddies?language=tr-TR"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch buddies");
  }
  const data = await response.json();
  const allItems = data.data;

  const start = page * ITEMS_PER_PAGE;
  const items = allItems.slice(start, start + ITEMS_PER_PAGE);
  const nextPage = start + ITEMS_PER_PAGE < allItems.length ? page + 1 : null;

  return { items, nextPage };
}

export async function getBuddyByUuid(uuid: string): Promise<Buddy> {
  const response = await fetch(
    `https://valorant-api.com/v1/buddies/${uuid}?language=tr-TR`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch buddy");
  }
  const data = await response.json();
  return data.data;
}
