import { AppHeader } from "@/components/AppHeader";
import NavLinks from "@/components/NavLinks";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function ManageLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;
  setRequestLocale(locale);
  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto">
      <NavLinks />
      <div className="flex flex-col gap-4 pl-14">
        <AppHeader />
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
}
