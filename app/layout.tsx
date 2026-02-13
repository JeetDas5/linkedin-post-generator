import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
