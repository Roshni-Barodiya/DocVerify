import { hashFile } from "../utils/hashFile";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

export default function VerifyFile() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    try {
      setMsg("");
      setResult(null);

      if (!file) {
        setMsg("❌ Please select a file first");
        return;
      }

      setLoading(true);

      // 1️⃣ Generate hash
      const hash = await hashFile(file);
      console.log("Verifying hash:", hash);

      // 2️⃣ Call backend
      const res = await axios.get(`http://localhost:5000/verify/${hash}`);
      const { valid, uploader } = res.data;

      setResult(valid);

      // 3️⃣ Update dashboard history (avoid duplicates)
      const docs = JSON.parse(localStorage.getItem("docs")) || [];
      if (!docs.find(d => d.hash === hash)) {
        docs.push({ hash, valid });
        localStorage.setItem("docs", JSON.stringify(docs));
      }

      // 4️⃣ User message
      setMsg(
        valid
          ? `✅ Document is VALID (Uploader ${uploader.slice(0, 6)}...)`
          : "❌ Document NOT found on blockchain"
      );
    } catch (err) {
      console.error("VERIFY ERROR:", err);
      setMsg("❌ Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card glass">
      <h3>🔍 Verify Document</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={verify} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      {msg && (
        <motion.div
          className={`result-badge ${result ? "success" : "error"}`}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {msg}
        </motion.div>
      )}
    </div>
  );
}
