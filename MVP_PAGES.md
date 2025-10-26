# LexiChain MVP Pages

## Page Structure

### 1. **Home/Landing Page** ✅

- **Route**: `/`
- **Status**: Complete
- **Features**: Hero section, feature cards, CTA buttons

### 2. **Dashboard** 🔄

- **Route**: `/dashboard`
- **Features**:
  - User stats (streak, total reviews, decks)
  - Recent decks
  - Due cards count
  - Quick actions

### 3. **Decks Library** 🔄

- **Route**: `/decks`
- **Features**:
  - List all decks (user's + public)
  - Filter by language
  - Search decks
  - Create new deck button

### 4. **Deck Detail** 🔄

- **Route**: `/decks/[id]`
- **Features**:
  - Deck information
  - Card list
  - Progress stats
  - Start studying button
  - Edit/Delete (if owner)

### 5. **Study Session** 🔄

- **Route**: `/study/[deckId]`
- **Features**:
  - Flashcard interface
  - Flip animation
  - Quality rating buttons (Again, Hard, Good, Easy)
  - Progress indicator
  - Session complete screen

### 6. **Create/Edit Deck** 🔄

- **Route**: `/decks/new` or `/decks/[id]/edit`
- **Features**:
  - Deck form (title, description, language, level)
  - Add/edit/delete cards
  - Card form (front, back, pronunciation, example)
  - Save/publish options

### 7. **Profile** 🔄

- **Route**: `/profile`
- **Features**:
  - User info
  - Learning statistics
  - Achievements display
  - Streak calendar
  - Wallet connection (optional)

### 8. **Auth Pages** 🔄

- **Routes**: `/login`, `/signup`
- **Features**:
  - Email/password login
  - Sign up form
  - OAuth providers (optional)
  - Wallet connect (optional)

## Component Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx          # Dashboard layout with nav
│   ├── dashboard/
│   │   └── page.tsx
│   ├── decks/
│   │   ├── page.tsx        # Decks library
│   │   ├── new/
│   │   │   └── page.tsx    # Create deck
│   │   └── [id]/
│   │       ├── page.tsx    # Deck detail
│   │       └── edit/
│   │           └── page.tsx # Edit deck
│   ├── study/
│   │   └── [deckId]/
│   │       └── page.tsx    # Study session
│   └── profile/
│       └── page.tsx
├── components/
│   ├── cards/
│   │   ├── DeckCard.tsx
│   │   ├── FlashCard.tsx
│   │   └── StatsCard.tsx
│   ├── forms/
│   │   ├── DeckForm.tsx
│   │   ├── CardForm.tsx
│   │   └── LoginForm.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── study/
│       ├── StudyCard.tsx
│       ├── QualityButtons.tsx
│       └── ProgressBar.tsx
├── lib/
│   ├── srs.ts              # SM-2 algorithm
│   ├── utils.ts
│   └── api.ts
└── page.tsx                # Landing page ✅
```

## Priority Order

1. ✅ Landing page (complete)
2. 🔄 Dashboard layout with navigation
3. 🔄 Decks library page
4. 🔄 Deck detail page
5. 🔄 Study session interface
6. 🔄 Create/edit deck forms
7. 🔄 Profile page
8. 🔄 Auth pages

## Design System

All pages will use:

- Material UI components
- Neon futuristic theme
- Consistent spacing and typography
- Responsive design
- Dark mode first
