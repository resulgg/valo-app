interface PlayerCard {
  uuid: string;
  displayName: string;
  isHiddenIfNotOwned: boolean;
  themeUuid: string | null;
  displayIcon: string;
  smallArt: string;
  wideArt: string;
  largeArt: string;
  assetPath: string;
}

const ITEMS_PER_PAGE = 15;

export async function getPlayerCards(page: number = 0): Promise<{
  items: PlayerCard[];
  nextPage: number | null;
}> {
  const response = await fetch(
    "https://valorant-api.com/v1/playercards?language=tr-TR"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch player cards");
  }
  const data = await response.json();
  const allItems = data.data;

  const start = page * ITEMS_PER_PAGE;
  const items = allItems.slice(start, start + ITEMS_PER_PAGE);
  const nextPage = start + ITEMS_PER_PAGE < allItems.length ? page + 1 : null;

  return { items, nextPage };
}

export async function getPlayerCardByUuid(uuid: string): Promise<PlayerCard> {
  const response = await fetch(
    `https://valorant-api.com/v1/playercards/${uuid}?language=tr-TR`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch player card");
  }
  const data = await response.json();
  return data.data;
}
