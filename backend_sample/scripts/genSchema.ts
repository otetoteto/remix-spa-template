import { stringify } from "yaml";
import { app } from "../src/app";

const json = app.getOpenAPI31Document({
  openapi: "3.1.0",
  info: { version: "1.0.0", title: "Sample Post API" },
});

console.log(stringify(json));
