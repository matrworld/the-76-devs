import type { Metadata } from "next";
import "./globals.css";

import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "The 76 Devs",
  description: "The 76 Devs community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <Providers>
            <Nav />

            <main className="max-w-5xl mx-auto p-3">
              {children}        
            </main>
          </Providers>
        </body>
    </html>
  );
}
