# ThinkNode Dev Backend

This is a lightweight Express server used for local development to provide basic auth endpoints.

Install dependencies and start:

```bash
cd server
npm install
npm start
```

Endpoints:
- `POST /api/customer/login` { email, password } -> { user, token }
- `POST /api/customer/register` { email, password, name } -> { user, token }
- `GET /health` -> { ok: true }

This server is intentionally simple and for development only. Do not use in production.
