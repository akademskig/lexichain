import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@lexichain.com" },
    update: {},
    create: {
      email: "demo@lexichain.com",
      name: "Demo User",
      password: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // "password"
    },
  });

  console.log("✅ Created demo user:", user.email);

  // Create a sample Spanish deck
  const spanishDeck = await prisma.deck.create({
    data: {
      title: "Spanish Basics",
      description: "Essential Spanish vocabulary for beginners",
      language: "Spanish",
      level: "Beginner",
      isPublic: true,
      userId: user.id,
      cardCount: 5,
      cards: {
        create: [
          {
            front: "Hello",
            back: "Hola",
            pronunciation: "OH-lah",
            example: "¡Hola! ¿Cómo estás?",
            order: 0,
          },
          {
            front: "Goodbye",
            back: "Adiós",
            pronunciation: "ah-DYOHS",
            example: "Adiós, hasta luego.",
            order: 1,
          },
          {
            front: "Thank you",
            back: "Gracias",
            pronunciation: "GRAH-syahs",
            example: "Muchas gracias por tu ayuda.",
            order: 2,
          },
          {
            front: "Please",
            back: "Por favor",
            pronunciation: "pohr fah-BOHR",
            example: "Por favor, ayúdame.",
            order: 3,
          },
          {
            front: "Yes / No",
            back: "Sí / No",
            pronunciation: "see / noh",
            example: "Sí, entiendo. No, no comprendo.",
            order: 4,
          },
        ],
      },
    },
  });

  console.log("✅ Created Spanish deck:", spanishDeck.title);

  // Create a sample French deck
  const frenchDeck = await prisma.deck.create({
    data: {
      title: "French Essentials",
      description: "Common French phrases for travelers",
      language: "French",
      level: "Beginner",
      isPublic: true,
      userId: user.id,
      cardCount: 5,
      cards: {
        create: [
          {
            front: "Hello",
            back: "Bonjour",
            pronunciation: "bohn-ZHOOR",
            example: "Bonjour! Comment allez-vous?",
            order: 0,
          },
          {
            front: "Goodbye",
            back: "Au revoir",
            pronunciation: "oh ruh-VWAHR",
            example: "Au revoir, à bientôt!",
            order: 1,
          },
          {
            front: "Thank you",
            back: "Merci",
            pronunciation: "mehr-SEE",
            example: "Merci beaucoup!",
            order: 2,
          },
          {
            front: "Please",
            back: "S'il vous plaît",
            pronunciation: "seel voo PLEH",
            example: "S'il vous plaît, aidez-moi.",
            order: 3,
          },
          {
            front: "Excuse me",
            back: "Excusez-moi",
            pronunciation: "ex-kew-zay MWAH",
            example: "Excusez-moi, où sont les toilettes?",
            order: 4,
          },
        ],
      },
    },
  });

  console.log("✅ Created French deck:", frenchDeck.title);

  // Create a sample achievement
  const achievement = await prisma.achievement.create({
    data: {
      userId: user.id,
      type: "welcome",
      title: "Welcome to LexiChain!",
      description: "Started your language learning journey",
      icon: "🎉",
    },
  });

  console.log("✅ Created welcome achievement");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
