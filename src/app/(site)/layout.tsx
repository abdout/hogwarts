import type { Metadata } from "next";
import type { ReactNode } from "react";
import TaxonomyHeader from "@/components/template/header-taxonomy/taxonomy-header";
// import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Hogwarts School",
    default: "Hogwarts School of Witchcraft and Wizardry",
  },
  description: "Experience the magic of learning at Hogwarts School of Witchcraft and Wizardry.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

interface SiteLayoutProps {
  readonly children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div 
      className="relative flex min-h-screen flex-col bg-background text-foreground antialiased"
      data-slot="site-layout"
    >
      <TaxonomyHeader />
      <main 
        className="flex-1 focus-visible:outline-hidden" 
        data-slot="main-content"
        role="main"
      >
        {children}
      </main>
      {/* <SiteFooter /> */}
    </div>
  );
}