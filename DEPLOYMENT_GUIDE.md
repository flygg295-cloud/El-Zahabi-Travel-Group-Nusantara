# DEPLOYMENT GUIDE - El-Zahabi Travel Platform

## 📋 Pre-Deployment Checklist

Sebelum melakukan deployment, pastikan Anda sudah menyelesaikan checklist berikut:

### Code & Project Setup
- [ ] Semua file sudah dibuat dan struktur folder sesuai
- [ ] npm install sudah dijalankan
- [ ] .env.local sudah di-setup dengan semua variables
- [ ] Database schema sudah di-create dengan `npm run db:push`
- [ ] npm run dev sudah ditest dan berjalan tanpa error
- [ ] npm run build berhasil tanpa error

### Database Setup
- [ ] PostgreSQL database sudah dibuat
- [ ] DATABASE_URL sudah di-konfigurasi
- [ ] Semua tables sudah dibuat (via Prisma migrations)
- [ ] Database sudah di-seed dengan `npm run seed` (optional)

### Authentication Setup
- [ ] Google OAuth credentials sudah digenerate di Google Cloud Console
- [ ] GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET sudah di-copy
- [ ] NEXTAUTH_SECRET sudah di-generate dengan openssl
- [ ] NextAuth configuration sudah di-setup di src/lib/auth.ts

### Testing
- [ ] Semua halaman bisa diakses (/, /search, /booking, /my-bookings)
- [ ] Login dengan email/password sudah bisa
- [ ] Login dengan Google sudah bisa
- [ ] API routes sudah tested (/api/tickets, /api/bookings)
- [ ] Mobile responsiveness sudah dicek

## 🚀 Deployment Steps

### Option 1: Deploy ke Vercel (RECOMMENDED)

#### Step 1: Persiapkan GitHub Repository

```bash
# Initialize git (jika belum)
git init

# Add remote origin (ganti dengan URL repo Anda)
git remote add origin https://github.com/username/El-Zahabi-Travel-Group-Nusantara.git

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: El-Zahabi Travel Platform v1.0"

# Push ke GitHub
git branch -M main
git push -u origin main
```

#### Step 2: Siapkan PostgreSQL Database

Pilih salah satu:

**Railway (Recommended)**
1. Kunjungi https://railway.app
2. Login dengan GitHub
3. New Project → Database → PostgreSQL
4. Copy DATABASE_URL dari project settings

**Supabase**
1. Kunjungi https://supabase.com
2. Buat project baru
3. Di Project Settings → Database → Connection String
4. Copy connection string untuk Node.js

**Neon**
1. Kunjungi https://neon.tech
2. Buat project dan database
3. Copy connection string

#### Step 3: Deploy di Vercel

1. Buka https://vercel.com
2. Klik "New Project"
3. Import GitHub repository
4. Di "Configure Project":
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)
5. Di "Environment Variables", tambahkan:

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generated-secret-key
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=optional
MIDTRANS_SERVER_KEY=optional
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

6. Klik "Deploy"
7. Tunggu hingga deployment selesai (5-10 menit)

#### Step 4: Post-Deployment Setup

```bash
# Jika ada prisma migrations yang pending
vercel env pull           # Pull environment variables
npm run db:push          # Sync schema dengan production DB
npm run db:migrate       # Run migrations jika ada
```

#### Step 5: Verifikasi Deployment

1. Akses aplikasi di URL Vercel yang diberikan
2. Test login functionality
3. Test search dan booking flow
4. Check browser console untuk errors
5. Test di mobile device

### Option 2: Deploy ke Platform Lain

#### Railway
```bash
mkdir .railway
cat > .railway/vars > .env.production
# Add all env variables

railway up
```

#### Render
1. Connect GitHub repository
2. Create Web Service
3. Set environment variables
4. Deploy

#### Digital Ocean / AWS
- Gunakan dokumen mereka untuk deployment Next.js
- Setup PostgreSQL managed database
- Deploy sebagai Docker container atau manual

## 🔐 Production Security Checklist

- [ ] NEXTAUTH_SECRET tidak di-hardcode (gunakan env var)
- [ ] DATABASE_URL tidak di-share di public
- [ ] GOOGLE_CLIENT_SECRET tidak di-commit ke git
- [ ] API keys untuk payment gateway sudah encrypted
- [ ] HTTPS enabled (Vercel auto-enabled)
- [ ] CORS configured properly
- [ ] Rate limiting implemented (jika ada API public)
- [ ] Input validation di semua endpoints
- [ ] SQL injection prevention (via Prisma)

## 📊 Monitoring & Logs

### Vercel Dashboard
- Buka https://vercel.com/dashboard
- Select project Anda
- Tab "Logs" untuk melihat server logs
- Tab "Deployments" untuk history

### Database Monitoring
- Railway: Dashboard → Monitoring
- Supabase: Database → Statistics
- Neon: Monitor tab

### Error Tracking (Optional)
Install Sentry untuk error tracking:
```bash
npm install @sentry/nextjs
```

## 🔄 Continuous Deployment

Vercel automatically deploys ketika Anda push ke `main` branch:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel automatically builds and deploys
# Check status di Vercel Dashboard
```

## ⚠️ Common Issues & Solutions

### Issue: `DATABASE_URL` not found
**Solution:** 
- Verifikasi DATABASE_URL sudah di-set di Vercel Environment Variables
- Tunggu deployment ulang setelah set variable

### Issue: Google OAuth not working
**Solution:**
- Verifikasi NEXTAUTH_URL sama dengan domain production
- Check OAuth redirect URIs di Google Cloud Console
- Pastikan GOOGLE_CLIENT_ID dan SECRET sudah di-copy dengan benar

### Issue: Build failed di Vercel
**Solution:**
```bash
# Test build locally
npm run build

# Also check npm run lint
npm run lint

# If passes locally, force rebuild di Vercel Dashboard
```

### Issue: Database connection timeout
**Solution:**
- Check DATABASE_URL format
- Verify database firewall settings (jika perlu whitelist IP)
- For Railway: Check if connection pooler is enabled
- For Supabase: Increase pool size di project settings

### Issue: NextAuth session not working
**Solution:**
- Verify NEXTAUTH_SECRET sudah di-set
- Verify NEXTAUTH_URL match dengan domain
- Clear browser cookies dan restart

## 📈 Performance Optimization

Setelah deployment:

1. **Enable Caching**
   - Vercel automatic caching untuk static pages
   - API caching di route.ts files

2. **Database Optimization**
   - Create indexes untuk frequent queries (sudah ada di schema)
   - Monitor query performance

3. **Image Optimization**
   - Gunakan Next.js Image component
   - Optimize images sebelum upload

4. **Monitor Web Vitals**
   - Check Vercel Analytics
   - Use Google PageSpeed Insights

## 🛠️ Maintenance

### Regular Tasks
- [ ] Check server logs weekly
- [ ] Monitor database storage
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Backup database regularly

### Update Dependencies
```bash
npm update
npm audit fix
npm run build
git push
```

## 📞 Support & Troubleshooting

- Vercel Docs: https://vercel.com/docs
- NextAuth Docs: https://next-auth.js.org
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

---

## ✅ Deployment Success Indicators

Deployment berhasil jika:

✅ URL aplikasi dapat diakses
✅ Homepage load tanpa error
✅ Search functionality working
✅ Login/Register working
✅ Booking flow bisa diselesaikan
✅ User dashboard accessible (setelah login)
✅ No console errors di browser
✅ Mobile responsive
✅ All API endpoints respond correctly

---

**Happy Deploying! 🚀**

Last Updated: February 2024
