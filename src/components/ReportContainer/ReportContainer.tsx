import styles from "./ReportContainer.module.css";

import ReportFilterBar, { Filters } from "../ReportFilterBar/ReportFilterBar";
import { useEffect, useState } from "react";
import {
  ENDPOINTS,
  GatewayResponse,
  ProjectResponse,
  ReportResponse,
} from "../../endpoints";
import ReportData from "../ReportData/ReportData";
import ReportNoData from "../ReportNoData/ReportNoData";

const ReportContainer = () => {
  const [projects, setProjects] = useState<ProjectResponse["data"]>([]);
  const [gateways, setGateways] = useState<GatewayResponse["data"]>([]);
  const [filters, setFilters] = useState<Filters>({
    projectFilter: "None",
    gatewayFilter: "None",
    fromDateFilter: "",
    toDateFilter: "",
  });
  const [reportData, setReportData] = useState<ReportResponse>();

  useEffect(() => {
    fetchProjectsAndGateways();
  }, []);

  const handleGenerateReport = async (e: Filters) => {
    const payload = {
      from: e.fromDateFilter,
      to: e.toDateFilter,
      projectId: e.projectFilter,
      gatewayId: e.gatewayFilter,
    };

    await fetchReportData(payload);

    setFilters(e);
  };

  const fetchProjectsAndGateways = async () => {
    // fetch projects and gateways data from the UI using promise.all and then set this to useState
    const projectsAndGateways = await Promise.all([
      fetch(ENDPOINTS.PROJECTS),
      fetch(ENDPOINTS.GATEWAYS),
    ]);

    const projectsResponse =
      (await projectsAndGateways[0].json()) as ProjectResponse;
    const gatewaysResponse =
      (await projectsAndGateways[1].json()) as GatewayResponse;

    setProjects(projectsResponse.data);
    setGateways(gatewaysResponse.data);
  };

  interface FetchReportPayload {
    from: string;
    to: string;
    projectId: string;
    gatewayId: string;
  }

  const fetchReportData = async (payload: FetchReportPayload) => {
    const response = await fetch(ENDPOINTS.REPORT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    setReportData(data);
  };

  return (
    <section className={styles.container}>
      <div className={styles.top_bar}>
        <div>
          <h2>Reports</h2>
          <p>Easily generate a report of your transactions</p>
        </div>
        <ReportFilterBar
          projects={projects}
          gateways={gateways}
          // onFilterChange={handleFilterChange}
          onGenerateReport={handleGenerateReport}
        />
      </div>
      {reportData?.data.length ? (
        <ReportData
          projects={projects}
          gateways={gateways}
          data={reportData.data}
          projectFilter={filters.projectFilter}
          gatewayFilter={filters.gatewayFilter}
        />
      ) : (
        <ReportNoData />
      )}
    </section>
  );
};

export default ReportContainer;
