import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AboutPage,
  ContactPage,
  HomePage,
  PortfolioDetailPage,
  PortfolioPage,
  ServicesPage,
  VenueDetailPage,
  VenuesPage,
} from "@/components/page-sections";
import { getSiteData, t } from "@/lib/content";
import { isLocale, resolveRoute, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; segments?: string[] }>;
};

function pageTitle(locale: Locale, routeTitle: string) {
  return locale === "pt" ? routeTitle : routeTitle;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, segments } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const route = resolveRoute(locale, segments);
  const siteData = await getSiteData();

  if (!route) {
    return {};
  }

  if (route.type === "page") {
    const map = {
      home: {
        title: siteData.settings.tagline[locale],
        description: siteData.settings.introduction[locale],
      },
      about: {
        title: locale === "pt" ? "Sobre o estúdio" : "About the studio",
        description:
          siteData.settings.story[locale] ||
          (locale === "pt"
            ? "Planeamento sereno, elegante e próximo."
            : "Calm, elegant, and personal planning."),
      },
      services: {
        title: locale === "pt" ? "Serviços" : "Services",
        description:
          siteData.settings.servicePitch[locale] ||
          (locale === "pt"
            ? "Planeamento integral, planeamento parcial e coordenação do dia."
            : "Full planning, partial planning, and on-the-day coordination."),
      },
      portfolio: {
        title: locale === "pt" ? "Portefólio" : "Portfolio",
        description:
          locale === "pt"
            ? "Projetos, atmosferas e referências do estúdio."
            : "Projects, atmospheres, and references from the studio.",
      },
      venues: {
        title: locale === "pt" ? "Locais" : "Venues",
        description:
          locale === "pt"
            ? "Locais recomendados em Portugal para casamentos e eventos íntimos."
            : "Recommended venues in Portugal for weddings and intimate events.",
      },
      contact: {
        title: locale === "pt" ? "Contacto" : "Contact",
        description: siteData.settings.responseNote[locale],
      },
    };

    const shouldHideFromIndex =
      route.key === "portfolio" || route.key === "venues";

    return {
      title: pageTitle(locale, map[route.key].title),
      description: map[route.key].description,
      robots: shouldHideFromIndex
        ? {
            index: false,
            follow: false,
          }
        : undefined,
    };
  }

  if (route.type === "portfolio-item") {
    const item = siteData.portfolio.find((entry) => entry.slug === route.slug);

    return item
      ? {
          title: t(item.title, locale),
          description: t(item.summary, locale),
          robots: {
            index: false,
            follow: false,
          },
        }
      : {};
  }

  const item = siteData.venues.find((entry) => entry.slug === route.slug);

  return item
    ? {
        title: item.name,
        description: t(item.description, locale),
        robots: {
          index: false,
          follow: false,
        },
      }
    : {};
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale, segments } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const siteData = await getSiteData();
  const route = resolveRoute(locale, segments);

  if (!route) {
    notFound();
  }

  if (route.type === "page") {
    switch (route.key) {
      case "home":
        return <HomePage locale={locale} />;
      case "about":
        return <AboutPage locale={locale} />;
      case "services":
        return <ServicesPage data={siteData} locale={locale} />;
      case "portfolio":
        return <PortfolioPage data={siteData} locale={locale} />;
      case "venues":
        return <VenuesPage data={siteData} locale={locale} />;
      case "contact":
        return <ContactPage data={siteData} locale={locale} />;
      default:
        notFound();
    }
  }

  if (route.type === "portfolio-item") {
    const item = siteData.portfolio.find((entry) => entry.slug === route.slug);

    if (!item) {
      notFound();
    }

    return <PortfolioDetailPage item={item} locale={locale} />;
  }

  const venue = siteData.venues.find((entry) => entry.slug === route.slug);

  if (!venue) {
    notFound();
  }

  return <VenueDetailPage item={venue} locale={locale} />;
}
