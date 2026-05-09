# My Project

A full-stack web app with a **React** frontend and **Flask** backend, orchestrated with **Docker**.

---

## Prerequisites

Make sure you have both of these installed before starting:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — runs the containers
- [Git](https://git-scm.com/) — to clone the repo (if applicable)

No need to install Python, Node, or Nginx — Docker handles all of that.

---

## Getting Started

### 1. Clone the repo (or unzip the project folder)

```bash
git clone <your-repo-url>
cd my-project
```

### 2. Start the app

```bash
docker-compose up --build
```

The `--build` flag is only needed the first time (or after changing dependencies). After that, you can just run:

```bash
docker-compose up
```

### 3. Open the app in your browser

Once you see `webpack compiled successfully` and `Running on http://...` in the terminal, open:

```
http://localhost
```

> **Windows users:** If `localhost` doesn't work, try `http://127.0.0.1` instead.
> If that still doesn't work, run `wsl hostname -I` and visit the IP it returns.

### 4. Stop the app

Press `Ctrl+C` in the terminal, or from another terminal run:

```bash
docker-compose down
```

---

## Project Structure

```
my-project/
├── docker-compose.yml        # Starts all containers together
├── nginx/
│   └── nginx.conf            # Routes traffic: /api → Flask, / → React
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── App.js            # Main React component — edit this
│       └── index.js          # Entry point
└── backend/
    ├── Dockerfile
    ├── requirements.txt      # Python dependencies
    └── main.py               # Flask app — add API routes here
```

---

## How It Works

Three containers run together:

| Container  | Role                              | Internal port |
|------------|-----------------------------------|---------------|
| `nginx`    | Reverse proxy (public entry point) | 80            |
| `frontend` | React app                         | 3000          |
| `backend`  | Flask API                         | 5000          |

- Requests to `/` go to the React frontend
- Requests to `/api/` go to the Flask backend
- Only port 80 is exposed to your machine — everything else is internal

---

## Making Changes

### Frontend (React)

Edit files in `frontend/src/`. The app hot-reloads automatically — no restart needed.

To call the backend from React:

```js
const res = await fetch('/api/your-route');
const data = await res.json();
```

### Backend (Flask)

Add new routes to `backend/main.py`:

```python
@app.route("/your-route")
def your_route():
    return jsonify({"data": "something"})
```

Then call it from React using `/api/your-route`.

After editing `main.py`, Flask restarts automatically (debug mode is on).

### Adding Python packages

Add the package to `backend/requirements.txt`, then rebuild:

```bash
docker-compose up --build
```

### Adding environment variables / API keys

Add them to `docker-compose.yml` under the `backend` service's `environment` section:

```yaml
backend:
  environment:
    - OPENAI_API_KEY=your_key_here
```

Then access in Python:

```python
import os
api_key = os.environ.get("OPENAI_API_KEY")
```

> **Never commit real API keys to Git.** Use a `.env` file and add it to `.gitignore`.

---

## Useful Commands

```bash
# Start in the background (frees up your terminal)
docker-compose up -d

# View logs
docker-compose logs

# View logs for one container
docker-compose logs backend

# Open a shell inside a container
docker-compose exec backend sh
docker-compose exec frontend sh

# Rebuild after dependency changes
docker-compose up --build

# Stop and remove containers
docker-compose down
```

---

## Troubleshooting

**"localhost" won't connect**
- Wait ~60 seconds on first run — React takes time to compile
- On Windows, try `http://127.0.0.1` instead
- Run `docker-compose ps` to confirm all containers show `Up`

**A container keeps restarting**
- Run `docker-compose logs` to see the error message

**Port 80 already in use**
- Something else on your machine is using port 80 (e.g. another web server)
- Change the port in `docker-compose.yml`: `"8080:80"` then visit `http://localhost:8080`

**"version is obsolete" warning**
- Safe to ignore, or remove the `version: "3.9"` line from `docker-compose.yml`
