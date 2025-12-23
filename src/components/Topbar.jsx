import MetaMaskButton from "./Wallet";
import { motion } from "framer-motion";

const themes = [
  { id: "mint", label: "Mint Trust" },
  { id: "ocean", label: "Deep Ocean" },
  { id: "indigo", label: "Indigo Premium" }
];

export default function Topbar({ theme, setTheme }) {
  return (
    <header className="topbar glass">
      <h1 className="brand">
        🔐 Blockchain Document Verification
      </h1>

      <div className="top-actions">
        {/* Theme Toggle */}
        <div className="theme-toggle">
          {themes.map(t => (
            <motion.button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`theme-btn ${theme === t.id ? "active" : ""}`}
              whileTap={{ scale: 0.95 }}
            >
              {t.label}
            </motion.button>
          ))}
        </div>

        {/* Wallet */}
        <MetaMaskButton />
      </div>
    </header>
  );
}
