import { Outlet } from "@remix-run/react";
import { tv } from "tailwind-variants";

const style = tv({
  slots: {
    container: "min-h-screen bg-slate-800",
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
