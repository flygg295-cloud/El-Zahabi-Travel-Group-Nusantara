# Testing Guide

Panduan lengkap untuk testing aplikasi travel booking.

## 📋 Testing Strategy

```
┌──────────────────────────────────────────┐
│          Testing Pyramid                  │
│                                           │
│              /\   E2E Tests               │
│             /  \  (Manual + Cypress)     │
│            /────\                        │
│           /      \                       │
│          /────────\  Integration Tests    │
│         /          \ (Jest + API calls)  │
│        /            \                    │
│       /──────────────\ Unit Tests         │
│      /                \ (Jest)           │
│     /____________________\               │
│                                          │
│   Coverage: ~80% Unit                    │
│             ~15% Integration             │
│             ~5% E2E                      │
└──────────────────────────────────────────┘
```

## 🔧 Setup Testing Environment

### Install Testing Dependencies

```bash
# Install Jest and testing libraries
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @types/jest \
  jest-environment-jsdom

# Install E2E testing (optional)
npm install --save-dev cypress

# Install API testing
npm install --save-dev supertest
```

### Configure Jest

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom'
```

Update `package.json`:

```json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --ci --coverage",
    "test:coverage": "jest --coverage"
  }
}
```

## ✅ Unit Tests

### Test Utility Functions

Create `src/__tests__/lib/helpers.test.ts`:

```typescript
import {
  validateEmail,
  validatePhone,
  calculateTotalPrice,
  generateBookingCode,
  formatDateTime,
} from '@/lib/utils/helpers'

describe('Helper Functions', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('user@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
    })

    it('should reject empty email', () => {
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate Indonesian phone number', () => {
      expect(validatePhone('+621234567890')).toBe(true)
      expect(validatePhone('08123456789')).toBe(true)
    })

    it('should reject invalid phone', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc')).toBe(false)
    })
  })

  describe('calculateTotalPrice', () => {
    it('should calculate total with tax', () => {
      const total = calculateTotalPrice(100, 2, 0)
      expect(total).toBe(220) // 100 * 2 + 10% tax = 220
    })

    it('should apply discount', () => {
      const total = calculateTotalPrice(100, 2, 20)
      expect(total).toBe(176) // 100 * 2 - 20% discount + tax
    })
  })

  describe('generateBookingCode', () => {
    it('should generate 8-character code', () => {
      const code = generateBookingCode()
      expect(code).toHaveLength(8)
      expect(code).toMatch(/^[A-Z0-9]+$/)
    })

    it('should generate unique codes', () => {
      const code1 = generateBookingCode()
      const code2 = generateBookingCode()
      expect(code1).not.toBe(code2)
    })
  })

  describe('formatDateTime', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-02-14T10:30:00')
      const formatted = formatDateTime(date)
      expect(formatted).toMatch(/14 Feb 2024/)
    })
  })
})
```

### Test Components

Create `src/__tests__/components/navbar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/navbar'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react')

describe('Navbar Component', () => {
  it('renders logo', () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })
    render(<Navbar />)
    expect(screen.getByText('El-Zahabi Travel')).toBeInTheDocument()
  })

  it('shows login button when not authenticated', () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })
    render(<Navbar />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('shows user profile when authenticated', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe', email: 'john@example.com' } },
    })
    render(<Navbar />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('shows logout button when authenticated', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe' } },
    })
    render(<Navbar />)
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
```

### Test API Functions

Create `src/__tests__/lib/auth.test.ts`:

```typescript
import { signIn } from 'next-auth/react'

describe('Authentication', () => {
  describe('Email validation', () => {
    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        'user@',
        '@example.com',
        'user @ example.com',
      ]

      invalidEmails.forEach((email) => {
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(false)
      })
    })

    it('should accept valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.co.uk',
        'user+tag@example.com',
      ]

      validEmails.forEach((email) => {
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(true)
      })
    })
  })

  describe('Password validation', () => {
    it('should require minimum password length', () => {
      const password = 'abc'
      expect(password.length >= 6).toBe(false)
    })

    it('should accept valid password', () => {
      const password = 'secure123'
      expect(password.length >= 6).toBe(true)
    })
  })
})
```

## 🔗 Integration Tests

### Test API Routes

Create `src/__tests__/api/tickets.test.ts`:

```typescript
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/tickets/route'

