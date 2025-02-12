import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import type React from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Professional admin panel with dark and light themes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-screen flex-col">
            <Toaster />
            <Navbar /> {/* This should now be visible on all screen sizes */}
            <div className="flex flex-1 overflow-hidden">
              <Sidebar /> {/* This will be hidden on smaller screens */}
              <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-8">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}