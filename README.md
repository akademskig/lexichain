# LexiChain — Fluency with Proof.

LexiChain is a modern language learning platform where progress is not only tracked — it’s **owned**.

We combine:

- **AI-powered vocabulary growth**
- **Spaced Repetition System (SRS)** for lasting memory
- **On-chain verifiable achievements**
- **Community-driven content creation**

> Learn languages. Prove your skills.  
> Web3 confidence, Web2 simplicity.

---

## 🚀 Features (MVP)

✅ Email/passkey authentication (wallet optional)  
✅ Decks & flashcards with spaced repetition (SM-2)  
✅ Daily review queue & progress insights  
✅ Gasless Web3 achievements (Soulbound Badges or Attestations)  
✅ IPFS publishing for content creators  
✅ Clean futuristic UI with dark-mode first  
✅ Mobile-friendly from day one

---

## 🧱 Tech Stack

| Area     | Tech                              |
| -------- | --------------------------------- |
| Frontend | Next.js 14+, React 18, TypeScript |
| UI       | Tailwind, shadcn/ui               |
| State    | Zustand + TanStack Query          |
| Database | Prisma + Postgres                 |
| Web3     | Wagmi + Viem, OpenZeppelin        |
| Chain    | Polygon / Base for low gas        |
| Storage  | IPFS (web3.storage / Pinata)      |

---

## 🏗 Architecture

**User-first, Web2+Web3 hybrid**

Next.js (App + API)
⤷ Prisma + PostgreSQL
⤷ Wagmi + Gasless relayer
⤷ IPFS for deck publishing

Progress is tracked off-chain; **achievement proofs** are minted on-chain only when earned.

---

## 🔒 On-Chain Achievements

- **Soulbound Badge Contract** (no transfers)
- **or** Ethereum Attestation Service (EAS)

Backend ensures legitimacy: users can’t mint badges they haven’t earned.

---

## 🧠 Spaced Repetition (SM-2)

Adaptive flashcard review scheduling based on user performance to optimize retention.

---

## 🧩 Core Data Model (Prisma)

**User**, **Deck**, **Card**, **Review**, **Progress**

Progress holds the link to on-chain achievements (`txHash`, badge ID).

---

## 🔧 Development

```sh
npm install
npx prisma migrate dev
npm run dev

Environment variables in .env.example.

🔮 Future Enhancements

AI-generated decks & pronunciation feedback

Marketplace with creator royalties

Social learning and leaderboards

Multilingual UI and VUI (Voice UI)

Verifiable skill certificates for careers

📜 License

MIT — made for builders and learners.
```
