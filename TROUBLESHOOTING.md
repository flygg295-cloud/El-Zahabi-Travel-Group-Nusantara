# Troubleshooting Guide

Panduan untuk mengatasi masalah umum yang mungkin Anda hadapi.

## 🚨 Installation & Setup Issues

### Issue: npm install fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution 1: Use legacy peer deps**
```bash
npm install --legacy-peer-deps
```

**Solution 2: Clear cache and reinstall**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 3: Use different Node version**
```bash
# Check current version
node --version

# Should be >= 18.0.0
# If not, update Node.js from nodejs.org
```

### Issue: Git clone fails

**Error:**
```
fatal: unable to access 'https://github.com/...': SSL: CERTIFICATE_VERIFY_FAILED
```

**Solution:**
```bash
# Disable SSL verification (temporary workaround)
git config --global http.sslVerify false
git clone https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara.git

# Better: Update certificates or use git ssh
```

## 🗄️ Database Issues

### Issue: "DATABASE_URL is not set"

**Symptoms:**
- Error when running `npm run db:push`
- Error when starting development server

**Solution:**
```bash
# Check if .env.local exists
ls -la .env.local

# Check if DATABASE_URL is in file
cat .env.local | grep DATABASE_URL

# If not, add it
echo 'DATABASE_URL="postgresql://..."' >> .env.local

# Verify format
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### Issue: "Cannot connect to database"

**Error:**
```
Error: getaddrinfo ENOTFOUND localhost
```

**Cause:** PostgreSQL not running or database doesn't exist

**Solution:**
```bash
# 1. Check if PostgreSQL is running
# macOS
brew services list | grep postgres

# Windows
# Check Services app → PostgreSQL Server

# Linux
sudo systemctl status postgresql

# 2. If not running, start it
# macOS
brew services start postgresql

# Windows
# Start from Services app

# Linux
sudo systemctl start postgresql

# 3. Verify database exists
psql -U postgres -l | grep el_zahabi

# 4. If database doesn't exist, create it
createdb el_zahabi_travel

# 5. Test connection
psql "postgresql://username:password@localhost:5432/el_zahabi_travel"
```

### Issue: "ERROR: relation does not exist"

**Symptoms:**
- Server starts but crashes when accessing database
- Error mentioning tables don't exist

**Solution:**
```bash
# Sync Prisma schema with database
npm run db:push

# If still failing, check schema
cat prisma/schema.prisma | head -20

# Regenerate Prisma Client
npm run db:generate

# Try again
npm run dev
```

### Issue: Prisma migration fails

**Error:**
```
Migration failed with error: ...
```

**Solution:**
```bash
# View current migrations
ls -la prisma/migrations/

# Reset database and reapply migrations (WARNING: DELETES DATA)
npm run db:push -- --force-reset

# Or manually reset (development only)
dropdb el_zahabi_travel
createdb el_zahabi_travel
npm run db:push
```

## 🔐 Authentication Issues

### Issue: "NEXTAUTH_SECRET is required"

**Symptoms:**
- Error when trying to login
- Session not working

**Solution:**
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="generated_value_here"

# Restart development server
npm run dev
```

### Issue: Google OAuth not working

**Error:**
```
Error: invalid client id for the Request
```

**Checklist:**
```bash
# 1. Verify credentials in .env.local
grep GOOGLE .env.local

# 2. Check Google Cloud Console
# - Project selected correctly
# - OAuth 2.0 client ID created
# - Credentials are current (not revoked)

# 3. Verify callback URIs
# - For dev: http://localhost:3000/api/auth/callback/google
# - For prod: https://your-domain.com/api/auth/callback/google
# - Must match exactly in Google Console

# 4. Check NEXTAUTH_URL
grep NEXTAUTH_URL .env.local
# Should be exactly: http://localhost:3000 (for dev)
```

