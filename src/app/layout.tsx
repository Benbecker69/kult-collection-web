import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Menu } from "@/components/layout/menu/menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KULT Collection — Bougies, parfums & céramique",
  description:
    "Maison d'artisanat contemporain : bougies parfumées, parfums d'intérieur et céramique. L'art de vivre californien et méditerranéen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="max-w-360 m-auto min-h-full flex flex-col">
        <Menu />
        {children}
      </body>
    </html>
  );
}
