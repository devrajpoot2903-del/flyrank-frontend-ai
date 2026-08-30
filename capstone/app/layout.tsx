import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "EcoVoice",
    template: "%s | EcoVoice",
  },
  description:
    "EcoVoice — a voice-first task management application built with Next.js App Router. FlyRank Capstone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Dark body set in globals.css */}
      <body className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 sm:p-8 antialiased">
        {children}

      </body>
    </html>
  );
}
