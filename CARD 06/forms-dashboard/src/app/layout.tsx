import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/shared/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "F1 2021 - Dashboard",
  description: "Dashboard simples sobre a temporada 2021 de Fórmula 1.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-gray-100 text-gray-900 antialiased">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
