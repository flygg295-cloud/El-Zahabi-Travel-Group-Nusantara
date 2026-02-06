# Project Structure Summary

Dokumentasi lengkap struktur folder dan file yang ada di project ini.

## 📂 Root Level Files

| File | Purpose |
|------|---------|
| `.env.example` | Template environment variables |
| `.env.local` | Local environment variables (di-ignore git) |
| `.editorconfig` | Editor configuration untuk consistency |
| `.eslintrc.json` | ESLint configuration |
| `.gitignore` | Git ignore rules |
| `package.json` | Dependencies dan scripts |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |
| `vercel.json` | Vercel deployment configuration |
| `README.md` | Project documentation |
| `DEPLOYMENT_GUIDE.md` | Deployment instructions |
| `CONTRIBUTING.md` | Contributing guidelines |
| `LOCAL_SETUP.md` | Local development setup |
| `API_TESTING.md` | API testing guide |

## 📁 Folder Structure

### `/src` - Source Code

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (wraps all pages)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── middleware.ts             # NextAuth middleware (protected routes)
│   │
│   ├── api/                      # API routes (backend)
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │   │   └── signup/route.ts         # Create new user
│   │   ├── bookings/route.ts           # Book CRUD operations
│   │   └── tickets/route.ts            # Ticket list & search
│   │
│   ├── auth/                     # Authentication pages
│   │   ├── signin/page.tsx       # Login page
│   │   ├── signup/page.tsx       # Register page
│   │   └── error/page.tsx        # Auth error page
│   │
│   ├── search/page.tsx           # Search results page
│   ├── booking/page.tsx          # Booking form page
│   └── my-bookings/page.tsx      # User bookings dashboard
│
├── components/                   # Reusable React components
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer
│   └── search/                   # Search-related components
│       ├── search-bar.tsx        # Main search form
│       ├── ticket-card.tsx       # Ticket product card
│       └── search-filters.tsx    # Filter sidebar
│
└── lib/                          # Utilities & libraries
    ├── db/
    │   └── prisma.ts             # Prisma client singleton
    ├── auth.ts                   # NextAuth configuration
    └── utils/
        ├── helpers.ts            # Utility functions
        └── payment.ts            # Payment gateway integrations
