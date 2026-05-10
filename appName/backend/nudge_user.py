# sends user times when using heavy appliances is recommended

import requests

#input : region, API TOKEN
#output : list of times when using heavy appliances is recommended 
#   (when carbon intensity is 0.0)
def process_times(region, TOKEN):

    url = "https://api.watttime.org/v3/forecast"
    headers = {"Authorization": f"Bearer {TOKEN}"}
    params = {
        "region": region,
        "signal_type": "co2_moer",
        "horizon_hours": 72
    }
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()

    # if the value is 0.0, add the time to the list 
    data = response.json()
    times = []
    for entry in data["data"]:
        if entry["value"] == 0.0:
            times.append(entry["time"])

    return times
