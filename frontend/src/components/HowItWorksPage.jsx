import React from "react";

export default function HowItWorksPage() {

  return (

    <div
      style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        maxWidth: "1100px",
        margin: "0 auto",
        lineHeight: 1.8
      }}
    >

      <h1
        style={{
          color: "#6b4423",
          marginBottom: "10px"
        }}
      >
        How Ceramic AI Works
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#555",
          marginBottom: "35px"
        }}
      >
        Ceramic AI combines ceramic materials knowledge, machine learning,
        and interactive visualization to help users explore glaze outcomes
        before conducting physical firing experiments.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Step 1 — Select Materials
      </h2>

      <p>
        Users begin by selecting a clay body, glaze recipe, and firing
        temperature through the interactive interface. These selections
        represent the primary factors influencing ceramic glaze behavior.
      </p>

      <div
        style={{
          background: "#f8f5f1",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          marginTop: "15px"
        }}
      >
        Clay Body + Glaze Recipe + Firing Temperature
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Step 2 — Convert to Ceramic Chemistry
      </h2>

      <p>
        Behind the scenes, the selected materials are converted into a
        chemistry-based feature vector containing oxide compositions such
        as silica, alumina, calcium, magnesium, iron, and other ceramic
        constituents.
      </p>

      <p>
        These chemical descriptors provide the machine learning models
        with a quantitative representation of the glaze system.
      </p>

      <div
        style={{
          background: "#f8f5f1",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          marginTop: "15px"
        }}
      >
        Raw Materials → Oxide Chemistry Features
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Step 3 — AI Prediction Models
      </h2>

      <p>
        The chemistry features are processed by trained XGBoost machine
        learning models developed from large ceramic glaze datasets and
        experimental samples.
      </p>

      <p>
        Separate models predict different aspects of glaze behavior:
      </p>

      <ul>
        <li>Material Type</li>
        <li>Surface Type (Glossy, Satin, Matte)</li>
        <li>Transparency</li>
        <li>RGB Color Appearance</li>
      </ul>

      <div
        style={{
          background: "#f8f5f1",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          marginTop: "15px"
        }}
      >
        Ceramic Chemistry → XGBoost Models → Predicted Properties
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Step 4 — Digital Glaze Visualization
      </h2>

      <p>
        The predicted color and material properties are transferred to a
        Three.js rendering engine developed with React Three Fiber.
      </p>

      <p>
        Surface roughness, transparency, reflectivity, and color are
        combined to generate an interactive three-dimensional ceramic
        visualization that approximates the expected glaze appearance.
      </p>

      <div
        style={{
          background: "#f8f5f1",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          marginTop: "15px"
        }}
      >
        AI Predictions → 3D Rendering → Interactive Preview
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Step 5 — Decision Support
      </h2>

      <p>
        Rather than replacing physical testing, Ceramic AI serves as a
        decision-support tool that helps users explore a larger design
        space more efficiently.
      </p>

      <p>
        By rapidly evaluating alternative material combinations, the
        platform helps narrow thousands of possible glaze formulations
        into a manageable set of promising candidates for further
        experimentation and fabrication.
      </p>

      <div
        style={{
          background: "#fff8ee",
          borderLeft: "6px solid #8b5a2b",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          fontStyle: "italic"
        }}
      >
        Ceramic AI acts as a decision funnel: transforming a vast and
        complex design space into a focused set of informed choices for
        artists, designers, researchers, and students.
      </div>

    </div>

  );

}