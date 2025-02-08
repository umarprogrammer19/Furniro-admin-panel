"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { toast } from "sonner";

// Accept userId prop
interface DataTableRowActionsProps {
    userId: string
}

export function DataTableRowActions({ userId }: DataTableRowActionsProps) {
    const [loading, setLoading] = useState(false);

    const handleEdit = () => {
        console.log("Edit user with ID:", userId);
        // Add your edit logic here
    }


    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/admin/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete the user.");
            }

            toast.success("User deleted successfully!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center pt-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>{loading ? "Deletin..." : "Delete"}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
