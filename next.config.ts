import { defaultLocale } from "@/i18n/config";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${defaultLocale}/manage/user`,
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
