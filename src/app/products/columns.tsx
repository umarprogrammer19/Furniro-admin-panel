"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Image from "next/image";

export type Product = {
    _id: string;
    title: string;
    category: string;
    price: number;
    stock: number;
    discountPercentage: number;
    imageUrl: string;
};

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
            <Image src={row.getValue("imageUrl")} alt={row.original.title} width={50} height={50} className="rounded-md" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => {
            const price = Number.parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);
            return <div className="text-right font-medium">{formatted}</div>;
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "stock",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
        cell: ({ row }) => {
            const stock = Number.parseInt(row.getValue("stock"));
            return <Badge variant={stock > 50 ? "default" : "destructive"}>{stock}</Badge>;
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "discountPercentage",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
        cell: ({ row }) => <div>{row.getValue("discountPercentage")}%</div>,
        enableSorting: true,
        enableHiding: true,
    },
];
