import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronUpDownIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

export function DataTableColumnHeader({
    column,
    title,
    className,
}) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger
                    nativeButton={true}
                    render={
                        <button
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                "-ml-3 h-8 data-[state=open]:bg-accent"
                            )}
                        >
                            <span>{title}</span>
                            {column.getIsSorted() === "desc" ? (
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            ) : column.getIsSorted() === "asc" ? (
                                <ChevronUpIcon className="ml-2 h-4 w-4" />
                            ) : (
                                <ChevronUpDownIcon className="ml-2 h-4 w-4" />
                            )}
                        </button>
                    }
                />
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ChevronUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ChevronDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeSlashIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Ocultar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
