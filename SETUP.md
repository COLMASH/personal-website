# personal-website — Setup Guide

Post-scaffold checklist to go from code to fully deployed. Work through each section in order.
Delete this file once setup is complete.

---

## Prerequisites

You need accounts on these services (all have free tiers):

- [x] [GitHub](https://github.com) — code hosting, CI/CD, container registry
- [ ] [Vercel](https://vercel.com) — frontend hosting (connect with GitHub)
- [ ] [Sentry](https://sentry.io) — error monitoring
- [ ] VPS provider — [Hetzner](https://hetzner.com) or [GCP](https://cloud.google.com) for backend hosting

---

## Step 1: GitHub Repository

**Where:** [github.com/new](https://github.com/new)

- [x] Create a new repository named `personal-website`
- [x] Push the scaffolded code:
  ```bash
  git init
  git add -A
  git commit -m "Initial scaffold"
  git remote add origin git@github.com:COLMASH/personal-website.git
  git push -u origin main
  ```
- [ ] Enable GitHub Container Registry (GHCR) — it's on by default for public repos. For private repos, go to **Settings → Packages** and ensure packages are enabled.

---

## Step 2: Sentry Projects

**Where:** [sentry.io](https://sentry.io) → Create Project

Create **two** Sentry projects under the same organization:

### Frontend (Next.js)
- [ ] Create project → Platform: **Next.js**
- [ ] Copy the DSN → this is your `NEXT_PUBLIC_SENTRY_DSN`
- [ ] Note: `NEXT_PUBLIC_SENTRY_DSN = ` ____________________

### Backend (NestJS)
- [ ] Create project → Platform: **Node.js (NestJS)**
- [ ] Copy the DSN → this is your `SENTRY_DSN`
- [ ] Note: `SENTRY_DSN = ` ____________________

---

## Step 3: VPS Provisioning (Backend)

**Where:** [Hetzner Cloud Console](https://console.hetzner.cloud) or [GCP Console](https://console.cloud.google.com)

> **Note:** No database provisioning needed — SQLite is file-based and runs inside the API container. The database file persists in a mounted volume (`./data`).

### Provision the server
- [ ] Create a VPS (recommended: 2 vCPU, 4GB RAM, Ubuntu 24.04)
- [ ] Note the public IP: `VPS_HOST = ` ____________________
- [ ] Add your SSH key during creation (or after via `ssh-copy-id`)

### Install Docker on the VPS
- [ ] SSH into the server and run:
  ```bash
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker $USER
  # Log out and back in for group changes to take effect
  ```

### Create deployment user (recommended)
- [ ] Create a `deploy` user instead of using root:
  ```bash
  sudo adduser deploy
  sudo usermod -aG docker deploy
  # Copy your SSH key to the deploy user
  sudo mkdir -p /home/deploy/.ssh
  sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/
  sudo chown -R deploy:deploy /home/deploy/.ssh
  ```
- [ ] Note: `VPS_USER = ` ____________________

### Set up the application directory
- [ ] Create the app directory and data directory:
  ```bash
  sudo mkdir -p /opt/personal-website/data
  sudo chown -R deploy:deploy /opt/personal-website
  ```
- [ ] Copy `docker-compose.yml` to `/opt/personal-website/docker-compose.yml`
- [ ] Create `.env.production` from `.env.production.example` with real values (see Step 6)

### Generate deployment SSH key
- [ ] On your **local machine**, generate a key pair for CI/CD:
  ```bash
  ssh-keygen -t ed25519 -f ~/.ssh/personal-website-deploy -C "github-actions-deploy"
  ```
- [ ] Add the **public** key to the VPS:
  ```bash
  ssh-copy-id -i ~/.ssh/personal-website-deploy.pub deploy@{VPS_HOST}
  ```
- [ ] The **private** key content goes into GitHub Secrets as `VPS_SSH_KEY`

### Start infrastructure services
- [ ] On the VPS:
  ```bash
  cd /opt/personal-website
  docker compose up -d redis
  ```

---

## Step 4: Vercel (Frontend Deployment)

**Where:** [vercel.com](https://vercel.com) → Import Project

- [ ] Click **"Add New → Project"** and import your GitHub repository
- [ ] Set **Root Directory** to `apps/web`
- [ ] Framework Preset should auto-detect **Next.js**
- [ ] Add environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.{your-domain}.com` (your backend URL) |
| `NEXT_PUBLIC_SENTRY_DSN` | _(from Step 2)_ |
| `NEXT_PUBLIC_SENTRY_ENABLED` | `true` |
| `NEXT_PUBLIC_ENV` | `production` |
| `AUTH_SECRET` | _(generate: `openssl rand -base64 33`)_ |
| `API_URL` | Same as `NEXT_PUBLIC_API_URL` (or internal URL if using private networking) |

- [ ] Click **Deploy**
- [ ] Note your Vercel URL: ____________________
  - Production: `https://personal-website.vercel.app` (or custom domain)
  - Preview: Auto-generated per PR

### TurboRepo Remote Cache (optional but recommended)
- [ ] Run locally: `npx turbo login && npx turbo link`
- [ ] Go to [vercel.com/account/tokens](https://vercel.com/account/tokens) and create a token
- [ ] Note: `TURBO_TOKEN = ` ____________________
- [ ] Note your team slug: `TURBO_TEAM = ` ____________________

---

## Step 5: GitHub Repository Settings

**Where:** GitHub → Your repo → **Settings**

### Secrets (Settings → Secrets and variables → Actions → Secrets)

| Secret | Value | Source |
|--------|-------|--------|
| `VPS_HOST` | VPS IP address | Step 3 |
| `VPS_USER` | `deploy` (or your deploy username) | Step 3 |
| `VPS_SSH_KEY` | Contents of `~/.ssh/personal-website-deploy` (private key) | Step 3 |
| `TURBO_TOKEN` | Vercel remote cache token | Step 4 |

### Variables (Settings → Secrets and variables → Actions → Variables)

| Variable | Value | Source |
|----------|-------|--------|
| `TURBO_TEAM` | Vercel team slug | Step 4 |

### Environments (Settings → Environments)

- [ ] Create a **production** environment
- [ ] Add required reviewers (optional — adds deploy approval gate)
- [ ] Restrict to `main` branch only

### Branch Protection (Settings → Branches → Add rule for `main`)

- [ ] Require a pull request before merging
- [ ] Required approvals: **1**
- [ ] Dismiss stale pull request approvals when new commits are pushed
- [ ] Require status checks to pass: **Lint & Type Check**, **Test Frontend**, **Test Backend**
- [ ] Require branches to be up to date before merging
- [ ] Do not allow bypassing the above settings
- [ ] Disallow force pushes

---

## Step 6: Production Environment Variables

### Backend (.env.production on VPS)

SSH into your VPS and create `/opt/personal-website/.env.production`:

```env
# ---------- Database ----------
DATABASE_URL=file:/app/data/personal-website.db

# ---------- Auth ----------
JWT_SECRET=                 # generate: openssl rand -base64 64
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=60

# ---------- App ----------
ENVIRONMENT=production
APP_DEBUG=false
LOG_LEVEL=INFO

# ---------- CORS ----------
BACKEND_CORS_ORIGINS=["https://{vercel-url}"]   # from Step 4

# ---------- Rate Limiting ----------
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_PERIOD=60

# ---------- Sentry ----------
SENTRY_DSN=                 # from Step 2
SENTRY_ENABLED=true

# ---------- Redis ----------
REDIS_URL=redis://:PASSWORD@redis:6379/0
REDIS_PASSWORD=             # generate: openssl rand -base64 32
```

- [ ] Generate all secrets marked with "generate:"
- [ ] Fill in all values from previous steps
- [ ] Verify: `docker compose up -d && docker compose logs -f api`

### Frontend (already configured in Vercel — Step 4)

Double-check that `BACKEND_CORS_ORIGINS` on the backend includes your Vercel domain.

---

## Step 7: DNS (Optional — Custom Domain)

### Frontend (Vercel)
- [ ] In Vercel → Project → **Settings → Domains** → Add your domain
- [ ] Add DNS records as instructed (CNAME or A record)

### Backend (VPS)
- [ ] Add an A record pointing `api.{your-domain}.com` to your VPS IP
- [ ] Set up HTTPS with a reverse proxy on the VPS:
  ```bash
  # Install Caddy (auto-HTTPS with Let's Encrypt)
  sudo apt install -y caddy
  ```
- [ ] Create `/etc/caddy/Caddyfile`:
  ```
  api.{your-domain}.com {
      reverse_proxy localhost:8000
  }
  ```
- [ ] Restart Caddy: `sudo systemctl restart caddy`
- [ ] Update `NEXT_PUBLIC_API_URL` in Vercel to `https://api.{your-domain}.com`
- [ ] Update `BACKEND_CORS_ORIGINS` on VPS to include your frontend domain

---

## Step 8: Verify the Full Pipeline

### Local development
- [ ] `pnpm install` completes without errors
- [ ] `docker compose up redis -d` starts Redis
- [ ] `pnpm dev` starts both apps
- [ ] Login page loads at `http://localhost:3000`
- [ ] Health check passes: `curl http://localhost:8000/api/v1/health`

### CI pipeline
- [ ] Create a branch, make a change, open a PR
- [ ] Verify all CI checks pass (Lint & Type Check, Test Frontend, Test Backend)
- [ ] Verify Vercel preview deployment appears on the PR

### Production deployment
- [ ] Merge the PR to `main`
- [ ] Verify Vercel production deployment succeeds
- [ ] Verify GitHub Actions deploys backend to VPS
- [ ] Verify backend health: `curl https://api.{your-domain}.com/api/v1/health`
- [ ] Verify frontend loads and can reach backend

### Monitoring
- [ ] Trigger a test error on frontend — verify it appears in Sentry
- [ ] Trigger a test error on backend — verify it appears in Sentry

---

## Quick Reference: Where Each Secret Lives

| Secret | Where it's set | Who uses it |
|--------|---------------|-------------|
| `AUTH_SECRET` | Vercel env vars | Next.js (NextAuth session encryption) |
| `JWT_SECRET` | VPS `.env.production` | Backend (token signing) |
| `DATABASE_URL` | VPS `.env.production` | Backend (SQLite file path) |
| `NEXT_PUBLIC_API_URL` | Vercel env vars | Frontend (browser API calls) |
| `API_URL` | Vercel env vars | Frontend server-side (NextAuth) |
| `SENTRY_DSN` | VPS `.env.production` | Backend (error reporting) |
| `NEXT_PUBLIC_SENTRY_DSN` | Vercel env vars | Frontend (error reporting) |
| `VPS_SSH_KEY` | GitHub Secrets | GitHub Actions (deploy) |
| `TURBO_TOKEN` | GitHub Secrets | GitHub Actions (TurboRepo cache) |
| `REDIS_PASSWORD` | VPS `.env.production` | Backend (session/cache) |

---

**Once everything is verified, delete this file** — it has served its purpose.
