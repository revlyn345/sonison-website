import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { AnalyticsEvents } from "@/components/site/AnalyticsEvents";
import { GoogleAnalytics } from "@next/third-parties/google";
import { company } from "@/lib/site-data";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});


const siteUrl = "https://www.sonisonpackaging.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BOPP Tape Manufacturer in Delhi | Sonison Packaging Pvt. Ltd.",
    template: "%s | Sonison Packaging",
  },
  description:
    "Sonison Packaging manufactures BOPP self adhesive tape, jumbo rolls, coloured and custom printed tape and paper cores from a 9,000 sq. ft. plant in Mundka, New Delhi. Since 1995.",
  authors: [{ name: company.name }],
  openGraph: {
    siteName: "Sonison Packaging",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E3F6B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Google Analytics 4. Only runs on the live production build, so your own
  // npm run dev sessions never count as visitors.
  const gaId =
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-FD2QNP8FQW")
      : undefined;
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>
        <div className="min-h-screen">
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </div>
        {gaId && <AnalyticsEvents />}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
