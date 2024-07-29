import { type VariantProps, tv } from "tailwind-variants";

const style = tv({
  base:
    "rounded-md font-semibold outline-none transition-colors duration-300 *:rounded-md *:outline-none " +
    "place-item-center grid active:opacity-80 has-[:focus-visible]:ring-2 " +
    "child:hasDisabled:cursor-not-allowed hasDisabled:cursor-not-allowed hasDisabled:opacity-40",
  variants: {
    color: {
      primary:
        "bg-emerald-600 text-slate-50 hover:bg-emerald-700 has-[:focus-visible]:ring-emerald-500",
      secondary:
        "bg-red-600 text-slate-100 hover:bg-red-700 has-[:focus-visible]:ring-red-500",
    },
    size: {
      sm: "font-normal text-sm *:px-2 *:py-1",
      md: "*:px-4 *:py-2",
      lg: "text-lg *:px-6 *:py-3",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type Props = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof style>;

export function Clickable({ children, ...styleProps }: Props) {
  const className = style(styleProps);
  return <div className={className}>{children}</div>;
}
