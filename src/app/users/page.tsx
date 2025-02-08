"use client"

import * as React from "react"
import { DataTable } from "@/components/data-table"
import { columns, type User } from "./columns"
import { DataTablePagination } from "@/components/data-table-pagination"

export default function UsersPage() {
    const [users, setUsers] = React.useState<User[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [totalPages, setTotalPages] = React.useState<number>(1)

    React.useEffect(() => {
        async function fetchUsers(page: number) {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`http://localhost:8080/api/admin/users?page=${page}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                    },
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch users")
                }

                const data = await response.json()

                const formattedUsers: User[] = data.users.map((user: any) => ({
                    id: user._id,
                    name: user.fullname,
                    email: user.email,
                    role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                    status: "Active",
                }))

                setUsers(formattedUsers)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers(currentPage)
    }, [currentPage])

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Users</h1>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <DataTable columns={columns} data={users} />
                    <DataTablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    )
}