**Full Setup:**
```bash
# 1. Go to Google Cloud Console
# 2. Create/Select Project
# 3. Enable Google+ API
# 4. Create OAuth 2.0 Client ID (Web application)
# 5. Set Authorized JavaScript origins:
#    - http://localhost:3000 (dev)
#    - https://your-domain.com (prod)
# 6. Set Authorized redirect URIs:
#    - http://localhost:3000/api/auth/callback/google (dev)
#    - https://your-domain.com/api/auth/callback/google (prod)
# 7. Copy Client ID and Secret
# 8. Paste into .env.local
# 9. Restart dev server
```

### Issue: Session expires immediately

**Symptoms:**
- User logged in but not redirected properly
- Session shows null

**Solution:**
```bash
# Check NextAuth configuration
cat src/lib/auth.ts | grep -A 5 "callbacks"

# Verify session strategy
grep "strategy" src/lib/auth.ts
# Should be: strategy: 'jwt'

# Clear browser cookies and restart
# Dev Tools → Application → Cookies
# Delete all next-auth cookies
# Refresh page
```

## 🌐 Development Server Issues

### Issue: Port 3000 already in use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution 1: Use different port**
```bash
npm run dev -- -p 3001
# App runs on http://localhost:3001
```

**Solution 2: Kill process on port 3000**

**macOS/Linux:**
```bash
lsof -i :3000
# Get PID from output
kill -9 <PID>

# Or one command
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :3000
# Get PID from output (last column)
taskkill /PID <PID> /F
```

### Issue: "next: command not found"

**Error:**
```
npm run dev
zsh: command not found: next
```

**Solution:**
```bash
# Install dependencies
npm install

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Issue: Module not found error

**Error:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**
```bash
# Check if file exists
ls -la src/components/filename.tsx

# Check path aliases in tsconfig.json
cat tsconfig.json | grep -A 10 "paths"

# Make sure file name matches exactly (case-sensitive)
# myComponent.tsx ≠ mycomponent.tsx

# Rebuild TypeScript
npm run db:generate

# Restart dev server
npm run dev
```

### Issue: Tailwind CSS not loading

**Symptoms:**
- Styled text appears unstyled
- CSS not applied

**Solution:**
```bash
# Check tailwind config
ls -la tailwind.config.ts

# Verify content paths
grep "content" tailwind.config.ts
# Should include './src/**/*.{js,ts,jsx,tsx,mdx}'

# Rebuild CSS
npm run dev

# If still not working, clear Next.js cache
rm -rf .next
npm run dev
```

## 🔗 API Issues

### Issue: GET /api/tickets returns 500

**Error:**
```
{"error": "Internal Server Error"}
```

**Solution:**
```bash
# Check database connection
npm run db:push

# View server logs
npm run dev
# Look for error message in terminal

# Check API route file exists
ls -la src/app/api/tickets/route.ts

# Test database query
npm run db:studio
# Browse data in GUI
```

### Issue: POST /api/bookings returns 401

**Error:**
```
{"error": "Unauthorized"}
```

**Cause:** User not authenticated

**Solution:**
```bash
# Login first via UI
# Then test API

# Or get session token:
# Dev Tools → Application → Cookies
# Copy next-auth.session-token value

# Use in curl
curl -X POST http://localhost:3000/api/bookings \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"
```

### Issue: API returns CORS error

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
```bash
# Check CORS headers in next.config.js
cat next.config.js | grep -A 10 "headers"

# Verify headers are set correctly
# Should have Access-Control-Allow-* headers

# Restart dev server
npm run dev
```

## 🎨 UI/Frontend Issues

### Issue: Responsive design breaks on mobile

**Solution:**
```bash
# Check tailwind breakpoints
cat tailwind.config.ts

# Test sizes:
# sm: 640px
# md: 768px
# lg: 1024px
# xl: 1280px

# Verify responsive classes are used
grep "md:" src/components/**/*.tsx

