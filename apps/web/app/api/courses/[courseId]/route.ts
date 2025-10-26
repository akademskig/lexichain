import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

interface RouteParams {
  params: {
    courseId: string;
  };
}

// GET /api/courses/[courseId] - Fetch course with sections and decks
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { courseId } = await params;

    // TODO: Get userId from session when auth is implemented
    const userId = "cm4gvlj5i0000kgoilzs6yd0i";

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        sections: {
          include: {
            decks: {
              include: {
                _count: {
                  select: { cards: true },
                },
                progress: {
                  where: { userId },
                  select: {
                    cardsLearned: true,
                    cardsMastered: true,
                    totalReviews: true,
                    isCompleted: true,
                  },
                },
              },
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
        courseProgress: {
          where: { userId },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}
