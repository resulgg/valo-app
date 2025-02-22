import CompetitiveTiers from "@/components/competitive/competitive-tiers";

async function CompetitivePage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">
            REKABET RANKLARI
          </h1>
          <CompetitiveTiers />
        </div>
      </div>
    </div>
  );
}

export default CompetitivePage;
