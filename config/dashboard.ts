import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      mobileOnly: false,
    },
    {
      title: "Notes",
      href: "/dashboard",
      mobileOnly: true,
    },
    {
      title: "Pins",
      href: "/dashboard/pins",
      mobileOnly: true,
    },
    {
      title: "Labels",
      href: "/dashboard/labels",
      mobileOnly: true,
    },
  ],
  sidebarNav: [
    {
      title: "Notes",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Pins",
      href: "/dashboard/pins",
      icon: "pin",
    },
    {
      title: "Labels",
      href: "/dashboard/labels",
      icon: "tag",
    },
    // {
    //   title: "Settings",
    //   href: "/dashboard/settings",
    //   icon: "settings",
    // },
  ],
}
