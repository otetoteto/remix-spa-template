import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { app } from "./app";

const myApp = new Hono();

myApp.use(cors());
myApp.route("/", app);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: myApp.fetch,
  port,
});
