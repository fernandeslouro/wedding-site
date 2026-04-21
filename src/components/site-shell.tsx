"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/lib/content";
import {
  getRoutePath,
  translatePathname,
  type Locale,
  type RouteKey,
} from "@/lib/i18n";

const navigationLabels: Record<
  RouteKey,
  { pt: string; en: string }
> = {
  home: { pt: "Início", en: "Home" },
  about: { pt: "Sobre", en: "About" },
  services: { pt: "Serviços", en: "Services" },
  portfolio: { pt: "Portefólio", en: "Portfolio" },
  venues: { pt: "Locais", en: "Venues" },
  contact: { pt: "Orçamento", en: "Enquiry" },
};

const visibleNavigationKeys: RouteKey[] = [
  "home",
  "about",
  "services",
  "contact",
];

const visibleFooterKeys: RouteKey[] = [
  "about",
  "services",
  "contact",
];

const footerCopy = {
  pt: {
    brand: "MM Eventos",
  },
  en: {
    brand: "MM Events",
  },
};

const floatingWhatsAppLabel = {
  pt: "Contacte-me",
  en: "Contact me",
};

const footerHeadings = {
  pt: {
    explore: "Explorar",
    signature: "",
    location: "De norte a sul de Portugal",
    overview: "",
    notes: [],
  },
  en: {
    explore: "Explore",
    signature: "",
    location: "From north to south of Portugal",
    overview: "",
    notes: [],
  },
};

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="button-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.02 3.2a8.75 8.75 0 0 0-7.43 13.37l-1 4.23 4.33-.96a8.75 8.75 0 1 0 4.1-16.64Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path
        d="M9.06 8.78c.17-.38.35-.39.51-.4h.43c.14 0 .36.05.54.44.18.4.62 1.53.68 1.64.05.11.09.24.02.39-.08.15-.11.24-.22.36-.11.13-.24.29-.34.39-.11.11-.23.24-.1.47.13.24.57.95 1.22 1.53.84.75 1.55.98 1.78 1.09.24.11.37.09.5-.06.14-.14.58-.68.73-.91.15-.23.31-.19.52-.11.22.08 1.36.64 1.6.76.23.11.39.17.44.27.05.11.05.64-.15 1.26-.2.61-1.16 1.18-1.61 1.25-.42.07-.96.1-1.55-.08-.36-.11-.81-.26-1.4-.51-2.45-1.07-4.05-3.69-4.18-3.87-.13-.18-.99-1.32-.99-2.52 0-1.2.63-1.78.85-2.03Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteShell({
  locale,
  settings,
  children,
}: {
  locale: Locale;
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [headerAtTop, setHeaderAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoExpanded, setPhotoExpanded] = useState(false);
  const [routeTransitionVisible, setRouteTransitionVisible] = useState(false);
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const transitionStartedAtRef = useRef<number | null>(null);
  const transitionFallbackRef = useRef<number | null>(null);

  useEffect(() => {
    const homePath = getRoutePath(locale, "home");
    const currentPath = pathname ?? homePath;

    if (currentPath !== homePath) {
      setHeaderAtTop(false);
      return;
    }

    const heroSection = document.querySelector(".hero-section");
    if (!(heroSection instanceof HTMLElement)) {
      setHeaderAtTop(false);
      return;
    }

    const updateHeaderState = () => {
      const heroBounds = heroSection.getBoundingClientRect();
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setHeaderAtTop(heroBounds.bottom > headerHeight);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [locale, pathname]);

  useEffect(() => {
    try {
      setCookiesVisible(window.localStorage.getItem("mm-cookies-consent") !== "accepted");
    } catch {
      setCookiesVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      const nextPath = `${url.pathname}${url.search}`;
      const currentPath = `${window.location.pathname}${window.location.search}`;

      if (nextPath === currentPath) {
        return;
      }

      transitionStartedAtRef.current = Date.now();
      setRouteTransitionVisible(true);

      if (transitionFallbackRef.current) {
        window.clearTimeout(transitionFallbackRef.current);
      }

      transitionFallbackRef.current = window.setTimeout(() => {
        setRouteTransitionVisible(false);
        transitionStartedAtRef.current = null;
      }, 2400);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);

      if (transitionFallbackRef.current) {
        window.clearTimeout(transitionFallbackRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!routeTransitionVisible) {
      return;
    }

    const elapsed = transitionStartedAtRef.current
      ? Date.now() - transitionStartedAtRef.current
      : 0;
    const remaining = Math.max(0, 320 - elapsed);

    const timeout = window.setTimeout(() => {
      setRouteTransitionVisible(false);
      transitionStartedAtRef.current = null;
    }, remaining);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname, routeTransitionVisible]);

  useEffect(() => {
    if (!photoExpanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPhotoExpanded(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photoExpanded]);

  const navigation = visibleNavigationKeys.map((key) => ({
      key,
      label: navigationLabels[key][locale],
      href: getRoutePath(locale, key),
    }));

  const alternateLocale: Locale = locale === "pt" ? "en" : "pt";
  const alternatePath = translatePathname(
    pathname ?? getRoutePath(locale, "home"),
    alternateLocale,
  );
  const whatsappHref = `https://wa.me/${settings.contactPhone.replace(/\D+/g, "")}`;
  const expandPhotoLabel =
    locale === "pt" ? "Ampliar fotografia do header" : "Expand header photo";
  const closePhotoLabel = locale === "pt" ? "Fechar" : "Close";
  const photoAlt =
    locale === "pt"
      ? "Fotografia do header de Maria Moinhos Eventos"
      : "Maria Moinhos Eventos header photo";
  const acceptCookiesLabel = locale === "pt" ? "Aceitar" : "Accept";
  const cookiesCopy =
    locale === "pt"
      ? "Este site pode usar cookies e tecnologias semelhantes para tornar a navegação mais fluida."
      : "This website may use cookies and similar technologies to keep the experience smooth.";
  const footerExploreLinks = visibleFooterKeys.map((key) => ({
    href: getRoutePath(locale, key),
    label: navigationLabels[key][locale],
  }));
  const footerContent = footerHeadings[locale];
  const handleHeaderNavigation =
    (href: string, options?: { closeMenu?: boolean }) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      if (options?.closeMenu ?? true) {
        setMenuOpen(false);
      }

      const currentPath = pathname ?? getRoutePath(locale, "home");
      if (currentPath === href) {
        return;
      }

      router.push(href);
    };
  const handleAcceptCookies = () => {
    try {
      window.localStorage.setItem("mm-cookies-consent", "accepted");
    } catch {
      // Ignore storage failures and hide the banner for this session.
    }

    setCookiesVisible(false);
  };

  return (
    <div className="site-frame">
      <div
        aria-hidden="true"
        className={`route-transition${routeTransitionVisible ? " is-visible" : ""}`}
      >
        <div className="route-transition-logo">
          <Image
            alt=""
            className="route-transition-logo-image"
            fill
            sizes="(max-width: 640px) 120px, 168px"
            src="/editorial/header-whatsapp-20260331.jpeg"
          />
        </div>
      </div>

      <a className="skip-link" href="#main-content">
        Saltar para o conteúdo
      </a>

      <header
        className={`site-header${headerAtTop ? " is-at-top" : ""}`}
        ref={headerRef}
      >
        <div className="section-shell header-shell">
          <div className="brand-mark">
            <button
              aria-haspopup="dialog"
              aria-label={expandPhotoLabel}
              className="brand-monogram-button"
              onClick={() => setPhotoExpanded(true)}
              type="button"
            >
              <span className="brand-monogram" aria-hidden="true">
                <Image
                  alt=""
                  className="brand-monogram-image"
                  fill
                  priority
                  sizes="44px"
                  src="/editorial/header-whatsapp-20260331.jpeg"
                />
              </span>
            </button>
            <Link
              className="brand-copy-link"
              href={getRoutePath(locale, "home")}
              onClick={handleHeaderNavigation(getRoutePath(locale, "home"), {
                closeMenu: false,
              })}
            >
              <span className="brand-copy">
                <strong>{settings.brandName}</strong>
              </span>
            </Link>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label={locale === "pt" ? "Abrir menu" : "Open menu"}
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`main-nav${menuOpen ? " is-open" : ""}`}
            aria-label={locale === "pt" ? "Navegação principal" : "Main navigation"}
          >
            <ul>
              {navigation.map((item) => {
                const isCurrent =
                  pathname === item.href ||
                  (item.key !== "home" && pathname?.startsWith(`${item.href}/`));

                return (
                  <li key={item.key}>
                    <Link
                      aria-current={isCurrent ? "page" : undefined}
                      href={item.href}
                      onClick={handleHeaderNavigation(item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="header-actions">
              <Link
                className="language-switch"
                href={alternatePath}
                onClick={handleHeaderNavigation(alternatePath)}
              >
                {alternateLocale.toUpperCase()}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {photoExpanded ? (
        <div
          aria-label={photoAlt}
          aria-modal="true"
          className="brand-lightbox"
          onClick={() => setPhotoExpanded(false)}
          role="dialog"
        >
          <div
            className="brand-lightbox-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label={closePhotoLabel}
              className="brand-lightbox-close"
              onClick={() => setPhotoExpanded(false)}
              type="button"
            >
              {closePhotoLabel}
            </button>
            <Image
              alt={photoAlt}
              className="brand-lightbox-image"
              height={768}
              sizes="92vw"
              src="/editorial/header-whatsapp-20260331.jpeg"
              width={1408}
            />
          </div>
        </div>
      ) : null}

      <main className="site-main" id="main-content">
        {children}
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-shell">
          <div className="footer-brand-block">
            {footerContent.overview ? (
              <p className="footer-overview">{footerContent.overview}</p>
            ) : null}
            <div className="footer-contact-list">
              <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
              <a href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}>
                {settings.contactPhone}
              </a>
              <p>{footerContent.location}</p>
            </div>
            <p className="footer-copyright">© 2026 {settings.brandName}</p>
          </div>

          <div className="footer-nav-block">
            <p className="footer-nav-title">{footerContent.explore}</p>
            <div className="footer-nav-list">
              {footerExploreLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-nav-block footer-signature-block">
            <div className="footer-corner-brand">
              <span className="footer-brand-mark" aria-hidden="true">
                <Image
                  alt=""
                  className="footer-brand-mark-image"
                  fill
                  sizes="(max-width: 860px) 102px, 152px"
                  src="/editorial/header-whatsapp-20260331.jpeg"
                />
              </span>
              <div className="footer-brand-copy">
                <h2 className="footer-brand">{footerCopy[locale].brand}</h2>
                <p className="footer-tagline">{settings.tagline[locale]}</p>
              </div>
            </div>
            {footerContent.signature ? (
              <p className="footer-nav-title">{footerContent.signature}</p>
            ) : null}
            {footerContent.notes.length > 0 ? (
              <div className="footer-note-list">
                {footerContent.notes.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </footer>

      <a
        className="floating-whatsapp-button"
        href={whatsappHref}
        rel="noreferrer"
        target="_blank"
      >
        <span>{floatingWhatsAppLabel[locale]}</span>
        <span className="floating-whatsapp-button-icon" aria-hidden="true">
          <WhatsAppIcon />
        </span>
      </a>

      {cookiesVisible ? (
        <div className="cookie-banner" role="status">
          <p>{cookiesCopy}</p>
          <button
            className="button button-primary cookie-banner-button"
            onClick={handleAcceptCookies}
            type="button"
          >
            {acceptCookiesLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
