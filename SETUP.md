# Sandy's Trakt dashboard — setup

Private project for viewing statistics. No Trakt account has been connected yet.

## Metrics

Initial figures: unique shows started, unique episodes watched, unwatched aired episodes, and remaining runtime by show. Exclude specials by default; future episodes do not count. Watchlisted but unstarted shows are a separate optional backlog. Missing runtimes must be shown rather than treated as zero.

## Authentication

Trakt supports device-code authentication for command-line tools. The app registration form still needs a valid HTTPS redirect address. Do not use localhost or an address we do not control. A private GitHub repository is not itself an OAuth callback hosting service.

The next setup step is to establish the callback hosting address or confirm Trakt's registration requirements for a device-only app. Then register the application and test authentication.

Never commit client secrets, access tokens, refresh tokens or raw account data. Refresh tokens are single-use, so replacement tokens must be saved immediately. Scheduled updates need persistent secure token storage, including saving rotated tokens.

## Status

Repository verified private. App registration, authentication, metric validation and scheduled updates are pending.
