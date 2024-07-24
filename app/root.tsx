import { Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./tailwind.css";

export function HydrateFallback() {
  return (
    <>
      <p>Loading...</p>
      <Scripts />
      <ScrollRestoration />
    </>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
      <Scripts />
      <ScrollRestoration />
    </>
  );
}
