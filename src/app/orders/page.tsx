"use client";
// async function getOrders() {
//     // Fetch orders from an API here
//     return [
//         {
//             id: "728ed52f",
//             amount: 100,
//             status: "pending",
//             email: "m@example.com",
//         },
//         {
//             id: "489e1d42",
//             amount: 125,
//             status: "processing",
//             email: "example@gmail.com",
//         },
//         // Add more order data here
//     ]
// }

import { useRouter } from "next/navigation";
import React from "react";

export default function OrdersPage() {
    // const orders = await getOrders()
    const router = useRouter();
    React.useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) router.push("/login");
    }, [])
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Orders</h1>
            {/* <DataTable columns={columns} data={orders} /> */}
        </div>
    )
}

