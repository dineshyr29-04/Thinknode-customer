# ThinkNode Customer (React + Vite)

Professional README — instructions to run, build, deploy and troubleshoot the ThinkNode Customer frontend.

## Table of contents
- Project overview
- Prerequisites
- Quick start (local frontend + local backend)
- Environment variables
- Running with a local backend (CORS & loopback notes)
- Exposing local backend (ngrok)
- Build & deploy to Vercel
- Debugging & common issues
- Tests, linting, formatting
- Contributing

## Project overview

This repository contains the ThinkNode Customer frontend built with React and Vite. It communicates with a REST backend API (expected base URL: `http://localhost:5000` for local development).

Key folders:
- `src/` — application source
- `src/api/apiClient.js` — axios client used by the app (reads `VITE_API_BASE_URL` at build time)

## Prerequisites
- Node.js 18+ and npm (or yarn)
- Backend API (local or deployed) — this frontend expects the API endpoints listed in `src/api/apiClient.js` (e.g. `/api/customer/login`).

## Quick start (local)
1. Install dependencies:

```bash
npm install
```

2. Ensure local backend is running (default: `http://localhost:5000`).

3. Create or confirm environment file `./.env` contains:

```
VITE_API_BASE_URL="http://localhost:5000"
```

4. Start the dev server:

```bash
npm run dev
```

5. Open the app at the URL printed by Vite (usually `http://localhost:5173`).

Note: Vite inlines `import.meta.env` values at build time, so changes to `.env` require restarting the dev server.

## Environment variables
- Development: use `./.env` (example above).
- Production build: use `./.env.production` or set the variable in your hosting provider (Vercel) as `VITE_API_BASE_URL`.

Example `./.env.production`:

```
VITE_API_BASE_URL="https://api.yourdomain.com"
```

## Running with a local backend — CORS and loopback notes
- If both frontend and backend run on your machine (frontend: `http://localhost:5173`, backend: `http://localhost:5000`) requests should work with proper CORS.
- If your frontend is deployed (HTTPS) and your backend is `http://localhost:5000`, browsers will block the request due to loopback/address space restrictions. Use a public tunnel (ngrok) or deploy the backend to an accessible URL.

If you see a long loading timeout or the message `Permission was denied for this request to access the loopback address space`, use ngrok or deploy the backend.

### Enable CORS on backend (Express example)

```js
import cors from 'cors';
app.use(cors({ origin: ['https://thinknode-customer.vercel.app','http://localhost:5173'] }));
// or for testing only: app.use(cors());
```

## Expose local backend with ngrok (for testing deployed frontend)
1. Install ngrok and run:

```bash
ngrok http 5000
```

2. Copy the `https://` URL ngrok provides and set it as `VITE_API_BASE_URL` in Vercel or in `./.env.production`.

3. Redeploy the frontend (Vercel) so the build picks up the new production variable.

Note: free ngrok URLs rotate — use a reserved domain for persistent URLs.

## Build & deploy to Vercel
1. Set `VITE_API_BASE_URL` in the Vercel Project → Settings → Environment Variables (Production) to your backend URL (must be accessible from the internet and use `https://` when possible).
2. Push to your repository (or use Vercel UI) to trigger a new build. Vite will bake the env var into the production bundle.

## Debugging & common issues
- API base printed: `src/api/apiClient.js` now logs the base URL at startup. Check browser Console for `API base URL: <value>`.
- Timeout errors: the client has a 15s timeout to avoid infinite loading. A timeout usually indicates the frontend cannot reach the backend (network, server down, CORS, firewall).
- CORS errors in Console: add correct `Access-Control-Allow-Origin` on the backend (or use `cors()` during testing).
- Loopback permission errors from deployed frontend: you cannot call `http://localhost` from a site served over the public internet — use ngrok or deploy backend.

If you need to gather debugging information, check these places in order:
1. Backend logs (server console)
2. Browser DevTools → Console (for CORS / timeout logs)
3. Browser DevTools → Network (request URL, response status, and headers)

## Tests, linting, formatting
- Lint / format (if configured):

```bash
npm run lint
npm run format
```

Add or run any unit tests as applicable.

## Contributing
- Fork the repo, create a feature branch, and open a PR. Keep changes focused and include descriptive commit messages.

## Troubleshooting checklist (short)
- Confirm backend is running at the URL in `VITE_API_BASE_URL`.
- Restart dev server after `.env` changes.
- If frontend is deployed and backend is local, use ngrok or deploy backend.
- Enable CORS on backend for the frontend origin.

## Contact / Support
If you want, paste console logs (API base URL output, network request details) and backend logs here and I’ll help diagnose further.

---
© ThinkNode