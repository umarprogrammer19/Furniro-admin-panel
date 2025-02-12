import type { Metadata } from "next"
import Link from "next/link"

import { UserSignUpForm } from "@/components/user-register-form"

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign Up to your account",
}

export default function SignUp() {

    return (
        <div className="container flex h-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">Enter your Information To Sign Up</p>
                </div>
                <UserSignUpForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link href="/login" className="hover:text-brand underline underline-offset-4">
                        Already have an account? Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

