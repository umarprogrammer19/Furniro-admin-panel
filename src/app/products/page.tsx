import { useRouter } from "next/navigation";
import { type Product } from "./columns"
import React from "react";

// async function getProducts(): Promise<Product[]> {
//     // Fetch products from an API here
//     return [
//         {
//             id: "PROD-1",
//             name: "Product 1",
//             category: "Category A",
//             price: 19.99,
//             stock: 100,
//         },
//         {
//             id: "PROD-2",
//             name: "Product 2",
//             category: "Category B",
//             price: 29.99,
//             stock: 50,
//         },
//         // Add more product data here
//     ]
// }

export default function ProductsPage() {
    // const products = await getProducts()
    const router = useRouter();
    React.useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) router.push("/login");
    }, [])
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Products</h1>
            {/* <DataTable columns={columns} data={products} /> */}
        </div>
    )
}

