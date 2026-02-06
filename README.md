# El-Zahabi Travel - Platform Booking Perjalanan Modern

Aplikasi web travel modern mirip Traveloka/Tiket.com yang dibangun dengan **Next.js 14**, **TypeScript**, **Tailwind CSS**, dan **PostgreSQL + Prisma** untuk pengalaman pengguna yang optimal dan performa tinggi.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?style=flat-square&logo=prisma)

## 🎯 Fitur Utama

- ✈️ **Pencarian Penerbangan** - Cari dan filter penerbangan dengan mudah
- 🏨 **Pencarian Hotel** - Temukan hotel terbaik sesuai kebutuhan  
- 👤 **Sistem Autentikasi** - Login dengan Email/Password atau Google OAuth
- 📱 **Responsive Design** - Dioptimalkan untuk semua ukuran perangkat
- 💳 **Sistem Booking** - Proses booking yang simpel dan aman
- 📊 **Dashboard Pengguna** - Kelola pemesanan Anda dengan mudah
- 🔐 **Security First** - TypeScript + Validasi input ketat
- ♿ **Accessibility** - Dibangun dengan standar aksesibilitas web

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** atau **yarn**
- **PostgreSQL** >= 13
- Akun **Google Cloud** untuk OAuth (optional)
- Akun **Vercel** untuk deployment (optional)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara.git
cd El-Zahabi-Travel-Group-Nusantara
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` berdasarkan `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local` dengan konfigurasi Anda:

```env
# Database PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/el_zahabi_travel"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (dari Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payment Gateway (Opsional)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_SERVER_KEY="your-midtrans-server-key"

# App Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Untuk menghasilkan NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Jalankan seed untuk data sample (OPSIONAL)
npm run seed
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka http://localhost:3000 di browser Anda.

## 📁 Struktur Folder Proyek

```
El-Zahabi-Travel-Group-Nusantara/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout wrapper
│   │   ├── page.tsx                      # Homepage dengan hero section
│   │   ├── globals.css                   # Global styles & Tailwind
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts          # NextAuth handler
│   │   │   │   └── signup/
│   │   │   │       └── route.ts          # Signup API endpoint
│   │   │   ├── bookings/
│   │   │   │   └── route.ts              # Booking CRUD operations
│   │   │   └── tickets/
│   │   │       └── route.ts              # Ticket search & listing
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.tsx              # Login page
│   │   │   ├── signup/
│   │   │   │   └── page.tsx              # Register page
│   │   │   └── error/
│   │   │       └── page.tsx              # Auth error page
│   │   ├── search/
│   │   │   └── page.tsx                  # Search results page
│   │   ├── booking/
│   │   │   └── page.tsx                  # Booking form page
│   │   └── my-bookings/
│   │       └── page.tsx                  # User's bookings dashboard
│   ├── components/
│   │   ├── navbar.tsx                    # Navigation bar (with auth)
│   │   ├── footer.tsx                    # Footer component
│   │   └── search/
│   │       ├── search-bar.tsx             # Main search form
│   │       ├── ticket-card.tsx            # Ticket product card
│   │       └── search-filters.tsx         # Filter sidebar
│   └── lib/
│       ├── db/
│       │   └── prisma.ts                 # Prisma client singleton
│       ├── auth.ts                       # NextAuth config & callbacks
│       └── utils/
│           ├── helpers.ts                # Utility functions
│           └── payment.ts                # Payment gateway integration
├── prisma/
│   ├── schema.prisma                     # Database schema (Prisma)
│   └── seed.ts                           # Database seeding script
├── public/                               # Static assets
├── .env.example                          # Environment variables template
├── .gitignore                            # Git ignore rules
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # TypeScript configuration
├── tailwind.config.ts                    # Tailwind CSS configuration
├── next.config.js                        # Next.js configuration
├── postcss.config.js                     # PostCSS configuration
├── .eslintrc.json                        # ESLint configuration
├── vercel.json                           # Vercel deployment config
└── README.md                             # Documentation
```

