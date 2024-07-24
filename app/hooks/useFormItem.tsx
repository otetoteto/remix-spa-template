import { type ReactNode, useId } from "react";
import { tv } from "tailwind-variants";

const itemStyle = tv({
  slots: {
    container: "group grid gap-1",
    label: "has-[+_:focus-visible]:text-emerald-700",
  },
});

export function useFormItem() {
  const id = useId();
  const { container, label: labelClass } = itemStyle();

  const renderFormItem = (label: string, formItem: ReactNode) => {
    return (
      <div className={container()}>
        <label htmlFor={id} className={labelClass()}>
          {label}
        </label>
        {formItem}
      </div>
    );
  };

  return [id, renderFormItem] as const;
}
