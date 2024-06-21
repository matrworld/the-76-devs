import { ModeToggle } from "@/components/theme-toggle";

export function Nav() {
    return (
        <nav className="border">
            <div className="mx-auto p-3 max-w-6xl flex justify-between items-center">
                <h2>Solana Wallet Adapter | Next.js</h2>

                <div>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}