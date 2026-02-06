# Architecture & Code Overview

Panduan lengkap untuk memahami arsitektur dan fungsi setiap file dalam project.

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Homepage   │  │  Search Page │  │ Booking Form │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │  Auth Pages  │  │  User Dashboard                            │
│  └──────────────┘  └──────────────┘                             │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP/REST
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              NEXT.JS APPLICATION LAYER                           │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                  Route Handlers (API)                   │     │
│  │  /api/bookings    /api/tickets    /api/auth            │     │
│  │  (POST/GET/PUT)   (GET/POST)      (signup)             │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Middleware (Auth)                          │     │
│  │  - Protected routes                                    │     │
│  │  - Session validation                                 │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │          NextAuth.js (Authentication)                  │     │
│  │  - JWT Sessions                                        │     │
│  │  - Google OAuth                                        │     │
│  │  - Credentials Provider                                │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────────────┬──────────────────────────────────────────┘
                       │ SQL (Prisma)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│           POSTGRESQL DATABASE                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │  Users   │  │ Bookings │  │ Tickets  │  │ Sessions │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## 🗂️ Directory Structure & File Purposes

### Root Directory

```
├── .env.example              # Template for environment variables
├── .gitignore               # Git ignore rules
├── .editorconfig            # Editor settings
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vercel.json              # Vercel deployment config
├── .eslintrc.json           # ESLint rules
├── README.md                # Main documentation
├── DEPLOYMENT_GUIDE.md      # Vercel deployment steps
├── LOCAL_SETUP.md           # Local development setup
├── ENV_VARIABLES.md         # Environment variables guide
├── PROJECT_STRUCTURE.md     # Project folder structure
├── API_TESTING.md           # API testing guide
├── CONTRIBUTING.md          # Contributing guidelines
├── QUICK_REFERENCE.md       # Command shortcuts
├── TROUBLESHOOTING.md       # Troubleshooting guide
├── prisma/                  # Database & ORM
├── src/                     # Application code
└── node_modules/            # Dependencies (not in git)
```

### Prisma Directory (`prisma/`)

**Purpose:** Database schema, migrations, and seed data

```
prisma/
├── schema.prisma            # Database schema definition
│   ├── User model           # User accounts (local & OAuth)
│   ├── Account model        # OAuth account linking
│   ├── Session model        # NextAuth sessions
│   ├── VerificationToken    # Email verification tokens
│   ├── Ticket model         # Flights & Hotels
│   └── Booking model        # User bookings
│
├── seed.ts                  # Database seed script
│   └── Creates sample data (flights, hotels)
│
└── .env                     # (local only) Database URL

[Not in git - Generated by Prisma]
├── migrations/              # Migration history
└── dev.db (SQLite only)
```

### Source Directory (`src/`)

#### `/src/app` - Next.js App Router

**Purpose:** Main application routes and pages

```
src/app/
├── layout.tsx               # Root layout
│   ├── Wraps all pages
│   ├── SessionProvider setup
│   └── Global providers
│
├── globals.css              # Global styles
│   ├── Tailwind directives
│   ├── Custom CSS classes
│   └── Animations
│
├── page.tsx                 # Homepage (/)
│   ├── Hero section
│   ├── SearchBar component
│   ├── Features highlight
│   └── CTA section
│
├── search/
│   └── page.tsx             # Search Results (/search)
│       ├── Fetch tickets via API
│       ├── Display results
│       ├── Filter integration
│       └── Pagination

├── booking/
│   └── page.tsx             # Booking Form (/booking)
│       ├── Passenger form
│       ├── Price breakdown
│       ├── Submit to API
│       └── Session check
│
├── my-bookings/
│   └── page.tsx             # User Dashboard (/my-bookings)
│       ├── Fetch user bookings
│       ├── Status badges
│       └── Action buttons
│
├── auth/
│   ├── signin/
│   │   └── page.tsx         # Login page (/auth/signin)
│   │       ├── Email login form
│   │       └── Google OAuth button
│   │
│   ├── signup/
│   │   └── page.tsx         # Registration (/auth/signup)
│   │       ├── Email/password form
│   │       └── Form validation
│   │
│   └── error/
│       └── page.tsx         # Auth error (/auth/error)
│           └── Error message display
│
└── api/
    ├── auth/
    │   ├── [...nextauth]/
    │   │   └── route.ts     # NextAuth handler
    │   │       ├── Google OAuth callback
    │   │       ├── Credentials verification
    │   │       └── Session management
    │   │
    │   └── signup/
    │       └── route.ts     # User registration endpoint
    │           ├── Email validation
    │           ├── Password hashing
    │           └── User creation
    │
    ├── bookings/
    │   └── route.ts         # Booking API (/api/bookings)
    │       ├── POST: Create booking
    │       │   └── Validate → Calculate → Create
    │       ├── GET: User bookings
    │       │   └── Fetch from database
    │       └── PUT: Update status
    │           └── PENDING→CONFIRMED→COMPLETED
    │
    └── tickets/
        └── route.ts         # Ticket search API (/api/tickets)
            ├── GET: Search with filters
            │   ├── Price range
            │   ├── Departure time
            │   ├── Stops/Airlines
            │   └── Pagination
            └── POST: Create ticket (admin)
                └── Validate → Create → Return
```

