import { AppShell } from "@/components/b2b/app-shell";

export default function B2bAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
