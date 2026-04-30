import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techmind VPS Dashboard",
  icons: {
    icon: "/favicon-v2.png",
    shortcut: "/favicon-v2.png",
    apple: "/favicon-v2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans min-h-full bg-[#050505] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
