import RandomAgentSelector from "@/components/random-agent/random-agent-selector";

export default function RandomAgentPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">
            RASTGELE AJAN SEÇİCİ
          </h1>
          <RandomAgentSelector />
        </div>
      </div>
    </div>
  );
}
