import Agents from "@/components/agent/agents";

async function AgentsPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">AJANLAR</h1>
          <Agents />
        </div>
      </div>
    </div>
  );
}

export default AgentsPage;
