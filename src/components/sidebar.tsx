"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { type LucideIcon, Home, Users, ShoppingCart, Package, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

interface NavItem {
    title: string
    href: string
    icon: LucideIcon
}

const navItems: NavItem[] = [
    { title: "Dashboard", href: "/", icon: Home },
    { title: "Users", href: "/users", icon: Users },
    { title: "Orders", href: "/orders", icon: ShoppingCart },
    { title: "Products", href: "/products", icon: Package },
]

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("UFO_AUTH_TOKEN");
        router.refresh();
    }
    return (
        <div className="flex h-full w-64 flex-col justify-between bg-background p-4 shadow-lg">
            <div>
                <h1 className="mb-8 text-2xl font-bold">Admin Panel</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button variant="ghost" className={cn("w-full justify-start", pathname === item.href && "bg-muted")}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                                {pathname === item.href && (
                                    <motion.div className="absolute bottom-0 left-0 h-1 w-full bg-primary" layoutId="sidebar-indicator" />
                                )}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="space-y-4">
                <ModeToggle />
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}

