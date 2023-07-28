import { rest } from "msw";
import { users, projects, gateways, reports } from "./data";
import { ENDPOINTS } from "../endpoints";

/* Define custom API responses in the list of handlers via the msw library */
/* Further reading: https://kentcdodds.com/blog/stop-mocking-fetch#colocation-and-erroredge-case-testing */

const handlers = [
  rest.get(ENDPOINTS.USERS, async (_req, res, ctx) => {
    return res(ctx.json(users.happyPath));
  }),
  rest.get(ENDPOINTS.PROJECTS, async (_req, res, ctx) => {
    return res(ctx.json(projects.happyPath));
  }),
  rest.get(ENDPOINTS.GATEWAYS, async (_req, res, ctx) => {
    return res(ctx.json(gateways.happyPath));
  }),
  rest.post(ENDPOINTS.REPORT, async (req, res, ctx) => {
    const { projectId, gatewayId } = await req.json();

    if (projectId == "" && gatewayId == "") {
      return res(ctx.json(reports.happyPathAllProjectsAllGateways));
    } else if (projectId && gatewayId == "") {
      return res(ctx.json(reports.happyPathAllProjectsOneGateway));
    } else if (projectId == "" && gatewayId) {
      return res(ctx.json(reports.happyPathOneProjectAllGateways));
    } else if (projectId && gatewayId) {
      return res(ctx.json(reports.happyPathOneProjectOneGateway));
    }

    return res(ctx.json(reports.unhappyPathNoReports));
  }),
];

export { handlers };
