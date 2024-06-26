"use client"

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider"

export function Providers({ children }: { children: ReactNode}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}