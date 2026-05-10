import os
import resend
from wattTime import process_times, __get_api__
from display_data import avg_daily_emission
from db import get_all_users, update_emmisions

RESEND_API_KEY = os.getenv("RESEND_API_KEY")


def sendEmail(user, timesHTML):
    resend.api_key = "re_816ZhiP1_8n9pYFRicHiGjritkJYJx7A6"
    r = resend.Emails.send(
        {
            "from": "PowerCue <onboarding@resend.dev>",
            "to": user["email"],
            "subject": "Today's Carbon Forcast - PowerCue",
            "html": (
                "<div style='font-family: Arial, sans-serif; line-height: 1.6;'>"
                "<h2>Good Morning </h2>"
                "<p>Here are the forecasted grid surplus times for the next couple days:</p>"
                "<ul>" + timesHTML + "</ul>"
                "<p>We suggest running high-energy appliances during these times to maximize renewable usage.</p>"
                "<p>"
                "Thanks for helping out so far — you've saved "
                + str(user["all_emis_saved"])
                + " pounds of carbon!"
                "</p>"
                "<p>"
                "For more information, check out "
                "<a href='http://localhost:3000/impact-calculator'>our website</a>."
                "</p>"
                "<p style='margin-top: 20px;'>— PowerCue Team</p>"
                "</div>"
            ),
        }
    )


def sendAllEmail():
    supportedRegions = ["CAISO_NORTH"]
    users = get_all_users()

    for region in supportedRegions:
        times = process_times(region)
        timeHTML = ""
        for time in times:
            timeHTML += f"<li>{time['start']} -> {time['end']}</li>"

        for user in users:
            if str(user["region"]) == str(region):
                update_emmisions(
                    user["email"], avg_daily_emission(region, __get_api__())
                )
                sendEmail(user, timeHTML)
    return users
