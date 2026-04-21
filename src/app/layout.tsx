import type { Metadata } from "next";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Momentos para a vida",
    template: "%s | MM Eventos",
  },
  description:
    "Planeamento editorial de casamentos e outros eventos personalizados em Portugal, com direção criativa, curadoria de locais e coordenação personalizada.",
  openGraph: {
    title: "Momentos para a vida",
    description:
      "Casamentos, eventos íntimos, jantares e baby showers com assinatura editorial e acompanhamento próximo.",
    siteName: "MM Eventos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Momentos para a vida",
    description:
      "Casamentos e celebrações intimistas desenhados com intenção, beleza e calma.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
