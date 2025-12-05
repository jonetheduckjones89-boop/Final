
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        <span className="hidden sm:inline-block">ModelML</span>
                    </Link>
                </div>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/history" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Docs
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Pricing
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Contact
                    </Link>
                    <Button asChild size="sm">
                        <Link href="/intake">Get Started</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
