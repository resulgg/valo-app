import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Map,
  Sword,
  Sticker,
  Trophy,
  Heart,
  ImageIcon,
  Shuffle,
  HelpCircle,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-card p-6 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-muted text-foreground">{icon}</div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground">
        →
      </div>
    </Link>
  );
}

async function getCatImage() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await res.json();
  return data[0].url;
}

export default async function Home() {
  const catImageUrl = await getCatImage();
  const features = [
    {
      title: "Ajanlar",
      description:
        "Tüm Valorant ajanlarını, yeteneklerini ve stratejilerini keşfedin.",
      icon: <ShieldCheck className="w-6 h-6" />,
      href: "/agents",
    },
    {
      title: "Haritalar",
      description:
        "Tüm Valorant haritalarını, bölge isimlerini ve düzenlerini öğrenin.",
      icon: <Map className="w-6 h-6" />,
      href: "/maps",
    },
    {
      title: "Silahlar",
      description: "Tüm silahları, özelliklerini ve kaplamaları inceleyin.",
      icon: <Sword className="w-6 h-6" />,
      href: "/weapons",
    },
    {
      title: "Spreyler",
      description: "Valorant'taki tüm spreyleri görüntüleyin.",
      icon: <Sticker className="w-6 h-6" />,
      href: "/sprays",
    },
    {
      title: "Rekabetçi",
      description:
        "Rekabetçi istatistiklerinizi ve sıralamalarınızı takip edin.",
      icon: <Trophy className="w-6 h-6" />,
      href: "/competitive",
    },
    {
      title: "Silah Aksesuarları",
      description: "Tüm silah aksesuarlarını ve koleksiyonlarını görüntüleyin.",
      icon: <Heart className="w-6 h-6" />,
      href: "/buddies",
    },
    {
      title: "Oyuncu Kartları",
      description: "Tüm oyuncu kartlarını ve afişlerini inceleyin.",
      icon: <ImageIcon className="w-6 h-6" />,
      href: "/player-cards",
    },
    {
      title: "Rastgele Ajan",
      description:
        "Bir sonraki maçta hangi ajanı seçeceğinize şans karar versin.",
      icon: <Shuffle className="w-6 h-6" />,
      href: "/random-agent",
    },
    {
      title: "Sage seçmeli miyim?",
      description: "Sage alıp almayacağınıza karar vermek için yardım alın.",
      icon: <HelpCircle className="w-6 h-6" />,
      href: "/should-i-pick",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
      <div className="w-full max-w-md mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Günün Kedisi</h2>
        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-border">
          <Image
            src={catImageUrl}
            alt="Günün Kedisi"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
