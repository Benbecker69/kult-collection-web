import { Menu } from "@/components/layout/menu/menu";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-360 m-auto min-h-full flex flex-col">
      <Menu />
      {children}
    </div>
  );
}
