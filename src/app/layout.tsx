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
    default: "RR Workstation — Rahul Rathnavel",
    template: "%s — Rahul Rathnavel",
  },
  description:
    "An evidence-led desktop portfolio for Rahul Rathnavel, an applied AI/ML engineer and data-driven product builder.",
  openGraph: {
    title: "RR Workstation — Rahul Rathnavel",
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
