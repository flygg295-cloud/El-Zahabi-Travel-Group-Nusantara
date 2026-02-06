# Environment Variables Documentation

Dokumentasi lengkap tentang semua environment variables yang digunakan dalam aplikasi.

## 📝 Overview

Environment variables disimpan di file `.env.local` (untuk development) atau di Vercel Settings (untuk production).

**⚠️ PENTING:** Jangan pernah commit `.env.local` ke Git!

## 📋 Variable Checklist

### Required Variables (WAJIB)

- [ ] `DATABASE_URL`
- [ ] `NEXTAUTH_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`

### Optional Variables

- [ ] `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`
- [ ] `MIDTRANS_SERVER_KEY`
- [ ] `NODE_ENV`
- [ ] `NEXT_PUBLIC_APP_URL`

## 🔐 Detailed Variables

### Database Configuration

#### `DATABASE_URL`
**Type:** String (required)
**Purpose:** Connection string untuk PostgreSQL database

**Format Examples:**
```
# Local PostgreSQL
postgresql://username:password@localhost:5432/database_name

# Railway
postgresql://username:password@railway.app:5432/database_name

# Supabase
postgresql://postgres:password@db.project.supabase.co:5432/postgres

# Neon
postgresql://username:password@ep-project.us-east-1.aws.neon.tech/dbname
```

**How to Get:**
1. Create PostgreSQL database
2. Copy connection string from provider
3. Paste into `.env.local`

**Example:**
```env
DATABASE_URL="postgresql://travel_user:secure_password@localhost:5432/el_zahabi_travel"
```

**Test Connection:**
```bash
# Using psql (if PostgreSQL client installed)
psql "postgresql://travel_user:secure_password@localhost:5432/el_zahabi_travel"

# Should connect successfully
```

### NextAuth Configuration

#### `NEXTAUTH_URL`
**Type:** String (required)
**Purpose:** URL tempat aplikasi di-host

**For Development:**
```env
NEXTAUTH_URL="http://localhost:3000"
```

**For Production:**
```env
NEXTAUTH_URL="https://your-domain.com"
```

