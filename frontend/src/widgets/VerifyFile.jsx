
import { hashFile } from "../utils/hashFile";
import axios from "axios";
import { useState } from "react";

export default function VerifyFile() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);

  const verify = async () => {
    const hash = await hashFile(file);
    const r = await axios.get(`http://localhost:5000/verify/${hash}`);
    setRes(r.data[0]);
  };

  return (
    <div className="card glass">
      <h3>Verify Document</h3>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={verify}>Verify</button>
      {res !== null && <p className={res ? "success" : "error"}>{res ? "Valid" : "Invalid"}</p>}
    </div>
  );
}
