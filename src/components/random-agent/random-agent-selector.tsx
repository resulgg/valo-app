"use client";

import { getAgents } from "@/data/agents";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Agent } from "@/types/agent";
import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type AgentRole = {
  displayName: string;
  displayIcon: string;
};

const RandomAgentSelector = () => {
  const [selectedSlots, setSelectedSlots] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);

  const {
    data: agents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const roles = agents
    ? Array.from(
        new Set(agents.map((agent) => JSON.stringify(agent.role)))
      ).map((role) => JSON.parse(role) as AgentRole)
    : [];

  const getRandomAgents = (count: number, roleFilter?: string) => {
    if (!agents) return;

    let filteredAgents = [...agents];
    if (roleFilter && roleFilter !== "all") {
      filteredAgents = filteredAgents.filter(
        (agent) => agent.role.displayName === roleFilter
      );
    }

    const shuffled = [...filteredAgents].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const generateRandomTeam = () => {
    if (!agents) return;

    const team: Agent[] = [];
    const requiredRoles = ["Controller", "Duelist", "Initiator", "Sentinel"];

    requiredRoles.forEach((role) => {
      const roleAgents = agents.filter(
        (agent) => agent.role.displayName === role
      );
      const randomAgent =
        roleAgents[Math.floor(Math.random() * roleAgents.length)];
      if (randomAgent) team.push(randomAgent);
    });

    // Add a fifth random agent that is not already in the team
    const remainingAgents = agents.filter(
      (agent) => !team.some((teamAgent) => teamAgent.uuid === agent.uuid)
    );
    const randomFifthAgent =
      remainingAgents[Math.floor(Math.random() * remainingAgents.length)];
    if (randomFifthAgent) team.push(randomFifthAgent);

    setSelectedAgents(team);
  };

  const handleRandomize = () => {
    const random = getRandomAgents(selectedSlots, selectedRole);
    if (random) setSelectedAgents(random);
  };

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Card key={index} className="animate-pulse">
              <AspectRatio ratio={3 / 4}>
                <div className="h-full w-full bg-muted" />
              </AspectRatio>
            </Card>
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="custom" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="custom">Özel Seçim</TabsTrigger>
          <TabsTrigger value="team">Takım Oluştur</TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-8">
          <TabsContent value="custom">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Özel Ajan Seçimi</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Ajan Sayısı
                    </span>
                    <Select
                      value={selectedSlots.toString()}
                      onValueChange={(value) => setSelectedSlots(Number(value))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Slot Sayısı" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Ajan
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Ajan Rolü
                    </span>
                    <Select
                      value={selectedRole}
                      onValueChange={(value) => setSelectedRole(value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Rol Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Roller</SelectItem>
                        {roles.map((role) => (
                          <SelectItem
                            key={role.displayName}
                            value={role.displayName}
                          >
                            <div className="flex items-center gap-2">
                              <Image
                                src={role.displayIcon}
                                alt={role.displayName}
                                width={20}
                                height={20}
                              />
                              {role.displayName}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={handleRandomize} size="lg">
                      Rastgele Seç
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Dengeli Takım Oluştur
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Her rolden bir ajan ve ekstra bir ajan ile 5 kişilik dengeli
                  bir takım oluşturur.
                </p>
                <Button onClick={generateRandomTeam} size="lg">
                  Takım Oluştur
                </Button>
              </div>
            </Card>
          </TabsContent>

          <AnimatePresence mode="wait">
            {selectedAgents.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
              >
                <h3 className="text-lg font-semibold mb-4">Seçilen Ajanlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {selectedAgents.map((agent, index) => (
                    <motion.div
                      key={`${agent.uuid}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group relative overflow-hidden">
                        <AspectRatio ratio={3 / 4}>
                          <Image
                            src={agent.fullPortrait || agent.displayIcon}
                            alt={agent.displayName}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="relative space-y-3">
                              <h3 className="text-2xl font-bold drop-shadow-lg">
                                {agent.displayName}
                              </h3>
                              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md">
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8"
              >
                <Card className="p-6">
                  <div className="flex flex-col items-center justify-center text-center space-y-3 py-8">
                    <div className="rounded-full bg-muted p-3">
                      <AlertCircle className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold tracking-tight">
                        Henüz Ajan Seçilmedi
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-[400px]">
                        Özel seçim için ajan sayısı ve rolünü seçip "Rastgele
                        Seç" butonuna basın veya "Takım Oluştur" sekmesinden
                        dengeli bir takım oluşturun.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
};

export default RandomAgentSelector;
