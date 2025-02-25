"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Weapon } from "@/types/weapon";
import { useState } from "react";

interface WeaponDetailsProps {
  weapon: Weapon;
}

export default function WeaponDetails({ weapon }: WeaponDetailsProps) {
  const [selectedSkin, setSelectedSkin] = useState(weapon?.skins?.[0] || null);

  if (!weapon) {
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
              {/* Weapon Name and Category */}
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
                    {weapon.displayName}
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
                        {weapon.category.replace("EEquippableCategory::", "")}
                      </span>
                    </motion.div>
                    {weapon.shopData && (
                      <motion.div
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <span className="font-medium text-sm text-foreground">
                          {weapon.shopData.cost} Kredi
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Weapon Stats */}
              {weapon.weaponStats && (
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
                    Silah İstatistikleri
                  </motion.h2>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.6,
                    }}
                  >
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Atış Hızı
                      </p>
                      <p className="text-lg font-semibold">
                        {weapon.weaponStats.fireRate} rounds/sec
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Şarjör Kapasitesi
                      </p>
                      <p className="text-lg font-semibold">
                        {weapon.weaponStats.magazineSize} rounds
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Yeniden Doldurma Süresi
                      </p>
                      <p className="text-lg font-semibold">
                        {weapon.weaponStats.reloadTimeSeconds} seconds
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Kuşanma Süresi
                      </p>
                      <p className="text-lg font-semibold">
                        {weapon.weaponStats.equipTimeSeconds} seconds
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Koşu Hızı
                      </p>
                      <p className="text-lg font-semibold">
                        {weapon.weaponStats.runSpeedMultiplier}x
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Duvar Penetrasyonu
                      </p>
                      <p className="text-lg font-semibold">
                        {weapon.weaponStats.wallPenetration.replace(
                          "EWallPenetrationDisplayType::",
                          ""
                        )}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Right Column - Weapon Image */}
            <div className="relative lg:h-[400px]">
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
                  <Image
                    src={selectedSkin?.displayIcon || weapon.displayIcon}
                    alt={selectedSkin?.displayName || weapon.displayName}
                    width={1200}
                    height={400}
                    className="relative object-contain w-full h-full select-none"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Weapon Skins */}
          <motion.div
            className="mt-16 space-y-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.7,
            }}
          >
            <motion.h2
              className="text-3xl font-bold uppercase tracking-wider flex items-center gap-2 text-foreground"
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
              Available Skins
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weapon.skins
                .filter((skin) => skin.displayIcon)
                .map((skin) => (
                  <motion.div
                    key={skin.uuid}
                    className={`group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedSkin?.uuid === skin.uuid
                        ? "border-primary bg-primary/10"
                        : "border-muted bg-card hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSkin(skin)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-[3/1] relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={skin.displayIcon}
                        alt={skin.displayName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">
                      {skin.displayName}
                    </h3>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
