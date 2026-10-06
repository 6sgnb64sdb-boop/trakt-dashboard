"""Read-only Trakt connection check. Never prints account tokens."""
import json
import os
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

def main():
    client_id = os.environ.get("TRAKT_CLIENT_ID")
    access_token = os.environ.get("TRAKT_ACCESS_TOKEN")
    if not client_id or not access_token:
        print("Setup pending: set TRAKT_CLIENT_ID and TRAKT_ACCESS_TOKEN locally.")
        return 2
    request = Request(
        "https://api.trakt.tv/users/settings",
        headers={
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": client_id,
            "Authorization": "Bearer " + access_token,
        },
    )
    try:
        with urlopen(request, timeout=30) as response:
            data = json.load(response)
        if not isinstance(data, dict) or not isinstance(data.get("user"), dict):
            print("Unexpected response; account connection has not been confirmed.")
            return 1
        print("Trakt account connection confirmed. No account details saved.")
        return 0
    except HTTPError as error:
        print("Trakt request failed (HTTP " + str(error.code) + ").")
        return 1
    except (URLError, TimeoutError, ValueError):
        print("Connection failed. Check connectivity and authentication settings.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
