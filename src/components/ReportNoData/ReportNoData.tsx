import styles from "./ReportNoData.module.css";
import NoReportsCoverImage from "../../assets/mvp-no-reports-cover.svg";

const ReportNoData = () => {
  return (
    <div className={styles.container}>
      <h2>No reports</h2>
      <p>
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </p>
      <img src={NoReportsCoverImage} alt="No reports image" />
    </div>
  );
};

export default ReportNoData;
