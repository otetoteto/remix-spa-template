import { randomUUID } from "node:crypto";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const app = new OpenAPIHono();

function randomSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * ms));
}

const PostSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  })
  .openapi("Post");

type Post = z.infer<typeof PostSchema>;

let posts: Post[] = [
  {
    id: randomUUID(),
    title: "Hello World",
    content: "This is a sample post",
  },
  {
    id: randomUUID(),
    title: "Another Post",
    content: "This is another sample post",
  },
];

app.openapi(
  createRoute({
    method: "get",
    path: "/posts",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              posts: z.array(PostSchema),
            }),
          },
        },
        description: "Retrieve the user",
      },
    },
  }),
  async (c) => {
    await randomSleep(1000);
    return c.json({ posts }, 200);
  },
);

app.openapi(
  createRoute({
    method: "get",
    path: "/posts/{id}",
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              post: PostSchema.optional(),
            }),
          },
        },
        description: "Retrieve the user",
      },
    },
  }),
  async (c) => {
    await randomSleep(1000);
    const { id } = c.req.valid("param");
    const post = posts.find((p) => p.id === id);
    return c.json({ post }, 200);
  },
);

app.openapi(
  createRoute({
    method: "post",
    path: "/posts",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: z
              .object({
                id: z.string(),
                title: z.string(),
                content: z.string(),
              })
              .openapi("CreatePostInput"),
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              post: PostSchema,
            }),
          },
        },
        description: "Retrieve the user",
      },
    },
  }),
  async (c) => {
    await randomSleep(1000);
    const { id, title, content } = c.req.valid("json");
    const postId = id === "new" ? randomUUID() : id;

    const post = { id: postId, title, content };

    const idx = posts.findIndex((p) => p.id === postId);
    if (idx !== -1) {
      posts[idx] = post;
    } else {
      posts.push(post);
    }

    return c.json({ post }, 200);
  },
);

app.openapi(
  createRoute({
    method: "delete",
    path: "/posts",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: z
              .object({
                id: z.string(),
              })
              .openapi("DeletePostInput"),
          },
        },
      },
    },
    responses: {
      204: {
        description: "Retrieve the user",
      },
    },
  }),
  async (c) => {
    await randomSleep(1000);
    const { id } = c.req.valid("json");

    posts = posts.filter((p) => p.id !== id);

    return new Response(null, { status: 204 });
  },
);
