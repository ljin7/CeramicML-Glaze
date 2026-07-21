import React from "react";

export default function AboutPage() {

  return (

    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        color: "#333",
        lineHeight: 1.8
      }}
    >

      <h1
        style={{
          color: "#6b4423",
          marginBottom: "10px"
        }}
      >
        About Ceramic AI
      </h1>

      <h3
        style={{
          color: "#8b5a2b",
          marginBottom: "30px"
        }}
      >
        Exploring AI-Assisted Material Design Through Ceramic Glazes
      </h3>

      <p>
        The goal of this project is to explore how Artificial Intelligence
        can assist human decision-making in complex material design processes,
        using ceramic glaze development as a case study.
      </p>

      <p>
        Ceramic glazes represent a highly multidimensional design problem.
        Their final appearance emerges from interactions among chemistry,
        firing conditions, and physical processes that are difficult to
        predict intuitively. Traditionally, artists and scientists explore
        these relationships through trial-and-error experiments, producing
        a limited number of discrete samples.
      </p>

      <p>
        Ceramic AI investigates how AI and digital tools can help navigate
        this complex parameter space, narrowing down possible outcomes and
        guiding users toward desired visual and functional results.
      </p>


      <hr style={{ margin: "40px 0" }} />


      <h2 style={{ color: "#6b4423" }}>
        Complexity of Ceramic Glaze Design
      </h2>

      <p>
        Designing ceramic glazes involves many interacting variables,
        including:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "16px",
          marginTop: "20px"
        }}
      >

        <div className="card">Material composition</div>
        <div className="card">Firing temperature</div>
        <div className="card">Cooling rate</div>
        <div className="card">Surface texture</div>
        <div className="card">Glaze thickness</div>
        <div className="card">Chemical additives</div>

      </div>


      <hr style={{ margin: "40px 0" }} />


      <h2 style={{ color: "#6b4423" }}>
        AI as a Decision Funnel
      </h2>

      <p>
        The central idea behind this project is to view AI not as a replacement
        for artists or materials scientists, but as a decision-support tool.
      </p>

      <p>
        The enormous number of possible combinations creates an overwhelming
        design space. AI acts as a "decision funnel" that helps reduce
        thousands of potential combinations into a manageable set of promising
        solutions.
      </p>

      <div
        style={{
          background: "#f8f5f1",
          borderLeft: "6px solid #8b5a2b",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "25px",
          fontSize: "18px",
          textAlign: "center"
        }}
      >

        Thousands of Possibilities
        <br />
        |
        <br />
        AI-Assisted Filtering
        <br />
        |
        <br />
        Manageable Design Space
        <br />
        |
        <br />
        Human Creativity and Decision-Making

      </div>


      <hr style={{ margin: "40px 0" }} />


      <h2 style={{ color: "#6b4423" }}>
        Hybrid Demonstration Platform
      </h2>

      <p>
        The project combines physical artifacts and digital tools to create
        an interactive learning platform:
      </p>

      <ul>

        <li>
          Physical ceramic samples fabricated in the studio
        </li>

        <li>
          Digital simulations showing predicted glaze outcomes
        </li>

        <li>
          Visual information graphics explaining the decision process
        </li>

      </ul>


      <hr style={{ margin: "40px 0" }} />


      <h2 style={{ color: "#6b4423" }}>
        Public Communication and Exhibition
      </h2>

      <hr style={{ margin: "40px 0" }} />



      <p>
        Beyond prediction accuracy, Ceramic AI is intended as a platform for
        public communication and exhibition. The project highlights the
        intersection of:
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
          fontSize: "18px",
          fontWeight: "600"
        }}
      >

        <div>Artificial Intelligence</div>

        <div>Materials Science</div>

        <div>Artistic Practice</div>

      </div>

      <h2 style={{ color: "#6b4423" }}>
        Project Team
      </h2>

      <p>
      Ceramic AI is a multidisciplinary collaboration that brings together expertise
      from engineering, design, ceramics, information visualization, and computer science.
      The project explores how AI-assisted tools can support creativity and material discovery.
      </p>

      <h3
        style={{
          color: "#8b5a2b",
          marginTop: "30px"
        }}
      >
        Project Leads
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <div
          style={{
            background: "#f8f5f1",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <b>Dr. Cheryl Xu</b>
          <br />
          Professor
          <br />
          College of Engineering
        </div>

        <div
          style={{
            background: "#f8f5f1",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <b>Dr. Deborah Littlejohn</b>
          <br />
          Professor
          <br />
          College of Design
        </div>

      </div>


      <h3
        style={{
          color: "#8b5a2b",
          marginTop: "40px"
        }}
      >
        Project Team Members
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <div
          style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <b>Maryam Badiei</b>
          <br />
          PhD Student
          <br />
          College of Design
          <br />
          <i>Ceramics / Fabrication</i>
        </div>

        <div
          style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <b>Linghao Li</b>
          <br />
          PhD Student
          <br />
          College of Design
          <br />
          <i>Information Graphics / Visualization</i>
        </div>

        <div
          style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <b>Monica Jin</b>
          <br />
          Undergraduate Student
          <br />
          Computer Science
          <br />
          <i>Simulation / Interface Development</i>
        </div>

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#777",
          fontStyle: "italic"
        }}
      >
        Ceramic AI explores how computational intelligence and human creativity
        can work together to expand material discovery and design.
      </div>

    </div>

  );

}