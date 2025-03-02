"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table";
import { columns, type Product } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BASE_URL } from "@/lib/api/base-url";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const router = useRouter();

    React.useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) router.push("/login");
    }, []);

    const fetchProducts = async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/api/v2/products?page=${page}&limit=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            // Format API response correctly
            const formattedProducts: Product[] = data.products.map((product: any) => ({
                _id: product._id,
                title: product.title,
                category: product.category,
                price: product.price,
                stock: product.stock,
                discountPercentage: product.discountPercentage,
                imageUrl: product.imageUrl,
            }));

            setProducts(formattedProducts);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Products</h1>
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-1/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <DataTable columns={columns} data={products} rowActions="products" refreshProducts={() => fetchProducts(currentPage)} />
                    <DataTablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}
