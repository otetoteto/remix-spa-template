import { tv } from "tailwind-variants";
import { useStore } from "zustand";
import { useFormItem } from "../../hooks/useFormItem";
import { postTitleErrorSelector, usePostFormStore } from "./usePostFormStore";

const style = tv({
  slots: {
    box: "grid gap-1",
    title:
      "border-slate-500 border-b-2 bg-inherit px-1 text-lg leading-6 outline-none " +
      "font-semibold focus-visible:border-emerald-600",
    helper: "text-slate-700 text-xs",
  },
  variants: {
    isValid: {
      true: {
        helper: "text-emerald-700",
      },
    },
  },
});

type Props = {
  disabled?: boolean;
};

export function TitleInput({ disabled }: Props) {
  const [titleId, renderTitleForm] = useFormItem();
  const { box, title: titleClass, helper } = style();

  const store = usePostFormStore();
  const isValid = useStore(store, postTitleErrorSelector);
  const title = useStore(store, (s) => s.title);
  const setTitle = useStore(store, (s) => s.setTitle);

  return renderTitleForm(
    "Title",
    <div className={box()}>
      <input
        type="text"
        name="title"
        id={titleId}
        className={titleClass()}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={disabled}
      />
      <span className={helper({ isValid })}>
        {isValid ? "OK: " : ""}minLength: 1, maxLength: 80
      </span>
    </div>,
  );
}
