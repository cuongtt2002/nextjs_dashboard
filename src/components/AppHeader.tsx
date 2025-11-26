import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SwitchLanguage from "./SwitchLanguage";
import DarkModeToggle from "./DarkModeToggle";

export const AppHeader = () => {
  const t = useTranslations();
  return (
    <header className="flex items-center justify-end gap-4 h-[61px] p-6 border-b text-foreground shadow-sm  w-full">
      <DarkModeToggle />
      <SwitchLanguage />
    </header>
  );
};
