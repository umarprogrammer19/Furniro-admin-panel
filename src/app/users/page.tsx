import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

async function getUsers() {
    // Fetch users from an API here
    return [
        {
            id: "728ed52f",
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
        },
        {
            id: "489e1d42",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            status: "Inactive",
        },
        // Add more user data here
    ]
}

export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Users</h1>
            <DataTable columns={columns} data={users} />
        </div>
    )
}

