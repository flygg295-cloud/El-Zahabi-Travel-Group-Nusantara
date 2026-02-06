# 💡 Development Tips & Best Practices

Panduan untuk menjadi developer produktif di project ini.

---

## 🎯 Before You Start Coding

### 1. Read Documentation First
```
Critical path:
1. README.md          (5 min)
2. ARCHITECTURE.md    (10 min)
3. GETTING_STARTED.md (5 min)
Total: 20 minutes saves 2 hours of development
```

### 2. Understand Project Structure
```bash
# Review structure
cat ARCHITECTURE.md

# Key folders:
src/app/        # Pages and routes
src/components/ # Reusable components
src/lib/        # Utilities and core
prisma/         # Database schema
```

### 3. Know the Stack
- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Node.js + Prisma + PostgreSQL
- **Auth**: NextAuth.js with JWT
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

---

## 🔧 Development Workflow

### Starting Development Session

```bash
# 1. Pull latest code
git pull origin develop

# 2. Create feature branch
git checkout -b feature/feature-name

# 3. Start development server
npm run dev

# 4. Keep Prisma Studio open (optional)
npm run db:studio

# 5. Open code editor
code .
```

### Making Changes

```bash
# When you modify database schema:
npx prisma db:push        # Sync with database
npx prisma generate       # Regenerate Prisma Client

# When you add dependencies:
npm install package-name

# Before committing:
npm run build             # Check build
npm run lint              # Check code quality
```

### Database Changes

```bash
# If you modify prisma/schema.prisma:
# 1. Check changes
git diff prisma/schema.prisma

# 2. Sync database
npm run db:push

# 3. If needed, reset (WARNING: loses data)
npx prisma db:push --force-reset

# 4. Regenerate client
npm run db:generate
```

---

## 📝 Code Guidelines

### TypeScript Best Practices

```typescript
// ✅ Always add type annotations
function handleSearch(from: string, to: string): Promise<Ticket[]> {
  // ...
}

// ❌ Avoid implicit any
function handleSearch(from, to) {
  // ...
}

// ✅ Use proper error types
try {
  await fetch('/api/bookings')
} catch (error) {
  console.error('Booking failed:', error instanceof Error ? error.message : 'Unknown error')
}

// ✅ Export types for reuse
export type User = {
  id: string
  email: string
  name: string | null
}

// ✏️ React Component Pattern
interface SearchBarProps {
  onSearch: (from: string, to: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  return <div>{/* ... */}</div>
}
```

### Component Guidelines

```typescript
// ✅ Good: Clear component structure
function TicketCard({ ticket, onBook }: TicketCardProps) {
  return (
    <div className="ticket-card">
      {/* Content */}
      <button onClick={() => onBook(ticket.id)}>
        Book
      </button>
    </div>
  )
}

// ✅ Good: Proper prop typing
interface TicketCardProps {
  ticket: Ticket
  onBook: (ticketId: string) => void
}

// ✅ Good: Use Tailwind classes
className="bg-blue-500 hover:bg-blue-600 transition-colors"

// ❌ Avoid: Inline styles
style={{ backgroundColor: 'blue' }}

// ❌ Avoid: Bare utility classes
className="p-4 m-2 text-lg"
// Better:
className="p-4 my-2 text-lg"
```

### API Route Guidelines

```typescript
// ✅ Good: Type request/response
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const from = searchParams.get('from')
    
    if (!from) {
      return Response.json({ error: 'Missing from' }, { status: 400 })
    }

    const tickets = await prisma.ticket.findMany({
      where: { from }
    })

    return Response.json(tickets)
  } catch (error) {
    console.error('Search error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ❌ Avoid: No error handling
export async function GET(request) {
  const tickets = await prisma.ticket.findMany()
  return Response.json(tickets)
}
```

---

## 🐛 Debugging Tips

### Using Console Logs

```typescript
// ✅ Good: Descriptive logs
console.log('Ticket search params:', { from, to, date })
console.error('API error:', error)

// ✅ Better: Use conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// ❌ Avoid: Just the value
console.log(data)

// ✅ Good: Remove before commit
// TODO: Remove debug log
console.log('debug:', ticket)
```

### Browser DevTools

```html
<!-- Chrome/Firefox DevTools -->
F12 → Console tab
- See all logs
- Check errors
- Run JavaScript

F12 → Network tab
- Check API calls
- See response status
- Debug timing

F12 → Applications tab
- Check cookies
- See session token
- View localStorage
```

