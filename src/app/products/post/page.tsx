"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { addProduct } from "@/lib/api/add-product"
import { toast } from "@/hooks/use-toast"

export default function AddProductPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        const result = await addProduct(formData)
        setIsSubmitting(false)

        if (result.success) {
            toast({
                title: "Success",
                description: result.message,
            })
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
            <form action={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" required />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" required />
                </div>
                <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" required />
                </div>
                <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" name="tags" />
                </div>
                <div>
                    <Label htmlFor="discountPercentage">Discount Percentage</Label>
                    <Input id="discountPercentage" name="discountPercentage" type="number" step="0.01" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="isNew" name="isNew" />
                    <Label htmlFor="isNew">Is New</Label>
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required />
                </div>
                <div>
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" name="image" type="file" accept="image/*" required />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding Product..." : "Add Product"}
                </Button>
            </form>
        </div>
    )
}

