import React, { useState } from "react";
import axios from "axios";

function App() {

  // ===================================
  // FEATURE COLUMNS
  // ===================================
  const featureColumns = [
    'SiO2_percent', 'Al2O3_percent', 'B2O3_percent',
    'Li2O_percent', 'K2O_percent', 'Na2O_percent',
    'KNaO_percent', 'BeO_percent', 'MgO_percent',
    'CaO_percent', 'SrO_percent', 'BaO_percent',
    'ZnO_percent', 'PbO_percent', 'P2O5_percent',
    'F_percent', 'V2O5_percent', 'Cr2O3_percent',
    'MnO_percent', 'MnO2_percent', 'FeO_percent',
    'Fe2O3_percent', 'CoO_percent', 'NiO_percent',
    'CuO_percent', 'Cu2O_percent', 'CdO_percent',
    'TiO2_percent', 'ZrO_percent', 'ZrO2_percent',
    'SnO2_percent', 'HfO2_percent', 'Nb2O5_percent',
    'Ta2O5_percent', 'MoO3_percent', 'WO3_percent',
    'OsO2_percent', 'IrO2_percent', 'PtO2_percent',
    'Ag2O_percent', 'Au2O3_percent', 'GeO2_percent',
    'As2O3_percent', 'Sb2O3_percent', 'Bi2O3_percent',
    'SeO2_percent', 'La2O3_percent', 'CeO2_percent',
    'PrO2_percent', 'Pr2O3_percent', 'Nd2O3_percent',
    'U3O8_percent', 'Sm2O3_percent', 'Eu2O3_percent',
    'Tb2O3_percent', 'Dy2O3_percent', 'Ho2O3_percent',
    'Er2O3_percent', 'Tm2O3_percent', 'Yb2O3_percent',
    'Lu2O3_percent', 'target_cone_num'
  ];

  // ===================================
  // INITIAL DATA
  // ===================================
  const initialData = {};

  featureColumns.forEach(col => {
    initialData[col] = 0;
  });

  initialData["SiO2_percent"] = 60;
  initialData["Al2O3_percent"] = 15;
  initialData["CaO_percent"] = 10;
  initialData["K2O_percent"] = 5;
  initialData["target_cone_num"] = 6;

  const [formData, setFormData] = useState(initialData);

  const [result, setResult] = useState(null);

  // ===================================
  // HANDLE CHANGES
  // ===================================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value)
    });

  };

  // ===================================
  // PREDICT
  // ===================================
  const handleSubmit = async () => {

    try {

      const response = await axios.post(
        "https://ceramic-ai-api.onrender.com/predict",
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

  return (

    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}
    >

      <h1 style={{ textAlign: "center" }}>
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
            LEFT SIDE INPUTS
        =================================== */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            maxHeight: "90vh",
            overflowY: "scroll"
          }}
        >

          <h2>Glaze Chemistry Inputs</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px"
            }}
          >

            {featureColumns.map((col) => (

              <div key={col}>

                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold"
                  }}
                >
                  {col}
                </label>

                <br />

                <input
                  type="number"
                  step="0.1"
                  min={col === "target_cone_num" ? -22 : 0}
                  max={col === "target_cone_num" ? 15 : 100}
                  name={col}
                  value={formData[col]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "6px",
                    marginTop: "4px"
                  }}
                />

              </div>

            ))}

          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Predict
          </button>

        </div>

        {/* ===================================
            RIGHT SIDE OUTPUTS
        =================================== */}
        <div
          style={{
            width: "400px",
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
              Enter glaze chemistry values and click Predict.
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

              <h3>Predicted Color</h3>

              <div
                style={{
                  width: "250px",
                  height: "250px",
                  border: "2px solid black",
                  borderRadius: "12px",
                  backgroundColor: `rgb(
                    ${result.rgb.r},
                    ${result.rgb.g},
                    ${result.rgb.b}
                  )`
                }}
              />

              <p style={{ marginTop: "15px" }}>
                RGB:
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