# API Testing Guide

Guide untuk testing API endpoints menggunakan curl atau Postman.

## 🔑 Authentication

### Login with Credentials

```bash
# POST /api/auth/signin
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Register New User

```bash
# POST /api/auth/signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## ✈️ Tickets API

### Get All Tickets

```bash
# GET /api/tickets
curl http://localhost:3000/api/tickets
```

### Search Flights

```bash
# Flights from Jakarta to Bali
curl "http://localhost:3000/api/tickets?type=flight&from=CGK&to=DPS"

# With date range
curl "http://localhost:3000/api/tickets?type=flight&from=CGK&to=DPS&startDate=2024-02-15&endDate=2024-02-20"

# With price filter
curl "http://localhost:3000/api/tickets?type=flight&minPrice=500000&maxPrice=1500000"
```

### Search Hotels

```bash
# Hotels in Bali
curl "http://localhost:3000/api/tickets?type=hotel&to=Bali"

# With date range
curl "http://localhost:3000/api/tickets?type=hotel&to=Bali&startDate=2024-02-15&endDate=2024-02-18"
```

### Create New Ticket (Admin)

```bash
# POST /api/tickets
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "type": "flight",
    "airline": "Garuda Indonesia",
    "flightNumber": "GA999",
    "from": "CGK",
    "to": "DPS",
    "departTime": "2024-02-20T08:00:00Z",
    "arriveTime": "2024-02-20T10:30:00Z",
    "duration": "2h 30m",
    "stops": 0,
    "price": 850000,
    "currency": "IDR",
    "totalSeats": 180,
    "availableSeats": 150,
    "rating": 4.5,
    "reviews": 245
  }'
```

## 📝 Bookings API

### Get User Bookings

```bash
# GET /api/bookings (requires authentication)
# Make sure you're logged in first
curl http://localhost:3000/api/bookings \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### Create New Booking

```bash
# POST /api/bookings (requires authentication)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "ticketId": "clqz6n7xk0001xz8h5k3l7m9p",
    "quantity": 2,
    "passengerName": "John Doe",
    "passengerEmail": "john@example.com",
    "passengerPhone": "+628123456789",
    "passengerIdType": "passport",
    "passengerIdNumber": "AB123456",
    "specialRequests": "Window seat please",
    "taxRate": 0.1,
    "discountRate": 0
  }'
```

Response (Success):
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "clqz6n7xk0002xz8h5k3l7m9p",
    "bookingCode": "BK987654ABC",
    "userId": "clqz6n7xk0000xz8h5k3l7m9p",
    "ticketId": "clqz6n7xk0001xz8h5k3l7m9p",
    "quantity": 2,
    "passengerName": "John Doe",
    "passengerEmail": "john@example.com",
    "totalPrice": 1870000,
    "currency": "IDR",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "createdAt": "2024-02-20T10:30:00.000Z"
  }
}
```

### Update Booking

```bash
# PUT /api/bookings (requires authentication)
curl -X PUT http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "bookingId": "clqz6n7xk0002xz8h5k3l7m9p",
    "status": "CONFIRMED",
    "notes": "Booking confirmed by payment"
  }'
```

Valid statuses: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

## 🧪 Testing with Postman

### 1. Import Collection

Buat request baru di Postman dengan:

**New Request:**
- Method: POST
- URL: http://localhost:3000/api/bookings
- Headers:
  - Content-Type: application/json
- Body (raw JSON):
```json
{
  "ticketId": "your-ticket-id",
  "quantity": 1,
  "passengerName": "Test User",
  "passengerEmail": "test@example.com",
  "passengerPhone": "+628123456789",
  "passengerIdType": "passport",
  "passengerIdNumber": "TEST123"
}
```

### 2. Save as Collection

File → Save as → Create Collection

## 🔄 Testing Flow

### 1. Get Tickets List

```bash
GET /api/tickets?type=flight
```

Copy salah satu `id` dari response.

### 2. Create Booking

Gunakan `id` dari step 1:

```bash
POST /api/bookings
{
  "ticketId": "PASTE_ID_HERE",
  ...
}
```

Copy `bookingCode` dari response.

### 3. Get Bookings

```bash
GET /api/bookings
```

Harus return array dengan booking yang baru dibuat.

### 4. Update Booking

Gunakan `id` dari booking yang dibuat:

```bash
PUT /api/bookings
{
  "bookingId": "PASTE_ID_HERE",
  "status": "CONFIRMED"
}
```

## 🔐 Testing Protected Routes

Untuk test routes yang memerlukan authentication:

### Get Session Token

1. Login via UI di http://localhost:3000/auth/signin
2. Open DevTools → Application → Cookies
3. Find cookie bernama `next-auth.session-token`
4. Copy token value

### Use Token in Requests

```bash
curl http://localhost:3000/api/bookings \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN_HERE"
```

## 📊 Test Data

### Available Test Flights

Setelah `npm run seed`:

1. **Garuda Indonesia GA123**
   - CGK → DPS
   - Price: 850,000 IDR
   - Duration: 2h 30m

2. **Lion Air JT456**
   - CGK → SUB
   - Price: 450,000 IDR
   - Duration: 1h 45m

3. **Batik Air BT789**
   - SUB → DPS
   - Price: 650,000 IDR
   - Duration: 1h 15m

### Available Test Hotels

1. **Luxury Bali Resort**
   - Price: 1,500,000 IDR
   - Type: Deluxe Ocean View

2. **Comfort Inn Surabaya**
   - Price: 450,000 IDR
   - Type: Standard Room

3. **Grand Jakarta Hotel**
   - Price: 2,500,000 IDR
   - Type: Executive Suite

## ✅ Success Indicators

✓ GET `/api/tickets` returns status 200
✓ POST `/api/bookings` returns status 201
✓ PUT `/api/bookings` returns status 200
✓ GET `/api/bookings` returns status 200
✓ Error responses have proper status codes (400, 401, 404, etc)
✓ Response body contains clear error messages

## 🐛 Common Test Issues

### Issue: 401 Unauthorized
- Make sure user is logged in
- Session token is valid
- Cookie is being sent with request

### Issue: 404 Not Found
- Check endpoint URL spelling
- Check if ticket ID exists
- Verify database is seeded

### Issue: 400 Bad Request
- Check JSON format
- Verify all required fields are present
- Check data types match schema

## 📝 Example Test Sequence

```bash
# 1. Get all tickets
curl http://localhost:3000/api/tickets

# 2. Search flight tickets (from response, pick one ticket ID)
TICKET_ID="clqz6n7xk0001xz8h5k3l7m9p"

# 3. Create booking with this ticket
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d "{
    \"ticketId\": \"$TICKET_ID\",
    \"quantity\": 1,
    \"passengerName\": \"Test User\",
    \"passengerEmail\": \"test@example.com\",
    \"passengerPhone\": \"+628123456789\",
    \"passengerIdType\": \"passport\",
    \"passengerIdNumber\": \"TEST001\"
  }"

# 4. Check bookings list
curl http://localhost:3000/api/bookings
```

---

**Happy Testing! 🧪**

Last Updated: February 2024
