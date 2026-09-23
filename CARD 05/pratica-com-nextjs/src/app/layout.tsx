import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/shared/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "F1 - Mini Blog",
  description: "Notícias sobre Fórmula 1 buscadas na Hacker News.",
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