#### `/src/components` - Reusable Components

**Purpose:** UI components for pages

```
src/components/
├── navbar.tsx               # Navigation bar component
│   ├── Logo
│   ├── Navigation links
│   └── Auth state (Login/Profile/Logout)
│
├── footer.tsx               # Footer component
│   ├── Company info
│   ├── Quick links
│   └── Social media
│
├── search/
│   ├── search-bar.tsx       # Main search form
│   │   ├── Flight/Hotel tabs
│   │   ├── Date pickers
│   │   ├── Location inputs
│   │   └── Passenger selector
│   │
│   ├── search-filters.tsx   # Filter sidebar
│   │   ├── Price range slider
│   │   ├── Time filters
│   │   ├── Airline checkboxes
│   │   └── Apply filters button
│   │
│   └── ticket-card.tsx      # Single ticket display
│       ├── Ticket info
│       ├── Price display
│       ├── Availability
│       └── Book button
│
└── [Future components can be added here]
    ├── payment/
    ├── review/
    ├── admin/
    └── etc.
```

#### `/src/lib` - Utility & Library Code

**Purpose:** Helper functions, database, authentication

```
src/lib/
├── auth.ts                  # NextAuth configuration
│   ├── GoogleProvider setup
│   ├── CredentialsProvider setup
│   ├── JWT callbacks
│   ├── Session callbacks
│   └── Page configuration
│
├── db/
│   └── prisma.ts            # Prisma client singleton
│       ├── Initialize client
│       └── Prevent multiple instances
│
└── utils/
    ├── helpers.ts           # Utility functions
    │   ├── validateEmail()  # Email validation
    │   ├── validatePhone()  # Phone validation
    │   ├── calculateTotalPrice() # Price calc
    │   ├── generateBookingCode() # Code gen
    │   └── formatDateTime() # Date formatting
    │
    └── payment.ts           # Payment integration
        ├── createStripeIntent() # Stripe
        ├── verifyStripePayment()
        ├── createMidtransToken() # Midtrans
        └── verifyMidtransPayment()
```

### Middleware (`src/middleware.ts`)

**Purpose:** Route protection and authentication

```
middleware.ts
├── Check if route is protected
├── Get session token
├── Validate session
├── Redirect to login if needed
└── Allow request if authenticated
```

## 🔄 Data Flow

### User Authentication Flow

```
1. User visits /auth/signin
   └─> Rendered login form

2. User submits credentials
   └─> POST /api/auth/signin
       ├─> CredentialsProvider validates
       └─> User found in database? YES

3. NextAuth creates session
   └─> JWT token generated
       └─> Stored in httpOnly cookie

4. Redirect to / (homepage)
   └─> Session synced
       └─> useSession() returns user data

5. On protected pages
   └─> Middleware checks session
       ├─> Valid? YES → Allow
       └─> Invalid? → Redirect to login
```

### Booking Creation Flow

```
1. User navigates to /booking
   └─> Page checks session
       ├─> Has session? YES → Load form
       └─> No session? → Redirect to login

2. User fills form & clicks "Book"
   └─> Client-side validation
       └─> Form data collected

3. POST /api/bookings
   └─> Server-side validation
       ├─> Email/phone format check
       ├─> Seat availability check
       └─> Valid? Proceed

4. Price calculation
   └─> Base price × quantity
       ├─> Add 10% tax
       ├─> Apply discount (if any)
       └─> Calculate total

5. Create booking in database
   └─> INSERT Booking table
       ├─> User ID
       ├─> Ticket ID
       ├─> Passenger info
       ├─> Total price
       └─> Status: PENDING

6. Return booking details to client
   └─> Response with booking ID
       └─> Show confirmation page

7. User proceeds to payment
   └─> Update status: PENDING → CONFIRMED
       └─> Payment integration here
```