**Important:**
- Harus exact dengan domain Anda
- Harus include protocol (http:// atau https://)
- Jangan ada trailing slash

#### `NEXTAUTH_SECRET`
**Type:** String (required)
**Purpose:** Secret key untuk encrypt JWT tokens

**Generate NEXTAUTH_SECRET:**

Using OpenSSL (macOS/Linux):
```bash
openssl rand -base64 32
```

Using Node.js (Windows/Any):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Example output:
```
aBcD1234eFgH5678iJkL9012mNoPqRsT+UvWxYz0=
```

**Setup:**
```env
NEXTAUTH_SECRET="aBcD1234eFgH5678iJkL9012mNoPqRsT+UvWxYz0="
```

**Important:**
- Harus unique dan secure
- Jangan share dengan orang lain
- Simpan di secure vault (seperti Vercel)
- Change regularly di production

### Google OAuth Configuration

#### `GOOGLE_CLIENT_ID`
**Type:** String (required)
**Purpose:** Google OAuth application ID

**How to Get:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 Web credentials
5. Copy "Client ID" value

**Format:**
```
123456789012-abcdefghijklmnopqrstuvwxyz12345.apps.googleusercontent.com
```

**Setup:**
```env
GOOGLE_CLIENT_ID="123456789012-abcdefghijklmnopqrstuvwxyz12345.apps.googleusercontent.com"
```

#### `GOOGLE_CLIENT_SECRET`
**Type:** String (required)
**Purpose:** Google OAuth application secret

**How to Get:**
1. Same as GOOGLE_CLIENT_ID
2. Copy "Client secret" value from Google Cloud Console

**Format:**
```
GOCSPX-1234567890abcdefghijklmnop
```

**Setup:**
```env
GOOGLE_CLIENT_SECRET="GOCSPX-1234567890abcdefghijklmnop"
```

**Important:** Jangan share secret key!

### Payment Gateway Configuration

#### `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`
**Type:** String (optional)
**Purpose:** Midtrans client key untuk payment gateway

**Prefix:** `NEXT_PUBLIC_` berarti visible di frontend (aman untuk public key)

**How to Get:**
1. Go to [Midtrans Dashboard](https://dashboard.midtrans.com)
2. Login atau register
3. Go to Settings → Access Keys
4. Copy "Client Key"

**Setup:**
```env
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="Mid-client-xxx"
```

#### `MIDTRANS_SERVER_KEY`
**Type:** String (optional)
**Purpose:** Midtrans server key untuk payment processing

**How to Get:**
1. Same as MIDTRANS_CLIENT_KEY
2. Copy "Server Key"

**Setup:**
```env
MIDTRANS_SERVER_KEY="Mid-server-xxx"
```

**Important:**
- Server key JANGAN di-frontend
- Jangan prefix dengan NEXT_PUBLIC_
- Keep secret, stored di backend only

### Application Configuration

#### `NODE_ENV`
**Type:** String (default: production)
**Purpose:** Environment context untuk aplikasi

**Values:**
- `development` - Local development
- `production` - Production deployment
- `test` - Testing environment

**Setup:**
```env
NODE_ENV="development"
```

**Automatically Set By:**
- `npm run dev` → development
- `npm run build` → production
- `npm run test` → test

#### `NEXT_PUBLIC_APP_URL`
**Type:** String (recommended)
**Purpose:** Public URL aplikasi (boleh di-frontend)

**For Development:**
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**For Production:**
```env
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

**Use Case:**
- Share links via email
- Sending invitations
- API redirects

## 🔄 Example `.env.local` Files

### Development (Local)

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/el_zahabi_travel"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="123456789012-abcdefghijklmnopqrstuvwxyz12345.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-1234567890abcdefghijklmnop"

# Payment (optional)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=""
MIDTRANS_SERVER_KEY=""

# App Config
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Production (Vercel)

Same variables, different values:

```env
DATABASE_URL="postgresql://user:pass@railway.app:5432/dbname"
NEXTAUTH_URL="https://my-travel-app.vercel.app"
NEXTAUTH_SECRET="generated-secret-very-long-and-secure"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="Mid-client-xxx"
MIDTRANS_SERVER_KEY="Mid-server-xxx"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://my-travel-app.vercel.app"
```

## ⚠️ Common Issues

### Issue: "DATABASE_URL is not defined"

**Cause:** .env.local missing atau DATABASE_URL tidak di-set

**Solution:**
```bash
# Check if file exists
ls -la .env.local

# If not, create it
cp .env.example .env.local

# Edit file and add DATABASE_URL
echo 'DATABASE_URL="postgresql://..."' >> .env.local
```

### Issue: "NEXTAUTH_SECRET is required"

**Cause:** NEXTAUTH_SECRET tidak di-set atau kosong

**Solution:**
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="generated_value_here"
```

### Issue: Google OAuth not working

**Possible Causes:**
- GOOGLE_CLIENT_ID or SECRET salah
- NEXTAUTH_URL not match dengan Google Console
- Redirect URI tidak di-authorize

**Solution:**
```bash
# 1. Verify variables di .env.local
grep GOOGLE .env.local

# 2. Check Google Cloud Console
# - Go to Credentials
# - Edit OAuth client
# - Add Authorized JavaScript origins:
#   http://localhost:3000 (for dev)
#   https://your-domain.com (for prod)
# - Add Authorized redirect URIs:
#   http://localhost:3000/api/auth/callback/google (for dev)
#   https://your-domain.com/api/auth/callback/google (for prod)
```

### Issue: Database connection timeout

**Possible Causes:**
- DATABASE_URL salah
- Database tidak running
- Firewall blocking connection
- Wrong credentials

**Solution:**
```bash
# Test connection locally
psql "postgresql://user:pass@localhost:5432/dbname"

# If using Railway/Supabase
# - Check dashboard for correct connection string
# - Verify firewall whitelist IP

# Check format
# Should be: postgresql://user:password@host:5432/dbname
```

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Generate unique NEXTAUTH_SECRET for each environment
- ✅ Use strong DATABASE passwords
- ✅ Rotate secrets regularly in production
- ✅ Store secrets in Vercel dashboard (not in code)
- ✅ Use environment variables instead of hardcoded values
- ✅ Keep .env.local in .gitignore

### ❌ DON'T:
- ❌ Commit .env.local dengan secret values
- ❌ Share NEXTAUTH_SECRET atau GOOGLE_CLIENT_SECRET
- ❌ Use same secret untuk dev dan production
- ❌ Log secret values
- ❌ Put secrets in version control
- ❌ Expose private keys di frontend (except NEXT_PUBLIC_)

## 🚀 For Vercel Deployment

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all required variables:
   - DATABASE_URL
   - NEXTAUTH_URL (production domain)
   - NEXTAUTH_SECRET (new, production-specific)
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - And others as needed

5. Deploy kembali setelah add variables

## 🔄 Updating Variables

### Local Development
```bash
# Edit .env.local directly
# Restart npm run dev after changes
```

### Production (Vercel)
```bash
# 1. Go to Vercel Dashboard
# 2. Project → Settings → Environment Variables
# 3. Edit or add variable
# 4. Redeploy project automatically
```

## 📊 Environment Variables by Environment

| Variable | Dev | Staging | Prod | Required |
|----------|-----|---------|------|----------|
| DATABASE_URL | ✅ | ✅ | ✅ | Yes |
| NEXTAUTH_URL | host:3000 | staging.domain | domain | Yes |
| NEXTAUTH_SECRET | dev-secret | staging-secret | prod-secret | Yes |
| GOOGLE_CLIENT_ID | Same | Same | Same | Yes |
| GOOGLE_CLIENT_SECRET | Same | Same | Same | Yes |
| MIDTRANS_CLIENT_KEY | Optional | Optional | Optional | No |
| NODE_ENV | development | production | production | Auto |

---

**Environment Variables Setup Complete! 🎉**

Last Updated: February 2024
