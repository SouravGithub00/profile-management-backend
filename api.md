# Profile Management Backend — API Documentation

**Base URL:** `http://localhost:5000`

All endpoints live under the `/api/v1` prefix.

## Important notes

- Every request **must** include the `x-api-key` header (checked by `authCheckXAPIMiddleware`).
- Endpoints under `/users` also require an `Authorization: Bearer <token>` header (JWT obtained from login/register).
- JSON requests must use the header: `Content-Type: application/json`.

### Environment variables (set in your `.env`)

- `X_API_KEY` — the API key expected in the `x-api-key` header.
- `JWT_SECRET` — secret used to sign/verify JWT tokens.

---

## Endpoints

### 1) Register a new user

- Method: `POST`
- Path: `/api/v1/auth/register`
- Required headers:
  - `Content-Type: application/json`
  - `x-api-key: <your_backend_api_key>`

Request body (JSON):

```json
{
  "name": "Optional Full Name",
  "email": "user@example.com",
  "password": "strongpassword",
  "githubId": "optional-github-id"
}
```

Success response (201 Created):

```json
{
  "message": "User registered successfully",
  "token": "<jwt_token>",
  "user": {
    "id": "uuid",
    "name": "Optional Full Name",
    "email": "user@example.com",
    "githubId": "optional-github-id"
  }
}
```

Common errors:

- `400 Bad Request` — missing `email` or `password`, or user already exists (email unique).
- `500 Internal Server Error` — unexpected server error.

Notes:

- Passwords are stored hashed (bcrypt).

---

### 2) Login

- Method: `POST`
- Path: `/api/v1/auth/login`
- Required headers:
  - `Content-Type: application/json`
  - `x-api-key: <your_backend_api_key>`

Request body (JSON):

```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

Success response (200 OK):

```json
{
  "token": "<jwt_token>",
  "user": {
    "id": "uuid",
    "name": "Optional Full Name",
    "email": "user@example.com",
    "githubId": "optional-github-id"
  }
}
```

Common errors:

- `401 Unauthorized` — invalid email or invalid password.
- `500 Internal Server Error` — unexpected server error.

---

### 3) Get logged-in user profile

- Method: `GET`
- Path: `/api/v1/users/me`
- Required headers:
  - `x-api-key: <your_backend_api_key>`
  - `Authorization: Bearer <jwt_token>`

Request body: none

Success response (200 OK):

```json
{
  "user": {
    "id": "uuid",
    "name": "Optional Full Name or null",
    "email": "user@example.com",
    "githubId": "optional-github-id or null"
  }
}
```

Common errors:

- `401 Unauthorized` — missing/invalid `x-api-key` or missing/invalid/expired JWT token.
- `404 Not Found` — user not found (rare; indicates DB inconsistency).
- `500 Internal Server Error`.

---

### 4) Update logged-in user profile

- Method: `PUT`
- Path: `/api/v1/users/updateme`
- Required headers:
  - `Content-Type: application/json`
  - `x-api-key: <your_backend_api_key>`
  - `Authorization: Bearer <jwt_token>`

Request body (JSON): Provide only fields you want to change. Fields omitted will be left unchanged.

```json
{
  "name": "New Name",
  "email": "new@example.com",
  "githubId": "new-gh-id"
}
```

Success response (200 OK):

```json
{
  "user": {
    "id": "uuid",
    "name": "New Name or null",
    "email": "new@example.com",
    "githubId": "new-gh-id or null"
  }
}
```

Common errors:

- `401 Unauthorized` — missing/invalid `x-api-key` or missing/invalid JWT token.
- `409 Conflict` — unique constraint failed (e.g. email or githubId already used by another user). Example response:

```json
{ "error": "Unique constraint failed on [\"email\"]" }
```

- `500 Internal Server Error`.

---

## Error response shape

On errors the API commonly returns JSON with either `message` or `error` fields. Examples:

```json
{ "message": "Invalid or expired token" }
```

or

```json
{ "error": "User not found" }
```

---

## Quick cURL examples

### Register

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -d '{ "email": "me@example.com", "password": "pass" }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -d '{ "email": "me@example.com", "password": "pass" }'
```

### Get profile (replace <token> with returned JWT)

```bash
curl -X GET http://localhost:5000/api/v1/users/me \
  -H "x-api-key: your_api_key" \
  -H "Authorization: Bearer <token>"
```

### Update profile

```bash
curl -X PUT http://localhost:5000/api/v1/users/updateme \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -H "Authorization: Bearer <token>" \
  -d '{ "name": "New Name" }'
```

---

## Notes & tips

- The project uses Prisma with a SQLite database. If you get `PrismaClientInitializationError`, run `npx prisma generate` and ensure the `DATABASE_URL` in `.env` points to a valid file.
- JWT tokens expire after 1 hour by default. You can change this in `src/controllers/auth.controller.ts` if needed.
