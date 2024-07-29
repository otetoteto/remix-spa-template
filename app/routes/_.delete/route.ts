import type { ClientActionFunction } from "@remix-run/react";
import { parse } from "valibot";
import { httpClient } from "../../libs/httpClient";
import { idSchema } from "../../libs/validation/post";

export const clientAction: ClientActionFunction = async ({ request }) => {
  const body = await request.formData();
  const postId = parse(idSchema, body.get("postId")?.toString());

  await httpClient.DELETE("/posts", {
    body: {
      id: postId,
    },
  });
  return {};
};
