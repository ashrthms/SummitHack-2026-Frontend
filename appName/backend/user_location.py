# takes user's latitude and longitude and returns their region

import requests

# input  : coorodinates for user location, API TOKEN
# output : grid location
def get_region(latitude, longitude, TOKEN):

    url = "https://api.watttime.org/v3/region-from-loc"
    headers = {"Authorization": f"Bearer {TOKEN}"}
    params = {"latitude": latitude, "longitude": longitude, "signal_type": "co2_moer"}
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()

    data = response.json()
    region = data[list(data.keys())[0]]
    return region
    

