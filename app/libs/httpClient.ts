import createClient from "openapi-fetch";
import type { paths } from "../generated/openapi/schema";

export const httpClient = createClient<paths>({
  baseUrl: "http://localhost:3000",
});
