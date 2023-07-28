import styles from "./ReportFilterBar.module.css";
import { GatewayResponse, ProjectResponse } from "../../endpoints";
import { useState } from "react";

export interface Filters {
  projectFilter: string;
  gatewayFilter: string;
  fromDateFilter: string;
  toDateFilter: string;
}

interface ReportFilterBarProps {
  projects: ProjectResponse["data"];
  gateways: GatewayResponse["data"];
  onGenerateReport: (e: Filters) => void;
}

const ReportFilterBar = ({
  projects,
  gateways,
  onGenerateReport,
}: ReportFilterBarProps) => {
  const [projectFilter, setprojectFilter] = useState("None");
  const [gatewayFilter, setGatewayFilter] = useState("None");
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [toDateFilter, setToDateFilter] = useState("");

  const handleGenerateReportClick = () => {
    onGenerateReport({
      projectFilter,
      gatewayFilter,
      fromDateFilter,
      toDateFilter,
    });
  };

  const renderProjectsSelectOptions = () => {
    if (!projects?.length) {
      return null;
    }

    return projects.map((project) => {
      return (
        <option key={project.projectId} value={project.projectId}>
          {project.name}
        </option>
      );
    });
  };

  const renderGatewaysSelectOptions = () => {
    if (!gateways?.length) {
      return null;
    }

    return gateways.map((gateway) => {
      return (
        <option key={gateway.gatewayId} value={gateway.gatewayId}>
          {gateway.name}
        </option>
      );
    });
  };

  return (
    <div className={styles.container}>
      <select
        name="projects"
        aria-label="Select a project"
        onChange={(e) => setprojectFilter(e.target.value)}
      >
        <option value="None">Select project</option>
        <option value="">All projects</option>
        {renderProjectsSelectOptions()}
      </select>

      <select
        name="gateways"
        aria-label="Select a gateway"
        onChange={(e) => setGatewayFilter(e.target.value)}
      >
        <option value="None">Select gateway</option>
        <option value="">All gateways</option>
        {renderGatewaysSelectOptions()}
      </select>

      <input
        type="date"
        name="fromDate"
        aria-label="From date"
        data-testid="fromDate"
        onChange={(e) => setFromDateFilter(e.target.value)}
      />
      <input
        type="date"
        name="toDate"
        aria-label="To date"
        data-testid="toDate"
        onChange={(e) => setToDateFilter(e.target.value)}
      />
      <button
        type="button"
        aria-label="Generate report"
        onClick={handleGenerateReportClick}
      >
        Generate report
      </button>
    </div>
  );
};

export default ReportFilterBar;
