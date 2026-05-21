from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import joblib


app = Flask(__name__)
CORS(app)


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

scaler = joblib.load(
    "../models/scaler_top10_filtered.pkl"
)

feature_cols = joblib.load(
    "../models/feature_cols_top10_filtered.pkl"
)

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
# Approximate chemistry
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
# Glaze1 / 7 / 12 / 13 / 19 use same chemistry
# ======================================================

GLAZES = {

    "Glaze1": {

        "SiO2_percent": 59.5,
        "Al2O3_percent": 22.8,
        "Na2O_percent": 8.0,
        "K2O_percent": 2.8,
        "Li2O_percent": 1.2,
        "CaO_percent": 0.3,
        "Fe2O3_percent": 0.2
    },

    "Glaze7": {

        "SiO2_percent": 59.5,
        "Al2O3_percent": 22.8,
        "Na2O_percent": 8.0,
        "K2O_percent": 2.8,
        "Li2O_percent": 1.2,
        "CaO_percent": 0.3,
        "Fe2O3_percent": 0.2
    },

    "Glaze12": {

        "SiO2_percent": 59.5,
        "Al2O3_percent": 22.8,
        "Na2O_percent": 8.0,
        "K2O_percent": 2.8,
        "Li2O_percent": 1.2,
        "CaO_percent": 0.3,
        "Fe2O3_percent": 0.2
    },

    "Glaze13": {

        "SiO2_percent": 59.5,
        "Al2O3_percent": 22.8,
        "Na2O_percent": 8.0,
        "K2O_percent": 2.8,
        "Li2O_percent": 1.2,
        "CaO_percent": 0.3,
        "Fe2O3_percent": 0.2
    },

    "Glaze19": {

        "SiO2_percent": 59.5,
        "Al2O3_percent": 22.8,
        "Na2O_percent": 8.0,
        "K2O_percent": 2.8,
        "Li2O_percent": 1.2,
        "CaO_percent": 0.3,
        "Fe2O3_percent": 0.2
    }

}


# ======================================================
# HOME
# ======================================================

@app.route('/')
def home():

    return "Ceramic AI Backend is Running."


# ======================================================
# PREDICT
# ======================================================

@app.route('/predict', methods=['POST'])
def predict():

    data = request.json

    clay_body = data["clay_body"]

    glaze_paint = data["glaze_paint"]

    temperature_cone = float(
        data["temperature_cone"]
    )

    # --------------------------------------------------
    # GET CHEMISTRY
    # --------------------------------------------------

    body = CLAY_BODIES[clay_body]

    glaze = GLAZES[glaze_paint]

    # --------------------------------------------------
    # COMBINE
    #
    # 100 g body
    # 10 g glaze
    #
    # total = 110
    # --------------------------------------------------

    body_weight = 100 / 100
    glaze_weight = 10 / 100

    combined = {}

    # ALL POSSIBLE FEATURES
    for col in feature_cols:

        combined[col] = 0.0

    # BODY
    for oxide, value in body.items():

        combined[oxide] += (
            value * body_weight
        )

    # GLAZE
    for oxide, value in glaze.items():

        combined[oxide] += (
            value * glaze_weight
        )

    # TEMPERATURE CONE
    combined["target_cone_num"] = (
        temperature_cone
    )

    # --------------------------------------------------
    # ML INPUT
    # --------------------------------------------------

    X = pd.DataFrame([combined])

    X = X[feature_cols]

    X_scaled = scaler.transform(X)

    # --------------------------------------------------
    # PREDICTIONS
    # --------------------------------------------------

    mat_pred = model_material.predict(
        X_scaled
    )[0]

    surf_pred = model_surface.predict(
        X_scaled
    )[0]

    trans_pred = model_trans.predict(
        X_scaled
    )[0]

    rgb_pred = model_rgb.predict(
        X_scaled
    )[0]

    # --------------------------------------------------
    # RETURN
    # --------------------------------------------------

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