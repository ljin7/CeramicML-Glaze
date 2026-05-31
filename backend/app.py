from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np
import joblib


app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://ceramic-ml-glaze.vercel.app"
        ]
    }
})


# ======================================================
# LOAD MODELS
# ======================================================

model_material = joblib.load(
    "../models/model_material_top10_filtered.pkl"
)

model_surface = joblib.load(
    "../models/model_surface_top10_filtered.pkl"
)

model_trans = joblib.load(
    "../models/model_trans_top10_filtered.pkl"
)

model_rgb = joblib.load(
    "../models/model_rgb_top10_filtered.pkl"
)

# ======================================================
# LOAD SCALERS
# ======================================================

scaler_cls = joblib.load(
    "../models/scaler_cls_top10_filtered.pkl"
)

scaler_rgb = joblib.load(
    "../models/scaler_rgb_top10_filtered.pkl"
)

# ======================================================
# FEATURE COLUMNS
# ======================================================

feature_cols = joblib.load(
    "../models/feature_cols_top10_filtered.pkl"
)

# ======================================================
# LABEL ENCODERS
# ======================================================

le_material = joblib.load(
    "../models/le_material_top10_filtered.pkl"
)

le_surface = joblib.load(
    "../models/le_surface_top10_filtered.pkl"
)

le_trans = joblib.load(
    "../models/le_trans_top10_filtered.pkl"
)


# ======================================================
# CLAY BODY CHEMISTRY
# ======================================================

CLAY_BODIES = {

    "257 Porcelain": {
        "SiO2_percent": 68.0,
        "Al2O3_percent": 22.0,
        "K2O_percent": 4.0,
        "Na2O_percent": 2.0,
        "CaO_percent": 1.0,
        "MgO_percent": 0.5,
        "Fe2O3_percent": 0.3
    },

    "Okee Medium": {
        "SiO2_percent": 58.0,
        "Al2O3_percent": 24.0,
        "K2O_percent": 3.0,
        "Na2O_percent": 1.5,
        "CaO_percent": 2.0,
        "MgO_percent": 1.5,
        "Fe2O3_percent": 2.0
    },

    "Dark Star": {
        "SiO2_percent": 54.0,
        "Al2O3_percent": 22.0,
        "K2O_percent": 3.0,
        "Na2O_percent": 1.0,
        "CaO_percent": 2.0,
        "MgO_percent": 1.5,
        "Fe2O3_percent": 6.0,
        "MnO_percent": 3.0
    }
}


# ======================================================
# GLAZE CHEMISTRY
# ======================================================

GLAZES = {

    "Glaze1_Gustin's Carbon Trap Shino": {
        "SiO2_percent": 59.5,
        "Al2O3_percent": 22.8,
        "Na2O_percent": 8.0,
        "K2O_percent": 2.8,
        "Li2O_percent": 1.2,
        "CaO_percent": 0.3,
        "Fe2O3_percent": 0.2
    },

    "Glaze7_Bird's Beak": {
        "SiO2_percent": 65.31,
        "Al2O3_percent": 9.75,
        "CaO_percent": 11.15,
        "MgO_percent": 4.18,
        "K2O_percent": 2.79,
        "Na2O_percent": 0.79,
        "TiO2_percent": 5.06,
        "CoO_percent": 0.84,
        "Fe2O3_percent": 0.12
    },

    "Glaze9_Star Blue": {
        "SiO2_percent": 62.84,
        "Al2O3_percent": 10.47,
        "B2O3_percent": 4.58,
        "CaO_percent": 8.92,
        "MgO_percent": 1.41,
        "K2O_percent": 5.47,
        "Na2O_percent": 1.56,
        "ZnO_percent": 3.90,
        "CuO_percent": 1.95,
        "CoO_percent": 0.50,
        "Fe2O3_percent": 0.18
    },

    "Glaze12_Val Cushing Copper Blue Green": {
        "SiO2_percent": 49.86,
        "Al2O3_percent": 16.24,
        "CaO_percent": 18.91,
        "K2O_percent": 2.47,
        "Na2O_percent": 1.28,
        "MgO_percent": 0.22,
        "CuO_percent": 1.43,
        "SnO2_percent": 3.77,
        "Fe2O3_percent": 0.15
    },

    "Glaze13_Rutile": {
        "SiO2_percent": 60.94,
        "Al2O3_percent": 12.68,
        "CaO_percent": 11.72,
        "MgO_percent": 3.02,
        "K2O_percent": 3.56,
        "Na2O_percent": 1.01,
        "TiO2_percent": 6.64,
        "Fe2O3_percent": 0.24
    },

    "Glaze14_Oribe": {
        "SiO2_percent": 49.72,
        "Al2O3_percent": 12.51,
        "CaO_percent": 13.42,
        "MgO_percent": 1.86,
        "K2O_percent": 3.44,
        "Na2O_percent": 0.98,
        "CuO_percent": 5.58,
        "P2O5_percent": 0.36,
        "Fe2O3_percent": 0.13
    },

    "Glaze15_Coleman's Teadust": {
        "SiO2_percent": 56.87,
        "Al2O3_percent": 11.08,
        "CaO_percent": 10.18,
        "MgO_percent": 1.91,
        "K2O_percent": 4.14,
        "Na2O_percent": 1.18,
        "Fe2O3_percent": 13.64
    },

    "Glaze17_Red Fish Blue Fish": {
        "SiO2_percent": 60.21,
        "Al2O3_percent": 10.52,
        "B2O3_percent": 5.18,
        "CaO_percent": 8.64,
        "K2O_percent": 5.08,
        "Na2O_percent": 1.44,
        "SnO2_percent": 2.68,
        "CuO_percent": 0.17,
        "CoO_percent": 0.33,
        "MgO_percent": 0.32,
        "Fe2O3_percent": 0.16
    },

    "Glaze_Mary's Red": {
        "SiO2_percent": 59.74,
        "Al2O3_percent": 8.91,
        "B2O3_percent": 1.92,
        "CaO_percent": 6.77,
        "ZnO_percent": 10.13,
        "K2O_percent": 5.32,
        "Na2O_percent": 1.51,
        "SrO_percent": 1.38,
        "Li2O_percent": 0.83,
        "SnO2_percent": 2.74,
        "CuO_percent": 0.35,
        "MgO_percent": 0.22,
        "Fe2O3_percent": 0.18
    },

    "Glaze_Darcy's Sky Blue": {
        "SiO2_percent": 50.92,
        "Al2O3_percent": 12.84,
        "Na2O_percent": 8.47,
        "K2O_percent": 4.18,
        "MgO_percent": 5.82,
        "CaO_percent": 3.14,
        "ZrO2_percent": 12.56,
        "CoO_percent": 0.54,
        "Fe2O3_percent": 0.18
    }

}


