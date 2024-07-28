import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { assertNonNullable } from "./utils/assert";

const app = document.querySelector("#app");
assertNonNullable(app);

startTransition(() => {
  hydrateRoot(
    app,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
