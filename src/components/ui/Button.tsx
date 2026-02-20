"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest",
    {
        variants: {
            variant: {
                default:
                    "bg-foreground text-background hover:bg-primary hover:text-white shadow-sm",
                outline:
                    "border border-foreground bg-transparent hover:bg-foreground hover:text-background",
                secondary:
                    "bg-secondary text-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-foreground",
                link: "text-foreground underline-offset-4 hover:underline",
                luxury: "bg-primary text-white hover:bg-primary/90 shadow-md transform hover:-translate-y-0.5",
            },
            size: {
                default: "h-12 px-8 py-2",
                sm: "h-9 px-4 py-2 text-xs",
                lg: "h-14 px-10 py-3 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
