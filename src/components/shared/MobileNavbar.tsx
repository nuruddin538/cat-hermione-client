"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  CalendarCheck2,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

const menuItems = [
  {
    label: "Create Event",
    href: "/create-event",
    icon: CalendarPlus,
  },
  {
    label: "Manage Events",
    href: "/manage-events",
    icon: LayoutDashboard,
  },
  {
    label: "Joined Events",
    href: "/joined-events",
    icon: CalendarCheck2,
  },
];

export default function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      toast.success("Logged out successfully");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open user menu"
              className="flex items-center gap-2 rounded-full border border-border bg-background p-1 pr-3 transition hover:border-emerald-500"
            >
              <Avatar className="size-9">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback className="bg-emerald-100 font-bold text-emerald-800">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p>{user.name}</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" className="w-60 rounded-xl p-2">
        <DropdownMenuLabel className="px-3 py-3">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {menuItems.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem
            key={href}
            asChild
            className="cursor-pointer rounded-lg"
          >
            <Link href={href} className="flex items-center gap-3 px-3 py-2">
              <Icon className="size-4 text-emerald-600" />
              {label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => void handleLogout()}
          className="cursor-pointer rounded-lg px-3 py-2 text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
