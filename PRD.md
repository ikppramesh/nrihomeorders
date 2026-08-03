# Product Requirements Document (PRD)
## NRI Concierge Platform — Hyderabad Operations Hub

**Version:** 2.0 (MVP Focused)
**Date:** August 2026
**Status:** Active Draft
**Owner:** Founder / Product Lead

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Core Philosophy & Brand Promise](#2-core-philosophy--brand-promise)
3. [Problem Statement](#3-problem-statement)
4. [Business Goals & Success Metrics](#4-business-goals--success-metrics)
5. [Target Users & Personas](#5-target-users--personas)
6. [MVP Service Catalog — NRI Seva & Shop from India](#6-mvp-service-catalog)
7. [Manual Verification — The Core Process](#7-manual-verification--the-core-process)
8. [**Transparency & Verification of Goods**](#8-transparency--verification-of-goods)
9. [Pricing Model](#9-pricing-model)
10. [System Architecture Overview](#10-system-architecture-overview)
11. [Feature Specifications](#11-feature-specifications)
    - 11.1 [Customer Portal (Web)](#111-customer-portal-web)
    - 11.2 [Admin CMS / Ops Dashboard](#112-admin-cms--ops-dashboard)
    - 11.3 [Agent Mobile App (PWA)](#113-agent-mobile-app-pwa)
    - 11.4 [WhatsApp Integration](#114-whatsapp-integration)
11. [Order Pipelines — Step by Step](#11-order-pipelines--step-by-step)
    - 11.1 [Pipeline 1 — NRI Seva (Bills · Insurance · Fees)](#111-pipeline-1--nri-seva)
    - 11.2 [Pipeline 2 — Shop from India](#112-pipeline-2--shop-from-india)
    - 11.3 [**Live Order Tracker — Every Stage Visible to Customer**](#113-live-order-tracker--every-stage-visible-to-the-customer)
12. [Shipping Details — India to USA](#12-shipping-pipeline--india-to-usa)
14. [Quality Control & Accountability Framework](#14-quality-control--accountability-framework)
14. [WhatsApp Communication Flows](#14-whatsapp-communication-flows)
15. [Notification System](#15-notification-system)
16. [Authentication & KYC](#16-authentication--kyc)
17. [Payment Processing](#17-payment-processing)
18. [Data Model](#18-data-model)
19. [API Specification](#19-api-specification)
20. [Non-Functional Requirements](#20-non-functional-requirements)
21. [Compliance & Legal](#21-compliance--legal)
22. [Tech Stack](#22-tech-stack)
23. [Integrations](#23-integrations)
24. [Development Milestones](#24-development-milestones)
25. [Open Questions](#25-open-questions)

---

## 1. Executive Summary

The NRI Concierge Platform is a **trust-first, human-verified** service that helps Non-Resident Indians (NRIs) in the United States handle India-side tasks from Hyderabad.

**MVP Scope (what we launch with):**

| Service Bucket | What We Do |
|---|---|
| **NRI Seva** | Bill payments, insurance premium renewals, government fee payments & registrations — handled end-to-end on your behalf from Hyderabad |
| **Shop from India** | Source any product from any Indian vendor, physically verify quality, then ship to USA |

> **NRI Seva** is the name of our first service line — your dedicated India-side agent for every bill, renewal, and government fee. We handle it so you never miss a due date or stand in a queue again.

**What sets us apart:**
- Every single order is **manually verified** by a human before execution and delivery
- We reject bad products and bad vendors — **we never ship what we would not trust ourselves**
- We charge **honest, transparent pricing** — no looting, no hidden markups
- We are **fully accountable**: if something goes wrong, we own it and fix it

---

## 2. Core Philosophy & Brand Promise

### Our Promise to Every Customer

> "You trust us with your money and your family's needs from 10,000 miles away. We treat that trust like it is our own."

### Four Pillars

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   HUMAN         │  │   QUALITY        │  │   HONESTY       │  │  ACCOUNTABILITY │
│   VERIFICATION  │  │   FIRST          │  │   IN PRICING    │  │                 │
│                 │  │                  │  │                 │  │                 │
│ Every order     │  │ We physically    │  │ You see every   │  │ If it goes      │
│ reviewed by a   │  │ inspect every    │  │ rupee spent.    │  │ wrong, we own   │
│ real human.     │  │ product before   │  │ No markups.     │  │ it and make     │
│ No automation   │  │ it ships.        │  │ No surprises.   │  │ it right.       │
│ on decisions.   │  │ Bad = rejected.  │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

### What "Accountable" Means in Practice

- If a bill is paid late due to our error → **we cover any late fees**
- If a product arrives damaged (our handling) → **full refund or replacement**
- If a vendor sends wrong/inferior item → **we reject it before shipping, customer informed immediately**
- If we cannot fulfill a request → **full refund within 24 hours, no questions**
- If a product costs less than quoted → **we refund the difference**

### Pricing Philosophy

- We charge a **flat service fee** for our time and coordination
- The **actual cost** (bill amount, product price, shipping) is passed through at **exact cost — no markup**
- We will source from **multiple vendors** and show the customer options before purchasing
- We **challenge inflated prices** from vendors on behalf of the customer

---

## 3. Problem Statement

### The Reality for USA-Based Indians

More than 4.5 million Indian-Americans live in the USA. Most have unresolved, recurring India-side obligations:

**Bills & Payments:**
- Electricity / water / property tax bills pile up when NRIs forget due dates
- Indian government portals require Aadhaar OTP to an Indian phone — inaccessible from USA
- LIC premium lapses cause policy cancellation — a devastating financial loss
- GHMC / MRO fees require physical presence or trusted local proxy

**Shopping from India:**
- NRIs want authentic Indian products — specific sweets, sarees, dry fruits, handicrafts, medicines, regional specialties — not available in USA
- Current options are either unavailable, grossly overpriced on Amazon/US Indian stores, or unreliable individual couriers
- No accountability when a seller sends wrong/damaged goods
- Customs documentation and shipping coordination are confusing

### The Looting Problem

```
A saree that costs ₹3,000 in Hyderabad is sold for $150–$200 on US websites.
A 1kg box of Kakinada Kaja is ₹400 in Hyderabad but $35+ in USA stores.
A customer asks a "friend" to bring something — it either never comes or arrives wrong.
```

**We fix this:** Source at local Hyderabad prices, charge a fair service fee, pass through exact cost.

### Why Existing Solutions Fail

| Solution | Failure |
|---|---|
| Asking relatives | Burden, delay, no accountability, relationship tension |
| Indian e-commerce (Flipkart/Amazon IN) | Won't ship internationally; limited catalog |
| US NRI stores | 3–5x markup; not fresh; limited regional variety |
| Individual couriers / luggage carriers | No tracking, unreliable, customs issues |
| Other NRI platforms | Automated, no human check, no accountability |

---

## 4. Business Goals & Success Metrics

### Business Goals

1. Build **absolute trust** with the first 100 customers — word-of-mouth is the primary growth engine
2. Achieve **zero unresolved complaints** in the first 6 months
3. Establish Hyderabad as the operating base and expand to other cities only after quality is proven
4. Grow recurring revenue through subscriptions as customers experience reliability

### Key Performance Indicators

| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Registered Customers | 50 | 200 | 800 |
| Monthly Active Customers | 30 | 120 | 500 |
| Monthly Recurring Revenue | $2,000 | $8,000 | $35,000 |
| Orders/Month | 100 | 400 | 1,800 |
| Order Completion Rate | >92% | >95% | >97% |
| Customer Satisfaction (CSAT) | >4.3/5 | >4.5/5 | >4.7/5 |
| Product Rejection Rate (Quality) | Track | <15% rejected | <10% |
| WhatsApp Response Time | <4 hours | <2 hours | <1 hour |
| Refunds Issued | Track all | <5% of orders | <3% |
| NPS Score | >45 | >55 | >65 |

### Quality Metrics (Tracked Every Week)

- Number of products rejected after inspection (with reason)
- Number of bills paid before due date vs. on/after due date
- Number of customer complaints resolved within 24 hours
- Number of orders where customer was informed of a problem before it became their problem

---

## 5. Target Users & Personas

### Persona 1: Srinivas — Telugu IT Professional
- **Location:** Dallas, TX
- **Age:** 36
- **Background:** Works at TCS; moved to USA 8 years ago
- **India needs:** Parents' electricity and LIC bills, property tax for house in Hyderabad, wants to send regional sweets and pickles to his USA home
- **Pain point:** LIC lapsed once because his cousin forgot to pay; cost him reinstatement fees
- **What he wants:** Someone he can trust blindly, like a dependable relative in Hyderabad
- **WhatsApp usage:** Daily; prefers voice notes and quick updates

### Persona 2: Lalitha — NRI Homemaker
- **Location:** New Jersey, NJ
- **Age:** 44
- **Background:** Managing household; husband is a doctor
- **India needs:** Send sarees, Kanjeevaram silk, traditional jewelry to her USA home; pay water and electricity for in-laws
- **Pain point:** Ordered a Kanjeevaram saree online — received a synthetic fake. Lost $120.
- **What she wants:** Someone who physically checks the saree quality before buying and shipping
- **WhatsApp usage:** Very active; shares photos; wants to see product photos before purchase

### Persona 3: Ramesh — Business Owner in USA
- **Location:** Houston, TX
- **Age:** 51
- **Background:** Owns a chain of Indian restaurants
- **India needs:** Source authentic spices, pickles, specific regional ingredients in bulk; pay property taxes on 2 plots; renew trade licenses
- **Pain point:** Vendors cheat — short weight, stale stock, wrong variety
- **What he wants:** Someone who weighs, tastes, and verifies every shipment before it leaves India
- **WhatsApp usage:** Very formal; prefers clear written updates with photos; no delays

### Persona 4: Meena — Young NRI Professional
- **Location:** Seattle, WA
- **Age:** 28
- **Background:** Software engineer; moved 3 years ago
- **India needs:** Gift delivery to parents (specific items they asked for), pay LIC premium for policy her father took in her name
- **Pain point:** Tried to use an NRI service before — paid, never heard back, no refund
- **What she wants:** Transparency at every step, WhatsApp updates with photos, easy refund if something is wrong
- **WhatsApp usage:** Heavy user; expects quick responses, hates being ignored

### Persona 5: Admin Ops Manager (Internal)
- **Location:** Hyderabad office
- **Role:** Reviews all incoming orders, assigns field agents, approves/rejects products after inspection, communicates with customers
- **Needs:** Clean order board, product inspection checklist, WhatsApp reply interface, ability to upload inspection photos

### Persona 6: Field Agent (Internal)
- **Location:** Hyderabad, various zones
- **Role:** Visits vendors, inspects products, pays bills in-person, packs and ships items
- **Needs:** Task instructions on mobile, photo upload (before/after), checklist per task type, GPS check-in

---

## 6. MVP Service Catalog

The platform launches with two clearly named service buckets:

```
┌────────────────────────────────────┐   ┌────────────────────────────────────┐
│           NRI SEVA                  │   │        SHOP FROM INDIA              │
│                                    │   │                                    │
│  Bills · Registrations · Renewals  │   │  Source · Inspect · Ship to USA    │
│                                    │   │                                    │
│  → Bill Payments                   │   │  Any product from any Indian       │
│  → Insurance Premium Renewals      │   │  vendor, physically verified       │
│  → Government Fees & Registrations │   │  before shipping                   │
│                                    │   │                                    │
│  "Your India-side payment agent"   │   │  "Your trusted shopper in India"   │
└────────────────────────────────────┘   └────────────────────────────────────┘
```

---

### NRI Seva — Service 1: Bill Payments

**What we pay on customer's behalf:**

| Category | Specific Bills |
|---|---|
| Electricity | TSSPDCL, APSPDCL, NPDCL (all Telangana/AP discoms) |
| Water | HMWSSB, municipal water boards |
| Property Tax | GHMC, municipal corporations (Telangana/AP) |
| Broadband / Cable | ACT, Airtel, BSNL, Hathway, Tata Play |
| Mobile Recharge | Airtel, Jio, BSNL (postpaid and prepaid) |
| Gas | IGL, Indane, HP Gas, Bharat Gas booking fee |
| Society / Maintenance | Apartment maintenance, parking fees |

**How it works:**
1. Customer submits consumer number + approximate amount
2. We verify the exact current due amount on the portal
3. We send customer the exact amount + our service fee for approval via WhatsApp
4. Customer approves → we pay → we send receipt photo/PDF via WhatsApp and portal
5. If the biller site is down or payment fails → we inform customer immediately and retry

**SLA:** Payment executed within **1 business day** of customer approval

---

### NRI Seva — Service 2: Insurance Premiums & Renewals

**What we handle:**

| Type | Providers |
|---|---|
| Life Insurance | LIC, SBI Life, HDFC Life, ICICI Prudential, Max Life |
| Health Insurance | Star Health, Niva Bupa, United India, National Insurance |
| Vehicle Insurance | New India Assurance, Bajaj Allianz, ICICI Lombard, HDFC ERGO |
| Home Insurance | National Insurance, United India |

**How it works:**
1. Customer provides policy number + insurer name
2. We look up the exact premium due (with renewal date, sum assured verification)
3. We send a **premium summary card** to customer via WhatsApp before paying:
   - Policy number, insurer, due date, exact premium, our fee
4. Customer approves → we pay → policy receipt / acknowledgment sent immediately
5. We set a **reminder 30 days before next renewal** automatically

**Critical accountability:** LIC/insurance premium lapses are catastrophic. We track renewal dates and **proactively remind customers 30 days, 7 days, and 1 day** before due — even without a pending order.

**SLA:** Payment executed within **1 business day** of customer approval. **Never miss a renewal.**

---

### NRI Seva — Service 3: Government Fees & Registrations

**What we handle (in-person and online):**

| Category | Examples |
|---|---|
| GHMC | Property tax, trade license renewal, building plan fees |
| RTO | Driving license renewal, vehicle tax, NOC, fitness certificate |
| MRO / Tahsildar | Income certificate, residence certificate, caste certificate |
| Passport | PSK / Post Office Passport Seva appointment fees |
| Court Fees | Stamp paper purchase, court fee stamps |
| GST Portal | GST filing fee payments (for customers' India businesses) |
| Education | University fee payment, examination fees |
| Other | Any government portal or in-person fee — customer can request, we assess |

**Important:** We do not submit forms or applications — we only **pay the fees and collect receipts**. Form assistance is Phase 2.

**How it works:**
1. Customer specifies the exact fee required
2. We verify the fee amount via the official portal or by calling the office
3. We inform customer of exact amount, method (online/in-person), and our service fee
4. Customer approves → we pay → receipt photo/scan delivered via WhatsApp and portal
5. For in-person fees: agent goes to the office, queue number and time stamped in photos

**SLA:** Online fees — 1 business day. In-person fees — 2 business days.

---

### Shop from India — Service 4: Product Sourcing & Shipping to USA

This is the **highest-trust, highest-accountability** service we offer. Every single item is manually inspected before it ships.

**What customers can request:**

| Category | Examples |
|---|---|
| Food & Sweets | Kakinada Kaja, Pootharekulu, Ariselu, specific pickles, dry fruits, murukku, chakli, specific regional sweets |
| Textiles | Sarees (silk, cotton, Pochampally, Kanjeevaram, Gadwal), dress materials, dupattas |
| Dry Groceries | Specific rice varieties (Sona Masoori, RNR, BPT), lentils, spices, flours, jaggery |
| Handicrafts | Nirmal paintings, Kondapalli toys, Etikoppaka toys, brass items, Bidriware |
| Medicines | OTC medicines and supplements available in India (customer provides exact name/composition; we do not substitute) |
| Puja Items | Specific flowers (dried), agarbatti, idols, pooja sets |
| Electronics & Accessories | Specific items available in Indian market (customer specifies exact model) |
| Books | Indian publications, textbooks, regional language books |
| Other | Anything legal — customer submits request, we assess and respond |

**What we do NOT ship:**
- Prescription medicines without a valid Indian prescription
- Items prohibited under Indian export rules or USA import rules
- Perishables that cannot survive transit (fresh flowers, cooked food, fresh fruits)
- Counterfeit goods or trademark violations
- Any item that fails our quality inspection

---

## 7. Manual Verification — The Core Process

This is what makes us different from every other service. **Nothing ships without a human verifying it.**

### 7.1 The Verification Promise

```
CUSTOMER SUBMITS REQUEST
        │
        ▼
OPS TEAM REVIEWS (not a bot)
  - Is this feasible?
  - Any legal/customs issues?
  - Best vendor(s) for this?
        │
        ▼
WE RESEARCH & QUOTE
  - Find 1-3 sources in Hyderabad
  - Get actual prices (no markup)
  - Estimate exact shipping cost
  - Show customer options
        │
        ▼
CUSTOMER APPROVES & PAYS
        │
        ▼
AGENT GOES TO VENDOR & BUYS
        │
        ▼
PHYSICAL INSPECTION (MANDATORY)
  - Photos taken at vendor location
  - Quality checked against standard
  - Weight verified (if applicable)
  - Expiry dates checked (food items)
  - Authenticity assessed (textiles)
        │
   ┌────┴────┐
   │         │
PASS      FAIL
   │         │
   ▼         ▼
PACK &   REJECT:
SHIP     - Customer informed immediately
         - Reason clearly stated
         - Full refund if already paid
         - We source alternative if customer wants
```

### 7.2 Inspection Standards by Category

**Food Items (Sweets, Dry Fruits, Groceries):**
- [ ] Expiry date / best before date checked and photographed
- [ ] Packaging seal intact
- [ ] No signs of moisture, mold, or infestation
- [ ] Weight verified on scale (photo with weight shown)
- [ ] Correct variety confirmed (e.g., "Kakinada Kaja" not a substitute)
- [ ] Taste/smell check for freshness (where applicable)

**Textiles (Sarees, Dress Material):**
- [ ] Fabric type verified (silk vs. synthetic — burn test if needed)
- [ ] Color matches description/photo agreed with customer
- [ ] No defects, tears, loose threads, stains
- [ ] Zari (gold thread) authenticity if claimed
- [ ] Dimensions checked (length/width)
- [ ] 4+ photos in natural light before purchase confirmed

**Medicines:**
- [ ] Exact brand and composition match (no substitutes)
- [ ] Manufacturer verified (licensed Indian pharma company)
- [ ] Batch number and expiry date photographed
- [ ] Packaging sealed and undamaged
- [ ] Quantity matches order

**Electronics:**
- [ ] Exact model number matches
- [ ] Sealed box with MRP sticker
- [ ] Box weight consistent with genuine product
- [ ] Purchase from authorized dealer (receipt obtained)
- [ ] Powered on and basic function test (where safe to do so)

**Handicrafts:**
- [ ] Artisan/workshop source verified
- [ ] No cracks, chips, or defects
- [ ] Painting/design quality photographed
- [ ] Correct item (size, type) confirmed

### 7.3 What "Rejection" Looks Like

When an item fails inspection:

1. Agent photographs the failed item with reason labeled
2. Admin reviews the rejection in CMS
3. Customer receives WhatsApp message within 30 minutes:
   - Photo of the item
   - Exact reason for rejection (not vague — specific)
   - Options: (a) source from alternate vendor, (b) skip this item, (c) full refund
4. Customer chooses
5. If refund chosen — processed within 24 hours
6. If alternate vendor — new inspection cycle begins

**Rejection reasons we will clearly communicate:**
- "Fabric is synthetic, not silk as advertised by vendor"
- "Expiry date is only 2 weeks away — not enough time for transit + consumption"
- "Weight is 850g, order was for 1kg — vendor is short-weighing"
- "Product has moisture damage inside the sealed bag"
- "Wrong variety — vendor sent XYZ instead of ABC you requested"
- "Box appears tampered — we will not ship this"

### 7.4 Pricing Transparency

Every quote sent to customer includes:

```
ORDER QUOTE — #ORD-001
─────────────────────────────────
Item: 1kg Kakinada Kaja Sweets
Vendor: Sri Krishna Sweets, Kakinada

Item Cost (actual):     ₹ 450   ($5.40)
Packing materials:      ₹  80   ($0.96)
Local transport:        ₹ 150   ($1.80)
Our service fee:        ₹ 400   ($4.80)  ← flat fee, not % markup
─────────────────────────────────
India subtotal:         ₹1,080  ($12.96)

Shipping (DHL/FedEx):   $28.00  (actual courier quote)
US Customs estimate:    $0–$5   (sweets typically exempt)
─────────────────────────────────
TOTAL YOU PAY:          ~$41–46 (USD)
─────────────────────────────────
Note: Actual shipping invoiced at exact cost.
If sweets cost more/less, we adjust and refund/charge difference.
```

---

---

## 8. Transparency & Verification of Goods

> **This section defines a non-negotiable operating standard — not an optional feature. Every customer-facing touchpoint must reflect these principles.**

---

### 8.1 The Transparency Pledge

We operate on a single rule:

> **"The customer knows everything we know, at the moment we know it."**

There are no surprises. No hidden steps. No "trust us" without evidence.
Every rupee spent, every defect found, every delay encountered — the customer is told immediately, in plain language, with proof.

---

### 8.2 Price Transparency — Zero Hidden Costs

**The problem we are solving in our own industry:**

Most NRI services quote a total price and hide their margin inside the "product cost." The customer has no idea what the item actually cost, what shipping actually cost, or how much the service marked up. We consider this unacceptable.

**Our model:**

Every quote sent to a customer is a fully itemised breakdown — no exceptions.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  QUOTE — Order #ORD-001         Sent via WhatsApp + Portal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Item: 1kg Kakinada Kaja Sweets
  Vendor: Sri Krishna Sweets, Kakinada Bus Stand

  WHAT YOU PAY FOR            INR         USD
  ─────────────────────────────────────────────
  Product cost (exact)        ₹ 450      $ 5.40    ← what vendor charged us
  Packing materials           ₹  80      $ 0.96    ← actual cost
  Local transport             ₹ 150      $ 1.80    ← auto/cab fare
  Our service & inspection    ₹ 400      $ 4.80    ← our only earning
  ─────────────────────────────────────────────
  India total                 ₹1,080     $12.96

  Shipping — DHL Express               $28.00    ← exact DHL quote
  US Customs estimate                   $0–$5    ← advisory only
  ─────────────────────────────────────────────
  TOTAL YOU PAY                        ~$41–46
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Note: Vendor receipt will be shared with you.
  If product costs less than quoted, we refund the difference.
  Shipping billed at exact courier invoice — never rounded up.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Rules that cannot be broken:**

| Rule | Detail |
|---|---|
| **No markup on product cost** | We pass through the exact vendor price. Customer sees vendor receipt. |
| **No markup on shipping** | We bill the exact DHL/FedEx invoice. Customer sees courier receipt. |
| **No markup on government fees** | Bill amounts, challan amounts passed at exact cost. |
| **Our only earning is the service fee** | Stated explicitly in every quote. Flat rate — not a percentage. |
| **Refund the difference** | If the item costs less than quoted → we refund immediately, same day. |
| **Vendor receipt always shared** | Every purchase receipt photographed and delivered to customer. |
| **No quote without itemisation** | A quote without line-item breakdown cannot be sent. CMS enforces this. |

---

### 8.3 Verification of Goods — The Physical Inspection Standard

**What "verification" means for us — it is not a checkbox, it is a physical act.**

Every product sourced under "Shop from India" is physically handled, examined, and documented by our agent before it is accepted for packing. No product leaves Hyderabad without passing this process.

#### 8.3.1 The Four Verification Stages

```
STAGE 1: VENDOR VERIFICATION          (before purchase)
  ├── Is this a legitimate vendor?
  ├── Do they have a physical shop?
  ├── Are their prices fair market rate?
  └── Do they have the exact item in stock — not a substitute?

          │
          ▼

STAGE 2: PRODUCT VERIFICATION         (at point of purchase)
  ├── Is this exactly what the customer ordered?
  ├── Correct brand, variety, composition, size?
  ├── Correct quantity — weighed on scale, counted?
  ├── Expiry / freshness acceptable?
  └── Packaging intact, sealed, undamaged?

          │
          ▼

STAGE 3: QUALITY VERIFICATION         (independent inspection)
  ├── No defects, tears, stains, cracks, chips
  ├── Fabric: genuine composition (silk vs synthetic check)
  ├── Food: freshness taste/smell check where applicable
  ├── Medicine: exact composition, licensed manufacturer
  └── Electronics: sealed box, weight consistent with genuine product

          │
          ▼

STAGE 4: DOCUMENTATION VERIFICATION   (before packing)
  ├── Purchase receipt obtained and photographed
  ├── All inspection photos uploaded to order
  ├── Weight slip / measurement photo taken
  ├── Checklist fully completed — no blanks
  └── Admin QC review passed before packing begins
```

#### 8.3.2 Photographic Evidence — Mandatory Minimum Per Category

Every inspection produces a mandatory minimum set of photos. These are **not optional** — an order cannot move to packing without them.

| Product Category | Mandatory Photos |
|---|---|
| **Food & Sweets** | (1) Expiry/best-before label closeup · (2) Weighing scale with product · (3) Sealed packaging · (4) Shop/vendor signboard · (5) Receipt |
| **Textiles (Sarees etc.)** | (1) Full saree laid flat in natural light · (2) Fabric texture closeup · (3) Zari/border detail · (4) Pallu closeup · (5) Any defect area if found · (6) Receipt |
| **Medicines** | (1) Front of box with brand name · (2) Batch number + expiry label · (3) Manufacturer name on label · (4) Seal intact · (5) Receipt from licensed pharmacy |
| **Electronics** | (1) Sealed box front · (2) MRP sticker · (3) Model number label · (4) Store / authorized dealer board · (5) Receipt |
| **Dry Groceries** | (1) Weighing scale · (2) Packaging closeup (brand, variety) · (3) Expiry date · (4) Receipt |
| **Handicrafts** | (1) Full item · (2) Defect check (all sides) · (3) Artisan/workshop details if available · (4) Receipt |

**All photos are:**
- Taken by the field agent on the day of purchase
- Uploaded to the order in real time via the Agent PWA
- Reviewed and approved by the Admin before any packing begins
- Delivered to the customer via WhatsApp and accessible in the customer portal

#### 8.3.3 Verification Outcome — Two Paths Only

There is no middle ground. An inspected item is either:

**PASS — Proceed to Packing**
- All checklist items confirmed
- All mandatory photos uploaded and clear
- Admin has reviewed and approved
- Customer notified with photos before packing begins

**FAIL — Reject Immediately, Notify Customer**
- Inspection failure documented with specific reason (not vague)
- Photos of the defect/issue uploaded
- Customer notified via WhatsApp within **30 minutes** of failure decision
- Rejection reason written in plain, honest language — no softening

**Examples of how we communicate rejection:**

| Bad (vague) | Good (honest) |
|---|---|
| "Quality not up to our standards" | "The saree fabric is synthetic. It failed a basic burn test — real silk would not burn this way. We will not send this." |
| "Item has some issues" | "The Kakinada Kaja box shows signs of moisture damage inside the sealed bag. We opened it — the sweets are softening. We rejected it." |
| "Product does not meet criteria" | "The vendor sent Banganapalle mangoes but you asked for Alphonso. These are different varieties and we will not substitute without your approval." |
| "Weight issue found" | "Vendor packed 820g but your order was for 1kg. They are short-weighing by 18%. We confronted them — they refused to add. We left without buying." |

---

### 8.4 Bill Payment & Insurance — Verification Before Paying

Transparency and verification apply equally to NRI Seva payments — not just physical goods.

**Before we pay any bill or premium:**

| Step | What We Do | What Customer Receives |
|---|---|---|
| **1. Verify the amount** | We look up the exact current due amount on the official portal — never rely on customer's estimate | Exact amount confirmed via WhatsApp before payment |
| **2. Verify the account** | We confirm consumer number / policy number matches the name provided by customer | Confirmation of account holder name |
| **3. Check for penalties** | We flag any late fees, interest, or penalty outstanding and inform customer | Penalty breakdown in WhatsApp message |
| **4. Get explicit approval** | We send the exact amount and get customer's "OK" before paying | Customer approves via WhatsApp button or portal |
| **5. Pay and capture** | Payment made; official receipt/acknowledgment obtained immediately | Receipt photo + PDF sent same day |
| **6. For insurance: note renewal date** | We record the next due date and add it to renewal reminders | Renewal date confirmed; auto-reminder set |

**We never pay a bill without customer approval of the exact amount.** If the actual amount differs from what the customer estimated, we always check back — even if the difference is ₹10.

---

### 8.5 What Customers See at Every Step

This table defines what evidence is delivered to the customer at each stage of an order. Every item in this table is a product requirement — the platform must support delivering each of these.

**NRI Seva Orders (Bills / Insurance / Govt Fees):**

| Stage | Evidence Delivered to Customer |
|---|---|
| Quote sent | Exact amount + account/policy verified · Our service fee stated · Screenshot of portal showing the due amount |
| Payment made | Official receipt photograph · Transaction ID · Payment portal screenshot |
| Insurance renewal | Policy acknowledgment PDF · Next renewal date · Renewal reminder auto-set confirmation |
| Government fee | Challan scan or counter receipt photo · Reference number if generated |

**Shop from India Orders:**

| Stage | Evidence Delivered to Customer |
|---|---|
| Quote sent | Vendor name + location · Product photos from the shop · Itemised cost breakdown · Vendor price receipt |
| Inspection pass | Full set of mandatory photos per category · Weight/quantity proof · Checklist completion summary |
| Inspection fail | Photo(s) of the defect/issue · Exact written reason · Options for next steps |
| Packed | Packed box photo · Weight slip · Dimensions |
| Dispatched | Courier tracking number · DHL/FedEx waybill photo · Estimated delivery date |
| In transit | Courier status updates (via WhatsApp on key milestones: picked up / in transit / customs cleared / out for delivery) |
| Delivered | Delivery confirmation message · Request for customer to confirm receipt |

---

### 8.6 Platform Enforcement — How This Is Built Into the System

Transparency and verification are not just policies — they are enforced by the software.

| Rule | How the System Enforces It |
|---|---|
| Quote must be itemised | Admin CMS quote builder has mandatory line-item fields — cannot submit a quote without them |
| Vendor receipt required | Order cannot move from SOURCING → QUALITY_CHECK without at least one receipt photo uploaded |
| Inspection photos mandatory | Agent PWA enforces minimum photo count per category before checklist can be submitted |
| Admin must review inspection | Order cannot move from QUALITY_CHECK → PACKING without admin clicking "Approve Inspection" |
| Customer sees all photos | All non-internal photos are auto-shared to the customer portal and WhatsApp on upload |
| Rejection must include reason | Inspection fail requires a non-empty reason field — cannot fail without written explanation |
| Bill amount confirmed before payment | Quote flow for NRI Seva requires "amount confirmed" checkbox by admin before quote is sent |
| Customer approval required before payment | Stripe PaymentIntent is only created after customer explicitly clicks "Approve & Pay" |
| Refund on undercharge | If final product cost < quoted product cost, system creates a partial refund automatically |

---

## 9. Pricing Model

### Service Fee Structure (Our Charge — Not Including Actual Costs)

#### NRI Seva — Bill Payments & Insurance Renewals

| Bill Amount | Our Service Fee |
|---|---|
| Up to ₹1,000 | $3 |
| ₹1,001 – ₹5,000 | $5 |
| ₹5,001 – ₹20,000 | $8 |
| Above ₹20,000 | $12 |
| Multiple bills (same visit) | $3 for 1st + $2 each additional |

- **Customer also pays:** Actual bill amount (charged at exact cost)
- **No markup** on the bill amount itself

#### NRI Seva — Government Fees & Registrations

| Type | Our Service Fee |
|---|---|
| Online-only fee | $5 |
| In-person (office visit required) | $12 |
| In-person with queue (RTO, passport) | $18 |
| Urgent / same-day | +$10 |

- **Customer also pays:** Actual government fee amount

#### Shop from India — Product Sourcing & Shipping

| What you pay us | Amount |
|---|---|
| Product sourcing + inspection fee | $8 per item category (flat) |
| Multi-item order (3+ categories) | $20 flat for all inspection |
| Packing & domestic logistics | Actual cost (passed through) |
| International shipping | Actual courier cost (DHL / FedEx / EMS) |
| Product cost | Actual cost at vendor (passed through, receipts shared) |

**No markup on products. No markup on shipping. Just the sourcing + inspection fee.**

#### Subscriptions (For Regular Users)

| Plan | Price | Includes |
|---|---|---|
| Pay-as-you-go | No subscription | Pay per service as above — no commitment |
| NRI Seva Basic | $19/month | 5 NRI Seva tasks (bills/renewals/fees) + renewal reminders |
| NRI Seva Family | $45/month | 12 NRI Seva tasks + 1 Shop from India order + renewal reminders |
| Full Service | $89/month | Unlimited NRI Seva tasks + 3 Shop from India orders + dedicated ops agent |

**All plans:** Actual costs (bill amounts, product costs, shipping) are always passed through at exact cost regardless of plan.

---

## 9. System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                           Client Layer                               │
│                                                                      │
│  ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐ │
│  │  Customer Portal  │   │   Admin CMS       │   │  Agent PWA       │ │
│  │  (Next.js 14)    │   │  (React + Vite)  │   │  (React PWA)    │ │
│  │                  │   │                  │   │                  │ │
│  │ - Submit orders  │   │ - Order kanban   │   │ - Task list      │ │
│  │ - Track status   │   │ - Quote builder  │   │ - Inspection     │ │
│  │ - View quotes    │   │ - WA inbox       │   │   checklist      │ │
│  │ - Approve/reject │   │ - QC approval    │   │ - Photo upload   │ │
│  │ - Pay via Stripe │   │ - Analytics      │   │ - GPS check-in   │ │
│  └────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘ │
└───────────┼──────────────────────┼──────────────────────┼───────────┘
            │                      │                      │
            └──────────────────────┼──────────────────────┘
                                   │ HTTPS / REST + WebSocket
                     ┌─────────────▼─────────────┐
                     │        NestJS API           │
                     │     (TypeScript, Port 3000) │
                     └──────────────┬──────────────┘
                                    │
         ┌─────────────────────────┼──────────────────────────┐
         │                         │                          │
┌────────▼──────┐       ┌──────────▼──────┐        ┌─────────▼───────┐
│  PostgreSQL    │       │  Redis           │        │  AWS S3          │
│  (AWS RDS,    │       │  - BullMQ queues │        │  - Documents     │
│   Mumbai)     │       │  - Cache         │        │  - Inspection    │
│               │       │  - Rate limiting │        │    photos        │
└───────────────┘       └─────────────────┘        │  - Receipts      │
                                                    └─────────────────┘

External Integrations:
├── Meta Cloud API     → WhatsApp (customer + ops communication)
├── Stripe             → USD payment collection
├── DHL / FedEx API    → Shipping quotes and tracking
├── SendGrid           → Email notifications
└── Twilio             → SMS OTP (auth only)
```

---

## 10. Feature Specifications

---

### 10.1 Customer Portal (Web)

**Framework:** Next.js 14 (App Router)
**UI:** Tailwind CSS + shadcn/ui

#### 10.1.1 Public / Landing Pages

| Page | Purpose |
|---|---|
| `/` | Hero: "Your trusted hands in Hyderabad." Services overview, trust signals, testimonials |
| `/services/bills` | How bill payment works, what we cover, pricing |
| `/services/insurance` | How insurance premium service works |
| `/services/government-fees` | Government fee payment explained |
| `/services/shop-from-india` | Product sourcing + inspection process explained with photos |
| `/how-it-works` | 4-step visual explanation of the full process |
| `/our-promise` | Quality pledge, accountability policy, rejection policy, refund policy |
| `/pricing` | Transparent fee table — no hidden charges |
| `/contact` | WhatsApp button, email, support form |

**Trust Signals to Display on Homepage:**
- "Every order manually reviewed — no bots decide"
- "Photos and receipts delivered with every order"
- "We reject bad products so you never receive one"
- "If we fail, full refund. No questions."
- Real inspection photos (with customer permission, anonymized)

#### 10.1.2 Authentication

| Flow | Detail |
|---|---|
| Sign Up | Name, email, USA phone, India contact phone (optional). OTP on email. |
| Sign In | Email + password OR email OTP |
| Forgot Password | Email reset link (1 hour expiry) |
| Profile setup | After signup: save family members, saved India addresses, notification preferences |

#### 10.1.3 Customer Dashboard (`/dashboard`)

**Top Summary Bar:**
- Active orders (with status badge)
- Pending approvals (orders waiting for customer to approve a quote)
- Upcoming bill/insurance renewals (reminders)
- Subscription plan + tasks remaining

**Pending Approvals Panel (Most Important):**
- Card per order awaiting customer approval
- Shows: what was found, exact cost breakdown, photos of product (for shopping orders)
- Action buttons: **Approve & Pay** | **Reject** | **Request Alternate**
- Timer: quote expires in 48 hours

**Active Orders Feed:**
- Order ID, service type, status badge, last update time
- Click to expand detail

**Renewal Reminders:**
- LIC, health insurance, vehicle insurance renewals in next 60 days
- One-click "Pay Now" to submit renewal order

#### 10.1.4 New Order Flow

**Step 1 — Choose Service**

Two top-level buckets, then a sub-type selection:

```
┌──────────────────────────────────────┐   ┌──────────────────────────────────┐
│             NRI SEVA                  │   │         SHOP FROM INDIA           │
│   Your India-side payment agent       │   │   Your trusted shopper in India   │
│                                      │   │                                  │
│  ┌────────────┐  ┌────────────────┐  │   │  Source any product from any     │
│  │  Pay a     │  │  Insurance /   │  │   │  vendor in India. We inspect     │
│  │  Bill or   │  │  Policy        │  │   │  everything before shipping.     │
│  │  Fee       │  │  Renewal       │  │   │                                  │
│  │            │  │                │  │   │  Sweets · Sarees · Groceries     │
│  │ Electricity│  │ LIC · Health   │  │   │  Medicines · Electronics         │
│  │ Water Tax  │  │ Vehicle        │  │   │  Books · Handicrafts             │
│  │ GHMC / RTO │  │ Home insurance │  │   │  Anything legal                  │
│  │ Court fees │  │                │  │   │                                  │
│  │ From $3    │  │  From $5       │  │   │  From $8 + actual product cost   │
│  └────────────┘  └────────────────┘  │   └──────────────────────────────────┘
└──────────────────────────────────────┘
```

**Step 2 — Fill the Request Form**

*Bill Payment Form:*
```
Biller Type:          [Dropdown: Electricity / Water / Property Tax / Mobile / Gas / Society / Other]
Biller / Provider:    [Text: e.g., TSSPDCL, HMWSSB, GHMC]
Consumer / Account #: [Text]
Registered Name:      [Text — helps us verify]
Approx Amount (₹):   [Number — we will find exact amount]
Urgency:              [Standard (1 day) / Urgent (same day, +$10)]
Special Instructions: [Text area]
```

*Insurance Premium Form:*
```
Insurer Name:         [Dropdown: LIC / SBI Life / HDFC Life / Star Health / Others]
Policy Number:        [Text]
Policy Holder Name:   [Text]
Approx Premium (₹):  [Number — we will verify exact]
Due Date (if known):  [Date picker]
Send receipt to:      [Email in India — optional, for policy records]
Special Instructions: [Text area]
```

*Government Fee Form:*
```
Fee Type:             [Dropdown: GHMC / RTO / MRO / Passport / Court / GST / Education / Other]
Specific Fee:         [Text: e.g., "Property tax for GHMC plot 4-110/A"]
Amount (if known):    [Number — optional, we verify]
Location / Office:    [Text — area/zone in Hyderabad]
Any Reference #:      [Text — property number, vehicle number, etc.]
Urgency:              [Standard / Urgent]
Special Instructions: [Text area]
```

*Shop from India Form:*
```
What do you want?     [Text area — be as specific as possible]
                      Placeholder: "1kg Kakinada Kaja sweets from Kakinada or a
                       trusted Hyderabad shop. Must be fresh, made this week."

Quantity:             [Text]
Budget (per item ₹): [Number — optional; helps us find right quality level]
Any specific brand/
shop preference:      [Text — optional]
Urgency:              [Standard (5–7 days) / Express (3–4 days, +$15)]
Shipping to (USA):    [Saved address dropdown OR enter new]
Special Notes:        [Text area — e.g., "My mother's birthday, please pack nicely"]
```

**Step 3 — Contact Preferences**
```
Preferred communication: [WhatsApp (primary) / Email / Both]
WhatsApp number:         [Pre-filled from profile, editable]
Best time to reach:      [Morning US time / Evening US time / Anytime]
```

**Step 4 — Submit (No Payment Yet)**
- Submit button: "Submit Request — We'll quote you before charging"
- Confirmation: "Your request is received. Our team will review and send you a quote via WhatsApp within [4 hours / 1 business day]. **No payment is taken until you approve.**"

**Step 5 — Quote Approval (Later, via WhatsApp + Portal)**
- Customer receives quote via WhatsApp
- Can approve in WhatsApp (button) OR in the portal
- Payment taken only after explicit approval

#### 10.1.5 Order Detail Page (`/orders/[id]`)

**Sections:**

*Order Summary Bar:*
- Status: SUBMITTED → REVIEWING → QUOTE SENT → APPROVED → IN PROGRESS → QUALITY CHECK → SHIPPED / PAID & CONFIRMED
- Service type, submission date, SLA target

*Quote Panel (if status = QUOTE SENT):*
- Full cost breakdown (as shown in Section 7.4)
- Product/vendor photos (for shopping orders)
- Notes from ops team
- **Approve & Pay** button (opens Stripe payment)
- **Reject** button (cancels, no charge)
- **Request Changes** button (message ops team)
- Quote expiry timer

*Timeline (Audit Trail):*
- Every status change with timestamp, who did it, and notes
- Attached documents per step (receipts, photos)

*Inspection Photos Panel (Shopping Orders):*
- Grid of photos taken during inspection
- Caption per photo (e.g., "Expiry date — Feb 2027", "Weight verified: 1.02kg", "Fabric texture closeup")
- Full-size view on click

*Documents & Receipts:*
- All receipts and documents (downloadable)
- Bill payment receipt, insurance acknowledgment, government challan PDF

*WhatsApp Thread Panel:*
- All WhatsApp messages related to this order, in chat bubble view
- Reply box (sends WhatsApp to ops team)

#### 10.1.6 Messages Page (`/messages`)
- Full WhatsApp conversation inbox
- All active and past conversations
- Reply from here or from WhatsApp directly
- Document attachments in chat

#### 10.1.7 Renewal Reminders (`/renewals`)
- List of all saved insurance policies and recurring bills
- Due date, days remaining (color: green >30 days, yellow 8–30, red <7)
- "Renew Now" button per item → pre-fills new order form
- Add policy / Add recurring bill

#### 10.1.8 Account & Settings
- Profile (name, email, phones, timezone)
- Saved family members
- Saved India addresses (for bill payer identification)
- Saved shipping addresses (USA)
- Saved policies (LIC, insurance — for renewal tracking)
- Notification preferences
- Payment methods (Stripe)
- Subscription management

---

### 10.2 Admin CMS / Ops Dashboard

**Framework:** React + Vite
**Roles:** Super Admin | Ops Manager | Support Agent | QC Inspector

#### 10.2.1 Order Management — Kanban Board

**Columns:**
```
NEW REQUEST → UNDER REVIEW → QUOTE SENT → APPROVED → SOURCING → INSPECTION → PACKING/PAYMENT → SHIPPED/PAID → DONE
                                                                      │
                                                                   REJECTED
                                                                 (back to SOURCING or CANCELLED)
```

**Each Card Shows:**
- Order ID + customer name
- Service type icon (Bill / Insurance / Govt / Shopping)
- SLA timer (countdown)
- Assigned ops agent avatar
- Flag if quote is expiring soon (< 6 hours for customer to respond)

**Card Actions (right-click or hover menu):**
- View full detail
- Assign to agent
- Send WhatsApp update
- Change status
- Flag / escalate

#### 10.2.2 Order Detail (Admin View)

**Tabs:**

*Request Tab:*
- Everything customer submitted
- All uploaded documents

*Quote Builder Tab (key feature):*
```
┌─────────────────────────────────────────────────────────┐
│  QUOTE BUILDER — Order #ORD-001                         │
│                                                         │
│  Item / Service:     Kakinada Kaja Sweets 1kg           │
│  Vendor:             [Text field] Sri Krishna Sweets    │
│  Vendor location:    [Text field] Kakinada Bus Stand    │
│                                                         │
│  Cost Breakdown:                                        │
│  ┌──────────────────────────────┬──────────┬─────────┐  │
│  │ Item                         │ INR      │ USD     │  │
│  ├──────────────────────────────┼──────────┼─────────┤  │
│  │ Product cost (actual)        │ 450      │ $5.40   │  │
│  │ Packing materials            │ 80       │ $0.96   │  │
│  │ Local transport              │ 150      │ $1.80   │  │
│  │ Our service/inspection fee   │ 400      │ $4.80   │  │
│  ├──────────────────────────────┼──────────┼─────────┤  │
│  │ India subtotal               │ 1,080    │ $12.96  │  │
│  ├──────────────────────────────┼──────────┼─────────┤  │
│  │ Shipping (DHL estimate)      │ —        │ $28.00  │  │
│  │ Customs (estimated)          │ —        │ $0–$5   │  │
│  ├──────────────────────────────┼──────────┼─────────┤  │
│  │ TOTAL                        │          │ ~$41–46 │  │
│  └──────────────────────────────┴──────────┴─────────┘  │
│                                                         │
│  Notes to customer:  [Text area]                        │
│  Attach vendor photos: [Upload]                         │
│                                                         │
│  [Send Quote to Customer via WhatsApp]                  │
└─────────────────────────────────────────────────────────┘
```

*Inspection Checklist Tab (Shopping Orders):*
- Service-type-specific checklist (food / textile / medicine / electronics)
- Each item: checkbox + photo upload field + notes
- Overall result: PASS / FAIL (with mandatory reason if FAIL)
- Submit inspection → triggers customer notification

*Timeline Tab:*
- Full event log
- Internal notes (admin-only)
- Customer-facing updates

*WhatsApp Tab:*
- Embedded conversation for this order

*Documents Tab:*
- All files: customer-uploaded, agent-uploaded receipts, inspection photos

#### 10.2.3 Quote Management

- All pending customer approvals
- Expiry countdown per quote
- One-click resend quote (if customer missed WhatsApp)
- Mark quote as expired if customer doesn't respond in 48h (auto-cancel)

#### 10.2.4 WhatsApp Inbox (CMS)
- All conversations, filterable by status
- New handoff requests flagged
- Full chat UI for replying
- Template quick-send panel
- Attach files
- Assign conversation to agent

#### 10.2.5 Renewal Tracker

- Dashboard of all customer insurance/bill renewal dates
- Sorted by urgency (soonest first)
- Auto-reminder schedule per item (30 days, 7 days, 1 day before)
- Status: Reminder Sent / Order Created / Paid / Overdue

**This is a proactive tool: ops team uses this daily to identify customers who haven't responded to renewal reminders.**

#### 10.2.6 Shipping Management

- All active shipments with courier tracking numbers
- Status: Packed → Picked Up → In Transit → Customs → Out for Delivery → Delivered
- One-click update: send tracking info to customer via WhatsApp
- Customs documentation tracking

#### 10.2.7 Analytics

| Dashboard | Metrics |
|---|---|
| Revenue | MRR, daily revenue, revenue by service type, subscriptions vs pay-per-task |
| Orders | Volume, completion rate, SLA breach rate, avg completion time |
| Quality | Products inspected, rejection rate, rejection reasons (category breakdown) |
| WhatsApp | Messages sent/received, response time, failed messages, template performance |
| Customer | New signups, active users, churn, top customers by spend |
| Renewals | Due this week, upcoming 30 days, overdue |

---

### 10.3 Agent Mobile App (PWA)

**Framework:** React PWA (installable on Android Chrome)

#### Task List Screen
- All assigned tasks for today and upcoming
- Priority order: Urgent first, then by SLA
- Task card: type icon, customer ref, location, SLA timer
- Status filter: All / Today / Pending / In Progress / Done

#### Task Detail Screen
- Full instructions from admin
- Address (tappable → opens Google Maps)
- Customer's uploaded reference documents/photos
- Checklist for this task type
- Vendor details (for shopping tasks)

#### Task Execution Screen

*For Bill Payment / Government Fee:*
- Checklist:
  - [ ] Reached the location / opened the portal
  - [ ] Verified consumer number matches
  - [ ] Confirmed exact amount
  - [ ] Payment made
  - [ ] Receipt obtained
- Photo upload: receipt (min 1 photo)
- Notes: any issues
- GPS auto-recorded on each status change

*For Insurance Premium:*
- Checklist:
  - [ ] Policy number verified
  - [ ] Exact premium confirmed
  - [ ] Premium paid
  - [ ] Acknowledgment/receipt obtained
  - [ ] Next renewal date noted
- Photo upload: payment acknowledgment
- Notes

*For Product Inspection (Shopping):*
- Dynamic checklist based on product category (food / textile / medicine / electronics)
- Each checklist item has a photo upload slot
- Pass/Fail toggle per item
- Overall verdict: PASS → proceed / FAIL → state reason
- If FAIL: mandatory reason field + photos of defect/issue

*For Packing:*
- Packing checklist
- Outer box photo
- Weight slip photo
- DHL/FedEx waybill photo
- Tracking number entry

---

### 10.4 WhatsApp Integration

**Provider:** Meta Cloud API (direct)
**Number:** Dedicated Hyderabad +91 business number

#### 10.4.1 Approved Templates for MVP

| Template | Trigger | Content Summary |
|---|---|---|
| `request_received` | Order submitted | "Hi {{name}}, we've received your request for {{service}}. Our team will review and send you a quote within {{time}}. No payment until you approve." |
| `quote_ready` | Admin sends quote | "Your quote for #{{id}} is ready! Total: ${{amount}}. Tap to review and approve." + quote card |
| `quote_expiring` | 6 hours before expiry | "Your quote for #{{id}} expires in 6 hours. Approve before {{time}} to proceed." |
| `order_approved` | Customer approves | "Payment confirmed! We're now sourcing / processing your order. We'll update you at every step." |
| `agent_assigned` | Agent assigned | "Your request is now being handled by {{agent}}. Expected by: {{date}}." |
| `inspection_pass` | QC passed | "Great news! Your {{item}} passed our quality inspection. Photos attached. We're packing and will share tracking soon." |
| `inspection_fail` | QC failed | "We inspected your {{item}} and found an issue: {{reason}}. Photos attached. Options: [Source Alternate] [Skip Item] [Refund]" |
| `bill_paid` | Bill/premium paid | "Done! Your {{biller}} bill of ₹{{amount}} has been paid. Receipt attached." |
| `shipment_dispatched` | Item shipped | "Your package is on its way! Tracking: {{number}} via {{courier}}. Estimated delivery: {{date}}." |
| `renewal_reminder_30` | 30 days before | "Reminder: Your {{policy}} premium of ~₹{{amount}} is due on {{date}} (30 days). Reply YES to schedule payment." |
| `renewal_reminder_7` | 7 days before | "Urgent: {{policy}} premium due in 7 days ({{date}}). Reply YES to pay now — don't risk a lapse." |
| `renewal_reminder_1` | 1 day before | "Last chance: {{policy}} premium due TOMORROW. Reply YES immediately to avoid lapse." |
| `order_completed` | All done | "Order #{{id}} is fully complete! Receipt/documents are in your portal. How did we do? [Rate Us]" |
| `payment_failed` | Stripe failure | "Your payment for #{{id}} couldn't be processed. Please update your card: {{link}}" |

#### 10.4.2 Interactive Messages

**Quote Approval Message:**
```
Header: "Quote Ready — #ORD-001"
Body:   "1kg Kakinada Kaja Sweets
         Product: $5.40 | Service fee: $4.80
         Shipping: $28.00
         TOTAL: ~$41
         Photos of vendor and product attached.
         Valid for 48 hours."

Buttons:
  [✓ Approve & Pay]
  [✗ Reject]
  [? Ask a Question]
```

**Inspection Fail — Choose Action:**
```
Header: "Product Rejected — Action Needed"
Body:   "We rejected your saree because: fabric is
         synthetic, not silk as claimed by vendor.
         See photos. What would you like to do?"

List:
  → Try a Different Vendor
  → Remove this Item, Continue with Rest
  → Cancel Entire Order (Full Refund)
```

**Renewal Reminder Response:**
```
Header: "LIC Premium Due in 7 Days"
Body:   "Policy: {{number}} | Premium: ₹4,800
         Due: Dec 10, 2026
         Shall we pay this for you?"

Buttons:
  [Yes, Schedule Payment]
  [I'll Handle It]
  [Remind Me in 2 Days]
```

---

## 11. Order Pipelines — Step by Step

The platform operates **two distinct pipelines**, one per service bucket. Each has its own stages, actors, SLAs, and evidence requirements. Both share the same order submission entry point but diverge immediately after the initial review.

---

```
                        CUSTOMER SUBMITS REQUEST
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
             NRI SEVA                     SHOP FROM INDIA
     (Bills · Insurance · Fees)      (Product Sourcing & Shipping)
                    │                            │
                    ▼                            ▼
           ━━━━━━━━━━━━━━━━━         ━━━━━━━━━━━━━━━━━━━━━━━
           PIPELINE 1                PIPELINE 2
           ━━━━━━━━━━━━━━━━━         ━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 11.1 Pipeline 1 — NRI Seva (Bills · Insurance · Government Fees)

> **Actors:** Customer → Ops Admin → Field Agent → Customer
> **Goal:** Pay the correct amount, on time, with proof — no exceptions.

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PIPELINE 1: NRI SEVA                                                       │
│  Bills · Insurance Renewals · Government Fees & Registrations               │
└─────────────────────────────────────────────────────────────────────────────┘

  STAGE 1 ──── REQUEST RECEIVED
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Customer (via portal)                                       │
  │                                                                    │
  │  Customer fills the NRI Seva form:                                 │
  │  → Biller / Insurer / Government office name                       │
  │  → Account / Policy / Consumer number                              │
  │  → Approximate amount (optional)                                   │
  │  → Urgency: Standard or Express                                    │
  │  → Any special instructions                                        │
  │                                                                    │
  │  NO PAYMENT TAKEN AT THIS STAGE                                    │
  │  System: auto-WhatsApp → "Request received, quote in 4 hours"      │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼  SLA: within 4 hours
  STAGE 2 ──── OPS VERIFICATION
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Ops Admin (Admin CMS)                                       │
  │                                                                    │
  │  Admin looks up the EXACT current due amount:                      │
  │  → Logs into official portal (TSSPDCL, LIC, GHMC, etc.)           │
  │  → Confirms consumer/policy number matches customer's name         │
  │  → Notes exact amount due + due date                               │
  │  → Checks for any pending penalties or late fees                   │
  │  → Screenshots the portal showing the due amount                   │
  │                                                                    │
  │  If online-only: marks as "Online"                                 │
  │  If in-person required: assigns nearest field agent                │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 3 ──── QUOTE SENT TO CUSTOMER
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Admin → Customer (WhatsApp + Portal)                        │
  │                                                                    │
  │  Quote includes:                                                   │
  │  → Exact verified amount (not customer's estimate)                 │
  │  → Our service fee (flat, stated clearly)                          │
  │  → Portal screenshot as proof of the verified amount               │
  │  → Penalty/late fee breakdown (if any)                             │
  │  → Payment method (online portal / in-person office)              │
  │                                                                    │
  │  Customer must EXPLICITLY APPROVE before we pay anything           │
  │  Quote expires in 48 hours                                         │
  │                                                                    │
  │  WhatsApp buttons: [Approve & Pay]  [Reject]  [Ask a Question]    │
  └────────────────────────────────────────────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               │                             │
          APPROVED                        REJECTED
          (Stripe charge)              (No charge, cancelled)
               │
               ▼
  STAGE 4 ──── PAYMENT EXECUTION
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Field Agent (in-person) OR Ops Admin (online)               │
  │                                                                    │
  │  For online payments:                                              │
  │  → Admin pays via the official portal                              │
  │  → Screenshot of success/confirmation page taken                   │
  │  → Transaction ID noted                                            │
  │                                                                    │
  │  For in-person payments:                                           │
  │  → Agent travels to office/bank                                    │
  │  → GPS check-in at location recorded                               │
  │  → Payment made at counter                                         │
  │  → Physical receipt obtained                                       │
  │  → Receipt photographed on-site, uploaded via Agent PWA            │
  │                                                                    │
  │  SLA: Online → same day | In-person → by next business day        │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 5 ──── PROOF DELIVERY
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: System (auto) + Admin (review)                              │
  │                                                                    │
  │  Delivered to customer via WhatsApp + Portal:                      │
  │  → Receipt photograph (payment counter receipt or online screen)   │
  │  → Transaction ID / Challan number                                 │
  │  → Payment confirmation PDF (where available)                      │
  │  → For insurance: policy acknowledgment + next renewal date        │
  │  → Renewal reminder auto-set (30 days before next due date)        │
  │                                                                    │
  │  WhatsApp: "Done ✓ — [Biller] bill of ₹X paid. Receipt attached." │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 6 ──── COMPLETED
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: System                                                      │
  │                                                                    │
  │  → Order marked COMPLETED                                          │
  │  → Customer asked to rate experience (WhatsApp interactive)        │
  │  → All documents archived in customer portal permanently           │
  │  → If insurance: renewal reminder added to renewal tracker         │
  └────────────────────────────────────────────────────────────────────┘
```

### Pipeline 1 — State Flow

```
NEW_REQUEST
    │ (auto WhatsApp: request received)
    ▼
UNDER_REVIEW  ← Ops verifies exact amount on official portal
    │ (WhatsApp: quote sent with verified amount + screenshot)
    ▼
QUOTE_SENT ──── (48h no response) ────► QUOTE_EXPIRED → CANCELLED
    │ Customer approves + Stripe payment captured
    ▼
APPROVED_PAID
    │ Agent/Admin assigned
    ▼
IN_PROGRESS  ← Payment being executed (online or in-person)
    │
    ├── (if amount differs from quote) ──► NEEDS_REAPPROVAL
    │                                         │ Customer re-approves
    │                                         └──► back to IN_PROGRESS
    │
    ▼
PROOF_READY  ← Receipt/acknowledgment obtained and uploaded
    │ (auto WhatsApp: receipt + proof delivered)
    ▼
COMPLETED
    │ (auto after 30 days)
    ▼
ARCHIVED
```

### Pipeline 1 — SLA Targets

| Service Type | Review & Quote | Execution | Proof Delivered |
|---|---|---|---|
| Bill payment (online) | 4 hours | Same day of approval | Same day |
| Bill payment (in-person) | 4 hours | Next business day | Same day as payment |
| Insurance premium | 4 hours | Same day of approval | Same day |
| Govt fee (online) | 4 hours | Same day of approval | Same day |
| Govt fee (in-person) | 4 hours | 1–2 business days | Same day as payment |
| **Express / Urgent** | 1 hour | Same day | Same day |

---

## 11.2 Pipeline 2 — Shop from India (Product Sourcing · Inspection · Shipping to USA)

> **Actors:** Customer → Ops Admin → Field Agent → QC Inspector → Admin → Courier → Customer
> **Goal:** Source the right product at the right price, verify it physically, and ship it safely. Nothing moves until verified.

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PIPELINE 2: SHOP FROM INDIA                                                │
│  Source · Inspect · Verify · Pack · Ship to USA                             │
└─────────────────────────────────────────────────────────────────────────────┘

  STAGE 1 ──── REQUEST RECEIVED
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Customer (via portal)                                       │
  │                                                                    │
  │  Customer describes what they want:                                │
  │  → What product (as specific as possible)                          │
  │  → Quantity                                                        │
  │  → Budget per item (optional)                                      │
  │  → Brand or shop preference (if any)                               │
  │  → Urgency: Standard / Express                                     │
  │  → USA shipping address (saved or new)                             │
  │  → Special notes (gift packing, specific freshness, etc.)          │
  │                                                                    │
  │  NO PAYMENT TAKEN AT THIS STAGE                                    │
  │  System: auto-WhatsApp → "Request received, quote within 4 hours"  │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼  SLA: within 4 hours
  STAGE 2 ──── OPS RESEARCH & FEASIBILITY
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Ops Admin (Admin CMS)                                       │
  │                                                                    │
  │  Admin researches the request:                                     │
  │  → Is this item available in Hyderabad / nearby?                   │
  │  → Can we legally export this to the USA?                          │
  │  → Which vendor(s) carry this at fair market price?                │
  │  → What is the realistic cost (product + packing + shipping)?      │
  │  → Can we deliver the exact item or only a substitute?             │
  │    (if substitute only → inform customer BEFORE proceeding)        │
  │                                                                    │
  │  If item is NOT feasible:                                          │
  │  → Admin contacts customer via WhatsApp immediately                │
  │  → Explains reason clearly                                         │
  │  → Suggests closest alternative OR closes with no charge           │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 3 ──── QUOTE BUILT & SENT
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Admin → Customer (WhatsApp + Portal)                        │
  │                                                                    │
  │  Quote includes (fully itemised — no bundled totals):              │
  │  → Product cost at vendor (exact, in INR + USD)                   │
  │  → Vendor name and location                                        │
  │  → Packing materials cost                                          │
  │  → Local transport cost                                            │
  │  → Our service & inspection fee (flat, clearly stated)             │
  │  → Shipping cost (actual DHL/FedEx quote for size/weight)          │
  │  → Customs duty estimate (advisory)                                │
  │  → Vendor photo (shop signboard or product sample if available)    │
  │                                                                    │
  │  If multiple vendor options exist → show 2–3 options to customer   │
  │  Quote valid for 48 hours                                          │
  │                                                                    │
  │  WhatsApp: [Approve & Pay]  [Reject]  [Choose Option 2]           │
  └────────────────────────────────────────────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               │                             │
          APPROVED                        REJECTED
      (Stripe payment)               (No charge, done)
               │
               ▼
  STAGE 4 ──── SOURCING (Agent Goes to Vendor)
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Field Agent (Hyderabad)                                     │
  │                                                                    │
  │  Agent travels to the vendor:                                      │
  │  → GPS check-in at vendor location recorded                        │
  │  → Agent photographs: vendor shop signboard, product on shelf      │
  │  → Agent negotiates and confirms the price matches quote           │
  │  → If price is higher than quoted → contacts admin before buying   │
  │  → If price is lower than quoted → buys, refund issued to customer │
  │  → Purchases item; gets original itemised receipt                  │
  │  → Photographs receipt immediately                                 │
  │                                                                    │
  │  Photos uploaded to order via Agent PWA in real time               │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 5 ──── PHYSICAL INSPECTION (The Quality Gate)
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Field Agent + Admin (QC Review)                             │
  │                                                                    │
  │  Agent completes category-specific inspection checklist:           │
  │                                                                    │
  │  ✦ Food / Sweets:                                                  │
  │    □ Expiry / best-before date checked + photographed              │
  │    □ Weight verified on scale (photo: scale display + item)        │
  │    □ Packaging seal intact                                         │
  │    □ Freshness check (smell/taste where appropriate)               │
  │    □ No signs of moisture, mold, or infestation                    │
  │    □ Correct variety confirmed (not a substitute)                  │
  │                                                                    │
  │  ✦ Textiles (Sarees, Fabrics):                                     │
  │    □ Fabric composition verified (burn test for silk if needed)    │
  │    □ Full saree photographed flat in natural light                 │
  │    □ Colour matches agreed description                             │
  │    □ Defect scan: tears, stains, loose threads, zari pull          │
  │    □ Border, pallu, and body detail photographed                   │
  │    □ Length and width measured                                     │
  │                                                                    │
  │  ✦ Medicines / Health Products:                                    │
  │    □ Exact brand and composition matches order                     │
  │    □ Licensed Indian manufacturer confirmed                        │
  │    □ Batch number + expiry photographed                            │
  │    □ Packaging sealed and undamaged                                │
  │    □ Purchased from licensed pharmacy (receipt confirms)           │
  │                                                                    │
  │  ✦ Electronics / Gadgets:                                          │
  │    □ Exact model number matches order                              │
  │    □ Sealed manufacturer box — MRP sticker present                 │
  │    □ Purchased from authorised dealer                              │
  │    □ Basic power-on function test (where safe)                     │
  │                                                                    │
  │  Each checklist item: checkbox + mandatory photo upload            │
  │  All photos uploaded via Agent PWA before checklist submitted      │
  └────────────────────────────────────────────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               │                             │
           ✓ PASS                        ✗ FAIL
               │                             │
               │               ┌─────────────┘
               │               │
               │               ▼  SLA: within 30 minutes of failure
               │    REJECTION COMMUNICATED TO CUSTOMER
               │    ┌────────────────────────────────────────────────┐
               │    │  WhatsApp sent:                                │
               │    │  → Photo(s) of the defect / issue              │
               │    │  → Exact written reason (honest, specific)     │
               │    │  → Three options for customer to choose:       │
               │    │    [A] Source from a different vendor           │
               │    │    [B] Skip this item, refund only this item   │
               │    │    [C] Cancel entire order (full refund)       │
               │    └────────────────────────────────────────────────┘
               │                    │
               │         ┌──────────┴──────────┐
               │         │                     │
               │     OPTION A            OPTION B or C
               │   (new vendor)         (refund issued
               │       │                 within 24h)
               │       └──► back to STAGE 4
               │
               ▼
  STAGE 6 ──── ADMIN QC REVIEW & APPROVAL
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Ops Admin (Admin CMS)                                       │
  │                                                                    │
  │  Admin reviews all inspection photos and checklist:                │
  │  → Are all mandatory photos present and clear?                     │
  │  → Does every checklist item have a photo?                         │
  │  → Is the overall quality acceptable to send to a customer?        │
  │  → Does the weight/quantity match the order?                       │
  │                                                                    │
  │  If approved:                                                      │
  │  → Customer notified via WhatsApp: "Passed ✓" + all photos        │
  │  → Order moves to PACKING                                          │
  │                                                                    │
  │  If admin finds an issue the agent missed:                         │
  │  → Sent back to agent for clarification or re-inspection           │
  │  → Customer NOT notified until admin is satisfied                  │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼  (customer receives inspection pass photos)
  STAGE 7 ──── PACKING
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Field Agent                                                 │
  │                                                                    │
  │  Professional packing:                                             │
  │  → Food items: food-safe packing, silica gel moisture protection   │
  │  → Textiles: acid-free tissue wrap, rigid support if needed        │
  │  → Fragile items: bubble wrap + foam inserts                       │
  │  → Medicines: sealed inner bag + padding                           │
  │  → Outer box sealed with tamper-evident tape                       │
  │                                                                    │
  │  Packing documentation:                                            │
  │  → Packed box photograph (before sealing + after sealing)          │
  │  → Weight of packed box measured + photographed                    │
  │  → Contents list prepared (for customs declaration)                │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 8 ──── CUSTOMS DOCUMENTATION
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Ops Admin                                                   │
  │                                                                    │
  │  Admin prepares customs documents:                                 │
  │  → Commercial invoice (accurate declared value — no under-declare) │
  │  → HS code classification per item                                 │
  │  → Contents description (honest — no "gift" mislabelling)          │
  │  → Receiver details (name, US address, phone)                      │
  │  → Sender details (our company name and address)                   │
  │                                                                    │
  │  Customs estimate advisory sent to customer:                       │
  │  "Estimated US customs duty: $0–$X. Most personal shipments        │
  │   under $800 are duty-free. We will advise if different."          │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 9 ──── COURIER BOOKING & DISPATCH
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: Ops Admin + Field Agent                                     │
  │                                                                    │
  │  Courier booked via DHL/FedEx API:                                 │
  │  → Waybill generated                                               │
  │  → Shipping label printed and affixed                              │
  │  → Package handed to courier                                       │
  │  → Pickup confirmation received                                    │
  │                                                                    │
  │  Customer notified via WhatsApp immediately:                       │
  │  → Tracking number                                                 │
  │  → Courier name (DHL / FedEx)                                      │
  │  → Estimated delivery date                                         │
  │  → Direct tracking link                                            │
  │  → Waybill photo attached                                          │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 10 ──── IN TRANSIT UPDATES
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: System (automated via courier API webhook)                  │
  │                                                                    │
  │  Customer receives WhatsApp update at each milestone:              │
  │  → "Package picked up by DHL"                                      │
  │  → "Departed Hyderabad — en route to USA"                          │
  │  → "Arrived at US customs — under review"                          │
  │  → "Customs cleared — out for delivery"                            │
  │  → "Delivered to [address] on [date] at [time]"                    │
  │                                                                    │
  │  If customs holds the package:                                     │
  │  → Admin proactively contacts customer with documentation help     │
  └────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
  STAGE 11 ──── DELIVERED & CONFIRMED
  ┌────────────────────────────────────────────────────────────────────┐
  │ Actor: System + Customer                                           │
  │                                                                    │
  │  → Courier marks delivered                                         │
  │  → Customer receives WhatsApp: "Your package is delivered!"        │
  │  → Customer asked to confirm receipt (interactive button)          │
  │  → Customer asked to rate the experience (5-star list)             │
  │  → Order marked COMPLETED                                          │
  │  → All documents + photos permanently archived in portal           │
  └────────────────────────────────────────────────────────────────────┘
```

### Pipeline 2 — State Flow

```
NEW_REQUEST
    │ (auto-WhatsApp: received)
    ▼
UNDER_REVIEW  ← Ops checks feasibility + researches vendors
    │
    ├── NOT_FEASIBLE ──► Customer informed, order CANCELLED (no charge)
    │
    ▼
QUOTE_SENT ──── (48h no response) ────► QUOTE_EXPIRED → CANCELLED
    │ Customer approves + Stripe payment captured
    ▼
APPROVED_PAID
    │ Field agent assigned
    ▼
SOURCING  ← Agent at vendor, purchasing item
    │
    ├── PRICE_CHANGED ──► Re-approval from customer ──► back to SOURCING
    │
    ▼
QUALITY_CHECK  ← Agent completes inspection checklist + uploads photos
    │
    ├── FAIL ──► Customer notified (30 min) ──► [A] SOURCING_ALTERNATE
    │                                        └─► [B/C] CANCELLED + REFUND
    ▼
QC_ADMIN_REVIEW  ← Admin reviews all inspection photos
    │
    ├── ADMIN_REJECTED ──► back to agent for clarification
    │
    ▼
QC_APPROVED  ← Customer notified with all inspection photos
    │
    ▼
PACKING  ← Agent packs item + photos taken
    │
    ▼
CUSTOMS_DOCS  ← Admin prepares customs paperwork
    │
    ▼
DISPATCHED  ← Waybill generated, tracking sent to customer
    │
    ▼
IN_TRANSIT  ← Auto-updates from courier at each milestone
    │
    ▼
DELIVERED  ← Courier confirms delivery
    │
    ▼
COMPLETED  ← Customer confirms + rates
    │ (auto after 30 days)
    ▼
ARCHIVED
```

### Pipeline 2 — SLA Targets

| Stage | Standard | Express |
|---|---|---|
| Review & feasibility check | 4 hours | 1 hour |
| Quote built and sent | 4 hours from review | 2 hours |
| Agent at vendor (sourcing) | 1–2 business days from approval | Same day |
| Physical inspection | Same day as sourcing | Same day |
| Admin QC review | Within 4 hours of inspection upload | Within 1 hour |
| Packing | 1 business day after QC pass | Same day |
| Courier dispatch | 1 business day after packing | Same day as packing |
| International delivery (DHL) | 5–7 business days | 3–5 business days |
| **Total (order to delivery)** | **~9–15 business days** | **~5–8 business days** |

---

### Pipeline Comparison at a Glance

| Dimension | NRI Seva (Pipeline 1) | Shop from India (Pipeline 2) |
|---|---|---|
| **Payment type** | Actual bill/fee + service fee | Product cost + inspection fee + shipping |
| **Payment timing** | After customer approves exact amount | After customer approves quote |
| **Human in the loop** | Ops Admin + field agent | Ops Admin + field agent + QC reviewer |
| **Physical touch** | In-person payment (if needed) | Physical product inspection (always) |
| **Key proof delivered** | Payment receipt + transaction ID | Inspection photos + vendor receipt + tracking |
| **Rejection mechanism** | N/A (verify before paying) | QC fail → customer notified in 30 min |
| **Fastest completion** | Same day | 5–8 business days |
| **Renewal tracking** | Yes (insurance + recurring bills) | No |
| **International shipping** | No | Yes (DHL / FedEx) |

---

## 11.3 Live Order Tracker — Every Stage Visible to the Customer

> **Non-negotiable rule:** The customer sees every stage of their order, in real time, on their portal page and via WhatsApp. There is no black box. There is no "we'll update you when done." Every transition is surfaced immediately.

---

### What the Customer Sees on the Order Detail Page

The customer's order detail page (`/orders/[id]`) shows a **live, visual stage tracker** — similar to how a food delivery app shows your order being prepared and arriving. Every stage of both pipelines is shown here.

---

**NRI Seva — Live Tracker (Customer View)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ORDER #ORD-001 — TSSPDCL Electricity Bill Payment
  Submitted: Aug 3, 2026 · 10:14 AM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ●  Stage 1: Request Received            ✓  Aug 3 · 10:14 AM
     "Your request is with our team. We will verify
      the exact amount on the official portal."

  ●  Stage 2: Amount Verified             ✓  Aug 3 · 11:42 AM
     "Exact amount confirmed: ₹1,847. Due date: Aug 10.
      No penalties outstanding."
     📎 [Portal screenshot — TSSPDCL due amount]

  ●  Stage 3: Quote Sent to You           ✓  Aug 3 · 11:45 AM
     "Quote sent via WhatsApp. Waiting for your approval."

  ●  Stage 4: You Approved & Paid         ✓  Aug 3 · 12:02 PM
     "Payment of $26.16 (₹1,847 + $5 fee) confirmed."

  ●  Stage 5: Bill Payment Executed       ✓  Aug 3 · 3:30 PM
     "Bill paid on the TSSPDCL portal. Transaction ID: TSSP2026XXXX"
     📎 [Payment receipt]
     📎 [Portal confirmation screenshot]

  ●  Stage 6: Completed                   ✓  Aug 3 · 3:31 PM
     "All done! Documents saved in your portal."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COST BREAKDOWN (what you actually paid)
  ─────────────────────────────────────────────────────────
  Verified bill amount:   ₹1,847   ($22.16)
  Our service fee:                  $ 3.00
  ─────────────────────────────────────────────────────────
  Total charged:                   $25.16
  ─────────────────────────────────────────────────────────
  No hidden fees. No markups. Receipt attached.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

**Shop from India — Live Tracker (Customer View)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ORDER #ORD-002 — 1kg Kakinada Kaja Sweets
  Submitted: Aug 3, 2026 · 9:00 AM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ●  Stage 1:  Request Received           ✓  Aug 3 · 9:00 AM
     "We'll research vendors and send you a quote."

  ●  Stage 2:  Vendor Research Done       ✓  Aug 3 · 12:30 PM
     "Found Sri Krishna Sweets, Kakinada. Price: ₹450/kg."
     📎 [Vendor shop photo]

  ●  Stage 3:  Quote Sent to You          ✓  Aug 3 · 12:35 PM
     "Itemised quote sent via WhatsApp. Waiting for approval."
     📎 [Full cost breakdown]

  ●  Stage 4:  You Approved & Paid        ✓  Aug 3 · 1:10 PM
     "Payment of $41 confirmed. We're heading to the vendor."

  ●  Stage 5:  Sourcing — At Vendor       ✓  Aug 4 · 10:00 AM
     "Agent is at Sri Krishna Sweets. Purchasing now."
     📎 [Vendor location photo]

  ●  Stage 6:  Physical Inspection        ✓  Aug 4 · 10:45 AM
     "Inspection PASSED ✓
      Weight: 1.02kg ✓  Expiry: Mar 2027 ✓  Fresh ✓  Seal intact ✓"
     📎 [Weighing scale photo]
     📎 [Expiry label photo]
     📎 [Packaged product photo]
     📎 [Vendor receipt]

  ●  Stage 7:  Admin Quality Review       ✓  Aug 4 · 11:15 AM
     "Our QC team reviewed all photos. Approved for packing."

  ●  Stage 8:  Packed                     ✓  Aug 4 · 2:00 PM
     "Packed with food-safe materials and moisture protection."
     📎 [Packed box photo — sealed]
     📎 [Weight slip: 1.4kg packed]

  ●  Stage 9:  Customs Documents Ready    ✓  Aug 4 · 3:00 PM
     "Customs invoice prepared. Declared value: ₹450 ($5.40)."

  ●  Stage 10: Dispatched via DHL         ✓  Aug 4 · 5:00 PM
     "Package picked up by DHL. Tracking: 1234567890"
     📎 [Waybill photo]
     🔗 [Track on DHL website]

  ◌  Stage 11: In Transit                 ⏳  In Progress
     Last update: "Departed Hyderabad — Aug 4 · 7:30 PM"

  ◌  Stage 12: Delivered                  ○  Pending
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COST BREAKDOWN (what you actually paid)
  ─────────────────────────────────────────────────────────
  Product — actual vendor cost:  ₹450   ($5.40)
  Packing materials:             ₹ 80   ($0.96)
  Local transport:               ₹150   ($1.80)
  Our service & inspection fee:          $4.80
  Shipping — DHL actual invoice:        $28.00
  ─────────────────────────────────────────────────────────
  Total:                                $41.00
  ─────────────────────────────────────────────────────────
  Vendor receipt: attached ↑
  DHL invoice:    attached ↑
  NO markup on product. NO markup on shipping.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Rules — Customer Visibility (System Must Enforce These)

| Rule | How It Works |
|---|---|
| **Every stage update is instant** | The moment any actor changes an order status in the system, the customer portal and WhatsApp update within 60 seconds |
| **Every photo is customer-visible by default** | All agent-uploaded photos appear in the customer's order tracker automatically unless admin explicitly marks one "internal only" |
| **Cost breakdown visible at all times** | The exact itemised cost is a permanent fixture on the order page from quote acceptance to completion. It cannot be hidden. |
| **Vendor receipt always attached** | Admin CMS enforces receipt upload before order can move past SOURCING stage |
| **No unannounced charges** | The only way to charge a customer more than the approved quote is via a new quote that requires fresh explicit approval |
| **Difference refunded automatically** | If product cost < quoted amount, system creates a Stripe refund for the difference and shows it in the cost breakdown |
| **Stage timestamps are permanent** | Once a stage timestamp is set, it cannot be edited — full tamper-proof audit trail |
| **Customer can download everything** | Every document, photo, and receipt is downloadable from the order page indefinitely |

---

### The "No Extra Charges" Guarantee — Platform-Level Enforcement

The platform does not allow the following actions — they are technically blocked, not just policy:

| Blocked Action | Why It's Blocked |
|---|---|
| Charging customer more than the approved quote amount without a new approved quote | Stripe PaymentIntent is capped at the approved quote total |
| Sending a quote without an itemised cost breakdown | CMS quote builder form validation prevents submission without line items |
| Marking an order complete without attaching a receipt or proof document | Order status API rejects the COMPLETED transition if no receipt document is linked |
| Shipping a product before admin QC approval | Order status transition QUALITY_CHECK → PACKING is blocked in API until admin_qc_approved = true |
| Under-declaring customs value | Customs invoice value is auto-populated from the verified product cost field — it cannot be lower |

---

## 12. Shipping Pipeline — India to USA

### End-to-End Shipping Flow

```
CUSTOMER SUBMITS SHOPPING REQUEST
        │
        ▼
OPS REVIEWS (within 4 hours)
  - Feasibility check
  - Vendor research (1–3 options)
  - Shipping estimate via DHL/FedEx API
  - Customs classification
        │
        ▼
QUOTE SENT TO CUSTOMER (WhatsApp + Portal)
  - Vendor options with prices
  - Inspection scope explained
  - Shipping cost (actual DHL quote)
  - Total cost breakdown
        │
        ▼
CUSTOMER APPROVES + PAYS
        │
        ▼
AGENT GOES TO VENDOR
  - Purchase at agreed price
  - Obtains original purchase receipt
        │
        ▼
PHYSICAL INSPECTION (same day or next day)
  - Category-specific checklist
  - Photos uploaded to system
  - PASS or FAIL decision
        │
   ┌────┴─────────────────┐
   │                      │
 PASS                   FAIL
   │                      │
   ▼                      └──► WhatsApp customer
PACKING                         → alternate / refund
  - Food-safe packing for edibles
  - Bubble wrap / foam for fragile items
  - Moisture protection (silica gel)
  - Weight and dimension verified
  - Packing photos taken
        │
        ▼
CUSTOMS DOCUMENTATION PREPARED
  - Commercial invoice (accurate value — no under-declaring)
  - HS code classification per item
  - Contents declaration (honest and compliant)
        │
        ▼
COURIER PICKUP (DHL / FedEx)
  - Waybill generated
  - Tracking number sent to customer via WhatsApp immediately
        │
        ▼
IN-TRANSIT UPDATES
  - Auto-updates from courier API
  - Customs clearance status sent to customer
  - Delivery confirmation sent to customer
        │
        ▼
DELIVERED
  - Customer confirms receipt (WhatsApp prompt)
  - Rating requested
  - Order marked COMPLETED
```

### Courier Partners

| Courier | Use Case | Est. Transit |
|---|---|---|
| DHL Express | Standard for all orders | 5–7 business days |
| FedEx International | Alternative / backup | 5–8 business days |
| DHL Economy | Low-value, non-urgent | 10–14 days |
| EMS (India Post) | Budget option for non-urgent | 14–21 days |

### Customs Compliance

- All shipments declared **accurately** — no under-declaration
- Personal-use quantities only — no bulk commercial import volumes
- Food items: USDA/FDA compliant quantities (< 2kg of any single food item typically)
- Medicines: FDA personal import policy (90-day supply max for personal use)
- Textiles: generally duty-free under $800 per shipment (US de minimis)
- We advise customers on customs duties **before** they approve the order

### Items We Cannot Ship

| Category | Reason |
|---|---|
| Fresh fruits, vegetables | USDA prohibited |
| Cooked food, wet/fresh sweets | Spoilage + USDA |
| Prescription medicines without prescription | FDA |
| Soil, seeds, plants | USDA quarantine |
| Endangered animal products | CITES |
| Currency, gold bars | FEMA/customs |
| Counterfeit goods | Trademark law |
| Anything > $2,500 without import permit | Formal entry required |

---

## 13. Quality Control & Accountability Framework

### The QC Principle

> "We inspect every product as if it is going to our own family."

### QC Levels

**Level 1 — Basic (all items):**
- Item is what was ordered (correct product, variety, brand)
- Quantity is correct (weight/count verified)
- No visible damage or defect
- Expiry date acceptable (>3x transit time remaining)

**Level 2 — Category-Specific (food, textiles, medicines):**
- Food: taste/smell check, seal intact, packaging condition
- Textiles: fabric composition, defect scan, color accuracy
- Medicines: exact composition match, sealed, licensed manufacturer

**Level 3 — Enhanced (premium orders or customer request):**
- Video unboxing at vendor location
- Weight certificate from certified scale
- Lab test arrangement (e.g., silk content test for expensive sarees)

### Accountability Commitments

| Scenario | Our Response |
|---|---|
| We pay wrong bill amount | We cover any difference + late fee if applicable |
| Insurance lapses due to our failure | We cover reinstatement fee (up to ₹5,000) + escalate to management |
| Product rejected, customer unhappy with our reason | Refund immediately, no argument |
| Product passes inspection but arrives damaged | Full refund or replacement — shipping damage is our responsibility to claim from courier |
| Wrong product shipped | Full refund + correct item sent at no charge |
| Delivery delayed significantly | Proactive WhatsApp update + partial service fee refund |
| Customs holds the package | We assist with documentation, cover no additional duty (customer's responsibility for duty, but we assist) |

### Refund Policy

| Situation | Refund |
|---|---|
| Customer rejects our quote before paying | No charge at all |
| Customer cancels after paying but before sourcing starts | 100% refund |
| Item fails inspection, customer wants refund | 100% refund of product cost + our fee |
| Item fails inspection, customer wants alternate | No charge for 2nd sourcing attempt |
| Shipped but wrong item received | Full refund OR replacement at our cost |
| Customer unsatisfied after receiving correct item | Service fee non-refundable; product refund case-by-case |

---

## 14. WhatsApp Communication Flows

### Flow 1: New Shopping Request → Quote

```
Customer: "I want 1kg Kakinada Kaja sweets shipped to me in Dallas"
[Submits form on portal]

System → WhatsApp (template: request_received):
"Hi Rajesh, your request for Kakinada Kaja Sweets is received!
 Our team will research vendors and send you a quote within 4 hours.
 No payment until you approve. — NRI Concierge Team"

[4 hours later — ops team researches vendor]

Admin sends quote via WhatsApp (interactive):
"─────────────────────────────
 QUOTE — #ORD-001
 Item: 1kg Kakinada Kaja Sweets
 Vendor: Sri Krishna Sweets, Kakinada
─────────────────────────────
 Product cost:    ₹450  ($5.40)
 Packing:         ₹80   ($0.96)
 Transport:       ₹150  ($1.80)
 Our fee:         ₹400  ($4.80)
 Shipping (DHL):  $28.00
 TOTAL:           ~$41
─────────────────────────────
 See vendor photos attached.
 Valid for 48 hours."
[Image: vendor shop photo]
[Image: sample product photo]

Buttons: [✓ Approve & Pay]  [✗ Reject]  [? Ask a Question]
```

### Flow 2: Inspection Pass with Photos

```
[Agent completes inspection — 5 photos uploaded]

Admin approves QC → WhatsApp sent:

"Great news, Rajesh! Your Kakinada Kaja passed our quality check ✓
 - Weight verified: 1.02kg (slightly over!)
 - Expiry: March 2027
 - Freshness: Excellent — made yesterday
 - Packing: Food-safe with moisture protection

 We're packing now. Tracking number will follow tomorrow."
[Image: weight scale showing 1.02kg]
[Image: expiry date label]
[Image: packaged box sealed]
```

### Flow 3: Inspection Fail — Customer Informed Immediately

```
[Agent inspects saree — fabric is synthetic, not silk]

Admin documents rejection → WhatsApp sent within 30 minutes:

"Rajesh, we need to inform you about your saree order.

We inspected the Kanjeevaram saree at the vendor and found:
❌ FABRIC IS SYNTHETIC — NOT SILK

The vendor claimed it is silk but our inspection shows otherwise.
We WILL NOT ship this to you.
[Image: fabric closeup]
[Image: burn test result showing synthetic behavior]

What would you like to do?"

List options:
→ Try a Different Vendor (we'll find a verified silk supplier)
→ Cancel this item, Refund my money
→ Tell me more / Ask a question
```

### Flow 4: Bill Payment with Receipt

```
[Admin has paid TSSPDCL bill]

WhatsApp (template: bill_paid):
"Done! ✓

Your TSSPDCL electricity bill has been paid:
- Consumer #: 1234567890
- Amount paid: ₹1,847
- Date: Aug 3, 2026
- Transaction ID: TSSP20260803XXXX

Receipt attached."
[Document: payment_receipt.pdf]
[Image: screenshot of payment confirmation]

"Is there anything else we can help with?"
```

### Flow 5: Insurance Renewal Reminder → Payment

```
[30 days before LIC due date — automated trigger]

WhatsApp (template: renewal_reminder_30):
"Hi Rajesh, a friendly reminder:

Your LIC policy premium is due in 30 days.
- Policy: LIC Jeevan Anand #XXXX
- Premium: ₹8,400
- Due Date: September 5, 2026

Shall we schedule this payment for you?
Our fee: $8"

Buttons: [Yes, Schedule It]  [I'll Handle It]  [Remind Me Later]

[Customer replies: Yes, Schedule It]

"Perfect! We'll process this payment around August 25 (10 days before
 due date) and send you the receipt immediately.
 No further action needed from you."

[August 25: payment made]

"Done! LIC premium paid ✓
 Policy: Jeevan Anand #XXXX | ₹8,400 paid
 Next due: September 2027
 Receipt attached."
[Document: LIC_receipt.pdf]
```

### Flow 6: Customer Asks a Question via WhatsApp

```
Customer: "Can you get me Baidyanath Chyawanprash? My dad swears
           by that specific brand."

Ops team (within 2 hours):
"Hi Rajesh! Yes, we can source Baidyanath Chyawanprash.
 It's available at medical shops here.

 Quick question: what size would you like?
 - 500g (₹295 approx)
 - 1kg (₹550 approx)
 - 2x 500g pack (₹580 approx)"

Customer: "2x 500g please"

Ops: "Got it! I'll send you a formal quote within 2 hours
      with exact price and shipping. Watch for it here."
```

---

## 15. Notification System

### Channel Priority

```
1. WhatsApp (primary) — all customer-facing communication
2. Email          — backup; invoices, receipts, account events
3. In-App Portal  — dashboard notifications when logged in
4. SMS            — OTP only (auth)
```

### Event → Notification Mapping

| Event | WhatsApp | Email | In-App |
|---|---|---|---|
| Request received | Yes (template) | Yes | Yes |
| Quote sent | Yes (interactive) | Yes | Yes (badge) |
| Quote expiring (6h) | Yes | No | Yes |
| Customer approves | Yes (confirmation) | Yes (invoice) | Yes |
| Agent assigned | Yes (template) | No | Yes |
| Inspection pass | Yes + photos | No | Yes |
| Inspection fail | Yes (interactive) | Yes | Yes (alert) |
| Bill paid | Yes + receipt | Yes + receipt | Yes |
| Shipment dispatched | Yes + tracking | Yes + tracking | Yes |
| Customs update | Yes | No | Yes |
| Delivered | Yes (prompt to confirm) | Yes | Yes |
| Order completed | Yes (rating ask) | Yes | Yes |
| Renewal reminder 30d | Yes | Yes | Yes |
| Renewal reminder 7d | Yes | Yes | Yes |
| Renewal reminder 1d | Yes (urgent) | Yes | Yes |
| Payment failed | Yes | Yes | Yes (alert) |
| Refund issued | Yes | Yes | Yes |

### Customer Notification Preferences

Customers can disable email or in-app notifications per category.
**WhatsApp cannot be fully disabled** (it is the primary service channel) but customers can opt out of marketing messages. All transactional messages (order status, receipts, renewals) cannot be opted out of.

---

## 16. Authentication & KYC

### Authentication Methods

| Method | Detail |
|---|---|
| Email + Password | Standard; bcrypt hashed |
| Email OTP | One-time code via email for passwordless login |
| JWT Tokens | Access token: 15 min; Refresh token: 30 days (httpOnly cookie) |

### KYC Requirement

KYC is required before the **first paid order**.

**Documents required:**
1. Government photo ID — Passport (India or USA), Aadhaar, or US Driver's License
2. Selfie holding the ID

**Process:**
- Customer uploads documents via portal
- Admin reviews in CMS (manual review — no automated KYC for MVP)
- Approved or rejected with reason within 24 hours
- KYC approval notification via WhatsApp and email

**KYC States:**
```
NOT_SUBMITTED → SUBMITTED → UNDER_REVIEW → APPROVED
                                        └→ REJECTED (with reason, can resubmit)
```

---

## 17. Payment Processing

**Provider:** Stripe
**Currency:** USD only (customer payments)
**India receipts:** Stripe payouts to Indian business bank account (FIRC for FEMA compliance)

### Payment Model

**Key principle: Customers pay AFTER approving a quote, not upfront.**

| Step | What Happens |
|---|---|
| Customer submits request | No payment taken |
| Ops sends quote | No payment taken |
| Customer approves quote | Payment charged via Stripe |
| Quote includes actual costs + service fee | One total charge |
| Final shipping billed separately (actual) | Billed after shipment with exact courier invoice |

### Payment Flows

**Pay-Per-Order:**
- Stripe PaymentIntent created when customer clicks "Approve & Pay"
- Amount = service fee + product cost estimate
- Shipping charged as a second PaymentIntent after dispatch (at actual cost)
- Over/under amount: delta refunded or charged via saved card

**Subscription:**
- Stripe Subscriptions (monthly recurring)
- Service fees waived up to plan limit
- Actual product/shipping costs always additional

**Refund Handling:**
- All refunds via Stripe API
- Processed within 24 hours of decision
- Customer notified via WhatsApp on refund issuance
- Refund appears in 5–10 business days (Stripe standard)

### Stripe Events to Handle

| Stripe Event | Action |
|---|---|
| `payment_intent.succeeded` | Mark order APPROVED_PAID, notify customer |
| `payment_intent.payment_failed` | Notify customer, do not proceed with order |
| `charge.refunded` | Update order status, notify customer via WhatsApp |
| `invoice.payment_succeeded` | Renew subscription, reset task counter |
| `invoice.payment_failed` | Flag account, send payment_failed WhatsApp |
| `customer.subscription.deleted` | Downgrade to free tier |

---

## 18. Data Model

```sql
-- Customers
customers (
  id                  UUID PRIMARY KEY,
  name                VARCHAR(100) NOT NULL,
  email               VARCHAR(255) UNIQUE NOT NULL,
  email_verified      BOOLEAN DEFAULT FALSE,
  phone_usa           VARCHAR(20),
  phone_india         VARCHAR(20),       -- for WhatsApp routing
  whatsapp_phone      VARCHAR(20),       -- explicit WA number (may differ)
  password_hash       VARCHAR(255),
  stripe_customer_id  VARCHAR(100),
  kyc_status          ENUM('not_submitted','submitted','under_review','approved','rejected'),
  subscription_plan   ENUM('none','nri_seva_basic','nri_seva_family','full_service'),
  timezone            VARCHAR(50) DEFAULT 'America/New_York',
  is_active           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ
)

-- Orders
orders (
  id                   UUID PRIMARY KEY,
  order_number         VARCHAR(20) UNIQUE,  -- ORD-2026-001234
  customer_id          UUID REFERENCES customers(id),
  service_type         ENUM(
                         -- NRI Seva bucket
                         'nri_seva_bill_payment',
                         'nri_seva_insurance_renewal',
                         'nri_seva_govt_fee',
                         -- Shop from India bucket
                         'shop_india_product_sourcing'
                       ),
  title                VARCHAR(255),        -- human-readable summary
  description          TEXT,               -- full request details
  status               ENUM(
                          'new_request','under_review','quote_sent','quote_expired',
                          'approved_paid','sourcing','quality_check','packing',
                          'shipped','paid_confirmed','completed','cancelled','archived'
                       ),
  priority             ENUM('standard','urgent'),
  assigned_ops_agent   UUID,               -- internal ops team member
  assigned_field_agent UUID REFERENCES agents(id),
  sla_deadline         TIMESTAMPTZ,
  completed_at         TIMESTAMPTZ,
  customer_rating      INTEGER CHECK (customer_rating BETWEEN 1 AND 5),
  customer_review      TEXT,
  created_at           TIMESTAMPTZ,
  updated_at           TIMESTAMPTZ
)

-- Order form data (service-type-specific, stored as JSON)
order_request_data (
  id        UUID PRIMARY KEY,
  order_id  UUID REFERENCES orders(id) UNIQUE,
  data      JSONB NOT NULL
  -- For bill_payment: {biller_type, provider, consumer_number, name, approx_amount, urgency}
  -- For insurance: {insurer, policy_number, holder_name, approx_premium, due_date}
  -- For govt_fee: {fee_type, specific_fee, amount, location, reference_number}
  -- For product_sourcing: {description, quantity, budget_inr, brand_preference, shipping_address_id}
)

-- Quotes (ops team sends before payment)
order_quotes (
  id                  UUID PRIMARY KEY,
  order_id            UUID REFERENCES orders(id),
  version             INTEGER DEFAULT 1,   -- re-quote = version 2
  line_items          JSONB NOT NULL,      -- array of {label, inr, usd}
  service_fee_usd     DECIMAL(10,2),
  product_cost_usd    DECIMAL(10,2),
  shipping_cost_usd   DECIMAL(10,2),
  total_usd           DECIMAL(10,2),
  notes               TEXT,
  vendor_name         VARCHAR(255),
  vendor_location     VARCHAR(255),
  status              ENUM('pending_customer','approved','rejected','expired'),
  expires_at          TIMESTAMPTZ,
  approved_at         TIMESTAMPTZ,
  rejected_at         TIMESTAMPTZ,
  rejection_reason    TEXT,
  created_by          UUID,               -- ops agent who built quote
  created_at          TIMESTAMPTZ
)

-- Payments
order_payments (
  id                  UUID PRIMARY KEY,
  order_id            UUID REFERENCES orders(id),
  quote_id            UUID REFERENCES order_quotes(id),
  stripe_payment_id   VARCHAR(100),
  amount_usd          DECIMAL(10,2),
  status              ENUM('pending','captured','refunded','failed'),
  refund_amount_usd   DECIMAL(10,2),
  refund_reason       TEXT,
  charged_at          TIMESTAMPTZ,
  refunded_at         TIMESTAMPTZ
)

-- Inspection Records (for product sourcing orders)
order_inspections (
  id              UUID PRIMARY KEY,
  order_id        UUID REFERENCES orders(id),
  inspector_id    UUID REFERENCES agents(id),
  product_type    ENUM('food','textile','medicine','electronics','handicraft','other'),
  checklist       JSONB NOT NULL,          -- {item: string, passed: bool, notes: string, photo_url: string}[]
  overall_result  ENUM('pass','fail'),
  fail_reason     TEXT,                   -- mandatory if fail
  inspected_at    TIMESTAMPTZ,
  reviewed_by     UUID,                   -- admin who approved/rejected the inspection result
  reviewed_at     TIMESTAMPTZ
)

-- Shipments
order_shipments (
  id               UUID PRIMARY KEY,
  order_id         UUID REFERENCES orders(id),
  courier          VARCHAR(50),            -- DHL / FedEx / EMS
  tracking_number  VARCHAR(100),
  waybill_url      VARCHAR(500),
  weight_kg        DECIMAL(6,3),
  dimensions_cm    VARCHAR(50),
  actual_shipping_cost_usd DECIMAL(10,2),
  dispatched_at    TIMESTAMPTZ,
  estimated_delivery TIMESTAMPTZ,
  delivered_at     TIMESTAMPTZ,
  customs_status   VARCHAR(100),
  delivery_confirmed_by_customer BOOLEAN DEFAULT FALSE
)

-- Order Event Log (full audit trail)
order_events (
  id          UUID PRIMARY KEY,
  order_id    UUID REFERENCES orders(id),
  event_type  VARCHAR(50),
  from_status VARCHAR(50),
  to_status   VARCHAR(50),
  actor_type  ENUM('customer','ops_admin','field_agent','system'),
  actor_id    UUID,
  notes       TEXT,
  is_internal BOOLEAN DEFAULT FALSE,       -- internal notes not shown to customer
  created_at  TIMESTAMPTZ
)

-- Documents (all files)
documents (
  id             UUID PRIMARY KEY,
  order_id       UUID REFERENCES orders(id),
  inspection_id  UUID REFERENCES order_inspections(id),
  uploaded_by    UUID,
  uploader_type  ENUM('customer','agent','admin','system'),
  doc_category   ENUM('request_doc','receipt','inspection_photo','shipping_doc','other'),
  file_url       VARCHAR(500),
  file_name      VARCHAR(255),
  file_type      VARCHAR(50),
  file_size_kb   INTEGER,
  caption        TEXT,                     -- what this photo shows
  is_shared_with_customer BOOLEAN DEFAULT TRUE,
  uploaded_at    TIMESTAMPTZ
)

-- Field Agents
agents (
  id               UUID PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  phone            VARCHAR(20) NOT NULL,
  zones            TEXT[],
  specializations  ENUM[]('bills','insurance','govt_fee','shopping','packing'),
  availability     ENUM('active','on_leave','unavailable'),
  rating_avg       DECIMAL(3,2),
  rating_count     INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ
)

-- WhatsApp Conversations
whatsapp_conversations (
  id                UUID PRIMARY KEY,
  customer_id       UUID REFERENCES customers(id),
  customer_phone    VARCHAR(20) NOT NULL,
  current_order_id  UUID REFERENCES orders(id),
  agent_state       ENUM('bot','handoff','agent','resolved'),
  assigned_ops_id   UUID,
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ,
  updated_at        TIMESTAMPTZ
)

-- WhatsApp Messages
whatsapp_messages (
  id                UUID PRIMARY KEY,
  conversation_id   UUID REFERENCES whatsapp_conversations(id),
  wamid             VARCHAR(100) UNIQUE,
  direction         ENUM('inbound','outbound'),
  message_type      VARCHAR(50),
  content           TEXT,
  template_name     VARCHAR(100),
  media_url         VARCHAR(500),
  raw_payload       JSONB,
  status            ENUM('queued','sent','delivered','read','failed'),
  failure_reason    TEXT,
  received_at       TIMESTAMPTZ,
  status_updated_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ
)

-- Saved Family Members
family_members (
  id           UUID PRIMARY KEY,
  customer_id  UUID REFERENCES customers(id),
  name         VARCHAR(100),
  relationship VARCHAR(50),
  phone        VARCHAR(20),
  address      TEXT,
  created_at   TIMESTAMPTZ
)

-- Saved India Addresses (for bill payer reference)
india_addresses (
  id           UUID PRIMARY KEY,
  customer_id  UUID REFERENCES customers(id),
  label        VARCHAR(100),   -- e.g. "Madhapur Home", "Parents' House"
  address      TEXT,
  city         VARCHAR(50),
  pincode      VARCHAR(10),
  created_at   TIMESTAMPTZ
)

-- Saved USA Shipping Addresses
usa_shipping_addresses (
  id           UUID PRIMARY KEY,
  customer_id  UUID REFERENCES customers(id),
  label        VARCHAR(100),   -- e.g. "Home", "Office"
  name         VARCHAR(100),   -- recipient name
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city         VARCHAR(100),
  state        VARCHAR(50),
  zip          VARCHAR(20),
  phone        VARCHAR(20),
  is_default   BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ
)

-- Saved Policies & Recurring Bills (for renewal reminders)
renewal_items (
  id                UUID PRIMARY KEY,
  customer_id       UUID REFERENCES customers(id),
  type              ENUM('insurance','recurring_bill'),
  label             VARCHAR(100),   -- e.g. "LIC Jeevan Anand"
  provider          VARCHAR(100),   -- e.g. "LIC", "TSSPDCL"
  reference_number  VARCHAR(100),   -- policy number or consumer number
  holder_name       VARCHAR(100),
  approx_amount_inr DECIMAL(10,2),
  next_due_date     DATE,
  reminder_30d_sent BOOLEAN DEFAULT FALSE,
  reminder_7d_sent  BOOLEAN DEFAULT FALSE,
  reminder_1d_sent  BOOLEAN DEFAULT FALSE,
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ,
  updated_at        TIMESTAMPTZ
)

-- Subscriptions
subscriptions (
  id                      UUID PRIMARY KEY,
  customer_id             UUID REFERENCES customers(id),
  plan_name               ENUM('nri_seva_basic','nri_seva_family','full_service'),
  stripe_subscription_id  VARCHAR(100),
  status                  ENUM('active','past_due','cancelled','trialing'),
  tasks_limit             INTEGER,
  tasks_used              INTEGER DEFAULT 0,
  billing_cycle_start     TIMESTAMPTZ,
  billing_cycle_end       TIMESTAMPTZ,
  created_at              TIMESTAMPTZ,
  cancelled_at            TIMESTAMPTZ
)
```

---

## 19. API Specification

### Base URL
```
https://api.yourdomain.com/v1
```

### Auth Headers
```
Authorization: Bearer <jwt_access_token>
X-Admin-Role: <ops_manager|super_admin>   (admin endpoints only)
```

### Customer Endpoints

```
POST   /auth/register
POST   /auth/login
POST   /auth/otp/request
POST   /auth/otp/verify
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password

GET    /profile
PATCH  /profile
GET    /profile/family-members
POST   /profile/family-members
GET    /profile/india-addresses
POST   /profile/india-addresses
GET    /profile/shipping-addresses
POST   /profile/shipping-addresses
GET    /profile/renewals
POST   /profile/renewals
DELETE /profile/renewals/:id

POST   /orders                           Submit new request (no payment here)
GET    /orders                           Customer's orders list
GET    /orders/:id                       Order detail
GET    /orders/:id/events                Event timeline
GET    /orders/:id/documents             Documents and photos
POST   /orders/:id/cancel               Cancel (if before approval)
POST   /orders/:id/additional-info      Submit more info when requested

GET    /quotes/:id                       Get quote detail
POST   /quotes/:id/approve              Approve quote → triggers Stripe payment
POST   /quotes/:id/reject               Reject quote
POST   /quotes/:id/ask-question         Send question (via WhatsApp)

GET    /payments                         Payment history
GET    /payments/:id/invoice            Download invoice PDF

GET    /subscriptions/plans
POST   /subscriptions
DELETE /subscriptions
GET    /billing/invoices
POST   /billing/payment-methods
DELETE /billing/payment-methods/:id

GET    /kyc/status
POST   /kyc/upload

GET    /messages                         WhatsApp conversation list
GET    /messages/:conversationId
POST   /messages/:conversationId/reply
```

### Admin Endpoints

```
-- Orders
GET    /admin/orders                     All orders (filterable)
GET    /admin/orders/:id
PATCH  /admin/orders/:id/status
PATCH  /admin/orders/:id/assign
POST   /admin/orders/:id/note           Internal note

-- Quotes
POST   /admin/orders/:id/quote          Build and send quote
PATCH  /admin/quotes/:id               Update quote
POST   /admin/quotes/:id/send          Send to customer via WhatsApp

-- Inspections
POST   /admin/orders/:id/inspection    Submit inspection result
PATCH  /admin/inspections/:id          Update inspection
POST   /admin/inspections/:id/approve  Approve inspection → proceed
POST   /admin/inspections/:id/reject   Reject → notify customer

-- Shipments
POST   /admin/orders/:id/shipment      Create shipment record
PATCH  /admin/shipments/:id            Update tracking/status
POST   /admin/shipments/:id/notify     Send tracking WhatsApp to customer

-- Agents
GET    /admin/agents
POST   /admin/agents
GET    /admin/agents/:id
PATCH  /admin/agents/:id

-- Customers
GET    /admin/customers
GET    /admin/customers/:id
PATCH  /admin/customers/:id/kyc        Approve/reject KYC

-- WhatsApp (Admin)
GET    /admin/whatsapp/conversations
GET    /admin/whatsapp/conversations/:id
GET    /admin/whatsapp/conversations/:id/messages
POST   /admin/whatsapp/conversations/:id/reply
POST   /admin/whatsapp/conversations/:id/assign
PATCH  /admin/whatsapp/conversations/:id/resolve
POST   /admin/whatsapp/send-template   Manual template trigger

-- Renewals
GET    /admin/renewals                  All renewal items (sorted by urgency)
POST   /admin/renewals/:id/send-reminder  Manual reminder trigger
POST   /admin/renewals/:id/create-order   Create order from renewal

-- Analytics
GET    /admin/analytics/revenue
GET    /admin/analytics/orders
GET    /admin/analytics/quality
GET    /admin/analytics/whatsapp
GET    /admin/analytics/renewals

-- Webhooks
GET    /webhooks/whatsapp              Meta verification
POST   /webhooks/whatsapp              Inbound messages
POST   /webhooks/stripe                Stripe events
```

### Agent Endpoints

```
GET    /agent/tasks
GET    /agent/tasks/:id
PATCH  /agent/tasks/:id/status
POST   /agent/tasks/:id/checkin        GPS check-in
POST   /agent/tasks/:id/inspection     Submit inspection data + photos
POST   /agent/tasks/:id/documents      Upload receipts/photos
```

---

## 20. Non-Functional Requirements

### Performance
- API p95 response time: < 200ms reads, < 500ms writes
- WhatsApp webhook: HTTP 200 within 150ms (process async via BullMQ)
- Portal LCP: < 2.5 seconds on 4G mobile
- Image upload to S3: presigned direct upload (no API proxying of large files)

### Availability
- Target uptime: 99.5% monthly
- Graceful degradation: if WhatsApp API is down, queue messages and retry; email fallback fires
- Database: AWS RDS Multi-AZ for automatic failover

### Security
- TLS 1.3 on all endpoints
- Database + S3 encrypted at rest
- Presigned S3 URLs with 1-hour expiry for document access
- WhatsApp webhook: HMAC-SHA256 verification (x-hub-signature-256)
- Stripe webhook: Stripe-Signature header verification
- JWT: RS256 algorithm
- Rate limiting: 60 req/min per IP (public), 300 req/min per authenticated user
- All file uploads scanned for malware (ClamAV or AWS GuardDuty)
- OWASP Top 10 compliance before launch

### Observability
- Error tracking: Sentry (frontend + backend)
- Metrics: Grafana + CloudWatch
- Uptime: Better Uptime (external monitoring)
- Alerting: PagerDuty for P0/P1
- All WhatsApp message delivery failures alerted within 10 minutes

---

## 21. Compliance & Legal

### India

| Item | Requirement |
|---|---|
| Entity | Private Limited Company or LLP, Hyderabad |
| GST | Register once turnover > ₹20 lakhs/year |
| FEMA | All USD receipts via authorized dealer bank; FIRC obtained |
| Data hosting | All data on AWS ap-south-1 (Mumbai) |
| Export rules | Comply with Indian customs export limits; no restricted goods |
| Agents | Documented contractor agreements; no employment disputes |

### USA (Customer Side)

| Item | Requirement |
|---|---|
| Service contract | Clear Terms of Service with SLA, refund policy, and accountability terms |
| Privacy Policy | CCPA compliant (California customers) |
| No money transmission | We charge for services only; not a money transmitter |
| Customs declarations | All shipments accurately declared — no under-declaration |
| FDA personal import | Medicines: personal-use quantities, no Rx without valid prescription |
| USDA compliance | No prohibited agricultural products shipped |

### Intellectual Property
- No counterfeit goods policy — enforced at inspection
- No brand misrepresentation in marketing materials
- Customer indemnifies us for requesting restricted items in good faith

---

## 22. Tech Stack

### Frontend

| Technology | Role |
|---|---|
| Next.js 14 (App Router) | Customer portal |
| React 18 + Vite | Admin CMS |
| TypeScript | All frontend |
| Tailwind CSS | Styling |
| shadcn/ui | Components |
| React Query (TanStack) | Server state |
| Zustand | UI state |
| React Hook Form + Zod | Forms + validation |
| Socket.io client | Real-time order + WA updates |
| Stripe.js | Payment form |

### Backend

| Technology | Role |
|---|---|
| Node.js 20 LTS | Runtime |
| NestJS 10 | Framework |
| TypeScript | All backend |
| Prisma ORM | DB access + migrations |
| PostgreSQL 15 | Primary database |
| Redis 7 | Cache + BullMQ queues |
| BullMQ | Async jobs (WA messages, email, reminders) |
| Socket.io | WebSocket real-time |
| class-validator | DTO validation |
| Axios | HTTP client |

### Infrastructure

| Technology | Role |
|---|---|
| AWS ECS Fargate | API + worker hosting |
| AWS RDS PostgreSQL | Managed DB (Multi-AZ) |
| AWS ElastiCache Redis | Managed Redis |
| AWS S3 | Document and photo storage |
| AWS CloudFront | CDN |
| Docker | Containerization |
| GitHub Actions | CI/CD |
| Turborepo | Monorepo |

### External Services

| Service | Role |
|---|---|
| Meta Cloud API | WhatsApp communication |
| Stripe | USD payment collection |
| DHL API | Shipping quotes + tracking |
| FedEx API | Shipping backup |
| SendGrid | Email delivery |
| Twilio | SMS OTP (auth only) |
| Sentry | Error monitoring |

---

## 23. Integrations

### Meta Cloud API (WhatsApp)

| Config | Value |
|---|---|
| API Version | v21.0 |
| Auth | System User permanent token |
| Webhook POST | `/webhooks/whatsapp` |
| Webhook GET | `/webhooks/whatsapp` (verification) |
| Security | HMAC-SHA256 via `x-hub-signature-256` |
| Message types | Template, interactive (buttons/list), text, document, image |
| Media upload | Graph API `/media` endpoint for documents/photos |

### Stripe

| Config | Value |
|---|---|
| Trigger | Quote approved by customer |
| PaymentIntent | Created server-side, confirmed client-side via Stripe.js |
| Subscriptions | Stripe Billing (monthly) |
| Webhooks | `payment_intent.succeeded`, `invoice.*`, `charge.refunded` |
| Payouts | Indian business bank account linked |

### DHL / FedEx APIs

| Feature | Detail |
|---|---|
| Shipping quote | Rate request per package dimensions + weight + destination |
| Booking | Waybill generation via API |
| Tracking | Webhook or polling for status updates |
| Labels | PDF label generation |

---

## 24. Development Milestones

### Milestone 1 — Project Foundation
- Turborepo monorepo with `apps/web`, `apps/admin`, `apps/agent`, `packages/api`
- Docker Compose: PostgreSQL + Redis + API
- Prisma schema with all tables
- GitHub Actions CI pipeline
- Environment config management

**Done when:** All services run locally, DB migrations apply cleanly

### Milestone 2 — Auth + Customer Accounts
- Email/password registration + login
- Email OTP flow
- JWT access + refresh tokens
- Customer profile: family members, addresses, policies
- KYC upload + admin review
- Email verification

**Done when:** Customer can register, verify, set up profile, upload KYC

### Milestone 3 — Order Submission (No Payment Yet)
- 4 service-type forms (bill, insurance, govt fee, product sourcing)
- Order API (create, list, get, cancel)
- Order event log
- Document upload via S3 presigned URLs
- Admin: order list + status management + assignment

**Done when:** Customer submits request; admin sees it and can manage it

### Milestone 4 — Quote System + Payment
- Quote builder in admin CMS (line item entry, auto-calc totals)
- Quote sent via WhatsApp (template) + portal notification
- Quote approval page (portal)
- Stripe PaymentIntent on approval
- Stripe webhooks (success/failure)
- Shipping charge as 2nd payment after dispatch

**Done when:** Full flow: submit → quote → approve → pay

### Milestone 5 — WhatsApp Integration
- Meta webhook (verify + receive)
- HMAC guard
- 14 templates approved by Meta + submitted
- Order event listener → auto WhatsApp on every status change
- Inbound message handler + persistence
- Admin CMS: WhatsApp inbox + reply interface
- Agent handoff state machine
- Document + photo delivery via WhatsApp media API
- Interactive messages: quote approval, rejection reason, renewal response

**Done when:** Full WhatsApp flow works end-to-end

### Milestone 6 — Inspection + QC Module
- Inspection checklist module (dynamic by product type)
- Agent PWA: checklist with photo upload per item
- Admin: inspection review + approve/fail
- Rejection flow: WhatsApp to customer with photos + options
- Alternate sourcing flow

**Done when:** Agent can complete inspection; admin reviews; customer notified correctly

### Milestone 7 — Shipping Module
- Shipment record creation
- DHL/FedEx API: rate quote, booking, tracking
- Waybill generation and storage
- Tracking updates auto-pushed to customer via WhatsApp
- Customs documentation checklist

**Done when:** End-to-end shipping flow from QC pass to delivery confirmation

### Milestone 8 — Renewal Reminder System
- Renewal item management (customer adds policies/bills)
- Automated reminder jobs (BullMQ cron: 30d, 7d, 1d before due date)
- Renewal reminder WhatsApp templates with response buttons
- Admin: renewal dashboard sorted by urgency
- One-click create order from renewal item

**Done when:** System proactively reminds customers; one-click renewal works

### Milestone 9 — Customer Portal (Frontend Complete)
- Landing page + all public pages
- Dashboard (pending approvals, active orders, renewals)
- Order submission (all 4 service types)
- Order detail: timeline, inspection photos, documents, WhatsApp panel
- Quote approval UI
- Messages page
- Account + settings

**Done when:** Complete customer-facing web experience

### Milestone 10 — Admin CMS (Frontend Complete)
- Order Kanban board
- Order detail drawer with Quote Builder
- Inspection management UI
- Shipping management UI
- WhatsApp inbox (full chat UI)
- Customer management + KYC review
- Agent management
- Renewal tracker dashboard
- Analytics dashboards

**Done when:** Ops team can run entire business from admin CMS

### Milestone 11 — Agent PWA
- Installable Android PWA
- Task list with SLA timers
- Task detail with instructions
- Inspection checklist with camera + photo upload
- GPS check-in
- Push notifications

**Done when:** Field agent can manage all tasks from phone

### Milestone 12 — Launch Readiness
- Load test: 200 concurrent users
- Security audit: OWASP Top 10, Stripe/Meta webhook security
- Pilot: 10 real customers, 30 real orders
- Refund flow end-to-end test
- SLA breach alerting test
- Renewal reminder timing test
- Legal: ToS + Privacy Policy + Refund Policy drafted and reviewed
- Production AWS environment provisioned
- Monitoring configured (Sentry + CloudWatch + Better Uptime)
- Domain, SSL, email DNS configured
- Meta WhatsApp Business Account verified + all templates approved

**Done when:** All pilot orders completed successfully; no critical bugs

---

## 25. Open Questions

| # | Question | Owner | Priority |
|---|---|---|---|
| 1 | Company name and legal entity type (Pvt Ltd vs LLP)? | Founder | High |
| 2 | Which Indian bank for Stripe USD payouts (needs foreign currency account)? | Founder | High |
| 3 | WhatsApp number — new Hyderabad number or existing? | Ops | High |
| 4 | Who are the first 3 field agents in Hyderabad? What are their zones? | Ops | High |
| 5 | For product sourcing — do we maintain a physical stock room or purely on-demand? | Ops | High |
| 6 | What is our courier agreement — DHL account or use third-party aggregator? | Ops | High |
| 7 | For textile QC — do we partner with a fabric testing lab for expensive items? | Ops | Medium |
| 8 | Maximum single order value we accept? (e.g., no single order > $500 initially?) | Founder | Medium |
| 9 | Do we offer gift wrapping / personalized messages for shipping orders? | Product | Medium |
| 10 | How do we handle foreign currency for purchasing (agent uses personal card + reimbursed vs company card)? | Finance | High |
| 11 | What happens if a customer disputes a charge with their bank (chargeback)? | Finance | Medium |
| 12 | Do we expand to other Andhra Pradesh cities (Visakhapatnam, Vijayawada) in Year 1? | Founder | Low |
| 13 | Will the platform support Telugu language UI? | Product | Low |
| 14 | Do we build an iOS agent app or is Android-only PWA sufficient? | Tech | Low |
| 15 | What is the daily sending limit on our WhatsApp Business number initially? | Tech | Medium |

---

*PRD Version 2.0 — MVP Focused*
*All previous Phase 2/3 services (elder care, property management, legal, travel) deferred to post-MVP*
*Core promise: Bills + Insurance + Government Fees + Product Sourcing, done with honesty, quality, and full accountability*
