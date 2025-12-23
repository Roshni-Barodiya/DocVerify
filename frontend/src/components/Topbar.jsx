
import MetaMaskButton from "./Wallet";

export default function Topbar({ theme, setTheme }) {
  return (
    <header className="topbar glass">
      <h1>Blockchain Document Verification</h1>
      <div className="top-actions">
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="mint">Mint Trust</option>
          <option value="ocean">Deep Ocean</option>
          <option value="indigo">Indigo Premium</option>
        </select>
        <MetaMaskButton />
      </div>
    </header>
  );
}
