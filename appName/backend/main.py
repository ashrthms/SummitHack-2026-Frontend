from flask import Flask, jsonify, request
from flask_cors import CORS
from jwt import (
    ExpiredSignatureError,
    InvalidKeyError,
    InvalidTokenError,
    InvalidIssuedAtError,
)
from db import init_db, table_exists, login_user, add_user, get_user

app = Flask(__name__)


# ── Example route ──────────────────────────────────────────
# Visit http://localhost/hello  →  { "message": "Hello from Flask!" }
@app.route("/hello")
def hello():
    return jsonify({"message": "Hello from Flask!"})


# ── Example: receive data from React ───────────────────────
@app.route("/echo", methods=["POST"])
def echo():
    data = request.get_json()
    return jsonify({"you_sent": data})


@app.route("/data")  # TODO: remove this
def data():
    return jsonify({"database exists": table_exists()})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    try:
        token = login_user(email, password)
    except InvalidKeyError as e:
        return jsonify({"error": str(e)}), 401

    return jsonify({"token": token})


@app.route("/create-user", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    region = data.get("region")
    try:
        response = add_user(name, email, password, region)
    except InvalidIssuedAtError as e:
        return jsonify({"error": str(e)}), 401
    return jsonify(response)


@app.route("/show-user", methods=["Post"])  # TODO: remove this
def show_user():
    data = request.get_json("name")
    token = data.get("token")
    try:
        user = get_user(token)
    except (InvalidTokenError, ExpiredSignatureError, InvalidIssuedAtError) as e:
        return jsonify({"error": str(e)}), 401

    return jsonify(
        {
            "user_id": user.get("user_id"),
            "name": user.get("name"),
            "email": user.get("email"),
            "region": user.get("region"),
        }
    )


# ── Add your own routes below ───────────────────────────────
# Example: call an external API
# import requests as req
# @app.route("/weather")
# def weather():
#     response = req.get("https://api.openweathermap.org/...")
#     return jsonify(response.json())


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
