import { tv } from "tailwind-variants";
import { useStore } from "zustand";
import { useFormItem } from "../../hooks/useFormItem";
import { postContentErrorSelector, usePostFormStore } from "./usePostFormStore";

type Props = {
  disabled?: boolean;
};

const style = tv({
  slots: {
    box: "grid gap-1",
    content:
      "min-h-56 resize-none rounded border-2 border-slate-500 bg-inherit p-1 text-lg leading-6 " +
      "font-semibold outline-none focus-visible:border-emerald-600",
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

export function ContentInput({ disabled }: Props) {
  const [contentId, renderContentForm] = useFormItem();
  const { box, content: contentClass, helper } = style();

  const store = usePostFormStore();
  const isValid = useStore(store, postContentErrorSelector);
  const content = useStore(store, (s) => s.content);
  const setContent = useStore(store, (s) => s.setContent);

  return renderContentForm(
    "Content",
    <div className={box()}>
      <textarea
        name="content"
        id={contentId}
        className={contentClass()}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={disabled}
      />
      <span className={helper({ isValid })}>
        {isValid ? "OK: " : ""}minLength: 1
      </span>
    </div>,
  );
}
