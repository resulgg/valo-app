import { getAgentByUuid } from "@/data/agents";
import { notFound } from "next/navigation";
import AgentDetails from "@/components/agent/agent-details";

export default async function AgentDetailsPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  try {
    const agent = await getAgentByUuid(uuid);
    return <AgentDetails agent={agent} />;
  } catch (err) {
    console.log(err);
    notFound();
  }
}
