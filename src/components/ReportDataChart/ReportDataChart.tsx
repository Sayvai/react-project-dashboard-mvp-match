import styles from "./ReportDataChart.module.css";
import {
  TransformedReportData,
  getChartColors,
  isGateways,
  transformDataToChartFormat,
} from "../../helpers";
import c3 from "c3";
import { ElementRef, useEffect, useRef } from "react";

export type ChartDataMode = "projects" | "gateways";

interface ReportDataChartProps {
  data: TransformedReportData;
  mode: ChartDataMode;
}

const ReportDataChart = ({ data, mode }: ReportDataChartProps) => {
  const divRef = useRef<ElementRef<"div">>(null);
  const [totalProjectsTotalAmount, projects] = data;
  const dataPoints = mode === "projects" ? projects : projects[0].gateways;

  const chartColors = getChartColors(dataPoints);

  const chartData = transformDataToChartFormat(dataPoints);

  let total_amount = 0;
  let total_label = "";

  if (isGateways(dataPoints)) {
    total_amount = dataPoints[0].totalGatewayTransactionsAmount;
    total_label = "GATEWAY TOTAL";
  } else {
    total_amount = totalProjectsTotalAmount;
    total_label = "PROJECT TOTAL";
  }

  const renderChart = () => {
    c3.generate({
      bindto: divRef.current,
      size: {
        width: 400,
        height: 300,
      },
      legend: {
        show: false,
      },
      data: {
        columns: chartData,
        type: "donut",
        colors: chartColors,
      },
      donut: {
        width: 55,
      },
    });
  };

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    renderChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef, dataPoints, mode]);

  return (
    <section id="report-data-chart" className={styles.container}>
      <div className={styles.lengends}>
        {Object.entries(chartColors).map(([label, color], index) => {
          return (
            <span key={`${label}_${index}`} className={styles.legend}>
              <span
                className={styles.legend_color}
                style={{ backgroundColor: color }}
              ></span>
              <span>{label}</span>
            </span>
          );
        })}
      </div>
      <div ref={divRef} className={styles.chart}></div>
      <div className={styles.total_amount}>
        {total_label} | {total_amount}
      </div>
    </section>
  );
};

export default ReportDataChart;
