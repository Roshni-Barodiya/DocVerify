
import { FaChartPie, FaFileUpload, FaCheckCircle } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar glass">
      <h2>🔐 DocVerify</h2>
      <nav>
        <a><FaChartPie /> Dashboard</a>
        <a><FaFileUpload /> Upload</a>
        <a><FaCheckCircle /> Verify</a>
      </nav>
    </aside>
  );
}
