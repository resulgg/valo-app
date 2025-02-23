"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/data/agents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Agent } from "@/types/agent";

export default function ShouldIPick() {
  const [isDeciding, setIsDeciding] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [decision, setDecision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string>(
    "569fdd95-4d10-43ab-ca70-79becc718b46"
  );
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const currentAgent = agents?.find((agent) => agent.uuid === selectedAgent);

  const startDecision = () => {
    setIsDeciding(true);
    setDecision(null);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsDeciding(false);
          const newDecision = Math.random() > 0.5 ? "Seçiceksin!" : "Seçme!";
          setDecision(newDecision);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!agents || !currentAgent) return null;

  return (
    <motion.div
      className="relative min-h-[80vh] bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40" />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Agent Selector */}
            <div className="w-full max-w-xs">
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Ajan seç" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.uuid} value={agent.uuid}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={agent.role.displayIcon}
                          alt={agent.role.displayName}
                          width={16}
                          height={16}
                        />
                        {agent.displayName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {currentAgent.displayName} seçicek misin?
            </motion.h1>

            <motion.div
              className="relative w-full max-w-xl aspect-[3/4]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.1, 0.2, 0.9],
              }}
            >
              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full z-10"
                animate={
                  isDeciding
                    ? {
                        scale: [1, 1.02, 1],
                      }
                    : decision === "Seçiceksin!"
                    ? {
                        filter: [
                          "brightness(1)",
                          "brightness(1.15)",
                          "brightness(1.1)",
                        ],
                      }
                    : decision === "Seçme!"
                    ? {
                        filter: [
                          "brightness(1)",
                          "brightness(0.9)",
                          "brightness(0.95)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: isDeciding ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={currentAgent.fullPortrait}
                  alt={currentAgent.displayName}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Background Effects */}
              {isDeciding && (
                <>
                  {/* Pulsing Circles */}
                  <motion.div className="absolute inset-0 z-0" initial={false}>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full bg-primary/10"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Energy Lines */}
                  <motion.div className="absolute inset-0 z-20" initial={false}>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 overflow-hidden"
                      >
                        <motion.div
                          className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                          style={{
                            top: `${25 * (i + 1)}%`,
                            opacity: 0.3,
                            rotate: i % 2 === 0 ? "5deg" : "-5deg",
                          }}
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Side Energy Panels */}
                  <div className="absolute inset-y-0 -left-4 w-1">
                    <motion.div
                      className="h-full w-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        height: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <div className="absolute inset-y-0 -right-4 w-1">
                    <motion.div
                      className="h-full w-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        height: ["100%", "0%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Overlay Glow */}
                  <motion.div
                    className="absolute inset-0 z-30"
                    animate={{
                      background: [
                        "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                        "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.2) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </motion.div>

            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {!isDeciding && !decision && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Button
                      size="lg"
                      className="text-xl px-8 py-6"
                      onClick={startDecision}
                    >
                      Başlat
                    </Button>
                  </motion.div>
                )}

                {isDeciding && (
                  <motion.div
                    key="countdown"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="relative">
                      {/* Polygon Shape Container */}
                      <div className="relative">
                        {/* Background Shape */}
                        <motion.div
                          className="absolute -inset-8 bg-primary/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0.7] }}
                          transition={{ duration: 1 }}
                        />
                        {/* Border */}
                        <motion.div
                          className="absolute -inset-8 border-2 border-primary/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                        {/* Main Content */}
                        <div className="relative flex items-center gap-4 px-8 py-4">
                          <motion.div
                            className="text-8xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/50"
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {countdown}
                          </motion.div>
                        </div>
                      </div>

                      {/* Energy Lines */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-1/2 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                          style={{
                            width: "200%",
                            transform: `rotate(${90 * i}deg)`,
                            transformOrigin: "center",
                            marginLeft: "-100%",
                            marginTop: "-1px",
                          }}
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <motion.div
                      className="text-xl font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      Karar veriliyor
                      <motion.span
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        ...
                      </motion.span>
                    </motion.div>
                  </motion.div>
                )}

                {decision && (
                  <motion.div
                    key="decision"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-12"
                  >
                    <div className="relative inline-block">
                      {/* Background Shape */}
                      <motion.div
                        className={`absolute -inset-4 ${
                          decision === "Seçiceksin!"
                            ? "bg-green-500/10"
                            : "bg-red-500/10"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.7] }}
                        transition={{ duration: 1 }}
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        }}
                      />
                      {/* Border */}
                      <motion.div
                        className={`absolute -inset-4 border-2 ${
                          decision === "Seçiceksin!"
                            ? "border-green-500/30"
                            : "border-red-500/30"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        }}
                      />
                      {/* Main Content */}
                      <div className="relative flex items-center gap-4 px-8 py-4">
                        <motion.div
                          className={`text-5xl md:text-7xl font-bold ${
                            decision === "Seçiceksin!"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          {decision}
                        </motion.div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setDecision(null);
                        }}
                      >
                        Tekrar Dene
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
