import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";

export const metadata: Metadata = {
  title: "POLOVODIČE // Informační portál pro technologie a čipy – ČVUT FEL",
  description:
    "Oficiální informační portál Fakulty elektrotechnické ČVUT v Praze zaměřený na polovodičový průmysl, návrh čipů ASIC/FPGA, výkonovou elektroniku GaN/SiC a program Elektronika a komunikace.",
  keywords: [
    "polovodiče",
    "čipy",
    "ASIC",
    "FPGA",
    "ČVUT FEL",
    "Katedra mikroelektroniky",
    "onsemi",
    "Chips Act",
    "SiC",
    "GaN",
    "elektronika",
    "čisté prostory",
  ],
  authors: [{ name: "ČVUT FEL – Program Elektronika a komunikace" }],
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
