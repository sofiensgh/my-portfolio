import { forwardRef } from "react";
import { createLink } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { NierCorners } from "./NierCorners";

type Variant = "primary" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "border border-foreground/40 bg-foreground/5 text-foreground/80 hover:border-foreground/60 hover:bg-foreground/10 hover:text-foreground",
  outline:
    "border border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:text-foreground",
};

const base =
  "nier-interactive group relative inline-flex items-center justify-center gap-3 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-30";

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NierCorners size="sm" />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </>
  );
}

interface NierButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function NierButton({
  variant = "outline",
  className,
  children,
  type = "button",
  ...props
}: NierButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...props}>
      <Inner>{children}</Inner>
    </button>
  );
}

interface NierAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

/** Plain anchor with the NieR button look — use for external links. */
export const NierAnchor = forwardRef<HTMLAnchorElement, NierAnchorProps>(
  ({ variant = "outline", className, children, ...props }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], className)} {...props}>
      <Inner>{children}</Inner>
    </a>
  ),
);
NierAnchor.displayName = "NierAnchor";

/** Router-aware link with the NieR button look. */
export const NierLink = createLink(NierAnchor);
