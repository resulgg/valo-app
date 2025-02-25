import { getMapByUuid } from "@/data/maps";
import { notFound } from "next/navigation";
import MapDetails from "@/components/map/map-details";

export default async function MapDetailsPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  try {
    const map = await getMapByUuid(uuid);
    return <MapDetails map={map} />;
  } catch (err) {
    console.log(err);
    notFound();
  }
}
