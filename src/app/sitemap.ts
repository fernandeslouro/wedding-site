import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getRoutePath } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = ["home", "about", "services", "contact"] as const;

  const staticRoutes = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}${getRoutePath(locale, page)}`,
      lastModified: new Date(),
    })),
  );

  return staticRoutes;
}
