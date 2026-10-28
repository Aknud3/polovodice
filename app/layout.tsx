import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Polovodiče - Informační deník ze světa elektroniky",
    template: "%s - Polovodiče",
  },
  description: "Informační deník ze světa elektroniky",
  keywords: [
    "polovodiče",
    "čipy",
    "ASIC",
    "FPGA",
    "ČVUT FEL",
    "Katedra mikroelektroniky",
    "Chips Act",
    "SiC",
    "GaN",
    "elektronika",
    "čisté prostory",
  ],
  authors: [{ name: "ČVUT FEL – Program Elektronika a komunikace" }],
  manifest: "/icons/manifest.webmanifest",
  // Jednoznačná deklarace: prohlížeče považují kandidáta se `sizes: "any"`
  // za vhodného pro všechny velikosti, a kdyby jím byl pevně veliký `.ico`,
  // přepnuly by na něj i přes novější SVG. Soubor `/favicon.ico` proto
  // zůstává pouze na disku pro implicitní požadavky starších agentů.
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#081d3d",
      },
    ],
  },
  other: {
    "msapplication-config": "/icons/browserconfig.xml",
    "msapplication-TileColor": "#ffffff",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#081d3d" },
    { media: "(prefers-color-scheme: light)", color: "#edfff9" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="polovodice-theme"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <Navbar />
            <main className="flex-1 silicon-grid-bg">{children}</main>
            <Footer />
            <CookieBanner />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
