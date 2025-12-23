import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [theme, setTheme] = useState("mint");

  // 🔁 Load saved theme on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // 💾 Persist theme changes
  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);
  };

  return (
    <div className={`app ${theme}`}>
      <Sidebar />
      <div className="main">
        <Topbar theme={theme} setTheme={changeTheme} />
        <Dashboard />
      </div>
    </div>
  );
}
