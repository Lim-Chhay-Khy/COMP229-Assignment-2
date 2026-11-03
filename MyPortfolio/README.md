# MyPortfolio — COMP229 Assignment 2

Based on the course `mern_skeleton` organization, with the Assignment 1 React `client/` retained.

## Requirements
Node.js 20.19+ or 22.12+ (Vite 8), npm, and MongoDB Community Server or Atlas.

## Start
1. Open this directory in VS Code. In a terminal, run `npm install`.
2. Run `cd client`, `npm install`, then `cd ..`.
3. The MongoDB Atlas connection string and JWT secret are set in `config/config.js` (same approach as the course `mern_skeleton`).
4. Start MongoDB locally if using the local connection.
5. From the **root** folder, run `npm run dev` (runs backend and Vite together).
6. Visit http://localhost:5173 for the React frontend and http://localhost:3000 for the JSON welcome response.

For separate terminals: root `npm run server`, then another terminal `cd client && npm run dev`. Do not run a second backend at the same time.

In PowerShell, use `npm.cmd` if `npm.ps1` is blocked. The backend at http://localhost:3000 returns JSON; the React portfolio is at http://localhost:5173. Check http://localhost:3000/health for the database connection status. The welcome response stays available while MongoDB connects; database endpoints return 503 until the connection is ready.

## MongoDB
Mongoose models use the `Portfolio` database, with collections `contacts`, `projects`, `qualifications`, and `users` (the assignment accepts `qualifications` in place of `educations`). MongoDB typically creates collections as documents are first inserted; see `sample-data/seed.mjs` for sample rows.

## API
Each resource supports GET /api/RESOURCE, GET /api/RESOURCE/:id, POST /api/RESOURCE, PUT /api/RESOURCE/:id, DELETE /api/RESOURCE/:id, DELETE /api/RESOURCE. RESOURCE is `contacts`, `projects`, `qualifications`, or `users`.

POST `/api/users` registers a new user. POST `/auth/signin` with `{ "email": "...", "password": "..." }` issues a JWT. GET or POST `/auth/signout` clears the cookie (if a bearer token was copied, the caller must discard it; stateless JWTs remain valid until expiry). All user reads/deletes/updates require bearer token; only the user can update or delete their own record. For portfolio use, POST /api/contacts is public; changes and deletes require bearer token. Project and qualification writes require bearer token.

**Important:** `DELETE /api/users` permits any signed-in user to delete all users, to satisfy the assignment endpoint. This is a classroom demo only; restrict this route to administrators in a production system.

The contact form stores **firstname, lastname and email** in MongoDB to match Assignment 2's contact schema. Phone and message stay on the frontend confirmation only; the assignment's contact collection does not specify those fields.

## Test with Postman or Thunder Client
1. `GET http://localhost:3000/` — welcome JSON.
2. `POST http://localhost:3000/api/users` with JSON `{ "name":"Demo Student", "email":"demo@example.com", "password":"Demo12345" }`.
3. `POST http://localhost:3000/auth/signin` with the same email and password. Copy `token` from response.
4. Set Authorization type `Bearer Token` with copied token on protected requests.
5. `POST /api/projects` with JSON `{ "title":"Portfolio website", "firstname":"Demo", "lastname":"Student", "email":"demo@example.com", "completion":"2026-10-14", "description":"COMP229 project" }`.
6. `GET /api/projects`, use the returned `_id` for `GET/PUT/DELETE /api/projects/:id`, then `DELETE /api/projects` to test delete-all.
7. Repeat for `qualifications` (same field names) and `contacts` (`firstname`, `lastname`, `email`). For `users`, test GET/PUT/DELETE with an authenticated user, and test DELETE-all **last**.
8. Test `GET /api/projects` without a token (200), `POST /api/projects` without a token (401), and `POST /auth/signout` (200).

## Screenshots to submit (capture on your computer, not fabricated)
- Vite frontend on 5173 and backend welcome JSON on 3000.
- VS Code terminal showing backend+frontend running and a real MongoDB connection message.
- MongoDB Compass showing `Portfolio` and its 4 collections.
- Thunder Client or Postman GET/POST/PUT/DELETE test responses, including authentication and blocked protected route.

## Submission
Submit ZIP (exclude node_modules), your own GitHub repository URL, and a Word document with actual screenshots.
