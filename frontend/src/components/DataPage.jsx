import React from "react";

export default function DataPage() {

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
        Data Sources
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#555",
          marginBottom: "35px"
        }}
      >
        Ceramic AI was developed using a combination of open-source ceramic
        glaze data and experimental samples produced by the research team.
        The integration of these datasets provides both broad coverage of
        ceramic chemistry and detailed observations from controlled studio
        experiments.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Dataset 1 — Glazy Ceramic Database
      </h2>

      <p>
        The primary training dataset was obtained from the Glazy Ceramic
        Database, a large open-source repository of ceramic glaze recipes
        and firing information maintained by the ceramic community.
      </p>

      <div
        style={{
          background: "#f8f5f1",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "15px"
        }}
      >

        <b>Contents of the dataset:</b>

        <ul>
          <li>Material types</li>
          <li>Surface types</li>
          <li>Transparency classifications</li>
          <li>RGB color values</li>
          <li>Firing cone information</li>
          <li>Glaze chemistry and oxide compositions</li>
        </ul>

      </div>

      <p>
        This dataset provides the large-scale historical knowledge used to
        train the machine learning models and establish relationships between
        ceramic chemistry and glaze appearance.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Dataset 2 — Experimental Sample Database
      </h2>

      <p>
        To complement the open-source data, the research team developed a
        customized experimental database through studio fabrication and kiln
        firing tests conducted as part of this project.
      </p>

      <div
        style={{
          background: "#f8f5f1",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "15px"
        }}
      >

        <b>Recorded attributes include:</b>

        <ul>
          <li>Glaze types</li>
          <li>Clay bodies</li>
          <li>RGB color measurements</li>
          <li>Firing temperatures</li>
          <li>Contrast levels</li>
          <li>Glaze flow characteristics</li>
          <li>Transparency observations</li>
          <li>Application methods</li>
          <li>Fabrication methods</li>
          <li>Firing methods</li>
          <li>Firing atmosphere conditions</li>
        </ul>

      </div>

      <p>
        These experimental samples provide high-quality observations that
        capture real-world firing behavior and support calibration of the
        predictive models.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Experimental Tile Matrix
      </h2>

      <p>
        During the experimental phase, the research team fabricated a
        systematic tile matrix consisting of 66 ceramic samples.
      </p>

      <p>
        The tile system was organized around three clay bodies:
      </p>

      <ul>
        <li><b>257 Porcelain</b></li>
        <li><b>Dark Star</b></li>
        <li><b>Okee Medium</b></li>
      </ul>

      <p>
        Each clay body was tested with ten glaze formulations under two
        firing atmospheres:
      </p>

      <ul>
        <li>Gas Reduction</li>
        <li>Electric Oxidation</li>
      </ul>

      <p>
        The resulting matrix enables direct comparison of how glaze chemistry,
        clay composition, and firing conditions influence final ceramic
        appearance.
      </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px"
        }}
      >

        <img
          src="/images/tile_matrix.png"
          alt="66 Tile Matrix"
          style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "12px",
            border: "1px solid #ddd"
          }}
        />

        <p
          style={{
            marginTop: "12px",
            fontSize: "14px",
            color: "#666",
            fontStyle: "italic"
          }}
        >
          Figure 1. Rendered diagram of the 66-tile matrix. Three arms extend
          from a shared corner, each representing one clay body: 257 Porcelain
          (upper right), Dark Star (upper left), and Okee Medium (bottom).
          Positions 1–10 indicate glaze locations along each arm.
        </p>

      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#8b5a2b" }}>
        Why Two Datasets?
      </h2>

      <p>
        Combining open-source and experimental datasets provides the best of
        both worlds. The Glazy database offers large-scale coverage of glaze
        chemistry and firing conditions, while the experimental database
        provides carefully documented observations from controlled studio
        testing.
      </p>

      <div
        style={{
          background: "#fff8ee",
          borderLeft: "6px solid #8b5a2b",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px"
        }}
      >
        Open-Source Ceramic Knowledge
        <br />
        +
        <br />
        Experimental Studio Validation
        <br />
        =
        <br />
        AI Training Data for Ceramic AI
      </div>

    </div>

  );

}