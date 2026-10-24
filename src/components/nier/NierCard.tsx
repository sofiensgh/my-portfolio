import { cn } from "@/lib/utils";
import { NierCorners } from "./NierCorners";

interface NierCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "article";
}

/** Bordered panel with bracket corners and a hover scan sweep. */
export function NierCard({ as: Tag = "div", className, children, ...props }: NierCardProps) {
  return (
    <Tag
      className={cn(
        "nier-interactive group relative border border-foreground/10 bg-card/60 transition-colors duration-300 hover:border-foreground/25",
        className,
      )}
      {...props}
    >
      <NierCorners />
      {children}
    </Tag>
  );
}
