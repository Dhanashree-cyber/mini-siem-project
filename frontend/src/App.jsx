import "./App.css";
import AlertsTable from "./components/AlertsTable";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import LogsTable from "./components/LogsTable";
import LoginChart from "./components/LoginChart";
import SeverityChart from "./components/SeverityChart";

function App() {
  return (
    <div className="dashboard-container">
      <Header />

      <div className="content">
        <StatsCards />
      </div>

      <div className="table-row">
        <LogsTable />
        <AlertsTable />
      </div>

      <div className="chart-row">
        <LoginChart />
        <SeverityChart />
      </div>
    </div>
  );
}



export default App;
