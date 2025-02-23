import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "200", "300"],
});

export const metadata: Metadata = {
  title: "Kaliteye Hoşgeldiniz",
  description: "bismillahirrahmanirrahim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased`}>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SidebarTrigger className="ml-3 mt-2" />
              <div className="px-6 py-4 w-full">{children}</div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster richColors closeButton position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
