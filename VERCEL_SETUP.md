# 🚀 VERCEL DEPLOYMENT SETUP GUIDE

## LANGKAH 1: Buka Vercel Dashboard
Kunjungi: https://vercel.com/dashboard

---

## LANGKAH 2: Import Repository
1. Klik **Add New** → **Project**
2. Klik **Import Git Repository**
3. Cari: **`flygg295-cloud/El-Zahabi-Travel-Group-Nusantara`**
4. Klik **Import**

---

## LANGKAH 3: Setup Environment Variables
Di halaman Vercel, cari section **Environment Variables**. 

Salin-paste setiap KEY-VALUE pair di bawah ke Vercel:

### ✅ SUDAH SIAP (Tinggal Copy-Paste):

```
KEY: NEXTAUTH_SECRET
VALUE: GkPz+wZ1dg9ekTmqGVyq2E7D48RIpcil053HI1oGV2w
```

```
KEY: NEXTAUTH_URL
VALUE: https://el-zahabi-travel-group-nusantara.vercel.app
```

```
KEY: NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
VALUE: Mid-client-xxxxxxxxxxxx
(Ganti dengan client key Anda dari https://dashboard.midtrans.com)
```

---

### ⚠️ PERLU DIISI DULU (Ambil dari service provider):

#### 1️⃣ DATABASE (PostgreSQL)
**Pilih salah satu:**

**OPSI A: Supabase (Recommended)**
- Daftar: https://supabase.com
- Buat project baru
- Ambil connection string dari Settings → Database → Connection string
- Copy paste ke:
```
KEY: DATABASE_URL
VALUE: postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

**OPSI B: Railway.app**
- Daftar: https://railway.app
- Buat PostgreSQL project
- Copy connection string ke:
```
KEY: DATABASE_URL
VALUE: postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

---

#### 2️⃣ GOOGLE OAUTH
1. Buka: https://console.cloud.google.com
2. Buat project baru
3. Enable **Google+ API**
4. Buat **OAuth 2.0 Client ID** (Web Application)
5. Authorized Redirect URI tambahkan:
   - `https://el-zahabi-travel-group-nusantara.vercel.app/api/auth/callback/google`
6. Copy Client ID dan Secret:

```
KEY: GOOGLE_CLIENT_ID
VALUE: [COPY_DARI_GOOGLE_CONSOLE]
```

```
KEY: GOOGLE_CLIENT_SECRET
VALUE: [COPY_DARI_GOOGLE_CONSOLE]
```

---

#### 3️⃣ MIDTRANS PAYMENT
1. Daftar: https://midtrans.com
2. Login ke: https://dashboard.midtrans.com
3. Pergi ke Settings → Access Keys
4. Copy Server Key dan Client Key:

```
KEY: MIDTRANS_SERVER_KEY
VALUE: [COPY_DARI_MIDTRANS_DASHBOARD]
```

```
KEY: NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
VALUE: [COPY_DARI_MIDTRANS_DASHBOARD]
```

---

## LANGKAH 4: Deploy
1. Pastikan semua environment variables sudah terisi ✓
2. Klik tombol **Deploy** 
3. Tunggu sampai **"Deployment Successful"** ✓

---

## LANGKAH 5: Setup Database
Setelah deploy berhasil, jalankan ini di terminal lokal:

```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## ✨ DONE!
Website Anda sekarang live di: 
`https://el-zahabi-travel-group-nusantara.vercel.app`

---

## 🆘 TROUBLESHOOTING

**Error: "React Context is unavailable"**
- ✓ Sudah diperbaiki (page.tsx di-ubah menjadi 'use client')

**Error: "Database connection failed"**
- Pastikan DATABASE_URL format benar
- Check PostgreSQL sudah online

**Error: "Google OAuth redirect URI doesn't match"**
- Verifikasi callback URL di Google Console sama dengan di .vercel.app

