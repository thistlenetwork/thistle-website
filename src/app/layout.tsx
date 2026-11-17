import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import NavBar from "@/layout/NavBar";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://thistle.network"),
  title: {
    default: "Thistle Network | Scottish apprentice community",
    template: "%s | Thistle Network",
  },
  description: "Thistle Network is a community-led network connecting current and aspiring apprentices across Scotland.",
  openGraph: {
    title: "Thistle Network | Scottish apprentice community",
    description: "Connecting current and aspiring apprentices across Scotland.",
    siteName: "Thistle Network",
    locale: "en_GB",
    type: "website",
  },
};

/** Applies a saved light/dark choice before the first paint, so the page never flashes the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavBar />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
