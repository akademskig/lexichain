import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

interface RouteParams {
  params: {
    deckId: string;
  };
}

// GET /api/decks/[deckId] - Fetch a single deck with all cards
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { deckId } = await params;
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      include: {
        cards: {
          orderBy: {
            order: "asc",
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: { cards: true },
        },
      },
    });

    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    return NextResponse.json(deck);
  } catch (error) {
    console.error("Error fetching deck:", error);
    return NextResponse.json(
      { error: "Failed to fetch deck" },
      { status: 500 },
    );
  }
}

// PATCH /api/decks/[deckId] - Update a deck
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { deckId } = params;
    const body = await request.json();

    const deck = await prisma.deck.update({
      where: { id: deckId },
      data: body,
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

    return NextResponse.json(deck);
  } catch (error) {
    console.error("Error updating deck:", error);
    return NextResponse.json(
      { error: "Failed to update deck" },
      { status: 500 },
    );
  }
}

// DELETE /api/decks/[deckId] - Delete a deck
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { deckId } = params;

    await prisma.deck.delete({
      where: { id: deckId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting deck:", error);
    return NextResponse.json(
      { error: "Failed to delete deck" },
      { status: 500 },
    );
  }
}
