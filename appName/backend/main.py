from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React to call this API


# ── Example route ──────────────────────────────────────────
# Visit http://localhost/api/hello  →  { "message": "Hello from Flask!" }
@app.route("/hello")
def hello():
    return jsonify({"message": "Hello from Flask!"})


# ── Example: receive data from React ───────────────────────
@app.route("/echo", methods=["POST"])
def echo():
    data = request.get_json()
    return jsonify({"you_sent": data})


# ── Add your own routes below ───────────────────────────────
# Example: call an external API
# import requests as req
# @app.route("/weather")
# def weather():
#     response = req.get("https://api.openweathermap.org/...")
#     return jsonify(response.json())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
