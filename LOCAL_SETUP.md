# Local Development Setup Guide

## 📦 Prerequisites

Pastikan Anda sudah menginstall:

- **Node.js >= 18.0.0** - Download dari https://nodejs.org
- **npm >= 9.0.0** - Biasanya included dengan Node.js
- **PostgreSQL >= 13** - Download dari https://www.postgresql.org

### Verify Installation

```bash
node --version
npm --version
psql --version
```

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

**Windows:**
```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE el_zahabi_travel;
CREATE USER travel_user WITH PASSWORD 'your_secure_password';
ALTER USER travel_user CREATEDB;
```

**macOS/Linux:**
```bash
# Create database
createdb el_zahabi_travel

# Create user (optional)
createuser -P travel_user
```

### 2. Get Connection String

Format: `postgresql://username:password@localhost:5432/database_name`

Example: `postgresql://travel_user:your_secure_password@localhost:5432/el_zahabi_travel`

## 🚀 Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara.git
cd El-Zahabi-Travel-Group-Nusantara
```

### 2. Install Dependencies

```bash
npm install
```

Ini akan menginstall semua packages yang didefinisikan di `package.json`.

### 3. Setup Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local dengan text editor favorit Anda
```

**Konfigurasi minimum untuk development:**

```env
# Required - Database
DATABASE_URL="postgresql://travel_user:your_secure_password@localhost:5432/el_zahabi_travel"

# Required - NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generated_secret_key"

# Optional but recommended - Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Optional - Payment Gateway
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=""
MIDTRANS_SERVER_KEY=""

# App Config
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate NEXTAUTH_SECRET:**

```bash
# Windows
npm exec -- openssl rand -base64 32

# macOS/Linux
openssl rand -base64 32
```

### 4. Setup Database Schema

```bash
# Generate Prisma Client
npm run db:generate

# Create tables in database
npm run db:push

# (Optional) Seed with sample data
npm run seed
```

Jika ada error, cek:
- DATABASE_URL sudah benar di .env.local
- PostgreSQL sudah running
- Database sudah di-create

### 5. Start Development Server

```bash
npm run dev
```

Output akan menunjukkan:
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

  ✓ Ready in 2.3s
```

Buka http://localhost:3000 di browser.

## 🧪 Testing the Application

### Test Homepage
- Buka http://localhost:3000
- Halaman should load dengan hero section dan search bar

### Test Search Functionality

1. Di homepage, isi search form:
   - Dari: "CGK (Jakarta)"
   - Ke: "DPS (Bali)"
   - Tanggal: Tomorrow atau tanggal masa depan
   - Klick "Cari Sekarang"

2. Harus redirect ke `/search` page dengan results

### Test Authentication

**Email/Password:**
1. Klik "Login" di navbar
2. Isi email dan password (bisa random untuk test)
3. Click Submit
4. Akan error karena no user di database (expected)

**Google OAuth:**
1. Klik "Masuk dengan Google"
2. Akan redirect ke Google login
3. Sign in dengan akun Google Anda
4. Should di-redirect ke homepage sebagai logged in user

### Test API Endpoints

**Get Tickets:**
```bash
curl "http://localhost:3000/api/tickets?type=flight"
```

Response harus mengembalikan array of tickets dengan status 200.

**Create Booking** (requires authentication):
```bash
# Login dulu terlebih dahulu via UI untuk get session
curl -X POST "http://localhost:3000/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "ticket_id_from_database",
    "quantity": 1,
    "passengerName": "John Doe",
    "passengerEmail": "john@example.com",
    "passengerPhone": "+628123456789",
    "passengerIdType": "passport",
    "passengerIdNumber": "AB123456"
  }'
```

## 🛠️ Development Tools

### Prisma Studio (Database GUI)

```bash
npm run db:studio
```

Buka http://localhost:5555 untuk GUI database management.

### VS Code Extensions (Recommended)

- **Prettier** - Code formatter
- **ESLint** - Code quality
- **Tailwind CSS IntelliSense** - CSS utilities
- **Thunder Client** - API testing
- **Thunder Client** - REST client untuk test API

### Debug Mode

Set `NODE_ENV=development` di .env.local untuk debug logs.

Di code, gunakan:
```typescript
console.log('Debug:', data);
```

View logs di terminal tempat `npm run dev` running.

## 📁 Important Files

- `.env.local` - Environment variables (JANGAN commit!)
- `src/app/page.tsx` - Homepage
- `src/app/api/` - API routes
- `prisma/schema.prisma` - Database schema
- `src/lib/auth.ts` - Authentication config

## 🔄 Common Development Tasks

### Add New Page

```bash
# Create file: src/app/new-page/page.tsx
touch src/app/new-page/page.tsx
```

Add content:
```typescript
export default function NewPage() {
  return <div>Your content here</div>;
}
```

Visit: http://localhost:3000/new-page

### Add New API Route

```bash
# Create file: src/app/api/new-endpoint/route.ts
mkdir -p src/app/api/new-endpoint
touch src/app/api/new-endpoint/route.ts
```

### Modify Database Schema

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push`
3. Or create migration: `npm run db:migrate`

### Update Dependencies

```bash
npm update
npm audit fix
```

## 🐛 Troubleshooting

### Issue: "DATABASE_URL is not set"
**Solution:**
```bash
# Verify .env.local exists
ls -la .env.local

# Check if DATABASE_URL is in file
grep DATABASE_URL .env.local

# If not, add it manually
```

### Issue: Cannot connect to database
**Solution:**
```bash
# Check PostgreSQL is running
# Windows: Services → PostgreSQL
# macOS: brew services list
# Linux: sudo systemctl status postgresql

# Test connection
psql -U username -d el_zahabi_travel
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000 | kill -9 <PID>
```

### Issue: Dependencies installation error
**Solution:**
```bash
# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Prisma generation error
**Solution:**
```bash
# Regenerate Prisma Client
npm run db:generate

# Reset database (⚠️ will delete all data)
npm run db:push -- --force-reset
```

## 📊 Database Management

### View Data with Prisma Studio

```bash
npm run db:studio
```

### Backup Database

**PostgreSQL:**
```bash
pg_dump el_zahabi_travel > backup.sql
```

### Restore Database

```bash
psql el_zahabi_travel < backup.sql
```

## ✅ Checklist Sebelum Deploy

- [ ] `npm run build` - Build sukses
- [ ] `npm run lint` - No linting errors
- [ ] `npm run dev` - Dev server jalan
- [ ] Semua tests passed
- [ ] API endpoints tested
- [ ] UI tested di browser
- [ ] Mobile responsiveness checked
- [ ] .env.local TIDAK di-commit (check .gitignore)
- [ ] Semua env variables sudah di-.env.local
- [ ] Database seeded dengan data sample (optional)

## 🚀 Next Steps

1. Read [README.md](README.md) untuk project overview
2. Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) untuk deploy instructions
3. Read [CONTRIBUTING.md](CONTRIBUTING.md) jika ingin contribute
4. Check [Prisma docs](https://www.prisma.io/docs) untuk database
5. Check [Next.js docs](https://nextjs.org/docs) untuk framework

## 📞 Getting Help

- Check GitHub Issues
- Post di GitHub Discussions
- Check terminal untuk error messages
- Enable debug logging dengan `NODE_ENV=development`

---

**Happy Development! 💻**

Last Updated: February 2024
