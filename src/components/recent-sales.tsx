import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentSalesProps {
    orders: any[]
}

export function RecentSales({ orders }: RecentSalesProps) {
    return (
        <div className="space-y-8">
            {orders.slice(6, 11).map((order, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>
                            {order.user.fullname
                                .split(" ")
                                .map((name: string) => name.charAt(0).toUpperCase())
                                .join("")}
                        </AvatarFallback>

                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{order.user.fullname}</p>
                        <p className="text-sm text-muted-foreground">Total: ${order.totalPrice}</p>
                    </div>
                    <div className="ml-auto font-medium">+${order.totalPrice}</div>
                </div>
            ))}
        </div>
    )
}
