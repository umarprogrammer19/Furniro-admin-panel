"use client"

import * as React from "react"
import { DataTable } from "@/components/data-table"
import { columns, type User } from "./columns"

export default function UsersPage() {
    const [users, setUsers] = React.useState<User[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("http://localhost:8080/api/admin/users", {
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
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Users</h1>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <DataTable columns={columns} data={users} />
            )}
        </div>
    )
}
