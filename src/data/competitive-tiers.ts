interface CompetitiveTier {
  tier: number;
  tierName: string;
  division: string;
  divisionName: string;
  color: string;
  backgroundColor: string;
  smallIcon: string;
  largeIcon: string;
  rankTriangleDownIcon: string | null;
  rankTriangleUpIcon: string | null;
}

interface CompetitiveTierSet {
  uuid: string;
  assetObjectName: string;
  tiers: CompetitiveTier[];
  assetPath: string;
}

export async function getCompetitiveTiers(): Promise<CompetitiveTierSet[]> {
  const response = await fetch(
    "https://valorant-api.com/v1/competitivetiers?language=tr-TR"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch competitive tiers");
  }
  const data = await response.json();
  // Get the latest competitive tier set (last item in the array)
  const latestTierSet = data.data[data.data.length - 1];
  // Filter out unused tiers (0, 1, and 2)
  latestTierSet.tiers = latestTierSet.tiers.filter(
    (tier: CompetitiveTier) =>
      tier.tier > 2 && !tier.tierName.toLowerCase().includes("unused")
  );
  return [latestTierSet];
}

export async function getCompetitiveTierByUuid(
  uuid: string
): Promise<CompetitiveTierSet> {
  const response = await fetch(
    `https://valorant-api.com/v1/competitivetiers/${uuid}?language=tr-TR`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch competitive tier");
  }
  const data = await response.json();
  return data.data;
}
