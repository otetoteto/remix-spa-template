import { Link as RemixLink } from "@remix-run/react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof RemixLink> & {
  disabled?: boolean;
};

export function Link({ disabled, children, className, ...linkProps }: Props) {
  if (disabled) {
    return (
      <span aria-disabled={disabled} className={className}>
        {children}
      </span>
    );
  }

  return (
    <RemixLink {...linkProps} className={className}>
      {children}
    </RemixLink>
  );
}
