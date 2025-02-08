"use client"

import { useState } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface DataTableRowActionsProps {
    userId: string
}

export function DataTableRowActions({ userId }: DataTableRowActionsProps) {
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        fullname: "",
        email: "",
        password: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = () => {
        let valid = true
        let newErrors = {
            fullname: "",
            email: "",
            password: "",
        }

        if (formData.fullname && formData.fullname.length < 2) {
            newErrors.fullname = "Full name must be at least 2 characters."
            valid = false
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address."
            valid = false
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters."
            valid = false
        }

        if (!formData.fullname) newErrors.fullname = ""
        if (!formData.email) newErrors.email = ""
        if (!formData.password) newErrors.password = ""

        setErrors(newErrors)
        return valid
    }

    const handleSubmitEdit = async () => {
        const isValid = validateForm()

        if (!isValid) return // Stop if validation fails

        try {
            setLoading(true)

            const response = await fetch(`http://localhost:8080/api/admin/users/update/${userId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to update the user.")
            }

            toast.success("User updated successfully!")
            setDrawerOpen(false)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true)

            const response = await fetch(`http://localhost:8080/api/admin/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                },
            })

            if (!response.ok) {
                throw new Error("Failed to delete the user.")
            }

            toast.success("User deleted successfully!")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="flex items-center mt-3">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setDrawerOpen(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDelete} className="text-red-600 focus:text-red-600">
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit User</SheetTitle>
                        <SheetDescription>
                            Make changes to the user's information here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 mt-4">
                        <div className="mb-4">
                            <label htmlFor="fullname" className="block">Full Name</label>
                            <Input
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                            />
                            {errors.fullname && <span className="text-red-600">{errors.fullname}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block">Email</label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                            {errors.email && <span className="text-red-600">{errors.email}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block">Password</label>
                            <Input
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                type="password"
                                placeholder="Password"
                            />
                            {errors.password && <span className="text-red-600">{errors.password}</span>}
                        </div>
                        <Button type="button" onClick={handleSubmitEdit} className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Update User"}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