# Test in browser
# Dev Tools → Toggle Device Toolbar (Ctrl+Shift+M)
```

### Issue: Image not loading

**Symptoms:**
- Image shows as broken on page

**Solution:**
```bash
# Check image path
# Should be absolute or start with /public/

# For external images, use Next.js Image component
import Image from 'next/image'

<Image 
  src="https://example.com/image.jpg"
  alt="description"
  width={400}
  height={300}
/>

# Check if external domain is allowed
# in next.config.js remotePatterns
```

## 📦 Build Issues

### Issue: "npm run build" fails with TypeScript errors

**Error:**
```
Type error: ...
```

**Solution:**
```bash
# Identify the error
npm run build
# Read the error message carefully

# Fix type errors
# Usually mismatch in TypeScript types

# Check the file mentioned in error
cat src/path/to/file.ts

# Fix the type issue

# Try building again
npm run build

# If still failing, check tsconfig.json
cat tsconfig.json | grep -A 5 "compilerOptions"
```

### Issue: Build succeeds locally but fails on Vercel

**Solution:**
```bash
# Ensure .env.local is set up correctly
# (but NOT committed to git)

# Build locally first
npm run build

# If it passes locally but fails on Vercel:
# - Check environment variables in Vercel dashboard
# - Ensure all REQUIRED env vars are set
# - Verify DATABASE_URL is correct for production

# Trigger rebuild
vercel --prod --force
```

## 💼 Production/Deployment Issues

### Issue: "Application error: a client-side exception has occurred"

**Symptoms:**
- On production (Vercel), app shows error page
- Local dev works fine

**Solution:**
```bash
# Check Vercel logs
vercel logs

# Common causes:
# 1. Missing environment variables
# 2. Database connection failed
# 3. API route error

# Fix and trigger rebuild
git push origin main
# OR
vercel --prod
```

### Issue: Database not accessible from Vercel

**Error:**
```
Error: connect ECONNREFUSED
```

**Cause:** DATABASE_URL not set or incorrect for production

**Solution:**
```bash
# 1. Get production DATABASE_URL
# From your database provider (Railway, Supabase, etc)

# 2. Set in Vercel
# Vercel Dashboard → Project → Settings → Environment Variables
# Set DATABASE_URL to production value

# 3. Redeploy
# Manual: vercel --prod
# Or: Push to main branch for auto-deploy

# 4. Run database migrations on production
# (Usually done automatically)

# 5. Verify
# Test API endpoint
curl https://your-domain.com/api/tickets
```

## 🔍 Checking Status

### Verify Everything is Working

```bash
# 1. Check Node version
node --version
# Should be >= 18.0.0

# 2. Check npm
npm --version
# Should be >= 9.0.0

# 3. Check dependencies installed
npm list | head -20

# 4. Check env variables
grep -E "DATABASE_URL|NEXTAUTH" .env.local

# 5. Check database connection
npm run db:studio
# Should open GUI at localhost:5555

# 6. Start dev server
npm run dev

# 7. Test app
open http://localhost:3000

# 8. Test API
curl http://localhost:3000/api/tickets
```

## 📞 Still Having Issues?

If you're still stuck:

1. **Check logs carefully**
   ```bash
   npm run dev
   # Read terminal output carefully
   ```

2. **Google the error message**
   - Copy exact error text
   - Search on Google/Stack Overflow

3. **Check documentation**
   - README.md - General overview
   - LOCAL_SETUP.md - Setup guide
   - ENV_VARIABLES.md - All variables explained
   - PROJECT_STRUCTURE.md - File structure
   - API_TESTING.md - API testing

4. **Check GitHub**
   - Search existing issues
   - Create new issue with:
     - Error message
     - Steps to reproduce
     - Environment (OS, Node version, etc)

5. **Check official docs**
   - [Next.js docs](https://nextjs.org/docs)
   - [Prisma docs](https://www.prisma.io/docs)
   - [NextAuth docs](https://next-auth.js.org)

---

**Still need help? Create an issue on GitHub! 🆘**

Last Updated: February 2024
