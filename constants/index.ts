import {
  BookOpen,
  PieChart,
  Settings,
  Settings2,
  ChartCandlestick,
  LayoutDashboard,
  NotebookPen,
  ChartNetwork,
  Landmark,
  CirclePlay,
  MessageCircle,
  ArrowLeftFromLine,
} from "lucide-react";

export const sidebardata = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/app",
      icon: LayoutDashboard,
    },
    {
      title: "Journal",
      url: "/app/journal",
      icon: NotebookPen,
    },
    {
      title: "Trades",
      url: "/app/trades",
      icon: ChartCandlestick,
    },
    {
      title: "Notebook",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartNetwork,
      items: [
        {
          title: "Performance Metrics",
          url: "#",
        },
        {
          title: "Exit Analysis",
          url: "#",
        },
        {
          title: "Profit & Loss",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Inbox",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Settings",
      url: "/app/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Reports",
      url: "/app/reports",
      icon: PieChart,
    },
    {
      name: "Backtesting",
      url: "#",
      icon: ArrowLeftFromLine,
    },

    {
      name: "Replay",
      url: "#",
      icon: CirclePlay,
    },
    {
      name: "Tools",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Market Data",
      url: "#",
      icon: Landmark,
    },
  ],
};
