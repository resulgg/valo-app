import { Metadata } from "next";
import CaseOpening from "@/components/case-opening/case-opening";

export const metadata: Metadata = {
  title: "Kasa Açma | Valorant App",
  description: "Valorant kasalarını aç ve rastgele öğeler kazan",
};

export default function CaseOpeningPage() {
  return (
    <div className="mx-auto px-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Kasa Açma</h1>
        <p className="text-muted-foreground mt-2">
          Valorant kasalarını aç ve rastgele öğeler kazan
        </p>
      </div>
      <CaseOpening />
    </div>
  );
}
