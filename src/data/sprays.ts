interface SprayLevel {
  uuid: string;
  sprayLevel: number;
  displayName: string;
  displayIcon: string;
}

interface Spray {
  uuid: string;
  displayName: string;
  category: string | null;
  displayIcon: string;
  fullIcon: string | null;
  fullTransparentIcon: string | null;
  animationPng: string | null;
  animationGif: string | null;
  assetPath: string;
  levels: SprayLevel[];
}

export async function getSprays(): Promise<Spray[]> {
  const response = await fetch(
    "https://valorant-api.com/v1/sprays?language=tr-TR"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sprays");
  }
  const data = await response.json();
  return data.data;
}

export async function getSprayByUuid(uuid: string): Promise<Spray> {
  const response = await fetch(
    `https://valorant-api.com/v1/sprays/${uuid}?language=tr-TR`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch spray");
  }
  const data = await response.json();
  return data.data;
}
