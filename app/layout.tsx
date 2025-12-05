import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { HtmlLangUpdater } from "@/components/layout/HtmlLangUpdater";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Double-O Car - Location de voitures",
  description: "Louez votre voiture en toute simplicité",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Double-O Car - Location de voitures",
    description: "Louez votre voiture en toute simplicité",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Double-O Car Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Double-O Car - Location de voitures",
    description: "Louez votre voiture en toute simplicité",
    images: ["/logo.png"],
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

