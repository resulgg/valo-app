"use client";
import { getMaps } from "@/data/maps";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const Maps = () => {
  const {
    data: maps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["maps"],
    queryFn: getMaps,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch maps. Please try again later.
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
        : maps?.map((map) => (
            <motion.div key={map.uuid}>
              <Card className="group relative overflow-hidden ">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={map.splash || map.displayIcon}
                    alt={map.displayName}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold drop-shadow-lg tracking-wide">
                        {map.displayName}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {map.coordinates}
                      </p>
                    </div>
                  </div>
                </AspectRatio>
              </Card>
            </motion.div>
          ))}
    </div>
  );
};

export default Maps;
