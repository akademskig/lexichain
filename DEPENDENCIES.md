# LexiChain Dependencies Installation Guide

## Core Dependencies to Install

### 1. Styling & UI (Phase 1)

```bash
# Tailwind CSS for styling
cd apps/web
npm install --save tailwindcss postcss autoprefixer @tailwindcss/typography

# UI Component Libraries
npm install --save @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-toast

# Icons
npm install --save lucide-react

# Animations
npm install --save framer-motion

# Utilities
npm install --save clsx tailwind-merge class-variance-authority
```

### 2. Database & Backend (Phase 1)

```bash
# Prisma ORM
cd ../..  # back to root
npm install --save-dev prisma
npm install --save @prisma/client

# Initialize Prisma
npx prisma init
```

### 3. Authentication (Phase 2)

```bash
cd apps/web

# NextAuth.js for authentication
npm install --save next-auth @auth/prisma-adapter

# Passkey support
npm install --save @simplewebauthn/server @simplewebauthn/browser

# Password hashing
npm install --save bcryptjs
npm install --save-dev @types/bcryptjs
```

### 4. Web3 & Blockchain (Phase 3)

```bash
# Wallet connection
npm install --save wagmi viem @tanstack/react-query

# WalletConnect
npm install --save @web3modal/wagmi @web3modal/react

# Ethereum Attestation Service
npm install --save @ethereum-attestation-service/eas-sdk

# For gasless transactions (choose one)
npm install --save @gelatonetwork/relay-sdk
# OR
npm install --save @biconomy/mexa
```

### 5. IPFS Storage (Phase 3)

```bash
# Pinata SDK
npm install --save @pinata/sdk

# OR Web3.Storage
npm install --save web3.storage

# IPFS HTTP Client (optional)
npm install --save ipfs-http-client
```

### 6. Form Handling & Validation

```bash
# React Hook Form
npm install --save react-hook-form

# Zod for validation
npm install --save zod @hookform/resolvers
```

### 7. Date & Time Utilities

```bash
# Date-fns for date manipulation (SRS scheduling)
npm install --save date-fns
```

### 8. State Management (Optional)

```bash
# Zustand for global state
npm install --save zustand

# OR Jotai
npm install --save jotai
```

### 9. Development Tools

```bash
# Back to root
cd ../..

# Prettier plugins
npm install --save-dev prettier-plugin-tailwindcss

# Testing (optional for later)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## Installation Order

### Phase 1: Foundation (Install Now)
```bash
# From root directory
cd /home/marta/personal/lexichain

# 1. Styling
cd apps/web
npm install tailwindcss postcss autoprefixer @tailwindcss/typography lucide-react clsx tailwind-merge

# 2. UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-toast

# 3. Animations
npm install framer-motion

# 4. Database
cd ../..
npm install -D prisma
npm install @prisma/client

# 5. Forms & Validation
cd apps/web
npm install react-hook-form zod @hookform/resolvers date-fns

# Initialize Prisma
cd ../..
npx prisma init
```

### Phase 2: Authentication (Install Later)
```bash
cd apps/web
npm install next-auth @auth/prisma-adapter @simplewebauthn/server @simplewebauthn/browser bcryptjs
npm install -D @types/bcryptjs
```

### Phase 3: Web3 & IPFS (Install Later)
```bash
cd apps/web
npm install wagmi viem @tanstack/react-query @web3modal/wagmi
npm install @ethereum-attestation-service/eas-sdk
npm install @pinata/sdk
```

## Quick Install Script

Create this as `scripts/install-deps.sh`:

```bash
#!/bin/bash

echo "📦 Installing LexiChain dependencies..."

# Navigate to root
cd /home/marta/personal/lexichain

# Phase 1: Core UI & Styling
echo "🎨 Installing UI dependencies..."
cd apps/web
npm install \
  tailwindcss postcss autoprefixer @tailwindcss/typography \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs \
  @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-toast \
  lucide-react framer-motion clsx tailwind-merge \
  react-hook-form zod @hookform/resolvers date-fns

# Phase 1: Database
echo "🗄️  Installing database dependencies..."
cd ../..
npm install -D prisma
npm install @prisma/client

echo "✅ Core dependencies installed!"
echo "🔧 Run 'npx prisma init' to set up the database"
```

## Verification

After installation, verify packages are installed:

```bash
# Check package.json
cat apps/web/package.json

# List installed packages
npm list --depth=0
cd apps/web && npm list --depth=0
```

## Package Sizes (Approximate)

- Tailwind CSS: ~3MB
- Radix UI: ~2MB
- Prisma: ~5MB
- NextAuth: ~1MB
- Web3 libraries: ~10MB
- IPFS libraries: ~5MB

**Total estimated**: ~30-40MB additional dependencies

## Notes

- All dependencies are compatible with React 19 and Next.js 16
- Using Viem instead of Ethers.js (more modern, better TypeScript support)
- Radix UI provides unstyled, accessible components (perfect for custom neon theme)
- Date-fns is lighter than Moment.js for SRS scheduling
- Zustand is optional but recommended for global state (lighter than Redux)

## Next Steps After Installation

1. Initialize Tailwind config
2. Set up Prisma schema
3. Configure NextAuth
4. Create base UI components
5. Set up Web3 providers

