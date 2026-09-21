import type { ReactNode } from "react";
import { SiteHeader } from "@/shared/components/SiteHeader";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export const PageShell = ({ children, className = "" }: PageShellProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <main
        className={`mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 md:max-w-5xl md:px-8 lg:max-w-6xl lg:px-10 ${className}`}
      >
        {children}
      </main>
    </div>
  );
};