describe('/api/tickets', () => {
  describe('GET', () => {
    it('should return tickets with search params', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { from: 'CGK', to: 'JKT' },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      const data = JSON.parse(res._getData())
      expect(Array.isArray(data)).toBe(true)
    })

    it('should filter by price range', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          from: 'CGK',
          to: 'JKT',
          minPrice: '100000',
          maxPrice: '500000',
        },
      })

      await handler(req, res)

      const data = JSON.parse(res._getData())
      data.forEach((ticket) => {
        expect(ticket.price >= 100000).toBe(true)
        expect(ticket.price <= 500000).toBe(true)
      })
    })

    it('should return 400 for missing required params', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(400)
    })
  })
})
```

### Test Database Operations

Create `src/__tests__/db/prisma.test.ts`:

```typescript
import { prismaMock } from '@/lib/db/prisma'

describe('Prisma Operations', () => {
  describe('User creation', () => {
    it('should create user with valid data', async () => {
      prismaMock.user.create.mockResolvedValueOnce({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed',
        emailVerified: null,
        image: null,
      })

      const user = await prismaMock.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashed',
        },
      })

      expect(user.email).toBe('test@example.com')
    })

    it('should reject duplicate email', async () => {
      prismaMock.user.create.mockRejectedValueOnce(
        new Error('Unique constraint failed')
      )

      await expect(
        prismaMock.user.create({
          data: {
            email: 'existing@example.com',
            name: 'User',
            password: 'hashed',
          },
        })
      ).rejects.toThrow()
    })
  })
})
```

## 🌐 API Testing with curl

### Search Tickets

```bash
# Get all flights from Jakarta to Surabaya
curl -X GET \
  'http://localhost:3000/api/tickets?from=CGK&to=SUB' \
  -H 'Content-Type: application/json'

# With price filter
curl -X GET \
  'http://localhost:3000/api/tickets?from=CGK&to=SUB&minPrice=100000&maxPrice=500000' \
  -H 'Content-Type: application/json'

# With date filter
curl -X GET \
  'http://localhost:3000/api/tickets?from=CGK&to=SUB&date=2024-02-14' \
  -H 'Content-Type: application/json'
```

### Create Booking

```bash
# Note: Requires authentication

curl -X POST \
  'http://localhost:3000/api/bookings' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=YOUR_TOKEN' \
  -d '{
    "ticketId": "1",
    "quantity": 2,
    "passengers": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+621234567890",
        "idNumber": "1234567890123456"
      },
      {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+621234567891",
        "idNumber": "1234567890123457"
      }
    ],
    "specialRequests": "Wheelchair assistance needed"
  }'
```

### Get User Bookings

```bash
curl -X GET \
  'http://localhost:3000/api/bookings' \
  -H 'Cookie: next-auth.session-token=YOUR_TOKEN'
```

### Update Booking Status

```bash
curl -X PUT \
  'http://localhost:3000/api/bookings' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=YOUR_TOKEN' \
  -d '{
    "bookingId": "1",
    "status": "CONFIRMED"
  }'