### VS Code Debugging

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "port": 9229
    }
  ]
}
```

---

## 💾 Version Control

### Commit Messages

```bash
# ✅ Good: Clear, descriptive
git commit -m "feat: add flight search filters"
git commit -m "fix: correct booking price calculation"
git commit -m "docs: update deployment guide"

# ❌ Bad: Vague messages
git commit -m "fix stuff"
git commit -m "update"
git commit -m "changes"
```

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/feature-name

# 2. Make changes
# Edit files...

# 3. Stage and commit
git add .
git commit -m "feat: add feature"

# 4. Push to remote
git push origin feature/feature-name

# 5. Create Pull Request on GitHub
# Wait for review

# 6. Merge when approved
git checkout develop
git pull origin develop
git merge feature/feature-name
git push origin develop
```

### Useful Git Commands

```bash
# See what changed
git status
git diff

# Undo changes
git checkout -- src/file.tsx      # Discard file changes
git reset HEAD~1                   # Undo last commit

# View history
git log --oneline
git log --graph --oneline --all

# Clean branches
git branch -d feature/old-feature
```

---

## 🧪 Testing During Development

### Quick Manual Testing

```bash
# 1. Smoke test after changes
npm run build

# 2. Test in browser
npm run dev
# Visit http://localhost:3000
# Test the feature you changed

# 3. Check console
F12 → Console tab
# No errors? ✅

# 4. Test on mobile
F12 → Toggle device toolbar (Ctrl+Shift+M)
# Responsive? ✅

# 5. Check specific features
# Search works?
# Booking works?
# Auth works?
```

### API Testing

```bash
# Test GET endpoint
curl http://localhost:3000/api/tickets?from=CGK&to=SUB

# Test POST endpoint
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"ticketId":"1","quantity":2}'
```

---

## 📊 Performance Tips

### Bundle Size

```bash
# Check bundle size
npm run build
# Check .next/static folder size

# Keep it small:
- Use dynamic imports for heavy components
- Code-split large features
- Use _next/image for optimization
```

### Database Queries

```typescript
// ✅ Good: Select only needed fields
const tickets = await prisma.ticket.findMany({
  select: {
    id: true,
    from: true,
    to: true,
    price: true,
    // Don't select: {description, longText, ...}
  }
})

// ✅ Good: Use indexes for filtering
// Schema should have: @@index([from, to, departTime])

// ❌ Bad: Select all fields
const tickets = await prisma.ticket.findMany()

// ❌ Slow: N+1 queries
for (const ticket of tickets) {
  const bookings = await prisma.booking.findMany({
    where: { ticketId: ticket.id }
  })
}

// ✅ Better: Use include
const tickets = await prisma.ticket.findMany({
  include: { bookings: true }
})
```

---

## 🔒 Security Reminders

### General Rules

- ✅ **Validate input** on both client and server
- ✅ **Check authentication** on protected routes
- ✅ **Hash passwords** (bcryptjs does this)
- ✅ **Use HTTPS** (Vercel does this)
- ✅ **Sanitize output** (Next.js does this)
- ✅ **Store secrets** in environment variables
- ❌ **Never commit** .env.local or secrets
- ❌ **Never log** sensitive data
- ❌ **Never trust** client data

### API Security

```typescript
// ✅ Good: Validate and check auth
export async function POST(request: NextRequest) {
  // 1. Check authentication
  const session = await getSession({ req: request })
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // 2. Validate input
  const data = await request.json()
  if (!data.email || !data.email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }

  // 3. Sanitize data
  const email = data.email.trim().toLowerCase()

  // 4. Use parameterized queries
  const user = await prisma.user.findUnique({ where: { email } })

  return Response.json({ user })
}

// ❌ Bad: No validation
export async function POST(request) {
  const data = await request.json()
  const user = await prisma.user.create({ data })
  return Response.json(user)
}
```

---

## 🎯 Feature Development Checklist

### When Adding New Feature

```
1. Planning Phase
   [ ] Read related documentation
   [ ] Check FEATURES.md for similar features
   [ ] Design data model if needed
   [ ] Plan API endpoints

2. Database Phase
   [ ] Update prisma/schema.prisma
   [ ] Test schema changes
   [ ] run npm run db:push
   [ ] Update seed.ts if needed

3. Backend Phase
   [ ] Create API endpoint
   [ ] Add input validation
   [ ] Write error handling
   [ ] Test with curl

4. Frontend Phase
   [ ] Create page/component
   [ ] Connect to API
   [ ] Add loading/error states
   [ ] Test on mobile

5. Integration Phase
   [ ] Connect frontend to backend
   [ ] Test full flow
   [ ] Check edge cases
   [ ] Verify security

6. Testing Phase
   [ ] npm run build (check for errors)
   [ ] Manual testing
   [ ] Browser console (no errors?)
   [ ] Mobile testing

7. Documentation Phase
   [ ] Add code comments
   [ ] Update README if needed
   [ ] Document API endpoint
   [ ] Note any breaking changes

8. Commit Phase
   [ ] git add .
   [ ] git commit -m "feat: description"
   [ ] git push origin feature-branch
   [ ] Create pull request
```

