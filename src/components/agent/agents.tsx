"use client";
import { getAgents } from "@/data/agents";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";

const Agents = () => {
  const {
    data: agents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch agents. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading
        ? Array(12)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <AspectRatio ratio={3 / 3.2}>
                  <Skeleton className="h-full w-full" />
                </AspectRatio>
              </Card>
            ))
        : agents?.map((agent, index) => (
            <motion.div key={agent.uuid}>
              <Link href={`/agents/${agent.uuid}`}>
                <Card className="group relative overflow-hidden cursor-pointer">
                  <AspectRatio ratio={3 / 3.2}>
                    <Image
                      src={agent.fullPortrait || agent.displayIcon}
                      alt={agent.displayName}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:saturate-[1.1]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    {/* Image Overlay Gradient */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="relative space-y-3">
                        <h3 className="text-3xl font-bold drop-shadow-lg tracking-wide">
                          {agent.displayName}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md bg-black/10">
                          <Image
                            src={agent.role.displayIcon}
                            alt={agent.role.displayName}
                            width={20}
                            height={20}
                          />
                          <span className="text-sm font-medium tracking-wider uppercase">
                            {agent.role.displayName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AspectRatio>
                </Card>
              </Link>
            </motion.div>
          ))}
    </div>
  );
};

export default Agents;
