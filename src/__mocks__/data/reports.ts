export const happyPathOneProjectOneGateway = {
  code: "200",
  data: [
    {
      paymentId: "6149cf563b647833c9d1a9f2",
      amount: 947.03,
      projectId: "bgYhx",
      gatewayId: "i6ssp",
      userIds: ["rahej"],
      modified: "2021-03-01",
      created: "2021-02-18",
    },
    {
      paymentId: "6149cf5665b9e1243ec9a07b",
      amount: 164.07,
      projectId: "bgYhx",
      gatewayId: "i6ssp",
      userIds: ["rahej"],
      modified: "2021-08-21",
      created: "2021-02-06",
    },
  ],
  error: null,
};

export const happyPathOneProjectAllGateways = {
  code: "200",
  data: [
    {
      paymentId: "6149cf563b647833c9d1a9f2",
      amount: 947.03,
      projectId: "bgYhx",
      gatewayId: "i6ssp",
      userIds: ["rahej"],
      modified: "2021-03-01",
      created: "2021-02-18",
    },
    {
      paymentId: "6149cf56039cb62733114812",
      amount: 72.87,
      projectId: "bgYhx",
      gatewayId: "GzFF8",
      userIds: ["rahej"],
      modified: "2021-08-27",
      created: "2021-02-15",
    },
    {
      paymentId: "6149cf5665b9e1243ec9a07b",
      amount: 164.07,
      projectId: "bgYhx",
      gatewayId: "i6ssp",
      userIds: ["rahej"],
      modified: "2021-08-21",
      created: "2021-02-06",
    },
  ],
  error: null,
};

export const happyPathAllProjectsOneGateway = {
  code: "200",
  data: [
    {
      paymentId: "6149cf56039cb62733114812",
      amount: 72.87,
      projectId: "bgYhx",
      gatewayId: "GzFF8",
      userIds: ["rahej"],
      modified: "2021-08-27",
      created: "2021-02-15",
    },
  ],
  error: null,
};

export const happyPathAllProjectsAllGateways = {
  code: "200",
  data: [
    {
      paymentId: "6149cf563b647833c9d1a9f2",
      amount: 947.03,
      projectId: "bgYhx",
      gatewayId: "i6ssp",
      userIds: ["rahej"],
      modified: "2021-03-01",
      created: "2021-02-18",
    },
    {
      paymentId: "6149cf56039cb62733114812",
      amount: 72.87,
      projectId: "bgYhx",
      gatewayId: "GzFF8",
      userIds: ["rahej"],
      modified: "2021-08-27",
      created: "2021-02-15",
    },
    {
      paymentId: "6149cf5665b9e1243ec9a07b",
      amount: 164.07,
      projectId: "bgYhx",
      gatewayId: "i6ssp",
      userIds: ["rahej"],
      modified: "2021-08-21",
      created: "2021-02-06",
    },
  ],
  error: null,
};

export const unhappyPathNoReports = {
  code: "200",
  data: [],
  error: null,
};
