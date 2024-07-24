import { handler } from "@tailwindcss/container-queries";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

export default withTV({
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [handler],
} satisfies Config);
