"use client";
import { getSprays } from "@/data/sprays";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const Sprays = () => {
  const {
    data: sprays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sprays"],
    queryFn: getSprays,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch sprays. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {isLoading
        ? Array(12)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <AspectRatio ratio={1}>
                  <Skeleton className="h-full w-full" />
                </AspectRatio>
              </Card>
            ))
        : sprays?.map((spray) => (
            <motion.div key={spray.uuid}>
              <Card className="group relative overflow-hidden">
                <AspectRatio ratio={1}>
                  <Image
                    src={
                      spray.animationGif ||
                      spray.fullTransparentIcon ||
                      spray.displayIcon
                    }
                    alt={spray.displayName}
                    fill
                    className="object-contain p-4 transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    priority
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300  bg-muted ">
                    <h3 className="text-sm font-medium leading-tight line-clamp-2 text-center">
                      {spray.displayName}
                    </h3>
                  </div>
                </AspectRatio>
              </Card>
            </motion.div>
          ))}
    </div>
  );
};

export default Sprays;
