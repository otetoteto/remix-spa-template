import * as v from "valibot";

export const idSchema = v.union([
  v.pipe(v.string(), v.uuid()),
  v.literal("new"),
]);
export const titleSchema = v.pipe(v.string(), v.minLength(1), v.maxLength(80));
export const contentSchema = v.pipe(v.string(), v.minLength(1));

export const validator = v.object({
  id: idSchema,
  title: titleSchema,
  content: contentSchema,
});