```

### `/prisma` - Database

```
prisma/
├── schema.prisma                 # Database schema (Prisma)
└── seed.ts                       # Seed data for development
```

### `/public` - Static Assets

```
public/
├── favicon.ico                   # Website favicon
└── (other static files)          # Images, fonts, etc
```

### `/node_modules` - Dependencies (Generated)

Auto-generated folder, di-ignore git.

## 🗂️ Detailed File Descriptions

### Core Application Files

#### `src/app/page.tsx`
**Homepage dengan hero section dan search bar**
- Search form untuk flights dan hotels
- Feature highlights section
- Call-to-action buttons

#### `src/app/layout.tsx`
**Root layout yang wrap semua pages**
- SessionProvider untuk NextAuth
- Global metadata
- HTML setup

#### `src/app/globals.css`
**Global styles dan Tailwind directives**
- Tailwind imports
- Custom CSS classes
- Reusable button/input styles

### API Routes

#### `src/app/api/bookings/route.ts`
**Booking management endpoints**

Methods:
- `GET` - Get user's bookings
- `POST` - Create new booking
- `PUT` - Update booking (cancel, confirm, etc)

Features:
- Input validation
- Seat availability check
- Auto price calculation
- Transaction logging

#### `src/app/api/tickets/route.ts`
**Ticket search and listing endpoints**

Methods:
- `GET` - List tickets with filters
- `POST` - Create new ticket (admin)

Query Params:
- `type` - flight or hotel
- `from` - departure city
- `to` - destination city
- `minPrice` / `maxPrice` - price range
- `startDate` / `endDate` - date range

#### `src/app/api/auth/[...nextauth]/route.ts`
**NextAuth authentication handler**
- Email/password login
- Google OAuth
- Session management

#### `src/app/api/auth/signup/route.ts`
**User registration endpoint**
- Email validation
- Password requirements
- Duplicate user check

### Pages

#### `src/app/search/page.tsx`
**Search results page**
- Dynamic ticket listing
- Filter sidebar
- Sorting options
- Pagination

#### `src/app/booking/page.tsx`
**Booking form page**
- Passenger information form
- Ticket details display
- Price breakdown
- Payment button

#### `src/app/auth/signin/page.tsx`
**Login page**
- Email/password form
- Google OAuth button
- Sign up link
- Error handling

#### `src/app/auth/signup/page.tsx`
**Registration page**
- User registration form
- Password confirmation
- Validation feedback

#### `src/app/my-bookings/page.tsx`
**User bookings dashboard**
- Booking history
- Status display
- Actions (view detail, pay, cancel)
- Empty state

### Components

#### `src/components/navbar.tsx`
**Navigation bar (header)**
- Logo and branding
- Search button
- User menu (login/profile/logout)
- Responsive mobile menu

#### `src/components/footer.tsx`
**Footer section**
- Quick links
- Social media
- Copyright
- Company info

#### `src/components/search/search-bar.tsx`
**Main search form**
- Flight/Hotel toggle
- From/To input
- Date range picker
- Passenger/Guest counter
- Submit handler

#### `src/components/search/ticket-card.tsx`
**Ticket product card component**
- Flight/Hotel details
- Price display
- Rating display
- Book button

#### `src/components/search/search-filters.tsx`
**Filter sidebar**
- Price range filter
- Rating filter
- Direct flight filter
- Apply/Reset buttons

### Library Utilities

#### `src/lib/auth.ts`
**NextAuth configuration**
- Provider setup (Google, Credentials)
- Callbacks (signIn, jwt, session)
- JWT configuration
- Session strategy

#### `src/lib/db/prisma.ts`
**Prisma client singleton**
- Prevent multiple PrismaClient instances
- Development logging
- Connection management

#### `src/lib/utils/helpers.ts`
**General utility functions**
- `ApiError` class
- `validateEmail()` - Email format validation
- `validatePhone()` - Phone format validation
- `calculateTotalPrice()` - Price calculation with tax/discount
- `generateBookingCode()` - Generate unique booking codes

#### `src/lib/utils/payment.ts`
**Payment gateway integrations**
- Stripe integration
- Midtrans integration
- Payment intent creation
- Payment verification

### Database

#### `prisma/schema.prisma`
**Database schema definition**

Models:
- **User** - User accounts
- **Account** - OAuth accounts
- **Session** - NextAuth sessions
- **VerificationToken** - Email verification
- **Ticket** - Flights and hotels
- **Booking** - User bookings

Features:
- Relations between models
- Indexes for performance
- Field validations
- Timestamps (createdAt, updatedAt)

#### `prisma/seed.ts`
**Database seeding script**
- Sample flights (3 tickets)
- Sample hotels (3 tickets)
- Run dengan `npm run seed`

## 🔄 Data Flow

### Search Flow
```
1. User fills search form
2. SearchBar component submits
3. Redirects to /search?params
4. Search page calls GET /api/tickets
5. Results displayed with TicketCard components
```

### Booking Flow
```
1. User clicks "Book" on ticket
2. Opens /booking?ticketId=xxx
3. User fills booking form
4. POST /api/bookings
5. Booking created in database
6. Redirects to /my-bookings
```

### Authentication Flow
```
1. User clicks Login/Register
2. Opens /auth/signin or /auth/signup
3. Submits form to NextAuth
4. NextAuth validates and creates session
5. Redirects to homepage (logged in)
6. Session available via useSession() hook
```

## 📊 Database Relations

```
User
├── has many Bookings
├── has many Accounts (OAuth)
└── has many Sessions

Booking
├── belongs to User
└── belongs to Ticket

Ticket
└── has many Bookings

Account
└── belongs to User

Session
└── belongs to User
```

## 🎯 Key Features by File

| Feature | File |
|---------|------|
| Homepage | `src/app/page.tsx` |
| Search | `src/app/search/page.tsx` + `/api/tickets` |
| Booking | `src/app/booking/page.tsx` + `/api/bookings` |
| Auth | `src/app/auth/signin` + `signup` + `/api/auth` |
| Database | `prisma/schema.prisma` |
| Styling | `src/app/globals.css` |
| Navigation | `src/components/navbar.tsx` |
| Utilities | `src/lib/utils/` |

## 🚀 How to Add New Features

### Add New Page
```bash
# Create directory
mkdir -p src/app/new-feature

# Create page file
touch src/app/new-feature/page.tsx
```

### Add New API Route
```bash
# Create directory
mkdir -p src/app/api/new-endpoint

# Create route file
touch src/app/api/new-endpoint/route.ts
```

### Add New Component
```bash
# Create component file
touch src/components/new-component.tsx
```

### Add New Database Model
1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Generate client: `npm run db:generate`

### Add New Utility Function
1. Add function to `src/lib/utils/helpers.ts`
2. Export from file
3. Import in components/pages where needed

---

**Project Structure Documentation Complete! 📚**
