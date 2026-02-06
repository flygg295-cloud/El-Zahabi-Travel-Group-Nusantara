# 🚀 VERCEL DEPLOYMENT CHECKLIST

Panduan lengkap setup environment variables dan deploy ke Vercel.

---

## ✅ LANGKAH 1: Persiapan Sebelum Deploy

### A. Login ke GitHub
Pastikan repository sudah di-push ke GitHub:
```bash
git add .
git commit -m "Setup environment variables"
git push origin main
```

### B. Siapkan Credentials
Kumpulkan semua kunci yang diperlukan di satu tempat:

| Variable | Status | Nilai | Sumber |
|----------|--------|--------|--------|
| `DATABASE_URL` | ⚠️ Wajib | `[DATABASE_CONNECTION_STRING]` | Supabase/Railway/Neon |
| `NEXTAUTH_URL` | ⚠️ Wajib | `https://your-app.vercel.app` | *(akan auto-fill post-deploy)* |
| `NEXTAUTH_SECRET` | ⚠️ Wajib | `gOSDZ6OaVm2o8roUTJnlSqHWLl3qrZ0n1UbueD2ggX4=` | ✅ Sudah generate |
| `GOOGLE_CLIENT_ID` | ✅ Opsional | `[CLIENT_ID]` | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | ✅ Opsional | `[CLIENT_SECRET]` | Google Cloud Console |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | ✅ Opsional | `[CLIENT_KEY]` | Midtrans Dashboard |
| `MIDTRANS_SERVER_KEY` | ✅ Opsional | `[SERVER_KEY]` | Midtrans Dashboard |
| `STRIPE_SECRET_KEY` | ✅ Opsional | `[SECRET_KEY]` | Stripe Dashboard |

---

## ✅ LANGKAH 2: Setup Database (Pilih Salah Satu)

### OPSI A: Supabase (Recommended ✅)

1. Buka https://supabase.com → Sign up
2. Buat project baru
3. Tunggu project initialized
4. Go to **Settings** → **Database** → **Connection Pooling**
5. Pilih mode: **Transaction** (recommended for serverless)
6. Copy connection string:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
   ```
7. Catat `DATABASE_URL` value

### OPSI B: Railway.app

1. Buka https://railway.app → Sign up
2. Click **New Project** → **Provision PostgreSQL**
3. Tunggu hingga selesai
4. Go to **PostgreSQL** → Copy **Database URL**
5. Catat `DATABASE_URL` value

### OPSI C: Neon

1. Buka https://neon.tech → Sign up
2. Buat project baru
3. Pilih branch "main"
4. Copy connection string:
   ```
   postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]
   ```
5. Catat `DATABASE_URL` value

---

## ✅ LANGKAH 3: Google OAuth Setup (Optional)

1. Buka https://console.cloud.google.com
2. **Create new project** atau pilih existing
3. Go to **APIs & Services** → **Credentials**
4. Click **+ Create Credentials** → **OAuth Client ID**
5. Pilih **Web Application**
6. Di **Authorized JavaScript origins**, add:
   ```
   https://your-app.vercel.app
   http://localhost:3000
   ```
7. Di **Authorized redirect URIs**, add:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```
8. Click **Create** dan copy:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

---

## ✅ LANGKAH 4: Deploy ke Vercel

### A. Import Repository ke Vercel

1. Buka https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Cari dan pilih: **flygg295-cloud/El-Zahabi-Travel-Group-Nusantara**
5. Click **Import**

### B. Setup Environment Variables

Di halaman **Configure Project**, cari section **Environment Variables**.

**Copy-paste setiap baris di bawah (ganti [VALUE] dengan nilai Anda):**

