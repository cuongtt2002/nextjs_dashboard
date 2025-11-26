"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Package2, Settings, Users2 } from "lucide-react";
import { useTranslations } from "next-intl";
const menuItems = [{ title: "users", Icon: Users2, href: "/manage/user" }];
export default function NavLinks() {
  const t = useTranslations();
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Package2 className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{t("dashboard_users")}</TooltipContent>
          </Tooltip>

          {menuItems.map((Item, index) => {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={Item.href}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                    )}
                  >
                    <Item.Icon className="h-5 w-5" />
                    <span className="sr-only">{Item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{Item.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Settings className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Cài đặt</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
