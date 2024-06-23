import { TextEncoder, TextDecoder } from "util";
import 'es6-promise/auto'; 
import 'isomorphic-fetch'; 
const { Response, Headers, Request } = require('whatwg-fetch')

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Response = Response;
global.Headers = Headers;
global.Request = Request;