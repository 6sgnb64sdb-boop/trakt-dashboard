# Trakt dashboard setup

This repository is now public. Keep tokens, secrets and viewing history outside it.

Enable GitHub Pages in Settings > Pages: Deploy from a branch, main, /(root), Save.

Once the page loads, register this redirect URI:
https://6sgnb64sdb-boop.github.io/trakt-dashboard/

Allowed origin:
https://6sgnb64sdb-boop.github.io

The connection landing page is ready. Sign-in will be implemented with PKCE after the Client ID is configured; no client secret belongs in browser code.

Initial metrics: unique shows started, unique episodes watched, unwatched aired episodes and remaining runtime by show. Exclude specials by default and exclude future episodes. Label missing runtimes and estimates. Watchlisted but unstarted shows can be added separately.

Refresh tokens are single-use. Automatic updates will require secure persistent storage for rotated tokens and a private destination for results.

Status: Pages activation, Trakt registration, authorization and metrics are pending. No account data has been retrieved.
