import React, { useState } from "react";
import axios from "axios";

import GlazeBall from "./GlazeBall";

function App() {

  // ===================================
  // FORM DATA
  // ===================================

  const [formData, setFormData] = useState({
    clay_body: "257 Porcelain",
    glaze_paint: "Glaze1",
    temperature_cone: 10
  });

  // ===================================
  // RESULT
  // ===================================

  const [result, setResult] = useState(null);

  // ===================================
  // HANDLE CHANGES
  // ===================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ===================================
  // PREDICT
  // ===================================

  const handleSubmit = async () => {

    try {

      const response = await axios.post(
        "https://ceramicml-glaze.onrender.com/predict",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Prediction failed");

    }

  };

  // ===================================
  // UI
  // ===================================

  return (

    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        maxWidth: "1400px",
        margin: "0 auto"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Ceramic AI
      </h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "stretch"
        }}
      >

        {/* ===================================
            LEFT PANEL
        =================================== */}

        <div
          style={{
            flex: 1,
            minHeight: "500px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2 style={{ marginBottom: "25px" }}>
            Ceramic Inputs
          </h2>

          {/* Clay Body */}

          <div style={{ marginBottom: "25px" }}>

            <label>
              <b>Clay Body</b>
            </label>

            <select
              name="clay_body"
              value={formData.clay_body}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #cccccc",
                fontSize: "15px"
              }}
            >

              <option>257 Porcelain</option>

              <option>Okee Medium</option>

              <option>Dark Star</option>

            </select>

          </div>

          {/* Glaze Paint */}

          <div style={{ marginBottom: "25px" }}>

            <label>
              <b>Glaze</b>
            </label>

            <select
              name="glaze_paint"
              value={formData.glaze_paint}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #cccccc",
                fontSize: "15px"
              }}
            >

              <option>Glaze1_Gustin's Carbon Trap Shino</option>

              <option>Glaze7_Bird's Beak</option>

              <option>Glaze9_Star Blue</option>

              <option>Glaze12_Val Cushing Copper Blue Green</option>

              <option>Glaze13_Rutile</option>

              <option>Glaze14_Oribe</option>

              <option>Glaze15_Coleman's Teadust</option>

              <option>Glaze17_Red Fish Blue Fish</option>

              <option>Glaze_Mary's Red</option>

              <option>Glaze_Darcy's Sky Blue</option>


            </select>

          </div>

          {/* Temperature */}

          <div style={{ marginBottom: "25px" }}>

            <label>
              <b>Temperature Cone</b>
            </label>

            <input
              type="number"
              name="temperature_cone"
              value={10}
              disabled={true}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #cccccc",
                backgroundColor: "#eeeeee",
                fontSize: "15px"
              }}
            />

          </div>

          {/* Predict Button */}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "17px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Predict
          </button>

        </div>

        {/* ===================================
            RIGHT PANEL
        =================================== */}

        <div
          style={{
            flex: 1,
            minHeight: "500px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2 style={{ marginBottom: "25px" }}>
            Prediction Results
          </h2>

          {!result && (

            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666666",
                fontSize: "16px",
                textAlign: "center"
              }}
            >

              <p>
                Select clay body and glaze,
                then click Predict.
              </p>

            </div>

          )}

          {result && (

            <div>

              <p style={{ marginBottom: "20px" }}>
                <b>Material Type:</b>
                <br />
                {result.material_type}
              </p>

              <p style={{ marginBottom: "20px" }}>
                <b>Surface Type:</b>
                <br />
                {result.surface_type}
              </p>

              <p style={{ marginBottom: "20px" }}>
                <b>Transparency:</b>
                <br />
                {result.transparency_type}
              </p>

              {/* 3D PREVIEW */}

              <h3 style={{ marginBottom: "15px" }}>
                3D Preview
              </h3>

              <div
                style={{
                  width: "100%",
                  height: "420px",
                  backgroundColor: "#eaeaea",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}
              >

                <GlazeBall
                  surface_type={result.surface_type}
                  transparency_type={
                    result.transparency_type
                  }

                  rgb_r={result.rgb.r}
                  rgb_g={result.rgb.g}
                  rgb_b={result.rgb.b}
                />

              </div>

              {/* RGB */}

              <p
                style={{
                  marginTop: "20px",
                  fontSize: "16px"
                }}
              >

                <b>RGB:</b>

                {" "}

                {result.rgb.r},

                {" "}

                {result.rgb.g},

                {" "}

                {result.rgb.b}

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default App;