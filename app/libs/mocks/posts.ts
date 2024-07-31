import { faker } from "@faker-js/faker";
import { http, type DefaultBodyType, HttpResponse, type PathParams } from "msw";
import type { paths } from "../../generated/openapi/schema";

type GetPostRes =
  paths["/posts/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
export function createGetPostsMockHandler({
  empty = false,
  post = {},
}: { empty: boolean; post?: Partial<GetPostRes> }) {
  return http.get<PathParams, DefaultBodyType, GetPostRes>("/posts", () => {
    if (empty) {
      return HttpResponse.json({});
    }

    return HttpResponse.json({
      post: {
        id: faker.string.uuid(),
        title: faker.lorem.slug(3),
        content: faker.lorem.paragraphs(3),
        ...post,
      },
    });
  });
}

type PostPostRes =
  paths["/posts"]["post"]["responses"]["200"]["content"]["application/json"];
export function createPostPostsMockHandler({
  post = {},
}: { post?: Partial<PostPostRes> }) {
  return http.post<PathParams, DefaultBodyType, PostPostRes>("/posts", () => {
    return HttpResponse.json({
      post: {
        id: faker.string.uuid(),
        title: faker.lorem.slug(3),
        content: faker.lorem.paragraphs(3),
        ...post,
      },
    });
  });
}
