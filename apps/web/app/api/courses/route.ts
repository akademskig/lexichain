import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

// GET /api/courses - Fetch all courses
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const difficulty = searchParams.get("difficulty");

    // TODO: Get userId from session when auth is implemented
    // For now, get the demo user by email
    const user = await prisma.user.findUnique({
      where: { email: "demo@lexichain.com" },
    });

    const userId = user?.id || "";

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
          where: {
            userId,
            isEnrolled: true,
          },
          select: {
            isEnrolled: true,
            enrolledAt: true,
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
      isEnrolled: course.courseProgress.length > 0,
      courseProgress: course.courseProgress,
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
