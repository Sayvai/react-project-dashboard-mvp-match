import styles from "./ReportDataTable.module.css";
import { GaetwayTransaction, TransformedReportData } from "../../helpers";
import { useState } from "react";

interface ReportDataTableProps {
  data: TransformedReportData;
  projectFilter: string;
  gatewayFilter: string;
}

const ReportDataTable = ({
  data,
  projectFilter,
  gatewayFilter,
}: ReportDataTableProps) => {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    null
  );

  const onAccordionClick = (accordionId: string) => {
    setActiveAccordionId(
      accordionId === activeAccordionId ? null : accordionId
    );
  };

  const [totalProjectsTotalAmount, projects] = data;

  const renderAllProjectsToGateways = (isGatewayDataHighLevel = true) => {
    return projects.map((project) => {
      return (
        <div
          className={styles.gateway_accordion_container}
          key={project.projectId}
        >
          <h3
            className={styles.gateway_accordion_header}
            onClick={() => onAccordionClick(project.projectId)}
          >
            <span>{project.projectName}</span>
            <span>TOTAL: {project.totalProjectAmount} USD</span>
          </h3>
          {/* Create a table to list the gateways to a project. Columns will be the following: Date Created | Gateway Name | Total Gateway Transaction Amount */}
          {activeAccordionId === project.projectId && (
            <div className={styles.gateway_accordion_content}>
              <table className={styles.gateway_table_data}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>
                      {isGatewayDataHighLevel ? "Gateway" : "Transaction ID"}
                    </th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {project.gateways.map((gateway) => {
                    if (isGatewayDataHighLevel) {
                      return (
                        <tr key={gateway.gatewayId}>
                          <td>{gateway.dateCreated}</td>
                          <td>{gateway.gatewayName}</td>
                          <td>{gateway.totalGatewayTransactionsAmount} USD</td>
                        </tr>
                      );
                    } else {
                      return renderGatewayTransactions(
                        gateway.gatewayTransactions
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    });
  };

  const renderSingleProjectAndSingleGateway = () => {
    return projects.map((project) => {
      return (
        <div
          className={styles.gateway_accordion_content}
          key={project.projectId}
        >
          <table className={styles.gateway_table_data}>
            <thead>{renderGatewayTransactionsHeaders()}</thead>
            <tbody>
              {project.gateways.map((gateway) => {
                return renderGatewayTransactions(gateway.gatewayTransactions);
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  const renderGateways = () => {
    return projects.map((project) => {
      return project.gateways.map((gateway) => {
        return (
          <div className={styles.gateway_accordion_container}>
            <h3
              className={styles.gateway_accordion_header}
              onClick={() => onAccordionClick(gateway.gatewayId)}
            >
              {gateway.gatewayName}
            </h3>
            {activeAccordionId === gateway.gatewayId && (
              <div className={styles.gateway_accordion_content}>
                <table className={styles.gateway_table_data}>
                  <thead>{renderGatewayTransactionsHeaders()}</thead>
                  <tbody>
                    {renderGatewayTransactions(gateway.gatewayTransactions)}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      });
    });
  };

  const renderGatewayTransactionsHeaders = () => {
    return (
      <tr>
        <th>Date</th>
        <th>Transaction ID</th>
        <th>Amount</th>
      </tr>
    );
  };

  const renderGatewayTransactions = (
    gatewayTransactions: GaetwayTransaction[]
  ) => {
    return gatewayTransactions.map((transaction) => {
      return (
        <tr key={transaction.paymentId}>
          <td>{transaction.dateModified}</td>
          <td>{transaction.paymentId}</td>
          <td>{transaction.gatewayTransactionAmount} USD</td>
        </tr>
      );
    });
  };

  return (
    <section id="report-data-table" className={styles.container}>
      <section className={styles.section_top}>
        <ul className={styles.filter_selections_list}>
          <li>{projectFilter || "All projects"}</li>
          <li>{gatewayFilter || "All gateways"}</li>
        </ul>
        {!!projects.length && (
          <div className={styles.gateway_list}>
            {!projectFilter && !gatewayFilter && renderAllProjectsToGateways()}
            {!projectFilter &&
              gatewayFilter &&
              renderAllProjectsToGateways(false)}
            {projectFilter &&
              gatewayFilter &&
              renderSingleProjectAndSingleGateway()}
            {projectFilter && !gatewayFilter && renderGateways()}
          </div>
        )}
      </section>
      <section className={styles.section_bottom}>
        <span>Total: {totalProjectsTotalAmount} USD</span>
      </section>
    </section>
  );
};

export default ReportDataTable;
