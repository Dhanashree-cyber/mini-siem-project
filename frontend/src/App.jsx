import "./App.css";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import LogsTable from "./components/LogsTable";

function App() {
  return (
    <div>
      <Header />
      <StatsCards />
      <LogsTable />
    </div>
  );
}

export default App;
