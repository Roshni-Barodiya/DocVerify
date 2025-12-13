
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [theme, setTheme] = useState("mint");

  return (
    <div className={`app ${theme}`}>
      <Sidebar />
      <div className="main">
        <Topbar theme={theme} setTheme={setTheme} />
        <Dashboard />
      </div>
    </div>
  );
}
