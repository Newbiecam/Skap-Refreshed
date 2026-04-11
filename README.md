# Skap Refreshed (Vercel + Supabase)

This project is now structured for **Vercel deployment** with:
- Static frontend (HTML/CSS/JS)
- Serverless API routes in `/api`
- Supabase-backed username storage in `public.usernames`

## What changed

- Frontend now calls relative API routes:
  - `GET /api/usernames`
  - `POST /api/claim-username`
- Supabase service credentials are server-only environment variables.
- No Supabase secret keys are exposed client-side.

## Environment variables

Use these variables in Vercel:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

A template is included in `.env.example`.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. Set `SUPABASE_SECRET_KEY` in `.env.local` to your Supabase **service role** key.
4. Run locally with Vercel:
   ```bash
   npm run dev
   ```

## Exact Vercel deployment steps

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **Add New...** → **Project**.
3. Import this repository.
4. In **Project Configuration**:
   - Framework Preset: **Other** (or leave auto-detected)
   - Build Command: *(leave empty)*
   - Output Directory: *(leave empty)*
5. Open **Environment Variables** and add:
   - `SUPABASE_URL` = `https://wloyrwzjnrdurkaaqitz.supabase.co`
   - `SUPABASE_SECRET_KEY` = your Supabase service role key
6. Click **Deploy**.
7. After deploy, test:
   - `https://<your-project>.vercel.app/api/usernames`
   - `https://<your-project>.vercel.app/`

## API contract

### `GET /api/usernames`
Returns:
```json
{ "usernames": ["alice", "bob"] }
```

### `POST /api/claim-username`
Body:
```json
{ "username": "alice" }
```
Returns `201` on success, `409` if username already exists.

## Supabase table

Expected table: `public.usernames`

Columns used:
- `id`
- `username`
- `created_at`
