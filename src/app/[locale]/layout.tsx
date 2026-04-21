import { notFound } from "next/navigation";
import { HtmlLangSync } from "@/components/html-lang-sync";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const siteData = await getSiteData();

  return (
    <>
      <HtmlLangSync locale={locale as Locale} />
      <SiteShell locale={locale as Locale} settings={siteData.settings}>
        {children}
      </SiteShell>
    </>
  );
}
