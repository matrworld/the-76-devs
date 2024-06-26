import type { Metadata } from "next";
import "./globals.css";

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "76 | Blink",
  description: "76 Blink App",
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
