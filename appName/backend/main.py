from flask import Flask, jsonify, request

app = Flask(__name__)


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


# -- get API token --


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
