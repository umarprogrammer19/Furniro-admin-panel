"use client";
import AddProductForm from "@/components/addProductForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AddProductPage() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) router.push("/login");
    }, []);

    return (
        <div className="container mx-auto p-6">
            <AddProductForm />
        </div>
    );
}
