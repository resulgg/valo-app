"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Agent } from "@/types/agent";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AgentDetailsProps {
  agent: Agent;
}

export default function AgentDetails({ agent }: AgentDetailsProps) {
  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-muted/20 border-t-muted/80 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="relative bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40" />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Info */}
            <motion.div
              className="relative space-y-8 p-6 rounded-2xl bg-card border-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
            >
              {/* Agent Name and Role */}
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <motion.h1
                    className="text-7xl font-bold tracking-tighter text-foreground"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.3,
                    }}
                  >
                    {agent.displayName}
                  </motion.h1>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.4,
                    }}
                  >
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Image
                        src={agent.role.displayIcon}
                        alt={agent.role.displayName}
                        width={24}
                        height={24}
                      />
                      <span className="font-medium uppercase tracking-widest text-sm text-foreground">
                        {agent.role.displayName}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
                <motion.p
                  className="text-lg leading-relaxed max-w-2xl text-muted-foreground"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  {agent.description}
                </motion.p>
              </div>

              {/* Abilities */}
              <div className="space-y-6 pt-6">
                <motion.h2
                  className="text-2xl font-bold uppercase tracking-wider flex items-center gap-2 text-foreground"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  <span className="w-2 h-8 rounded-full block bg-primary" />
                  Combat Arsenal
                </motion.h2>
                <div className="grid gap-4">
                  {agent.abilities.map((ability: any, index: number) => (
                    <motion.div
                      key={ability.slot}
                      className="group relative p-4 rounded-xl bg-muted/50"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.5,
                      }}
                    >
                      <div className="flex gap-4">
                        <Image
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover p-2 bg-foreground dark:bg-foreground/10 rounded-lg"
                        />
                        <div>
                          <h3 className="text-xl font-bold mb-2 tracking-wide text-foreground">
                            {ability.displayName}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {ability.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Portrait */}
            <div className="relative lg:h-[800px]">
              <div className="sticky top-8">
                <motion.div
                  className="relative"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [0, 0.8, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    style={{
                      background: `radial-gradient(circle at center, #${agent.backgroundGradientColors[0]}, #${agent.backgroundGradientColors[0]}, #${agent.backgroundGradientColors[0]}, #${agent.backgroundGradientColors[1]})`,
                      filter: "blur(200px)",
                    }}
                  />
                  <Image
                    src={agent.fullPortrait}
                    alt={agent.displayName}
                    width={800}
                    height={1000}
                    className="relative object-contain w-full h-full select-none"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
