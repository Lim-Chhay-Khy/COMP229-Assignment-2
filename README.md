# Run MyPortfolio

From this folder in PowerShell:

```powershell
npm.cmd run setup
npm.cmd run dev
```

Use `npm.cmd` if PowerShell blocks `npm.ps1`; no execution-policy change is needed.

The frontend runs at http://localhost:5173 and the API at http://localhost:3000.
The backend is a JSON API: opening port 3000 shows a welcome JSON response,
while the portfolio interface is on port 5173.
The API welcome response remains available while MongoDB connects. Visit
http://localhost:3000/health to check the database status. Database requests return
503 while MongoDB is unavailable. Database settings are in `MyPortfolio/config/config.js`.

Run `npm.cmd run build` and `npm.cmd run lint` to check the frontend.
See [the project README](MyPortfolio/README.md) for API endpoints and assignment details.
