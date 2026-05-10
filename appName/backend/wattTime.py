import requests
from requests.auth import HTTPBasicAuth
import os


def __get_api__():
    WATT_PASS = os.getenv("SECRET_KEY")
    login_url = "https://api.watttime.org/login"
    rsp = requests.get(login_url, auth=HTTPBasicAuth("ella_f_richardson", "123!frogg"))
    TOKEN = rsp.json()["token"]
    return TOKEN


# sends user times when using heavy appliances is recommended
# input : region, API
# output : list of times when using heavy appliances is recommended
#   (when carbon intensity is 0.0)
def process_times(region):
    url = "https://api.watttime.org/v3/forecast"
    headers = {"Authorization": f"Bearer {__get_api__()}"}
    params = {"region": region, "signal_type": "co2_moer", "horizon_hours": 72}
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
            intervals.append({"start": start, "end": entries[i - 1]["point_time"]})
            start = None

    # close any interval that runs to the end of the forecast
    if start is not None:
        intervals.append({"start": start, "end": entries[-1]["point_time"]})

    intervals = [
        interval for interval in intervals if interval["start"] != interval["end"]
    ]

    # intervals where user should use heavy electronics
    return intervals
