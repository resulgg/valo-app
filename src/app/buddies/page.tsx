import Buddies from "@/components/buddy/buddies";

async function BuddiesPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">SİLAH SÜSLERİ</h1>
          <Buddies />
        </div>
      </div>
    </div>
  );
}

export default BuddiesPage;
