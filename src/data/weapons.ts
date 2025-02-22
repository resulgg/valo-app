interface WeaponSkin {
  uuid: string;
  displayName: string;
  displayIcon: string;
  wallpaper: string | null;
  assetPath: string;
}

interface WeaponStats {
  fireRate: number;
  magazineSize: number;
  runSpeedMultiplier: number;
  equipTimeSeconds: number;
  reloadTimeSeconds: number;
  firstBulletAccuracy: number;
  shotgunPelletCount: number;
  wallPenetration: string;
  feature: string | null;
  fireMode: string | null;
  altFireType: string | null;
}

interface Weapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  weaponStats: WeaponStats | null;
  shopData: {
    cost: number;
    category: string;
    categoryText: string;
    gridPosition: {
      row: number;
      column: number;
    } | null;
    canBeTrashed: boolean;
    image: string | null;
    newImage: string | null;
    newImage2: string | null;
  } | null;
  skins: WeaponSkin[];
}

export async function getWeapons(): Promise<Weapon[]> {
  const response = await fetch("https://valorant-api.com/v1/weapons");
  if (!response.ok) {
    throw new Error("Failed to fetch weapons");
  }
  const data = await response.json();
  return data.data;
}

export async function getWeaponByUuid(uuid: string): Promise<Weapon> {
  const response = await fetch(`https://valorant-api.com/v1/weapons/${uuid}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weapon");
  }
  const data = await response.json();
  return data.data;
}
