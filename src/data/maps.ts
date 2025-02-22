interface Map {
  uuid: string;
  displayName: string;
  coordinates: string;
  displayIcon: string;
  listViewIcon: string;
  splash: string;
  description: string;
}

export async function getMaps(): Promise<Map[]> {
  const response = await fetch("https://valorant-api.com/v1/maps");
  if (!response.ok) {
    throw new Error("Failed to fetch maps");
  }
  const data = await response.json();
  return data.data;
}

export async function getMapByUuid(uuid: string): Promise<Map> {
  const response = await fetch(`https://valorant-api.com/v1/maps/${uuid}`);
  if (!response.ok) {
    throw new Error("Failed to fetch map");
  }
  const data = await response.json();
  return data.data;
}
