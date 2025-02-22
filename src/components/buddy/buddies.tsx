"use client";
import { getBuddies } from "@/data/buddies";
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

const Buddies = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["buddies"],
    queryFn: ({ pageParam = 0 }) => getBuddies(pageParam),
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
          Failed to fetch buddies. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const allBuddies = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="space-y-8">
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
          : allBuddies.map((buddy) => (
              <motion.div key={buddy.uuid}>
                <Card className="group relative overflow-hidden bg-black/5 hover:bg-black/10 transition-colors">
                  <AspectRatio ratio={1}>
                    <div className="relative h-full w-full p-2">
                      <Image
                        src={buddy.displayIcon}
                        alt={buddy.displayName}
                        fill
                        className="object-contain p-4 transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        priority={false}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <h3 className="text-sm font-medium leading-tight text-center line-clamp-2">
                          {buddy.displayName}
                        </h3>
                      </div>
                    </div>
                  </AspectRatio>
                </Card>
              </motion.div>
            ))}
      </div>

      {(hasNextPage || isFetchingNextPage) && (
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <AspectRatio ratio={1}>
                  <Skeleton className="h-full w-full" />
                </AspectRatio>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Buddies;
