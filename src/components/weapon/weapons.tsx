"use client";
import { getWeapons } from "@/data/weapons";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const Weapons = () => {
  const {
    data: weapons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weapons"],
    queryFn: getWeapons,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch weapons. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading
        ? Array(8)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <Skeleton className="h-full w-full" />
                </AspectRatio>
              </Card>
            ))
        : weapons?.map((weapon) => (
            <motion.div key={weapon.uuid}>
              <Card className="group relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={weapon.displayIcon}
                    alt={weapon.displayName}
                    fill
                    className="object-contain p-8 transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold drop-shadow-lg tracking-wide">
                          {weapon.displayName}
                        </h3>
                        {weapon.shopData && (
                          <Badge variant="secondary" className="text-lg px-3">
                            {weapon.shopData.cost}
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="uppercase">
                        {weapon.category.replace("EEquippableCategory::", "")}
                      </Badge>
                    </div>
                  </div>
                </AspectRatio>
              </Card>
            </motion.div>
          ))}
    </div>
  );
};

export default Weapons;
