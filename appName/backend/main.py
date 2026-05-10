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

# -- import Watt Time API
import requests

# get API token 
from requests.auth import HTTPBasicAuth
login_url = 'https://api.watttime.org/login'
rsp = requests.get(login_url, auth=HTTPBasicAuth('ella_f_richardson', '123!frogg'))
TOKEN = rsp.json()['token']

# Test to get region give latitude and longitude
url = "https://api.watttime.org/v3/region-from-loc"
headers = {"Authorization": f"Bearer {TOKEN}"}
params = {"latitude": "42.372", "longitude": "-72.519", "signal_type": "co2_moer"}
response = requests.get(url, headers=headers, params=params)
response.raise_for_status()
print(response.json())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
