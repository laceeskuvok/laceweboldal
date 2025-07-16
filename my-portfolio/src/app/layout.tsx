// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "LACE Design & Events - Egyedi Grafikai Tervezés",
  description: "Esküvői meghívók és grafikai anyagok tervezése, ami a ti történeteteket meséli el.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>
        {/* Ide fogjuk majd tenni a fix fejlécet és láblécet */}
        {children}
      </body>
    </html>
  );
}