"use client"

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SolanaProvider } from "@/components/providers/solana-provider";

export function Providers({ children }: { children: ReactNode}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SolanaProvider>
                {children}
            </SolanaProvider>
        </ThemeProvider>
    )
}