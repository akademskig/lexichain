import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

// GET /api/decks - Fetch all decks
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const language = searchParams.get("language");

    // Build where clause for filtering
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (language) {
      where.language = language;
    }

    // Note: category is not in schema, using level instead
    if (category) {
      where.level = category;
    }

    // Fetch decks with card count, section, and course info
    const decks = await prisma.deck.findMany({
      where,
      include: {
        _count: {
          select: { cards: true },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        section: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true,
                language: true,
                icon: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the response to match frontend expectations
    const transformedDecks = decks.map((deck) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
      language: deck.language,
      level: deck.level,
      cardCount: deck._count.cards,
      isPublic: deck.isPublic,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
      author: deck.user,
      section: deck.section,
      course: deck.section?.course,
    }));

    return NextResponse.json(transformedDecks);
  } catch (error) {
    console.error("Error fetching decks:", error);
    return NextResponse.json(
      { error: "Failed to fetch decks" },
      { status: 500 },
    );
  }
}

// POST /api/decks - Create a new deck (must belong to a section)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, language, level, isPublic, sectionId } = body;

    // TODO: Get userId from session when auth is implemented
    const userId = "cm4gvlj5i0000kgoilzs6yd0i"; // Temporary hardcoded user

    // Validate required fields
    if (!title || !language || !sectionId) {
      return NextResponse.json(
        { error: "Title, language, and sectionId are required" },
        { status: 400 },
      );
    }

    const deck = await prisma.deck.create({
      data: {
        title,
        description,
        language,
        level: level || "Beginner",
        isPublic: isPublic ?? true,
        userId,
        sectionId,
      },
      include: {
        _count: {
          select: { cards: true },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(deck, { status: 201 });
  } catch (error) {
    console.error("Error creating deck:", error);
    return NextResponse.json(
      { error: "Failed to create deck" },
      { status: 500 },
    );
  }
}