```

## 🎯 E2E Testing with Cypress (Optional)

### Setup Cypress

```bash
npm install --save-dev cypress
npx cypress open
```

### Write E2E Tests

Create `cypress/e2e/search.cy.ts`:

```typescript
describe('Search Booking Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should search for flights', () => {
    // Find search bar
    cy.contains('Dari mana?').click()
    cy.get('input[placeholder="Jakarta"]').type('CGK')

    // Select destination
    cy.contains('Ke mana?').click()
    cy.get('input[placeholder="Surabaya"]').type('SUB')

    // Select date
    cy.get('input[type="date"]').first().type('2024-02-14')

    // Click search
    cy.contains('Cari Tiket').click()

    // Verify results page loaded
    cy.url().should('include', '/search')
    cy.contains('Hasil Pencarian').should('be.visible')
  })

  it('should apply filters', () => {
    cy.visit('http://localhost:3000/search?from=CGK&to=SUB')

    // Apply price filter
    cy.contains('Harga Maksimal').parent().click()
    cy.get('.price-slider').should('be.visible')

    // Select price range
    cy.get('input[type="range"]').invoke('val', 500000).trigger('change')

    // Verify filtered results
    cy.get('[data-testid="ticket-card"]').each(($ticket) => {
      cy.wrap($ticket).within(() => {
        cy.get('[data-testid="price"]').then(($price) => {
          const price = parseInt($price.text())
          expect(price).toBeLessThan(500000)
        })
      })
    })
  })
})
```

Create `cypress/e2e/booking.cy.ts`:

```typescript
describe('Booking Flow', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123')
    cy.visit('http://localhost:3000/search?from=CGK&to=SUB')
  })

  it('should complete booking', () => {
    // Click first ticket
    cy.get('[data-testid="ticket-card"]').first().click()
    cy.contains('Pesan Sekarang').click()

    // Fill passenger info
    cy.get('input[name="passengers.0.name"]').type('John Doe')
    cy.get('input[name="passengers.0.email"]').type('john@example.com')
    cy.get('input[name="passengers.0.phone"]').type('+621234567890')
    cy.get('input[name="passengers.0.idNumber"]').type('1234567890123456')

    // Submit form
    cy.contains('Lanjutkan ke Pembayaran').click()

    // Verify booking created
    cy.url().should('include', '/my-bookings')
    cy.contains('Pemesanan Berhasil').should('be.visible')
  })
})
```

## 📊 Coverage Targets

### Minimum Coverage Goals

```
Statements   : 80%  (lines of code executed)
Branches     : 75%  (if/else paths)
Functions    : 80%  (all functions covered)
Lines        : 80%  (physical lines)
```

### Check Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/lcov-report/index.html
```

## ⚙️ CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:ci

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

      - name: Build
        run: npm run build
```

## 🔧 Test Tips & Best Practices

### Naming Conventions

```typescript
// ✅ Good: Describes what it tests
it('should return 400 when email is invalid', () => {})

// ❌ Bad: Unclear what it tests
it('handles error', () => {})

// ✅ Good: Clear test suite
describe('User authentication', () => {})

// ❌ Bad: Too vague
describe('auth', () => {})
```

### Mocking

```typescript
// Mock external API
jest.mock('next-auth/react')

// Mock database
jest.mock('@/lib/db/prisma')

// Mock environment variables
process.env.NEXTAUTH_SECRET = 'test-secret'
```

### Assertions

```typescript
// ✅ Good: Specific assertions
expect(response.status).toBe(200)
expect(data.user.email).toBe('test@example.com')
expect(array).toHaveLength(3)

// ❌ Bad: Too generic
expect(response).toBeTruthy()
expect(data).toBeDefined()
```

### Test Isolation

```typescript
// ✅ Good: Each test runs independently
describe('Bookings', () => {
  let booking
  
  beforeEach(() => {
    booking = createTestBooking()
  })

  afterEach(() => {
    deleteTestBooking(booking.id)
  })

  it('should be created', () => {})
  it('should be updated', () => {})
})

// ❌ Bad: Tests depend on each other
describe('Bookings', () => {
  let booking // Global state
  
  it('should be created', () => {
    booking = createBooking()
  })
  
  it('should be updated', () => {
    // Depends on first test
    updateBooking(booking.id)
  })
})
```

## 📝 Running Tests

```bash
# Run all tests
npm test

# Run single test file
npm test -- navbar.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="authentication"

# Run with coverage
npm run test:coverage

# Run in CI mode (no watch)
npm run test:ci

# Update snapshots
npm test -- -u
```

## 🎯 Test Checklist

Before committing code:

- [ ] All tests pass (`npm run test:ci`)
- [ ] Coverage meets minimum (80%)
- [ ] No console errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Code formatted (`npx prettier`)
- [ ] Linting passes (`npm run lint`)

---

**Happy Testing! 🧪**

Last Updated: February 2024
