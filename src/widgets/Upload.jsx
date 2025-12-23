import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT

    try {
      setMsg("");

      if (!file) {
        setMsg("❌ Please choose a file first");
        return;
      }

      setLoading(true);

      // 1️⃣ Generate SHA-256 hash
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
      const hash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      console.log("Uploading hash:", hash);

      // 2️⃣ Send to backend
      const res = await axios.post("http://localhost:5000/upload", {
        hash: hash,
      });

      console.log("Upload response:", res.data);

      if (res.data.success) {
        setMsg("✅ Document stored on blockchain");
      } else {
        setMsg("⚠️ Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Backend or blockchain error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Upload Document</h3>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
