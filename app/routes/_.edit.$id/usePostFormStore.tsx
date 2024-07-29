import { createContext, useContext, useState } from "react";
import { is } from "valibot";
import { create } from "zustand";
import * as postSchema from "../../libs/validation/post";
import { assertNonNullable } from "../../utils/assert";

type PostFormState = {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
};

function createPostFormStore(initial: Partial<PostFormState>) {
  return create<PostFormState>((set) => ({
    title: "",
    content: "",
    setTitle: (title: string) => set((state) => ({ ...state, title })),
    setContent: (content: string) => set((state) => ({ ...state, content })),
    ...initial,
  }));
}

const PostFormStoreContext = createContext<null | ReturnType<
  typeof createPostFormStore
>>(null);

type Props = {
  children: React.ReactNode;
  initialState: Partial<PostFormState>;
};
export function PostFormStoreProvider({ children, initialState }: Props) {
  const [store] = useState(() => createPostFormStore(initialState));

  return (
    <PostFormStoreContext.Provider value={store}>
      {children}
    </PostFormStoreContext.Provider>
  );
}

export function usePostFormStore() {
  const store = useContext(PostFormStoreContext);
  assertNonNullable(store);
  return store;
}

export function postTitleErrorSelector(state: PostFormState) {
  return is(postSchema.titleSchema, state.title);
}

export function postContentErrorSelector(state: PostFormState) {
  return is(postSchema.contentSchema, state.content);
}

export function postFormValidSelector(state: PostFormState) {
  return postTitleErrorSelector(state) && postContentErrorSelector(state);
}
