import { useEffect, useState } from "react";

export default function MetaMaskButton() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
    localStorage.setItem("wallet", accounts[0]);
  };

  const loadNetwork = async () => {
    if (!window.ethereum) return;
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (chainId === "0x7a69") setNetwork("Hardhat Local");
    else if (chainId === "0x5") setNetwork("Goerli Testnet");
    else if (chainId === "0xaa36a7") setNetwork("Sepolia Testnet");
    else setNetwork("Ethereum Network");
  };

  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) setAccount(saved);
    loadNetwork();
  }, []);

  return (
    <div>
      {!account ? (
        <button className="wallet-btn" onClick={connectWallet}>
          🦊 Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <div>🔗 {network}</div>
          <div>
            👛 {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        </div>
      )}
    </div>
  );
}
