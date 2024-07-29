import { handler } from "@tailwindcss/container-queries";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default withTV({
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    handler,
    plugin(({ addVariant }) => {
      addVariant("hasDisabled", [
        '&:has([aria-disabled="true"])',
        "&:has(*:disabled)",
      ]);
      addVariant("child", "& > *");
    }),
  ],
} satisfies Config);
