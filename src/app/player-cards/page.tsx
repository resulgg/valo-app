import PlayerCards from "@/components/player-card/player-cards";

async function PlayerCardsPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">OYUNCU KARTLARI</h1>
          <PlayerCards />
        </div>
      </div>
    </div>
  );
}

export default PlayerCardsPage;
