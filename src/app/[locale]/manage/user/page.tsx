import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import UserTable from "./UserTable";

export default async function User(
  props: Readonly<{
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const { locale } = params;

  setRequestLocale(locale);
  return (
    <Suspense>
      <UserTable />
    </Suspense>
  );
}
