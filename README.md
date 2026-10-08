# 🏢 CampusStay — Modern Hostel Management Portal

A production-grade, full-stack hostel administration system built to digitize residential operations, eliminate paper workflows, and provide seamless self-service dashboards for both students and campus administrators.

---

## 📌 Table of Contents

* [Overview](https://www.google.com/search?q=%23-overview)
* [System Architecture](https://www.google.com/search?q=%23-system-architecture)
* [Key Features](https://www.google.com/search?q=%23-key-features)
* [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
* [Database Schema Overview](https://www.google.com/search?q=%23-database-schema-overview)
* [Getting Started](https://www.google.com/search?q=%23-getting-started)
* [API Endpoints](https://www.google.com/search?q=%23-api-endpoints)
* [Security & Authentication](https://www.google.com/search?q=%23-security--authentication)
* [Roadmap](https://www.google.com/search?q=%23-roadmap)

---

## 📖 Overview

Manual hostel administration often suffers from lost maintenance tickets, opaque room allocations, and manual fee reconciliation. **CampusStay** automates the entire lifecycle of student residential housing:

* **Role-Based Access Control (RBAC):** Distinct permissions and views for Students, Wardens, and Super Admins.
* **Maintenance Lifecycle Pipeline:** Real-time ticketing engine with status transitions (`Pending` ➔ `In Progress` ➔ `Resolved`).
* **Digital Financial Ledger:** Student fee ledger with integrated digital payment verification and invoice receipt generation.

---

## 🏛 System Architecture

```text
       +-----------------------+       +-----------------------+
       |   Student Dashboard   |       |    Warden Console     |
       +-----------+-----------+       +-----------+-----------+
                   |                               |
                   +---------------+---------------+
                                   | (HTTPS / REST API)
                                   v
                      +-------------------------+
                      |   Express / Node Engine |
                      |  - JWT Authentication   |
                      |  - RBAC Middleware      |
                      |  - Business Logic       |
                      +------------+------------+
                                   |
                     +-------------+-------------+
                     |                           |
                     v                           v
          +--------------------+      +--------------------+
          |  Relational / SQL  |      |  Payment Gateway   |
          |  Database Storage  |      |   Webhook Engine   |
          +--------------------+      +--------------------+

```

---

## ✨ Key Features

### 👨‍🎓 Student Portal

* **Digital Onboarding & Profile:** Automated identity verification and resident history tracking.
* **Room Allotment Requests:** View floor maps, available beds, and submit allocation preferences.
* **Maintenance Helpdesk:** Lodge category-specific complaints (Plumbing, Electrical, Carpentry, Wi-Fi) with photo attachments.
* **Fee Payment Ledger:** Instant online fee settlement, transaction history, and downloadable payment receipts.
* **Digital Outing / Gate Pass:** Real-time gate pass requests with warden approval notifications.

### 🛡️ Warden & Admin Console

* **Master Occupancy Dashboard:** Real-time metrics on room vacancies, wing distribution, and student counts.
* **Ticketing Resolution Hub:** Assign complaints to campus maintenance staff and track SLA turnaround times.
* **Financial Reconciliation:** Track pending dues, verify manual offline vouchers, and export ledger summaries.
* **Notice Board Broadcasting:** Publish high-priority campus announcements directly to student portals.

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | HTML5, Modern CSS3 / Tailwind, Vanilla ES6+ JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL / MySQL / MongoDB (via ORM/ODM) |
| **Authentication** | JWT (JSON Web Tokens), `bcrypt` password hashing |
| **Deployment** | Docker, Nginx, PM2 |

---

## 🗄 Database Schema Overview

```sql
-- Core Entity Relationships (Relational Blueprint)
Users (id, full_name, email, password_hash, role, phone, created_at)
Rooms (id, room_number, wing, capacity, occupied_count, status)
Allocations (id, user_id, room_id, bed_number, check_in, check_out)
Complaints (id, user_id, title, category, description, status, resolved_at)
Transactions (id, user_id, amount, payment_reference, status, created_at)

```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** `>= 18.x`
* **npm** `>= 9.x`
* **Database Instance** (PostgreSQL / MySQL / MongoDB)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/hostel-management-system.git
cd hostel-management-system

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/hostel_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRATION=7d

```


4. **Run migrations / seed data:**
```bash
npm run db:migrate
npm run db:seed

```


5. **Start the application:**
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

```



---

## 🔌 API Endpoints (Quick Reference)

### Authentication

* `POST /api/v1/auth/register` — Register a resident student
* `POST /api/v1/auth/login` — Authenticate user and issue JWT
* `GET /api/v1/auth/me` — Retrieve authenticated user profile

### Rooms & Allocations

* `GET /api/v1/rooms/available` — List vacant rooms and bed numbers
* `POST /api/v1/rooms/allocate` — Assign room to student (`Admin/Warden only`)

### Maintenance & Support

* `POST /api/v1/complaints` — Submit a new maintenance ticket
* `GET /api/v1/complaints/my` — Fetch tickets created by authenticated student
* `PATCH /api/v1/complaints/:id/status` — Update resolution lifecycle (`Warden only`)

---

## 🔒 Security & Best Practices

* **Zero Plaintext Passwords:** Passwords hashed with `bcrypt` (Salt rounds: 12).
* **Stateless Token Authentication:** Secure HTTP headers, token expiry, and payload signing.
* **Sanitization & Input Validation:** Strict schema validation to prevent SQL/NoSQL injection and Cross-Site Scripting (XSS).
* **Rate Limiting:** API endpoint protection against brute-force attacks via `express-rate-limit`.

---

## 🗺 Roadmap

* [ ] Automated SMS / WhatsApp alerts for gate pass approvals.
* [ ] QR code scanning at security gates for out-pass verification.
* [ ] Biometric mess attendance integration.
* [ ] Exportable monthly audit reports (PDF/Excel).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
