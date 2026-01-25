# Handyman Gnomes

Full-stack scheduling experience for a handyman team. The app lets customers pick services, choose a time window, and get instant confirmations while the crew receives structured intake data.

## Highlights
- Multi-step scheduler with ZIP validation, appliance/problem picker, date + time window, and contact capture.
- Email flows via Resend: handyman receives slot links; customers get confirmations and time selections.
- Reverse geocoding support to prefill addresses (OpenStreetMap Nominatim).
- Slot capacity guardrails (Morning/Afternoon limited per day) to reduce overbooking.

## Tech stack at a glance
- Frontend: React, Vite, Tailwind-style styling (see `frontend/src`), React Router.
- Backend: Flask + Django ORM, SQLite (default `backend/handyman_orm/db.sqlite3`), requests for geocoding, email helpers in `backend/intake_email.py`.
- Tooling: npm scripts for UI, Python tooling for API, CORS enabled for local dev.

## Quickstart

### 1) Frontend
```sh
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` (default Vite port).

### 2) Backend
```sh
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate  # if you want a fresh DB
python app.py             # starts on http://localhost:5000
```

### 3) Env vars (backend/.env)
```
RESEND_API_KEY=your_resend_key
PUBLIC_APP_URL=http://127.0.0.1:5000   # used for email action links
HANDYMAN_EMAIL=you@example.com         # where intake emails go
DJANGO_DB=sqlite                       # or postgres
POSTGRES_DB=...                        # only if DJANGO_DB=postgres
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```
Copy `.env.example` to `.env` and fill the secrets before sending email.

## API surface (local)
- `POST /api/intake` — Create an intake ticket; validates ZIP, name, phone, email, address, brand, and problem. Enforces time-window capacity (Morning/Afternoon capped at 5 per day).
- `GET /api/appliances` — List appliances with problem options.
- `GET /api/problems?appliance=Name` — Problems for a given appliance (plus “Other”).
- `GET /api/time-windows` — Available time windows.
- `GET /api/appointment-action?ticket_id=...&action=...&time=...` — Records a chosen time and emails the customer.
- `GET /api/reverse-geocode?lat=...&lon=...` — OpenStreetMap reverse geocode helper.

### Data flow
1) Frontend posts to `/api/intake` with `{ zipCode, appliances, brand, problem, timeWindow, appointmentDateString, name, email, phone, address, notes, serialNumber, isUnderWarranty }`.
2) Flask validates inputs and enforces slot capacity, persists via Django models, emails handyman + customer.
3) Handyman clicks a time link (from email) which hits `/api/appointment-action` and triggers customer time confirmation.

## Project layout
```
backend/        Flask entrypoint, Django models, email flows, fixtures
	core/models.py    IntakeLog, Appliance, and slot logic
	app.py            Flask routes and validation
	info_jsons/       Appliances and time-slot JSON
frontend/       Vite + React UI
	src/pages/SchedulePage.jsx   Scheduler route
	src/components/...           Intake form steps, icons, UI kit
```

## Development tips
- Keep backend and frontend running together for the scheduler flow to work end-to-end.
- Adjust slot capacity logic in `backend/core/models.py` or `backend/app.py` if business rules change.
- If you change geocoding usage, update the User-Agent in `reverse_geocode` to respect OSM policies.
- Address validation requires 10+ characters (matches backend); keep frontend validation in sync.
- Vite dev server proxies `/api` to `http://127.0.0.1:5000` (see `frontend/vite.config.js`).
- For Windows shells, use `.venv\Scripts\activate`; on macOS/Linux use `source .venv/bin/activate`.

## Testing
- Backend (Django-style): `cd backend` then `python manage.py test` or run `python tests.py` for Flask-side checks.
- Frontend: add React Testing Library/Vitest as needed; Vite-ready config is already present.

## Deployment notes
- Backend expects env vars above and a writable database path; set `DJANGO_DB=postgres` for production-grade persistence.
- Frontend can be built with `npm run build`; serve `dist/` behind your preferred host or deploy via Vercel/Netlify.
