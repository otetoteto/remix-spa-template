import { Await, Link, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { tv } from "tailwind-variants";
import { Clickable } from "../../components/Clickable/Clickable";
import { httpClient } from "../../libs/httpClient";
import { PostList } from "./PostList";

export const clientLoader = async () => {
  const data = httpClient.GET("/posts").then((res) => {
    if (res.error) {
      throw new Error("Failed to load posts");
    }
    return res.data.posts;
  });
  return defer({
    data,
  });
};

const style = tv({
  slots: {
    container: "@container flex min-h-screen w-full flex-col items-center",
    inner: "grid w-[min(1120px,100%)] grid-rows-[auto,1fr] gap-8",
    header: "grid w-full grid-cols-2 gap-4 place-self-center p-8",
    heading: "font-bold text-2xl text-slate-300",
  },
});

export default function Page() {
  const { data } = useLoaderData<typeof clientLoader>();

  const { container, inner, header, heading } = style();

  return (
    <div className={container()}>
      <div className={inner()}>
        <div className={header()}>
          <h1 className={heading()}>Blog Posts</h1>
          <Clickable size="sm" className="place-self-end">
            <Link to="/edit/new">+ New Post</Link>
          </Clickable>
        </div>
        <Suspense
          fallback={<p className="p-8 text-lg text-slate-300">loading...</p>}
        >
          <Await resolve={data}>{(posts) => <PostList posts={posts} />}</Await>
        </Suspense>
      </div>
    </div>
  );
}
