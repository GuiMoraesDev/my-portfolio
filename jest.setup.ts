import { TextEncoder, TextDecoder } from "util";

import { afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { cleanup } from "@testing-library/react";
import "whatwg-fetch";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// jsdom does not implement SVG geometry methods
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.SVGElement.prototype as any).getTotalLength = () => 0;

// jsdom does not implement IntersectionObserver (used by framer-motion useInView)
global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// @testing-library/react auto-cleanup uses global afterEach which is not
// injected when --injectGlobals false is set, so we wire it up manually.
afterEach(cleanup);
