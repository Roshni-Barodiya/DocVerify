
export default function MetaMaskButton() {
  const connect = async () => {
    if (!window.ethereum) return alert("MetaMask not installed");
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  return (
    <button className="wallet-btn" onClick={connect}>
      🦊 Connect Wallet
    </button>
  );
}
