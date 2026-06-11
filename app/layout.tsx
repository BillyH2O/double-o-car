import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { HtmlLangUpdater } from "@/components/layout/HtmlLangUpdater";
import { siteUrl, siteName } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Double-O Car - Location de voitures à Marrakech",
    template: "%s | Double-O Car",
  },
  description:
    "Louez votre voiture en toute simplicité à Marrakech avec Double-O Car. Service simple, sans stress et livraison jusqu'à 200km de Marrakech.",
  keywords: [
    "location de voiture",
    "location voiture Marrakech",
    "car rental Marrakech",
    "Double-O Car",
    "louer une voiture Maroc",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    siteName,
    title: "Double-O Car - Location de voitures à Marrakech",
    description: "Louez votre voiture en toute simplicité à Marrakech.",
    url: siteUrl,
    images: [
      {
        url: "/asset.png",
        width: 1200,
        height: 630,
        alt: "Double-O Car - Location de voiture de tourisme",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Double-O Car - Location de voitures à Marrakech",
    description: "Louez votre voiture en toute simplicité à Marrakech.",
    images: ["/asset.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        <HtmlLangUpdater />
        {children}
      </body>
    </html>
  );
}

