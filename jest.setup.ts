import { TextEncoder, TextDecoder } from "util";

import "whatwg-fetch";

global.TextEncoder = TextEncoder;
// @ts-expect-error - Node.js types do not include TextDecoder on global
global.TextDecoder = TextDecoder;
