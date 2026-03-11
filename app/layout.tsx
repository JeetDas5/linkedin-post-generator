import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import * as React from 'react';


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = "https://linkpostai.jeetdas.site"

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "LinkPost AI — LinkedIn Post Creator",
    template: "%s | LinkPost AI",
  },
  description:
    "LinkPost AI uses advanced AI to generate high-quality, engaging LinkedIn posts in seconds. Choose your tone, audience, and length — then share with one click.",
  keywords: [
    "LinkedIn post generator",
    "AI LinkedIn posts",
    "LinkPost AI",
    "LinkedIn content creator",
    "AI writing tool",
    "social media AI",
    "professional post generator",
    "LinkedIn marketing",
    "content automation",
    "AI copywriting",
  ],
  authors: [{ name: "LinkPost AI", url: APP_URL }],
  creator: "LinkPost AI",
  publisher: "LinkPost AI",
  category: "technology",
  applicationName: "LinkPost AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: "LinkPost AI",
    title: "LinkPost AI — LinkedIn Post Creator",
    description:
      "Generate engaging LinkedIn posts in seconds with LinkPost AI. Pick your tone, target audience, and post length — powered by advanced AI.",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LinkPost AI — LinkedIn Post Creator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@linkpostai",
    creator: "@linkpostai",
    title: "LinkPost AI — LinkedIn Post Creator",
    description:
      "Generate engaging LinkedIn posts in seconds with LinkPost AI. Pick your tone, target audience, and post length — powered by advanced AI.",
    images: [`${APP_URL}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={
        typeof window !== "undefined"
          ? localStorage.getItem("theme") === "dark"
            ? "dark"
            : ""
          : "dark"
      }
    >
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Toaster position="bottom-right"/>
        {children}
      </body>
    </html>
  );
}
