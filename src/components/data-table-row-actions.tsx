"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";

// Accept userId prop
interface DataTableRowActionsProps {
    userId: string;
}

export function DataTableRowActions({ userId }: DataTableRowActionsProps) {
    const [loading, setLoading] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    // Handle field changes in the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitEdit = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/admin/users/update/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update the user.");
            }

            toast.success("User updated successfully!");
            setDrawerOpen(false);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/admin/users/delete/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("UFO_AUTH_TOKEN")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete the user.");
            }

            toast.success("User deleted successfully!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

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
                    <DropdownMenuItem onClick={() => setDrawerOpen(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        {loading ? "Deleting..." : "Delete"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Drawer for editing user */}
            <Dialog.Root open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                <Dialog.Trigger />
                <Dialog.Content>
                    <Dialog.Title>Edit User</Dialog.Title>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                            />
                        </div>
                        <Button onClick={handleSubmitEdit} disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
}
