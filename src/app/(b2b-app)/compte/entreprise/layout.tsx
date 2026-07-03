import { Sidebar } from "@/components/b2b/sidebar";
import { Topbar } from "@/components/b2b/topbar";

export default function B2bAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-cream font-sans text-ink">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
