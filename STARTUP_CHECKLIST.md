# 🚀 Startup Checklist

Step-by-step checklist untuk membuat aplikasi jalan dengan sempurna.

## ✅ Pre-Setup Checklist

Sebelum memulai, pastikan Anda memiliki:

- [ ] **Computer Requirements**
  - [ ] OS: macOS, Linux, or Windows (10+)
  - [ ] RAM: Minimum 4GB (8GB+ recommended)
  - [ ] Disk space: Minimum 2GB free
  - [ ] Internet connection

- [ ] **Software Installed**
  - [ ] Node.js v18+ (check: `node --version`)
  - [ ] npm v9+ (check: `npm --version`)
  - [ ] PostgreSQL 12+ (check: `psql --version`)
  - [ ] Git (check: `git --version`)
  - [ ] Code editor (VS Code recommended)

- [ ] **Accounts Created**
  - [ ] GitHub account
  - [ ] Google Cloud Console account (for OAuth)
  - [ ] PostgreSQL admin credentials

---

## 📋 Phase 1: Local Setup (30 minutes)

### Step 1.1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-username/El-Zahabi-Travel-Group-Nusantara.git

# Navigate to project directory
cd El-Zahabi-Travel-Group-Nusantara

# Verify repository structure
ls -la
# Should see: README.md, package.json, prisma/, src/, etc.
```

**✅ Success criteria:**
- [ ] Repository cloned
- [ ] All files present
- [ ] .git folder exists

### Step 1.2: Install Dependencies
```bash
# Install npm dependencies
npm install

# Verify installation
npm list | head -20
# Should show all packages installed

# Check Node version compatibility
node --version
# Should be >= 18.0.0
```

**✅ Success criteria:**
- [ ] node_modules created
- [ ] package-lock.json exists
- [ ] No installation errors

### Step 1.3: Create Environment File

**Option 1: Copy from template**
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Edit .env.local
nano .env.local
# or open in VS Code: code .env.local
```

**Option 2: Create manually**
```bash
# Create new file
touch .env.local

# Add basic variables (to be filled in following steps)
echo 'DATABASE_URL="postgresql://..."' >> .env.local
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env.local
echo 'NEXTAUTH_SECRET="your-secret-here"' >> .env.local
```

**✅ Success criteria:**
- [ ] .env.local file created
- [ ] Database URL placeholder (will fill next)
- [ ] NextAuth variables placeholder

### Step 1.4: Setup PostgreSQL Database

**macOS - Using Homebrew:**
```bash
# Install PostgreSQL if not installed
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Verify running
brew services list | grep postgresql
```

**Linux - Using apt:**
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Verify running
sudo systemctl status postgresql
```

**Windows - Using installer:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer
3. Remember the admin password
4. PostgreSQL runs as Windows Service

**All Platforms - Create Database:**
```bash
# Connect to PostgreSQL as admin
psql -U postgres

# Create database
CREATE DATABASE el_zahabi_travel;

# Create user (optional, more secure)
CREATE USER travel_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE el_zahabi_travel TO travel_user;

# Exit psql
\q
```

**✅ Success criteria:**
- [ ] PostgreSQL running
- [ ] Database created
- [ ] Can connect to database

### Step 1.5: Configure DATABASE_URL

Update `.env.local` with correct DATABASE_URL:

```bash
# For local development with postgres (default user)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/el_zahabi_travel"

# OR for local development with custom user
DATABASE_URL="postgresql://travel_user:your_password@localhost:5432/el_zahabi_travel"

# Test connection
psql "postgresql://postgres:your_password@localhost:5432/el_zahabi_travel"
# Should connect without errors
```

**✅ Success criteria:**
- [ ] DATABASE_URL set correctly
- [ ] Can connect with psql command

### Step 1.6: Setup Prisma

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Verify with Prisma Studio
npm run db:studio
# Should open GUI at localhost:5555
```

