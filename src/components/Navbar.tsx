"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, LogOut, LogIn } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { navItems } from "@/components/sidebar" // Make sure this import works

export function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check authentication status
        if (typeof window !== "undefined") {
            const authToken = localStorage.getItem("UFO_AUTH_TOKEN")
            setIsAuthenticated(!!authToken)
        }
    }, [])

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("UFO_AUTH_TOKEN")
        }
        setIsAuthenticated(false)
        router.push("/login")
        setIsOpen(false)
    }

    const handleLogin = () => {
        router.push("/login")
        setIsOpen(false)
    }

    return (
        <nav className="md:hidden flex items-center justify-between p-4 bg-background shadow-lg">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                    <div className="absolute bottom-4 left-4 right-4 space-y-4">
                        <ModeToggle />
                        {isAuthenticated ? (
                            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        ) : (
                            <Button variant="ghost" className="w-full justify-start" onClick={handleLogin}>
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}