### Ticket Search Flow

```
1. User clicks search button on homepage
   └─> Form data collected
       ├─> From/To airports
       ├─> Dates
       └─> Passenger count

2. Redirect to /search?from=CGK&to=JKT...
   └─> URL params parsed

3. GET /api/tickets?from=CGK&to=JKT...
   └─> Query database
       ├─> WHERE from = CGK
       ├─> WHERE to = JKT
       ├─> WHERE date matches
       └─> Optional filters applied

4. Return matching tickets
   └─> Response: []Ticket[]
       ├─> With price info
       ├─> With availability
       └─> Sorted by price

5. Render search results
   └─> Display with TicketCard components
       ├─> Show filters sidebar
       ├─> Show pagination
       └─> Allow sorting

6. User refines search
   └─> Apply filters (price, time, etc)
       └─> Query API again with new params

7. User selects ticket
   └─> Click "Book Now"
       └─> Redirect to /booking with ticket ID
```

## 🔐 Security Architecture

### Password Security
```
1. User submits password on /auth/signup
2. Password sent to POST /api/auth/signup (HTTPS only)
3. Server-side bcryptjs hashing
   └─> Plain text never sent to database
4. Hashed password stored in database
5. On login: Compare submitted hash with stored hash
   └─> Match = Authenticated
```

### Session Security
```
1. NextAuth creates JWT token
2. Token signed with NEXTAUTH_SECRET
   └─> Cannot be forged without secret
3. Stored in httpOnly cookie
   └─> Protected from XSS attacks
4. Cookie not accessible by JavaScript
   └─> Sent automatically with requests
5. Token expires after 30 days
6. Sessions validated on each request
```

### Database Security
```
1. All queries via Prisma ORM
   └─> Prevents SQL injection
2. Parameterized queries always used
3. Sensitive data (passwords) hashed
4. Session tokens uses secure random generation
5. API routes check authentication before DB access
```

### API Security
```
1. All POST endpoints validate input
2. Email/phone format checked
3. Required fields validated
4. Price calculated server-side
   └─> Prevents client-side manipulation
5. Booking code generated server-side
6. Sessions required for sensitive operations
   └─> /api/bookings requires authentication
```

## 📈 Scaling Considerations

### Caching Strategy
```
Implement when traffic grows:
├─> Cache GET /api/tickets responses
│   └─> Revalidate every 5 minutes
├─> Cache search results
├─> Cache user sessions
└─> CDN for static assets (CSS, JS)
```

### Database Optimization
```
Already included:
├─> Indexes on frequently queried fields
│   ├─> departTime
│   ├─> from/to
│   ├─> status
│   └─> paymentStatus
├─> Proper relationships
│   └─> Prevents N+1 queries
└─> Connection pooling via Prisma
```

### Load Balancing
```
Vercel provides:
├─> Automatic load balancing
├─> Auto-scaling on demand
├─> Global edge network
└─> Serverless functions scale independently
```

## 🧪 Testing Architecture

### Unit Tests (Can be added)
```
src/__tests__/
├─> utils/helpers.test.ts
│   ├─> calculateTotalPrice()
│   ├─> generateBookingCode()
│   └─> validateEmail()
├─> lib/
│   └─> auth.test.ts
└─> components/
    └─> navbar.test.tsx
```

### Integration Tests (Can be added)
```
src/__tests__/
└─> api/
    ├─> bookings.test.ts
    ├─> tickets.test.ts
    └─> auth.test.ts
```

### E2E Tests (Can be added)
```
e2e/
├─> search.spec.ts
├─> booking.spec.ts
└─> auth.spec.ts
```

## 📋 Code Quality Standards

### TypeScript
```
✅ Strict mode enabled
✅ No implicit any
✅ All functions have return types
✅ All parameters have types
✅ Proper error handling
```

### Components
```
✅ Functional components (hooks)
✅ Props properly typed
✅ Error boundaries
✅ Loading states
✅ Responsive design
```

### API Routes
```
✅ Input validation
✅ Error responses with proper HTTP status
✅ Authentication checks
✅ try/catch error handling
✅ Proper HTTP methods (POST/GET/PUT)
```

### Database
```
✅ Proper relationships
✅ Indexes on key fields
✅ Soft deletes (if needed)
✅ Timestamps (createdAt, updatedAt)
✅ Data validation in schema
```

---

Last Updated: February 2024
