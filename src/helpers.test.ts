import {
  getChartColors,
  getUserInitials,
  isGateways,
  transformData,
  transformDataToChartFormat,
  transformProjectsToDictionary,
  transformGatewaysToDictionary,
} from "./helpers";

describe("helpers.ts", () => {
  describe("getUserInitials()", () => {
    it("should return the first letter of the first and last name", () => {
      expect(getUserInitials("Mary", "Jane")).toEqual("MJ");
    });

    it("should return the first letter of the first name if the last name is empty", () => {
      expect(getUserInitials("Mary", "")).toEqual("M");
    });

    it("should return the first letter of the last name if the first name is empty", () => {
      expect(getUserInitials("", "Jane")).toEqual("J");
    });

    it("should return an empty string if both the first and last name are empty", () => {
      expect(getUserInitials("", "")).toEqual("");
    });
  });

  describe("transformProjectsToDictionary()", () => {
    it("should transform an array of projects into a dictionary", () => {
      // given
      const projects = [
        {
          projectId: "bgYhx",
          userIds: ["rahej"],
          rule: "Manual Selection",
          gatewayIds: ["gDJ2s"],
          structure: "Sole proprietorship",
          industry: "IT",
          website: "https://mvpmatch.co/",
          description:
            "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
          image: "https://mvpmatch.co/images/logo.svg",
          name: "Project 2",
        },
      ];

      // when
      const result = transformProjectsToDictionary(projects);

      // then
      expect(result).toEqual({
        bgYhx: {
          projectId: "bgYhx",
          userIds: ["rahej"],
          rule: "Manual Selection",
          gatewayIds: ["gDJ2s"],
          structure: "Sole proprietorship",
          industry: "IT",
          website: "https://mvpmatch.co/",
          description:
            "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
          image: "https://mvpmatch.co/images/logo.svg",
          name: "Project 2",
        },
      });
    });
  });

  describe("transformGatewaysToDictionary()", () => {
    it("should transform an array of gateways into a dictionary", () => {
      // given
      const gateways = [
        {
          gatewayId: "i6ssp",
          userIds: ["rahej"],
          name: "Gateway 1",
          type: "Stripe",
          apiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
          secondaryApiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
          description:
            "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
        },
      ];

      // when
      const result = transformGatewaysToDictionary(gateways);

      // then
      expect(result).toEqual({
        i6ssp: {
          gatewayId: "i6ssp",
          userIds: ["rahej"],
          name: "Gateway 1",
          type: "Stripe",
          apiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
          secondaryApiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
          description:
            "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
        },
      });
    });
  });

  describe("transformData()", () => {
    it("should transform the report data from API response (provided projects and gateways dictionary data)", () => {
      // given
      const projectsDict = {
        bgYhx: {
          projectId: "bgYhx",
          userIds: ["rahej"],
          rule: "Manual Selection",
          gatewayIds: ["gDJ2s"],
          structure: "Sole proprietorship",
          industry: "IT",
          website: "https://mvpmatch.co/",
          description:
            "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
          image: "https://mvpmatch.co/images/logo.svg",
          name: "Project 2",
        },
      };

      const gatewaysDict = {
        gDJ2s: {
          gatewayId: "gDJ2s",
          userIds: ["rahej"],
          name: "Gateway 1",
          type: "Stripe",
          apiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
          secondaryApiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
          description:
            "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
        },
      };

      const reportData = [
        {
          paymentId: "6149cf567833e57669e60455",
          amount: 2663.69,
          projectId: "bgYhx",
          gatewayId: "gDJ2s",
          userIds: ["rahej"],
          modified: "2021-09-20",
          created: "2021-04-11",
        },
      ];

      // when
      const result = transformData(reportData, projectsDict, gatewaysDict);

      // then
      expect(result).toEqual([
        2663.69,
        [
          {
            projectId: "bgYhx",
            projectName: "Project 2",
            totalProjectAmount: 2663.69,
            gateways: [
              {
                dateCreated: "2021-04-11",
                gatewayName: "Gateway 1",
                gatewayId: "gDJ2s",
                totalGatewayTransactionsAmount: 2663.69,
                gatewayTransactions: [
                  {
                    dateCreated: "2021-04-11",
                    dateModified: "2021-09-20",
                    paymentId: "6149cf567833e57669e60455",
                    gatewayTransactionAmount: 2663.69,
                  },
                ],
              },
            ],
          },
        ],
      ]);
    });
  });

  describe("transformDataToChartFormat()", () => {
    it("should transform the report data to chart format for projects", () => {
      // given
      const projects = [
        {
          projectId: "egYhx",
          projectName: "Project 1",
          totalProjectAmount: 6489.85,
          gateways: [],
        },
        {
          projectId: "bgYhx",
          projectName: "Project 2",
          totalProjectAmount: 2663.69,
          gateways: [],
        },
      ];

      // when
      const result = transformDataToChartFormat(projects);

      // then
      expect(result).toEqual([
        ["Project 1", 6489.85],
        ["Project 2", 2663.69],
      ]);
    });

    it("should transform the report data to chart format for gateways", () => {
      const gateways = [
        {
          dateCreated: "2021-04-11",
          gatewayName: "Gateway 1",
          gatewayId: "gDJ2s",
          totalGatewayTransactionsAmount: 2663.69,
          gatewayTransactions: [
            {
              dateCreated: "2021-04-11",
              dateModified: "2021-09-20",
              paymentId: "6149cf567833e57669e60455",
              gatewayTransactionAmount: 2663.69,
            },
          ],
        },
        {
          dateCreated: "2021-04-12",
          gatewayName: "Gateway 2",
          gatewayId: "hDJ2s",
          totalGatewayTransactionsAmount: 6489.85,
          gatewayTransactions: [
            {
              dateCreated: "2021-04-12",
              dateModified: "2021-09-21",
              paymentId: "7149cf567833e57669e60456",
              gatewayTransactionAmount: 6489.85,
            },
          ],
        },
      ];

      // when
      const result = transformDataToChartFormat(gateways);

      // then
      expect(result).toEqual([
        ["Gateway 1", 2663.69],
        ["Gateway 2", 6489.85],
      ]);
    });
  });

  describe("isGateways()", () => {
    it("should return true is object is of the type Gateway[]", () => {
      // given
      const data = [
        {
          dateCreated: "2021-04-11",
          gatewayName: "Gateway 1",
          gatewayId: "gDJ2s",
          totalGatewayTransactionsAmount: 2663.69,
          gatewayTransactions: [
            {
              dateCreated: "2021-04-11",
              dateModified: "2021-09-20",
              paymentId: "6149cf567833e57669e60455",
              gatewayTransactionAmount: 2663.69,
            },
          ],
        },
      ];

      // when
      const result = isGateways(data);

      // then
      expect(result).toEqual(true);
    });

    it("should return false is object is of the type Project[]", () => {
      // given
      const data = [
        {
          projectId: "egYhx",
          projectName: "Project 1",
          totalProjectAmount: 6489.85,
          gateways: [],
        },
      ];

      // when
      const result = isGateways(data);

      // then
      expect(result).toEqual(false);
    });
  });

  describe("getChartColors()", () => {
    it("should return the chart colors for gateways data", () => {
      // given
      const data = [
        {
          dateCreated: "2021-04-11",
          gatewayName: "Gateway 1",
          gatewayId: "gDJ2s",
          totalGatewayTransactionsAmount: 2663.69,
          gatewayTransactions: [
            {
              dateCreated: "2021-04-11",
              dateModified: "2021-09-20",
              paymentId: "6149cf567833e57669e60455",
              gatewayTransactionAmount: 2663.69,
            },
          ],
        },
        {
          dateCreated: "2021-04-12",
          gatewayName: "Gateway 2",
          gatewayId: "hDJ2s",
          totalGatewayTransactionsAmount: 342.67,
          gatewayTransactions: [
            {
              dateCreated: "2021-04-12",
              dateModified: "2021-09-21",
              paymentId: "5149cf567833e57669e60455",
              gatewayTransactionAmount: 342.67,
            },
          ],
        },
      ];

      // when
      const result = getChartColors(data);

      // then
      expect(Object.keys(result).length).toEqual(2);
      expect(result["Gateway 1"]).toBeDefined();
      expect(result["Gateway 1"]).toMatch(/^#[0-9A-F]{6}$/i); // regex matcher for hex color
      expect(result["Gateway 2"]).toBeDefined();
      expect(result["Gateway 2"]).toMatch(/^#[0-9A-F]{6}$/i); // regex matcher for hex color
    });

    it("should return the chart colors for projects data", () => {
      // given
      const data = [
        {
          projectId: "egYhx",
          projectName: "Project 1",
          totalProjectAmount: 6489.85,
          gateways: [],
        },
      ];

      // when
      const result = getChartColors(data);

      // then
      expect(Object.keys(result).length).toEqual(1);
      expect(result["Project 1"]).toBeDefined();
      expect(result["Project 1"]).toMatch(/^#[0-9A-F]{6}$/i); // regex matcher for hex color
    });
  });
});
