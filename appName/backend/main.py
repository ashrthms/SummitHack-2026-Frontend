from db import add_user, get_user, init_db, login_user, table_exists, update_emmisions
from display_data import avg_daily_emission, avg_daily_health_impact
from send_email import sendAllEmail
from wattTime import __get_api__
from flask import Flask, jsonify, request
from flask_cors import CORS
from jwt import (
    ExpiredSignatureError,
    InvalidIssuedAtError,
    InvalidKeyError,
    InvalidTokenError,
)

app = Flask(__name__)
CORS(app)


# ── Example route ──────────────────────────────────────────
# Visit http://localhost/hello  →  { "message": "Hello from Flask!" }
@app.route("/hello")
def hello():
    update_emmisions("ldbonequi@gmail.com", 2193)
    return jsonify({"message": "Hello from Flask!"}), 200


@app.route("/email")
def send_emails():
    return jsonify(sendAllEmail()), 200


# ── Example: receive data from React ───────────────────────
@app.route("/echo", methods=["POST"])
def echo():
    data = request.get_json()
    return jsonify({"you_sent": data}), 200


@app.route("/data")  # TODO: remove this
def data():
    return jsonify({"database exists": table_exists()}), 200


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email_1 = data.get("email")
    password = data.get("password")

    try:
        token = login_user(email_1, password)
    except (InvalidKeyError, InvalidTokenError) as e:
        return jsonify({"error": str(e)}), 401

    return jsonify({"token": token}), 200


@app.route("/create-user", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get("name")
    email_1 = data.get("email")
    password = data.get("password")
    region = data.get("region")
    try:
        response = add_user(name, email_1, password, region)
    except InvalidIssuedAtError as e:
        return jsonify({"error": str(e)}), 401
    return jsonify(response), 200


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
            "total_saved": user.get("all_emis_saved"),
        }
    ), 200


@app.route("/user-savings", methods=["Post"])
def show_emis_data():
    data = request.get_json()
    token = data.get("token")
    try:
        user = get_user(token)
    except (InvalidTokenError, ExpiredSignatureError, InvalidIssuedAtError) as e:
        return jsonify({"error": str(e)}), 401
    region = user["region"]
    api_key = __get_api__()
    daily_carbon = avg_daily_emission(region, api_key)
    daily_health = avg_daily_health_impact(region, api_key)
    return jsonify(
        {
            "all_carbon": user["all_emis_saved"],
            "daily_carbon": daily_carbon,
            "daily_health": daily_health,
        }
    ), 200


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
