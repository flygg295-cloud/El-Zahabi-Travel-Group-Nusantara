# 🚀 Getting Started - 5 Minute Quick Start

**Mulai gunakan El-Zahabi Travel Group dalam 5 menit!**

---

## ⚡ Super Quick Start

### 1. Install Dependencies (2 min)
```bash
npm install
```

### 2. Setup Database (1 min)
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local - Add your DATABASE_URL:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/el_zahabi_travel"

# Setup database
npm run db:push
npm run seed
```

### 3. Add Auth Secret (30 sec)
```bash
# Generate secret
openssl rand -base64 32
# Copy output and add to .env.local:
# NEXTAUTH_SECRET="your_secret_here"
```

### 4. Start Server (30 sec)
```bash
npm run dev
```

### 5. Test (30 sec)
Open http://localhost:3000 in browser ✅

---

## ✅ What You Can Do Immediately

1. **Search flights/hotels** - Try the homepage search
2. **Create booking** - Book a flight from search results
3. **Login/Signup** - Try email or Google auth
4. **View bookings** - Check your booking dashboard

---

## 📚 Next Steps

- **30 min setup guide**: [STARTUP_CHECKLIST.md](STARTUP_CHECKLIST.md)
- **Full documentation**: [DOCS_INDEX.md](DOCS_INDEX.md)
- **Having issues?**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **API testing**: [API_TESTING.md](API_TESTING.md)
- **Deploy to production**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎯 Common Commands

```bash
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run db:studio      # Open database GUI
npm run seed           # Populate sample data
npm test               # Run tests
```

Full reference: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

## 🆘 Stuck?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Read relevant guide in [DOCS_INDEX.md](DOCS_INDEX.md)
3. Check [PROJECT_COMPLETION_SUMMARY.md](PROJECT_COMPLETION_SUMMARY.md)

---

**You're ready! Happy coding! 🎉**