**✅ Success criteria:**
- [ ] prisma/schema.prisma exists
- [ ] prisma/client is generated
- [ ] Tables created in database
- [ ] Prisma Studio opens

### Step 1.7: Seed Database with Sample Data

```bash
# Run seed script
npm run seed

# Verify data inserted (in Prisma Studio or psql)
psql "postgresql://postgres:password@localhost:5432/el_zahabi_travel"
SELECT COUNT(*) FROM "User";     -- Should be 0 (no users yet)
SELECT COUNT(*) FROM "Ticket";   -- Should be 6 (3 flights + 3 hotels)
SELECT COUNT(*) FROM "Booking";  -- Should be 0 (no bookings)
\q
```

**✅ Success criteria:**
- [ ] Seed script runs without errors
- [ ] Sample tickets created (6 total)
- [ ] Database now has test data

### Step 1.8: Configure NextAuth Secret

```bash
# Generate secure random secret
openssl rand -base64 32
# Copy output

# Add to .env.local
nano .env.local
# Add line: NEXTAUTH_SECRET="copied_value"
```

**Or on Windows (PowerShell):**
```powershell
# Generate secret
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([guid]::NewGuid().ToString()))
# Copy output

# Add to .env.local
```

**✅ Success criteria:**
- [ ] NEXTAUTH_SECRET set
- [ ] Secret is 32+ characters
- [ ] Secret is random

### Step 1.9: Configure NextAuth URL

```bash
# Edit .env.local
nano .env.local

# Ensure these lines exist:
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-from-step-1.8"
```

**✅ Success criteria:**
- [ ] NEXTAUTH_URL set to http://localhost:3000
- [ ] NEXTAUTH_SECRET is valid
- [ ] No port mismatch

### Step 1.10: Verify .env.local Configuration

```bash
# Check all required variables
grep -E "DATABASE_URL|NEXTAUTH" .env.local

# Should output:
# DATABASE_URL=postgresql://...
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=...
```

**✅ Success criteria:**
- [ ] DATABASE_URL present
- [ ] NEXTAUTH_URL present
- [ ] NEXTAUTH_SECRET present

---

## 🎯 Phase 2: Development Server (5 minutes)

### Step 2.1: Start Development Server

```bash
# Start Next.js dev server
npm run dev

# Expected output:
# ▲ Next.js 14.0.3
# - Local:        http://localhost:3000
# - Environments: .env.local
#
# ✓ Ready in 2.3s
```

**✅ Success criteria:**
- [ ] Server starts without errors
- [ ] No "DATABASE_URL is not set" error
- [ ] No TypeScript errors
- [ ] Server ready at http://localhost:3000

### Step 2.2: Test in Browser

Open http://localhost:3000 in browser:

- [ ] Logo visible ("El-Zahabi Travel")
- [ ] Search bar loads
- [ ] Navigation bar shows
- [ ] Footer displays
- [ ] No console errors (F12 → Console tab)

