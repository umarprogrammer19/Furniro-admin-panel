"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface OverviewProps {
    orders: any[]
}

export function Overview({ orders }: OverviewProps) {
    // Group orders by day (use day and month to make the date unique)
    const groupedOrders = orders.reduce((acc, order) => {
        const day = new Date(order.orderDate).toLocaleDateString("en-US")
        if (!acc[day]) acc[day] = 0
        acc[day] += order.totalPrice
        return acc
    }, {})

    // Create data for the chart (grouped by day)
    const data = Object.keys(groupedOrders).map((day) => ({
        name: day,
        total: groupedOrders[day],
    }))

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(tick) => {
                        return tick.length > 10 ? tick.slice(0, 10) + '...' : tick
                    }}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        padding: "10px",
                    }}
                    labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
