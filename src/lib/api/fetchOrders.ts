import { BASE_URL } from "./base-url"

export async function fetchOrders(page: number, limit = 12) {
    const response = await fetch(`${BASE_URL}/api/admin/orders?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
        },
    })

    if (!response.ok) {
        throw new Error("Failed to fetch orders")
    }

    const data = await response.json()

    return {
        orders: data.orders.map((order: any) => ({
            _id: order._id,
            customer: order.user ? order.user.fullname : "Guest",
            email: order.user ? order.user.email : "No Email",
            totalPrice: order.totalPrice,
            status: order.status,
            orderDate: new Date(order.orderDate).toLocaleDateString("en-US"),
        })),
        currentPage: data.currentPage,
        totalPages: data.totalPages,
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const response = await fetch(`${BASE_URL}/api/admin/orders/updateStatus/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
        },
        body: JSON.stringify({ status: newStatus }),
    })

    if (!response.ok) {
        throw new Error("Failed to update order status")
    }

    return response.json()
}

