import styles from "./ReportData.module.css";
import {
  GatewayResponse,
  ProjectResponse,
  ReportResponse,
} from "../../endpoints";
import ReportDataChart, {
  ChartDataMode,
} from "../ReportDataChart/ReportDataChart";
import ReportDataTable from "../ReportDataTable/ReportDataTable";
import { useEffect, useState } from "react";
import {
  transformGatewaysToDictionary,
  transformProjectsToDictionary,
  transformData,
  TransformedReportData,
  ProjectsDictionary,
  GatewaysDictionary,
} from "../../helpers";

interface ReportDataProps {
  data: ReportResponse["data"];
  projects: ProjectResponse["data"];
  gateways: GatewayResponse["data"];
  projectFilter: string;
  gatewayFilter: string;
}

const ReportData = ({
  data,
  projects,
  gateways,
  projectFilter,
  gatewayFilter,
}: ReportDataProps) => {
  const [reportData, setReportData] = useState<TransformedReportData>();
  const [projectsDict, setProjectsDict] = useState<ProjectsDictionary>({});
  const [gatewaysDict, setGatewaysDict] = useState<GatewaysDictionary>({});

  useEffect(() => {
    if (data?.length && projects?.length && gateways?.length) {
      const transformedProjects = transformProjectsToDictionary(projects);
      const transformedGatways = transformGatewaysToDictionary(gateways);
      const transformedData = transformData(
        data,
        transformedProjects,
        transformedGatways
      );

      setReportData(transformedData);
      setProjectsDict(transformedProjects);
      setGatewaysDict(transformedGatways);
    }
  }, [data, gateways, projects]);

  if (!reportData) {
    return null;
  }

  let chartDataMode: ChartDataMode | undefined = undefined;

  if (projectFilter === "" && gatewayFilter) {
    chartDataMode = "projects";
  } else if (projectFilter && gatewayFilter === "") {
    chartDataMode = "gateways";
  }

  return (
    <div className={styles.container}>
      <ReportDataTable
        projectFilter={projectsDict[projectFilter]?.name}
        gatewayFilter={gatewaysDict[gatewayFilter]?.name}
        data={reportData}
      />
      {chartDataMode && (
        <ReportDataChart mode={chartDataMode} data={reportData} />
      )}
    </div>
  );
};

export default ReportData;
