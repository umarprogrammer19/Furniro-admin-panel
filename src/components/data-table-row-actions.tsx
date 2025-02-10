"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import React, { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BASE_URL } from "@/lib/api/base-url"

interface DataTableRowActionsProps {
    userId?: string
    productId?: string
    orderId?: string
}

export function DataTableRowActions({ userId, productId }: DataTableRowActionsProps) {
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [isProductDrawerOpen, setProductDrawerOpen] = useState(false)

    // User Form Data
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    })

    // Product Form Data
    const [productFormData, setProductFormData] = useState({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        tags: "",
        discountPercentage: 0,
        isNew: false,
        category: "",
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

    // **User Validation Function**
    const validateForm = () => {
        let valid = true
        const newErrors = { fullname: "", email: "", password: "" }

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

        setErrors(newErrors)
        return valid
    }

    // **Edit User API Request**
    const handleSubmitUserEdit = async () => {
        if (!validateForm()) return

        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/api/admin/users/update/${userId}`, {
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
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    // **Delete User API**
    const handleUserDelete = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/api/admin/users/delete/${userId}`, {
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
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    // **Delete Product API**
    const handleProductDelete = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/api/v2/deleteProduct/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                },
            })

            if (!response.ok) {
                throw new Error("Failed to delete the product.")
            }

            toast.success("Product deleted successfully!")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    // **Edit Product API Request**
    const handleSubmitProductEdit = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/api/v2/updateProduct/${productId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productFormData),
            })

            if (!response.ok) {
                throw new Error("Failed to update the product.")
            }

            toast.success("Product updated successfully!")
            setProductDrawerOpen(false)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    // **Empty Edit Function for Products**
    const handleProductEdit = () => {
        setProductDrawerOpen(true)
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
                    {userId && <DropdownMenuItem onSelect={() => setDrawerOpen(true)}>Edit</DropdownMenuItem>}
                    {productId && <DropdownMenuItem onSelect={handleProductEdit}>Edit</DropdownMenuItem>}
                    {userId && (
                        <DropdownMenuItem onSelect={handleUserDelete} className="text-red-600 focus:text-red-600">
                            Delete
                        </DropdownMenuItem>
                    )}
                    {productId && (
                        <DropdownMenuItem onSelect={handleProductDelete} className="text-red-600 focus:text-red-600">
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {userId && (
                <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit User</SheetTitle>
                            <SheetDescription>
                                Make changes to the user&apos;s information here. Click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 mt-4">
                            <div className="mb-4">
                                <label htmlFor="fullname" className="block">
                                    Full Name
                                </label>
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
                                <label htmlFor="email" className="block">
                                    Email
                                </label>
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
                                <label htmlFor="password" className="block">
                                    Password
                                </label>
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
                            <Button type="button" onClick={handleSubmitUserEdit} className="w-full" disabled={loading}>
                                {loading ? "Updating..." : "Update User"}
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
            {productId && (
                <Sheet open={isProductDrawerOpen} onOpenChange={setProductDrawerOpen}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit Product</SheetTitle>
                            <SheetDescription>
                                Make changes to the product information here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 mt-4">
                            <div className="mb-4">
                                <label htmlFor="title" className="block">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={productFormData.title}
                                    onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                                    placeholder="Product Title"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={productFormData.description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProductFormData({ ...productFormData, description: e.target.value })}
                                    placeholder="Product Description"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block">
                                    Price
                                </label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={productFormData.price}
                                    onChange={(e) => setProductFormData({ ...productFormData, price: Number.parseFloat(e.target.value) })}
                                    placeholder="Price"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stock" className="block">
                                    Stock
                                </label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    value={productFormData.stock}
                                    onChange={(e) => setProductFormData({ ...productFormData, stock: Number.parseInt(e.target.value) })}
                                    placeholder="Stock"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tags" className="block">
                                    Tags (comma-separated)
                                </label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    value={productFormData.tags}
                                    onChange={(e) => setProductFormData({ ...productFormData, tags: e.target.value })}
                                    placeholder="Tags"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="discountPercentage" className="block">
                                    Discount Percentage
                                </label>
                                <Input
                                    id="discountPercentage"
                                    name="discountPercentage"
                                    type="number"
                                    value={productFormData.discountPercentage}
                                    onChange={(e) =>
                                        setProductFormData({ ...productFormData, discountPercentage: Number.parseFloat(e.target.value) })
                                    }
                                    placeholder="Discount Percentage"
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label htmlFor="isNew" className="mr-2">
                                    Is New
                                </label>
                                <Switch
                                    id="isNew"
                                    checked={productFormData.isNew}
                                    onCheckedChange={(checked: boolean) => setProductFormData({ ...productFormData, isNew: checked })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block">
                                    Category
                                </label>
                                <Select
                                    value={productFormData.category}
                                    onValueChange={(value) => setProductFormData({ ...productFormData, category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="chair">Chair</SelectItem>
                                        <SelectItem value="sofa">Sofa</SelectItem>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="bed">Bed</SelectItem>
                                        <SelectItem value="table">Table</SelectItem>
                                        <SelectItem value="items">Items</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="button" onClick={handleSubmitProductEdit} className="w-full" disabled={loading}>
                                {loading ? "Updating..." : "Update Product"}
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    )
}

