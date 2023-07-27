import { GatewayResponse, ProjectResponse, ReportResponse } from "./endpoints";

export function getUserInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`;
}

export type ProjectsDictionary = {
  [projectId: string]: ProjectResponse["data"][number];
};

export function transformProjectsToDictionary(
  projects: ProjectResponse["data"]
): ProjectsDictionary {
  return projects.reduce((acc, project) => {
    acc[project.projectId] = project;
    return acc;
  }, {} as ProjectsDictionary);
}

export type GatewaysDictionary = {
  [gatewayId: string]: GatewayResponse["data"][number];
};

export function transformGatewaysToDictionary(
  gateways: GatewayResponse["data"]
): GatewaysDictionary {
  return gateways.reduce((acc, gateway) => {
    acc[gateway.gatewayId] = gateway;
    return acc;
  }, {} as GatewaysDictionary);
}

interface TransformedData {
  [projectId: string]: {
    projectId: string;
    projectName: string;
    totalProjectAmount: number;
    gateways: {
      [gatewayId: string]: {
        dateCreated: string;
        gatewayName: string;
        gatewayId: string;
        totalGatewayTransactionsAmount: number;
        gatewayTransactions: {
          dateModified: string;
          paymentId: string;
          gatewayTransactionAmount: number;
        }[];
      };
    };
  };
}

export interface GaetwayTransaction {
  dateModified: string;
  paymentId: string;
  gatewayTransactionAmount: number;
}

export interface Gateway {
  dateCreated: string;
  gatewayName: string;
  gatewayId: string;
  totalGatewayTransactionsAmount: number;
  gatewayTransactions: GaetwayTransaction[];
}

export interface Project {
  projectId: string;
  projectName: string;
  totalProjectAmount: number;
  gateways: Gateway[];
}

type TotalProjectsAmount = number;

export type TransformedReportData = [TotalProjectsAmount, Project[]];

export function transformData(
  data: ReportResponse["data"],
  projectsDict: ProjectsDictionary,
  gatewaysDict: GatewaysDictionary
): TransformedReportData {
  const transformedData: TransformedData = {};
  for (const transaction of data) {
    const projectId = transaction.projectId;
    const gatewayId = transaction.gatewayId;
    const paymentId = transaction.paymentId;
    const amount = transaction.amount;
    const modified = transaction.modified;
    const created = transaction.created;
    const projectName = projectsDict[projectId].name;
    const gatewayName = gatewaysDict[gatewayId].name;

    if (!transformedData[projectId]) {
      transformedData[projectId] = {
        projectId: projectId,
        projectName: projectName,
        totalProjectAmount: 0,
        gateways: {},
      };
    }

    if (!transformedData[projectId].gateways[gatewayId]) {
      transformedData[projectId].gateways[gatewayId] = {
        dateCreated: created,
        gatewayName: gatewayName,
        gatewayId: gatewayId,
        totalGatewayTransactionsAmount: 0,
        gatewayTransactions: [],
      };
    }

    transformedData[projectId].totalProjectAmount += amount;
    transformedData[projectId].gateways[
      gatewayId
    ].totalGatewayTransactionsAmount += amount;
    transformedData[projectId].gateways[gatewayId].gatewayTransactions.push({
      dateModified: modified,
      paymentId: paymentId,
      gatewayTransactionAmount: amount,
    });
  }

  const projects = [];
  let totalProjectsAmount = 0;
  for (const projectId in transformedData) {
    const projectData = transformedData[projectId];
    const projectAmount = projectData.totalProjectAmount;
    totalProjectsAmount += projectAmount;
    const gateways = [];
    for (const gatewayId in projectData.gateways) {
      const gatewayData = projectData.gateways[gatewayId];
      gateways.push({
        dateCreated: gatewayData.dateCreated,
        gatewayName: gatewayData.gatewayName,
        gatewayId: gatewayData.gatewayId,
        totalGatewayTransactionsAmount: roundToTwoDecimalPlaces(
          gatewayData.totalGatewayTransactionsAmount
        ),
        gatewayTransactions: gatewayData.gatewayTransactions,
      });
    }
    gateways.sort((a, b) => a.gatewayName.localeCompare(b.gatewayName));
    projects.push({
      projectId: projectData.projectId,
      projectName: projectData.projectName,
      totalProjectAmount: roundToTwoDecimalPlaces(projectAmount),
      gateways: gateways,
    });
  }

  projects.sort((a, b) => a.projectName.localeCompare(b.projectName));

  return [roundToTwoDecimalPlaces(totalProjectsAmount), projects];
}

export function roundToTwoDecimalPlaces(num: number): number {
  return parseFloat(
    (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2)
  );
}

export function transformDataToChartFormat(
  dataPoints: Project[] | Gateway[]
): Array<[string, number]> {
  if (isGateways(dataPoints)) {
    return dataPoints.map((dataPoint) => {
      return [dataPoint.gatewayName, dataPoint.totalGatewayTransactionsAmount];
    });
  } else {
    return dataPoints.map((dataPoint) => {
      return [dataPoint.projectName, dataPoint.totalProjectAmount];
    });
  }
}

export function isGateways(data: Project[] | Gateway[]): data is Gateway[] {
  return (data as Gateway[])[0].gatewayId !== undefined;
}

export function isGateway(data: Project | Gateway): data is Gateway {
  return (data as Gateway).gatewayId !== undefined;
}

export function getRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const whiteContrast = 0xffffff;
  const colorInt = parseInt(randomColor, 16);
  const contrast = (colorInt ^ whiteContrast).toString(16);
  const contrastColor = ("000000" + contrast).slice(-6);
  return "#" + contrastColor;
}

export function getChartColors(dataPoints: Gateway[] | Project[]) {
  if (isGateways(dataPoints)) {
    return dataPoints.reduce<Record<string, string>>((acc, dataPoint) => {
      const label = dataPoint.gatewayName;
      const color = getRandomHexColor();
      acc[label] = color;
      return acc;
    }, {});
  } else {
    return dataPoints.reduce<Record<string, string>>((acc, dataPoint) => {
      const label = dataPoint.projectName;
      const color = getRandomHexColor();
      acc[label] = color;
      return acc;
    }, {});
  }
}
