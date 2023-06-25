import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
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
