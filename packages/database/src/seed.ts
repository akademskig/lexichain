import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "demo@lexichain.com" },
    update: {},
    create: {
      email: "demo@lexichain.com",
      name: "Demo User",
      experience: 150,
      level: 2,
      nextLevelExp: 200,
      currentStreak: 7,
      longestStreak: 12,
      totalReviews: 247,
    },
  });

  console.log("✅ Created user:", user.email);

  // Create Spanish Course
  const spanishCourse = await prisma.course.create({
    data: {
      title: "Spanish from Zero",
      description: "Learn Spanish from scratch with structured lessons",
      language: "Spanish",
      icon: "🇪🇸",
      color: "#FF6B35",
      difficulty: "Beginner",
      requiredLevel: 0,
      experienceGain: 10,
      isPublic: true,
      isPublished: true,
      userId: user.id,
      sections: {
        create: [
          {
            title: "Basics",
            description: "Essential greetings and introductions",
            order: 0,
            difficulty: "Beginner",
            requiredLevel: 0,
            experienceGain: 5,
            decks: {
              create: [
                {
                  title: "Greetings",
                  description: "Learn basic Spanish greetings",
                  language: "Spanish",
                  difficulty: "Beginner",
                  requiredLevel: 0,
                  experienceGain: 10,
                  order: 0,
                  isPublic: true,
                  userId: user.id,
                  cards: {
                    create: [
                      {
                        front: "Hello",
                        back: "Hola",
                        pronunciation: "OH-lah",
                        example: "¡Hola! ¿Cómo estás?",
                        hint: "Common greeting",
                        order: 0,
                      },
                      {
                        front: "Goodbye",
                        back: "Adiós",
                        pronunciation: "ah-DYOHS",
                        example: "Adiós, hasta luego.",
                        hint: "Farewell expression",
                        order: 1,
                      },
                      {
                        front: "Good morning",
                        back: "Buenos días",
                        pronunciation: "BWEH-nohs DEE-ahs",
                        example: "Buenos días, señor.",
                        hint: "Morning greeting",
                        order: 2,
                      },
                      {
                        front: "Good night",
                        back: "Buenas noches",
                        pronunciation: "BWEH-nahs NOH-ches",
                        example: "Buenas noches, mamá.",
                        hint: "Evening/night greeting",
                        order: 3,
                      },
                    ],
                  },
                },
                {
                  title: "Common Phrases",
                  description: "Essential everyday phrases",
                  language: "Spanish",
                  difficulty: "Beginner",
                  requiredLevel: 0,
                  experienceGain: 10,
                  order: 1,
                  isPublic: true,
                  userId: user.id,
                  cards: {
                    create: [
                      {
                        front: "Thank you",
                        back: "Gracias",
                        pronunciation: "GRAH-syahs",
                        example: "Muchas gracias por tu ayuda.",
                        hint: "Expression of gratitude",
                        order: 0,
                      },
                      {
                        front: "Please",
                        back: "Por favor",
                        pronunciation: "pohr fah-BOHR",
                        example: "Por favor, ayúdame.",
                        hint: "Polite request",
                        order: 1,
                      },
                      {
                        front: "Yes / No",
                        back: "Sí / No",
                        pronunciation: "see / noh",
                        example: "Sí, entiendo. No, no comprendo.",
                        hint: "Affirmative and negative",
                        order: 2,
                      },
                      {
                        front: "Excuse me",
                        back: "Perdón / Disculpe",
                        pronunciation: "pehr-DOHN / dees-KOOL-peh",
                        example: "Perdón, ¿dónde está el baño?",
                        hint: "To get attention or apologize",
                        order: 3,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Numbers & Time",
            description: "Learn to count and tell time",
            order: 1,
            difficulty: "Beginner",
            requiredLevel: 1,
            experienceGain: 5,
            decks: {
              create: [
                {
                  title: "Numbers 1-10",
                  description: "Basic counting in Spanish",
                  language: "Spanish",
                  difficulty: "Beginner",
                  requiredLevel: 1,
                  experienceGain: 10,
                  order: 0,
                  isPublic: true,
                  userId: user.id,
                  cards: {
                    create: [
                      {
                        front: "One",
                        back: "Uno",
                        pronunciation: "OO-noh",
                        example: "Tengo un perro.",
                        order: 0,
                      },
                      {
                        front: "Two",
                        back: "Dos",
                        pronunciation: "dohs",
                        example: "Dos gatos.",
                        order: 1,
                      },
                      {
                        front: "Three",
                        back: "Tres",
                        pronunciation: "trehs",
                        example: "Tres libros.",
                        order: 2,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Food & Dining",
            description: "Vocabulary for restaurants and food",
            order: 2,
            difficulty: "Intermediate",
            requiredLevel: 2,
            experienceGain: 8,
            isLocked: true,
            decks: {
              create: [
                {
                  title: "Restaurant Basics",
                  description: "Essential restaurant vocabulary",
                  language: "Spanish",
                  difficulty: "Intermediate",
                  requiredLevel: 2,
                  experienceGain: 15,
                  order: 0,
                  isPublic: true,
                  userId: user.id,
                  cards: {
                    create: [
                      {
                        front: "Menu",
                        back: "Menú / Carta",
                        pronunciation: "meh-NOO / KAR-tah",
                        example: "¿Puedo ver el menú, por favor?",
                        order: 0,
                      },
                      {
                        front: "Water",
                        back: "Agua",
                        pronunciation: "AH-gwah",
                        example: "Una botella de agua, por favor.",
                        order: 1,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Created Spanish course with sections and decks");

  // Create French Course
  const frenchCourse = await prisma.course.create({
    data: {
      title: "French Fundamentals",
      description: "Master the basics of French language",
      language: "French",
      icon: "🇫🇷",
      color: "#4A90E2",
      difficulty: "Beginner",
      requiredLevel: 0,
      experienceGain: 10,
      isPublic: true,
      isPublished: true,
      userId: user.id,
      sections: {
        create: [
          {
            title: "Introduction",
            description: "Basic French greetings and phrases",
            order: 0,
            difficulty: "Beginner",
            requiredLevel: 0,
            experienceGain: 5,
            decks: {
              create: [
                {
                  title: "French Greetings",
                  description: "Essential French greetings",
                  language: "French",
                  difficulty: "Beginner",
                  requiredLevel: 0,
                  experienceGain: 10,
                  order: 0,
                  isPublic: true,
                  userId: user.id,
                  cards: {
                    create: [
                      {
                        front: "Hello",
                        back: "Bonjour",
                        pronunciation: "bohn-ZHOOR",
                        example: "Bonjour, comment allez-vous?",
                        order: 0,
                      },
                      {
                        front: "Goodbye",
                        back: "Au revoir",
                        pronunciation: "oh ruh-VWAHR",
                        example: "Au revoir, à bientôt!",
                        order: 1,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Created French course");

  // Create Japanese course
  const japaneseCourse = await prisma.course.create({
    data: {
      title: "Japanese from Zero",
      description: "Master Japanese from hiragana to conversation",
      language: "Japanese",
      icon: "🇯🇵",
      color: "#E91E63",
      difficulty: "Beginner",
      experienceGain: 15,
      isPublic: true,
      isPublished: true,
      userId: user.id,
      sections: {
        create: [
          {
            title: "Hiragana Basics",
            description: "Learn to read and write basic hiragana",
            order: 0,
            difficulty: "Beginner",
            requiredLevel: 0,
            experienceGain: 15,
            decks: {
              create: [
                {
                  title: "Hiragana A-I-U-E-O",
                  description: "The five vowel sounds",
                  language: "Japanese",
                  difficulty: "Beginner",
                  requiredLevel: 0,
                  experienceGain: 15,
                  order: 0,
                  isPublic: true,
                  userId: user.id,
                  cards: {
                    create: [
                      {
                        front: "あ",
                        back: "a",
                        pronunciation: "ah",
                        example: "あい (ai) - love",
                        order: 0,
                      },
                      {
                        front: "い",
                        back: "i",
                        pronunciation: "ee",
                        example: "いえ (ie) - house",
                        order: 1,
                      },
                      {
                        front: "う",
                        back: "u",
                        pronunciation: "oo",
                        example: "うみ (umi) - sea",
                        order: 2,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Created Japanese course");

  // Create course progress for the user
  await prisma.courseProgress.create({
    data: {
      userId: user.id,
      courseId: spanishCourse.id,
      sectionsCompleted: 0,
      decksCompleted: 0,
      cardsLearned: 8,
      totalReviews: 15,
      experienceGained: 50,
    },
  });

  console.log("✅ Created course progress");

  // Create some achievements
  const achievements = [
    {
      userId: user.id,
      type: "first_deck",
      title: "Getting Started",
      description: "Completed your first deck",
      icon: "🎯",
    },
    {
      userId: user.id,
      type: "streak_7",
      title: "7 Day Streak",
      description: "Studied for 7 days in a row",
      icon: "🔥",
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }

  console.log("✅ Created achievements");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
