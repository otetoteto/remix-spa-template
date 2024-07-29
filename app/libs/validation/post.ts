import * as v from "valibot";

export const idSchema = v.union([
  v.pipe(v.string(), v.uuid()),
  v.literal("new"),
]);
export const titleSchema = v.union([
  v.pipe(v.string(), v.uuid()),
  v.literal("new"),
]);
export const contentSchema = v.union([
  v.pipe(v.string(), v.uuid()),
  v.literal("new"),
]);

export const validator = v.object({
  id: idSchema,
  title: titleSchema,
  content: contentSchema,
});