## 🗄️ Database Schema (Prisma)

### **User**
- Autentikasi lokal dan OAuth (Google)
- Profil pengguna lengkap
- Relasi dengan bookings

### **Ticket**
- Informasi penerbangan (airline, routes, times)
- Informasi hotel (hotel name, room types)
- Harga dan ketersediaan tempat
- Rating dan reviews

### **Booking**
- Data pemesanan lengkap
- Informasi penumpang/tamu
- Status pembayaran (PENDING, COMPLETED, FAILED, REFUNDED)
- Status booking (PENDING, CONFIRMED, CANCELLED, COMPLETED)

[Lihat schema.prisma untuk detail lengkap](prisma/schema.prisma)

## 🔑 Environment Variables untuk Vercel

Ketika melakukan deployment ke Vercel, tambahkan environment variables berikut:

| Variable | Deskripsi | Required | Contoh |
|----------|-----------|----------|--------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ | `postgresql://user:pass@host/db` |
| `NEXTAUTH_URL` | URL aplikasi (vercel domain) | ✅ | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Secret untuk JWT (generate dengan openssl) | ✅ | `abc123...` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ✅ | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ✅ | `GOCSPX-xxx` |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Midtrans client key | ❌ | `Mid-client-xxx` |
| `MIDTRANS_SERVER_KEY` | Midtrans server key | ❌ | `Mid-server-xxx` |
| `NEXT_PUBLIC_APP_URL` | Public app URL | ✅ | `https://your-app.vercel.app` |

## 🚀 Deploy ke Vercel

### Langkah 1: Push ke GitHub

```bash
git add .
git commit -m "Initial commit: El-Zahabi Travel Platform"
git push origin main
```

### Langkah 2: Buat Database PostgreSQL

