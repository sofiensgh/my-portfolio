import { cn } from "@/lib/utils";

const positions = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

const sizes = {
  sm: "h-[6px] w-[6px] group-hover:h-[10px] group-hover:w-[10px]",
  md: "h-2 w-2 group-hover:h-4 group-hover:w-4",
};

/** Four bracket corners that grow when the parent `.group` is hovered. */
export function NierCorners({ size = "md" }: { size?: keyof typeof sizes }) {
  return (
    <>
      {positions.map((p) => (
        <span
          key={p}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute border-foreground/20 transition-all duration-300 group-hover:border-foreground/45",
            p,
            sizes[size],
          )}
        />
      ))}
    </>
  );
}
