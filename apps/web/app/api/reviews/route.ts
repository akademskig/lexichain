import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

// POST /api/reviews - Save a review result
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cardId, quality } = body;

        // TODO: Get userId from session when auth is implemented
        const userId = "cm4gvlj5i0000kgoilzs6yd0i"; // Temporary hardcoded user

        // Validate required fields
        if (!cardId || quality === undefined) {
            return NextResponse.json(
                { error: "Card ID and quality are required" },
                { status: 400 }
            );
        }

        // Get the card to find the deck
        const card = await prisma.card.findUnique({
            where: { id: cardId },
            select: { deckId: true },
        });

        if (!card) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        // Calculate next review date using simplified SM-2 algorithm
        const now = new Date();
        let interval = 1; // days
        const easeFactor = 2.5;

        // Simple SM-2 logic (will be enhanced later)
        if (quality >= 3) {
            // Correct response
            if (quality === 3) interval = 1; // Hard: 1 day
            else if (quality === 4) interval = 4; // Good: 4 days
            else if (quality === 5) interval = 7; // Easy: 7 days
        } else {
            // Incorrect response: review again soon
            interval = 1; // 1 day minimum
        }

        const nextReviewAt = new Date(
            now.getTime() + interval * 24 * 60 * 60 * 1000
        );

        // Create the review record
        const review = await prisma.review.create({
            data: {
                cardId,
                userId,
                quality,
                easeFactor,
                interval,
                nextReviewAt,
            },
        });

        // Update or create deck progress
        const deckProgress = await prisma.deckProgress.upsert({
            where: {
                userId_deckId: {
                    userId,
                    deckId: card.deckId,
                },
            },
            update: {
                totalReviews: { increment: 1 },
                lastReviewedAt: now,
            },
            create: {
                userId,
                deckId: card.deckId,
                totalReviews: 1,
                lastReviewedAt: now,
            },
        });

        return NextResponse.json({
            review,
            deckProgress,
            nextReviewAt,
        });
    } catch (error) {
        console.error("Error saving review:", error);
        return NextResponse.json(
            { error: "Failed to save review" },
            { status: 500 }
        );
    }
}

// GET /api/reviews - Get user's review history
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const deckId = searchParams.get("deckId");

        // TODO: Get userId from session when auth is implemented
        const userId = "cm4gvlj5i0000kgoilzs6yd0i"; // Temporary hardcoded user

        const where: any = { userId };
        if (deckId) {
            where.card = { deckId };
        }

        const reviews = await prisma.review.findMany({
            where,
            include: {
                card: {
                    select: {
                        id: true,
                        front: true,
                        back: true,
                        deck: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                reviewedAt: "desc",
            },
            take: 50, // Limit to recent 50 reviews
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

