import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./Pages/Dashboard";
import Logs from "./Pages/Logs";
import Alerts from "./Pages/Alerts";
import Analytics from "./Pages/Analytics";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;