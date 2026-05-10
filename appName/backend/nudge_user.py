# sends user times when using heavy appliances is recommended

import requests
from datetime import datetime

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

    # if the value is 0.0 and it's a part of an interval,
    #  add the start and end time to the intervals list
    data = response.json()

    intervals = []
    start = None

    entries = data["data"]

    for i, entry in enumerate(entries):

        value = int(entry["value"])

        if value == 0 and start is None:
            start = entry["point_time"]

        elif value != 0 and start is not None:
            intervals.append({
                "start": start,
                "end": entries[i - 1]["point_time"]
            })
            start = None

    intervals = [
        interval
        for interval in intervals
            if interval["start"] != interval["end"]
]

    # intervals where user should use heavy electronics
    return intervals