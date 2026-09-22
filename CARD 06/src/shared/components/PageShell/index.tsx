import type { ReactNode } from "react";
import { SiteHeader } from "@/shared/components/SiteHeader";

interface PageShellProps {
  children: ReactNode;
}

export const PageShell = ({ children }: PageShellProps) => {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 md:max-w-5xl md:px-8 lg:max-w-6xl lg:px-10">
        {children}
      </main>
    </div>
  );
};
