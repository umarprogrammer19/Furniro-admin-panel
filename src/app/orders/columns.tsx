"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { updateOrderStatus } from "@/lib/api/fetchOrders";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from 'lucide-react';
import { toast } from "sonner";

export type Order = {
    _id: string;
    customer: string;
    email: string;
    totalPrice: number;
    status: "pending" | "completed" | "shipped";
    orderDate: string;
};
export const columns: ColumnDef<Order>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }) => <div className="font-medium">{row.getValue("_id")}</div>,
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => <div>{row.getValue("customer")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
        cell: ({ row }) => {
            const amount: number = row.getValue("totalPrice");
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {

            const orderId: string = row.original._id;
            const currentStatus: "pending" | "completed" | "shipped" = row.getValue("status");

            const handleStatusUpdate = async (newStatus: "pending" | "completed" | "shipped") => {
                try {
                    await updateOrderStatus(orderId, newStatus);
                    toast.success(`Order status updated to ${newStatus}`);
                    row.original.status = newStatus;
                } catch (error) {
                    if (error instanceof Error)
                        toast.error(error.message);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-full justify-start">
                            <Badge
                                className={` ${currentStatus === "pending" ? "bg-yellow-500 text-white" : ""} ${currentStatus === "completed" ? "bg-green-500 text-white" : ""} ${currentStatus === "shipped" ? "bg-blue-500 text-white" : ""}`}
                            >
                                {currentStatus}
                            </Badge>

                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onSelect={() => handleStatusUpdate("pending")}>Pending</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleStatusUpdate("completed")}>Completed</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleStatusUpdate("shipped")}>Shipped</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: ({ row }) => <div>{row.getValue("orderDate")}</div>,
    },
];
