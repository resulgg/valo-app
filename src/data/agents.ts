interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  role: {
    displayName: string;
    displayIcon: string;
    description: string;
  };
  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
  }[];
}

export async function getAgents(): Promise<Agent[]> {
  const response = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch agents");
  }
  const data = await response.json();
  return data.data;
}

export async function getAgentByUuid(uuid: string): Promise<Agent> {
  const response = await fetch(`https://valorant-api.com/v1/agents/${uuid}`);
  if (!response.ok) {
    throw new Error("Failed to fetch agent");
  }
  const data = await response.json();
  return data.data;
}
