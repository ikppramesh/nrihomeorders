# NRI Home Orders — NRI Concierge Platform

A full-stack service platform for USA-based Indians (NRIs) to manage property bills, government fees, insurance renewals, and shop-from-India orders — all handled by a ground team in Hyderabad.

---

## What It Does

NRIs living in the USA often struggle to manage recurring tasks back in India:
- Paying electricity, water, and gas bills
- Renewing LIC, health, and vehicle insurance
- Paying property tax and government fees
- Sourcing Indian products and shipping them to the US

This platform handles all of that with a **flat service fee + exact cost passthrough** model — no hidden markups on bills or products.

---

## Architecture

Turborepo monorepo with npm workspaces.

```
homebridge/
├── apps/
│   ├── web/          # Customer portal (Next.js 14, port 3000)
│   ├── api/          # REST API backend (NestJS 10, port 3001)
│   ├── admin/        # Admin CMS (React + Vite, port 3002)
│   └── agent/        # Agent PWA (React + Vite, port 3003)
├── packages/
│   ├── database/     # Prisma schema + client + seed
│   ├── ui/           # Shared React components (StatusBadge, etc.)
│   └── config/       # Shared TypeScript + ESLint configs
└── turbo.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Customer portal | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Admin CMS | React 18, Vite, TypeScript, Tailwind CSS |
| Agent PWA | React 18, Vite, TypeScript, Tailwind CSS |
| Backend API | NestJS 10, TypeScript, Passport JWT |
| Database | PostgreSQL (Prisma ORM v5) |
| Cache / Queue | Redis |
| State management | Zustand (with persist) |
| Server state | TanStack Query v5 |
| Payments | Stripe |
| Messaging | WhatsApp Cloud API (Meta), SendGrid, Twilio |
| File storage | AWS S3 |
| Build system | Turborepo |

---

## Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- **PostgreSQL** ≥ 14 (local or cloud — tested with Aiven)
- **Redis** ≥ 6 (local or cloud)

### macOS quick install

```bash
brew install postgresql@15 redis
brew services start postgresql@15
brew services start redis
```

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/ikppramesh/nrihomeorders.git
cd nrihomeorders
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials (see [Environment Variables](#environment-variables) below).

### 3. Install dependencies

```bash
npm install
```

This installs all workspace dependencies and generates the Prisma client.

### 4. Build the shared database package

```bash
npx tsc --project packages/database/tsconfig.json
```

### 5. Run database migrations

```bash
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
```

### 6. Seed initial data (admin users)

```bash
npx ts-node --project packages/database/tsconfig.json packages/database/prisma/seed.ts
```

This creates:
- **Admin**: `admin@nriconcierge.com` / `Admin@123`
- **Ops user**: `ops@nriconcierge.com` / `Admin@123`

### 7. Start all dev servers

```bash
npm run dev
```

| App | URL |
|-----|-----|
| Customer portal | http://localhost:3000 |
| REST API | http://localhost:3001 |
| Admin CMS | http://localhost:3002 |
| Agent PWA | http://localhost:3003 |
| Swagger API docs | http://localhost:3001/docs |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in all values.

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `JWT_ACCESS_EXPIRES_IN` | Access token TTL (e.g. `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL (e.g. `30d`) |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta Cloud API phone number ID |
| `WHATSAPP_ACCESS_TOKEN` | Meta permanent system user token |
| `WHATSAPP_APP_SECRET` | For HMAC webhook verification |
| `WHATSAPP_VERIFY_TOKEN` | Custom token for webhook setup |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (frontend) |
| `SENDGRID_API_KEY` | SendGrid API key |
| `SENDGRID_FROM_EMAIL` | From email address |
| `AWS_ACCESS_KEY_ID` | AWS credentials for S3 uploads |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_REGION` | S3 bucket region (e.g. `ap-south-1`) |
| `AWS_S3_BUCKET` | S3 bucket name |
| `NEXT_PUBLIC_API_URL` | API base URL for the customer portal |
| `USD_TO_INR_RATE` | Exchange rate used for INR display |

---

## Applications

### Customer Portal (`apps/web`) — port 3000

Next.js 14 App Router. Customers register, log in, and manage all their requests.

**Pages:**
- `/` — Landing page
- `/login` · `/register` — Auth
- `/dashboard` — Overview with quick-action cards
- `/dashboard/orders` — All orders with status
- `/dashboard/orders/[id]` — Order detail + **two-way chat** with NRI Team
- `/dashboard/new-request` — Submit a new service request (4 service types)
- `/dashboard/renewals` — Bill/insurance reminder manager (WhatsApp alerts)
- `/dashboard/profile` — Edit name, phone, WhatsApp number, change password

**Service types:**
| Value | Description |
|-------|-------------|
| `NRI_SEVA_BILL_PAYMENT` | Electricity, water, gas, internet |
| `NRI_SEVA_INSURANCE_RENEWAL` | LIC, health, vehicle, home insurance |
| `NRI_SEVA_GOVT_FEE` | Property tax, municipal fees, registrations |
| `SHOP_INDIA_PRODUCT_SOURCING` | Source any product — inspected & shipped to US |

---

### REST API (`apps/api`) — port 3001

NestJS 10 REST API. All routes are prefixed with `/v1`.

**Auth endpoints:**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/v1/auth/register` | Customer registration |
| POST | `/v1/auth/login` | Customer login |
| POST | `/v1/auth/admin/login` | Admin / ops login |
| POST | `/v1/auth/refresh` | Refresh access token |
| POST | `/v1/auth/logout` | Invalidate refresh token |

