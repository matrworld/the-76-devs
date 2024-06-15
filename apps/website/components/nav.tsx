import { ModeToggle } from "@/components/theme-toggle"

export function Nav() {
    return (
        <nav className="border">
            <div className="mx-auto p-3 max-w-6xl flex justify-between items-center">
                <h2>The 76 Devs</h2>

                <ModeToggle />
            </div>
        </nav>
    )
}