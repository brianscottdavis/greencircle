import { MarketingHeader } from "~/components/blocks/marketing/MarketingHeader";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      {children}
    </div>
  );
}
