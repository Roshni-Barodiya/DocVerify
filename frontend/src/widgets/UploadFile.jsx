
import { hashFile } from "../utils/hashFile";
import axios from "axios";
import { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const hash = await hashFile(file);
    await axios.post("http://localhost:5000/upload", { hash });
    localStorage.setItem("total", Number(localStorage.getItem("total") || 0) + 1);
    setMsg("Stored securely on blockchain");
  };

  return (
    <div className="card glass">
      <h3>Upload Document</h3>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      <p className="success">{msg}</p>
    </div>
  );
}
