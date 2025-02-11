"use server"

import { revalidatePath } from "next/cache"
import { BASE_URL } from "./base-url"

export async function addProduct(formData: FormData) {

    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        tags: formData.get("tags"),
        discountPercentage: formData.get("discountPercentage"),
        isNew: formData.get("isNew") === "on",
        category: formData.get("category"),
    }

    const imageFile = formData.get("image") as File

    if (!imageFile) {
        throw new Error("Please upload an image")
    }

    const formDataToSend = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formDataToSend.append(key, value as string)
        }
    })
    formDataToSend.append("image", imageFile)

    try {
        const response = await fetch(`${BASE_URL}/api/v2/addProduct`, {
            method: "POST",
            body: formDataToSend,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to add product")
        }

        const result = await response.json()
        revalidatePath("/products")
        return { success: true, message: result.message }
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An error occurred" }
    }
}