**Customer endpoints (JWT required):**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/v1/profile` | Get customer profile |
| PATCH | `/v1/profile` | Update name / phone / WhatsApp |
| GET | `/v1/orders` | List customer's orders |
| POST | `/v1/orders` | Create a new order |
| GET | `/v1/orders/:id` | Get order detail + events |
| PATCH | `/v1/orders/:id/cancel` | Cancel an order |
| POST | `/v1/orders/:id/message` | Send a message to the NRI Team |
| PATCH | `/v1/quotes/:id/approve` | Approve a quote |
| GET | `/v1/renewals` | List renewal reminders |
| POST | `/v1/renewals` | Add a renewal reminder |
| DELETE | `/v1/renewals/:id` | Remove a reminder |

**Admin endpoints (Admin JWT required):**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/v1/admin/orders` | List all orders (paginated, filterable) |
| GET | `/v1/admin/orders/:id` | Order detail with full event log |
| PATCH | `/v1/admin/orders/:id/status` | Update order status |
| PATCH | `/v1/admin/orders/:id/assign` | Assign a field agent |
| POST | `/v1/admin/orders/:id/message` | Send a message to customer |
| POST | `/v1/admin/orders/:id/notes` | Add an internal (team-only) note |
| GET | `/v1/admin/customers` | List all customers |
| GET | `/v1/admin/agents` | List all field agents |
| POST | `/v1/quotes/orders/:id` | Create a quote for an order |

Full interactive docs at: **http://localhost:3001/docs**

---

### Admin CMS (`apps/admin`) — port 3002

React + Vite dashboard for the NRI Concierge operations team.

**Pages:**
- `/` — Dashboard with KPI stats (orders, revenue, pending quotes)
- `/orders` — Orders table with status tabs and search
- `/orders/:id` — Order detail with:
  - Customer info + WhatsApp link
  - Full **two-way chat panel** (indigo = team message, green = customer reply, amber = internal note)
  - Status-based quick message templates
  - Update status dropdown
  - Assign field agent
  - Create / view quotes
- `/customers` — Customer list with KYC status
- `/customers/:id` — Customer detail
- `/agents` — Field agents list
- `/whatsapp` — WhatsApp conversation manager

**Chat system:**
- **💬 Message Customer** — Visible to customer in their portal
- **🔒 Internal Note** — Team-only, never shown to customer
- **🟢 Customer Reply** — Right-aligned green bubble when customer responds
- Status-specific quick templates auto-populate the compose box

---

### Agent PWA (`apps/agent`) — port 3003

Progressive Web App for field agents in Hyderabad.

- Mobile-optimised PWA (installable on Android/iOS)
- Agent login and assigned orders list
- Inspection reports with photo upload
- Real-time status updates

---

## Database Schema (key models)

```
Customer          — NRI user with KYC status and subscription plan
AdminUser         — Ops team and admin accounts
FieldAgent        — Hyderabad-based field agents
Order             — Core service request with status pipeline
OrderQuote        — Versioned quotes with line items
OrderEvent        — Full audit log + customer/team chat messages
OrderPayment      — Stripe payment records
OrderInspection   — Agent inspection reports
Shipment          — Tracking info for SHOP_INDIA orders
RenewalItem       — Bill/insurance due-date reminders
FamilyMember      — Customer's India family contacts
IndiaAddress      — Property addresses in India
UsaShippingAddress — Delivery address in the USA
Document          — S3-stored files shared with customer
```

