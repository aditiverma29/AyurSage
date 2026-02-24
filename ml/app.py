from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load both models
dosha_model = joblib.load("dosha_model.pkl")
disease_model = joblib.load("disease_model.pkl")


@app.route("/predict-dosha", methods=["POST"])
def predict_dosha():
    data = request.json
    features = data.get("features")

    input_data = np.array(features).reshape(1, -1)
    prediction = dosha_model.predict(input_data)

    return jsonify({
        "prediction": prediction[0],
        "summary": "Dosha prediction completed"
    })


@app.route("/predict-disease", methods=["POST"])
def predict_disease():
    data = request.json
    features = data.get("features")

    input_data = np.array(features).reshape(1, -1)
    prediction = disease_model.predict(input_data)

    return jsonify({
        "prediction": prediction[0],
        "summary": "Disease prediction completed"
    })


if __name__ == "__main__":
    app.run(port=5001)