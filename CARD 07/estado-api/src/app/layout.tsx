import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Card 07 - Estado e API",
  description: "Exercício com Zustand, TanStack Query e Axios.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
