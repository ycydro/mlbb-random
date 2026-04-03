import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MLBB Randomizer",
  description:
    "Generate a complete random Mobile Legends: Bang Bang loadout — hero, item build, lane, role, emblem setup, and battle spell. Free MLBB randomizer tool.",
  keywords: [
    "ML",
    "MLBB",
    "MPL",
    "Mobile Legends",
    "Mobile Legends Bang Bang",
    "MLBB randomizer",
    "ML randomizer",
    "Mobile Legends hero",
    "ML hero",
    "MLBB hero",
    "Mobile Legends build",
    "ML build",
    "MLBB build",
    "ML hero picker",
    "MLBB hero picker",
    "Mobile Legends hero picker",
  ],

  openGraph: {
    title: "MLBB Randomizer — Random Hero, Build & Loadout Generator",
    description:
      "Randomly generate a complete MLBB loadout — hero, items, lane, role, emblems and battle spell.",
    url: "https://mlbb-random.vercel.app",
    siteName: "MLBB Randomizer",
    images: [
      {
        url: "/bleh.png",
        width: 236,
        height: 236,
        alt: "MLBB Randomizer – Generate Your Random Loadout",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MLBB Randomizer — Random Hero, Build & Loadout Generator",
    description:
      "Randomly generate a complete MLBB loadout — hero, items, lane, role, emblems and battle spell.",
    images: ["/bleh.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
    >
      <body className="min-h-screen flex flex-col justify-center">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
