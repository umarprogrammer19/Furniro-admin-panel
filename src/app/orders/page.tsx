"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { columns, type Order } from "./columns";
import { fetchOrders } from "@/lib/api/fetchOrders";
import { useAuth } from "@/hooks/use-auth";

export default function OrdersPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    const loadOrders = React.useCallback(async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchOrders(page);
            setOrders(data.orders);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (isAuthenticated) {
            loadOrders(currentPage);
        }
    }, [currentPage, isAuthenticated, loadOrders]);

    if (isLoading) {
        return <OrdersSkeleton />;
    }

    if (error) {
        return <ErrorMessage message={error} retry={() => loadOrders(currentPage)} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Orders</h1>
            {loading ? (
                <OrdersSkeleton />
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

function OrdersSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-[400px] w-full" />
        </div>
    );
}

function ErrorMessage({ message, retry }: { message: string; retry: () => void }) {
    return (
        <div className="text-center">
            <p className="text-red-500 mb-4">{message}</p>
            <button onClick={retry} className="bg-blue-500 text-white px-4 py-2 rounded">
                Retry
            </button>
        </div>
    );
}
