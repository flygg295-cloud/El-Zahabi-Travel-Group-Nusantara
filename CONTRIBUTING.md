# Contributing to El-Zahabi Travel

Terimakasih sudah tertarik untuk berkontribusi! Berikut adalah panduan untuk contributing ke project ini.

## 🎯 Code of Conduct

- Hormat dan profesional
- Tidak ada harassment atau diskriminasi
- Respectful terhadap semua contributors
- Fokus pada improvement dan learning

## 🚀 Getting Started

### 1. Fork Repository

```bash
# Fork di GitHub UI
# https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara

# Clone fork Anda
git clone https://github.com/your-username/El-Zahabi-Travel-Group-Nusantara.git
cd El-Zahabi-Travel-Group-Nusantara

# Add upstream remote
git remote add upstream https://github.com/flygg295-cloud/El-Zahabi-Travel-Group-Nusantara.git
```

### 2. Setup Development Environment

```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run dev
```

## 📝 Making Changes

### 1. Create Feature Branch

```bash
# Update main branch
git fetch upstream
git rebase upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Follow existing code style
- Use TypeScript
- Add proper type annotations
- Write clean, readable code

### 3. Commit Messages

```bash
# Good commit message format:
# type(scope): description

# Types: feat, fix, docs, style, refactor, perf, test, chore
# Examples:
git commit -m "feat(search): add price range filter"
git commit -m "fix(auth): handle google oauth edge case"
git commit -m "docs(readme): update deployment instructions"
```

### 4. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
```

Di GitHub, buat Pull Request dengan:
- Clear title
- Description dari changes
- Related issue jika ada
- Screenshots jika UI changes

## ✅ PR Review Checklist

Sebelum submit PR, pastikan:

- [ ] Code sudah tested locally
- [ ] Tidak ada console errors
- [ ] ESLint pass: `npm run lint`
- [ ] Build pass: `npm run build`
- [ ] Commit message clear dan descriptive
- [ ] Added tests jika applicable
- [ ] Documentation updated jika needed
- [ ] No breaking changes (atau documented)

## 🧪 Testing

```bash
# Lint
npm run lint

# Build
npm run build

# Dev test
npm run dev
```

## 📚 Project Structure

Jika menambah file baru, ikuti struktur yang ada:

```
src/
├── app/           # Next.js pages & layouts
├── components/    # Reusable React components
├── lib/           # Utilities & libraries
└── styles/        # Global styles
```

## 🎨 Code Style

```typescript
// Use TypeScript
interface User {
  id: string;
  email: string;
  name?: string;
}

// Use const & let, avoid var
const message = 'hello';
let count = 0;

// Arrow functions
const greet = (name: string) => {
  return `Hello, ${name}`;
};

// Use async/await
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🐛 Reporting Bugs

### Before Reporting:
- Check existing issues
- Test dengan latest code
- Reproduce consistently

### When Reporting:
- Clear title
- Step-by-step reproduction
- Expected vs actual behavior
- Screenshot/video jika applicable
- System info (OS, browser, Node version)

### Example:
```markdown
## Bug: Login button not working on mobile

**Description:** 
When on mobile device, clicking the login button does nothing.

**Steps to Reproduce:**
1. Open website on mobile browser
2. Click "Login" button
3. Notice button is unresponsive

**Expected Behavior:**
Should redirect to login page

**Actual Behavior:**
Nothing happens, button seems disabled

**Environment:**
- Browser: Chrome 121 on iPhone 14
- OS: iOS 17.2
```

## 💡 Feature Requests

Buat issue dengan:
- Clear title
- Detailed description
- Use case/motivation
- Possible implementation approach

## 📋 Areas for Contribution

### High Priority 🔴
- Bug fixes
- Performance improvements
- Security issues
- Documentation

### Medium Priority 🟡
- New features
- UI/UX improvements
- Refactoring

### Lower Priority 🟢
- Code style improvements
- Dependency updates

## 🚢 Release Process

1. Code review & approval
2. Merge ke main branch
3. Test di staging
4. Deploy ke production
5. Monitor untuk issues

## 📞 Questions?

- Tanya di GitHub Discussions
- Create detailed issue
- Comment di relevant PR

---

**Thank you for contributing! 🙏**
