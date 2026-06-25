import React, { useState } from "react";

import PredictPage from "./components/PredictPage";
import HowItWorksPage from "./components/HowItWorksPage";
import DataPage from "./components/DataPage";
import ModelPage from "./components/ModelPage";
import AboutPage from "./components/AboutPage";

import {
  FaFlask,
  FaCogs,
  FaDatabase,
  FaBrain,
  FaInfoCircle
} from "react-icons/fa";

export default function App() {

  const [tab, setTab] = useState("Predict");

  const tabs = [
  { name: "Predict", icon: <FaFlask /> },
  { name: "How It Works", icon: <FaCogs /> },
  { name: "Data", icon: <FaDatabase /> },
  { name: "Model", icon: <FaBrain /> },
  { name: "About", icon: <FaInfoCircle /> }
];

  return (
  
  <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}
    >

    <h1
      style={{
        textAlign: "center",
        fontSize: "48px",
        fontWeight: 900,
        letterSpacing: "2px",
        marginBottom: "6px",
        background:
          "linear-gradient(135deg, #2b1d16 0%, #5c4033 35%, #8b5a2b 65%, #d4a15a 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.25))"
      }}
    >
      Ceramic AI
    </h1>

    <div
      style={{
        textAlign: "center",
        color: "#7a5b3a",
        fontSize: "14px",
        letterSpacing: "2px",
        marginBottom: "25px"
      }}
    >
      AI-Powered Glaze Prediction System
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "35px"
      }}
    >
      {tabs.map((t) => (

        <button
          key={t.name}
          onClick={() => setTab(t.name)}

          onMouseEnter={(e) => {
            if (tab !== t.name) {
              e.target.style.background = "#f0f4f3";
            }
          }}
          onMouseLeave={(e) => {
            if (tab !== t.name) {
              e.target.style.background = "#ffffff";
            }
          }}
          
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 24px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "15px",
            transition: "0.25s",
            background:
              tab === t.name
                ? "linear-gradient(135deg,#92400e,#d97706)"
                : "#ffffff",

            color:
              tab === t.name ? "white" : "#444",

            boxShadow:
              tab === t.name
                ? "0 6px 18px rgba(77,140,123,0.35)"
                : "0 3px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {t.icon}
                      {t.name}
                    </button>

      ))}
    </div>

      

      {tab === "Predict" && <PredictPage />}

      {tab === "How It Works" && <HowItWorksPage />}

      {tab === "Data" && <DataPage />}

      {tab === "Model" && <ModelPage />}

      {tab === "About" && <AboutPage />}

    </div>

  );

}