import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

interface DataTablePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function DataTablePagination({ currentPage, totalPages, onPageChange }: DataTablePaginationProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
