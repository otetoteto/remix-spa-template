import {
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  Form,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import { tv } from "tailwind-variants";
import { Button } from "../../components/Button/Button";
import { useFormItem } from "../../hooks/useFormItem";
import { httpClient } from "../../libs/httpClient";
import { assertNonNullable } from "../../utils/assert";

export const clientAction = async ({
  request,
  params,
}: ClientActionFunctionArgs) => {
  const body = await request.formData();

  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const id = params["id"];
  const title = body.get("title")?.toString();
  const content = body.get("content")?.toString();
  assertNonNullable(id);
  assertNonNullable(title);
  assertNonNullable(content);

  await httpClient.POST("/posts", {
    body: {
      id,
      title,
      content,
    },
  });
  return redirect("/");
};

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const id = params["id"];
  assertNonNullable(id);

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
    title:
      "border-slate-500 border-b-2 bg-inherit px-1 text-lg leading-6 outline-none " +
      "font-semibold focus-visible:border-emerald-600",
    content:
      "min-h-56 resize-none rounded border-2 border-slate-500 bg-inherit p-1 text-lg leading-6 " +
      "font-semibold outline-none focus-visible:border-emerald-600",
  },
});

export default function Page() {
  const { container, formContainer, heading, form, title, content } = style();

  const [titleId, renderTitleForm] = useFormItem();
  const [contentId, renderContentForm] = useFormItem();

  const { post } = useLoaderData<typeof clientLoader>();

  return (
    <div className={container()}>
      <div className={formContainer()}>
        <h1 className={heading()}>Write Post</h1>
        <Form className={form()} method="post">
          {renderTitleForm(
            "Title",
            <input
              type="text"
              name="title"
              id={titleId}
              className={title()}
              defaultValue={post?.title}
            />,
          )}
          {renderContentForm(
            "Content",
            <textarea
              name="content"
              id={contentId}
              className={content()}
              defaultValue={post?.content}
            />,
          )}
          <Button type="submit">Post</Button>
        </Form>
      </div>
    </div>
  );
}
