import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Mire Farms",
  description: "Mire Farms Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
