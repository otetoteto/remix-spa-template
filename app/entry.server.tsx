import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  _responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const html = `<!DOCTYPE html>\n${renderToString(<RemixServer context={remixContext} url={request.url} />)}`;
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
