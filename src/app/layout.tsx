import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulrathnavel.dev"),
  title: {
    default: "Rahul Rathnavel — Applied AI Engineer",
    template: "%s — Rahul Rathnavel",
  },
  description:
    "Applied AI/ML engineer and data-driven product builder. Explore Rahul Rathnavel's systems, experiments, and open-source work.",
  openGraph: {
    title: "Rahul Rathnavel — Applied AI Engineer",
    description: "Systems, experiments, and open-source work built with care.",
    url: "https://rahulrathnavel.dev",
    siteName: "Rahul Rathnavel",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
