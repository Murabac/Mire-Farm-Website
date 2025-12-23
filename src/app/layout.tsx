import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ConditionalLayout from "@/components/ConditionalLayout";
import { MaintenanceCheck } from "@/components/MaintenanceCheck";

export const metadata: Metadata = {
  title: "Mire Farms",
  description: "A modern, responsive website for Mire Farms, showcasing the farm's operations, products, and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <MaintenanceCheck>
              <ConditionalLayout>{children}</ConditionalLayout>
            </MaintenanceCheck>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

