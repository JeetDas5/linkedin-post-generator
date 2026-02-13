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
  title: "LinkedIn Post Creator",
  description: "A tool to create LinkedIn posts with AI assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set theme class on html element from localStorage (for SSR hydration)
  // This is a workaround for Next.js apps to avoid theme flicker
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={typeof window !== "undefined" ? (localStorage.getItem("theme") === "dark" ? "dark" : "") : "dark"}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
