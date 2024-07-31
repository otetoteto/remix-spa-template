import base from "@playwright/test";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";

export const integrationTest = base.extend<{
  worker: MockServiceWorker;
}>({
  worker: createWorkerFixture(),
});
