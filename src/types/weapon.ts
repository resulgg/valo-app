export interface WeaponSkin {
  uuid: string;
  displayName: string;
  displayIcon: string;
  wallpaper: string | null;
  assetPath: string;
}

export interface WeaponStats {
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

export interface Weapon {
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
