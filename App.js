import React, { useState } from "react";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (window.cardano) {
      const addresses = await window.cardano.enable();
      setWalletAddress(addresses[0]);
      setStatus("Wallet connected!");
    } else {
      setStatus("Please install a Cardano wallet extension.");
    }
  };

  const uploadData = async () => {
    const data = { user: walletAddress, timestamp: new Date() };
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setStatus(result.message);
  };

  return (
    <div className="App">
      <h1>Decentralized AI Workforce</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>{walletAddress}</p>
      <button onClick={uploadData}>Upload Data</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
