"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table";
import { columns, type User } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BASE_URL } from "@/lib/api/base-url";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

export default function UsersPage() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const router = useRouter();

    React.useEffect(() => {
        const token = localStorage.getItem("UFO_AUTH_TOKEN");
        if (!token) router.push("/login");
    }, []);

    const fetchUsers = async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data.users.map((user: any) => ({
                id: user._id,
                name: user.fullname,
                email: user.email,
                role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                status: "Active",
            })));
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Users</h1>
            {loading ? (
                // Skeleton UI while loading
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
                    <DataTable columns={columns} data={users} rowActions="users" refreshUsers={() => fetchUsers(currentPage)} />
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
