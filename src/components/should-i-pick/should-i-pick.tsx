"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAgentByUuid } from "@/data/agents";

export default function ShouldIPick() {
  const [isDeciding, setIsDeciding] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [decision, setDecision] = useState<string | null>(null);

  const { data: sage } = useQuery({
    queryKey: ["sage"],
    queryFn: () => getAgentByUuid("569fdd95-4d10-43ab-ca70-79becc718b46"),
  });

  const startDecision = () => {
    setIsDeciding(true);
    setDecision(null);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsDeciding(false);
          setDecision(Math.random() > 0.5 ? "Seçiceksin!" : "Seçme!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!sage) return null;

  return (
    <motion.div
      className="relative min-h-[80vh] bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40" />

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [0.3, 1, 0.3],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          background: `radial-gradient(circle at center, #${sage.backgroundGradientColors[0]}, #${sage.backgroundGradientColors[1]})`,
          filter: "blur(150px)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              Sage'i seçicek misin?
            </motion.h1>

            <motion.div
              className="relative w-full max-w-xl aspect-[3/4]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={sage.fullPortrait}
                alt={sage.displayName}
                fill
                className="object-contain"
                priority
              />
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
                    <motion.div
                      className="text-8xl font-bold"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {countdown}
                    </motion.div>
                    <div className="text-xl text-muted-foreground">
                      Karar veriliyor...
                    </div>
                  </motion.div>
                )}

                {decision && (
                  <motion.div
                    key="decision"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6"
                  >
                    <motion.div
                      className="text-5xl md:text-7xl font-bold"
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
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setDecision(null);
                      }}
                    >
                      Tekrar Dene
                    </Button>
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
