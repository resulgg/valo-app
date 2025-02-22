import Sprays from "@/components/spray/sprays";

async function SpraysPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">SPREYLER</h1>
          <Sprays />
        </div>
      </div>
    </div>
  );
}

export default SpraysPage;
