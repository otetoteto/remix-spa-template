import { useFetcher } from "@remix-run/react";
import { tv } from "tailwind-variants";
import { Clickable } from "../../components/Clickable/Clickable";
import { Link } from "../../components/Link/Link";
import type { components } from "../../generated/openapi/schema";

const style = tv({
  slots: {
    list: "grid grid-cols-3 gap-8 px-8",
    item: "grid gap-2 rounded border-2 border-slate-500 p-4",
    title: "font-semibold text-lg text-slate-300",
    content: "text-slate-300",
    buttonGroup: "grid grid-flow-col gap-2 place-self-end",
  },
});

type Props = {
  posts: components["schemas"]["Post"][];
};

export function PostList({ posts }: Props) {
  const { list, item, title, content, buttonGroup } = style();

  const fetcher = useFetcher();
  const disabled = fetcher.state !== "idle";

  if (posts.length === 0) {
    return <p className="px-8 text-slate-300">No posts found</p>;
  }

  return (
    <ul className={list()}>
      {posts.map((post) => (
        <li key={post.id} className={item()}>
          <h2 className={title()}>{post.title}</h2>
          <p className={content()}>{post.content}</p>
          <div className={buttonGroup()}>
            <Clickable size="sm">
              <Link to={`/edit/${post.id}`} disabled={disabled}>
                Edit
              </Link>
            </Clickable>
            <fetcher.Form action="/delete" method="POST">
              <input type="hidden" name="postId" value={post.id} />
              <Clickable size="sm" color="secondary">
                <button type="submit" disabled={disabled}>
                  Delete
                </button>
              </Clickable>
            </fetcher.Form>
          </div>
        </li>
      ))}
    </ul>
  );
}
