import React from "react";

export default function ModelPage() {

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
    Machine Learning Models
  </h1>

  <p
    style={{
      fontSize: "18px",
      color: "#555",
      marginBottom: "35px"
    }}
  >
    Ceramic AI utilizes Extreme Gradient Boosting (XGBoost) machine
    learning algorithms to predict ceramic glaze properties from
    material chemistry and firing information.
  </p>

  <hr style={{ margin: "30px 0" }} />

  <h2 style={{ color: "#8b5a2b" }}>
    Why XGBoost?
  </h2>

  <p>
    XGBoost (Extreme Gradient Boosting) is a state-of-the-art machine
    learning method known for its speed, accuracy, and ability to model
    complex non-linear relationships. The algorithm builds a sequence
    of decision trees, where each new tree learns from the prediction
    errors of previous trees.
  </p>

  <p>
    Built-in regularization techniques help prevent overfitting and
    improve the model's ability to generalize to unseen data.
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
    Ceramic Chemistry → XGBoost → Predicted Properties
  </div>

  <hr style={{ margin: "30px 0" }} />

  <h2 style={{ color: "#8b5a2b" }}>
    Classification Models
  </h2>

  <p>
    Three separate XGBoost classification models were developed using
    the Glazy Ceramic Database.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
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
      <b>Material Type</b>
      <br />
      Classification of ceramic material characteristics.
    </div>

    <div
      style={{
        background: "#f8f5f1",
        padding: "20px",
        borderRadius: "12px"
      }}
    >
      <b>Surface Type</b>
      <br />
      Glossy, Satin, Matte and related surface finishes.
    </div>

    <div
      style={{
        background: "#f8f5f1",
        padding: "20px",
        borderRadius: "12px"
      }}
    >
      <b>Transparency Type</b>
      <br />
      Opaque, Translucent, and Transparent behavior.
    </div>

  </div>

  <p style={{ marginTop: "25px" }}>
    The Glazy dataset was randomly divided into:
  </p>

  <ul>
    <li>80% Training Data</li>
    <li>20% Testing Data</li>
  </ul>

  <p>
    The training data was used to build the classification models,
    while the independent test data was used to evaluate prediction
    performance on previously unseen ceramic formulations.
  </p>

  <hr style={{ margin: "30px 0" }} />

  <h2 style={{ color: "#8b5a2b" }}>
    RGB Color Prediction Model
  </h2>

  <p>
    Predicting ceramic color requires estimating continuous RGB values
    rather than assigning discrete categories. Therefore, an XGBoost
    Regressor model was developed to predict Red, Green, and Blue color
    channels directly from ceramic chemistry and firing information.
  </p>

  <p>
    Unlike the classification models, the RGB model was trained using
    the experimental sample database developed by the research team.
    These empirical samples provide direct measurements of fired glaze
    colors under controlled fabrication conditions.
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
    Experimental Samples → XGBoost Regressor → RGB Prediction
  </div>

  <p style={{ marginTop: "20px" }}>
    Because the experimental database contains a limited number of
    samples, all available observations were used for model training.
    This approach maximized the information available to the model and
    allowed it to learn subtle relationships between chemistry and
    glaze color.
  </p>

  <hr style={{ margin: "30px 0" }} />

  <h2 style={{ color: "#8b5a2b" }}>
    Model Evaluation
  </h2>

  <p>
    The developed machine learning models demonstrated effective
    performance for both classification and regression tasks.
  </p>

  <p>
    For the classification models, independent testing confirmed the
    ability of the models to accurately categorize ceramic glaze
    properties from chemistry-based features.
  </p>

  <p>
    For the RGB prediction model, all available experimental samples
    were used during training. As a result, the model achieved a strong
    fit to the available dataset. However, because of the limited sample
    size, the model may have reduced ability to generalize to glaze
    formulations outside the range represented in the experimental data.
  </p>

  <div
    style={{
      textAlign: "center",
      marginTop: "30px",
      marginBottom: "30px"
    }}
  >

    <img
      src="/images/model_evaluation.png"
      alt="Actual vs Predicted Results"
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
      Figure 2. Actual versus Predicted Results for the developed
      machine learning models.
    </p>

  </div>

  <div
    style={{
      background: "#fff8ee",
      borderLeft: "6px solid #8b5a2b",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px"
    }}
  >
    The goal of Ceramic AI is not to replace physical testing, but to
    accelerate exploration by helping users identify promising glaze
    formulations before conducting laboratory or studio experiments.
  </div>

</div>


);

}
