"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface OverviewProps {
    orders: any[]
}

export function Overview({ orders }: OverviewProps) {
    // Group orders by month and calculate total revenue for each month
    const groupedOrders = orders.reduce((acc, order) => {
        const month = new Date(order.orderDate).toLocaleString("default", { month: "short" })
        if (!acc[month]) acc[month] = 0
        acc[month] += order.totalPrice
        return acc
    }, {})

    // Create data for the chart
    const data = Object.keys(groupedOrders).map((month) => ({
        name: month,
        total: groupedOrders[month],
    }))

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
