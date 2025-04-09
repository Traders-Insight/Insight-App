"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { NavMain } from "@/components/_components/sidebar/nav-main";
import { NavProjects } from "@/components/_components/sidebar/nav-projects";
import { NavSecondary } from "@/components/_components/sidebar/nav-secondary";
import { NavUser } from "@/components/_components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/public";
import { sidebardata } from "@/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props} className="">
      <SidebarHeader className="bg-gray-800  rounded-t-lg">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-gray-800">
              <Link href="#">
                <Image src={Logo} alt="Logo" width={32} height={32} />
                <div className="grid text-white flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium uppercase hover:underline decoration-emerald-500">
                    Trader&apos;s Insight
                  </span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800 text-white">
        <NavMain items={sidebardata.navMain} />
        <NavProjects projects={sidebardata.projects} />
        <NavSecondary items={sidebardata.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-gray-800 text-white rounded-b-lg">
        <NavUser user={sidebardata.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
