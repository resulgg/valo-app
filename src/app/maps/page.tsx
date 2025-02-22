import Maps from "@/components/map/maps";

async function MapsPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">HARİTALAR</h1>
          <Maps />
        </div>
      </div>
    </div>
  );
}

export default MapsPage;
