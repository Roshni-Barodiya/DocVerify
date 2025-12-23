import UploadFile from "../widgets/UploadFile";
import VerifyFile from "../widgets/VerifyFile";
import Stats from "../widgets/Stats";
import ChartCard from "../widgets/ChartCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");

  const loadHistory = () => {
    const stored = JSON.parse(localStorage.getItem("docs")) || [];
    setHistory(stored.slice().reverse());
  };

  useEffect(() => {
    loadHistory();

    // 🔁 Update dashboard when localStorage changes
    window.addEventListener("storage", loadHistory);
    return () => window.removeEventListener("storage", loadHistory);
  }, []);

  const filtered = history.filter(d =>
    d.hash.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* TOP STATS */}
      <Stats />

      {/* CHART */}
      <ChartCard />

      {/* ACTIONS */}
      <div className="action-grid">
        <UploadFile />
        <VerifyFile />
      </div>

      {/* DOCUMENT HISTORY */}
      <div className="card glass">
        <h3>📂 Uploaded / Verified Documents</h3>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by document hash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {filtered.length === 0 ? (
          <p>No documents found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i}>
                  <td>{d.hash.slice(0, 22)}...</td>
                  <td className={d.valid ? "success" : "error"}>
                    {d.valid ? "Verified" : "Not Found"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