### Order status pipeline

**NRI Seva (bill / govt / insurance):**
```
NEW_REQUEST → UNDER_REVIEW → QUOTE_SENT → APPROVED_PAID → SOURCING → COMPLETED
```

**Shop from India:**
```
NEW_REQUEST → UNDER_REVIEW → QUOTE_SENT → APPROVED_PAID → SOURCING →
QUALITY_CHECK → QC_APPROVED → PACKING → CUSTOMS_DOCS →
DISPATCHED → IN_TRANSIT → DELIVERED → COMPLETED
```

---

## Pricing Model

**Flat service fee (never a percentage):**

| Bill Amount | NRI Seva Fee |
|-------------|--------------|
| Up to $50 | $3 |
| $50–$100 | $5 |
| $100–$200 | $8 |
| $200–$500 | $12 |
| $500+ | $18 |

**Shop from India:** $8 per item sourcing fee + exact product cost + actual shipping.

**Subscriptions (optional):**
| Plan | Price | Includes |
|------|-------|---------|
| Basic | $19/month | 3 bills/month |
| Pro | $45/month | 10 bills + 1 shop order |
| Elite | $89/month | Unlimited bills + 3 shop orders |

The customer pays **exact cost** for the underlying bill/product/shipping — zero markup.

---

## Development Scripts

```bash
# Start all apps in dev mode
npm run dev

# Build all apps
npm run build

# Run database migrations
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma

# Open Prisma Studio (GUI for the database)
npx prisma studio --schema=packages/database/prisma/schema.prisma

# Re-seed the database (resets admin users)
npx ts-node --project packages/database/tsconfig.json packages/database/prisma/seed.ts

# Rebuild the shared database package after schema changes
npx tsc --project packages/database/tsconfig.json

# Build only the API
npm run build --workspace=apps/api
```

---

## Deployment Notes

### API (NestJS)
- Build: `npm run build --workspace=apps/api`
- Start: `node apps/api/dist/main`
- Set `NODE_ENV=production` and strong `JWT_SECRET` values

### Customer portal (Next.js)
- Build: `npm run build --workspace=apps/web`
- Start: `npm run start --workspace=apps/web`
- Set `NEXT_PUBLIC_API_URL` to your production API URL

### Admin CMS & Agent PWA (Vite)
- Build: `npm run build --workspace=apps/admin` and `apps/agent`
- Outputs to `apps/admin/dist` and `apps/agent/dist` — serve as static files via Nginx or Vercel

### Database
- Run migrations before deploying: `npx prisma migrate deploy`
- Never run `prisma migrate dev` in production (use `deploy`)

---

## Default Credentials (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@nriconcierge.com | Admin@123 |
| Ops | ops@nriconcierge.com | Admin@123 |

> Change these immediately in any non-local environment.

---

## Project Structure (detail)

```
apps/
  web/
    src/app/(dashboard)/dashboard/
      orders/           # Order list + detail pages
      new-request/      # Service request wizard
      renewals/         # Reminder manager
      profile/          # Profile + password change
    src/lib/
      api.ts            # Axios instance with JWT interceptor
      auth-store.ts     # Zustand auth state (persisted)

  api/
    src/
      auth/             # JWT auth, register, login, refresh
      orders/           # Customer order CRUD + messaging
      quotes/           # Quote creation and approval
      renewals/         # Renewal reminders + cron job
      profile/          # Customer profile management
      admin/
        orders/         # Admin order management + chat
        customers/      # Admin customer view
        agents/         # Admin agent management
      agents/           # Field agent endpoints
      whatsapp/         # WhatsApp Cloud API integration
      storage/          # S3 file upload service

  admin/
    src/pages/
      Dashboard.tsx     # KPI overview
      Orders.tsx        # Order list with filters
      OrderDetail.tsx   # Order detail + full chat panel
      Customers.tsx     # Customer management
      Agents.tsx        # Agent management
      Whatsapp.tsx      # WhatsApp conversation view

packages/
  database/
    prisma/
      schema.prisma     # Full database schema
      seed.ts           # Admin user seeder
      migrations/       # SQL migration files
    src/index.ts        # Singleton Prisma client export

  ui/
    src/components/
      StatusBadge.tsx   # Order status badge component
```

---

## License

Private — All rights reserved.

Built for NRI Concierge © 2026
