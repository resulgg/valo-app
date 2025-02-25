"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Map } from "@/types/map";

interface MapDetailsProps {
  map: Map;
}

export default function MapDetails({ map }: MapDetailsProps) {
  if (!map) {
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
              {/* Map Name and Info */}
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
                    {map.displayName}
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
                      <span className="font-medium uppercase tracking-widest text-sm text-foreground">
                        {map.coordinates}
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
                  {map.description}
                </motion.p>
              </div>

              {/* Map Icon */}
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
                  KUŞ BAKIŞI GÖRÜNÜM
                </motion.h2>
                <motion.div
                  className="relative rounded-xl overflow-hidden border-2 border-muted"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.6,
                  }}
                >
                  <Image
                    src={map.displayIcon}
                    alt={`${map.displayName} layout`}
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Splash Image */}
            <div className="relative lg:h-[800px]">
              <div className="sticky top-8">
                <motion.div
                  className="relative rounded-xl overflow-hidden"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  <Image
                    src={map.splash}
                    alt={map.displayName}
                    width={1200}
                    height={800}
                    className="relative object-cover w-full h-full select-none rounded-xl"
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
