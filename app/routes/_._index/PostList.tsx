import { useNavigate } from "@remix-run/react";
import { tv } from "tailwind-variants";
import { Button } from "../../components/Button/Button";
import type { components } from "../../generated/openapi/schema";

const style = tv({
  slots: {
    list: "grid grid-cols-3 gap-8 px-8",
    item: "grid gap-2 rounded border-2 border-slate-500 p-4",
    title: "font-semibold text-lg text-slate-300",
    content: "text-slate-300",
  },
});

type Props = {
  posts: components["schemas"]["Post"][];
};

export function PostList({ posts }: Props) {
  const navigate = useNavigate();
  const { list, item, title, content } = style();

  return (
    <ul className={list()}>
      {posts.map((post) => (
        <li key={post.id} className={item()}>
          <h2 className={title()}>{post.title}</h2>
          <p className={content()}>{post.content}</p>
          <Button
            size="sm"
            className="place-self-end"
            onClick={() => {
              navigate(`/edit/${post.id}`);
            }}
          >
            Edit
          </Button>
        </li>
      ))}
    </ul>
  );
}
