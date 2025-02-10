"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table";
import { columns, type Order } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BASE_URL } from "@/lib/api/base-url";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const router = useRouter();

    React.useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) router.push("/login");
    }, []);

    React.useEffect(() => {
        async function fetchOrders(page: number) {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/api/admin/orders?page=${page}&limit=12`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();

                // Format API response correctly
                const formattedOrders: Order[] = data.orders.map((order: any) => ({
                    _id: order._id,
                    customer: order.user ? order.user.fullname : "Guest",
                    email: order.user ? order.user.email : "No Email",
                    totalPrice: order.totalPrice,
                    status: order.status,
                    orderDate: new Date(order.orderDate).toLocaleDateString("en-US"),
                }));

                setOrders(formattedOrders);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders(currentPage);
    }, [currentPage]);

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Orders</h1>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <DataTable columns={columns} data={orders} rowActions="orders" />
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
