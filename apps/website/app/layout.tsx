import type { Metadata } from "next";
import "./globals.css";

import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers";
import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";

const myFont = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
});

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
    <html lang="en" className={myFont.className}>
      <body>
        <Providers>
          <Nav />
          <main className="max-w- mx-auto p-">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
