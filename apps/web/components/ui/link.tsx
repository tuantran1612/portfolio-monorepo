import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost";
  borderRadiuss?: "default" | "sm" | "xs" | "lg" | "roundPill";
  size?: "default" | "sm" | "lg";
  className?: string;
  target?: string;
}

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const sizeClasses = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-8 text-sm",
};

const borderRadius = {
  default: "rounded-xs",
  xs: "rounded-sm",
  sm: "rounded-md",
  lg: "rounded-lg",
  roundPill: "rounded-4xl",
};
export function LinkButton({
  href,
  children,
  variant = "default",
  size = "default",
  borderRadiuss = "default",
  className,
  target,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        borderRadius[borderRadiuss],
        className
      )}>
      {children}
    </Link>
  );
}