**If errors appear:**
- Check terminal for error message
- Check console in browser (F12)
- Refer to [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Step 2.3: Test Search

```bash
# Homepage → Search Bar
# From: CGK (Jakarta)
# To: SUB (Surabaya)
# Date: Pick any future date
# Click "Cari Tiket" (Search)

# Expected:
# - Redirected to /search page
# - Results show 2 flights (from seed data)
# - Each ticket shows price, time, airline
# - No errors
```

**✅ Success criteria:**
- [ ] Search redirects to results page
- [ ] Results display 2 flights and 2 hotels
- [ ] Filter sidebar visible
- [ ] No API errors

### Step 2.4: Test Authentication

**Signup:**
```bash
# Click "Daftar" in navbar
# Fill form:
# - Email: test@example.com
# - Password: Test@12345
# - Click "Daftar"

# Expected: Success message or redirect to login
```

**Login:**
```bash
# Click "Masuk" in navbar
# Fill form:
# - Email: test@example.com
# - Password: Test@12345
# - Click "Masuk"

# Expected: Logged in, navbar shows user name
```

**✅ Success criteria:**
- [ ] Can register new user
- [ ] Can login with email/password
- [ ] Session persists on refresh
- [ ] Navbar shows user name when logged in

### Step 2.5: Test Booking

```bash
# From search results, click "Pesan Sekarang"
# Fill form:
# - Quantity: 2
# - Passenger 1: Name, email, phone, ID
# - Passenger 2: Name, email, phone, ID
# - Click "Lanjutkan"

# Expected:
# - Booking created
# - Redirected to /my-bookings
# - New booking visible in list
```

**✅ Success criteria:**
- [ ] Booking form loads
- [ ] Can fill all fields
- [ ] Booking creates successfully
- [ ] Appears in my-bookings page

### Step 2.6: Test My Bookings

```bash
# Click "Pesanan Saya" in navbar
# Should show:
# - All bookings made
# - Status badges
# - Passenger info
# - Price breakdown
```

**✅ Success criteria:**
- [ ] Bookings page loads
- [ ] List shows created bookings
- [ ] Details visible
- [ ] Can see status and pricing

---

## 🔧 Phase 3: API Testing (10 minutes)

### Step 3.1: Get Session Token

```bash
# Open DevTools (F12) → Applications → Cookies
# Find: next-auth.session-token
# Copy the token value
# (If not logged in, login first)
```

### Step 3.2: Test API Endpoints

**Test Search API:**
```bash
curl -X GET \
  'http://localhost:3000/api/tickets?from=CGK&to=SUB' \
  -H 'Content-Type: application/json'

# Expected: JSON array with tickets
```

**Test Bookings API (requires token):**
```bash
curl -X GET \
  'http://localhost:3000/api/bookings' \
  -H 'Cookie: next-auth.session-token=YOUR_TOKEN'

# Expected: JSON array with user's bookings
```

**✅ Success criteria:**
- [ ] Ticket search returns results
- [ ] Booking list returns user's bookings
- [ ] No 401 errors
- [ ] Valid JSON responses

---

## 📦 Phase 4: Production Build (5 minutes)

### Step 4.1: Build Application

```bash
# Create optimized build
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Server compilation complete

# Check build output
ls -la .next/
# Should see: server/, static/, etc folders
```

**✅ Success criteria:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] .next folder created

### Step 4.2: Test Production Build Locally

```bash
# Start production server
npm run start

# Expected:
# ▲ Next.js 14.0.3 (standalone)
# - Local:        http://localhost:3000
# ✓ Ready in 0.3s

# Test in browser: http://localhost:3000
```

**✅ Success criteria:**
- [ ] Production server starts
- [ ] Application functions
- [ ] No runtime errors
- [ ] Faster response times than dev mode

---

## 🌐 Phase 5: Optional - Google OAuth Setup (15 minutes)

### Step 5.1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Project name: "El-Zahabi Travel Group"
4. Click "Create"

### Step 5.2: Enable Google+ API

1. Click "APIs & Services" → "Enable APIs and Services"
2. Search: "Google+ API"
3. Click "Enable"

### Step 5.3: Create OAuth Credentials

1. Click "Create Credentials" → "OAuth client ID"
2. Application type: "Web application"
3. Name: "El-Zahabi Travel"
4. Authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://your-domain.com` (production, later)
5. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google` (later)
6. Click "Create"
7. Copy Client ID and Client Secret

### Step 5.4: Add to .env.local

```bash
# Edit .env.local
nano .env.local

# Add:
GOOGLE_CLIENT_ID="your_client_id"
GOOGLE_CLIENT_SECRET="your_client_secret"
```

### Step 5.5: Test Google Login

```bash
# Don't need to restart dev server if .env.local was updated
# Reload browser: http://localhost:3000

