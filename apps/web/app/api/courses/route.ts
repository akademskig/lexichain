import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

// GET /api/courses - Fetch all courses
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const difficulty = searchParams.get("difficulty");

    // TODO: Get userId from session when auth is implemented
    const userId = "cm4gvlj5i0000kgoilzs6yd0i";

    const where: Record<string, unknown> = { isPublished: true };

    if (language) {
      where.language = language;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: { sections: true },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        courseProgress: {
          where: { userId },
          select: {
            sectionsCompleted: true,
            decksCompleted: true,
            experienceGained: true,
            isCompleted: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform response
    const transformedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      language: course.language,
      icon: course.icon,
      color: course.color,
      difficulty: course.difficulty,
      requiredLevel: course.requiredLevel,
      experienceGain: course.experienceGain,
      totalSections: course._count.sections,
      totalDecks: course.totalDecks,
      totalCards: course.totalCards,
      author: course.user,
      progress: course.courseProgress[0] || null,
    }));

    return NextResponse.json(transformedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
