import { getWeaponByUuid } from "@/data/weapons";
import { notFound } from "next/navigation";
import WeaponDetails from "@/components/weapon/weapon-details";

export default async function WeaponDetailsPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  try {
    const weapon = await getWeaponByUuid(uuid);
    return <WeaponDetails weapon={weapon} />;
  } catch (err) {
    console.log(err);
    notFound();
  }
}
