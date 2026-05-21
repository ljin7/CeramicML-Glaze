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
        minHeight: "100vh"
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
          alignItems: "flex-start"
        }}
      >

        {/* ===================================
            LEFT PANEL
        =================================== */}

        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <h2>Ceramic Inputs</h2>

          {/* Clay Body */}

          <div style={{ marginBottom: "20px" }}>

            <label>
              <b>Clay Body</b>
            </label>

            <select
              name="clay_body"
              value={formData.clay_body}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px"
              }}
            >

              <option>257 Porcelain</option>

              <option>Okee Medium</option>

              <option>Dark Star</option>

            </select>

          </div>

          {/* Glaze Paint */}

          <div style={{ marginBottom: "20px" }}>

            <label>
              <b>Glaze Paint</b>
            </label>

            <select
              name="glaze_paint"
              value={formData.glaze_paint}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px"
              }}
            >

              <option>Glaze1</option>

              <option>Glaze7</option>

              <option>Glaze12</option>

              <option>Glaze13</option>

              <option>Glaze19</option>

            </select>

          </div>

          {/* Temperature */}

          <div style={{ marginBottom: "20px" }}>

            <label>
              <b>Temperature_cone </b>
            </label>

            <input
              type="number"
              name="temperature_cone"
              value={10}
              disabled={true}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                backgroundColor: "#eeeeee"
              }}
            />

          </div>

          {/* Predict Button */}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Predict Glaze
          </button>

        </div>

        {/* ===================================
            RIGHT PANEL
        =================================== */}

        <div
          style={{
            width: "420px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            position: "sticky",
            top: "20px"
          }}
        >

          <h2>Prediction Results</h2>

          {!result && (

            <p>
              Select clay body and glaze paint,
              then click Predict.
            </p>

          )}

          {result && (

            <div>

              <p>
                <b>Material Type:</b>
                <br />
                {result.material_type}
              </p>

              <p>
                <b>Surface Type:</b>
                <br />
                {result.surface_type}
              </p>

              <p>
                <b>Transparency:</b>
                <br />
                {result.transparency_type}
              </p>

              {/* 3D PREVIEW */}

              <h3>3D Glaze Preview</h3>

              <div
                style={{
                  width: "100%",
                  height: "350px",
                  backgroundColor: "#eaeaea",
                  borderRadius: "10px",
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

              <p style={{ marginTop: "15px" }}>

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