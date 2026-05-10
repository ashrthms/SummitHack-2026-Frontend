import os;
import resend;
from wattTime import process_times, __get_api__;
from display_data import avg_daily_emission;
from db import get_all_users, update_emmisions;

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

resend.api_key = RESEND_API_KEY





def sendEmail(user, timesHTML):
    r = resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": user["email"],
            "subject": "Today's Carbon Forcast - PowerCue",
            "html": "<><h3>Good Morning!<h3><p>Here is the forecasted grid surplus times for the next couple days:</p><ul>" + timesHTML + "</ul><p>We suggest running display data appliances at these times.</p><p>Thanks for helping out so far, you've saved" + user["all_emis_saved"] + "pounds of carbon!</p><p>For more information, check out <a href=https://localhost:3000/impact-calculator>our website</a>.</p>&emsp; - &ensp;PowerCueTeam</>",
        }
    )


def sendAllEmail():
    supportedRegions = ["CAISO_NORTH"]
    users = get_all_users()

    for region in supportedRegions:
        times = process_times(region)
        timeHTML = ""
        for time in times:
            timeHTML += f"<li>{time.start} -> {time.end}</li>"

        for user in users:
            if str(user["region"]) == str(region):
                update_emmisions(user["email"], avg_daily_emission(region, __get_api__()))
                sendEmail(user, timeHTML)
