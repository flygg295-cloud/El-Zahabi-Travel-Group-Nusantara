# Quick Command Reference

Daftar cepat semua perintah penting yang digunakan dalam development.

## 🚀 Development

```bash
# Start development server
npm run dev

# Build untuk production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🗄️ Database

```bash
# Generate Prisma Client
npm run db:generate

# Sync schema dengan database
npm run db:push

# Create database migration
npm run db:migrate

# Open Prisma Studio GUI
npm run db:studio

# Seed database dengan sample data
npm run seed
```

## 📦 Dependencies

```bash
# Install dependencies
npm install

# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Uninstall package
npm uninstall package-name
```

## 🔍 Quality Assurance

```bash
# Lint check
npm run lint

# Build check (catches TypeScript errors)
npm run build

# Development environment (all checks)
npm run dev
```

## 🌐 Vercel & Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel status

# View deployment logs
vercel logs

# View all deployments
vercel list
```

## 🔑 Generate Secrets

```bash
# Generate NEXTAUTH_SECRET (macOS/Linux)
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🐙 Git Commands

```bash
# Clone repository
git clone <repo-url>

# Check status
git status

# Add files to staging
git add .

# Commit changes
git commit -m "message"

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Create new branch
git checkout -b feature/branch-name

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name

# View commit history
git log --oneline
```

## 📱 Testing

```bash
# Test homepage
open http://localhost:3000

# Test search
open http://localhost:3000/search?type=flight&from=CGK&to=DPS

# Test API
curl http://localhost:3000/api/tickets

# Test with specific port
npm run dev -- -p 3001
```

## 🧹 Cleanup & Reset

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install

# Reset database (⚠️ WARNING: Deletes all data)
npm run db:push -- --force-reset

# Kill process on port 3000 (macOS/Linux)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📋 Common Development Tasks

### Setup New Environment

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run db:generate
npm run db:push
npm run dev
```

### Make and Commit Changes

```bash
git checkout -b feature/my-feature
npm run dev  # Test changes
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### Deploy Changes

```bash
git push origin main  # Push to main
# Vercel automatically deploys
```

## 🔍 Debugging

```bash
# Enable detailed logging
NODE_ENV=development npm run dev

# Debug specific file
node --inspect-brk src/lib/db/prisma.ts

# Check environment variables
npm exec -- env | grep DATABASE_URL
```

## 💡 Quick Tips

### Find Large Files
```bash
ls -lh src/
du -sh node_modules/
```

### Format Code
```bash
# Using Prettier (if installed)
npx prettier --write src/
```

### Check Dependencies Version
```bash
npm list react
npm list next
npm list prisma
```

### Update Single Dependency
```bash
npm install next@latest
npm install @prisma/client@latest
```

### View Package Info
```bash
npm view next
npm info @prisma/client
```

## 🎯 Frequently Used Combinations

### Start Fresh Development Session
```bash
npm install
npm run db:generate
npm run db:push
npm run seed
npm run dev
```

### Pre-Deployment Checklist
```bash
npm run lint
npm run db:push
npm run build
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Test API Endpoints
```bash
# In one terminal
npm run dev

# In another terminal
curl http://localhost:3000/api/tickets
curl -X POST http://localhost:3000/api/bookings -H "Content-Type: application/json" -d '{}'
```

### Debug Database Issues
```bash
npm run db:studio
# Opens GUI at http://localhost:5555
```

## 🛠️ Setup New Features

### Add New Page
```bash
mkdir -p src/app/feature-name
touch src/app/feature-name/page.tsx
npm run dev
# Visit http://localhost:3000/feature-name
```

### Add New API Route
```bash
mkdir -p src/app/api/endpoint-name
touch src/app/api/endpoint-name/route.ts
npm run dev
# curl http://localhost:3000/api/endpoint-name
```

### Add New Database Model
```bash
# Edit prisma/schema.prisma
npm run db:migrate
# Follow prompts
npm run db:generate
npm run dev
```

## 📚 Reference Files

Key files to remember:
- `.env.local` - Environment variables (DO NOT COMMIT)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript config
- `next.config.js` - Next.js config
- `tailwind.config.ts` - Tailwind config
- `prisma/schema.prisma` - Database schema

## ⚠️ Important Commands to Avoid

```bash
# ❌ DON'T DELETE without backup:
rm -rf .git           # Deletes git history
rm -rf node_modules   # OK if you can reinstall
npm uninstall prisma  # Breaks database tools

# ❌ DON'T RUN in production:
npm run db:push -- --force-reset   # Deletes all data!!!
```

## 🆘 Help Commands

```bash
# Get help for npm
npm help

# Get help for specific command
npm help install

# Check npm version
npm --version

# Check Node.js version
node --version

# Check installed packages
npm list
npm list --all
```

## 📞 Getting Help

- Check project README.md
- Check LOCAL_SETUP.md for setup issues
- Check DEPLOYMENT_GUIDE.md for deployment
- Check API_TESTING.md for API testing
- Check GitHub Issues
- Check Next.js docs: https://nextjs.org/docs
- Check Prisma docs: https://www.prisma.io/docs

---

**Bookmark this page for quick reference! 🔖**

Last Updated: February 2024
