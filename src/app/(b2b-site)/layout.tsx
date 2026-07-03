import { MarketingHeader } from "@/components/b2b/marketing-header";
import { MarketingFooter } from "@/components/b2b/marketing-footer";
import { Toaster } from "@/components/b2b/toaster";

export default function B2bSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
      <Toaster />
    </div>
  );
}
