import "@testing-library/jest-dom";
import { server } from "./src/__mocks__/server";

// for fetch API requests to work in tests as how fetch works in the browser
import "isomorphic-fetch";

// resolve c3 import issue as jsdom doesn't support SVGPathElement API provided by c3
// source: https://stackoverflow.com/questions/61986136/typeerror-cannot-read-property-prototype-of-undefined-when-jest-testing-rea
window.SVGPathElement = jest.fn();

beforeAll(() => {
  server.listen(); // start mock server (msw)
});

afterEach(() => {
  server.resetHandlers(); // reset mock server (msw) handlers
});

afterAll(() => {
  server.close(); // close mock server (msw)
});
