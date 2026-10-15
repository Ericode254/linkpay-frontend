# LinkPay Frontend

Next.js frontend for LinkPay.

## Local setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

Make sure the backend is running at `http://127.0.0.1:8000` (or set `NEXT_PUBLIC_API_BASE_URL`).

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

For production, set this to your deployed backend URL.

## Important

- The backend must be running and migrated before logging in.
- Create an account with Register, or use demo credentials if your backend has seed data.
- Protected pages redirect to `/login` when no token is found.
