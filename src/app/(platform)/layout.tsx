import { SiteHeader } from "@/components/atom/header/ui";
import { docsConfig } from "@/components/atom/sidebar/constant";
import { DocsSidebarNav } from "@/components/atom/sidebar/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CombinedLayoutProps {
  children: React.ReactNode;
}

export default function CombinedLayout({ children }: CombinedLayoutProps) {
  return (
    <div className="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
      <SiteHeader />
      <div className="flex border-b border-border/40 dark:border-border">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block fixed top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:w-[90px] lg:w-[150px]">
          <ScrollArea className="h-full  pr-2 ">
            <DocsSidebarNav config={docsConfig} />
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-[20px] lg:ml-[20px]">
          {children}
        </main>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
