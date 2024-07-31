import { Outlet } from "@remix-run/react";
import { tv } from "tailwind-variants";

const style = tv({
  slots: {
    container: "min-h-screen",
  },
});

export default function Layout() {
  const { container } = style();

  return (
    <div className={container()}>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
