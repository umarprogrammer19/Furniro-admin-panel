import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

async function getOrders() {
    // Fetch orders from an API here
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
        // Add more order data here
    ]
}

export default async function OrdersPage() {
    const orders = await getOrders()

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Orders</h1>
            <DataTable columns={columns} data={orders} />
        </div>
    )
}

