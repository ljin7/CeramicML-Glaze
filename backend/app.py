from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# LOAD MODELS
model_material = joblib.load("../models/model_material_top10_filtered.pkl")
model_surface = joblib.load("../models/model_surface_top10_filtered.pkl")
model_trans = joblib.load("../models/model_trans_top10_filtered.pkl")
model_rgb = joblib.load("../models/model_rgb_top10_filtered.pkl")

scaler = joblib.load("../models/scaler_top10_filtered.pkl")

feature_cols = joblib.load("../models/feature_cols_top10_filtered.pkl")

le_material = joblib.load("../models/le_material_top10_filtered.pkl")
le_surface = joblib.load("../models/le_surface_top10_filtered.pkl")
le_trans = joblib.load("../models/le_trans_top10_filtered.pkl")


@app.route('/')
def home():
    return "Ceramic AI Backend is Running."


@app.route('/predict', methods=['POST'])
def predict():

    data = request.json

    X = pd.DataFrame([data])

    X = X[feature_cols]

    X_scaled = scaler.transform(X)

    mat_pred = model_material.predict(X_scaled)[0]
    surf_pred = model_surface.predict(X_scaled)[0]
    trans_pred = model_trans.predict(X_scaled)[0]
    rgb_pred = model_rgb.predict(X_scaled)[0]

    return jsonify({
        "material_type":
            le_material.inverse_transform([mat_pred])[0],

        "surface_type":
            le_surface.inverse_transform([surf_pred])[0],

        "transparency_type":
            le_trans.inverse_transform([trans_pred])[0],

        "rgb": {
            "r": int(rgb_pred[0]),
            "g": int(rgb_pred[1]),
            "b": int(rgb_pred[2])
        }
    })


if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=10000)