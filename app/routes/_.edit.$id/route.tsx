import {
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  Form,
  json,
  redirect,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { tv } from "tailwind-variants";
import * as v from "valibot";
import { useStore } from "zustand";
import { Clickable } from "../../components/Clickable/Clickable";
import { httpClient } from "../../libs/httpClient";
import * as postSchema from "../../libs/validation/post";
import { ContentInput } from "./ContentInput";
import { TitleInput } from "./TitleInput";
import {
  PostFormStoreProvider,
  postFormValidSelector,
  usePostFormStore,
} from "./usePostFormStore";

export const clientAction = async ({
  request,
  params,
}: ClientActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    const body = v.parse(postSchema.validator, {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      id: params["id"],
      title: formData.get("title")?.toString(),
      content: formData.get("content")?.toString(),
    });

    await httpClient.POST("/posts", {
      body,
    });
    return redirect("/");
  } catch (error) {
    return json({ error }, 400);
  }
};

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const id = v.parse(postSchema.idSchema, params["id"]);

  if (id === "new") {
    return {};
  }

  const { data, error } = await httpClient.GET("/posts/{id}", {
    params: { path: { id } },
  });
  if (error) {
    throw new Error("Failed to load post");
  }
  return data;
};

const style = tv({
  slots: {
    container: "@container grid min-h-screen place-items-center",
    formContainer:
      "grid max-h-min w-[clamp(450px,45cqi,680px)] place-items-center gap-4 p-8 " +
      "rounded-md border border-slate-300 bg-slate-400",
    heading: "font-bold text-2xl",
    form: "grid w-full gap-4",
  },
});

export default function Page() {
  const { container, formContainer, heading, form } = style();
  const { post } = useLoaderData<typeof clientLoader>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <div className={container()}>
      <div className={formContainer()}>
        <h1 className={heading()}>Write Post</h1>
        <PostFormStoreProvider initialState={post ?? {}}>
          <Form className={form()} method="post">
            <TitleInput disabled={isSubmitting} />
            <ContentInput disabled={isSubmitting} />
            <Submit isSubmitting={isSubmitting} />
          </Form>
        </PostFormStoreProvider>
      </div>
    </div>
  );
}

function Submit({ isSubmitting }: { isSubmitting: boolean }) {
  const store = usePostFormStore();
  const isValid = useStore(store, postFormValidSelector);

  return (
    <Clickable>
      <button type="submit" disabled={isSubmitting || !isValid}>
        Post
      </button>
    </Clickable>
  );
}
