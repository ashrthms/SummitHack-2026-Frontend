import os
import resend

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

resend.api_key = RESEND_API_KEY


def send_email(data):
    r = resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": "ldbonequi@gmail.com",
            "subject": "Today's Carbon Forcast - PowerCue",
            "html": "<p>Congrats on sending your <strong>first email</strong>!</p>",
        }
    )

