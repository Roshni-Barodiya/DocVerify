import { hashFile } from "../utils/hashFile";
import axios from "axios";
import { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      setMsg("");

      if (!file) {
        setMsg("❌ Please select a file first");
        return;
      }

      setLoading(true);

      // 1️⃣ Generate hash
      const hash = await hashFile(file);
      console.log("Uploading hash:", hash);

      // 2️⃣ Send to backend
      await axios.post("http://localhost:5000/upload", { hash });

      // 3️⃣ Update dashboard history
      const docs = JSON.parse(localStorage.getItem("docs")) || [];
      docs.push({ hash, valid: true });
      localStorage.setItem("docs", JSON.stringify(docs));

      // 4️⃣ Update total count (Stats widget)
      localStorage.setItem(
        "total",
        Number(localStorage.getItem("total") || 0) + 1
      );

      setMsg("✅ Stored securely on blockchain");
    } catch (err) {
      console.error(err);
      setMsg("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card glass">
      <h3>📤 Upload Document</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {msg && <p className="success">{msg}</p>}
    </div>
  );
}
