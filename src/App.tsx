import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import ReportContainer from "./components/ReportContainer/ReportContainer";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
        {/* <!-- if this were truly a multi-page app, i would have implemented routing with react-router-dom --> */}
        <ReportContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