```
DATABASE_URL = postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = gOSDZ6OaVm2o8roUTJnlSqHWLl3qrZ0n1UbueD2ggX4=
GOOGLE_CLIENT_ID = your-client-id-here
GOOGLE_CLIENT_SECRET = your-client-secret-here
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY = your-midtrans-client-key
MIDTRANS_SERVER_KEY = your-midtrans-server-key
STRIPE_SECRET_KEY = your-stripe-secret-key
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

**Cara input di Vercel:**
1. Klik **Environment Variables** section
2. Untuk setiap variable:
   - Input `KEY` name
   - Input `VALUE`
   - Pilih **Environment**: Production (recommended)
   - Click **Save**
3. Repeat untuk semua variables

### C. Deploy

1. Pastikan semua env variables sudah terinput ✓
2. Click **Deploy** button
3. Tunggu build selesai (biasanya 2-5 menit)
4. Lihat notification **"Deployment Successful"** ✓

---

## ✅ LANGKAH 5: Post-Deploy Setup

Setelah deployment successful, jalankan database migration:

### Option A: Via Vercel CLI (RECOMMENDED)

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Link project
vercel link

# Run migration
vercel env pull  # Tarik env vars dari Vercel
npx prisma migrate deploy
npx prisma db seed
```

### Option B: Via Vercel Dashboard Console

1. Di project Anda → **Deployments**
2. Klik deployment terbaru
3. Go to **Function logs** atau **Preview deployment URL**
4. Buka terminal lokal dan jalankan:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Option C: Manual SSH

Jika Anda punya direct database access:
```bash
# SSH ke database
psql "postgresql://[CONNECTION_STRING]"

# Run migrations
npx prisma migrate deploy
```

---

## ✅ LANGKAH 6: Verifikasi Deployment

1. **Buka Live URL**: `https://your-app.vercel.app`
2. **Test homepage** loads ✓
3. **Test auth** (signup/signin) ✓
4. **Test search** (jika ada data) ✓

---

## 🆘 Troubleshooting

### "Database connection failed"
- ✓ Verify DATABASE_URL format benar
- ✓ Check database sudah running
- ✓ Pastikan IP whitelist sudah include Vercel (biasanya auto)

### "NEXTAUTH_SECRET is missing"
- ✓ Verify variable sudah terinput di Vercel
- ✓ Redeploy project

### "Google OAuth redirect URI doesn't match"
- ✓ Verifikasi callback URL di Google Console exact separator dengan:
  - `https://your-app.vercel.app/api/auth/callback/google`
- ✓ Tunggu ~5 menit sampai perubahan Google Console berdampak

### "React Context is unavailable"
- ✓ Sudah diperbaiki di codebase (use 'use client' directive)

### "Prisma generate error"
- ✓ Jalankan: `npx prisma generate`
- ✓ Commit dan push
- ✓ Redeploy dari Vercel

---

## 📋 Final Checklist

- [ ] Database credentials disiapkan (Supabase/Railway/Neon)
- [ ] Repository sudah di-push ke GitHub
- [ ] Project imported ke Vercel
- [ ] Semua environment variables sudah terinput:
  - [ ] DATABASE_URL
  - [ ] NEXTAUTH_URL
  - [ ] NEXTAUTH_SECRET
  - [ ] GOOGLE_CLIENT_ID (opsional)
  - [ ] GOOGLE_CLIENT_SECRET (opsional)
  - [ ] NEXT_PUBLIC_MIDTRANS_CLIENT_KEY (opsional)
  - [ ] MIDTRANS_SERVER_KEY (opsional)
  - [ ] STRIPE_SECRET_KEY (opsional)
- [ ] Deployment successful ✓
- [ ] Database migrations run
- [ ] Live URL accessible
- [ ] Auth works
- [ ] Search works (minimal functionality)

---

## 🎯 Next Steps

1. Prepare DATABASE_URL ← **START HERE**
2. Setup Google OAuth (if needed)
3. Deploy to Vercel
4. Run migrations
5. Test live URL

**Questions? Check [VERCEL_SETUP.md](VERCEL_SETUP.md) or [ENV_VARIABLES.md](ENV_VARIABLES.md) for detailed documentation.**
