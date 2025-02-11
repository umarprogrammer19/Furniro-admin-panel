"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "@/lib/api/add-product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddProductForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: "",
            stock: "",
            tags: "",
            discountPercentage: "",
            isNew: false,
            category: "items",
            image: null,
        },
    });

    async function handleSubmit(values: any) {
        setIsSubmitting(true);

        // **Manual Validation**
        if (!values.title || values.title.length < 3) {
            toast.error("Title must be at least 3 characters long.");
            setIsSubmitting(false);
            return;
        }
        if (!values.description || values.description.length < 10) {
            toast.error("Description must be at least 10 characters.");
            setIsSubmitting(false);
            return;
        }
        if (!values.price || isNaN(Number(values.price)) || Number(values.price) <= 0) {
            toast.error("Please enter a valid price.");
            setIsSubmitting(false);
            return;
        }
        if (!values.stock || isNaN(Number(values.stock)) || Number(values.stock) < 0) {
            toast.error("Stock cannot be negative.");
            setIsSubmitting(false);
            return;
        }
        if (!values.category) {
            toast.error("Please select a valid category.");
            setIsSubmitting(false);
            return;
        }
        if (!values.image || values.image.length === 0) {
            toast.error("Please upload a product image.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key !== "image") {
                formData.append(key, value as string);
            }
        });
        formData.append("image", values.image[0]);

        const result = await addProduct(formData);
        setIsSubmitting(false);

        if (result.success) {
            toast.success("Product added successfully!");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Add New Product</h2>

                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Product title" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Product description" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. modern, wooden" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Discount */}
                <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Discount (%)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* New Arrival Checkbox */}
                <FormField
                    control={form.control}
                    name="isNew"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            <FormLabel>New Arrival</FormLabel>
                        </FormItem>
                    )}
                />

                {/* Category Select */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
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
                        </FormItem>
                    )}
                />

                {/* Image Upload */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Adding..." : "Add Product"}
                </Button>
            </form>
        </Form>
    );
}
