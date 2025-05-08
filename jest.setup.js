import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { Request, Response, Headers } from 'node-fetch';

global.Request = Request;
global.Response = Response;
global.Headers = Headers;