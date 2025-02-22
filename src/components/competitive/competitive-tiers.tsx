"use client";
import { getCompetitiveTiers } from "@/data/competitive-tiers";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const CompetitiveTiers = () => {
  const {
    data: competitiveTierSets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["competitiveTiers"],
    queryFn: getCompetitiveTiers,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch competitive tiers. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const tiers = competitiveTierSets?.[0]?.tiers;

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array(20)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <AspectRatio ratio={1}>
                  <Skeleton className="h-full w-full" />
                </AspectRatio>
              </Card>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tiers?.map((tier) => (
            <motion.div key={tier.tier}>
              <Card
                className="group relative overflow-hidden"
                style={{
                  backgroundColor: tier.backgroundColor,
                  borderColor: tier.color,
                  borderWidth: "2px",
                }}
              >
                <AspectRatio ratio={1}>
                  <div className="relative h-full w-full p-2">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Image
                        src={tier.largeIcon}
                        alt={tier.tierName}
                        fill
                        className="object-contain transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        priority
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-muted p-2">
                      <div className="space-y-1 text-center">
                        <h3
                          className="text-lg font-bold tracking-tight"
                          style={{ color: tier.color }}
                        >
                          {tier.tierName}
                        </h3>
                        <p className="text-xs">{tier.divisionName}</p>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitiveTiers;
