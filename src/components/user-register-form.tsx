"use client"

import * as React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api/base-url";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [fullname, setFullname] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        if (!fullname || !email || !password) {
            setError("All fields are required");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${BASE_URL}/api/v1/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullname, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sign-up failed");
            }

            setSuccess("User registered successfully! Check your email for confirmation.");
            setFullname("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                router.push("/login"); 
            }, 2000);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="fullname">Full Name</Label>
                        <Input
                            id="fullname"
                            placeholder="Your Full Name"
                            type="text"
                            autoCapitalize="words"
                            autoComplete="name"
                            disabled={isLoading}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="user@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="●●●●●●●●●●"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
}
