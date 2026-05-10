# shows health impact of user vs average person
# health impact in $/MWh - based on statistical value of a life

import requests
import display_data

# -- avg data --

def avg_health_impact(region, date):
    return