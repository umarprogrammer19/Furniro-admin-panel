"use client";
import { DataTable } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { BASE_URL } from "@/lib/api/base-url";

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v2/products?page=1&limit=10`);
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred")
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [router]);

    if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Products</h1>
            <DataTable columns={columns} data={products} />
        </div>
    )
}
