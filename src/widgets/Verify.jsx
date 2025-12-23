import axios from "axios";
import { useState } from "react";

export default function Verify() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT

    try {
      setMsg("");
      setResult(null);

      if (!file) {
        setMsg("❌ Please choose a file first");
        return;
      }

      setLoading(true);

      // 1️⃣ Generate SHA-256 hash of file
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
      const hash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      console.log("Verifying hash:", hash);

      // 2️⃣ Call backend verify API
      const res = await axios.get(
        `http://localhost:5000/verify/${hash}`
      );

      console.log("Verify response:", res.data);

      setResult(res.data);

      if (res.data.valid) {
        setMsg("✅ Document is VALID");
      } else {
        setMsg("❌ Document NOT found on blockchain");
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Verify Document</h3>

      <form onSubmit={handleVerify}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {msg && <p>{msg}</p>}

      {result && result.valid && (
        <div style={{ marginTop: "10px" }}>
          <p><strong>Uploader:</strong> {result.uploader}</p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(result.timestamp * 1000).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
