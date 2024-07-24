import type { ComponentPropsWithoutRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const style = tv({
  base:
    "rounded-md p-2 font-semibold outline-none transition-colors duration-300 " +
    "focus-visible:ring-2 active:opacity-80",
  variants: {
    color: {
      primary:
        "bg-emerald-600 text-slate-50 hover:bg-emerald-700 focus-visible:ring-emerald-500",
    },
    size: {
      sm: "px-2 py-1 font-normal text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
    disabled: {
      true: "cursor-not-allowed bg-emerald-800 opacity-40",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type Props = ComponentPropsWithoutRef<"button"> & VariantProps<typeof style>;

export function Button({ children, type = "button", ...buttonProps }: Props) {
  const { disabled, color, size, className } = buttonProps;

  return (
    <button
      type={type}
      {...buttonProps}
      className={style({ disabled, color, size, className })}
    >
      {children}
    </button>
  );
}
