
import { useState } from "react";

export default function Wallet() {
  const [account, setAccount] = useState(null);

  const connect = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }
    const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accs[0]);
  };

  return (
    <button onClick={connect}>
      {account ? `Connected: ${account.slice(0,6)}...` : "Connect Wallet"}
    </button>
  );
}
