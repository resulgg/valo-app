import ShouldIPick from "@/components/should-i-pick/should-i-pick";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajan Seçim Yardımcısı | VALORANT",
  description:
    "VALORANT ajanlarını seçerken kararsız mı kaldınız? Size yardımcı olalım!",
};

export default function ShouldIPickPage() {
  return <ShouldIPick />;
}