---

## 🚀 Before Deployment

### Pre-Deployment Checklist

```bash
# 1. Build check
npm run build

# 2. No TypeScript errors?
npx tsc --noEmit

# 3. No ESLint errors?
npm run lint

# 4. All env variables set?
grep -E "DATABASE_URL|NEXTAUTH" .env.local

# 5. Database migrations applied?
npm run db:push --dry-run

# 6. Last-minute test
npm run dev
# Test critical features...

# 7. Clean up
git status
# Any uncommitted changes?

# 8. Ready to push?
git log --oneline | head -5
# Commits look good?

# 9. PUSH!
git push origin feature-branch
```

---

## 💬 Good Coding Habits

### Clean Code Principles

```typescript
// ✅ Good: Self-documenting code
function calculateBookingTotal(
  basePrice: number,
  quantity: number,
  taxRate: number = 0.1
): number {
  const subtotal = basePrice * quantity
  const tax = subtotal * taxRate
  return subtotal + tax
}

// ❌ Bad: Cryptic variable names
function calcTotal(p, q, t = 0.1) {
  return p * q + p * q * t
}

// ✅ Good: Small focused functions
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ✅ Good: Extract magic numbers
const TAX_RATE = 0.1
const MIN_PASSWORD_LENGTH = 6
const MAX_PASSENGERS = 9

// ❌ Bad: Magic numbers in code
if (length > 6) { ... }
if (passengers > 9) { ... }
if (price * 1.1) { ... }
```

### Refactoring Tips

```bash
# When code feels wrong:
# 1. Take a break (fresh perspective)
# 2. Read it out loud
# 3. Ask: "Would a new dev understand this?"
# 4. Extract functions if > 15 lines
# 5. Simplify if more than 3 conditionals
# 6. Add comments if "why" isn't obvious
```

---

## 📚 Resources for Learning

### Official Docs
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Code Review
- Read other's code in your team
- Share your code with peers
- Ask for feedback
- Give constructive feedback

### Practice
- Build small features first
- Refactor existing code
- Write tests
- Optimize performance
- Document your work

---

## 🆘 Common Mistakes to Avoid

### Database Issues
- ❌ Modifying database without migrations
- ❌ Using old field names after rename
- ❌ Not adding indexes for large tables
- ✅ Always use npm run db:push
- ✅ Check schema before querying

### API Issues
- ❌ Forgetting to validate input
- ❌ Not checking authentication
- ❌ Using hardcoded IDs
- ✅ Always validate user input
- ✅ Always check session

### Frontend Issues
- ❌ Not handling loading states
- ❌ Not showing errors to user
- ❌ Not testing on mobile
- ✅ Use proper error boundaries
- ✅ Test all breakpoints

### Git Issues
- ❌ Committing .env.local
- ❌ Large commits with many changes
- ❌ Unclear commit messages
- ✅ Commit often with clear messages
- ✅ Check .gitignore

---

## 🎓 Level Up Your Skills

```
Beginner Stage:
- Make features work
- Copy-paste patterns from existing code
- Follow existing structure
- Read documentation

Intermediate Stage:
- Understand WHY patterns exist
- Refactor code for clarity
- Write clean code first time
- Mentor others

Advanced Stage:
- Design new patterns
- Optimize performance
- Prevent future issues
- Lead project architecture
```

---

## 📞 Need Help?

### Getting Unstuck

1. **Check documentation** - Most answers in our guides
2. **Google the error** - 90% of errors are searchable
3. **Ask team** - Colleagues have seen the issue
4. **Read code comments** - Previous solutions documented
5. **Debug methodically** - Add logs, check stack trace

### Resources in This Project

- Start: [GETTING_STARTED.md](GETTING_STARTED.md)
- Help: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- API: [API_TESTING.md](API_TESTING.md)
- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- All: [DOCS_INDEX.md](DOCS_INDEX.md)

---

**Happy coding! 🚀**

Remember: **Good code is written once, bad code is written many times!**

Last Updated: February 2024
