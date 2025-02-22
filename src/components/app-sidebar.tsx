import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  MapIcon,
  Users,
  Swords,
  Shuffle,
  Sticker,
  Trophy,
  Medal,
  Contact2,
} from "lucide-react";
import Link from "next/link";
import { NavUser } from "@/components/nav-user";
import { Logo } from "@/components/logo";

const AppSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="px-2 py-2">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Yardımcı Araçlar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/random-agent">
                    <Shuffle className="mr-2 h-4 w-4" />
                    <span>Rastgele Ajan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/should-i-pick">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Sage Seçmeli miyim?</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Oyun Öğeleri</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/agents">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Ajanlar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/maps">
                    <MapIcon className="mr-2 h-4 w-4" />
                    <span>Haritalar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/weapons">
                    <Swords className="mr-2 h-4 w-4" />
                    <span>Silahlar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/sprays">
                    <Sticker className="mr-2 h-4 w-4" />
                    <span>Spreyler</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/competitive">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>Rekabetçi Rütbeler</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/buddies">
                    <Medal className="mr-2 h-4 w-4" />
                    <span>Silah Aksesuarları</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/player-cards">
                    <Contact2 className="mr-2 h-4 w-4" />
                    <span>Oyuncu Kartları</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Hile",
            email: "Kaliteye hoşgeldiniz ✨",
            avatar: "https://github.com/shadcn.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
