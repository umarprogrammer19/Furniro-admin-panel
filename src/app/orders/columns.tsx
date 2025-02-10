"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";

export type Order = {
    _id: string;
    customer: string;
    email: string;
    totalPrice: number;
    status: string;
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
        cell: ({ row }) => <div className="font-mono">{row.getValue("_id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "customer",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
        cell: ({ row }) => <div>{row.getValue("customer")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Email" />,
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Price" />,
        cell: ({ row }) => {
            const price = Number(row.getValue("totalPrice"));
            return <div className="text-right font-medium">${price.toFixed(2)}</div>;
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge variant={status === "completed" ? "default" : status === "pending" ? "destructive" : "secondary"}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "orderDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order Date" />,
        cell: ({ row }) => <div>{row.getValue("orderDate")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
];
