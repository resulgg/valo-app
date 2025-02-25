"use client";

import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { getAgents } from "@/data/agents";
import { getWeapons } from "@/data/weapons";
import { getMaps } from "@/data/maps";
import { getCompetitiveTiers } from "@/data/competitive-tiers";
import { getBuddies } from "@/data/buddies";
import { getSprays } from "@/data/sprays";
import { getPlayerCards } from "@/data/player-cards";
import confetti from "canvas-confetti";
import { AlertCircle, Smartphone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define the types of items that can be opened
type CaseType =
  | "agent"
  | "weapon"
  | "skin"
  | "map"
  | "competitive-tier"
  | "buddy"
  | "spray"
  | "player-card";

// Define the structure for items
interface CaseItem {
  id: string;
  name: string;
  image: string;
  description?: string;
  type: CaseType;
}

// Turkish translations for case types
const caseTypeTranslations: Record<CaseType, string> = {
  agent: "Ajan",
  weapon: "Silah",
  skin: "Silah Kaplaması",
  map: "Harita",
  "competitive-tier": "Rekabetçi Rütbe",
  buddy: "Silah Aksesuarı",
  spray: "Sprey",
  "player-card": "Oyuncu Kartı",
};

// Geçerli resim URL'lerini kontrol eden fonksiyon
const isValidImageUrl = (url: string): boolean => {
  if (!url || url.trim() === "") return false;

  // Bilinen geçerli domain'leri kontrol et
  const validDomains = ["media.valorant-api.com"];
  try {
    const urlObj = new URL(url);
    return validDomains.some((domain) => urlObj.hostname.includes(domain));
  } catch (e) {
    return false;
  }
};

export default function CaseOpening() {
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType>("agent");
  const [isSpinning, setIsSpinning] = useState(false);
  const [items, setItems] = useState<CaseItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CaseItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Record<CaseType, CaseItem[]>>({
    agent: [],
    weapon: [],
    skin: [],
    map: [],
    "competitive-tier": [],
    buddy: [],
    spray: [],
    "player-card": [],
  });
  const spinnerRef = useRef<HTMLDivElement>(null);
  const centerMarkerRef = useRef<HTMLDivElement>(null);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [animationTimeout, setAnimationTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimatingItems, setIsAnimatingItems] = useState(false);

  // Sabit animasyon süresi (milisaniye)
  const ANIMATION_DURATION = 4000;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch agents
        const agentsData = await getAgents();
        const agentItems: CaseItem[] = agentsData.map((agent) => ({
          id: agent.uuid,
          name: agent.displayName,
          image: agent.displayIcon,
          description: agent.description,
          type: "agent",
        }));

        // Fetch weapons
        const weaponsData = await getWeapons();
        const weaponItems: CaseItem[] = weaponsData.map((weapon) => ({
          id: weapon.uuid,
          name: weapon.displayName,
          image: weapon.displayIcon,
          description: `${weapon.category.replace(
            "EEquippableCategory::",
            ""
          )} türü silah`,
          type: "weapon",
        }));

        // Extract weapon skins
        const skinItems: CaseItem[] = [];
        weaponsData.forEach((weapon) => {
          weapon.skins.forEach((skin) => {
            if (skin.displayIcon && isValidImageUrl(skin.displayIcon)) {
              skinItems.push({
                id: skin.uuid,
                name: skin.displayName,
                image: skin.displayIcon,
                description: `${weapon.displayName} için kaplama`,
                type: "skin",
              });
            }
          });
        });

        // Fetch maps
        const mapsData = await getMaps();
        const mapItems: CaseItem[] = mapsData.map((map) => ({
          id: map.uuid,
          name: map.displayName,
          image: map.splash,
          description: map.description || `${map.displayName} haritası`,
          type: "map",
        }));

        // Fetch competitive tiers
        const competitiveTiersData = await getCompetitiveTiers();
        const competitiveTierItems: CaseItem[] = [];

        if (competitiveTiersData.length > 0) {
          competitiveTiersData[0].tiers.forEach((tier) => {
            if (tier.largeIcon) {
              competitiveTierItems.push({
                id: `${tier.tier}`,
                name: tier.tierName,
                image: tier.largeIcon,
                description: `${tier.divisionName} bölümü`,
                type: "competitive-tier",
              });
            }
          });
        }

        // Fetch buddies (silah aksesuarları)
        const buddiesData = await getBuddies(0);
        const buddyItems: CaseItem[] = buddiesData.items.map((buddy) => ({
          id: buddy.uuid,
          name: buddy.displayName,
          image: buddy.displayIcon,
          description: "Silah aksesuarı",
          type: "buddy",
        }));

        // Fetch sprays
        const spraysData = await getSprays();
        const sprayItems: CaseItem[] = spraysData.map((spray) => ({
          id: spray.uuid,
          name: spray.displayName,
          image:
            spray.displayIcon ||
            spray.fullTransparentIcon ||
            spray.animationPng ||
            "",
          description: spray.category
            ? `${spray.category} kategorisinde sprey`
            : "Sprey",
          type: "spray",
        }));

        // Fetch player cards
        const playerCardsData = await getPlayerCards(0);
        const playerCardItems: CaseItem[] = playerCardsData.items.map(
          (card) => ({
            id: card.uuid,
            name: card.displayName,
            image: card.largeArt || card.wideArt || card.displayIcon,
            description: "Oyuncu kartı",
            type: "player-card",
          })
        );

        // Set all data
        setApiData({
          agent: agentItems,
          weapon: weaponItems,
          skin: skinItems,
          map: mapItems,
          "competitive-tier": competitiveTierItems,
          buddy: buddyItems,
          spray: sprayItems.filter((item) => isValidImageUrl(item.image)),
          "player-card": playerCardItems.filter((item) =>
            isValidImageUrl(item.image)
          ),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter out items with invalid images
  const filterValidItems = (items: CaseItem[]) => {
    return items.filter((item) => {
      // Resim URL'sinin geçerli olup olmadığını kontrol et
      return isValidImageUrl(item.image);
    });
  };

  // Generate a random set of items for the spinner
  useEffect(() => {
    if (isLoading) return;

    // Get the items for the selected case type and filter out invalid images
    const caseItems = filterValidItems(apiData[selectedCaseType]);

    if (caseItems.length === 0) {
      console.error(`No valid items found for case type: ${selectedCaseType}`);
      return;
    }

    // Create a larger array with repeated items to make the spinning effect more visible
    const spinnerItems: CaseItem[] = [];

    // Calculate how many items can fit in the viewport
    const itemWidth = 280; // Width of each item + margin
    const viewportWidth = window.innerWidth;
    const visibleItems = Math.ceil(viewportWidth / itemWidth);

    // Add enough items to fill 5 screens worth, but not too many to cause performance issues
    const totalScreens = 5;
    const totalItems = Math.min(visibleItems * totalScreens, 50); // Cap at 50 items max

    for (let i = 0; i < totalItems; i++) {
      const randomIndex = Math.floor(Math.random() * caseItems.length);
      spinnerItems.push(caseItems[randomIndex]);
    }

    setItems(spinnerItems);
  }, [selectedCaseType, isLoading, apiData]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      if (animationTimeout !== null) {
        clearTimeout(animationTimeout);
      }
    };
  }, [animationId, animationTimeout]);

  // Find the item at the center marker
  const findCenterItem = (): CaseItem | null => {
    if (!spinnerRef.current || !centerMarkerRef.current) return null;

    const centerMarkerRect = centerMarkerRef.current.getBoundingClientRect();
    const centerX = centerMarkerRect.left + centerMarkerRect.width / 2;

    const itemElements =
      spinnerRef.current.querySelectorAll<HTMLElement>(".case-item");
    let closestItem: HTMLElement | null = null;
    let closestDistance = Infinity;
    let closestIndex = -1;

    itemElements.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(itemCenterX - centerX);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
        closestIndex = parseInt(item.dataset.index || "-1", 10);
      }
    });

    return closestIndex >= 0 && closestIndex < items.length
      ? items[closestIndex]
      : null;
  };

  // Handle the case opening
  const openCase = () => {
    if (isSpinning || !spinnerRef.current || isLoading) return;

    setIsSpinning(true);
    setShowDialog(false);

    // Cancel any existing animation
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }

    // Clear any existing timeout
    if (animationTimeout !== null) {
      clearTimeout(animationTimeout);
    }

    // Reset scroll position
    spinnerRef.current.scrollLeft = 0;

    // Choose a random winning item from the middle section of the array
    // This ensures we don't scroll too far to the beginning or end
    const middleSection = Math.floor(items.length / 2);
    const randomOffset = Math.floor(Math.random() * (middleSection / 3));
    const winningItemIndex = middleSection + randomOffset;

    // Animation variables
    const itemWidth = 280; // Width of each item + margin

    // Calculate target position to center the winning item
    const viewportWidth = window.innerWidth;
    const containerWidth = Math.min(viewportWidth, 1280); // max-w-screen-xl is 1280px
    const targetPosition = Math.min(
      winningItemIndex * itemWidth - containerWidth / 2 + itemWidth / 2,
      (items.length - Math.ceil(containerWidth / itemWidth)) * itemWidth
    );

    const startTime = performance.now();
    const initialSpeed = 120; // Başlangıç hızı

    // Easing function for smooth deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    // Animation function
    const animate = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / ANIMATION_DURATION, 1);

      // Easing progress for smooth deceleration
      const easedProgress = easeOutQuart(progress);

      // Calculate current position
      const position = easedProgress * targetPosition;

      // Apply scroll
      if (spinnerRef.current) {
        spinnerRef.current.scrollLeft = position;
      }

      // Check if animation is complete
      if (progress >= 1) {
        // We've reached the target position
        if (spinnerRef.current) {
          spinnerRef.current.scrollLeft = targetPosition;
        }

        // Small delay to ensure the scroll has completed
        const timeout = setTimeout(() => {
          // Get the item at the center marker
          const centerItem = findCenterItem();
          setSelectedItem(centerItem || items[winningItemIndex]);
          setShowDialog(true);
          setIsSpinning(false);
        }, 100);

        setAnimationTimeout(timeout);
        return;
      }

      // Continue animation
      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    // Start animation
    const id = requestAnimationFrame(animate);
    setAnimationId(id);
  };

  // Add confetti effect when showing dialog
  useEffect(() => {
    if (showDialog) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showDialog]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle case type change with animation
  const handleCaseTypeChange = (value: string) => {
    // Set animating state to true
    setIsAnimatingItems(true);

    // Update the selected case type
    setSelectedCaseType(value as CaseType);

    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAnimatingItems(false);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40" />

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Mobile warning */}
        {isMobile ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full max-w-md mx-auto p-6">
            <Alert variant="destructive" className="mb-6 w-full">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">
                Mobil Cihaz Algılandı
              </AlertTitle>
              <AlertDescription className="text-base mt-2">
                Kasa açma özelliği şu anda mobil cihazlarda desteklenmemektedir.
                Lütfen masaüstü bir cihaz kullanın.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col items-center mt-4 text-center">
              <Smartphone className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Bu özellik için masaüstü gerekli
              </h3>
              <p className="text-muted-foreground">
                Kasa açma özelliği, daha iyi bir deneyim için masaüstü
                cihazlarda kullanılabilir. Lütfen masaüstü bir bilgisayar veya
                daha geniş ekranlı bir cihaz kullanın.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Case type selector */}
            <div className="w-full mb-8 flex justify-center">
              <Select
                value={selectedCaseType}
                onValueChange={handleCaseTypeChange}
                disabled={isSpinning || isLoading}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Kasa türünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">Ajan</SelectItem>
                  <SelectItem value="weapon">Silah</SelectItem>
                  <SelectItem value="skin">Silah Kaplaması</SelectItem>
                  <SelectItem value="map">Harita</SelectItem>
                  <SelectItem value="competitive-tier">
                    Rekabetçi Rütbe
                  </SelectItem>
                  <SelectItem value="buddy">Silah Aksesuarı</SelectItem>
                  <SelectItem value="spray">Sprey</SelectItem>
                  <SelectItem value="player-card">Oyuncu Kartı</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Case opening button */}
            <Button
              size="lg"
              onClick={openCase}
              disabled={isSpinning || isLoading}
              className="mb-8"
            >
              {isLoading
                ? "Yükleniyor..."
                : isSpinning
                ? "Açılıyor..."
                : "Kasa Aç"}
            </Button>

            {/* Global styles to hide scrollbars */}
            <style jsx global>{`
              /* Hide scrollbar for Chrome, Safari and Opera */
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }

              /* Hide scrollbar for IE, Edge and Firefox */
              .scrollbar-hide {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
              }
            `}</style>

            {/* Case opening container */}
            <div className="w-full relative mb-8">
              {/* Container with fixed width and hidden overflow */}
              <div className="w-full max-w-screen-2xl mx-auto relative">
                {/* Center marker */}
                <div
                  ref={centerMarkerRef}
                  className="absolute top-0 bottom-0 left-1/2 z-10 transform -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none"
                >
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-primary"></div>
                  <div className="w-[2px] h-full bg-primary"></div>
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary"></div>
                </div>

                {/* Items spinner wrapper with hidden scrollbar */}
                <div className="overflow-hidden">
                  <div
                    ref={spinnerRef}
                    className="flex items-center py-6 overflow-x-auto scrollbar-hide"
                  >
                    {isLoading ? (
                      // Loading placeholders
                      Array.from({ length: 10 }).map((_, index) => (
                        <div
                          key={`loading-${index}`}
                          className="case-item flex-shrink-0 mx-2 w-[260px]"
                        >
                          <Card className="animate-pulse relative overflow-hidden">
                            <AspectRatio ratio={3 / 3.2}>
                              <div className="w-full h-full bg-muted"></div>
                            </AspectRatio>
                          </Card>
                        </div>
                      ))
                    ) : (
                      // Actual items with animation
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedCaseType}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          {items.map((item, index) => (
                            <motion.div
                              key={`${item.id}-${index}`}
                              className="case-item flex-shrink-0 mx-2 w-[260px]"
                              data-index={index}
                              initial={{ opacity: 0, scale: 0.8, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{
                                delay: index * 0.03,
                                duration: 0.4,
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                              }}
                            >
                              <Card className="group relative overflow-hidden cursor-pointer">
                                <AspectRatio ratio={3 / 3}>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain transition-all duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index < 10} // Prioritize loading the first few images
                                  />
                                  {/* Image Overlay with Name */}
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="relative space-y-1">
                                      <h3 className="text-xl font-bold drop-shadow-lg tracking-wide truncate">
                                        {item.name}
                                      </h3>
                                    </div>
                                  </div>
                                </AspectRatio>
                              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Result dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-bold">
              <motion.span className="text-primary inline-block">
                Tebrikler!
              </motion.span>
            </DialogTitle>
            <DialogDescription className="text-lg mt-2">
              <motion.span className="font-medium inline-block">
                Bir {caseTypeTranslations[selectedItem?.type as CaseType] || ""}{" "}
                kazandınız
              </motion.span>
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence>
            {selectedItem && (
              <motion.div
                className="flex flex-col items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotateZ: -15 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotateZ: 0,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: 0.2,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="relative overflow-hidden w-80 mb-4 shadow-xl border-4 border-primary">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 z-0"
                      animate={{
                        background: [
                          "linear-gradient(135deg, rgba(var(--primary)/0.1) 0%, rgba(var(--secondary)/0.1) 50%, rgba(var(--primary)/0.1) 100%)",
                          "linear-gradient(225deg, rgba(var(--primary)/0.1) 0%, rgba(var(--secondary)/0.1) 50%, rgba(var(--primary)/0.1) 100%)",
                          "linear-gradient(315deg, rgba(var(--primary)/0.1) 0%, rgba(var(--secondary)/0.1) 50%, rgba(var(--primary)/0.1) 100%)",
                          "linear-gradient(45deg, rgba(var(--primary)/0.1) 0%, rgba(var(--secondary)/0.1) 50%, rgba(var(--primary)/0.1) 100%)",
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />

                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-primary/10 blur-sm z-0"></div>

                    <AspectRatio ratio={3 / 3}>
                      {/* Animated image reveal */}
                      <motion.div
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        initial={{
                          scale: 1.5,
                          opacity: 0,
                          filter: "blur(10px)",
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: {
                            delay: 0.5,
                            duration: 0.8,
                            ease: "easeOut",
                          },
                        }}
                      >
                        <Image
                          src={selectedItem.image}
                          alt={selectedItem.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </motion.div>

                      {/* Dramatic main radial glow effect */}
                      <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          className="w-[150%] h-[150%] rounded-full bg-gradient-radial from-primary/60 via-primary/20 to-transparent"
                          animate={{
                            opacity: [0.4, 0.8, 0.4],
                            scale: [0.8, 2, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                          }}
                        />
                      </motion.div>

                      {/* Intense secondary radial pulse */}
                      <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          className="w-[100%] h-[100%] rounded-full bg-gradient-radial from-white/70 via-white/20 to-transparent"
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 2, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                        />
                      </motion.div>

                      {/* Third pulsing glow for extra intensity */}
                      <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          className={`w-[120%] h-[120%] rounded-full bg-gradient-radial ${
                            selectedItem.type === "competitive-tier"
                              ? "from-yellow-500/50 via-yellow-500/10"
                              : "from-secondary/50 via-secondary/10"
                          } to-transparent`}
                          animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [0.7, 1.3, 0.7],
                          }}
                          transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: 0.5,
                          }}
                        />
                      </motion.div>

                      {/* Enhanced outer glow effect */}
                      <motion.div
                        className="absolute -inset-4 z-10 rounded-md opacity-0"
                        style={{
                          background: `radial-gradient(circle at center, ${
                            selectedItem.type === "competitive-tier"
                              ? "rgba(255, 215, 0, 0.6)"
                              : "rgba(var(--primary), 0.6)"
                          }, transparent 70%)`,
                          filter: "blur(15px)",
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          repeatType: "mirror",
                        }}
                      />

                      {/* Enhanced edge highlight */}
                      <motion.div
                        className="absolute inset-0 border-2 border-white/0 z-20 rounded-sm overflow-hidden"
                        animate={{
                          boxShadow: [
                            "inset 0 0 0px 0px rgba(255,255,255,0)",
                            "inset 0 0 25px 2px rgba(255,255,255,0.4)",
                            "inset 0 0 0px 0px rgba(255,255,255,0)",
                          ],
                          borderColor: [
                            "rgba(255,255,255,0)",
                            "rgba(255,255,255,0.4)",
                            "rgba(255,255,255,0)",
                          ],
                        }}
                        transition={{
                          duration: 2.5,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />

                      {/* Enhanced particles effect */}
                      <motion.div
                        className="absolute inset-0 z-30 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {Array.from({ length: 30 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute rounded-full ${
                              i % 5 === 0
                                ? "w-2 h-2 bg-primary/90 blur-[1px]"
                                : i % 5 === 1
                                ? "w-1.5 h-1.5 bg-white/80 blur-[0.5px]"
                                : i % 5 === 2
                                ? "w-1 h-1 bg-secondary/70"
                                : i % 5 === 3
                                ? "w-3 h-3 bg-white/20 blur-[3px]"
                                : "w-2.5 h-2.5 bg-primary/30 blur-[2px]"
                            }`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.2, 0],
                              y: [
                                0,
                                Math.random() * -30 - 10,
                                Math.random() * -60 - 20,
                              ],
                              x: [
                                0,
                                Math.random() * 30 - 15,
                                Math.random() * 60 - 30,
                              ],
                            }}
                            transition={{
                              duration: 1.5 + Math.random() * 2,
                              repeat: Infinity,
                              repeatDelay: Math.random() * 2,
                              delay: Math.random() * 1.5,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Item name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20">
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: 0.8,
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <h3 className="text-2xl font-bold drop-shadow-lg tracking-wide text-primary text-center">
                            {selectedItem.name}
                          </h3>
                        </motion.div>
                      </div>
                    </AspectRatio>
                  </Card>
                </motion.div>

                <motion.div
                  className="flex gap-3 mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                    className="px-6 py-2 font-medium"
                  >
                    Kapat
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDialog(false);
                      openCase();
                    }}
                    className="px-6 py-2 font-medium bg-primary hover:bg-primary/90"
                  >
                    Tekrar Aç
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
