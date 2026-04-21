export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];
export type RouteKey =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "venues"
  | "contact";

export type ResolvedRoute =
  | { type: "page"; key: RouteKey }
  | { type: "portfolio-item"; slug: string }
  | { type: "venue-item"; slug: string };

export const routeSegments: Record<RouteKey, Record<Locale, string>> = {
  home: { pt: "", en: "" },
  about: { pt: "sobre", en: "about" },
  services: { pt: "servicos", en: "services" },
  portfolio: { pt: "portfolio", en: "portfolio" },
  venues: { pt: "locais", en: "venues" },
  contact: { pt: "contacto", en: "contact" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getRoutePath(
  locale: Locale,
  route: RouteKey,
  childSlug?: string,
) {
  const parts: string[] = [locale];
  const segment = routeSegments[route][locale];

  if (segment) {
    parts.push(segment);
  }

  if (childSlug) {
    parts.push(childSlug);
  }

  return `/${parts.join("/")}`;
}

export function resolveRoute(
  locale: Locale,
  segments: string[] = [],
): ResolvedRoute | null {
  if (segments.length === 0) {
    return { type: "page", key: "home" };
  }

  const [first, second] = segments;

  if (first === routeSegments.about[locale] && segments.length === 1) {
    return { type: "page", key: "about" };
  }

  if (first === routeSegments.services[locale] && segments.length === 1) {
    return { type: "page", key: "services" };
  }

  if (first === routeSegments.contact[locale] && segments.length === 1) {
    return { type: "page", key: "contact" };
  }

  if (first === routeSegments.portfolio[locale]) {
    if (segments.length === 1) {
      return { type: "page", key: "portfolio" };
    }

    if (segments.length === 2 && second) {
      return { type: "portfolio-item", slug: second };
    }
  }

  if (first === routeSegments.venues[locale]) {
    if (segments.length === 1) {
      return { type: "page", key: "venues" };
    }

    if (segments.length === 2 && second) {
      return { type: "venue-item", slug: second };
    }
  }

  return null;
}

export function buildPathFromResolvedRoute(
  locale: Locale,
  route: ResolvedRoute,
) {
  if (route.type === "page") {
    return getRoutePath(locale, route.key);
  }

  if (route.type === "portfolio-item") {
    return getRoutePath(locale, "portfolio", route.slug);
  }

  return getRoutePath(locale, "venues", route.slug);
}

export function translatePathname(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!maybeLocale || !isLocale(maybeLocale)) {
    return getRoutePath(targetLocale, "home");
  }

  const route = resolveRoute(maybeLocale, segments.slice(1));

  if (!route) {
    return getRoutePath(targetLocale, "home");
  }

  return buildPathFromResolvedRoute(targetLocale, route);
}
