"use server";

import { revalidatePath } from "next/cache";
import { BASE_URL } from "./base-url";

export async function addProduct(formData: FormData) {
    try {
        const title = formData.get("title")?.toString().trim();
        const description = formData.get("description")?.toString().trim();
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const tags = formData.get("tags")?.toString().split(",").map(tag => tag.trim()) || [];
        const discountPercentage = Number(formData.get("discountPercentage")) || 0;
        const isNew = formData.get("isNew") === "on";
        const category = formData.get("category")?.toString().trim();
        const imageFile = formData.get("image") as File;

        const validCategories = ["chair", "sofa", "light", "bed", "table", "items"];

        if (!title) return { success: false, message: "Title is required" };
        if (!description) return { success: false, message: "Description is required" };
        if (!price || isNaN(price) || price <= 0) return { success: false, message: "Valid price is required" };
        if (!stock || isNaN(stock) || stock < 0) return { success: false, message: "Valid stock quantity is required" };
        if (discountPercentage < 0 || discountPercentage > 100) return { success: false, message: "Discount should be between 0-100%" };
        if (!category || !validCategories.includes(category)) return { success: false, message: `Category must be one of: ${validCategories.join(", ")}` };
        if (!imageFile) return { success: false, message: "Please upload an image" };

        const formDataToSend = new FormData();
        formDataToSend.append("title", title);
        formDataToSend.append("description", description);
        formDataToSend.append("price", price.toString());
        formDataToSend.append("stock", stock.toString());
        formDataToSend.append("tags", JSON.stringify(tags));
        formDataToSend.append("discountPercentage", discountPercentage.toString());
        formDataToSend.append("isNew", JSON.stringify(isNew));
        formDataToSend.append("category", category);
        formDataToSend.append("image", imageFile);

        const response = await fetch(`${BASE_URL}/api/v2/addProduct`, {
            method: "POST",
            body: formDataToSend,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add product");
        }

        const result = await response.json();
        revalidatePath("/products"); // Revalidate cache
        return { success: true, message: result.message };

    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An error occurred" };
    }
}
