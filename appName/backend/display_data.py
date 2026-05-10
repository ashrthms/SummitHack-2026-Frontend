# shows carbon emissions saved by user vs average person in region
#   based on date user started + maybe appliances? we'll see

import requests
import nudge_user # import to get beginning of window and MOER @ that time

SHIFTABLE_KWH = {
    "clothes_washer": 0.5,
    "clothes_dryer": 3.0,
    "dishwasher": 1.2,
    "oven": 2.0,
    "ev_charging": 9.9,  # occasional — see note below
}

DAILY_SHIFTABLE_KWH = sum(SHIFTABLE_KWH.values())

# -- average data --

# avg emissions spent on schedulable appliances every day
# => this is the amount saved by a user by scheduling their appliances
def avg_daily_emission(region, TOKEN):
    url = "https://api.watttime.org/v3/historical"
    headers = {"Authorization": f"Bearer {TOKEN}"}
    params = {
        "region": region,
        "start": "2026-05-08T00:00+00:00",
        "end": "2026-05-10T00:00+00:00",
        "signal_type": "co2_moer",
    }
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()
    entries = data["data"]

    sum_values = 0
    avg_total_emissions = 0
    count = 0

    for i, entry in enumerate(entries):
        value = int(entry["value"])
        sum_values += value
        count += 1

    avg_total_emissions = (sum_values / count) * DAILY_SHIFTABLE_KWH / 1000

    return round(avg_total_emissions, 2)