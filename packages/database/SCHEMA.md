# LexiChain Database Schema

## Overview

The LexiChain database is designed to support a language learning platform with blockchain-verified credentials and spaced repetition learning.

## Models

### 👤 User & Authentication

#### User

Core user model with learning statistics and profile information.

**Key Fields:**

- `email` - User's email (unique)
- `walletAddress` - Optional Web3 wallet address
- `totalReviews` - Total number of card reviews
- `currentStreak` - Current daily review streak
- `longestStreak` - Longest streak achieved

**Relations:**

- Has many: Decks, Reviews, Achievements, DeckProgress
- Auth: Accounts, Sessions

#### Account, Session, VerificationToken

NextAuth.js compatible authentication models for OAuth and session management.

---

### 📚 Decks & Flashcards

#### Deck

A collection of flashcards for learning a specific language or topic.

**Key Fields:**

- `title` - Deck name
- `language` - Target language (e.g., "Spanish", "French")
- `level` - Difficulty level (Beginner, Intermediate, Advanced)
- `isPublic` - Whether deck is publicly visible
- `isPublished` - Whether deck is published to IPFS
- `ipfsHash` - IPFS content hash (for decentralized storage)
- `cardCount` - Number of cards in deck

**Relations:**

- Belongs to: User
- Has many: Cards, DeckProgress

#### Card

Individual flashcard with front/back content and language-specific fields.

**Key Fields:**

- `front` - Question/prompt (e.g., "Hello")
- `back` - Answer (e.g., "Hola")
- `pronunciation` - Phonetic pronunciation
- `example` - Example sentence
- `hint` - Optional hint
- `notes` - Additional notes
- `order` - Position in deck

**Relations:**

- Belongs to: Deck
- Has many: Reviews

---

### 📊 Spaced Repetition & Progress

#### DeckProgress

Tracks a user's progress through a specific deck.

**Key Fields:**

- `cardsLearned` - Number of cards learned
- `cardsMastered` - Number of cards mastered
- `totalReviews` - Total reviews for this deck
- `isCompleted` - Whether deck is completed
- `lastReviewedAt` - Last review timestamp

**Relations:**

- Belongs to: User, Deck

#### Review

Individual card review with SM-2 spaced repetition algorithm data.

**SM-2 Algorithm Fields:**

- `quality` - Rating 0-5 (0=blackout, 5=perfect)
- `easeFactor` - Ease factor (default 2.5)
- `interval` - Days until next review
- `repetitions` - Consecutive correct answers
- `nextReviewAt` - Scheduled next review date

**Relations:**

- Belongs to: User, Card

**SM-2 Algorithm:**
The SuperMemo 2 (SM-2) algorithm calculates optimal review intervals:

- Quality 0-2: Reset interval to 1 day
- Quality 3+: Increase interval based on ease factor
- Ease factor adjusts based on performance

---

### 🏆 Achievements & Blockchain

#### Achievement

User achievements with optional blockchain attestations.

**Key Fields:**

- `type` - Achievement type (e.g., "deck_completed", "streak_7")
- `title` - Achievement name
- `description` - Achievement description
- `icon` - Icon/emoji
- `isOnChain` - Whether attested on blockchain
- `attestationId` - EAS attestation UID
- `txHash` - Transaction hash
- `chainId` - Blockchain network ID
- `metadata` - Additional JSON data

**Relations:**

- Belongs to: User

**Blockchain Integration:**
Uses Ethereum Attestation Service (EAS) for verifiable credentials.

---

## Indexes

Optimized indexes for common queries:

- **User**: email, walletAddress
- **Deck**: userId, language, isPublic, ipfsHash
- **Card**: deckId, (deckId + order)
- **Review**: userId, cardId, nextReviewAt, (userId + nextReviewAt)
- **Achievement**: userId, type, attestationId
- **DeckProgress**: userId, deckId, (userId + deckId unique)

---

## Data Flow

### Learning Flow

1. User selects a Deck
2. DeckProgress is created/updated
3. Cards are presented for review
4. User rates card (quality 0-5)
5. Review is saved with SM-2 calculations
6. nextReviewAt is calculated
7. Stats are updated (streaks, totals)

### Achievement Flow

1. User completes milestone (e.g., finishes deck)
2. Achievement is created
3. (Optional) Achievement is attested on-chain via EAS
4. attestationId and txHash are stored

### Deck Publishing Flow

1. User creates Deck with Cards
2. Deck is published to IPFS
3. ipfsHash is stored
4. Deck becomes publicly discoverable

---

## Future Enhancements

### Planned Additions

- [ ] Tags/Categories for decks
- [ ] Deck ratings and reviews
- [ ] User following/social features
- [ ] Study sessions (grouped reviews)
- [ ] Learning goals and reminders
- [ ] Audio attachments for pronunciation
- [ ] Image attachments for visual learning

### Potential Enums

```prisma
enum DeckLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  NATIVE
}

enum AchievementType {
  DECK_COMPLETED
  STREAK_7
  STREAK_30
  REVIEWS_100
  REVIEWS_1000
  CARDS_MASTERED_50
}
```

---

## Usage Examples

### Create a new deck with cards

```typescript
const deck = await prisma.deck.create({
  data: {
    title: "Spanish Basics",
    language: "Spanish",
    level: "Beginner",
    userId: user.id,
    cards: {
      create: [
        { front: "Hello", back: "Hola", order: 0 },
        { front: "Goodbye", back: "Adiós", order: 1 },
      ],
    },
  },
  include: { cards: true },
});
```

### Record a review with SM-2

```typescript
const review = await prisma.review.create({
  data: {
    userId: user.id,
    cardId: card.id,
    quality: 4,
    easeFactor: 2.5,
    interval: 3,
    repetitions: 1,
    nextReviewAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
});
```

### Get cards due for review

```typescript
const dueCards = await prisma.review.findMany({
  where: {
    userId: user.id,
    nextReviewAt: { lte: new Date() },
  },
  include: { card: true },
  orderBy: { nextReviewAt: "asc" },
});
```

### Create blockchain achievement

```typescript
const achievement = await prisma.achievement.create({
  data: {
    userId: user.id,
    type: "deck_completed",
    title: "Deck Master",
    description: "Completed Spanish Basics",
    isOnChain: true,
    attestationId: "0x...",
    txHash: "0x...",
    chainId: 11155111,
  },
});
```
