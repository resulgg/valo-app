"use client";
import { getPlayerCards } from "@/data/player-cards";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PlayerCards = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["playerCards"],
    queryFn: ({ pageParam = 0 }) => getPlayerCards(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch player cards. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const allCards = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array(10)
              .fill(null)
              .map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <AspectRatio ratio={9 / 16}>
                    <Skeleton className="h-full w-full" />
                  </AspectRatio>
                </Card>
              ))
          : allCards.map((card) => (
              <motion.div key={card.uuid}>
                <Card className="group relative overflow-hidden bg-black/5 hover:bg-black/10 transition-colors">
                  <AspectRatio ratio={9 / 16}>
                    <Image
                      src={card.largeArt}
                      alt={card.displayName}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform bg-muted">
                      <h3 className="text-base font-medium leading-tight text-center drop-shadow-lg">
                        {card.displayName}
                      </h3>
                    </div>
                  </AspectRatio>
                </Card>
              </motion.div>
            ))}
      </div>

      {(hasNextPage || isFetchingNextPage) && (
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <AspectRatio ratio={2 / 3}>
                  <Skeleton className="h-full w-full" />
                </AspectRatio>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default PlayerCards;