# ======================================================
# HOME
# ======================================================

@app.route("/")
def home():
    return "Ceramic AI Backend Running"


# ======================================================
# PREDICT
# ======================================================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    clay_body = data.get("clay_body")
    glaze_paint = data.get("glaze_paint")
    temperature_cone = float(
        data.get("temperature_cone", 10)
    )

    body = CLAY_BODIES.get(clay_body, {})
    glaze = GLAZES.get(glaze_paint, {})

    # ==================================================
    # WEIGHTS
    # ==================================================

    body_weight = 1.0
    glaze_weight = 0.1

    # ==================================================
    # INIT FEATURES
    # ==================================================

    combined = {
        col: 0.0 for col in feature_cols
    }

    # ==================================================
    # ADD BODY
    # ==================================================

    for oxide, value in body.items():

        if oxide in combined:
            combined[oxide] += value * body_weight

    # ==================================================
    # ADD GLAZE
    # ==================================================

    for oxide, value in glaze.items():

        if oxide in combined:
            combined[oxide] += value * glaze_weight

    # ==================================================
    # CONE
    # ==================================================

    combined["target_cone_num"] = temperature_cone

    # ==================================================
    # MODEL INPUT
    # ==================================================

    X = pd.DataFrame([combined])

    # enforce exact order
    X = X.reindex(
        columns=feature_cols,
        fill_value=0
    )

    # ==================================================
    # CLASSIFICATION SCALING
    # ==================================================

    X_cls_scaled = scaler_cls.transform(X)

    # ==================================================
    # RGB SCALING
    # ==================================================

    X_rgb_scaled = scaler_rgb.transform(X)

    # ==================================================
    # CLASSIFICATION PREDICTIONS
    # ==================================================

    mat_pred = model_material.predict(
        X_cls_scaled
    )[0]

    surf_pred = model_surface.predict(
        X_cls_scaled
    )[0]

    trans_pred = model_trans.predict(
        X_cls_scaled
    )[0]

    # ==================================================
    # RGB PREDICTION
    # ==================================================

    rgb_pred = model_rgb.predict(
        X_rgb_scaled
    )[0]

    rgb_pred = np.clip(rgb_pred, 0, 255)

    # ==================================================
    # RESPONSE
    # ==================================================

    return jsonify({

        "material_type":
            le_material.inverse_transform(
                [mat_pred]
            )[0],

        "surface_type":
            le_surface.inverse_transform(
                [surf_pred]
            )[0],

        "transparency_type":
            le_trans.inverse_transform(
                [trans_pred]
            )[0],

        "rgb": {
            "r": int(rgb_pred[0]),
            "g": int(rgb_pred[1]),
            "b": int(rgb_pred[2])
        }

    })


# ======================================================
# RUN
# ======================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=10000
    )