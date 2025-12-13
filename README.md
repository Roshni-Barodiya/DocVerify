# Blockchain Document Verification
Full-stack blockchain-based document verification system.
# 🔐 Blockchain Document Verification System

A **secure, decentralized document verification platform** that uses **Blockchain, cryptographic hashing, and Web3 wallets** to ensure document authenticity and integrity.  
Only **hashes** are stored on-chain — documents remain private.

---

## 🚀 Key Features

- 📄 **Real File Upload** (PDF / Image / Any file)
- 🔑 **SHA-256 client-side hashing**
- ⛓️ **Ethereum Smart Contract** (Hardhat local)
- 🦊 **MetaMask wallet integration**
- 📊 **Interactive dashboard with animated charts**
- ✨ **Glassmorphism UI**
- 🎨 **Mint / Ocean / Indigo themes**
- 📱 **Fully responsive layout**

---

## 🧠 Why Blockchain?

Traditional systems are centralized and vulnerable.  
Blockchain provides:
- ✅ Immutability
- ✅ Transparency
- ✅ Trust without intermediaries
- ✅ Tamper-proof verification

---

## 🏗️ Tech Stack

**Frontend**
- React + Vite
- Framer Motion
- Recharts
- MetaMask (Web3)

**Backend**
- Node.js + Express
- Ethers.js

**Blockchain**
- Ethereum (Hardhat)
- Solidity Smart Contracts

**Security**
- SHA-256 hashing (Web Crypto API)

---

## 🔄 System Flow (GitHub-renderable)

```mermaid
flowchart TD
    A[User Opens Web App] --> B[Connect MetaMask Wallet]
    B --> C[Upload Document]
    C --> D[SHA-256 Hash Generated<br/>Client Side]
    D --> E[Hash Sent to Backend]
    E --> F[Smart Contract Stores Hash]
    F --> G[Blockchain Confirms Transaction]

    H[Upload Same Document Later] --> I[Hash Recomputed]
    I --> J[Smart Contract Lookup]
    J --> K{Hash Exists?}
    K -->|Yes| L[Document VALID]
    K -->|No| M[Document INVALID]

