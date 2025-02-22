import Weapons from "@/components/weapon/weapons";

async function WeaponsPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">SİLAHLAR</h1>
          <Weapons />
        </div>
      </div>
    </div>
  );
}

export default WeaponsPage;