Pilih salah satu layanan:
- 🐘 [Railway](https://railway.app) - Recommended
- 🔵 [Supabase](https://supabase.com)
- 💜 [Neon](https://neon.tech)
- 🟢 [Vercel Postgres](https://vercel.com/docs/storage/postgres)

Dapatkan `DATABASE_URL` dari layanan yang Anda pilih.

### Langkah 3: Deploy di Vercel

**Opsi A: Via Vercel Dashboard (Recommended)**
1. Kunjungi [Vercel Dashboard](https://vercel.com)
2. Klik "New Project"
3. Import repository GitHub Anda
4. Di **Environment Variables**, tambahkan semua variables yang diperlukan (lihat tabel di atas)
5. Klik "Deploy"

**Opsi B: Via Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

### Langkah 4: Verifikasi Deployment

```bash
# Check status deployment
vercel status

# View logs
vercel logs

# Open production
vercel --prod
```

## 🔐 Setup Google OAuth

Untuk menggunakan Google Login, ikuti langkah ini:

### 1. Buat Google Cloud Project

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru
3. Enable "Google+ API" di "APIs & Services"

### 2. Buat OAuth 2.0 Credentials

1. Go to "Credentials"
2. Create "OAuth client ID" untuk "Web application"
3. Di **Authorized JavaScript origins**, tambahkan:
   - `http://localhost:3000` (untuk development)
   - `https://your-domain.com` (untuk production)

4. Di **Authorized redirect URIs**, tambahkan:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`

### 3. Copy Credentials

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

## 💳 Payment Gateway Integration

### Opsi 1: Midtrans (Recommended untuk Indonesia)

1. Daftar di [Midtrans Dashboard](https://dashboard.midtrans.com)
2. Dapatkan **Client Key** dan **Server Key** dari sandbox/production
3. Setup environment variables
4. Lihat implementasi di `/src/lib/utils/payment.ts`

### Opsi 2: Stripe

1. Daftar di [Stripe Dashboard](https://dashboard.stripe.com)
2. Dapatkan publishable dan secret keys
3. Install Stripe: `npm install stripe @stripe/react-stripe-js @stripe/stripe-js`
4. Implementasi di API routes

*Dokumentasi lengkap akan ditambahkan di fase development selanjutnya.*

## 📱 API Documentation

### Authentication Endpoints

```
POST /api/auth/signin
POST /api/auth/signup
GET  /api/auth/session
```

### Ticket Endpoints

```
GET  /api/tickets?type=flight&from=CGK&to=DPS&startDate=2024-02-15
POST /api/tickets (create new ticket - admin only)
```

Query Parameters:
- `type` - 'flight' atau 'hotel'
- `from` - Departure city/airport
- `to` - Destination city
- `startDate` - ISO date format
- `endDate` - ISO date format
- `minPrice` - Minimum price
- `maxPrice` - Maximum price

### Booking Endpoints

```
GET  /api/bookings (get user bookings)
POST /api/bookings (create booking)
PUT  /api/bookings (update booking status)
```

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Production
npm run build            # Build untuk production
npm start                # Start production server

# Database
npm run db:push          # Sync Prisma schema dengan database
npm run db:migrate       # Create database migration
npm run db:generate      # Generate Prisma Client
npm run db:studio        # Open Prisma Studio (GUI)
npm run seed             # Run database seeding

# Code Quality
npm run lint             # Run ESLint
npm run build            # Build check
```

## 🔐 Security Features

- ✅ **TypeScript** - Type safety di seluruh aplikasi
- ✅ **Input Validation** - Validate semua input dari client
- ✅ **CSRF Protection** - Via NextAuth middleware
- ✅ **Password Hashing** - Setup bcrypt untuk production
- ✅ **SQL Injection Protection** - Via Prisma ORM
- ✅ **XSS Protection** - React built-in escaping
- ✅ **Environment Variables** - Secrets tidak di-hardcode
- ✅ **JWT Token** - Secure session management

## 📝 Development Checklist

Sebelum production deployment:

- [ ] Test semua fitur di browser
- [ ] Setup Google OAuth credentials
- [ ] Setup database PostgreSQL
- [ ] Generate NEXTAUTH_SECRET dengan openssl
- [ ] Test payment gateway integration
- [ ] Setup email notifications (optional)
- [ ] Configure custom domain
- [ ] Setup monitoring/logging
- [ ] Enable HTTPS
- [ ] Test mobile responsiveness
- [ ] Performance testing
- [ ] Security audit

## 🧪 Testing & Linting

```bash
# Run ESLint
npm run lint

# Build check (catch TS errors)
npm run build

# Development with hot reload
npm run dev
```

## 📊 Performance Optimization

- ⚡ **Next.js App Router** - Latest and fastest routing
- 🖼️ **Image Optimization** - Next.js Image component
- 📦 **Code Splitting** - Automatic by Next.js
- 💾 **Database Indexing** - Optimized indices on common queries
- 🔄 **Caching** - ISR and API caching strategies

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - Silakan gunakan untuk proyek Anda. Lihat [LICENSE](LICENSE) untuk detail.

## 📧 Support & Contact

Untuk pertanyaan atau masalah:
- 📧 Email: support@elzahabi.com
- 🐛 Issues: [GitHub Issues](https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara/discussions)

## 📚 Learning Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

## 🎯 Roadmap

- [ ] Payment gateway integration (Midtrans/Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Advanced search filters
- [ ] Reviews & ratings system
- [ ] Wishlist feature
- [ ] Promo codes
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Mobile app (React Native)

## 👥 Team

Dibuat dengan ❤️ oleh **El-Zahabi Travel Group**

---

## 🚀 Quick Deployment Checklist

```bash
✅ Clone repository
✅ npm install
✅ Setup .env.local
✅ npm run db:generate
✅ npm run db:push
✅ npm run dev (test locally)
✅ Setup GitHub repository
✅ Setup Vercel account
✅ Add environment variables
✅ Deploy to Vercel
✅ Test production URL
```

**Happy Coding! ✈️🏨**

Last updated: February 2024