# Click "Login" → "Lanjutkan dengan Google"
# Sign in with Google account
# Expected: Logged in, redirected to home
```

**✅ Success criteria:**
- [ ] OAuth credentials created
- [ ] Credentials added to .env.local
- [ ] Can login with Google
- [ ] User created in database automatically

---

## 📚 Phase 6: Documentation Review (10 minutes)

### Step 6.1: Read Key Documentation

- [ ] [README.md](README.md) - Project overview
- [ ] [DOCS_INDEX.md](DOCS_INDEX.md) - Documentation map
- [ ] [LOCAL_SETUP.md](LOCAL_SETUP.md) - Setup reference
- [ ] [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Common commands

### Step 6.2: Understand Project Structure

```bash
# Review structure
cat PROJECT_STRUCTURE.md

# Key folders:
# - src/app         → Pages and routes
# - src/components  → React components
# - src/lib         → Utilities and helpers
# - prisma/         → Database schema
```

### Step 6.3: Learn Architecture

- [ ] Read [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Understand data flow
- [ ] Know security approach
- [ ] Familiarize with API design

---

## ✨ Phase 7: Next Steps (Optional)

### After successful setup:

1. **Development**
   - [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md)
   - [ ] Understand code standards
   - [ ] Make first code change

2. **Testing**
   - [ ] Read [TESTING.md](TESTING.md)
   - [ ] Write unit tests
   - [ ] Run test suite

3. **Deployment**
   - [ ] Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - [ ] Setup Vercel account
   - [ ] Deploy to production

4. **Payment Integration**
   - [ ] Setup Stripe account
   - [ ] Setup Midtrans account
   - [ ] Implement payment flow

5. **Email Notifications**
   - [ ] Setup SendGrid/Nodemailer
   - [ ] Create email templates
   - [ ] Integrate with bookings

---

## 🎯 Success Checklist

After completing all phases, you should have:

### ✅ Development Environment
- [ ] Node.js v18+
- [ ] PostgreSQL running
- [ ] npm dependencies installed
- [ ] Database created and migrated
- [ ] .env.local configured
- [ ] Dev server running

### ✅ Functional Application
- [ ] Homepage loads
- [ ] Search works (finds flights/hotels)
- [ ] Booking form functional
- [ ] Authentication working
- [ ] Dashboard shows bookings
- [ ] No console errors

### ✅ API Endpoints
- [ ] GET /api/tickets works
- [ ] GET /api/bookings works (requires auth)
- [ ] POST /api/bookings works
- [ ] All endpoints return correct status

### ✅ Documentation
- [ ] All docs read and understood
- [ ] Architecture clear
- [ ] API endpoints documented
- [ ] Troubleshooting reference saved
- [ ] Quick reference available

### ✅ Code Quality
- [ ] TypeScript strict mode
- [ ] No console errors
- [ ] No format issues
- [ ] Responsive design verified
- [ ] Mobile friendly

---

## 🆘 Troubleshooting Quick Links

If you encounter issues:

1. **Installation issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#installation--setup-issues)
2. **Database issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-database-issues)
3. **Authentication issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-authentication-issues)
4. **Server issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-development-server-issues)
5. **API issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-api-issues)
6. **UI issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-uifrontend-issues)

---

## 📞 Getting Help

1. **Check Documentation**
   - [DOCS_INDEX.md](DOCS_INDEX.md) - Find relevant guide
   - [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Check common issues

2. **Check GitHub**
   - Search existing issues
   - Check discussions

3. **Create GitHub Issue**
   - Title: Clear, concise
   - Description: Error message + steps to reproduce
   - OS/Environment: Node version, OS, etc
   - Logs: Terminal output

---

## 🎉 You're Ready!

**Congratulations!** You now have a fully functional travel booking application ready for:

- ✅ **Development** - Make changes and improvements
- ✅ **Testing** - Test features and functionality
- ✅ **Learning** - Study modern web development
- ✅ **Deployment** - Deploy to production when ready

**Next actions:**
1. Make your first feature change
2. Write tests for your code
3. Deploy to Vercel
4. Show it to friends!

---

**Happy coding! 🚀**

Last Updated: February 2024
